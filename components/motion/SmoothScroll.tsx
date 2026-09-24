"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollState, useUI } from "@/lib/store";
import { detectTier, prefersReducedMotion } from "@/lib/tier";
import { clamp } from "@/lib/format";

/**
 * Native scroll. One rAF loop. No scroll-hijacking library.
 *
 * This used to run Lenis, with GSAP's ticker driving it and ScrollTrigger
 * updating on every Lenis frame. Measured: that alone halved the frame rate on
 * the home page, and smoothing that costs 30fps is not smooth. The browser's
 * own scrolling is already on the compositor and already perfect.
 *
 * What survives is the part that mattered: one source of truth for scroll
 * progress (§5.1), published as `scrollState` and as CSS custom properties.
 */

function daypart(hour: number) {
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "lamp";
  return "night";
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const setTier = useUI((s) => s.setTier);
  const setReducedMotion = useUI((s) => s.setReducedMotion);
  const setReady = useUI((s) => s.setReady);
  const setPastHero = useUI((s) => s.setPastHero);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    const tier = detectTier();

    setTier(tier);
    setReducedMotion(reduced);
    setReady(true);
    root.dataset.tier = tier;
    root.dataset.motion = reduced ? "reduce" : "full";
    root.dataset.daypart = daypart(new Date().getHours());

    let queued = false;
    let lastPast = false;
    let river: SVGPathElement | null = null;

    const write = () => {
      queued = false;
      const max = root.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? clamp(y / max) : 0;

      scrollState.velocity = y - scrollState.y;
      scrollState.direction = scrollState.velocity >= 0 ? 1 : -1;
      scrollState.y = y;
      scrollState.progress = p;

      /* One element, one property. Scoped invalidation instead of a
         document-wide style recalc on every frame. */
      river ??= document.querySelector<SVGPathElement>("[data-river]");
      if (river) river.style.strokeDashoffset = String((1 - p) * 1100);

      const past = y > window.innerHeight * 0.7;
      if (past !== lastPast) {
        lastPast = past;
        setPastHero(past);
      }

    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setTier, setReducedMotion, setReady, setPastHero]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
