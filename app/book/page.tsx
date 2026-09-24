import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BookingComposer from "@/components/ui/BookingComposer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book direct",
  description: `Book a room at ${site.name}, Haldwani, directly with the front desk — by WhatsApp or by phone on ${site.phoneDisplay} — for an exclusive rate lower than the booking sites.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book direct"
        title="Call us, or send us a WhatsApp."
        lede={`Choose your dates and we will write the message for you. It goes straight to the front desk on ${site.phoneDisplay}, and they reply to confirm the room and your exclusive direct rate, lower than on any booking site, because there is no commission in the middle.`}
        trail={[
          { name: "Home", href: "/" },
          { name: "Book", href: "/book" },
        ]}
      />
      <div className="shell mt-12 pb-24">
        <BookingComposer />
        <ul className="mt-14 grid gap-6 text-[0.9375rem] text-mist/75 md:grid-cols-3">
          <li className="rule-t pt-4">
            <p className="font-display text-xl text-rice">Arriving late?</p>
            <p className="mt-2">Say so in the message. The front desk is open all night.</p>
          </li>
          <li className="rule-t pt-4">
            <p className="font-display text-xl text-rice">Travelling as a family?</p>
            <p className="mt-2">Every room takes up to three guests.</p>
          </li>
          <li className="rule-t pt-4">
            <p className="font-display text-xl text-rice">Check in and out</p>
            <p className="mt-2">
              From <span className="tnum">{site.checkInText}</span>, by <span className="tnum">{site.checkOutText}</span>.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
