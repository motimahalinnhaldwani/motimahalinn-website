import { distances, meals, nav, site } from "@/content/site";
import { rooms } from "@/content/rooms";
import { TLink } from "@/components/motion/PageTransition";
import { generalHref } from "@/lib/whatsapp";
import { CallCTA, WhatsAppGlyph } from "./WhatsAppCTA";
import { AipanMotif } from "./AipanMotif";

export default function Footer() {
  return (
    <footer className="dark-panel relative z-10 rule-t">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <AipanMotif variant="kamal" className="h-8 w-8 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-xl text-rice">
                Moti Mahal <span className="text-brass">Inn</span>
              </p>
              <p className="text-[0.625rem] uppercase tracking-[0.24em] text-mist/70">{site.kinds}</p>
            </div>
          </div>
          <address className="mt-5 not-italic text-sm leading-relaxed text-mist/75">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
          </address>
          <div className="mt-5 flex flex-col items-start gap-2.5">
            <CallCTA />
            <a href={generalHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.8125rem] text-rice/80 transition-colors hover:text-rice">
              <WhatsAppGlyph className="h-4 w-4 text-brass" /> WhatsApp the front desk
            </a>
          </div>
        </div>

        <nav aria-label="Stay">
          <h2 className="eyebrow">Stay</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {rooms.map((r) => (
              <li key={r.slug}>
                <TLink href={`/rooms/${r.slug}`} className="text-mist/75 transition-colors hover:text-rice">
                  {r.name} room
                </TLink>
              </li>
            ))}
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <TLink href={n.href} className="text-mist/75 transition-colors hover:text-rice">
                  {n.label}
                </TLink>
              </li>
            ))}
            <li>
              <TLink href="/book" className="text-mist/75 transition-colors hover:text-rice">Book direct</TLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Hours</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {meals.map((m) => (
              <li key={m.label} className="flex items-baseline justify-between gap-3">
                <span className="text-mist/75">{m.label}</span>
                <span className="tnum shrink-0 text-mist/70">{m.from}–{m.to}</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-3">
              <span className="text-mist/75">Front desk</span>
              <span className="shrink-0 text-mist/70">24/7</span>
            </li>
          </ul>
          <p className="mt-5 text-[0.75rem] text-mist/70">
            Check in {site.checkInText} · Check out {site.checkOutText}
          </p>
        </div>

        <div>
          <h2 className="eyebrow">Getting here</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {distances.map((d) => (
              <li key={d.place} className="flex items-baseline justify-between gap-3">
                <span className="text-mist/75">{d.place}</span>
                <span className="tnum shrink-0 text-brass">{d.display}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rule-t">
        <div className="shell flex flex-col gap-4 py-6 text-[0.75rem] text-mist/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}, Haldwani.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <TLink href="/about" className="transition-colors hover:text-mist">The house</TLink>
            <TLink href="/contact" className="transition-colors hover:text-mist">Directions</TLink>
            <TLink href="/gallery" className="transition-colors hover:text-mist">Gallery</TLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
