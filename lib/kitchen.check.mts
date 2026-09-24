// node --experimental-strip-types lib/kitchen.check.mts
import assert from "node:assert/strict";
import { istMinutes, statusAt } from "./kitchen.ts";
import { meals as real } from "../content/site.ts";

const meals = [
  { label: "Breakfast", start: 450, end: 720, to: "" },
  { label: "Lunch", start: 720, end: 1050, to: "" },
  { label: "Dinner", start: 1050, end: 1380, to: "" },
];

assert.deepEqual(statusAt(meals, 449), { open: false, opensAt: "7:30 a.m." });
assert.deepEqual(statusAt(meals, 450), { open: true, label: "Breakfast", until: "12 p.m." });
assert.deepEqual(statusAt(meals, 1049), { open: true, label: "Lunch", until: "5:30 p.m." });
assert.deepEqual(statusAt(meals, 1379), { open: true, label: "Dinner", until: "11 p.m." });
assert.deepEqual(statusAt(meals, 1380), { open: false, opensAt: "7:30 a.m. tomorrow" });
assert.deepEqual(statusAt(meals, 0), { open: false, opensAt: "7:30 a.m." });

// The real hours: 8 a.m. to 10:45 p.m.
assert.deepEqual(statusAt(real, 479), { open: false, opensAt: "8 a.m." });
assert.deepEqual(statusAt(real, 480), { open: true, label: "Kitchen", until: "10:45 p.m." });
assert.deepEqual(statusAt(real, 1365), { open: false, opensAt: "8 a.m. tomorrow" });

// 18:00 UTC is 23:30 IST, whatever timezone this machine is in.
assert.equal(istMinutes(new Date("2026-09-22T18:00:00Z")), 23 * 60 + 30);
assert.equal(istMinutes(new Date("2026-09-22T18:30:00Z")), 0);
console.log("kitchen status ok");
