import type { ImageKey } from "./images";

export type Room = {
  slug: string;
  name: string;
  nameDeva: string;
  sqft: number;
  sleeps: number;
  beds: string;
  line: string;
  body: string;
  amenities: string[];
  hero: ImageKey;
  gallery: ImageKey[];
  plan: ImageKey;
};

export const rooms: Room[] = [
  {
    slug: "deluxe",
    name: "Deluxe",
    nameDeva: "डीलक्स",
    sqft: 120,
    sleeps: 3,
    beds: "One double, or two singles",
    line: "A hundred and twenty square feet, and every one of them working.",
    body:
      "A room for sleeping in, not living in. You arrive after a long road, you want a hot shower and a bed that has been properly made, and you are gone by ten. It is sized for exactly that — and we would rather tell you the number than let you find it out.",
    amenities: ["Air conditioning", "Free Wi-Fi", "Television", "Tea maker / kettle", "Desk", "Daily housekeeping", "24-hour room service", "Up to 3 guests"],
    hero: "deluxeEvening",
    gallery: ["deluxeEvening", "deluxeMorning", "bathroom"],
    plan: "deluxePlan",
  },
  {
    slug: "twin",
    name: "Twin",
    nameDeva: "ट्विन",
    sqft: 120,
    sleeps: 3,
    beds: "Two singles",
    line: "Two single beds, and nobody has to share.",
    body:
      "The Twin is for two people who would each rather have their own bed — colleagues on a work trip, a parent and a grown child, two friends on the way up to the hills. A hundred and twenty square feet, two single beds, a chair by the window, a kettle, and a view over the city.",
    amenities: ["Air conditioning", "Free Wi-Fi", "Television", "Tea maker / kettle", "Two single beds", "Daily housekeeping", "24-hour room service", "Up to 3 guests"],
    hero: "twinBeds",
    gallery: ["twinBeds", "twinWide", "twinBathroom"],
    plan: "twinPlan",
  },
  {
    slug: "premier",
    name: "Premier",
    nameDeva: "प्रीमियर",
    sqft: 160,
    sleeps: 3,
    beds: "One king",
    line: "Forty more square feet, and room for a small family.",
    body:
      "The Premier takes up to three. A king bed and floor enough for a family who have been in a car since Delhi. If you are travelling with a parent or a child, this is the one to take.",
    amenities: ["Air conditioning", "Free Wi-Fi", "Television", "Tea maker / kettle", "Up to 3 guests", "Daily housekeeping", "24-hour room service"],
    hero: "premierBalcony",
    gallery: ["premierBalcony", "premierMorning", "bathroom"],
    plan: "premierPlan",
  },
  {
    slug: "executive",
    name: "Executive",
    nameDeva: "एग्ज़ीक्यूटिव",
    sqft: 180,
    sleeps: 3,
    beds: "One king",
    line: "A hundred and eighty square feet — the most room we have.",
    body:
      "The Executive is the one to take if you will actually spend time in the room. A king bed, a small table and chair by the window, a shower cubicle, and a kettle for the morning. It looks over the city, and it takes up to three.",
    amenities: ["Air conditioning", "Television", "Tea maker / kettle", "King bed", "Shower cubicle", "Laundry service", "24-hour room service", "Up to 3 guests"],
    hero: "executiveKing",
    gallery: ["executiveKing", "executiveEvening", "executiveBathroom"],
    plan: "executivePlan",
  },
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
