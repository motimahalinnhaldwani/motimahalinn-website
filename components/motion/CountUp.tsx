"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/tier";

/** §2 — labels counter-animate their distances from zero. */
export default function CountUp({
  to,
  suffix = "",
  duration = 1400,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /* Always 0 on the first render so the client matches the server exactly.
     Reduced motion jumps to the final value in the effect below. */
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      setValue(to);
      return;
    }

    let raf = 0;
    let start = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const step = (t: number) => {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / duration);
          /* expo.out, to match everything else that enters. §5.2 */
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setValue(Number((to * eased).toFixed(to % 1 === 0 ? 0 : 1)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {value}
      {suffix}
    </span>
  );
}
