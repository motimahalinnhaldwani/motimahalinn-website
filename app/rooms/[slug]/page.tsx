import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHeader from "@/components/ui/PageHeader";
import Frame, { Evidence } from "@/components/ui/Frame";
import Icon, { glyphFor } from "@/components/ui/Icons";
import BookingComposer from "@/components/ui/BookingComposer";
import JsonLd from "@/components/ui/JsonLd";
import { rooms, roomBySlug } from "@/content/rooms";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = roomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.name} room · ${room.sqft} sq ft`,
    description: `${room.name} room at Moti Mahal Inn, Haldwani — ${room.sqft} sq ft, ${room.beds.toLowerCase()}, sleeps ${room.sleeps}. Book by WhatsApp or phone.`,
    alternates: { canonical: `/rooms/${room.slug}` },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
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
          <p className="font-display text-3xl text-brass">Drop an enquiry for today&rsquo;s price</p>
          <p className="text-sm text-mist/70">
            {room.beds} · sleeps <span className="tnum">{room.sleeps}</span>
          </p>
          <p className="w-full text-sm text-mist/75">
            <strong className="font-medium text-rice">Book direct for our best rate.</strong>{" "}
            WhatsApp or call the front desk: lower than any booking site, because there is no
            commission in the middle.
          </p>
        </div>
      </PageHeader>

      <div className="shell mt-14 grid gap-6 lg:grid-cols-3">
        {room.gallery.map((key, i) => (
          <Frame key={key + i} img={images[key]} className="w-full" sizes="(max-width: 1024px) 100vw, 31vw" priority={i === 0} />
        ))}
      </div>

      <section className="shell mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16" aria-labelledby="in-room">
        <div className="relative">
          <h2 id="in-room" className="display-md text-rice">In the room</h2>
          <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {room.amenities.map((a) => (
              <li key={a} className="rule-t flex items-center gap-3 pt-3 text-[0.9375rem] text-mist/80">
                <Icon name={glyphFor(a)} className="h-5 w-5 text-brass" />
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.875rem] text-mist/70">
            Check in from <span className="tnum">{site.checkInText}</span> · check out by <span className="tnum">{site.checkOutText}</span>
          </p>
          <div className="relative mt-10 inline-block">
            <Evidence img={images[room.hero]} caption={`The ${room.name} room, photographed as it is.`} className="max-w-[20rem]" />
          </div>
        </div>
        <div className="relative">
          <h2 className="display-md text-rice">The floor plan</h2>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-mist/75">
            Drawn to scale. {room.sqft} square feet is about {Math.round(room.sqft * 0.0929)} square metres.
          </p>
          <Frame img={images[room.plan]} className="mt-7 w-full" sizes="(max-width: 1024px) 100vw, 46vw" />
        </div>
      </section>

      <section className="shell mt-24 pb-24" aria-labelledby="book-room">
        <h2 id="book-room" className="display-md max-w-[18ch] text-rice">Take this room.</h2>
        <div className="mt-10">
          <BookingComposer room={room.slug} />
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
            floorSize: { "@type": "QuantitativeValue", value: room.sqft, unitCode: "FTK" },
            bed: { "@type": "BedDetails", typeOfBed: room.beds },
          },
        ]}
      />
    </>
  );
}
