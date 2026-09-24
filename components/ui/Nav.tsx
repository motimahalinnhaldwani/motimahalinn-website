"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { useUI } from "@/lib/store";
import { TLink } from "@/components/motion/PageTransition";
import { AipanMotif } from "./AipanMotif";
import { CallCTA } from "./WhatsAppCTA";

export default function Nav() {
  const pathname = usePathname();
  const navOpen = useUI((s) => s.navOpen);
  const setNavOpen = useUI((s) => s.setNavOpen);
  const pastHero = useUI((s) => s.pastHero);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, setNavOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNavOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [navOpen, setNavOpen]);

  return (
    <header
      data-scrolled={pastHero || navOpen}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500 data-[scrolled=true]:border-b data-[scrolled=true]:border-brass/15 data-[scrolled=true]:bg-ink/92"
    >
      <div className="shell flex items-center justify-between gap-6 py-4 sm:py-6">
        <TLink
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-rice sm:gap-3"
          aria-label={`${site.name} — home`}
        >
          <AipanMotif
            variant="kamal"
            className="h-7 w-7 text-brass transition-transform duration-700 group-hover:rotate-45"
            strokeWidth={1.4}
          />
          <span className="whitespace-nowrap font-display text-base leading-none tracking-tight sm:text-xl">
            Moti Mahal <span className="text-brass">Inn</span>
          </span>
        </TLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <TLink
                key={n.href}
                href={n.href}
                className={`text-[0.8125rem] uppercase tracking-[0.14em] transition-colors ${
                  active ? "text-brass" : "text-rice/70 hover:text-rice"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {n.label}
              </TLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden xl:block">
            <CallCTA />
          </span>
          <TLink
            href="/book"
            className="hidden rounded-sm border border-brass/45 px-4 py-2 text-[0.75rem] uppercase tracking-[0.14em] text-rice transition-colors hover:bg-brass hover:text-ink sm:inline-flex"
          >
            Book
          </TLink>
          <button
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-expanded={navOpen}
            aria-controls="primary-menu"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-brass/30 text-rice lg:hidden"
          >
            <span className="sr-only">{navOpen ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.4}>
              {navOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="primary-menu"
        hidden={!navOpen}
        className="fixed inset-0 -z-10 flex flex-col justify-center bg-ink/97 px-6 lg:hidden"
      >
        <AipanMotif
          variant="jyoti"
          className="pointer-events-none absolute right-[-18%] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 text-geru/20"
        />
        <nav aria-label="Primary, mobile" className="relative flex flex-col gap-1">
          {nav.map((n) => (
            <TLink
              key={n.href}
              href={n.href}
              className="font-display text-4xl leading-tight text-rice transition-colors hover:text-brass sm:text-5xl"
            >
              {n.label}
            </TLink>
          ))}
          <TLink
            href="/book"
            className="mt-6 inline-flex w-fit rounded-sm bg-brass px-6 py-3 text-[0.8125rem] uppercase tracking-[0.14em] text-ink"
          >
            Check availability
          </TLink>
          <CallCTA className="mt-6" />
        </nav>
      </div>
    </header>
  );
}
