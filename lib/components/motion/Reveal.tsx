"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { splitIntoLines } from "@/lib/split";
import { prefersReducedMotion } from "@/lib/tier";

/**
 * §5.3 — masked line reveal. y: 105% → 0 inside overflow:hidden, stagger 0.06s.
 *
 * Three rules keep this cheap, and they are the difference between 5fps and 60:
 *
 * 1. The split happens when the element is near the viewport, not on load.
 *    Splitting all 25 blocks at once cost a 760ms long task before first paint.
 * 2. The markup is restored as soon as the animation ends. A line mask is an
 *    overflow:hidden box wrapping a promoted layer; leaving 50+ of them alive
 *    for the life of the page makes every subsequent frame expensive.
 * 3. CSS transitions do the motion, so this needs no animation engine at all.
 */

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  id?: string;
  lang?: string;
};

const DURATION = 1100;

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  stagger = 0.06,
  id,
  lang,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Marks this block as owned by JavaScript. The failsafe in <head> only
       un-hides blocks that never got here — if this effect ran, visibility is
       ours to manage, and the failsafe must not reveal a block early and then
       have us animate it in a second time. */
    el.dataset.armed = "";

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    const original = el.innerHTML;
    let done = false;
    let timer = 0;

    const restore = () => {
      if (done) return;
      done = true;
      el.innerHTML = original;
      el.style.opacity = "1";
    };

    const play = () => {
      const lines = splitIntoLines(el);
      el.style.opacity = "1";
      if (!lines.length) return restore();

      lines.forEach((line, i) => {
        line.style.transitionDelay = `${delay * 1000 + i * stagger * 1000}ms`;
      });
      // one frame to let the initial state paint, then transition to rest
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add("is-revealed"));
      });

      const total = delay * 1000 + lines.length * stagger * 1000 + DURATION + 80;
      timer = window.setTimeout(restore, total);
    };

    let started = false;
    const start = () => {
      if (started || done) return;
      started = true;
      io.disconnect();
      window.clearTimeout(failsafe);
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      (fonts
        ? Promise.race([fonts.ready, new Promise((r) => setTimeout(r, 400))])
        : Promise.resolve()
      )
        .then(play)
        .catch(restore);
    };

    /* Text must never be stranded invisible. The observer is the nice path, but
       it can report a block as not intersecting at mount — layout is still
       settling while fonts swap and the pinned hero is being measured — and
       then never fire again if nothing moves. This guarantees the content
       appears either way. */
    const failsafe = window.setTimeout(() => {
      started ? undefined : restore();
    }, 2500);

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && start(),
      { rootMargin: "200px 0px" },
    );

    io.observe(el);

    /* Already on screen at mount: don't wait to be told. */
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight + 200 && box.bottom > -200) start();

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      restore();
    };
  }, [delay, stagger]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} data-reveal className={className} id={id} lang={lang}>
      {children}
    </Component>
  );
}
