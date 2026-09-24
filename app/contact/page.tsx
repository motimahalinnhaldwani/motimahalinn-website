import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import WhatsAppCTA, { CallCTA } from "@/components/ui/WhatsAppCTA";
import { generalHref } from "@/lib/whatsapp";
import JsonLd from "@/components/ui/JsonLd";
import AipanThreshold from "@/components/motion/AipanThreshold";
import MapEmbed from "@/components/ui/MapEmbed";
import { distances, meals, site } from "@/content/site";
import { breadcrumbSchema, faqSchema, distanceFaqs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact and directions",
  description:
    "Moti Mahal Inn, Nainital Road, opposite SDM Court, Haldwani 263139. 300 m from the bus station, 1 km from the railway station, 6.2 km from Kathgodam.",
  alternates: { canonical: "/contact" },
};

const arrivals = [
  {
    from: "From the bus station",
    body: "Come out of the main gate and turn right onto Nainital Road. Three hundred metres — about four minutes on foot, past the SDM Court gate. If you have luggage, any auto will do it for twenty rupees and you will feel silly about it.",
  },
  {
    from: "From Haldwani railway station",
    body: "One kilometre. Turn left out of the station and stay on the main road. About twelve minutes walking, five by auto. Trains from Delhi and Lucknow come in here.",
  },
  {
    from: "From Kathgodam railway station",
    body: "Six kilometres back towards town. Autos and shared jeeps run constantly; a private auto is around ₹150. This is where the Ranikhet Express and the Shatabdi terminate — the line stops here because the hills start.",
  },
  {
    from: "From Pantnagar Airport",
    body: "Thirty-two and a half kilometres, about fifty minutes. Taxis wait outside arrivals — or ask us and we will arrange your pickup and drop.",
  },
  {
    from: "Driving",
    body: "NH-87 from Rudrapur and Rampur. We are on the left as the road begins to climb towards Nainital, opposite the SDM Court. Parking on site is free for guests.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Finding us"
        title="Opposite the SDM Court, on the road that goes up."
        lede="Moti Mahal Inn sits on Nainital Road at the point where Haldwani stops being a plains town and starts being the way into Kumaon. The bus and railway stations are both walking distance."
        motif="jyoti"
        trail={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <section className="shell mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="display-md text-rice">Getting here</h2>
          <dl className="mt-8 space-y-7">
            {arrivals.map((a) => (
              <div key={a.from} className="rule-t pt-4">
                <dt className="font-display text-xl text-rice">{a.from}</dt>
                <dd className="measure mt-2 text-[0.9375rem] leading-relaxed text-mist/75">
                  {a.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="display-md text-rice">The details</h2>

          <address className="mt-8 not-italic text-[1.0625rem] leading-relaxed text-rice/85">
            {site.legalName}
            <br />
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.district} District
            <br />
            {site.address.region} <span className="tnum">{site.address.postalCode}</span>
          </address>

          <div className="mt-7 flex flex-col items-start gap-4">
            <CallCTA />
            <WhatsAppCTA href={generalHref} label="WhatsApp the desk" variant="ghost" />
          </div>

          <ul className="mt-10 space-y-3">
            {distances.map((d) => (
              <li key={d.place} className="rule-t flex items-baseline justify-between gap-4 pt-3">
                <span className="text-sm text-rice/85">{d.place}</span>
                <span className="tnum shrink-0 font-display text-xl text-brass">{d.display}</span>
              </li>
            ))}
          </ul>

          <h3 className="eyebrow mt-10">Hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {meals.map((m) => (
              <li key={m.label} className="flex items-baseline justify-between gap-3">
                <span className="text-mist/70">{m.label}</span>
                <span className="tnum text-mist/65">
                  {m.from}–{m.to}
                </span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-3">
              <span className="text-mist/70">Front desk &amp; room service</span>
              <span className="text-brass">24/7</span>
            </li>
          </ul>

          <p className="mt-8 text-[0.8125rem] text-mist/65">
            Check in from <span className="tnum">{site.checkInText}</span> · Check out by{" "}
            <span className="tnum">{site.checkOutText}</span>
          </p>
        </div>
      </section>

      <AipanThreshold variant="kamal" label="The map" />

      <section className="shell pb-20">
        <div className="overflow-hidden rounded-sm border border-brass/20">
          <MapEmbed />
        </div>
        <p className="mt-4 text-[0.8125rem] text-mist/65">
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline underline-offset-4"
          >
            Open in Google Maps
          </a>{" "}
          for turn-by-turn directions.
        </p>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]),
          faqSchema(distanceFaqs),
        ]}
      />
    </>
  );
}
