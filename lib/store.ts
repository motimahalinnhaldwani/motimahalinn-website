import { create } from "zustand";
import type { Tier } from "./tier";

/**
 * Two kinds of state, deliberately separated.
 *
 * `scrollState` is a plain mutable singleton written every animation frame by
 * SmoothScroll and read by rAF consumers (and, from Phase 3, by R3F). Putting a
 * 60 Hz value through React would re-render the tree sixty times a second for
 * no benefit — §5.1 asks for one source of truth, not one React subscription.
 *
 * The Zustand store below holds only discrete state that genuinely changes the
 * rendered output.
 */

export type ScrollState = {
  /** 0 → 1 across the whole document. The plains-to-hills axis. §2.2 */
  progress: number;
  velocity: number;
  direction: 1 | -1;
  y: number;
};

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  direction: 1,
  y: 0,
};

export type CursorMode = "default" | "hover" | "drag" | "text";

type UIState = {
  tier: Tier;
  reducedMotion: boolean;
  ready: boolean;
  audioOn: boolean;
  navOpen: boolean;
  cursorMode: CursorMode;
  pastHero: boolean;

  setTier: (t: Tier) => void;
  setReducedMotion: (v: boolean) => void;
  setReady: (v: boolean) => void;
  toggleAudio: () => void;
  setNavOpen: (v: boolean) => void;
  setCursorMode: (m: CursorMode) => void;
  setPastHero: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  tier: "C",
  reducedMotion: false,
  ready: false,
  audioOn: false,
  navOpen: false,
  cursorMode: "default",
  pastHero: false,

  setTier: (tier) => set({ tier }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setReady: (ready) => set({ ready }),
  toggleAudio: () =>
    set((s) => {
      const audioOn = !s.audioOn;
      try {
        localStorage.setItem("mmi:audio", audioOn ? "1" : "0");
      } catch {
        /* no-op */
      }
      return { audioOn };
    }),
  setNavOpen: (navOpen) => set({ navOpen }),
  setCursorMode: (cursorMode) => set({ cursorMode }),
  setPastHero: (pastHero) => set({ pastHero }),
}));
