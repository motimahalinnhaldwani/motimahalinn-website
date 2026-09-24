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
  plane: <path d="M10.5 20.5 12 15l-5-1.5-2 2L3.5 15l2.5-3L3.5 9l1.5-.5 2 2L12 9l-1.5-5.5 1.5-.5 4 6.5 4-.5a1.5 1.5 0 0 1 0 3l-4-.5-4 6.5Z" />,
  bus: (
    <>
      <rect x="4.5" y="3.5" width="15" height="14" rx="2" />
      <path d="M4.5 11h15M7 17.5V20M17 17.5V20" />
      <circle cx="8" cy="14.5" r=".8" />
      <circle cx="16" cy="14.5" r=".8" />
    </>
  ),
  bolt: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" />,
  lift: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
      <path d="M12 3v18M7.5 9.5 9 8l1.5 1.5M13.5 14.5 15 16l1.5-1.5" />
    </>
  ),
  access: (
    <>
      <circle cx="11" cy="4.5" r="1.6" />
      <path d="M11 7.5v6h5l2 5M11 10.5h4.5" />
      <path d="M8 11.2a5 5 0 1 0 6.8 6.8" />
    </>
  ),
  temple: <path d="M12 2.5v2M8 9.5 12 4.5l4 5M6.5 9.5h11M7.5 9.5v11M16.5 9.5v11M4 20.5h16M10.5 20.5v-5h3v5" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8ZM18.5 16l.7 1.8L21 18.5l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6" />,
  kettle: (
    <>
      <path d="M6 9.5h10l-1 10H7Z" />
      <path d="M16 11.5h1.5a2 2 0 0 1 0 4H15.5M6 11 3.5 8.5M8.5 9.5a2.5 2.5 0 0 1 5 0" />
    </>
  ),
  dot: <circle cx="12" cy="12" r="2.4" />,
};

const MATCH: [RegExp, string][] = [
  [/kettle|tea maker/i, "kettle"],
  [/airport|pickup/i, "plane"],
  [/public transport|\bbus\b/i, "bus"],
  [/power/i, "bolt"],
  [/lift|elevator/i, "lift"],
  [/wheelchair/i, "access"],
  [/kainchi|temple|trip/i, "temple"],
  [/hygiene/i, "sparkle"],
  [/spacious/i, "expand"],
  [/air cond|^ac\b/i, "ac"],
  [/wi-?fi/i, "wifi"],
  [/water|shower/i, "water"],
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
