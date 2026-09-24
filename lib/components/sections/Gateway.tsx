"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import { distances, places } from "@/content/site";
import { prefersReducedMotion } from "@/lib/tier";

/**
 * THE GATEWAY — Haldwani is Kumaon ka Dwar. A night map, north up: the roads
 * draw themselves out of the inn and up into the hills, headlights climb them,
 * and the arrivals board flips over to how far the bus, the train and the
 * plane are. Stylised, not to scale; the numbers are the real ones.
 */

type Pt = readonly [number, number];
const INN: Pt = [540, 560];
const KGM: Pt = [585, 505];
const AIRPORT: Pt = [470, 676];
/** Our restaurant: 170 m down the same road — drawn a little apart so the pins don't touch. */
const RESTAURANT: Pt = [566, 600];

/** Haldwani → Kathgodam → up through the switchbacks to Bhowali. */
const TRUNK: Pt[] = [INN, KGM, [575, 470], [548, 448], [572, 428], [540, 405], [560, 385]];
const BHOWALI: Pt[] = [...TRUNK, [566, 340], [548, 318], [570, 300]];

const ROUTES: Record<string, Pt[]> = {
  bhimtal: [INN, KGM, [610, 470], [598, 450], [628, 432], [640, 410], [660, 385]],
  nainital: [...TRUNK, [522, 365], [500, 348], [470, 330]],
  kainchi: [...BHOWALI, [585, 275], [600, 245]],
  corbett: [INN, [505, 536], [450, 526], [390, 527], [330, 518], [270, 503], [210, 487], [150, 470]],
  mukteshwar: [...BHOWALI, [620, 305], [660, 292], [700, 306], [740, 290], [780, 300], [820, 285]],
  almora: [...BHOWALI, [585, 275], [600, 245], [630, 228], [655, 200], [690, 195], [715, 165], [740, 150], [760, 130]],
  airport: [INN, [522, 600], [500, 640], AIRPORT],
};

/** Which side of its pin each label sits on, so nothing collides. */
const SIDE: Record<string, "l" | "r" | "b" | "t"> = {
  bhimtal: "r",
  nainital: "l",
  kainchi: "l",
  corbett: "b",
  mukteshwar: "t",
  almora: "r",
};

/** Catmull-Rom through the waypoints — hill roads, not straight lines. */
function smooth(pts: Pt[]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** Contour lines — denser and higher as the land rises north. */
function contours() {
  const out: { d: string; o: number }[] = [];
  for (let i = 0; i < 12; i++) {
    const y = 520 - i * 38;
    const amp = 6 + i * 4.5;
    const waves = 3 + (i % 3);
    let d = `M -40 ${y}`;
    for (let k = 0; k < waves; k++) {
      const seg = 1080 / waves;
      const x0 = -40 + k * seg;
      const dir = (k + i) % 2 === 0 ? -1 : 1;
      d += ` C ${(x0 + seg * 0.3).toFixed(1)} ${(y + amp * dir).toFixed(1)}, ${(x0 + seg * 0.7).toFixed(1)} ${(y - amp * dir).toFixed(1)}, ${(x0 + seg).toFixed(1)} ${y}`;
    }
    out.push({ d, o: 0.04 + i * 0.018 });
  }
  return out;
}

const LINES = contours();
const PATHS = Object.fromEntries(Object.entries(ROUTES).map(([k, v]) => [k, smooth(v)]));
const RIVER = smooth([[716, 318], [690, 372], [652, 420], [622, 468], [604, 520], [588, 580], [572, 650], [562, 720]]);
const RAIL = smooth([[418, 720], [470, 650], [512, 600], [548, 552], [KGM[0], KGM[1]]]);
const SNOWS =
  "M0 86 L40 70 L70 78 L110 52 L140 64 L175 40 L205 58 L240 46 L262 30 L290 50 L330 38 L360 56 L400 34 L428 22 L456 42 L500 30 L530 48 L566 26 L600 44 L640 36 L672 20 L700 40 L740 32 L776 50 L810 30 L846 44 L880 28 L920 46 L960 38 L1000 54";

/** When each route finishes drawing — its pin lands then. */
const ORDER = ["bhimtal", "nainital", "kainchi", "corbett", "mukteshwar", "almora", "airport"];
const landAt = (id: string) => 0.35 + ORDER.indexOf(id) * 0.18 + 1.4;
const pct = (p: Pt) => ({ left: `${p[0] / 10}%`, top: `${(p[1] / 720) * 100}%` });

const ICON: Record<string, React.ReactNode> = {
  food: <path d="M7 3v7a2 2 0 0 0 4 0V3M9 3v18M17 3c-1.7 1-2.5 3-2.5 6s.8 4 2.5 4v8" />,
  bus: <path d="M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-2 8h18M7 18v2m10-2v2M7 14.5h.01M17 14.5h.01" />,
  train: <path d="M7 3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm-3 8h16M8 21l2-4m6 4-2-4M8 14h.01M16 14h.01" />,
  plane: <path d="M10.2 13.8 3 11l1.5-1.5 8 1 4-4c1-1 2.6-1.4 3.2-.7.7.6.3 2.2-.7 3.2l-4 4 1 8L14.5 22l-2.8-7.2-3.2 3.2.3 2.5-1.3 1.3-1.3-3-3-1.3 1.3-1.3 2.5.3Z" />,
};

export default function Gateway() {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = root.current;
    const map = svg.current;
    if (!el || !map) return;
    map.pauseAnimations?.();

    if (prefersReducedMotion()) {
      el.classList.add("in-view");
      return;
    }

    let arrived = false;
    const timers: number[] = [];
    let raf = 0;

    const arrive = () => {
      arrived = true;
      el.classList.add("in-view");

      // Distances count up as each road reaches its town.
      const counters = [...el.querySelectorAll<HTMLElement>("[data-count]")].map((n) => ({
        n,
        to: Number(n.dataset.count),
        at: performance.now() + Number(n.dataset.at) * 1000 - 900,
      }));
      counters.forEach((c) => (c.n.textContent = "0"));
      const tick = (now: number) => {
        let live = false;
        for (const c of counters) {
          const t = Math.min(1, Math.max(0, (now - c.at) / 900));
          c.n.textContent = String(Math.round(c.to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) live = true;
        }
        raf = live ? requestAnimationFrame(tick) : 0;
      };
      raf = requestAnimationFrame(tick);

      // The arrivals board shuffles its digits before settling, like the real thing.
      el.querySelectorAll<HTMLElement>(".flap[data-digit]").forEach((f, k) => {
        const final = f.textContent ?? "";
        let left = 6 + Number(f.dataset.row) * 3 + (k % 4) * 2;
        const id = window.setInterval(() => {
          if (--left <= 0) {
            f.textContent = final;
            window.clearInterval(id);
            return;
          }
          f.textContent = String(Math.floor(Math.random() * 10));
        }, 70);
        timers.push(id);
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!arrived) arrive();
          map.unpauseAnimations?.();
          el.classList.remove("is-offscreen");
        } else {
          map.pauseAnimations?.();
          el.classList.add("is-offscreen");
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearInterval(t));
    };
  }, []);

  return (
    <section ref={root} className="dark-panel gateway loops relative z-10 py-20 sm:py-28" aria-labelledby="gateway-heading">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          Where you are · Kumaon ka Dwar
        </Reveal>
        <Reveal as="h2" id="gateway-heading" className="display-lg mt-5 max-w-[17ch] text-rice">
          Every road into the hills starts at our door.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Haldwani is the gateway to Kumaon — the last town of the plains. The lakes, the
          ashram and the high ridges are a morning&rsquo;s drive up the road, and the bus
          station is three hundred metres away.
        </Reveal>
      </div>

      <div className="shell mt-12 grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
        <div className="gateway-map relative mx-auto w-full" style={{ aspectRatio: "1000 / 720", maxWidth: "min(100%, calc(76svh * 1000 / 720))" }}>
          {/* Two layers: the land, painted once; and the roads and headlights on
              their own compositor layer, so the moving lights never repaint the land. */}
          <svg viewBox="0 0 1000 720" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
            <defs>
              {/* the decoration fades out at the edges — no box around the map */}
              <radialGradient id="map-fade" cx="0.5" cy="0.5" r="0.62">
                <stop offset="0.62" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="map-edge" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="720">
                <rect width="1000" height="720" fill="url(#map-fade)" />
              </mask>
            </defs>

            <g mask="url(#map-edge)" className="map-contours">
              {/* the snows along the top edge */}
              <path d={SNOWS} fill="none" stroke="#f5ecdc" strokeOpacity="0.28" strokeWidth="1.2" />
              <g fill="none" stroke="#d8cfc0" strokeWidth="1">
                {LINES.map((l, i) => (
                  <path key={i} d={l.d} opacity={l.o} />
                ))}
              </g>
            </g>

            {/* the railway that stops at Kathgodam */}
            <path d={RAIL} fill="none" stroke="#d8cfc0" strokeOpacity="0.35" strokeWidth="1.2" />
            <path d={RAIL} fill="none" stroke="#d8cfc0" strokeOpacity="0.35" strokeWidth="5" strokeDasharray="1.2 7" />

            {/* lakes */}
            <ellipse cx="470" cy="336" rx="15" ry="7" transform="rotate(-18 470 336)" fill="#6f94a0" opacity="0.45" />
            <ellipse cx="662" cy="392" rx="17" ry="8" transform="rotate(10 662 392)" fill="#6f94a0" opacity="0.45" />

            <g className="max-sm:hidden font-sans" fill="#d8cfc0" fillOpacity="0.32" fontSize="13" letterSpacing="5">
              <text x="500" y="108" textAnchor="middle">THE HIGH HIMALAYA</text>
              <text x="170" y="250">KUMAON HILLS</text>
              <text x="120" y="650">THE PLAINS</text>
              <text x="612" y="640" fontSize="11" letterSpacing="3">GAULA RIVER</text>
            </g>
          </svg>

          <svg ref={svg} viewBox="0 0 1000 720" className="map-live absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="lamp">
                <stop offset="0" stopColor="#fff4d6" />
                <stop offset="0.35" stopColor="#f0c060" stopOpacity="0.9" />
                <stop offset="1" stopColor="#f0c060" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* the Gaula */}
            <path d={RIVER} fill="none" stroke="#6f94a0" strokeOpacity="0.5" strokeWidth="2.2" strokeLinecap="round" className="map-draw" pathLength={1} style={{ "--d": "0.2s" } as React.CSSProperties} />

            {/* the roads */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {ORDER.map((id, i) => (
                <path
                  key={id}
                  d={PATHS[id]}
                  data-id={id}
                  pathLength={1}
                  className="map-route"
                  stroke={id === "airport" ? "#8f9a97" : "#d9a441"}
                  strokeWidth={id === "airport" ? 1.4 : 2}
                  style={{ "--d": `${0.35 + i * 0.18}s` } as React.CSSProperties}
                />
              ))}
            </g>

            {/* headlights, climbing */}
            <g className="map-lamps">
              {ORDER.map((id, i) => {
                const km = places.find((p) => p.id === id)?.km ?? 32;
                const dur = `${(5 + km / 11).toFixed(1)}s`;
                const begin = `${(2.2 + i * 0.9).toFixed(1)}s`;
                return (
                  <circle key={id} r="11" fill="url(#lamp)" opacity="0">
                    <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={PATHS[id]} keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear" />
                    <animate attributeName="opacity" dur={dur} begin={begin} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.06;0.8;0.86;1" />
                  </circle>
                );
              })}
            </g>
          </svg>

          <ul className="absolute inset-0 list-none">
            {places.map((p) => (
              <li
                key={p.id}
                className="map-pin"
                data-id={p.id}
                data-side={SIDE[p.id]}
                style={{ ...pct(ROUTES[p.id].at(-1)!), "--at": `${landAt(p.id)}s` } as React.CSSProperties}
              >
                <span className="pin-dot" aria-hidden="true" />
                <span className="pin-label">
                  <span className="pin-name">{p.place}</span>
                  <span className="pin-meta">
                    <span className="tnum" data-count={p.km} data-at={landAt(p.id)}>{p.km}</span> km
                    <span className="max-sm:hidden"> · {p.drive}</span>
                  </span>
                  <span className="pin-note">{p.note}</span>
                </span>
              </li>
            ))}

            <li className="map-pin map-pin--minor" data-side="r" style={{ ...pct(KGM), "--at": "1.2s" } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-label">
                <span className="pin-name">Kathgodam</span>
                <span className="pin-meta">railhead · 6.2 km</span>
              </span>
            </li>
            <li className="map-pin map-pin--minor" data-side="r" style={{ ...pct(AIRPORT), "--at": `${landAt("airport")}s` } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-label">
                <span className="pin-name">Pantnagar airport</span>
                <span className="pin-meta">32.5 km</span>
              </span>
            </li>

            <li className="map-pin map-pin--minor" data-side="r" style={{ ...pct(RESTAURANT), "--at": "0.9s" } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-label">
                <span className="pin-name">Motimahal Restaurant</span>
                <span className="pin-meta">170 m · 2 min walk</span>
              </span>
            </li>

            <li className="map-pin map-pin--home" data-side="l" style={pct(INN)}>
              <span className="home-ring loop" aria-hidden="true" />
              <span className="home-ring loop" aria-hidden="true" style={{ animationDelay: "1.3s" }} />
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-label">
                <span className="pin-name">Moti Mahal Inn</span>
                <span className="pin-meta">You are here · Haldwani</span>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <div className="board" role="group" aria-labelledby="board-heading">
            <div className="flex items-baseline justify-between gap-4 border-b border-brass/20 px-5 py-3.5">
              <p id="board-heading" className="text-[0.6875rem] uppercase tracking-[0.24em] text-haldu">
                Getting here
              </p>
              <p lang="hi" className="text-[0.8125rem] text-mist/65">आगमन</p>
            </div>
            <ul>
              {distances.map((d, r) => {
                const [num, unit] = d.display.split(" ");
                return (
                  <li key={d.place} className="board-row">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brass/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {ICON[d.mode]}
                    </svg>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] text-rice/90">{d.short}</span>
                      <span className="block text-[0.75rem] text-mist/65">{d.time}</span>
                    </span>
                    <span className="flex items-baseline gap-1.5">
                      <span className="sr-only">{d.display}</span>
                      <span className="flex gap-[3px]" aria-hidden="true">
                        {[...num].map((ch, c) => (
                          <span
                            key={c}
                            className="flap tnum"
                            data-digit={/\d/.test(ch) ? "" : undefined}
                            data-row={r}
                            style={{ "--r": r, "--c": c } as React.CSSProperties}
                          >
                            {ch}
                          </span>
                        ))}
                      </span>
                      <span className="w-6 text-[0.75rem] uppercase tracking-[0.12em] text-mist/70" aria-hidden="true">{unit}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-4 text-[0.75rem] leading-relaxed text-mist/65">
            Map not to scale. Approximate road distances and drive times from the inn; the
            hill roads are slower after dark and in the monsoon.
          </p>
        </div>
      </div>
    </section>
  );
}
