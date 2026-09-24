"use client";

import { useId, useMemo, useState } from "react";
import { hamper } from "@/content/menu";
import { rupees } from "@/lib/format";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * §5 — the chocolate hamper.
 *
 * Tier B/C configurator: DOM and SVG, no WebGL, same business result. Phase 3
 * swaps the preview for an orbiting R3F box behind this identical form — the
 * controls stay where they are, so the whole thing remains keyboard-operable
 * and the canvas is only ever an enhancement (§7).
 *
 * "6 months, unrefrigerated" is what makes these shippable gifts. Lean on it.
 */

const GRID: Record<number, { cols: number; rows: number }> = {
  6: { cols: 3, rows: 2 },
  12: { cols: 4, rows: 3 },
  24: { cols: 6, rows: 4 },
};

function Preview({
  count,
  ribbon,
  fill,
}: {
  count: number;
  ribbon: string;
  fill: string;
}) {
  const { cols, rows } = GRID[count] ?? GRID[12];
  const W = 320;
  const H = 230;
  const padX = 34;
  const padY = 52;
  const cw = (W - padX * 2) / cols;
  const ch = (H - padY - 34) / rows;
  const r = Math.min(cw, ch) * 0.34;

  const sweets = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      sweets.push(
        <g key={`${x}-${y}`}>
          <rect
            x={padX + x * cw + cw / 2 - r}
            y={padY + y * ch + ch / 2 - r}
            width={r * 2}
            height={r * 2}
            rx={r * 0.34}
            fill={fill}
          />
          <rect
            x={padX + x * cw + cw / 2 - r}
            y={padY + y * ch + ch / 2 - r}
            width={r * 2}
            height={r * 0.7}
            rx={r * 0.3}
            fill="#fff"
            opacity="0.12"
          />
        </g>,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 40}`}
      className="w-full"
      role="img"
      aria-label={`A gift box holding ${count} ${fill === "#E8D9C5" ? "white" : ""} chocolates, tied with a ribbon.`}
    >
      {/* lid, standing behind */}
      <rect x="54" y="6" width={W - 108} height="34" rx="3" fill="#2A1A12" />
      <rect x="54" y="6" width={W - 108} height="34" rx="3" fill="none" stroke={ribbon} strokeWidth="1.2" opacity="0.7" />

      {/* tray */}
      <rect x="18" y="36" width={W - 36} height={H - 30} rx="4" fill="#3A2318" />
      <rect x="26" y="44" width={W - 52} height={H - 46} rx="3" fill="#24150E" />
      {sweets}

      {/* ribbon */}
      <rect x={W / 2 - 9} y="36" width="18" height={H - 30} fill={ribbon} opacity="0.92" />
      <rect x="18" y={H / 2 + 6} width={W - 36} height="18" fill={ribbon} opacity="0.92" />
      <path
        d={`M ${W / 2} ${H / 2 + 15} q -30 -26 -46 -4 q 14 16 46 4 q 30 -26 46 -4 q -14 16 -46 4 Z`}
        fill={ribbon}
      />
      <circle cx={W / 2} cy={H / 2 + 15} r="7" fill={ribbon} />
      <circle cx={W / 2} cy={H / 2 + 15} r="7" fill="#000" opacity="0.18" />

      {/* shadow */}
      <ellipse cx={W / 2} cy={H + 26} rx={W / 2 - 24} ry="10" fill="#3A2318" opacity="0.16" />
    </svg>
  );
}

export default function HamperConfigurator({ light = true }: { light?: boolean }) {
  const id = useId();
  const [sizeId, setSizeId] = useState<string>(hamper.sizes[1].id);
  const [ribbonId, setRibbonId] = useState<string>(hamper.ribbons[0].id);
  const [fillId, setFillId] = useState<string>(hamper.fills[3].id);

  const size = hamper.sizes.find((s) => s.id === sizeId)!;
  const ribbon = hamper.ribbons.find((r) => r.id === ribbonId)!;
  const fill = hamper.fills.find((f) => f.id === fillId)!;

  const href = useMemo(
    () =>
      whatsappHref({
        intent: "hamper",
        extra: `${size.label} chocolates (${size.count}), ${fill.label.toLowerCase()}, ${ribbon.label.toLowerCase()} ribbon — ${rupees(
          size.price,
        )}.`,
      }),
    [size, fill, ribbon],
  );

  const label = light ? "text-cocoa-soft" : "text-mist/70";
  const heading = light ? "text-cocoa" : "text-rice";
  const border = light ? "border-cocoa/20" : "border-brass/25";

  return (
    <div className={`grid gap-10 rounded-sm border ${border} p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12`}>
      <div className="order-2 lg:order-1">
        <fieldset className="border-0 p-0">
          <legend className={`text-[0.625rem] uppercase tracking-[0.2em] ${label}`}>
            How many
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {hamper.sizes.map((s) => (
              <label
                key={s.id}
                className={`cursor-pointer rounded-sm border px-4 py-2 text-sm transition-colors ${
                  sizeId === s.id
                    ? light
                      ? "border-cocoa bg-cocoa text-cream"
                      : "border-brass bg-brass text-ink"
                    : `${border} ${heading} hover:border-current`
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-size`}
                  value={s.id}
                  checked={sizeId === s.id}
                  onChange={() => setSizeId(s.id)}
                  className="sr-only"
                />
                {s.label}
                <span className="tnum ml-2 opacity-85">{rupees(s.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7 border-0 p-0">
          <legend className={`text-[0.625rem] uppercase tracking-[0.2em] ${label}`}>
            Which chocolate
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {hamper.fills.map((f) => (
              <label
                key={f.id}
                className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors ${
                  fillId === f.id ? "border-current" : `${border} opacity-70 hover:opacity-100`
                } ${heading}`}
              >
                <input
                  type="radio"
                  name={`${id}-fill`}
                  value={f.id}
                  checked={fillId === f.id}
                  onChange={() => setFillId(f.id)}
                  className="sr-only"
                />
                <span
                  className="h-4 w-4 rounded-sm ring-1 ring-black/15"
                  style={{ background: f.hex }}
                  aria-hidden="true"
                />
                {f.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7 border-0 p-0">
          <legend className={`text-[0.625rem] uppercase tracking-[0.2em] ${label}`}>
            Ribbon
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {hamper.ribbons.map((rb) => (
              <label
                key={rb.id}
                className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors ${
                  ribbonId === rb.id ? "border-current" : `${border} opacity-70 hover:opacity-100`
                } ${heading}`}
              >
                <input
                  type="radio"
                  name={`${id}-ribbon`}
                  value={rb.id}
                  checked={ribbonId === rb.id}
                  onChange={() => setRibbonId(rb.id)}
                  className="sr-only"
                />
                <span
                  className="h-4 w-4 rounded-sm ring-1 ring-black/15"
                  style={{ background: rb.hex }}
                  aria-hidden="true"
                />
                {rb.label}
              </label>
            ))}
          </div>
        </fieldset>

        <p className={`mt-8 flex items-baseline gap-3 ${heading}`} aria-live="polite">
          <span className="tnum font-display text-4xl">{rupees(size.price)}</span>
          <span className={`text-sm ${label}`}>
            {size.count} pieces · {fill.label.toLowerCase()}
          </span>
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex rounded-sm px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors ${
            light ? "bg-cocoa text-cream hover:bg-cocoa-soft" : "bg-brass text-ink hover:bg-haldu"
          }`}
        >
          Order on WhatsApp
        </a>

        <p className={`mt-3 text-[0.75rem] ${label}`}>{hamper.keeps}</p>
      </div>

      <div className="order-1 flex items-center lg:order-2">
        <Preview count={size.count} ribbon={ribbon.hex} fill={fill.hex} />
      </div>
    </div>
  );
}
