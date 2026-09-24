"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { TLink } from "@/components/motion/PageTransition";
import { journeys } from "@/content/journeys";
import { distances } from "@/content/site";
import { useInView } from "@/lib/useInView";

/**
 * §2 · THE GATEWAY
 *
 * Haldwani is Kumaon ka Dwar — the last city of the plains. Everyone who
 * stays here is in transit. The hotel sits at the origin of every line.
 *
 * Tier B renders this SVG map. Tier A (Phase 4) replaces the contours with a
 * DEM-displaced terrain mesh — but the SVG is not a consolation prize, so it
 * is drawn to be good on its own.
 */

const HALDWANI = { x: 500, y: 620 };

const PLACES: Record<string, { x: number; y: number; why: string }> = {
  "jim-corbett": { x: 150, y: 536, why: "The oldest national park in India, and a different forest entirely." },
  nainital: { x: 415, y: 352, why: "The lake everyone comes for. Go early, park once, walk." },
  bhimtal: { x: 566, y: 432, why: "A bigger lake than Naini's, with a fifth of the people." },
  "kainchi-dham": { x: 648, y: 318, why: "Neem Karoli Baba's ashram. Leave at six and you will have it quiet." },
  mukteshwar: { x: 792, y: 168, why: "On a clear winter morning, the Himalaya line up on the horizon." },
};

/** Contour lines — denser and higher as the land rises north. */
function contours() {
  const out: { d: string; o: number }[] = [];
  for (let i = 0; i < 13; i++) {
    const y = 560 - i * 42;
    const amp = 8 + i * 5.5;
    const waves = 3 + (i % 3);
    let d = `M -40 ${y}`;
    for (let k = 0; k < waves; k++) {
      const seg = 1080 / waves;
      const x0 = -40 + k * seg;
      const dir = (k + i) % 2 === 0 ? -1 : 1;
      d += ` C ${x0 + seg * 0.3} ${y + amp * dir}, ${x0 + seg * 0.7} ${y - amp * dir}, ${
        x0 + seg
      } ${y}`;
    }
    out.push({ d, o: 0.05 + i * 0.022 });
  }
  return out;
}

export default function Gateway() {
  const scope = useInView<HTMLDivElement>("0px 0px -15% 0px");
  const [active, setActive] = useState<string | null>(null);
  const lines = contours();


  return (
    <section
      ref={scope}
      className="gateway relative py-20 sm:py-28"
      aria-labelledby="gateway-heading"
    >
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          The proposition
        </Reveal>
        <Reveal as="h2" id="gateway-heading" className="display-lg mt-5 max-w-[17ch] text-rice">
          Everything you came to Kumaon for starts here.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Haldwani is the last city of the plains. Moti Mahal Inn is not a destination —
          it is a threshold. That is the most useful thing about it, and the reason to
          spend a night here rather than an extra two hours in a car.
        </Reveal>
      </div>

      <div className="shell mt-14">
        {/* Capped by height as well as width, so the whole map can be seen at
            once on a short laptop screen. */}
        <div
          className="relative mx-auto w-full"
          style={{ aspectRatio: "1000 / 700", maxWidth: "min(100%, calc(72svh * 1000 / 700))" }}
        >
          <svg
            viewBox="0 0 1000 700"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            focusable="false"
          >
            <g fill="none" stroke="currentColor" className="text-mist" strokeWidth={1} vectorEffect="non-scaling-stroke">
              {lines.map((l, i) => (
                <path
                  key={i}
                  d={l.d}
                  className="contour arrive"
                  style={{ ["--i" as string]: i }}
                  opacity={l.o}
                />
              ))}
            </g>

            <g fill="none" stroke="currentColor" className="text-brass" strokeLinecap="round" vectorEffect="non-scaling-stroke">
              {journeys.map((j, i) => {
                const p = PLACES[j.slug];
                const midX = (HALDWANI.x + p.x) / 2 + (p.x - HALDWANI.x) * 0.1;
                const midY = (HALDWANI.y + p.y) / 2 - 40;
                const dim = active && active !== j.slug;
                return (
                  <path
                    key={j.slug}
                    className="route aipan-path"
                    pathLength={1}
                    d={`M ${HALDWANI.x} ${HALDWANI.y} Q ${midX} ${midY} ${p.x} ${p.y}`}
                    strokeWidth={active === j.slug ? 1.8 : 1}
                    opacity={dim ? 0.18 : 0.75}
                    style={{
                      ["--i" as string]: i,
                      transition: "opacity 400ms, stroke-width 400ms",
                    }}
                  />
                );
              })}
            </g>

            {/* Haldwani pulses at the origin of every line */}
            <g>
              <circle cx={HALDWANI.x} cy={HALDWANI.y} r={22} className="fill-geru/15" />
              <circle cx={HALDWANI.x} cy={HALDWANI.y} r={11} className="fill-geru/30" />
              <circle cx={HALDWANI.x} cy={HALDWANI.y} r={4.5} className="fill-brass" />
            </g>
          </svg>

          {/* Real, focusable, readable. The SVG above is decoration. */}
          <ul className="absolute inset-0 list-none">
            {journeys.map((j) => {
              const p = PLACES[j.slug];
              const dim = active && active !== j.slug;
              return (
                <li
                  key={j.slug}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(p.x / 1000) * 100}%`, top: `${(p.y / 700) * 100}%` }}
                >
                  <TLink
                    href={`/journeys/${j.slug}`}
                    className="group block rounded-sm px-2 py-1 text-left transition-opacity duration-500"
                    style={{ opacity: dim ? 0.3 : 1 }}
                    onMouseEnter={() => setActive(j.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(j.slug)}
                    onBlur={() => setActive(null)}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                      <span className="font-display text-base leading-none text-rice transition-colors group-hover:text-brass sm:text-xl">
                        {j.name}
                      </span>
                    </span>
                    <span className="mt-1 block pl-3.5 text-[0.6875rem] text-mist/65 sm:text-xs">
                      <CountUp to={j.km} suffix=" km" className="text-brass/90" /> · {j.drive}
                    </span>
                    <span
                      className="mt-1 block max-w-[22ch] pl-3.5 text-[0.6875rem] leading-snug text-mist/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:hidden"
                      aria-hidden={active !== j.slug}
                    >
                      {p.why}
                    </span>
                  </TLink>
                </li>
              );
            })}

            <li
              className="absolute -translate-x-1/2 translate-y-3"
              style={{ left: `${(HALDWANI.x / 1000) * 100}%`, top: `${(HALDWANI.y / 700) * 100}%` }}
            >
              <p className="whitespace-nowrap text-center">
                <span className="font-display text-lg text-brass sm:text-2xl">Haldwani</span>
                <span className="mt-0.5 block text-[0.625rem] uppercase tracking-[0.2em] text-mist/65">
                  You are here
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell mt-14">
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {distances.map((d) => (
            <li key={d.place} className="rule-t pt-4">
              <p className="tnum font-display text-3xl text-brass">{d.display}</p>
              <p className="mt-1 text-sm text-rice/85">{d.place}</p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-mist/65">{d.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
