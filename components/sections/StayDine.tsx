"use client";

import Reveal from "@/components/motion/Reveal";
import { TLink } from "@/components/motion/PageTransition";
import { AipanMotif } from "@/components/ui/AipanMotif";
import KitchenStatus from "@/components/ui/KitchenStatus";
import { useInView } from "@/lib/useInView";
import { restaurant } from "@/content/menu";

/**
 * Two carved doors that swing open as you arrive: one to the rooms, one to the
 * kitchen. The doors are decoration — aria-hidden, click-through, and absent
 * entirely when motion is reduced — so nothing behind them is ever gated.
 */

function Leaf({ side }: { side: "left" | "right" }) {
  return (
    <div className={`door-leaf ${side}`} aria-hidden="true">
      <div className="door-panel-inset top" />
      <div className="door-panel-inset bottom" />
      <AipanMotif variant="kamal" className="door-rosette" strokeWidth={1.2} />
      <span className="door-ring" />
    </div>
  );
}

function StayIcon() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-16 text-brass" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 40V10M4 26h56v14M60 40v-8" />
      <path d="M4 26v-6a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v6" />
      <circle cx="15" cy="21" r="3.5" />
      <path d="M28 26v-4a4 4 0 0 1 4-4h22a6 6 0 0 1 6 6v2" />
    </svg>
  );
}

function DineIcon() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-16 text-brass" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M8 34h48M12 34a20 20 0 0 1 40 0" />
      <path d="M32 14v-3M29 11h6" />
      <path d="M6 40h52" />
      <path className="dine-steam loop" d="M26 8c-2-2 2-4 0-6M38 8c-2-2 2-4 0-6" />
    </svg>
  );
}

function Door({
  kind,
  children,
}: {
  kind: "stay" | "dine";
  children: React.ReactNode;
}) {
  const ref = useInView<HTMLDivElement>({ rootMargin: "0px 0px -18% 0px" });
  return (
    <div ref={ref} className={`door-frame door-${kind} group`}>
      <div className="door-content">{children}</div>
      <Leaf side="left" />
      <Leaf side="right" />
    </div>
  );
}

export default function StayDine() {

  return (
    <section className="relative z-10 py-20 sm:py-28" aria-labelledby="staydine-heading">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          Stay with us, eat with us
        </Reveal>
        <Reveal as="h2" id="staydine-heading" className="display-lg mt-5 max-w-[16ch] text-rice">
          Stay the night. Stay for dinner.
        </Reveal>
        <Reveal as="p" className="lede measure mt-6">
          Four kinds of room at the inn, and our own restaurant a short walk down
          Nainital Road — open to guests and to Haldwani alike. Most people who stay
          with us eat with us too.
        </Reveal>
      </div>

      <div className="shell mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Door kind="stay">
          <StayIcon />
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-rice">Stay</span>
            <span lang="hi" className="text-xl text-brass/90">ठहरिए</span>
          </p>
          <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-mist/80">
            <li>Deluxe, Twin, Premier and Executive rooms, 120 to 180 sq ft</li>
            <li>Air conditioning, tea maker / kettle, free Wi-Fi, lift, 24/7 power backup</li>
            <li>Check in from 1 p.m. · check out by 11 a.m.</li>
          </ul>
          <p className="mt-6 font-display text-2xl text-brass">
            Drop an enquiry for today&rsquo;s price
          </p>
          <TLink
            href="/rooms"
            className="door-link mt-8 inline-flex items-center gap-3 text-[0.8125rem] uppercase tracking-[0.18em] text-brass"
          >
            See the rooms <span aria-hidden="true" className="door-arrow">→</span>
          </TLink>
        </Door>

        <Door kind="dine">
          <DineIcon />
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-rice">Dine</span>
            <span lang="hi" className="text-xl text-brass/90">भोजन</span>
          </p>
          <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-mist/80">
            <li>
              <strong className="font-medium text-rice/90">{restaurant.name}</strong> —{" "}
              {restaurant.cuisines.join(" & ")}
            </li>
            <li>A short walk from the hotel, on the same road</li>
            <li>Breakfast from 8 a.m., dinner until 10:45 p.m.</li>
          </ul>
          <KitchenStatus className="mt-6" />
          <div>
            <TLink
              href="/dining/restaurant"
              className="door-link mt-8 inline-flex items-center gap-3 text-[0.8125rem] uppercase tracking-[0.18em] text-brass"
            >
              See the menu <span aria-hidden="true" className="door-arrow">→</span>
            </TLink>
          </div>
        </Door>
      </div>
    </section>
  );
}
