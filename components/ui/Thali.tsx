/**
 * §4 — the brass thali.
 *
 * Phase 4 replaces this with a 48-frame scroll-scrubbed turntable rendered
 * from the real thali, preloaded as one AVIF sprite sheet. Until the food has
 * been photographed, this is drawn rather than faked, and it rotates on the
 * same scroll value the sequence will use.
 */

const ANGLES = [0, 72, 144, 216, 288];

export default function Thali({
  active,
  colours,
  className = "",
}: {
  active: number;
  colours: string[];
  className?: string;
}) {
  const engrave = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={200 + Math.cos(a) * 46}
        y1={200 + Math.sin(a) * 46}
        x2={200 + Math.cos(a) * 62}
        y2={200 + Math.sin(a) * 62}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className={`thali ${className}`}
      role="img"
      aria-label="A brass thali with five bowls, filling one dish at a time."
    >
      <defs>
        <radialGradient id="brassPlate" cx="38%" cy="30%">
          <stop offset="0%" stopColor="#E7C787" />
          <stop offset="45%" stopColor="#C08A3E" />
          <stop offset="78%" stopColor="#8A5F26" />
          <stop offset="100%" stopColor="#5E401A" />
        </radialGradient>
        <radialGradient id="brassBowl" cx="35%" cy="28%">
          <stop offset="0%" stopColor="#DCC08A" />
          <stop offset="70%" stopColor="#A9782F" />
          <stop offset="100%" stopColor="#6B4C1D" />
        </radialGradient>
      </defs>

      {/* the turntable — driven by --p */}
      <g style={{ transformOrigin: "200px 200px", transform: "rotate(calc(var(--p, 0) * 260deg))" }}>
        <circle cx="200" cy="200" r="190" fill="url(#brassPlate)" />
        <circle cx="200" cy="200" r="176" fill="none" stroke="#5E401A" strokeWidth="1.5" opacity="0.7" />
        <circle cx="200" cy="200" r="168" fill="none" stroke="#E7C787" strokeWidth="0.8" opacity="0.45" />
        <circle cx="200" cy="200" r="70" fill="none" stroke="#5E401A" strokeWidth="1" opacity="0.55" />
        <g stroke="#5E401A" strokeWidth="0.9" opacity="0.45" strokeLinecap="round">
          {engrave}
        </g>

        {ANGLES.map((deg, i) => {
          const a = ((deg - 90) * Math.PI) / 180;
          const cx = 200 + Math.cos(a) * 118;
          const cy = 200 + Math.sin(a) * 118;
          const on = i <= active;
          return (
            <g
              key={deg}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                transform: on ? "scale(1)" : "scale(0.4)",
                opacity: on ? 1 : 0,
                transition: "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 500ms linear",
              }}
            >
              <circle cx={cx} cy={cy} r="50" fill="url(#brassBowl)" />
              <circle cx={cx} cy={cy} r="42" fill={colours[i]} />
              <circle
                cx={cx}
                cy={cy}
                r="42"
                fill="none"
                stroke="#5E401A"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <ellipse
                cx={cx - 12}
                cy={cy - 14}
                rx="12"
                ry="7"
                fill="#fff"
                opacity={i === active ? 0.14 : 0.08}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
