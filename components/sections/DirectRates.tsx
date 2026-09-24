import Reveal from "@/components/motion/Reveal";
import WhatsAppCTA, { CallButton } from "@/components/ui/WhatsAppCTA";
import { bookingHref } from "@/lib/whatsapp";

/**
 * The single most useful thing a guest can learn on this site: booking direct
 * is cheaper. Booking platforms take a commission on every room they sell;
 * a WhatsApp message or a phone call to the desk doesn't, so the direct rate
 * is lower. Said plainly, near the top, with both ways to book right there.
 */

const online = [
  "The platform takes a commission on every night you stay",
  "That commission is built into the price you see",
  "Requests and changes go through a middleman",
];

const direct = [
  "An exclusive rate, lower than the booking sites",
  "No commission, so the saving goes to you",
  "Talk to the front desk: pickup, early check-in, any request",
];

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" strokeWidth="1.4" />
      <path d="M6 10.4 8.6 13 14 7.5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-mist/60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" strokeWidth="1.2" />
      <path d="M7 7l6 6M13 7l-6 6" />
    </svg>
  );
}

export default function DirectRates() {
  return (
    <section id="direct" className="relative z-10 scroll-mt-24 py-20 sm:py-24" aria-labelledby="direct-heading">
      <div className="shell">
        <div className="max-w-[46rem]">
          <Reveal as="p" className="eyebrow">Exclusive direct rates</Reveal>
          <Reveal as="h2" id="direct-heading" className="display-lg mt-5 max-w-[14ch] text-rice">
            Book direct. Pay less.
          </Reveal>
          <Reveal as="p" className="lede measure mt-6">
            Booking sites charge us a large commission on every room they sell. When you
            WhatsApp or call the front desk instead, there is no commission to pay, so we
            give you a better rate than you will find on any booking platform.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="direct-card rounded-sm border border-brass/20 bg-ink-soft/70 p-7 sm:p-8">
            <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-mist/70">On a booking site</p>
            <p className="mt-3 font-display text-3xl text-rice/75">
              <span className="direct-strike">Their price</span>
            </p>
            <ul className="mt-6 space-y-3.5 text-[0.9375rem] text-mist/75">
              {online.map((t) => (
                <li key={t} className="flex gap-3"><Cross />{t}</li>
              ))}
            </ul>
          </div>

          <div className="direct-card is-best relative rounded-sm p-7 sm:p-8">
            <span className="direct-stamp" aria-hidden="true">Best rate</span>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-brass">Direct with Moti Mahal Inn</p>
            <p className="mt-3 font-display text-3xl text-rice sm:text-4xl">Our exclusive rate</p>
            <ul className="mt-6 space-y-3.5 text-[0.9375rem] text-rice/90">
              {direct.map((t) => (
                <li key={t} className="flex gap-3"><Tick />{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppCTA href={bookingHref()} label="Get the direct rate" />
              <CallButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
