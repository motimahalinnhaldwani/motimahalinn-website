import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import EnquiryForm from "@/components/ui/EnquiryForm";
import PriceCompare from "@/components/ui/PriceCompare";
import TrustRow from "@/components/ui/TrustRow";
import WhatsAppCTA, { CallCTA } from "@/components/ui/WhatsAppCTA";
import { rooms } from "@/content/rooms";
import { bookDirect, site } from "@/content/site";
import { rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Book direct",
  description:
    "Book a room at Moti Mahal Inn, Haldwani, direct. Same room, better price, confirmed within 30 minutes by a person. From ₹1,750 a night.",
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;

  const defaults = {
    checkIn: one("in"),
    checkOut: one("out"),
    adults: one("adults") ? Number(one("adults")) : undefined,
    room: rooms.some((r) => r.slug === one("room")) ? one("room") : undefined,
  };

  return (
    <>
      <PageHeader
        eyebrow="Book direct"
        title={bookDirect.headline}
        lede={`We confirm ${bookDirect.confirmWindow}. Not an automatic email — somebody reads it, checks the board, and writes back. If you would rather just talk, the number is below and it is answered.`}
        trail={[
          { name: "Home", href: "/" },
          { name: "Book", href: "/book" },
        ]}
      >
        <TrustRow className="mt-9" />
      </PageHeader>

      <div className="shell mt-12 grid gap-10 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <EnquiryForm defaults={defaults} />

        <aside>
          <h2 className="eyebrow">The rates</h2>
          <ul className="mt-5 space-y-5">
            {rooms.map((r) => (
              <li key={r.slug} className="rule-t pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-rice">{r.name}</h3>
                  <p className="tnum shrink-0 font-display text-2xl text-brass">
                    {rupees(r.from)}
                  </p>
                </div>
                <p className="mt-1 text-[0.8125rem] text-mist/65">
                  <span className="tnum">{r.sqft}</span> sq ft · {r.beds} · sleeps{" "}
                  <span className="tnum">{r.sleeps}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.75rem] text-mist/65">
            Per night, before taxes. Rates move with the season; the desk will confirm the
            exact figure for your dates.
          </p>

          <div className="mt-10 rounded-sm border border-brass/25 p-6">
            <h2 className="eyebrow">Faster still</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist/75">
              WhatsApp is usually the quickest way to reach the desk, and it is how most
              of our guests book.
            </p>
            <div className="mt-5 flex flex-col items-start gap-4">
              <WhatsAppCTA ctx={{ intent: "stay" }} />
              <CallCTA />
              <a
                href={`mailto:${site.email}`}
                className="text-[0.8125rem] text-rice/70 underline decoration-brass/40 underline-offset-4 hover:text-rice"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-sm border border-brass/15 p-6">
            <h2 className="eyebrow">Before you send it</h2>
            <ul className="mt-4 space-y-3 text-[0.875rem] leading-snug text-mist/70">
              <li>Arriving after eleven at night? Say so — the kitchen stays up for it.</li>
              <li>Leaving before dawn for Kainchi or Corbett? We will have chai ready.</li>
              <li>Want a quiet room at the back? Ask. It costs nothing extra.</li>
              <li>
                Check in {site.checkIn}, check out {site.checkOut}. Both are movable if the
                floor is not full.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <PriceCompare />
    </>
  );
}
