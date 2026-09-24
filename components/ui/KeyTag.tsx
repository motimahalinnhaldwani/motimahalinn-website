/**
 * A brass room-key fob, the kind that hangs behind every front desk in India.
 * It swings when its card arrives and when you hover it.
 */
export default function KeyTag({ name, sqft }: { name: string; sqft: number }) {
  return (
    <div className="key-tag" aria-hidden="true">
      <svg viewBox="0 0 90 170" className="h-auto w-[4.25rem] sm:w-[5.25rem]">
        <defs>
          <linearGradient id={`brass-${name}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f6d27c" />
            <stop offset="0.45" stopColor="#d9a441" />
            <stop offset="1" stopColor="#7a5424" />
          </linearGradient>
        </defs>
        {/* ring */}
        <circle cx="45" cy="16" r="12" fill="none" stroke="#d9a441" strokeWidth="3.5" />
        <path d="M45 28 L45 40" stroke="#a87a36" strokeWidth="3" />
        {/* fob */}
        <path
          d="M18 40 H72 Q82 40 82 50 V132 Q82 142 72 150 L52 164 Q45 169 38 164 L18 150 Q8 142 8 132 V50 Q8 40 18 40 Z"
          fill={`url(#brass-${name})`}
        />
        <path
          d="M22 48 H68 Q74 48 74 54 V130 Q74 137 67 142 L50 154 Q45 158 40 154 L23 142 Q16 137 16 130 V54 Q16 48 22 48 Z"
          fill="none"
          stroke="#5e3f17"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <circle cx="45" cy="58" r="4" fill="#3a2716" />
        <text x="45" y="92" textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="1" textLength={name.length > 6 ? 56 : undefined} lengthAdjust="spacingAndGlyphs" fill="#2b1d0f" className="font-sans">
          {name.toUpperCase()}
        </text>
        <text x="45" y="118" textAnchor="middle" fontSize="22" fill="#2b1d0f" style={{ fontFamily: "var(--font-display)" }}>
          {sqft}
        </text>
        <text x="45" y="132" textAnchor="middle" fontSize="8.5" letterSpacing="2" fill="#2b1d0f" className="font-sans">
          SQ FT
        </text>
      </svg>
    </div>
  );
}
