/**
 * "Kitchen open now" — computed in India Standard Time wherever the visitor is,
 * because a guest in Delhi planning tonight's dinner and one in London planning
 * next month's trip both need Haldwani's clock, not their own.
 */

export type Window = { label: string; start: number; end: number; to: string };

export type Status =
  | { open: true; label: string; until: string }
  | { open: false; opensAt: string };

export function istMinutes(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

const clock = (mins: number) => {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const h = h24 % 12 || 12;
  return `${h}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h24 < 12 ? "a.m." : "p.m."}`;
};

export function statusAt(windows: readonly Window[], mins: number): Status {
  const now = windows.find((w) => mins >= w.start && mins < w.end);
  if (now) return { open: true, label: now.label, until: clock(now.end) };
  const next = windows.find((w) => w.start > mins) ?? windows[0];
  const tomorrow = !windows.some((w) => w.start > mins);
  return { open: false, opensAt: `${clock(next.start)}${tomorrow ? " tomorrow" : ""}` };
}
