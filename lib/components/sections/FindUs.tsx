import Reveal from "@/components/motion/Reveal";
import { CallCTA } from "@/components/ui/WhatsAppCTA";
import MapEmbed from "@/components/ui/MapEmbed";
import { distances, places, site } from "@/content/site";

export default function FindUs() {
  return (
    <section className="relative z-10 pb-24 pt-10 sm:pb-32" aria-labelledby="find-heading">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal as="p" className="eyebrow">Finding us</Reveal>
          <Reveal as="h2" id="find-heading" className="display-md mt-5 max-w-[18ch] text-rice">
            Opposite the SDM Court, on the road that goes up to Nainital.
          </Reveal>
          <address className="mt-7 not-italic text-[0.9375rem] leading-relaxed text-mist/75">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region} <span className="tnum">{site.address.postalCode}</span>
          </address>
          <div className="mt-6 flex flex-col items-start gap-3">
            <CallCTA />
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] text-rice/75 underline decoration-brass/40 underline-offset-4 hover:text-rice"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="mt-8 overflow-hidden rounded-sm border border-brass/25">
            <MapEmbed />
          </div>
        </div>

        <div>
          <ul>
            {distances.map((d) => (
              <li key={d.place} className="rule-t flex items-baseline justify-between gap-4 py-3.5">
                <span>
                  <span className="block text-[0.9375rem] text-rice/90">{d.place}</span>
                  <span className="block text-[0.8125rem] text-mist/70">{d.note}</span>
                </span>
                <span className="tnum shrink-0 font-display text-2xl text-brass">{d.display}</span>
              </li>
            ))}
          </ul>
          <p className="rule-t pt-4 text-[0.8125rem] leading-relaxed text-mist/70">
            Up the hill from here:{" "}
            {places.map((n, i) => (
              <span key={n.id}>
                {n.place} <span className="tnum text-brass/90">{n.km} km</span>
                {i < places.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
