import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { TLink } from "@/components/motion/PageTransition";
import { AipanMotif, type MotifVariant } from "./AipanMotif";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  trail,
  motif = "kamal",
  children,
}: {
  eyebrow: ReactNode;
  title: string;
  lede?: string;
  trail?: { name: string; href: string }[];
  motif?: MotifVariant;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-32 sm:pt-40">
      <AipanMotif
        variant={motif}
        className="pointer-events-none absolute -right-20 -top-10 h-[24rem] w-[24rem] text-geru/12"
      />
      <div className="shell relative">
        {trail?.length ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-mist/65">
              {trail.map((t, i) => (
                <li key={t.href} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  <TLink href={t.href} className="transition-colors hover:text-brass">
                    {t.name}
                  </TLink>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal as="h1" className="display-lg mt-5 max-w-[18ch] text-rice">
          {title}
        </Reveal>
        {lede ? (
          <Reveal as="p" className="lede measure mt-6">
            {lede}
          </Reveal>
        ) : null}
        {children}
      </div>
    </header>
  );
}
