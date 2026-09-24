import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Journeys from "@/components/sections/Journeys";
import PriceCompare from "@/components/ui/PriceCompare";
import JsonLd from "@/components/ui/JsonLd";
import { journeys } from "@/content/journeys";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journeys from the door",
  description:
    "Nainital, Bhimtal, Kainchi Dham, Mukteshwar and Jim Corbett — real guides from Haldwani with drive times, departure hours, costs and what to eat.",
  alternates: { canonical: "/journeys" },
};

export default function JourneysIndex() {
  const faqs = journeys.flatMap((j) => j.faqs).slice(0, 10);

  return (
    <>
      <PageHeader
        eyebrow="Journeys from the door"
        title="Five good days, all of them starting here."
        lede="Haldwani is the last town of the plains. Everything above it is a day trip if you leave at the right hour — and the right hour is most of what these guides are about."
        trail={[
          { name: "Home", href: "/" },
          { name: "Journeys", href: "/journeys" },
        ]}
      />
      <Journeys />
      <PriceCompare />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
