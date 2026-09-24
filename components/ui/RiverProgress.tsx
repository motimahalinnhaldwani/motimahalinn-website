/**
 * §2.3 — the Gaula. Haldwani sits on its bed, so the scroll indicator is a
 * thin meandering river line down the right edge.
 *
 * The scroll position is written straight onto this one path.
 *
 * It used to read a `--scroll-progress` custom property set on :root. A custom
 * property consumed from an inline style defeats Chromium's invalidation
 * scoping, so every change recalculated styles for the entire document — 2.9
 * seconds of style recalc per scroll on the home page, for one moving line.
 * Writing the element's own property keeps the invalidation to this path.
 */

function meander(height = 1000, waves = 9, amp = 9) {
  const step = height / waves;
  let d = `M 20 0`;
  for (let i = 0; i < waves; i++) {
    const y0 = i * step;
    const dir = i % 2 === 0 ? 1 : -1;
    d += ` C ${20 + amp * dir} ${y0 + step * 0.3}, ${20 - amp * dir} ${
      y0 + step * 0.7
    }, 20 ${y0 + step}`;
  }
  return d;
}

export const RIVER_LENGTH = 1100;

export default function RiverProgress() {
  const d = meander();

  return (
    <div
      className="pointer-events-none fixed right-2 top-0 z-40 hidden h-screen w-10 lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        className="h-full w-full"
        focusable="false"
      >
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-rice/12"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          className="text-brass"
          vectorEffect="non-scaling-stroke"
          data-river=""
          style={{
            strokeDasharray: RIVER_LENGTH,
            strokeDashoffset: RIVER_LENGTH,
            transition: "stroke-dashoffset 120ms linear",
          }}
        />
      </svg>
    </div>
  );
}
