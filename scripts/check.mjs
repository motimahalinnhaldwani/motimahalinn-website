import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const ROUTES = [
  "/", "/rooms", "/rooms/deluxe", "/rooms/premier",
  "/dining/restaurant",
  "/gallery", "/about", "/contact", "/book", "/no-such-page",
];

const browser = await chromium.launch();
const problems = [];

for (const [label, viewport, reduced] of [
  ["mobile-320", { width: 320, height: 740 }, false],
  ["mobile-390", { width: 390, height: 844 }, false],
  ["desktop", { width: 1440, height: 900 }, false],
  ["reduced", { width: 1440, height: 900 }, true],
]) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();

  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));

  for (const route of ROUTES) {
    errs.length = 0;
    const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(700);

    const status = res?.status();
    if (route === "/no-such-page") {
      if (status !== 404) problems.push(`${label} ${route}: expected 404, got ${status}`);
    } else if (status !== 200) {
      problems.push(`${label} ${route}: status ${status}`);
    }

    // Reveals arrive as you reach them, so walk the page before asserting.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      // find the widest offending element, if any
      let worst = null, worstRight = de.clientWidth;
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > worstRight + 1) { worstRight = r.right; worst = el.tagName + "." + (el.className?.toString?.().slice(0, 60) ?? ""); }
      }
      const hidden = [...document.querySelectorAll("[data-reveal]")]
        .filter((e) => getComputedStyle(e).visibility === "hidden").length;
      return {
        scrollW: de.scrollWidth, clientW: de.clientWidth,
        worst, worstRight, revealHidden: hidden,
        revealTotal: document.querySelectorAll("[data-reveal]").length,
        h1: document.querySelectorAll("h1").length,
      };
    });

    if (m.scrollW > m.clientW + 1)
      problems.push(`${label} ${route}: horizontal overflow ${m.scrollW} > ${m.clientW}${m.worst ? ` (${m.worst} right=${Math.round(m.worstRight)})` : ""}`);
    if (m.revealHidden > 0)
      problems.push(`${label} ${route}: ${m.revealHidden}/${m.revealTotal} reveal blocks still invisible`);
    if (m.h1 !== 1 && route !== "/no-such-page")
      problems.push(`${label} ${route}: ${m.h1} h1 elements (want exactly 1)`);
    const realErrs = errs.filter((e) => !(route === "/no-such-page" && e.includes("404")));
    if (realErrs.length)
      problems.push(`${label} ${route}: console — ${realErrs.slice(0, 2).join(" | ").slice(0, 220)}`);
  }
  await ctx.close();
}

await browser.close();
console.log(problems.length ? problems.join("\n") : "ALL CHECKS PASSED");
