import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Frame, { Evidence } from "@/components/ui/Frame";
import Icon, { glyphFor } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import PriceCompare from "@/components/ui/PriceCompare";
import TrustRow from "@/components/ui/TrustRow";
import { rooms } from "@/content/rooms";
import { images } from "@/content/images";
import { rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Two kinds of room at Moti Mahal Inn, Haldwani — Deluxe at 120 sq ft and Premier at 160 sq ft. True dimensions, floor plans drawn to scale, and rates from ₹1,750.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="The rooms"
        title="Sleep at the foot of the mountains."
        lede="Two kinds of room, both told straight. Every number here is the real number, and the floor plans are drawn to scale — because the one complaint we hear is photographs not matching the room."
        trail={[
          { name: "Home", href: "/" },
          { name: "Rooms", href: "/rooms" },
        ]}
      >
        <TrustRow className="mt-9" />
      </PageHeader>

      <div className="shell mt-16 grid gap-14 pb-20 lg:grid-cols-2 lg:gap-10">
        {rooms.map((room) => (
          <article key={room.slug} className="flex flex-col">
            <Frame
              img={images[room.gallery[1]]}
              className="w-full"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
            <div className="mt-6 flex flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-3xl text-rice">{room.name}</h2>
                <p lang="hi" className="text-brass/90">
                  {room.nameDeva}
                </p>
              </div>

              <p className="mt-3 flex items-baseline gap-2">
                <span className="tnum font-display text-5xl text-brass">{room.sqft}</span>
                <span className="text-sm text-mist/65">sq ft · {room.beds} · sleeps {room.sleeps}</span>
              </p>

              <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-mist/75">
                {room.body}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-[0.8125rem] text-mist/65">
                    <Icon name={glyphFor(a)} className="h-4 w-4 text-brass" />
                    {a}
                  </li>
                ))}
              </ul>

              <Evidence
                img={images[room.hero]}
                caption="Photographed as it is. Full-resolution photography is being shot."
                className="mt-7 max-w-[20rem]"
              />

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
                <p className="text-sm text-mist/65">
                  From{" "}
                  <span className="tnum font-display text-3xl text-brass">
                    {rupees(room.from)}
                  </span>{" "}
                  a night
                </p>
                <Button href={`/rooms/${room.slug}`}>See the room</Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <PriceCompare />
    </>
  );
}
