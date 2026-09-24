import type { Dish } from "@/content/menu";

/**
 * §4 — the brass thali.
 *
 * The plate is a still drawing; the engraved ring spins and the bowls land on
 * it as you scroll. Bowls are HTML, not SVG children, so their motion runs on
 * the compositor instead of repainting the plate every frame.
 */

const ANGLES = [0, 72, 144, 216, 288];
const FILL: Record<string, string> = {
  "kali-mirch-chicken": "#5c4130",
  "dal-makhani": "#43291d",
  "mutton-rogan-josh": "#8a3320",
  "dahi-kabab": "#e4d6c1",
  "paneer-lababdar": "#ad5330",
};

function Bowl({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 100 100" className="block h-full w-full" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="url(#bowlBrass)" />
      <circle cx="50" cy="50" r="40" fill={fill} />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#5e401a" strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="38" cy="36" rx="12" ry="7" fill="#fff" opacity="0.12" />
    </svg>
  );
}

export default function Thali({ dishes, hot }: { dishes: Dish[]; hot: string | null }) {
  const engrave = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    return (
      <line key={i} x1={200 + Math.cos(a) * 44} y1={200 + Math.sin(a) * 44} x2={200 + Math.cos(a) * 60} y2={200 + Math.sin(a) * 60} />
    );
  });

  return (
    <div className="thali" role="img" aria-label="A brass thali filling with the restaurant's five signature dishes.">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="plateBrass" cx="38%" cy="30%">
            <stop offset="0%" stopColor="#e7c787" />
            <stop offset="45%" stopColor="#c08a3e" />
            <stop offset="78%" stopColor="#8a5f26" />
            <stop offset="100%" stopColor="#5e401a" />
          </radialGradient>
          <radialGradient id="bowlBrass" cx="35%" cy="28%">
            <stop offset="0%" stopColor="#dcc08a" />
            <stop offset="70%" stopColor="#a9782f" />
            <stop offset="100%" stopColor="#6b4c1d" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="192" fill="url(#plateBrass)" />
        <circle cx="200" cy="200" r="178" fill="none" stroke="#5e401a" strokeWidth="1.5" opacity="0.7" />
        <circle cx="200" cy="200" r="170" fill="none" stroke="#e7c787" strokeWidth="0.8" opacity="0.45" />
      </svg>

      <div className="thali-ring" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle cx="200" cy="200" r="68" fill="none" stroke="#5e401a" strokeWidth="1" opacity="0.55" />
          <g stroke="#5e401a" strokeWidth="0.9" opacity="0.5" strokeLinecap="round">{engrave}</g>
          <circle cx="200" cy="200" r="14" fill="none" stroke="#5e401a" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {dishes.map((d, i) => {
        const a = ((ANGLES[i] - 90) * Math.PI) / 180;
        return (
          <div
            key={d.id}
            className={`bowl${hot === d.id ? " is-hot" : ""}`}
            style={
              {
                "--i": i,
                "--tl": `--dish-${d.id}`,
                left: `${50 + Math.cos(a) * 29.5}%`,
                top: `${50 + Math.sin(a) * 29.5}%`,
              } as React.CSSProperties
            }
          >
            <div className="bowl-inner">
              <Bowl fill={FILL[d.id] ?? "#6b452f"} />
              <span className="bowl-steam loop" />
              <span className="bowl-steam loop" style={{ animationDelay: "1.4s" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
