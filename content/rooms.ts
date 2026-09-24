import type { ImageKey } from "./images";

export type Room = {
  slug: string;
  name: string;
  nameDeva: string;
  sqft: number;
  sleeps: number;
  beds: string;
  from: number;
  line: string;
  body: string;
  amenities: string[];
  hero: ImageKey;
  gallery: ImageKey[];
  plan: ImageKey;
  /** Hotspots for the Phase 4 360° walkthrough — authored now, wired later. */
  hotspots: { id: string; label: string; detail: string; yaw: number; pitch: number }[];
};

export const rooms: Room[] = [
  {
    slug: "deluxe",
    name: "Deluxe",
    nameDeva: "डीलक्स",
    sqft: 120,
    sleeps: 2,
    beds: "One double, or two singles",
    from: 1750,
    line: "A hundred and twenty square feet, and every one of them working.",
    body:
      "This is a room for sleeping in, not living in. You will arrive after a long road, you will want a hot shower and a bed that has been properly made, and you will be gone by ten. It is sized for exactly that. The bed takes the wall, the window takes the light, and there is enough floor beside it to open a suitcase flat. We would rather tell you the number than let you find it out.",
    amenities: [
      "Air conditioning",
      "Free Wi-Fi",
      "Hot water, round the clock",
      "Television",
      "Desk and chair",
      "Daily housekeeping",
      "24-hour room service",
    ],
    hero: "deluxeEvening",
    gallery: ["deluxeEvening", "deluxeMorning", "bathroom"],
    plan: "deluxePlan",
    hotspots: [
      { id: "bed", label: "The bed", detail: "A double, or split into two singles on request when you book.", yaw: 0, pitch: 0 },
      { id: "window", label: "The window", detail: "Faces the inner side. Quieter than the road, and dark by nine.", yaw: 95, pitch: 4 },
      { id: "bath", label: "The bathroom", detail: "Shower, hot water at any hour, towels changed daily.", yaw: 180, pitch: -6 },
      { id: "ac", label: "Air conditioning", detail: "Split unit. Haldwani sits at 420 m and May is honest about it.", yaw: 255, pitch: 22 },
      { id: "desk", label: "The desk", detail: "Enough surface for a laptop and a plate at the same time.", yaw: 300, pitch: -4 },
    ],
  },
  {
    slug: "premier",
    name: "Premier",
    nameDeva: "प्रीमियर",
    sqft: 160,
    sleeps: 4,
    beds: "One king",
    from: 2600,
    line: "Forty more square feet, and room for the children to be unreasonable in.",
    body:
      "The Premier takes four. A king bed, floor enough for an extra mattress, and a corner that can hold the bags of a family who have been in a car since Delhi. If you are travelling with parents, or breaking a drive to Corbett, this is the one to take. It costs more because it is bigger — not because anything in it is more expensive than the Deluxe.",
    amenities: [
      "Air conditioning",
      "Free Wi-Fi",
      "Hot water, round the clock",
      "Television",
      "Seating corner",
      "Extra mattress on request",
      "Daily housekeeping",
      "24-hour room service",
    ],
    hero: "premierBalcony",
    gallery: ["premierBalcony", "premierMorning", "bathroom"],
    plan: "premierPlan",
    hotspots: [
      { id: "bed", label: "The king bed", detail: "Sleeps two comfortably, four with the extra mattress.", yaw: 0, pitch: 0 },
      { id: "sitting", label: "The sitting corner", detail: "Where the bags go, and where somebody ends up reading.", yaw: 70, pitch: -8 },
      { id: "window", label: "The window", detail: "Larger than the Deluxe. Morning light from around six.", yaw: 140, pitch: 6 },
      { id: "bath", label: "The bathroom", detail: "Shower, hot water at any hour, towels changed daily.", yaw: 205, pitch: -6 },
      { id: "ac", label: "Air conditioning", detail: "Split unit, and a ceiling fan for the nights you do not need it.", yaw: 285, pitch: 24 },
    ],
  },
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
