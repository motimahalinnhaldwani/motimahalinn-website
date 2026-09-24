import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import HamperConfigurator from "@/components/ui/HamperConfigurator";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { hamper } from "@/content/menu";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { rupees } from "@/lib/format";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Chocolate hampers",
  description:
    "Build a chocolate gift hamper at Choco Doodle Café, Haldwani — six, twelve or twenty-four pieces, ribbon of your choosing, ready at reception. Keeps six months unrefrigerated.",
  alternates: { canonical: "/chocolate" },
};

export default function ChocolatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Choco Doodle · the counter"
        title="Build a box and we will have it tied."
        lede="Six months, unrefrigerated. That is the fact that turns a dessert into something you carry to Lucknow, or hand over at a wedding, or leave on a desk in Delhi."
        motif="chowki"
        trail={[
          { name: "Home", href: "/" },
          { name: "Café", href: "/dining/cafe" },
          { name: "Chocolate", href: "/chocolate" },
        ]}
      />

      <div className="shell mt-12">
        <HamperConfigurator light={false} />
      </div>

      <AipanThreshold variant="kamal" label="How it works" />

      <section className="shell grid gap-10 pb-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="display-md text-rice">Three ways to take it</h2>
          <ol className="mt-7 space-y-6">
            {[
              {
                t: "Ready at reception",
                d: "Send the configuration and collect it when you check in, or on your way out. No deposit, no minimum.",
              },
              {
                t: "Packed for the train",
                d: "We wrap it for a bag rather than for a shelf. It survives the Kathgodam–Delhi run in June, which is the real test.",
              },
              {
                t: "Delivered in Haldwani",
                d: "Within the town, the same day, for weddings and offices. Tell us how many boxes and when.",
              },
            ].map((s, i) => (
              <li key={s.t} className="rule-t flex gap-5 pt-4">
                <span className="tnum font-display text-3xl text-brass/90">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl text-rice">{s.t}</h3>
                  <p className="measure mt-1.5 text-[0.9375rem] leading-relaxed text-mist/70">
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <table className="mt-10 w-full border-collapse text-left text-sm">
            <caption className="sr-only">Hamper sizes and prices</caption>
            <thead>
              <tr className="rule-b">
                <th scope="col" className="pb-2 font-normal text-mist/65">Size</th>
                <th scope="col" className="pb-2 font-normal text-mist/65">Pieces</th>
                <th scope="col" className="pb-2 text-right font-normal text-mist/65">Price</th>
              </tr>
            </thead>
            <tbody>
              {hamper.sizes.map((s) => (
                <tr key={s.id} className="border-b border-brass/10">
                  <td className="py-3 text-rice/85">{s.label}</td>
                  <td className="tnum py-3 text-mist/65">{s.count}</td>
                  <td className="tnum py-3 text-right text-brass">{rupees(s.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[0.75rem] text-mist/65">Before taxes. {hamper.keeps}</p>
        </div>

        <div>
          <Frame img={images.hamper} className="w-full" sizes="(max-width: 1024px) 100vw, 46vw" />
          <Frame
            img={images.cafeCounter}
            className="mt-6 w-full"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Chocolate", href: "/chocolate" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Choco Doodle chocolate hamper",
            description:
              "A gift box of house chocolates from Choco Doodle Café, Haldwani. Keeps six months unrefrigerated.",
            brand: { "@type": "Brand", name: "Choco Doodle Café" },
            offers: hamper.sizes.map((s) => ({
              "@type": "Offer",
              name: `${s.label} pieces`,
              price: s.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: `${site.url}/chocolate`,
            })),
          },
        ]}
      />
    </>
  );
}
