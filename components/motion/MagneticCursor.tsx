"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/tier";
import { lerp } from "@/lib/format";

/**
 * §5.5 — a small nacre-tinted disc, scaling and inverting over interactive
 * elements, with a trailing lerp. Fine pointer only. It never takes the native
 * cursor away from a form field, because a text caret is information.
 */
export default function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = dot.current;
    if (!el) return;

    document.body.classList.add("has-cursor");

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let visible = false;

    const INTERACTIVE =
      'a, button, [role="button"], summary, [data-magnetic], input[type="checkbox"], input[type="radio"]';
    const TEXTUAL = 'input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }

      wake();

      const t = e.target as Element | null;
      const overText = !!t?.closest?.(TEXTUAL);
      const overInteractive = !overText && !!t?.closest?.(INTERACTIVE);

      document.body.classList.toggle("cursor-native", overText);
      el.dataset.mode = overText ? "text" : overInteractive ? "hover" : "default";
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    /* Magnetic buttons: the element under the pointer leans toward it, a few
       pixels at most. The separate \`translate\` property, so it never fights a
       transform an animation owns. */
    let magnet: HTMLElement | null = null;
    const onMagnet = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== t) {
        magnet.style.translate = "";
        magnet = null;
      }
      if (!t) return;
      magnet = t;
      const r = t.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      t.style.translate = `${(dx * 6).toFixed(1)}px ${(dy * 4).toFixed(1)}px`;
    };

    /* Only run while there is something to catch up to. A rAF loop that never
       stops keeps the compositor awake for the life of the page. */
    const tick = () => {
      pos.x = lerp(pos.x, target.x, 0.18);
      pos.y = lerp(pos.y, target.y, 0.18);
      el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(
        1,
      )}px, 0) translate(-50%, -50%)`;

      if (Math.abs(pos.x - target.x) < 0.3 && Math.abs(pos.y - target.y) < 0.3) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointermove", onMagnet, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", onMagnet);
      if (magnet) magnet.style.translate = "";
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.body.classList.remove("has-cursor", "cursor-native");
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      data-mode="default"
      className="cursor-dot"
      style={{ opacity: 0 }}
    />
  );
}
