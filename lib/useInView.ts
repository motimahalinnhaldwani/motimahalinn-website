"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./tier";

/**
 * One IntersectionObserver per element, doing one of two jobs:
 *
 *   once (default) — adds `.in-view` the first time the element arrives. Every
 *   arrive-once animation on the site is this plus a CSS transition.
 *
 *   toggle — keeps `.is-visible` in step with visibility. Looping animations
 *   (steam, stars, the specials ticker) pause when it is off, so nothing
 *   off-screen keeps the compositor awake.
 */
export function useInView<T extends HTMLElement>({
  rootMargin = "0px 0px -8% 0px",
  toggle = false,
}: { rootMargin?: string; toggle?: boolean } = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!toggle && prefersReducedMotion()) {
      el.classList.add("in-view");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (toggle) {
          el.classList.toggle("is-offscreen", !entry.isIntersecting);
          return;
        }
        if (!entry.isIntersecting) return;
        el.classList.add("in-view");
        io.disconnect();
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, toggle]);

  return ref;
}
