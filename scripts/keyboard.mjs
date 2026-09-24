import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + "/book", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const seen = [];
let invisible = 0, offscreen = 0;
for (let i = 0; i < 45; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      label: (el.getAttribute("aria-label") || el.textContent || el.id || "").trim().slice(0, 40),
      outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor,
      visible: r.width > 0 && r.height > 0 && cs.visibility !== "hidden",
      inView: r.top > -5 && r.bottom < window.innerHeight + 5,
    };
  });
  if (!info) break;
  seen.push(info);
  if (!info.visible) invisible++;
  if (!info.inView) offscreen++;
}
const noRing = seen.filter((s) => s.outline.startsWith("none"));
console.log(`tab stops reached: ${seen.length}`);
console.log(`without a focus ring: ${noRing.length}${noRing.length ? " → " + noRing.slice(0,5).map(s=>s.tag+":"+s.label).join(", ") : ""}`);
console.log(`focused but not rendered: ${invisible}`);
console.log("first 8:", seen.slice(0, 8).map((s) => `${s.tag}(${s.label.slice(0,22)})`).join(" → "));
await browser.close();
