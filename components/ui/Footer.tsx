import { distances, meals, nav, site } from "@/content/site";
import { journeys } from "@/content/journeys";
import { rooms } from "@/content/rooms";
import { TLink } from "@/components/motion/PageTransition";
import { CallCTA } from "./WhatsAppCTA";
import { AipanMotif } from "./AipanMotif";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 rule-t bg-ink-soft/60">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <AipanMotif variant="kamal" className="h-8 w-8 text-brass" strokeWidth={1.3} />
            <p className="font-display text-xl text-rice">
              Moti Mahal <span className="text-brass">Inn</span>
            </p>
          </div>
          <p lang="hi" className="mt-2 text-sm text-mist/65">
            {site.nameDeva} · हल्द्वानी
          </p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-mist/70">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
          </address>
          <div className="mt-5 flex flex-col gap-2">
            <CallCTA />
            <a
              href={`mailto:${site.email}`}
              className="text-[0.8125rem] text-rice/70 transition-colors hover:text-rice"
            >
              {site.email}
            </a>
          </div>
        </div>

        <nav aria-label="Rooms and dining">
          <h2 className="eyebrow">Stay and eat</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {rooms.map((r) => (
              <li key={r.slug}>
                <TLink
                  href={`/rooms/${r.slug}`}
                  className="text-mist/70 transition-colors hover:text-rice"
                >
                  {r.name} room
                </TLink>
              </li>
            ))}
            {nav.slice(1, 3).map((n) => (
              <li key={n.href}>
                <TLink href={n.href} className="text-mist/70 transition-colors hover:text-rice">
                  {n.label}
                </TLink>
              </li>
            ))}
            <li>
              <TLink href="/chocolate" className="text-mist/70 transition-colors hover:text-rice">
                Chocolate hampers
              </TLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Journeys">
          <h2 className="eyebrow">From the door</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {journeys.map((j) => (
              <li key={j.slug}>
                <TLink
                  href={`/journeys/${j.slug}`}
                  className="flex items-baseline gap-2 text-mist/70 transition-colors hover:text-rice"
                >
                  {j.name}
                  <span className="tnum text-[0.6875rem] text-brass/90">{j.km} km</span>
                </TLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Getting here</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {distances.map((d) => (
              <li key={d.place} className="flex items-baseline justify-between gap-3">
                <span className="text-mist/70">{d.place}</span>
                <span className="tnum shrink-0 text-brass">{d.display}</span>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-8">Kitchen hours</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {meals.map((m) => (
              <li key={m.label} className="flex items-baseline justify-between gap-3">
                <span className="text-mist/70">{m.label}</span>
                <span className="tnum shrink-0 text-mist/65">
                  {m.from}–{m.to}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.75rem] leading-relaxed text-mist/65">
            Check in {site.checkIn} · Check out {site.checkOut}
            <br />
            Room service, 24 hours.
          </p>
        </div>
      </div>

      <div className="rule-t">
        <div className="shell flex flex-col gap-4 py-6 text-[0.75rem] text-mist/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}, Haldwani. Kumaon ka Dwar.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <TLink href="/about" className="transition-colors hover:text-mist/80">
              The family
            </TLink>
            <TLink href="/contact" className="transition-colors hover:text-mist/80">
              Directions
            </TLink>
            <TLink href="/gallery" className="transition-colors hover:text-mist/80">
              Gallery
            </TLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
