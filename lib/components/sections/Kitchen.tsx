"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Thali from "@/components/ui/Thali";
import KitchenStatus from "@/components/ui/KitchenStatus";
import { Button } from "@/components/ui/Button";
import { useInView } from "@/lib/useInView";
import { meals } from "@/content/site";
import { restaurant, signatures, thaliSequence } from "@/content/menu";

/**
 * §4 · THE KITCHEN — Motimahal Restaurant.
 *
 * The thali fills as you scroll: a CSS scroll-driven animation where the
 * browser supports it, a staggered arrival where it does not. Hover a dish and
 * its bowl answers. No ordering, no reservations — the site shows the kitchen;
 * the restaurant runs itself.
 */

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-grid h-3 w-3 shrink-0 place-items-center rounded-[2px] border ${veg ? "border-green-700" : "border-geru"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-green-700" : "bg-geru"}`} />
    </span>
  );
}

export function RankBadge() {
  const text = `${restaurant.rank.on} · #${restaurant.rank.position} of ${restaurant.rank.of} restaurants in ${restaurant.rank.place} · `;
  return (
    <div className="rank-badge" role="img" aria-label={`Ranked #${restaurant.rank.position} of ${restaurant.rank.of} restaurants in ${restaurant.rank.place} on ${restaurant.rank.on}`}>
      <svg viewBox="0 0 120 120" className="rank-badge-ring loop" aria-hidden="true">
        <defs>
          <path id="rankCircle" d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" />
        </defs>
        <text fontSize="8.6" letterSpacing="1.6" fill="currentColor" className="font-sans uppercase">
          <textPath href="#rankCircle">{text.toUpperCase()}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <span className="text-center leading-none">
          <span className="block font-display text-4xl text-brass">#{restaurant.rank.position}</span>
          <span className="mt-1 block text-[0.5625rem] uppercase tracking-[0.2em] text-mist/75">in town</span>
        </span>
      </span>
    </div>
  );
}

export function MenuCard() {
  const ref = useInView<HTMLDivElement>();
  let n = 0;
  return (
    <div ref={ref} className="menu-card">
      <p className="text-center text-[0.625rem] uppercase tracking-[0.34em] text-cocoa-soft">{restaurant.name}</p>
      <p className="mt-1 text-center font-display text-3xl text-cocoa">Signatures</p>
      <div className="mx-auto mt-3 h-px w-16 bg-cocoa/30" />
      {signatures.map((group) => (
        <section key={group.section} className="mt-6">
          <h3 className="flex items-baseline justify-between gap-3 border-b border-cocoa/20 pb-1.5">
            <span className="font-display text-lg text-cocoa">{group.section}</span>
            <span lang="hi" className="text-sm text-cocoa-soft">{group.deva}</span>
          </h3>
          <ul className="mt-3 space-y-2.5">
            {group.dishes.map((d) => (
              <li key={d.name} className="flex items-center gap-2.5 text-[0.9375rem] text-cocoa">
                <VegMark veg={d.veg} />
                <span className="min-w-0">{d.name}</span>
                <span className="leader" style={{ "--i": n++ } as React.CSSProperties} aria-hidden="true" />
                <span lang="hi" className="shrink-0 text-[0.8125rem] text-cocoa-soft">{d.deva}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-6 text-center text-[0.75rem] italic text-cocoa-soft">
        The full menu and prices are at the restaurant.
      </p>
    </div>
  );
}

export default function Kitchen() {
  const [hot, setHot] = useState<string | null>(null);
  const zone = useInView<HTMLElement>({ toggle: true, rootMargin: "100px 0px" });
  const arrive = useInView<HTMLDivElement>({ rootMargin: "0px 0px -25% 0px" });

  return (
    <section ref={zone} className="kitchen loops relative z-10 overflow-x-clip py-20 sm:py-28" aria-labelledby="kitchen-heading">
      <div className="kitchen-warmth" aria-hidden="true" />

      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <Reveal as="p" className="eyebrow">
              Our restaurant · {restaurant.name} · <span lang="hi">मोतीमहल रेस्टोरेंट</span>
            </Reveal>
            <Reveal as="h2" id="kitchen-heading" className="display-lg mt-5 max-w-[17ch] text-rice">
              Kali mirch, slow dal, and kebabs off the tandoor.
            </Reveal>
            <Reveal as="p" className="lede measure mt-6">
              Indian and Asian, a short walk down Nainital Road from the hotel — from breakfast at 8 a.m. to dinner until 10:45 p.m. Ranked #
              {restaurant.rank.position} of {restaurant.rank.of} restaurants in{" "}
              {restaurant.rank.place} on {restaurant.rank.on}.
            </Reveal>
            <KitchenStatus className="mt-7" />
          </div>
          <RankBadge />
        </div>

        <ol className="meal-strip mt-12 grid gap-px overflow-hidden rounded-sm border border-brass/20 bg-brass/20">
          {meals.map((m) => (
            <li key={m.label} className="bg-ink-soft px-5 py-4">
              <p className="text-[0.625rem] uppercase tracking-[0.24em] text-brass">{m.label}</p>
              <p className="tnum mt-1 font-display text-2xl text-rice">
                {m.from} <span className="text-mist/65">–</span> {m.to}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div
        ref={arrive}
        className="kitchen-track shell mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20"
        style={{ timelineScope: thaliSequence.map((d) => `--dish-${d.id}`).join(", ") } as React.CSSProperties}
      >
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mx-auto w-full max-w-[26rem]">
            <Thali dishes={thaliSequence} hot={hot} />
          </div>
        </div>

        <ol className="flex flex-col gap-3" onMouseLeave={() => setHot(null)}>
          {thaliSequence.map((dish, i) => (
            <li
              key={dish.id}
              className={`dish${hot === dish.id ? " is-hot" : ""}`}
              style={{ "--i": i, viewTimelineName: `--dish-${dish.id}` } as React.CSSProperties}
              onMouseEnter={() => setHot(dish.id)}
            >
              <p lang="hi" className="text-lg text-brass">{dish.deva}</p>
              <h3 className="mt-1 flex items-center gap-3 font-display text-3xl text-rice sm:text-4xl">
                {dish.name}
                <VegMark veg={dish.veg} />
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-mist/75">{dish.note}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="shell mt-20 grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <MenuCard />
        <div>
          <h3 className="display-md max-w-[16ch] text-rice">Come for dinner or have it sent to your room.</h3>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-mist/75">
            The restaurant is in its own building a short walk down Nainital Road, open to
            guests and to anyone walking in. Staying with us? Food comes to your room from
            8 a.m. until 10:45 p.m.
          </p>
          <Button href="/dining/restaurant" className="mt-8">
            See the full menu
          </Button>
        </div>
      </div>
    </section>
  );
}
