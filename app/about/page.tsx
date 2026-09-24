import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { Button } from "@/components/ui/Button";
import FounderNote from "@/components/sections/FounderNote";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "The house",
  description:
    "Moti Mahal means Pearl Palace. A family-run inn on Nainital Road, Haldwani, from the family behind Moti Mahal Restaurant (since 1972), run today by Joy Arora.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The house"
        title="Moti Mahal. Pearl Palace."
        lede="A pearl is an irritant wrapped in layer after layer of nacre until it becomes luminous. It is small, dense, and it holds light differently from every angle. It is also the opposite of glass-tower luxury — it is the luxury of something made slowly."
        trail={[
          { name: "Home", href: "/" },
          { name: "The house", href: "/about" },
        ]}
      />

      <section className="shell mt-14 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="measure space-y-5 text-[1.0625rem] leading-[1.65] text-mist/80">
          <p>
            Haldwani is called Kumaon ka Dwar — the gateway to Kumaon. It takes its name
            from the haldu trees that once covered this ground, and it sits on the bed of
            the Gaula at the exact point where the plains give up and the Shivalik begins.
          </p>
          <p>
            Almost nobody comes to Haldwani for Haldwani. They come through it: up to
            Nainital, Bhimtal, Kainchi Dham, Mukteshwar, Corbett — or back down from all
            of those, tired, with a train to catch. Moti Mahal Inn is not a destination.
            It is a threshold.
          </p>
          <p>
            We think that is the most useful thing about it. A place like this has a
            simple job: a clean, spacious room three hundred metres from where the bus
            stops, with a proper meal close by. That is why our own restaurant is just
            down the same road, why food comes to the rooms until 10:45 at night, and
            why the front desk is awake around the clock.
          </p>
        </div>

        <div>
          <Frame img={images.exterior} className="w-full" sizes="(max-width: 1024px) 100vw, 42vw" />
        </div>
      </section>

      <AipanThreshold variant="chowki" label="Since 1972" />

      <FounderNote />

      <section className="shell flex flex-wrap gap-3 pb-20">
        <Button href="/rooms">See the rooms</Button>
        <Button href="/contact" variant="ghost">
          Come and find us
        </Button>
      </section>
    </>
  );
}
