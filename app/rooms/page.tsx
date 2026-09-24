import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { RoomStack } from "@/components/sections/Rooms";
import BookingComposer from "@/components/ui/BookingComposer";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Four kinds of room at Moti Mahal Inn, Haldwani — Deluxe at 120 sq ft, Twin at 120 sq ft, Premier at 160 sq ft, all for up to three guests, and Executive at 180 sq ft. Book directly by WhatsApp or phone.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="The rooms"
        title="Sleep at the foot of the mountains."
        lede="Four kinds of room, all told straight. Every number here is the real number — because the one complaint we hear about hotels like ours is photographs that do not match the room."
        trail={[
          { name: "Home", href: "/" },
          { name: "Rooms", href: "/rooms" },
        ]}
      />
      <h2 className="sr-only">Room types</h2>
      <RoomStack className="mt-16" />
      <section className="shell py-24" aria-labelledby="rooms-book">
        <h2 id="rooms-book" className="display-md max-w-[18ch] text-rice">
          Pick your dates. We write the message.
        </h2>
        <div className="mt-10">
          <BookingComposer />
        </div>
      </section>
    </>
  );
}
