import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import Reveal from "@/components/motion/Reveal";
import AipanThreshold from "@/components/motion/AipanThreshold";
import JsonLd from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { TLink } from "@/components/motion/PageTransition";
import PriceCompare from "@/components/ui/PriceCompare";

import { journeys, journeyBySlug } from "@/content/journeys";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) return {};
  return {
    title: `${j.name} from Haldwani — ${j.km} km, ${j.drive}`,
    description: j.summary,
    alternates: { canonical: `/journeys/${j.slug}` },
    openGraph: { title: `${j.name} from Haldwani`, description: j.summary },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) notFound();

  const others = journeys.filter((o) => o.slug !== j.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${j.name} · ${j.deva}`}
        title={j.hook}
        lede={j.summary}
        motif="jyoti"
        trail={[
          { name: "Home", href: "/" },
          { name: "Journeys", href: "/journeys" },
          { name: j.name, href: `/journeys/${j.slug}` },
        ]}
      >
        <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {j.practical.map((p) => (
            <div key={p.label} className="rule-t pt-3">
              <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-brass/90">
                {p.label}
              </dt>
              <dd className="tnum mt-1.5 text-[0.9375rem] text-rice/90">{p.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="shell mt-14">
        <Frame img={images[j.hero]} className="w-full" sizes="100vw" priority />
      </div>

      <article className="shell mt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            {j.sections.map((s, i) => (
              <section key={s.heading} className={i ? "mt-14" : ""}>
                <Reveal as="h2" className="display-md max-w-[20ch] text-rice">
                  {s.heading}
                </Reveal>
                <div className="measure mt-5 space-y-4">
                  {s.body.map((p, k) => (
                    <p key={k} className="text-[1.0625rem] leading-[1.65] text-mist/80">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-16">
              <h2 className="display-md text-rice">Common questions</h2>
              <dl className="mt-6 space-y-6">
                {j.faqs.map((f) => (
                  <div key={f.q} className="rule-t pt-4">
                    <dt className="font-display text-xl text-rice">{f.q}</dt>
                    <dd className="measure mt-2 text-[0.9375rem] leading-relaxed text-mist/75">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-brass/25 bg-ink-soft/50 p-6">
              <h2 className="eyebrow">What we will do</h2>
              <ul className="mt-4 space-y-3">
                {j.weDo.map((w) => (
                  <li key={w} className="flex gap-3 text-[0.875rem] leading-snug text-mist/75">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[0.8125rem] leading-relaxed text-mist/65">
                Season: {j.season}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button href="/book">Book a room</Button>
                <WhatsAppCTA
                  variant="ghost"
                  label="Ask about a cab"
                  ctx={{ intent: "cab", extra: `to ${j.name}` }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-brass/15 p-6">
              <h2 className="eyebrow">The other four</h2>
              <ul className="mt-4 space-y-2.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <TLink
                      href={`/journeys/${o.slug}`}
                      className="flex items-baseline justify-between gap-3 text-sm text-mist/70 transition-colors hover:text-rice"
                    >
                      {o.name}
                      <span className="tnum shrink-0 text-[0.6875rem] text-brass/90">
                        {o.km} km
                      </span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      <AipanThreshold variant="kamal" label="Stay the night before" />
      <PriceCompare />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Journeys", href: "/journeys" },
            { name: j.name, href: `/journeys/${j.slug}` },
          ]),
          faqSchema(j.faqs),
          {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: j.name,
            description: j.summary,
            touristType: "Day trip from Haldwani",
            isAccessibleForFree: j.slug === "kainchi-dham",
            url: `${site.url}/journeys/${j.slug}`,
          },
        ]}
      />
    </>
  );
}
