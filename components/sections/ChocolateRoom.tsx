import Reveal from "@/components/motion/Reveal";
import Frame from "@/components/ui/Frame";
import HamperConfigurator from "@/components/ui/HamperConfigurator";
import { TLink } from "@/components/motion/PageTransition";
import { images } from "@/content/images";
import { cafe, cafeMenu } from "@/content/menu";
import { rupees } from "@/lib/format";

/**
 * §5 · THE CHOCOLATE ROOM
 *
 * Hard cut to light. The tonal switch is itself a beat — after four dark
 * sections the cream ground lands like a door opening onto a bright room.
 *
 * The chocolate counter is the genuinely differentiated thing here: no other
 * hotel in Haldwani has one, and "six months, unrefrigerated" turns it from a
 * dessert into a gift somebody carries home.
 */
export default function ChocolateRoom() {
  return (
    <section
      className="relative z-10 bg-cream text-cocoa"
      aria-labelledby="cafe-heading"
      style={{ colorScheme: "light" }}
    >
      <div className="shell py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal as="p" className="eyebrow !text-cocoa-soft">
              {cafe.name}
            </Reveal>
            <Reveal
              as="h2"
              id="cafe-heading"
              className="display-lg mt-5 max-w-[14ch] text-cocoa"
            >
              Pizza, pasta, and a wall of chocolate.
            </Reveal>
          </div>
          <Reveal as="p" className="lede measure !text-cocoa-soft">
            Downstairs, and bright from half past seven in the morning until half past
            ten at night. Italian, North Indian and American on one menu, which sounds
            like indecision until you have been travelling for nine hours and want a
            pizza and a plate of chhole at the same table.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {cafeMenu.map((group) => (
            <div key={group.section} className="border-t border-cocoa/20 pt-5">
              <h3 className="font-display text-2xl text-cocoa">{group.section}</h3>
              <ul className="mt-4 space-y-3.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <p className="flex items-baseline justify-between gap-3">
                      <span className="text-[0.9375rem] text-cocoa">{item.name}</span>
                      {item.from ? (
                        <span className="tnum shrink-0 text-sm text-cocoa-soft/90">
                          {rupees(item.from)}
                        </span>
                      ) : null}
                    </p>
                    {item.note ? (
                      <p className="mt-0.5 text-[0.8125rem] leading-snug text-cocoa-soft/90">
                        {item.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-cocoa-soft/90">
          About {rupees(cafe.forTwo)} for two · {cafe.hours.from} a.m. to{" "}
          {cafe.hours.to.replace("22:30", "10:30")} p.m., every day ·{" "}
          <TLink href="/dining/cafe" className="underline decoration-cocoa/30 underline-offset-4 hover:decoration-cocoa">
            the full café menu
          </TLink>
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <Frame
              img={images.cafeCounter}
              className="w-full"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
            <Reveal as="h3" className="display-md mt-8 max-w-[14ch] text-cocoa">
              Build a box and we will have it ready.
            </Reveal>
            <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-cocoa-soft/85">
              The counter runs the length of one wall. Choose the size, the chocolate and
              the ribbon, and send it to us — we will have it tied and waiting at
              reception, or packed for the train.
            </p>
          </div>

          <HamperConfigurator light />
        </div>
      </div>
    </section>
  );
}
