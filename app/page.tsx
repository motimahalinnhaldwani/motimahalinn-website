import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import AmenitiesTicker from "@/components/sections/AmenitiesTicker";
import DirectRates from "@/components/sections/DirectRates";
import Gateway from "@/components/sections/Gateway";
import StayDine from "@/components/sections/StayDine";
import Rooms from "@/components/sections/Rooms";
import FounderNote from "@/components/sections/FounderNote";
import BookDirect from "@/components/sections/BookDirect";
import FindUs from "@/components/sections/FindUs";
import AipanThreshold from "@/components/motion/AipanThreshold";
import JsonLd from "@/components/ui/JsonLd";

import { faqSchema, distanceFaqs } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Three-Star Hotel in Haldwani, Nainital Road`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The hotel first: the inn lit up at dusk, what every guest gets, where it sits
 * on the road into the hills, the rooms, the family behind it since 1972, and
 * how to book a room without a middleman.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AmenitiesTicker />
      <DirectRates />
      <Gateway />
      <StayDine />
      <Rooms />
      <AipanThreshold variant="jyoti" label="Since 1972" />
      <FounderNote />
      <BookDirect />
      <FindUs />
      <JsonLd data={[faqSchema(distanceFaqs)]} />
    </>
  );
}
