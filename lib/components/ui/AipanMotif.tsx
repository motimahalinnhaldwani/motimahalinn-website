/**
 * Aipan — Kumaoni ritual folk art, white rice paste on red-ochre ground, drawn
 * at doorways and thresholds to welcome and protect.
 *
 * §2.3 — never wallpaper. Always a line being drawn, in real time, by the
 * scroll. The geometry is generated rather than hand-authored so every path is
 * a single continuous stroke that stroke-dashoffset can draw.
 */

const TAU = Math.PI * 2;
const pt = (r: number, deg: number, cx = 100, cy = 100) => {
  const a = ((deg - 90) * TAU) / 360;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)].map((n) => n.toFixed(2));
};

/** Ashtadal kamal — the eight-petal lotus. */
function ashtadalKamal() {
  const petals: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = k * 45;
    const [x0, y0] = pt(22, a);
    const [x1, y1] = pt(80, a);
    const [cxA, cyA] = pt(58, a - 17);
    const [cxB, cyB] = pt(58, a + 17);
    petals.push(`M ${x0} ${y0} Q ${cxA} ${cyA} ${x1} ${y1} Q ${cxB} ${cyB} ${x0} ${y0} Z`);
  }
  const inner: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = k * 45 + 22.5;
    const [x0, y0] = pt(14, a);
    const [x1, y1] = pt(46, a);
    const [cxA, cyA] = pt(32, a - 13);
    const [cxB, cyB] = pt(32, a + 13);
    inner.push(`M ${x0} ${y0} Q ${cxA} ${cyA} ${x1} ${y1} Q ${cxB} ${cyB} ${x0} ${y0} Z`);
  }
  const dots: [number, number][] = [];
  for (let k = 0; k < 16; k++) {
    const [x, y] = pt(92, k * 22.5).map(Number) as [number, number];
    dots.push([x, y]);
  }
  return { petals, inner, dots, rings: [86, 12] };
}

/** Saraswati chowki — the seat. Nested squares, one turned. */
function saraswatiChowki() {
  const sq = (h: number, rot: number) => {
    const p = [0, 90, 180, 270].map((d) => pt(h, d + rot));
    return `M ${p[0][0]} ${p[0][1]} L ${p[1][0]} ${p[1][1]} L ${p[2][0]} ${p[2][1]} L ${p[3][0]} ${p[3][1]} Z`;
  };
  const frames = [sq(88, 0), sq(88, 45), sq(60, 0), sq(60, 45), sq(30, 0)];
  const dots: [number, number][] = [0, 90, 180, 270].map(
    (d) => pt(74, d + 45).map(Number) as [number, number],
  );
  return { frames, dots };
}

/** Jyoti patta — the lamp. Rays from a bindu. */
function jyotiPatta() {
  const rays: string[] = [];
  for (let k = 0; k < 24; k++) {
    const a = k * 15;
    const r0 = k % 2 === 0 ? 34 : 44;
    const r1 = k % 2 === 0 ? 88 : 70;
    const [x0, y0] = pt(r0, a);
    const [x1, y1] = pt(r1, a);
    rays.push(`M ${x0} ${y0} L ${x1} ${y1}`);
  }
  return { rays, rings: [30, 94] };
}

/**
 * Bel — the meandering vine that runs along a threshold. Also the shape the
 * Gaula takes through Haldwani, which is not a coincidence we are going to
 * apologise for.
 */
export function belPath(width = 1200, amp = 14, waves = 7) {
  const step = width / waves;
  let d = `M 0 ${20}`;
  for (let i = 0; i < waves; i++) {
    const x0 = i * step;
    const dir = i % 2 === 0 ? -1 : 1;
    d += ` C ${x0 + step * 0.28} ${20 + amp * dir}, ${x0 + step * 0.72} ${20 - amp * dir}, ${
      x0 + step
    } ${20}`;
  }
  return d;
}

export type MotifVariant = "kamal" | "chowki" | "jyoti";

export function AipanMotif({
  variant = "kamal",
  className,
  strokeWidth = 1.1,
  pathClassName = "aipan-path",
}: {
  variant?: MotifVariant;
  className?: string;
  strokeWidth?: number;
  pathClassName?: string;
}) {
  /* pathLength normalises every path to 1 unit, so a CSS transition can draw
     it with no JavaScript measurement and no per-frame work. */
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
    pathLength: 1,
  };

  if (variant === "chowki") {
    const { frames, dots } = saraswatiChowki();
    return (
      <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
        {frames.map((d, i) => (
          <path key={i} d={d} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
        ))}
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.4} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
        ))}
      </svg>
    );
  }

  if (variant === "jyoti") {
    const { rays, rings } = jyotiPatta();
    return (
      <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
        {rings.map((r, i) => (
          <circle key={`r${i}`} cx={100} cy={100} r={r} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
        ))}
        {rays.map((d, i) => (
          <path key={i} d={d} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
        ))}
        <circle cx={100} cy={100} r={5} className={pathClassName} style={{ ["--i" as string]: 0 }} {...stroke} />
      </svg>
    );
  }

  const { petals, inner, dots, rings } = ashtadalKamal();
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {rings.map((r, i) => (
        <circle key={`r${i}`} cx={100} cy={100} r={r} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
      ))}
      {petals.map((d, i) => (
        <path key={`p${i}`} d={d} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
      ))}
      {inner.map((d, i) => (
        <path key={`i${i}`} d={d} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
      ))}
      {dots.map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r={1.8} className={pathClassName} style={{ ["--i" as string]: i }} {...stroke} />
      ))}
    </svg>
  );
}
