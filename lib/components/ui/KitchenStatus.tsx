"use client";

import { useEffect, useState } from "react";
import { istMinutes, statusAt, type Status } from "@/lib/kitchen";
import { meals } from "@/content/site";

/**
 * Live "open now" — in Haldwani time. Rendered empty on the server and filled
 * after mount, because a prerendered page would otherwise freeze whatever the
 * clock said at build time.
 */
export default function KitchenStatus({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const windows = meals.map((m) => ({ label: m.label, start: m.start, end: m.end, to: m.to }));
    const tick = () => setStatus(statusAt(windows, istMinutes()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const name = "Kitchen";
  const text = tone === "light" ? "text-cocoa" : "text-rice/90";
  const ring = tone === "light" ? "border-cocoa/20 bg-cocoa/[0.04]" : "border-brass/30 bg-ink/40";

  return (
    <p
      className={`inline-flex min-h-[2.125rem] items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[0.8125rem] ${ring} ${text} ${className}`}
      aria-live="polite"
    >
      {status ? (
        <>
          <span
            className={`status-dot ${status.open ? "is-open" : ""}`}
            aria-hidden="true"
          />
          {status.open ? (
            <span>
              <strong className="font-medium">{name} open</strong>
              {` until ${status.until}`}
            </span>
          ) : (
            <span>
              <strong className="font-medium">{name} closed</strong> · opens {status.opensAt}
            </span>
          )}
        </>
      ) : (
        <span className="opacity-0">{name} hours</span>
      )}
    </p>
  );
}
