"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * A third-party map iframe on page load costs a connection, a few hundred
 * kilobytes and a layout the visitor did not ask for — and public tile servers
 * rate-limit embeds, so it is not even reliable. This draws the corner instead
 * and fetches the real map on request.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  const bbox = [
    site.geo.lng - 0.012,
    site.geo.lat - 0.008,
    site.geo.lng + 0.012,
    site.geo.lat + 0.008,
  ].join("%2C");

  if (loaded) {
    return (
      <iframe
        title="Map showing Moti Mahal Inn on Nainital Road, Haldwani"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`}
        className="h-[26rem] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="relative h-[26rem] w-full overflow-hidden bg-ink-soft">
      <svg
        viewBox="0 0 800 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-mist"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18">
          {[70, 140, 210, 280, 350].map((y) => (
            <path key={y} d={`M -20 ${y} L 820 ${y - 26}`} />
          ))}
          {[120, 260, 400, 540, 680].map((x) => (
            <path key={x} d={`M ${x} -20 L ${x + 30} 440`} />
          ))}
        </g>
        {/* NH-87, running up towards the hills */}
        <path
          d="M -20 340 C 220 320, 380 250, 480 160 S 700 40, 820 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-brass"
          opacity="0.5"
        />
        <text x="520" y="120" className="fill-current text-mist" fontSize="15" opacity="0.5">
          NH-87 → Nainital
        </text>
        <circle cx="400" cy="225" r="26" className="fill-geru" opacity="0.18" />
        <circle cx="400" cy="225" r="7" className="fill-brass" />
        <text x="422" y="230" className="fill-current text-rice" fontSize="17">
          Moti Mahal Inn
        </text>
      </svg>

      <div className="absolute inset-0 flex items-end justify-center p-6">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-sm border border-brass/45 bg-ink/85 px-5 py-3 text-[0.8125rem] uppercase tracking-[0.14em] text-rice backdrop-blur transition-colors hover:bg-brass hover:text-ink"
        >
          Load the interactive map
        </button>
      </div>
    </div>
  );
}
