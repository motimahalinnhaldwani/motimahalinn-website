"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { prefersReducedMotion } from "@/lib/tier";

/**
 * A quiet page change: the page settles out, a hairline of brass runs along the
 * top while the next one loads, and the new page rises in. No curtain.
 *
 * It is a navigation gate rather than an exit animation, because the App Router
 * swaps the tree the moment the route resolves and there is nothing left to
 * animate out by then. The phase lives on <html data-route>, so CSS does the rest.
 */

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });

const LEAVE = 240;
const ENTER = 650;

function setPhase(phase: "leave" | "enter" | null) {
  const d = document.documentElement;
  if (phase) d.dataset.route = phase;
  else delete d.dataset.route;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const from = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      // Same page, different hash or query: nothing to transition.
      if ((href.split(/[?#]/)[0] || pathname) === pathname || prefersReducedMotion()) {
        router.push(href);
        return;
      }
      from.current = pathname;
      setPhase("leave");
      window.setTimeout(() => router.push(href), LEAVE);
      // Never strand the page faded out if the navigation stalls or fails.
      window.setTimeout(() => {
        if (document.documentElement.dataset.route === "leave") setPhase(null);
      }, 4000);
    },
    [pathname, router],
  );

  /* The new route has rendered — bring it in, then get out of the way. */
  useEffect(() => {
    if (from.current === null || pathname === from.current) return;
    from.current = null;
    setPhase("enter");
    const id = window.setTimeout(() => setPhase(null), ENTER);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <div className="route-line" aria-hidden="true" />
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
