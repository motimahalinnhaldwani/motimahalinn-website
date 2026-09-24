"use client";

import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/ui/Marquee";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";

/**
 * §7 · VOICES
 *
 * Real reviews, verbatim, platform named — including one that is not
 * flattering, with the reply underneath it. Showing an imperfect review and a
 * gracious answer converts better than five perfect ones, and it is the only
 * version of this section that is true.
 */

function Stars({ n }: { n: number }) {
  return (
    <span role="img" className="flex gap-0.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3 w-3 ${i < n ? "text-brass" : "text-mist/20"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5 14.9 9l7.1.6-5.4 4.7 1.6 7L12 17.6 5.8 21.3l1.6-7L2 9.6 9.1 9Z" />
        </svg>
      ))}
    </span>
  );
}

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col justify-between rounded-sm border border-brass/20 bg-ink-soft/60 p-6 sm:w-[23rem]">
      <div>
        <Stars n={r.rating} />
        <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-rice/85">
          {r.quote}
        </blockquote>
      </div>
      <figcaption className="mt-5 text-[0.75rem] text-mist/65">
        {r.author} · {r.platform} · <span className="tnum">{r.stayed}</span>
      </figcaption>
    </figure>
  );
}

export default function Voices() {
  const featured = reviews.find((r) => r.reply);
  const rest = reviews.filter((r) => !r.reply);
  /* Both rows carry every card, the second offset, so each row is wider than
     the viewport and the marquee's seam copy never shows beside its original. */
  const rowA = rest;
  const rowB = [...rest.slice(2), ...rest.slice(0, 2)];

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="voices-heading">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          Voices
        </Reveal>
        <Reveal as="h2" id="voices-heading" className="display-lg mt-5 max-w-[16ch] text-rice">
          What people say, including the part we would rather they did not.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          <span className="tnum">{site.rating.value.toFixed(1)}</span> out of five across
          roughly <span className="tnum">{site.rating.count}</span> ratings. Here is the
          review that taught us the most.
        </Reveal>
      </div>

      {featured ? (
        <div className="shell mt-12">
          <figure className="rounded-sm border border-geru/35 bg-geru/[0.07] p-7 sm:p-10">
            <Stars n={featured.rating} />
            <blockquote className="measure mt-5 font-display text-2xl leading-snug text-rice sm:text-3xl">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-4 text-[0.8125rem] text-mist/65">
              {featured.author} · {featured.platform} ·{" "}
              <span className="tnum">{featured.stayed}</span>
            </figcaption>

            <div className="mt-7 border-l-2 border-brass/40 pl-5">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-brass">
                {featured.reply!.from}
              </p>
              <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-mist/80">
                {featured.reply!.body}
              </p>
            </div>
          </figure>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4">
        <Marquee duration={78} className="shell-tight max-w-none">
          {rowA.map((r) => (
            <Card key={r.id} r={r} />
          ))}
        </Marquee>
        <Marquee duration={94} reverse className="shell-tight max-w-none">
          {rowB.map((r) => (
            <Card key={r.id} r={r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
