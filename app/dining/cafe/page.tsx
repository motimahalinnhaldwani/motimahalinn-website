import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ChocolateRoom from "@/components/sections/ChocolateRoom";
import JsonLd from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import Frame from "@/components/ui/Frame";
import { cafe } from "@/content/menu";
import { images } from "@/content/images";
import { cafeSchema, breadcrumbSchema } from "@/lib/seo";
import { rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Choco Doodle Café",
  description:
    "Choco Doodle Café at Moti Mahal Inn, Haldwani — pizza, pasta, shakes and a full chocolate counter with gift hampers that keep six months unrefrigerated. Open 7:30 a.m. to 10:30 p.m.",
  alternates: { canonical: "/dining/cafe" },
};

export default function CafePage() {
  return (
    <>
      <PageHeader
        eyebrow={cafe.name}
        title="Pizza, pasta, and a wall of chocolate."
        lede={`Downstairs and bright, from half past seven in the morning until half past ten at night. ${cafe.cuisines.join(", ")} on one menu, and about ${rupees(cafe.forTwo)} for two.`}
        trail={[
          { name: "Home", href: "/" },
          { name: "Café", href: "/dining/cafe" },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/chocolate">Build a chocolate hamper</Button>
          <Button href="/dining/restaurant" variant="ghost">
            The restaurant upstairs
          </Button>
        </div>
      </PageHeader>

      <div className="shell mt-14 pb-4">
        <Frame img={images.cafeRoom} className="w-full" sizes="100vw" priority />
      </div>

      <ChocolateRoom />

      <JsonLd
        data={[
          cafeSchema(),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Café", href: "/dining/cafe" },
          ]),
        ]}
      />
    </>
  );
}
