"use client";

import { useInView } from "@/lib/useInView";
import { AipanMotif, belPath, type MotifVariant } from "@/components/ui/AipanMotif";

/**
 * §2.3 — every major section boundary is a threshold, and every threshold
 * draws an aipan motif before the next section resolves.
 *
 * The drawing is a CSS transition on stroke-dashoffset, started once by an
 * IntersectionObserver. It used to be a scrubbed GSAP tween across ~35 paths
 * per threshold — five of them on the home page, all re-rendering every scroll
 * frame. Drawing on arrival looks the same and costs nothing to scroll past.
 */
export default function AipanThreshold({
  variant = "kamal",
  label,
  className = "",
}: {
  variant?: MotifVariant;
  label?: string;
  className?: string;
}) {
  const ref = useInView<HTMLDivElement>({ rootMargin: "0px 0px -12% 0px" });

  return (
    <div
      ref={ref}
      className={`aipan relative isolate flex flex-col items-center justify-center py-16 text-geru sm:py-24 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-8 w-full opacity-70"
        focusable="false"
      >
        <path
          d={belPath()}
          className="aipan-path"
          pathLength={1}
          style={{ ["--i" as string]: 0 }}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <AipanMotif
        variant={variant}
        className="-mt-4 h-24 w-24 sm:h-32 sm:w-32"
        strokeWidth={1}
      />

      {label ? <span className="eyebrow mt-3 text-brass/90">{label}</span> : null}
    </div>
  );
}
