import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Frame, { Evidence } from "@/components/ui/Frame";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { images, pendingShots, type Shot } from "@/content/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of Moti Mahal Inn, Haldwani — rooms, corridors, the lift lobby and the restaurant. Shown at the resolution they were taken at, with nothing stretched.",
  alternates: { canonical: "/gallery" },
};

const supplied: Shot[] = [
  images.premierBalcony,
  images.deluxeEvening,
  images.corridorDoors,
  images.corridorFrames,
  images.roomTealTv,
  images.roomOrangeHeadboard,
  images.roomGreyHeadboard,
  images.roomMarbleHeadboard,
  images.roomWoodHeadboard,
  images.roomBrownMarble,
  images.roomTwinBeds,
  images.bathroomGreyStone,
  images.bathroomWhite,
  images.liftLobby,
  images.corridorTiledRunner,
  images.corridorRoom101,
  images.corridorEvening,
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The rooms as they are, at the size they were photographed."
        lede="The most common complaint about hotels of this kind is that the photographs do not match the room. So these are shown at their true resolution rather than stretched across the page, and the slots still waiting on the shoot are marked as exactly that."
        motif="chowki"
        trail={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      />

      <section className="shell mt-14" aria-labelledby="supplied-heading">
        <h2 id="supplied-heading" className="eyebrow">
          Photographed
        </h2>
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {supplied.map((img) => (
            <li key={img.id}>
              <Evidence img={img} />
            </li>
          ))}
        </ul>
      </section>

      <AipanThreshold variant="jyoti" label="Being shot" />

      <section className="shell pb-20" aria-labelledby="pending-heading">
        <h2 id="pending-heading" className="display-md max-w-[20ch] text-rice">
          The shot list.
        </h2>
        <p className="lede measure mt-4">
          Real rooms, occupied-looking, at real times of day — six in the morning and nine
          at night. No wide-angle distortion, no brightening. Every slot below is a frame
          waiting for a photograph, and none of them will be filled with a picture of some
          other hotel.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pendingShots.map((img) => (
            <li key={img.id}>
              <Frame
                img={img}
                className="w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[56ch] text-[0.8125rem] leading-relaxed text-mist/65">
          <span className="tnum">{pendingShots.length}</span> frames outstanding. Each one
          is declared in the content layer with its brief, its aspect ratio and the alt
          text a human will write for it, so a photograph drops straight into place.
        </p>
      </section>
    </>
  );
}
