/**
 * Kholi — the carved Kumaoni wooden doorframe. §2.3
 * Used here to vignette the hero: you are looking at the pearl through a door.
 */
export default function Kholi({ className = "" }: { className?: string }) {
  const bracket = (
    <>
      <path d="M0 0 H120 M0 0 V120" strokeWidth={1.2} />
      <path d="M14 14 H104 M14 14 V104" strokeWidth={0.7} />
      <path d="M26 26 H92 M26 26 V92" strokeWidth={0.5} />
      <circle cx={20} cy={20} r={2.2} />
      <circle cx={44} cy={20} r={1.2} />
      <circle cx={68} cy={20} r={1.2} />
      <circle cx={20} cy={44} r={1.2} />
      <circle cx={20} cy={68} r={1.2} />
      <path d="M40 40 q14 -10 28 0 q-14 10 -28 0 Z" strokeWidth={0.6} />
    </>
  );

  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full text-brass/35 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        <g transform="translate(24,24)">{bracket}</g>
        <g transform="translate(976,24) scale(-1,1)">{bracket}</g>
        <g transform="translate(24,676) scale(1,-1)">{bracket}</g>
        <g transform="translate(976,676) scale(-1,-1)">{bracket}</g>
        {/* the lintel */}
        <path d="M150 34 H850" strokeWidth={0.8} opacity={0.7} />
        <path d="M150 46 H850" strokeWidth={0.4} opacity={0.45} />
        <path
          d="M470 34 q30 -18 60 0"
          strokeWidth={0.8}
          opacity={0.8}
        />
      </g>
    </svg>
  );
}
