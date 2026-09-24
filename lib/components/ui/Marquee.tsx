"use client";

import type { ReactNode } from "react";
import { useUI } from "@/lib/store";

/**
 * §7 — two counter-scrolling rows, paused on hover or focus.
 * Under reduced motion it is a static grid, which is the point: the content is
 * the credibility play, not the movement.
 */
export default function Marquee({
  children,
  reverse = false,
  duration = 64,
  className = "",
}: {
  children: ReactNode[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const reduced = useUI((s) => s.reducedMotion);

  if (reduced) {
    return (
      <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`marquee-track overflow-hidden ${className}`}>
      <div
        className="marquee gap-4"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {children}
        {/* Duplicated for the seam. aria-hidden so it is read once. */}
        <div className="flex gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
