/**
 * §6 — performance tiering.
 *
 * The primary user is on a ₹12,000 Android phone on 4G in a moving car.
 * Detected once, cached in sessionStorage, and never re-run on navigation.
 */

export type Tier = "A" | "B" | "C";

const KEY = "mmi:tier";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGL2(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

export function detectTier(): Tier {
  if (typeof window === "undefined") return "C";

  const cached = sessionStorage.getItem(KEY);
  if (cached === "A" || cached === "B" || cached === "C") return cached;

  const nav = navigator as NavigatorWithHints;
  const saveData = nav.connection?.saveData === true;
  const slowNet = ["slow-2g", "2g"].includes(nav.connection?.effectiveType ?? "");

  let tier: Tier;

  if (prefersReducedMotion() || saveData || slowNet || !hasWebGL2()) {
    tier = "C";
  } else {
    const memory = nav.deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.innerWidth >= 1024;

    tier = memory >= 4 && cores >= 4 && (fine || wide) ? "A" : "B";
  }

  try {
    sessionStorage.setItem(KEY, tier);
  } catch {
    /* private mode — detection just re-runs, which is cheap */
  }
  return tier;
}

/** Tier C is static: no scrub, no parallax, no marquee, no cursor. */
export const motionAllowed = (tier: Tier) => tier !== "C";
/** Tier A alone gets a live canvas. B gets the pre-rendered loop. */
export const webglAllowed = (tier: Tier) => tier === "A";
