import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import KitchenStatus from "@/components/ui/KitchenStatus";
import JsonLd from "@/components/ui/JsonLd";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { MenuCard, RankBadge } from "@/components/sections/Kitchen";
import { meals } from "@/content/site";
import { restaurant, thaliSequence } from "@/content/menu";
import { restaurantSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Motimahal Restaurant",
  description:
    "Motimahal Restaurant, Nainital Road, Haldwani — the restaurant of Moti Mahal Inn — Indian and Asian, ranked #14 of 161 in Haldwani on TripAdvisor. Kali mirch chicken, dal makhani, mutton rogan josh, malai tikka. Breakfast from 8 a.m., dinner until 10:45 p.m.",
  alternates: { canonical: "/dining/restaurant" },
};

export default function RestaurantPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Motimahal Restaurant · <span lang="hi">मोतीमहल रेस्टोरेंट</span></>}
        title="Kali mirch, slow dal, and kebabs off the tandoor."
        lede={`Indian and Asian, in its own building a short walk down Nainital Road from Moti Mahal Inn — open to hotel guests and to anyone walking in. Ranked #${restaurant.rank.position} of ${restaurant.rank.of} restaurants in ${restaurant.rank.place} on ${restaurant.rank.on}.`}
        motif="jyoti"
        trail={[
          { name: "Home", href: "/" },
          { name: "Restaurant", href: "/dining/restaurant" },
        ]}
      >
        <KitchenStatus className="mt-8" />
      </PageHeader>

      <div className="shell mt-12">
        <ol className="grid gap-px overflow-hidden rounded-sm border border-brass/20 bg-brass/20">
          {meals.map((m) => (
            <li key={m.label} className="bg-ink-soft px-5 py-4">
              <p className="text-[0.625rem] uppercase tracking-[0.24em] text-brass">{m.label}</p>
              <p className="tnum mt-1 font-display text-2xl text-rice">
                {m.from} <span className="text-mist/65">–</span> {m.to}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <section className="shell mt-20 grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20" aria-labelledby="sig-heading">
        <div>
          <div className="flex items-start justify-between gap-6">
            <h2 id="sig-heading" className="display-md max-w-[14ch] text-rice">What people come back for</h2>
            <RankBadge />
          </div>
          <ul className="mt-8 space-y-7">
            {thaliSequence.map((d) => (
              <li key={d.id} className="rule-t pt-5">
                <p lang="hi" className="text-brass">{d.deva}</p>
                <h3 className="mt-1 font-display text-2xl text-rice">{d.name}</h3>
                <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-mist/75">{d.note}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:order-first">
          <MenuCard />
        </div>
      </section>

      <AipanThreshold variant="chowki" label="Food to your room · 8 a.m. – 10:45 p.m." />

      <section className="shell pb-24 text-center">
        <p className="lede mx-auto max-w-[46ch]">
          Staying at the inn? Call the front desk from your room and we will send food
          up from 8 a.m. until 10:45 p.m.
        </p>
      </section>

      <JsonLd data={[restaurantSchema(), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Restaurant", href: "/dining/restaurant" }])]} />
    </>
  );
}
