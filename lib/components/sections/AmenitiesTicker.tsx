"use client";

import { useInView } from "@/lib/useInView";
import Icon, { glyphFor } from "@/components/ui/Icons";
import { amenities } from "@/content/site";

/** What every guest gets, running under the hero. */
function Row() {
  return (
    <>
      {amenities.map((a) => (
        <span key={a} className="flex shrink-0 items-center gap-2.5 pr-7 sm:pr-9">
          <Icon name={glyphFor(a)} className="h-[1.1rem] w-[1.1rem] text-charcoal/80" />
          <span className="text-[0.8125rem] font-medium uppercase leading-none tracking-[0.14em] text-charcoal sm:text-sm">
            {a}
          </span>
          <svg viewBox="0 0 20 20" className="ml-5 h-2 w-2 text-charcoal/45 sm:ml-7" aria-hidden="true">
            <path d="M10 0 L12.5 7.5 L20 10 L12.5 12.5 L10 20 L7.5 12.5 L0 10 L7.5 7.5 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );
}

export default function AmenitiesTicker() {
  const ref = useInView<HTMLDivElement>({ toggle: true, rootMargin: "0px" });

  return (
    <div ref={ref} className="amenity-band loops marquee-track relative z-10 overflow-hidden py-3 sm:py-3.5">
      <p className="sr-only">Amenities for every guest: {amenities.join(", ")}.</p>
      <div className="marquee loop" style={{ "--marquee-duration": "70s" } as React.CSSProperties} aria-hidden="true">
        <div className="flex"><Row /></div>
        <div className="flex"><Row /></div>
      </div>
    </div>
  );
}
