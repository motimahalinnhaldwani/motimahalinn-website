import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const ROUTES = ["/", "/rooms", "/rooms/deluxe", "/dining/restaurant", 
  "/gallery", "/about", "/contact", "/book"];

const norm = (s) => s.replace(/\s+/g, " ").trim();

const browser = await chromium.launch();

// Ground truth: the same pages with JavaScript switched off entirely.
const plainCtx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
const liveCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const plain = await plainCtx.newPage();
const live = await liveCtx.newPage();

const problems = [];

for (const route of ROUTES) {
  await plain.goto(BASE + route, { waitUntil: "domcontentloaded" });
  const before = await plain.$$eval("[data-reveal]", (els) =>
    els.map((e) => e.textContent.replace(/\s+/g, " ").trim()));

  await live.goto(BASE + route, { waitUntil: "networkidle" });
  await live.waitForTimeout(1800);
  const after = await live.$$eval("[data-reveal]", (els) =>
    els.map((e) => e.textContent.replace(/\s+/g, " ").trim()));

  if (before.length !== after.length) {
    problems.push(`${route}: ${before.length} reveal blocks without JS, ${after.length} with`);
    continue;
  }
  before.forEach((b, i) => {
    if (norm(b) !== norm(after[i]))
      problems.push(`${route} block ${i}\n    without JS: ${b}\n    after split: ${after[i]}`);
  });
}

await browser.close();
console.log(problems.length ? problems.join("\n") : `TEXT INTACT across ${ROUTES.length} routes`);
