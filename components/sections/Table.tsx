"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Thali from "@/components/ui/Thali";
import { Button } from "@/components/ui/Button";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { restaurant, thaliSequence } from "@/content/menu";
import { withEngine } from "@/lib/engine";
import { prefersReducedMotion } from "@/lib/tier";

const COLOURS = ["#5C4130", "#43291D", "#8A3320", "#E4D6C1", "#AD5330"];

/**
 * §4 · THE TABLE
 *
 * The ground shifts warmer. The thali rotates as you scroll and dishes plate
 * themselves onto it one by one, name first in Devanagari, then in English,
 * with a line written by someone who has eaten it.
 */
export default function Table() {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    /* §5.10 — under reduced motion the whole thali is simply served, plated. */
    if (prefersReducedMotion()) {
      setActive(thaliSequence.length - 1);
      return;
    }

    let last = -1;

    return withEngine(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.to(el, {
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 85%",
            scrub: 1,
            onUpdate: (self) => {
              el.querySelector<SVGElement>(".thali")
                ?.style.setProperty("--p", self.progress.toFixed(3));
              const idx = Math.min(
                thaliSequence.length - 1,
                Math.floor(self.progress * (thaliSequence.length + 0.4)) - 1,
              );
              if (idx !== last) {
                last = idx;
                setActive(idx);
              }
            },
          },
        });
      }, el);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="table-heading"
    >
      {/* the ground shifts warmer */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, rgba(154,90,35,0.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="shell">
        <Reveal as="p" className="eyebrow">
          Motimahal Restaurant · <span lang="hi">मोतीमहल रेस्टोरेंट</span>
        </Reveal>
        <Reveal as="h2" id="table-heading" className="display-lg mt-5 max-w-[20ch] text-rice">
          Kali mirch, cast iron, and a kitchen that has had a long time to get it right.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Ranked <span className="tnum">#{restaurant.rank.position}</span> of{" "}
          <span className="tnum">{restaurant.rank.of}</span> restaurants in{" "}
          {restaurant.rank.place}, which we mention because it is the kind of thing a hotel
          usually makes up. Indian and Asian, open to the street as well as to the stairs.
        </Reveal>
      </div>

      <div className="shell mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Thali
            active={active}
            colours={COLOURS}
            className="mx-auto w-full max-w-[26rem] drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          />
        </div>

        <ol className="flex flex-col gap-10">
          {thaliSequence.map((dish, i) => {
            const on = i <= active;
            return (
              <li
                key={dish.id}
                className="rule-t pt-6 transition-all duration-700"
                style={{
                  opacity: on ? 1 : 0.28,
                  transform: on ? "none" : "translateY(10px)",
                }}
                aria-current={i === active ? "true" : undefined}
              >
                <p lang="hi" className="text-xl text-brass">
                  {dish.deva}
                </p>
                <h3 className="display-md mt-1.5 text-rice">{dish.name}</h3>
                <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-mist/75">
                  {dish.note}
                </p>
                <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.2em] text-brass/90">
                  {dish.veg ? "Vegetarian" : "Non-vegetarian"}
                  {dish.signature ? " · Signature" : ""}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="shell mt-14 flex flex-wrap gap-3">
        <Button href="/dining/restaurant">The full menu</Button>
        <WhatsAppCTA
          variant="ghost"
          label="Reserve a table"
          ctx={{ intent: "table" }}
        />
      </div>
    </section>
  );
}
