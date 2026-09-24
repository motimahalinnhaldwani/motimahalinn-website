import Image from "next/image";
import type { Shot, Tone } from "@/content/images";

/**
 * Every photograph on the site goes through here.
 *
 * A slot with no `src` renders a generated stand-in: on-palette, carrying an
 * aipan dot lattice and its own shot brief. It is deliberately not a
 * photograph, so it cannot be mistaken for one and cannot quietly survive to
 * launch (§14).
 */

const TONES: Record<Tone, { from: string; to: string; ink: string }> = {
  plains: { from: "#f4ecdd", to: "#e6d6ba", ink: "#7d540b" },
  lamp: { from: "#f6e9cc", to: "#e8c98a", ink: "#6b4708" },
  hill: { from: "#efe9df", to: "#d9d0c2", ink: "#4a443c" },
  cream: { from: "#f1e6d3", to: "#dccab0", ink: "#4a443c" },
  cocoa: { from: "#232322", to: "#34322f", ink: "#d9a441" },
};

/** A stable small integer from the slot id, so each stand-in is its own drawing
    rather than five copies of the same one. */
function seedOf(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function Lattice({ ink, seed }: { ink: string; seed: number }) {
  const petals = 4 + (seed % 5); // 4–8, as aipan lotuses vary
  const step = 3 === seed % 4 ? 12 : 10;
  const phase = seed % 7;

  const dots = [];
  for (let y = 0; y < Math.ceil(80 / step); y++) {
    for (let x = 0; x < Math.ceil(120 / step); x++) {
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x * step + step / 2}
          cy={y * step + step / 2}
          r={(x + y + phase) % 3 === 0 ? 0.9 : 0.42}
        />,
      );
    }
  }

  const rays = Array.from({ length: petals }, (_, i) => {
    const a = ((i * 360) / petals + seed % 40) * (Math.PI / 180);
    return (
      <line
        key={i}
        x1={60 + Math.cos(a) * 13}
        y1={40 + Math.sin(a) * 13}
        x2={60 + Math.cos(a) * 26}
        y2={40 + Math.sin(a) * 26}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 120 80"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
      style={{ color: ink, opacity: 0.42 }}
    >
      <g fill="currentColor">{dots}</g>
      <g fill="none" stroke="currentColor" strokeWidth={0.4} opacity={0.85}>
        <circle cx={60} cy={40} r={26} />
        <circle cx={60} cy={40} r={13} />
        {rays}
      </g>
    </svg>
  );
}

export default function Frame({
  img,
  className = "",
  sizes = "100vw",
  priority = false,
  rounded = "rounded-sm",
  showBrief = true,
}: {
  img: Shot;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  showBrief?: boolean;
}) {
  const tone = TONES[img.tone];
  const ratio = `${img.width} / ${img.height}`;
  /* `relative` and `absolute` are both position utilities, and the stylesheet
     order — not the class order — decides which wins. */
  const pos = /\babsolute\b/.test(className) ? "" : "relative";

  if (img.src) {
    return (
      <figure
        className={`${pos} overflow-hidden ${rounded} ${className}`}
        style={{ aspectRatio: ratio, backgroundColor: tone.from }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </figure>
    );
  }

  return (
    <div
      className={`${pos} overflow-hidden ${rounded} ${className}`}
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(150deg, ${tone.from} 0%, ${tone.to} 100%)`,
      }}
      role="img"
      aria-label={`Photograph pending: ${img.brief}`}
    >
      <Lattice ink={tone.ink} seed={seedOf(img.id)} />
      <div
        className="pointer-events-none absolute inset-[6px] border"
        style={{ borderColor: `${tone.ink}4d` }}
      />
      {showBrief ? (
        <figcaption
          className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 p-3 sm:p-4"
          style={{ color: tone.ink }}
        >
          <span className="text-[0.5625rem] font-medium uppercase tracking-[0.2em] opacity-70">
            Photograph pending
          </span>
          <span className="text-[0.6875rem] leading-snug opacity-90">{img.brief}</span>
        </figcaption>
      ) : null}
    </div>
  );
}

/**
 * A real photograph shown at a size its resolution actually supports, captioned
 * as what it is. The four supplied images are OTA thumbnails; stretching them
 * across a hero would undo the one thing this site exists to prove.
 */
export function Evidence({
  img,
  caption,
  className = "",
}: {
  img: Shot;
  caption?: string;
  className?: string;
}) {
  if (!img.src) return <Frame img={img} className={className} />;

  return (
    <figure className={`group ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}>
      <div
        className="relative overflow-hidden rounded-sm ring-1 ring-brass/25"
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={`${img.maxRenderWidth ?? img.width}px`}
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-[0.6875rem] leading-snug text-mist/65">
        {caption ?? img.brief}
      </figcaption>
    </figure>
  );
}
