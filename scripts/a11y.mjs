import { chromium } from "playwright";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core");
const fs = await import("fs");

const BASE = process.env.BASE || "http://localhost:3000";
const ROUTES = ["/", "/rooms", "/rooms/deluxe", "/dining/restaurant", 
  "/gallery", "/about", "/contact", "/book"];
const axeSrc = fs.readFileSync(axePath, "utf8");

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

let total = 0;
for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.addScriptTag({ content: axeSrc });
  const res = await page.evaluate(async () =>
    await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
    }),
  );
  const v = res.violations.filter((x) => x.impact !== "minor" || x.id === "color-contrast");
  total += v.length;
  if (v.length) {
    console.log(`\n${route}`);
    for (const x of v) {
      console.log(`  [${x.impact}] ${x.id}: ${x.help}`);
      for (const n of x.nodes.slice(0, 3)) {
        console.log(`      ${n.target.join(" ")}`);
        const msg = (n.any[0]?.message || n.all[0]?.message || "").split("\n")[0];
        if (msg) console.log(`      → ${msg.slice(0, 150)}`);
      }
      if (x.nodes.length > 3) console.log(`      …and ${x.nodes.length - 3} more`);
    }
  }
}
console.log(total ? `\n${total} violation groups` : "\nNO AXE VIOLATIONS");
await browser.close();
