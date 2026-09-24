import type { Metadata } from "next";

import Threshold from "@/components/sections/Threshold";
import Gateway from "@/components/sections/Gateway";
import Rooms from "@/components/sections/Rooms";
import Table from "@/components/sections/Table";
import ChocolateRoom from "@/components/sections/ChocolateRoom";
import Journeys from "@/components/sections/Journeys";
import Voices from "@/components/sections/Voices";
import Invitation from "@/components/sections/Invitation";

import AipanThreshold from "@/components/motion/AipanThreshold";
import PriceCompare from "@/components/ui/PriceCompare";
import JsonLd from "@/components/ui/JsonLd";

import { faqSchema, distanceFaqs } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Haldwani, at the gateway to Kumaon`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The journey. One long scroll with a direction: hot hazy amber plains at the
 * top, cool misty deodar green at the bottom. By the footer you should feel
 * like you have gained altitude.
 */
export default function Home() {
  return (
    <>
      <Threshold />

      <AipanThreshold variant="kamal" label="Kumaon ka Dwar" />
      <Gateway />

      <AipanThreshold variant="chowki" label="The rooms" />
      <Rooms />

      <AipanThreshold variant="jyoti" label="The table" />
      <Table />

      {/*
        No threshold before the café. §5 asks for a hard cut to light, and a
        door drawn first would soften exactly the beat that section is for.
        The aipan returns below, on the way back into the dark.
      */}
      <ChocolateRoom />

      <AipanThreshold variant="kamal" label="From the door" />
      <Journeys />

      <AipanThreshold variant="chowki" label="Voices" />
      <Voices />

      <PriceCompare />
      <Invitation />

      <JsonLd data={faqSchema(distanceFaqs)} />
    </>
  );
}
