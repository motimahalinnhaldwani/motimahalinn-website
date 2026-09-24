import type { gsap as GSAP } from "gsap";

type Setup = (engine: { gsap: typeof GSAP }) => void | (() => void);

/**
 * Loads GSAP + ScrollTrigger on demand (keeps them out of the first paint)
 * and runs `setup` once they arrive. Returns a cleanup that is safe to call
 * before the load has finished.
 */
export function withEngine(setup: Setup): () => void {
  let cancelled = false;
  let cleanup: void | (() => void);

  Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      cleanup = setup({ gsap });
    },
  );

  return () => {
    cancelled = true;
    cleanup?.();
  };
}
