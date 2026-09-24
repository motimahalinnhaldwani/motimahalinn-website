import Reveal from "@/components/motion/Reveal";
import Pearl from "@/components/ui/Pearl";
import EnquiryForm from "@/components/ui/EnquiryForm";
import { CallCTA } from "@/components/ui/WhatsAppCTA";
import { AipanMotif } from "@/components/ui/AipanMotif";
import { distances, site } from "@/content/site";

/**
 * §8 · THE INVITATION
 *
 * The fog is thickest here — you have reached the hills. The pearl returns,
 * small and far away and dimly lit, because you are looking back down at it
 * from somewhere higher than where you started.
 */
export default function Invitation() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="invitation-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 110%, rgba(159,179,174,0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-1/2 top-16 w-24 -translate-x-1/2 opacity-40 sm:w-28">
        <Pearl />
      </div>

      <AipanMotif
        variant="jyoti"
        className="pointer-events-none absolute -right-24 bottom-0 h-[30rem] w-[30rem] text-geru/10"
      />

      <div className="shell relative">
        <div className="pt-28 text-center sm:pt-32">
          <Reveal as="p" className="eyebrow">
            The invitation
          </Reveal>
          <Reveal
            as="h2"
            id="invitation-heading"
            className="display-lg mx-auto mt-5 max-w-[15ch] text-rice"
          >
            Come up the hill. Sleep first.
          </Reveal>
          <Reveal as="p" className="lede measure mx-auto mt-6">
            Book direct and the number is smaller, the room is the same, and the phone is
            answered by somebody who knows which rooms are quiet.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <EnquiryForm />

          <div>
            <h3 className="eyebrow">Finding us</h3>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-mist/75">
              {site.address.street}, {site.address.locality} — on the left as you head up
              NH-87 towards Nainital, opposite the SDM Court. If you are coming out of the
              bus stand, it is a three-minute walk and you will see the sign.
            </p>

            <ul className="mt-7 space-y-3">
              {distances.map((d) => (
                <li
                  key={d.place}
                  className="rule-t flex items-baseline justify-between gap-4 pt-3"
                >
                  <span className="text-sm text-rice/85">{d.place}</span>
                  <span className="tnum shrink-0 font-display text-xl text-brass">
                    {d.display}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <CallCTA />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8125rem] text-rice/70 underline decoration-brass/40 underline-offset-4 transition-colors hover:text-rice"
              >
                Open in Maps
              </a>
            </div>

            <p className="mt-8 text-[0.8125rem] leading-relaxed text-mist/65">
              Check in from {site.checkIn}, check out by {site.checkOut}. Arriving on a
              night train or leaving before dawn? Say so when you book — we will hold the
              room and have the kitchen ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
