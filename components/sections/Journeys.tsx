"use client";

import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import Frame from "@/components/ui/Frame";
import { TLink } from "@/components/motion/PageTransition";
import { journeys } from "@/content/journeys";
import { images } from "@/content/images";
import { useUI } from "@/lib/store";

/**
 * §6 · JOURNEYS FROM THE DOOR
 *
 * Pure SEO and intent capture. "hotel near Kainchi Dham" and "where to stay
 * before Nainital" are the searches that pay this property's bills, and each
 * card opens a guide that genuinely answers them.
 */
export default function Journeys() {
  const reduced = useUI((s) => s.reducedMotion);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  const tilt = (i: number) => (e: React.MouseEvent) => {
    if (reduced) return;
    const el = refs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 6}deg`);
    el.style.setProperty("--rx", `${-y * 6}deg`);
  };

  const reset = (i: number) => () => {
    const el = refs.current[i];
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="journeys-heading">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          Journeys from the door
        </Reveal>
        <Reveal as="h2" id="journeys-heading" className="display-lg mt-5 max-w-[16ch] text-rice">
          Five good days, all of them starting here.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Each of these is a real guide — when to leave, what it costs, what to eat, and
          what we will do for you before you go. Written because we have been asked the
          same questions at the desk for years.
        </Reveal>
      </div>

      <ul className="shell mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {journeys.map((j, i) => (
          <li key={j.slug}>
            <TLink
              href={`/journeys/${j.slug}`}
              ref={(el: HTMLAnchorElement | null) => {
                refs.current[i] = el;
              }}
              onMouseMove={tilt(i)}
              onMouseLeave={reset(i)}
              className="tilt sweep group relative block h-full overflow-hidden rounded-sm border border-brass/20 bg-ink-soft/50 transition-colors duration-500 hover:border-brass/50"
            >
              <Frame
                img={images[j.hero]}
                className="w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                rounded=""
                showBrief={false}
              />
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-rice transition-colors group-hover:text-brass">
                    {j.name}
                  </h3>
                  <span lang="hi" className="text-sm text-brass/90">
                    {j.deva}
                  </span>
                </div>

                <p className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.75rem] uppercase tracking-[0.12em] text-mist/65">
                  <span className="tnum">{j.km} km</span>
                  <span className="tnum">{j.drive}</span>
                  <span className="tnum text-brass/90">Leave by {j.leaveBy}</span>
                </p>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist/75">{j.hook}</p>

                <p className="mt-5 text-[0.75rem] uppercase tracking-[0.18em] text-brass">
                  Read the guide →
                </p>
              </div>
            </TLink>
          </li>
        ))}

        <li className="flex">
          <div className="flex h-full w-full flex-col justify-between rounded-sm border border-dashed border-brass/25 p-6">
            <div>
              <h3 className="font-display text-2xl text-rice">Something else?</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist/70">
                Almora, Ranikhet, Munsiyari, the Kosi valley. Ask at the desk and we will
                tell you honestly whether it is a day trip or a stay.
              </p>
            </div>
            <p className="mt-6 text-[0.75rem] uppercase tracking-[0.18em] text-brass/90">
              Ask at reception
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
