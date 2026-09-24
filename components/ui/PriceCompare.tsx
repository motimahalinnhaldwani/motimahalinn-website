import { rupees } from "@/lib/format";
import { bookDirect, otas, site } from "@/content/site";
import { rooms } from "@/content/rooms";
import WhatsAppCTA from "./WhatsAppCTA";
import { Button } from "./Button";

/**
 * §8.4 — the room rate beside the typical OTA rate, and the delta the guest
 * saves. This property lists on six platforms; every direct booking keeps
 * 15–20% that would otherwise go in commission. Make it the guest's win too.
 */
export default function PriceCompare() {
  const base = rooms[0].from;
  const ota = Math.round((base / (1 - bookDirect.savingPct / 100)) / 10) * 10;
  const saving = ota - base;

  return (
    <section
      className="rule-t rule-b bg-ink-soft/50"
      aria-labelledby="book-direct-heading"
    >
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow">Book direct</p>
          <h2
            id="book-direct-heading"
            className="display-md mt-4 max-w-[16ch] text-rice"
          >
            {bookDirect.headline}
          </h2>
          <p className="lede measure mt-5">
            We are on {otas.slice(0, -1).join(", ")} and {otas[otas.length - 1]}, and we are
            glad of them. But every booking made through one costs us a commission we would
            rather hand to you. Same room, same bed, same breakfast — a smaller number.
          </p>
        </div>

        <div className="rounded-sm border border-brass/25 bg-ink/60 p-6 sm:p-8">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Typical travel-site rate compared with the direct rate for a Deluxe room
            </caption>
            <tbody className="align-baseline">
              <tr className="border-b border-brass/15">
                <th scope="row" className="py-3 pr-4 font-normal text-mist/70">
                  Typical travel-site rate
                </th>
                <td className="tnum py-3 text-right text-xl text-mist/65 line-through decoration-geru decoration-1">
                  {rupees(ota)}
                </td>
              </tr>
              <tr className="border-b border-brass/15">
                <th scope="row" className="py-3 pr-4 font-normal text-rice">
                  Booked direct with us
                </th>
                <td className="tnum py-3 text-right font-display text-3xl text-brass">
                  {rupees(base)}
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-4 font-normal text-rice/80">
                  You keep
                </th>
                <td className="tnum py-3 text-right text-xl text-haldu">
                  {rupees(saving)} a night
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-5 text-[0.8125rem] leading-relaxed text-mist/65">
            Deluxe room, per night, before taxes. We confirm {bookDirect.confirmWindow} —
            a real person, not an automatic email.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppCTA ctx={{ intent: "stay" }} label="Book on WhatsApp" />
            <Button href="/book" variant="ghost">
              Check availability
            </Button>
          </div>
          <p className="mt-4 text-[0.75rem] text-mist/65">
            Or call {site.phoneDisplay}. Someone picks up.
          </p>
        </div>
      </div>
    </section>
  );
}
