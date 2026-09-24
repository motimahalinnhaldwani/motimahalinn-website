const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const glyphs: Record<string, React.ReactNode> = {
  ac: (
    <>
      <rect x="3" y="5" width="18" height="8" rx="1.5" />
      <path d="M6 9h12M7 16.5c1.2 0 1.2 2 2.4 2M12 16.5c1.2 0 1.2 2 2.4 2M17 16.5c-1.2 0-1.2 2-2.4 2" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a15 15 0 0 1 19 0M5.5 12.4a10.5 10.5 0 0 1 13 0M8.6 15.8a6 6 0 0 1 6.8 0" />
      <circle cx="12" cy="19" r="1.1" />
    </>
  ),
  water: (
    <path d="M12 3s6 6.6 6 10.4A6 6 0 0 1 6 13.4C6 9.6 12 3 12 3Z" />
  ),
  tv: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M8.5 20h7M12 16.5V20" />
    </>
  ),
  desk: (
    <>
      <path d="M3 9h18M4.5 9v10M19.5 9v10M3 9l2-4h14l2 4" />
      <path d="M8 13h8" />
    </>
  ),
  bell: (
    <>
      <path d="M6 17h12a6 6 0 0 0-12 0ZM3.5 20h17M12 11V8" />
      <circle cx="12" cy="7" r="1" />
    </>
  ),
  broom: (
    <>
      <path d="M14.5 3 9 8.5M7 10.5 13.5 4 16 6.5 9.5 13Z" />
      <path d="M9.5 13 5 21h10l-2-6" />
    </>
  ),
  bag: (
    <>
      <rect x="4" y="7.5" width="16" height="13" rx="1.5" />
      <path d="M9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M9 11v6M15 11v6" />
    </>
  ),
  car: (
    <>
      <path d="M4 15v3M20 15v3M3 15h18v-3l-2-5H5L3 12Z" />
      <circle cx="7.5" cy="15" r="1.2" />
      <circle cx="16.5" cy="15" r="1.2" />
    </>
  ),
  cross: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
    </>
  ),
  shirt: (
    <path d="M8 3 4 5.5 6 9l1.5-.8V21h9V8.2L18 9l2-3.5L16 3l-2 1.6h-4Z" />
  ),
  seat: (
    <>
      <path d="M6 10V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V10" />
      <path d="M4.5 10h15v6.5h-15zM6.5 16.5V19M17.5 16.5V19" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18V7M3 11h18v7M21 18v-4" />
      <circle cx="7.5" cy="9.5" r="1.8" />
    </>
  ),
  dot: <circle cx="12" cy="12" r="2.4" />,
};

const MATCH: [RegExp, string][] = [
  [/air cond|^ac\b/i, "ac"],
  [/wi-?fi/i, "wifi"],
  [/hot water|shower/i, "water"],
  [/television|\btv\b/i, "tv"],
  [/desk/i, "desk"],
  [/room service|bell/i, "bell"],
  [/housekeep|clean/i, "broom"],
  [/luggage|bag/i, "bag"],
  [/park|car/i, "car"],
  [/doctor|medical/i, "cross"],
  [/restaurant|dining|plate/i, "plate"],
  [/laundry|shirt/i, "shirt"],
  [/seating|sofa|corner/i, "seat"],
  [/bed|mattress|king|double|single/i, "bed"],
];

export function glyphFor(label: string) {
  for (const [re, key] of MATCH) if (re.test(label)) return key;
  return "dot";
}

export default function Icon({
  name,
  className = "h-4 w-4",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...S}>
      {glyphs[name] ?? glyphs.dot}
    </svg>
  );
}
