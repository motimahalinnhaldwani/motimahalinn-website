import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHeader from "@/components/ui/PageHeader";
import Frame, { Evidence } from "@/components/ui/Frame";
import Icon, { glyphFor } from "@/components/ui/Icons";
import EnquiryForm from "@/components/ui/EnquiryForm";
import JsonLd from "@/components/ui/JsonLd";
import TrustRow from "@/components/ui/TrustRow";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { rooms, roomBySlug } from "@/content/rooms";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { rupees } from "@/lib/format";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = roomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.name} room · ${room.sqft} sq ft`,
    description: `${room.name} room at Moti Mahal Inn, Haldwani — ${room.sqft} sq ft, ${room.beds.toLowerCase()}, sleeps ${room.sleeps}, from ₹${room.from} a night.`,
    alternates: { canonical: `/rooms/${room.slug}` },
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = roomBySlug(slug);
  if (!room) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${room.name} · ${room.sqft} sq ft`}
        title={room.line}
        lede={room.body}
        motif="chowki"
        trail={[
          { name: "Home", href: "/" },
          { name: "Rooms", href: "/rooms" },
          { name: room.name, href: `/rooms/${room.slug}` },
        ]}
      >
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p className="text-sm text-mist/65">
            From{" "}
            <span className="tnum font-display text-4xl text-brass">
              {rupees(room.from)}
            </span>{" "}
            a night, plus taxes
          </p>
          <p className="text-sm text-mist/65">
            {room.beds} · sleeps <span className="tnum">{room.sleeps}</span>
          </p>
        </div>
        <TrustRow className="mt-7" />
      </PageHeader>

      <div className="shell mt-14 grid gap-6 lg:grid-cols-3">
        {room.gallery.map((key, i) => (
          <Frame
            key={key + i}
            img={images[key]}
            className="w-full"
            sizes="(max-width: 1024px) 100vw, 31vw"
            priority={i === 0}
          />
        ))}
      </div>

      <AipanThreshold variant="jyoti" label="Walk through it" />

      <section className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16" aria-labelledby="walkthrough">
        <div>
          <h2 id="walkthrough" className="display-md text-rice">
            What is where
          </h2>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-mist/75">
            A drag-to-look 360° capture of this room is being shot. Until it is here, this
            is the same information in words — which is what every meaningful 3D state on
            this site is required to have anyway.
          </p>

          <dl className="mt-8 space-y-6">
            {room.hotspots.map((h) => (
              <div key={h.id} className="rule-t pt-4">
                <dt className="flex items-center gap-2.5 font-display text-xl text-rice">
                  <Icon name={glyphFor(h.label)} className="h-4 w-4 text-brass" />
                  {h.label}
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-mist/70">
                  {h.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="display-md text-rice">The floor plan</h2>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-mist/75">
            Drawn to scale, with the bed in place. {room.sqft} square feet is{" "}
            {room.sqft === 120 ? "about eleven" : "about fifteen"} square metres.
          </p>
          <Frame img={images[room.plan]} className="mt-7 w-full" sizes="(max-width: 1024px) 100vw, 46vw" />

          <Evidence
            img={images[room.hero]}
            caption={`${room.name} room as photographed today.`}
            className="mt-8 max-w-[20rem]"
          />

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[0.8125rem] text-mist/65">
                <Icon name={glyphFor(a)} className="h-4 w-4 text-brass" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell mt-20 pb-20" aria-labelledby="book-room">
        <h2 id="book-room" className="display-md text-rice">
          Take this room.
        </h2>
        <p className="lede measure mt-4">
          Direct, and answered by a person. Tell us if you are arriving late or leaving
          before dawn — it changes which room we give you.
        </p>
        <div className="mt-8 max-w-3xl">
          <EnquiryForm defaults={{ room: room.slug }} />
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Rooms", href: "/rooms" },
            { name: room.name, href: `/rooms/${room.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            name: `${room.name} room`,
            description: room.body,
            occupancy: { "@type": "QuantitativeValue", maxValue: room.sleeps },
            floorSize: {
              "@type": "QuantitativeValue",
              value: room.sqft,
              unitCode: "FTK",
            },
            bed: { "@type": "BedDetails", typeOfBed: room.beds },
            amenityFeature: room.amenities.map((a) => ({
              "@type": "LocationFeatureSpecification",
              name: a,
              value: true,
            })),
            offers: {
              "@type": "Offer",
              price: room.from,
              priceCurrency: "INR",
              url: `${site.url}/rooms/${room.slug}`,
            },
          },
        ]}
      />
    </>
  );
}
