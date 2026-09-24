"use client";

import Reveal from "@/components/motion/Reveal";
import Image from "next/image";
import Icon, { glyphFor } from "@/components/ui/Icons";
import KeyTag from "@/components/ui/KeyTag";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { TLink } from "@/components/motion/PageTransition";
import { useInView } from "@/lib/useInView";
import { bookingHref } from "@/lib/whatsapp";
import { images } from "@/content/images";
import { rooms, type Room } from "@/content/rooms";

/**
 * §3 · THE ROOMS — stacked cards.
 *
 * This was a pinned horizontal track, and it never showed the first room whole:
 * the pin started when the section's heading reached the top of the screen,
 * which left the track half below the fold, and the first card slid away
 * sideways before it was ever fully visible. At 1366×768 the cards were also
 * taller than their frame and clipped.
 *
 * Now each room is a card that sticks, and the next one slides up over it.
 * It is plain `position: sticky` — nothing to measure, nothing to mis-measure —
 * and every card is sized to fit a 720px-tall screen. The receding scale on the
 * card underneath is a CSS scroll-driven animation where supported.
 */

function RoomCard({ room, i, next }: { room: Room; i: number; next?: string }) {
  const ref = useInView<HTMLElement>({ rootMargin: "0px 0px -20% 0px" });

  return (
    <article
      ref={ref}
      className="room-card"
      style={
        {
          "--i": i,
          viewTimelineName: `--room-${room.slug}`,
          ...(next ? { "--next": `--room-${next}` } : {}),
        } as React.CSSProperties
      }
      data-recede={next ? "" : undefined}
      aria-labelledby={`room-${room.slug}`}
    >
      <KeyTag name={room.name} sqft={room.sqft} />

      <div className="room-card-inner grid overflow-hidden rounded-sm border border-brass/25 bg-ink-soft lg:h-full lg:grid-cols-[1.05fr_1fr]">
        <div className="room-media relative min-h-[17rem] overflow-hidden bg-ink-soft sm:min-h-[20rem]">
          {images[room.hero].src ? (
            <Image
              src={images[room.hero].src!}
              alt={images[room.hero].alt}
              fill
              sizes="(max-width:1024px) 100vw, 52vw"
              className="room-img object-cover"
            />
          ) : null}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
          <p className="eyebrow">
            Room · <span lang="hi">{room.nameDeva}</span>
          </p>
          <h3 id={`room-${room.slug}`} className="mt-3 flex items-baseline gap-4">
            <span className="font-display text-5xl text-rice sm:text-6xl">{room.name}</span>
            <span className="tnum font-sans text-sm text-mist/70">{room.sqft} sq ft · sleeps {room.sleeps}</span>
          </h3>
          <p className="mt-4 max-w-[34ch] font-display text-xl leading-snug text-rice/90 sm:text-2xl">
            {room.line}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2.5">
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[0.8125rem] text-mist/75">
                <Icon name={glyphFor(a)} className="h-4 w-4 shrink-0 text-brass" />
                {a}
              </li>
            ))}
          </ul>

          <p className="mt-7 font-display text-2xl text-brass">Drop an enquiry for today&rsquo;s price</p>
          <p className="mt-2 text-[0.8125rem] text-mist/75">
            WhatsApp or call the front desk. <strong className="font-medium text-rice">Booking direct is
            always cheaper</strong> than the booking sites.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <WhatsAppCTA href={bookingHref({ room: `${room.name} (${room.sqft} sq ft)` })} label={`Book the ${room.name}`} />
            <TLink href={`/rooms/${room.slug}`} className="text-[0.8125rem] uppercase tracking-[0.16em] text-rice/80 underline-offset-4 hover:text-rice hover:underline">
              Room details
            </TLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RoomStack({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rooms-stack shell ${className}`}
      style={{ timelineScope: rooms.map((r) => `--room-${r.slug}`).join(", ") } as React.CSSProperties}
    >
      {rooms.map((room, i) => (
        <RoomCard key={room.slug} room={room} i={i} next={rooms[i + 1]?.slug} />
      ))}
    </div>
  );
}

export default function Rooms() {
  return (
    <section className="relative z-10 pb-10 pt-20 sm:pt-28" aria-labelledby="rooms-heading">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          The rooms
        </Reveal>
        <Reveal as="h2" id="rooms-heading" className="display-lg mt-5 max-w-[14ch] text-rice">
          Sleep at the foot of the mountains.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Four kinds of room, all told straight. Every number here is the real number.
        </Reveal>
      </div>

      <RoomStack className="mt-14" />
    </section>
  );
}
