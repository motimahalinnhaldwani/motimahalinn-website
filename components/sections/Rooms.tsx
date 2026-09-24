"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import Frame, { Evidence } from "@/components/ui/Frame";
import Icon, { glyphFor } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { images } from "@/content/images";
import { rooms } from "@/content/rooms";
import { rupees } from "@/lib/format";
import { withEngine } from "@/lib/engine";
import { prefersReducedMotion } from "@/lib/tier";

/**
 * §3 · THE ROOMS
 *
 * Vertical scroll drives a horizontal track. Each panel states the room's true
 * dimensions as an editorial statistic, because the single most common
 * complaint in this property's reviews is photographs not matching reality.
 * Small rooms honestly shown beat large rooms dishonestly implied.
 *
 * Below 1024px the track unpins and stacks. A horizontal pin on a phone in a
 * moving car is a way to lose people.
 */
export default function Rooms() {
  const scope = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scope.current;
    const tr = track.current;
    if (!el || !tr) return;

    /* Amenity marks stagger in from CSS once the section arrives. */
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (el.classList.add("in-view"), io.disconnect()),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    if (prefersReducedMotion()) return () => io.disconnect();

    const stop = withEngine(({ gsap }) => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          const distance = () => tr.scrollWidth - window.innerWidth;

          gsap.to(tr, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });


        });
      }, el);

      return () => ctx.revert();
    });

    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <section
      ref={scope}
      className="rooms relative overflow-x-clip"
      aria-labelledby="rooms-heading"
    >
      <div className="shell pt-20 sm:pt-28">
        <Reveal as="p" className="eyebrow">
          The rooms
        </Reveal>
        <Reveal as="h2" id="rooms-heading" className="display-lg mt-5 max-w-[14ch] text-rice">
          Sleep at the foot of the mountains.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Two kinds of room, both told straight. Every number on this page is the real
          number, and every floor plan is drawn to scale.
        </Reveal>
      </div>

      <div
        ref={track}
        className="rooms-track mt-12 flex flex-col gap-16 px-[clamp(1.25rem,1rem+2vw,4.5rem)] lg:mt-0 lg:h-[100svh] lg:flex-row lg:items-center lg:gap-0 lg:pt-16 lg:px-0 lg:will-change-transform"
      >
        {rooms.map((room) => (
          <article
            key={room.slug}
            className="relative w-full shrink-0 lg:flex lg:h-[84svh] lg:w-[92vw] lg:items-center lg:px-[clamp(1.25rem,1rem+2vw,4.5rem)]"
          >
            <div className="relative w-full overflow-hidden rounded-sm lg:h-full">
              <div className="room-photo absolute inset-0 scale-110">
                <Frame
                  img={images[room.gallery[1]]}
                  className="h-full w-full"
                  sizes="(max-width: 1024px) 100vw, 92vw"
                  rounded=""
                  showBrief={false}
                />
              </div>

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(15,14,12,0.94) 0%, rgba(15,14,12,0.78) 42%, rgba(15,14,12,0.32) 100%)",
                }}
                aria-hidden="true"
              />

              <div className="relative grid gap-8 p-6 sm:p-10 lg:h-full lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:overflow-hidden lg:p-12">
                <div>
                  <p className="eyebrow">
                    {room.name} · <span lang="hi">{room.nameDeva}</span>
                  </p>

                  <p className="mt-5 flex items-baseline gap-3">
                    <span className="tnum font-display text-[clamp(4rem,10vw,7rem)] leading-[0.82] text-rice">
                      {room.sqft}
                    </span>
                    <span className="font-display text-xl text-brass">sq ft</span>
                  </p>

                  <h3 className="mt-5 max-w-[18ch] font-display text-[clamp(1.6rem,2.2vw,2.5rem)] leading-[1.02] text-rice">
                    {room.line}
                  </h3>

                  <p className="mt-4 max-w-[52ch] text-[0.875rem] leading-relaxed text-mist/75">
                    {room.body}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
                    {room.amenities.map((a, i) => (
                      <li
                        key={a}
                        className="room-amenity flex items-center gap-2 text-[0.8125rem] text-mist/70"
                      >
                        <Icon name={glyphFor(a)} className="h-4 w-4 text-brass" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <p className="text-sm text-mist/65">
                      From{" "}
                      <span className="tnum font-display text-3xl text-brass">
                        {rupees(room.from)}
                      </span>{" "}
                      a night
                    </p>
                    <Button href={`/rooms/${room.slug}`} variant="ghost">
                      Walk through the room
                    </Button>
                  </div>

                  <p className="mt-4 text-[0.75rem] text-mist/65">
                    {room.beds} · sleeps {room.sleeps} · plus taxes
                  </p>
                </div>

                <div className="hidden lg:block">
                  <Evidence
                    img={images[room.hero]}
                    caption={`${room.name} room, photographed as it is. Full-resolution photography is being shot.`}
                    className="ml-auto max-w-[22rem]"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
