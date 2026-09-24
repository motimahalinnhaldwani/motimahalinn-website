import Reveal from "@/components/motion/Reveal";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { whatsappHref } from "@/lib/whatsapp";
import { site } from "@/content/site";

/** A note from the founder — the family story, in the family's words. */

const years = [
  { y: "1972", t: "Moti Mahal Restaurant opens in Haldwani" },
  { y: "2018", t: "The second generation opens Moti Mahal Inn" },
  { y: "Today", t: "Joy Arora, 16+ years in hospitality, runs the inn" },
];

export default function FounderNote() {
  return (
    <section id="founder" className="relative z-10 py-20 sm:py-28" aria-labelledby="founder-heading">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <Reveal as="p" className="eyebrow">A note from the founder</Reveal>
          <p className="founder-year mt-6 font-display text-rice" aria-hidden="true">
            50<span className="text-brass">+</span>
          </p>
          <p className="mt-1 text-[0.8125rem] uppercase tracking-[0.24em] text-mist/70">
            years of hospitality heritage
          </p>

          <ol className="mt-10 space-y-0">
            {years.map((e) => (
              <li key={e.y} className="founder-step">
                <span className="tnum font-display text-2xl text-brass">{e.y}</span>
                <span className="text-[0.9375rem] text-mist/80">{e.t}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <Reveal as="h2" id="founder-heading" className="display-md max-w-[20ch] text-rice">
            Rooted in Haldwani since 1972: the story of Moti Mahal
          </Reveal>
          <div className="measure mt-7 space-y-5 text-[1.0625rem] leading-[1.7] text-mist/85">
            <p>
              The foundations of Moti Mahal began in 1972, when S. Manjit Singh Arora, guided
              by his father, established the iconic Moti Mahal Restaurant. Over five decades,
              it became a beloved culinary landmark synonymous with authentic tastes, warmth,
              and integrity in Haldwani.
            </p>
            <p>
              In 2018, the second generation launched Moti Mahal Inn to solve a long-standing
              challenge for Kumaon travellers: providing clean, spotless, and genuinely
              comfortable budget lodging right by Haldwani&rsquo;s transit hubs.
            </p>
            <p>
              Today, the inn is steered by Joy Arora, a hotelier with over 16 years of
              hands-on industry experience. Joy personally assists guests with pilgrimage
              planning, honest local taxi bookings, and itinerary advice, ensuring no
              traveller is overcharged when heading into the hills.
            </p>
          </div>

          <div className="founder-sign mt-9 flex flex-wrap items-end justify-between gap-6 border-t border-brass/25 pt-6">
            <p>
              <span className="block font-display text-3xl italic text-rice">Joy Arora</span>
              <span className="mt-1 block text-[0.8125rem] text-mist/70">{site.name}, Haldwani</span>
            </p>
            <WhatsAppCTA
              href={whatsappHref(`Hi Joy, I'm planning a trip into the hills and would like your advice.`)}
              label="Ask Joy for trip advice"
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
