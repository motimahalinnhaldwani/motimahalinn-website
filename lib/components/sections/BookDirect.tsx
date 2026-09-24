import Reveal from "@/components/motion/Reveal";
import BookingComposer from "@/components/ui/BookingComposer";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";

/**
 * Book direct — by WhatsApp or by phone. The rating sits beside it, because
 * the moment someone decides to book is the moment they want reassurance.
 */

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} out of 5`} style={{ "--fill": `${(value / 5) * 100}%` } as React.CSSProperties}>
      <span className="stars-base" aria-hidden="true">★★★★★</span>
      <span className="stars-fill" aria-hidden="true">★★★★★</span>
    </span>
  );
}

export default function BookDirect() {

  return (
    <section id="book" className="relative z-10 py-20 sm:py-28" aria-labelledby="book-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal as="p" className="eyebrow">Book direct · best rate</Reveal>
            <Reveal as="h2" id="book-heading" className="display-lg mt-5 max-w-[15ch] text-rice">
              Call us, or send us a WhatsApp.
            </Reveal>
            <Reveal as="p" className="lede measure mt-6">
              No booking site in the middle, so no commission, and a lower rate than
              you will find on any booking platform. The rate you agree with the front
              desk is the rate you pay, and the people you speak to are the people who
              will be there when you arrive.
            </Reveal>
          </div>

          <aside className="rating-card rounded-sm border border-brass/25 bg-ink-soft/70 p-6" aria-label="Guest rating">
            <div className="flex items-end gap-4">
              <span className="tnum font-display text-6xl leading-none text-rice">{site.rating.value.toFixed(1)}</span>
              <div className="pb-1">
                <Stars value={site.rating.value} />
                <p className="mt-1 text-[0.8125rem] text-mist/70">
                  <span className="tnum">{site.rating.count}</span> Google reviews
                </p>
              </div>
            </div>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-mist/70">
              Rated {site.rating.value.toFixed(1)} on Google Maps.{" "}
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-brass underline underline-offset-4">
                Read what guests say
              </a>
            </p>
          </aside>
        </div>

        {reviews.length ? (
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.id}>
                <figure className="h-full rounded-sm border border-brass/20 bg-ink-soft/60 p-6">
                  <Stars value={r.rating} />
                  <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-rice/85">{r.quote}</blockquote>
                  <figcaption className="mt-4 text-[0.75rem] text-mist/70">
                    {r.author} · {r.platform} · {r.stayed}
                  </figcaption>
                  {r.reply ? (
                    <div className="mt-4 border-l-2 border-brass/40 pl-4 text-[0.875rem] text-mist/75">
                      <p className="text-[0.625rem] uppercase tracking-[0.2em] text-brass">{r.reply.from}</p>
                      <p className="mt-2">{r.reply.body}</p>
                    </div>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-14">
          <BookingComposer />
        </div>
      </div>
    </section>
  );
}
