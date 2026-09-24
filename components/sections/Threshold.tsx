"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import Pearl from "@/components/ui/Pearl";
import Kholi from "@/components/ui/Kholi";
import TrustRow from "@/components/ui/TrustRow";
import { Button } from "@/components/ui/Button";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { withEngine } from "@/lib/engine";
import { prefersReducedMotion } from "@/lib/tier";

/**
 * §1 · THE THRESHOLD
 *
 * Black. A carved kholi doorframe vignettes the viewport. Suspended in the
 * dark: the pearl, reflecting the foothills. As you scroll, the camera pushes
 * into it until its surface fills the frame.
 *
 * Three seconds to say: this is not a budget hotel website. And a
 * "Check availability" affordance from the very first frame.
 */

const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 96}%`,
  top: `${25 + ((i * 53) % 60)}%`,
  dur: `${11 + (i % 7) * 2.4}s`,
  delay: `${-(i * 1.7)}s`,
}));

export default function Threshold() {
  const scope = useRef<HTMLDivElement>(null);
  const pearl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    return withEngine(({ gsap }) => {
      const ctx = gsap.context(() => {
        /* The camera push. The pearl grows until its surface is the frame, and
           the copy leaves before it gets there. ~200vh of scroll, pinned. */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=170%",
              scrub: 1,
              pin: ".threshold-stage",
              anticipatePin: 1,
              onUpdate: (self) => {
                /* on the shell, not the section — see SmoothScroll */
                el.querySelector<HTMLElement>(".pearl-shell")
                  ?.style.setProperty("--p", self.progress.toFixed(3));
              },
            },
          })
          .to(".threshold-copy", { opacity: 0, y: -40, ease: "power2.inOut" }, 0)
          .to(".threshold-frame", { opacity: 0, scale: 1.08, ease: "power2.inOut" }, 0)
          .to(pearl.current, { scale: 7.2, yPercent: -6, ease: "power2.inOut" }, 0)
          .to(".threshold-dissolve", { opacity: 1, ease: "power2.in" }, 0.55);
      }, el);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={scope} className="relative" aria-labelledby="threshold-heading">
      <div className="threshold-stage relative min-h-[100svh] overflow-hidden">
        {/* the pearl — never underneath the type. §14 */}
        <div
          ref={pearl}
          className="pointer-events-none absolute left-1/2 top-[13svh] w-[min(44vw,14rem)] -translate-x-1/2 will-change-transform lg:left-[min(72%,calc(100%-22rem))] lg:top-1/2 lg:w-[min(34vw,28rem)] lg:-translate-y-1/2"
        >
          <Pearl />
        </div>

        {/* dust in the doorway */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="mote"
              style={
                {
                  left: m.left,
                  top: m.top,
                  "--mote-dur": m.dur,
                  "--mote-delay": m.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="threshold-frame absolute inset-0">
          <Kholi />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(74% 58% at 50% 46%, transparent 0%, rgba(15,14,12,0.55) 74%, rgba(15,14,12,0.9) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* copy */}
        <div className="threshold-copy shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-24 pt-[40svh] lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:pb-16 lg:pt-16">
          <div className="lg:max-w-[34rem]">
            <Reveal as="p" className="eyebrow mb-6" delay={0.2}>
              Haldwani · <span lang="hi">कुमाऊँ का द्वार</span> · Kumaon ka Dwar
            </Reveal>

            <Reveal
              as="h1"
              id="threshold-heading"
              className="display-lg max-w-[13ch] text-rice"
              delay={0.32}
              stagger={0.08}
            >
              The last light of the plains. The first breath of the hills.
            </Reveal>

            <Reveal as="p" className="lede mt-7 max-w-[46ch]" delay={0.6}>
              Moti Mahal Inn — Haldwani. Two hundred metres from the bus stand,
              thirty-five kilometres from Nainital, and one good night&rsquo;s sleep from
              the mountains.
            </Reveal>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/book">Check availability</Button>
              <WhatsAppCTA variant="ghost" label="WhatsApp us" ctx={{ intent: "stay" }} />
            </div>

            <TrustRow className="mt-9" />
          </div>
        </div>

        {/* the dissolve into the first real photograph */}
        <div
          className="threshold-dissolve pointer-events-none absolute inset-0 z-20 opacity-0"
          style={{ background: "var(--page-ground)" }}
          aria-hidden="true"
        />

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[0.625rem] uppercase tracking-[0.3em] text-mist/65 lg:block">
          Scroll to climb
        </div>
      </div>
    </section>
  );
}
