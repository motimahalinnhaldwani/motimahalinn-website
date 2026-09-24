import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import AipanThreshold from "@/components/motion/AipanThreshold";
import { Button } from "@/components/ui/Button";
import { restaurant, restaurantMenu } from "@/content/menu";
import { meals } from "@/content/site";
import { images } from "@/content/images";
import { restaurantSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Motimahal Restaurant",
  description:
    "Motimahal Restaurant, Haldwani — ranked #14 of 161 in town. Kali mirch chicken, dal makhani, mutton rogan josh, dahi kabab. Open for breakfast, lunch and dinner.",
  alternates: { canonical: "/dining/restaurant" },
};

export default function RestaurantPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Motimahal Restaurant · <span lang="hi">मोतीमहल रेस्टोरेंट</span></>}
        title="Kali mirch, cast iron, and a kitchen that has had a long time to get it right."
        lede={`Ranked #${restaurant.rank.position} of ${restaurant.rank.of} restaurants in ${restaurant.rank.place}. Indian and Asian, open to the street as well as to the stairs, and busy enough on a Saturday that it is worth calling ahead.`}
        motif="jyoti"
        trail={[
          { name: "Home", href: "/" },
          { name: "Restaurant", href: "/dining/restaurant" },
        ]}
      >
        <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {meals.map((m) => (
            <li key={m.label} className="flex items-baseline gap-2">
              <span className="text-mist/65">{m.label}</span>
              <span className="tnum text-brass">
                {m.from}–{m.to}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsAppCTA label="Reserve a table" ctx={{ intent: "table" }} />
          <Button href="/dining/cafe" variant="ghost">
            The café downstairs
          </Button>
        </div>
      </PageHeader>

      <div className="shell mt-14">
        <Frame img={images.restaurantRoom} className="w-full" sizes="100vw" priority />
      </div>

      <section className="shell mt-16 pb-8" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="sr-only">
          The menu
        </h2>

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {restaurantMenu.map((group) => (
            <section key={group.section}>
              <div className="rule-b flex items-baseline justify-between gap-4 pb-3">
                <h3 className="font-display text-3xl text-rice">{group.section}</h3>
                {group.deva ? (
                  <p lang="hi" className="text-brass/90">
                    {group.deva}
                  </p>
                ) : null}
              </div>

              <ul className="mt-6 space-y-6">
                {group.dishes.map((d) => (
                  <li key={d.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-[1.0625rem] text-rice">
                        {d.name}
                        {d.signature ? (
                          <span className="ml-2.5 align-middle text-[0.5625rem] uppercase tracking-[0.2em] text-brass">
                            Signature
                          </span>
                        ) : null}
                      </h4>
                      <span
                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[1px] border ${
                          d.veg ? "border-green-600" : "border-geru"
                        }`}
                        aria-label={d.veg ? "Vegetarian" : "Non-vegetarian"}
                        role="img"
                      >
                        <span
                          className={`block h-full w-full scale-[0.55] rounded-full ${
                            d.veg ? "bg-green-600" : "bg-geru"
                          }`}
                        />
                      </span>
                    </div>
                    <p lang="hi" className="mt-1 text-[0.9375rem] text-mist/65">
                      {d.deva}
                    </p>
                    {d.note ? (
                      <p className="measure mt-1.5 text-[0.875rem] leading-relaxed text-mist/70">
                        {d.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-14 max-w-[52ch] text-[0.8125rem] leading-relaxed text-mist/65">
          Prices are on the printed menu and change with the market. Ask at the desk for
          the current card, or for anything not listed — the kitchen will usually do it.
        </p>
      </section>

      <AipanThreshold variant="chowki" label="Room service, 24 hours" />

      <section className="shell pb-20 text-center">
        <p className="lede mx-auto max-w-[44ch]">
          Everything on this menu comes upstairs too, at any hour. If you are arriving on
          a late train, say so when you book and the kitchen will be ready.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppCTA label="Reserve a table" ctx={{ intent: "table" }} />
          <Button href="/book" variant="ghost">
            Book a room
          </Button>
        </div>
      </section>

      <JsonLd
        data={[
          restaurantSchema(),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Restaurant", href: "/dining/restaurant" },
          ]),
        ]}
      />
    </>
  );
}
