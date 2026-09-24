import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { Button } from "@/components/ui/Button";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "The house",
  description:
    "Moti Mahal means Pearl Palace. A family-run inn on Nainital Road, Haldwani, at the threshold between the plains and the Kumaon hills.",
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
            We think that is the most useful thing about it. A threshold has a specific
            job: to be easy to find, easy to leave, warm at eleven at night and awake at
            half past five in the morning. Everything here is arranged around that — the
            kitchen hours, the quiet rooms held at the back, the chai before dawn for the
            people driving to Kainchi.
          </p>
        </div>

        <div>
          <Frame img={images.exterior} className="w-full" sizes="(max-width: 1024px) 100vw, 42vw" />
        </div>
      </section>

      <AipanThreshold variant="chowki" label="The people" />

      <section className="shell grid gap-12 pb-20 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
        <Frame img={images.staff} className="w-full" sizes="(max-width: 1024px) 100vw, 42vw" />

        <div>
          <h2 className="display-md max-w-[16ch] text-rice">
            Trust is the product here.
          </h2>
          <div className="measure mt-5 space-y-5 text-[1.0625rem] leading-[1.65] text-mist/80">
            <p>
              At this size and in this town, a hotel is not a brand. It is the person at
              the desk at midnight, the cook who has made the same dal for a decade, and
              whether the phone gets answered. So this page will carry their photographs
              and their names, rather than a stock image of a lobby.
            </p>
            <p>
              The founding story — when the doors opened, who runs it, and why the name is
              Moti Mahal — belongs here too, in the family&rsquo;s own words rather than
              ours. It is the single most valuable thing this site is still missing.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/rooms">See the rooms</Button>
            <Button href="/contact" variant="ghost">
              Come and find us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
