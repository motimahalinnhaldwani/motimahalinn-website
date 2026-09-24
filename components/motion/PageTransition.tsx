"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { prefersReducedMotion } from "@/lib/tier";
import { AipanMotif, belPath } from "@/components/ui/AipanMotif";

/**
 * §5.7 — an aipan motif draws across the viewport in geru, holds 120ms, then
 * erases to reveal the new route. About 700ms end to end.
 *
 * Implemented as a navigation gate rather than an exit animation, because the
 * App Router swaps the tree the moment the route resolves and there is nothing
 * left to animate out by then.
 */

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });

const COVER = 340;
const HOLD = 120;
const REVEAL = 340;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "hold" | "reveal">("idle");
  const pending = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      pending.current = href;
      setPhase("cover");
      window.setTimeout(() => {
        setPhase("hold");
        router.push(href);
      }, COVER);
    },
    [pathname, router],
  );

  /* The new route has painted — pull the curtain back. */
  useEffect(() => {
    if (phase !== "hold") return;
    const id = window.setTimeout(() => setPhase("reveal"), HOLD);
    return () => window.clearTimeout(id);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const id = window.setTimeout(() => {
      setPhase("idle");
      pending.current = null;
    }, REVEAL);
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <div
        className="route-veil"
        data-phase={phase}
        aria-hidden="true"
        role="presentation"
      >
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="route-veil-bel"
          focusable="false"
        >
          <path d={belPath(1200, 11, 9)} fill="none" stroke="currentColor" strokeWidth={1.2} />
        </svg>
        <AipanMotif variant="chowki" className="route-veil-motif" strokeWidth={1} />
      </div>
    </TransitionCtx.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionCtx);
}

/** A Link that goes through the threshold. Falls back to a plain Link for
    modified clicks, external URLs and anything the browser should own. */
export function TLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href">) {
  const { navigate } = useTransition();
  const external = /^(https?:|tel:|mailto:|#)/.test(href);

  if (external) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
