"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import WhatsAppCTA, { CallButton } from "@/components/ui/WhatsAppCTA";
import { prefersReducedMotion } from "@/lib/tier";
import { bookingHref } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { images } from "@/content/images";

/**
 * The hotel first — the real building, and a scroll that walks you up to it.
 *
 * On a desktop the photograph fills the screen and holds (sticky) while you
 * scroll: the camera pushes in on the building, the street around it dims to
 * charcoal while the hotel's stone glows gold, and pins rise on the rooms, the
 * reception and the parking. On a phone the same thing plays as the photo
 * scrolls past. All of it is CSS scroll-driven animation of transform and
 * opacity only (see `.hs-*` in globals.css), so it runs on the compositor;
 * the only JavaScript is a pointer light on desktop.
 * Reduced motion, or a browser without scroll timelines, gets the still
 * photograph with its pins showing.
 */

/** Pins, in percent of the photograph (1672 × 941). */
const pins = [
  { x: 49.5, y: 31, label: "Rooms on three floors", sub: "Deluxe · Twin · Premier · Executive" },
  { x: 57, y: 80, label: "Reception", sub: "Front desk open 24/7" },
  { x: 47.2, y: 80, label: "Free parking", sub: "Drive straight in" },
];

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const img = images.exterior;

  /* Desktop only: a warm light that follows the pointer. One transform on one
     element, one rAF that stops when it has caught up. */
  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const paint = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      light.current!.style.transform = `translate3d(${(x * 50).toFixed(1)}vw, ${(y * 50).toFixed(1)}vh, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(paint) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      el.dataset.lit = "true";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.dataset.lit = "false";
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const facts = [
    [`${site.rating.value.toFixed(1)} ★`, `${site.rating.count} Google reviews`],
    ["300 m", "from the bus station"],
    ["1 km", "from the railway station"],
    ["24/7", "front desk"],
  ];

  return (
    <section className="hero hs relative isolate" aria-labelledby="hero-heading">
      <div className="hs-track">
        <div ref={stage} className="hs-sticky" data-lit="false">
          <div className="hs-frame">
              <div className="hs-zoom">
                {img.src ? (
                  <Image src={img.src} alt={img.alt} fill priority sizes="100vw" className="hs-photo" />
                ) : null}
                {/* The same photograph with the street already sunk to charcoal
                    and the hotel lit — faded in by scroll. An opacity change on
                    a ready-made image costs nothing; drawing the dimming live
                    is what made this lag. */}
                <Image src="/photos/hotel-exterior-lit.jpg" alt="" aria-hidden="true" fill sizes="100vw" className="hs-photo hs-lit" />
                <ul className="hs-pins" aria-label="Around the building">
                  {pins.map((p, i) => (
                    <li
                      key={p.label}
                      className="hs-pin"
                      style={{ left: `${p.x}%`, top: `${p.y}%`, "--i": i } as React.CSSProperties}
                    >
                      <span className="hs-pin-dot" aria-hidden="true" />
                      <span className="hs-pin-label">
                        <strong>{p.label}</strong>
                        <span>{p.sub}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            <div ref={light} className="hs-light" aria-hidden="true" />
            <div className="hs-cue" aria-hidden="true">
              Scroll to step inside
              <span className="hs-cue-line" />
            </div>
          </div>

          <div className="hs-copy">
            <div className="hs-card">
              <Reveal as="p" className="eyebrow mb-4" delay={0.1}>
                {site.kinds} <span aria-hidden="true">—</span> Nainital Road, Haldwani
              </Reveal>

              <Reveal
                as="h1"
                id="hero-heading"
                className="display-lg hero-title max-w-[13ch] text-rice"
                delay={0.2}
                stagger={0.08}
              >
                A warm, quiet room on the road to the hills.
              </Reveal>

              <Reveal as="p" className="lede mt-5 max-w-[44ch]" delay={0.45}>
                A three-star hotel on Nainital Road, 300&nbsp;m from the Haldwani bus
                station and 1&nbsp;km from the railway station, with our own restaurant
                just down the road.
              </Reveal>

              <a href="#direct" className="direct-pill mt-6">
                <span className="direct-pill-tag">Best rate</span>
                <span>
                  Book direct on WhatsApp or by phone for an exclusive rate, lower than
                  the booking sites.
                </span>
              </a>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <WhatsAppCTA href={bookingHref()} label="Book direct on WhatsApp" className="loop" />
                <CallButton />
              </div>

              <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.8125rem] sm:grid-cols-4">
                {facts.map(([k, v]) => (
                  <li key={k} className="flex flex-col">
                    <span className="tnum font-display text-lg leading-tight text-brass">{k}</span>
                    <span className="text-mist/70">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
