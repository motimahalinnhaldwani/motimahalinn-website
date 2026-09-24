import { site } from "@/content/site";

/** §8.6 — near every CTA. Rating, count, the 200 m fact, the cancellation. */
export default function TrustRow({ className = "" }: { className?: string }) {
  const items = [
    { k: `${site.rating.value.toFixed(1)} / 5`, v: `${site.rating.count}+ guest ratings` },
    { k: "200 m", v: "from the bus stand" },
    { k: "750 m", v: "from the railway station" },
    { k: "Free", v: "cancellation until 24 hrs before" },
  ];

  return (
    <ul
      className={`flex flex-wrap items-baseline gap-x-7 gap-y-3 text-[0.8125rem] ${className}`}
    >
      {items.map((i) => (
        <li key={i.k} className="flex items-baseline gap-2">
          <span className="tnum font-medium text-brass">{i.k}</span>
          <span className="text-mist/70">{i.v}</span>
        </li>
      ))}
    </ul>
  );
}
