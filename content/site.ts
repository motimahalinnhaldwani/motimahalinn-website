/**
 * Moti Mahal Inn — ground truth.
 * One place for every fact the site states out loud.
 */

/* The only two values that must be replaced before the site goes live.
   Everything else here is real. */
export const PHONE = "+915946000000";
export const WHATSAPP = "915946000000";

export const site = {
  name: "Moti Mahal Inn",
  nameDeva: "मोती महल इन",
  legalName: "Motimahal Inn",
  tagline: "The last light of the plains. The first breath of the hills.",
  description:
    "A three-star inn on Nainital Road, Haldwani — two hundred metres from the bus stand, thirty-five kilometres from Nainital, and one good night’s sleep from the mountains.",
  url: "https://motimahalinn.com",
  phone: PHONE,
  phoneDisplay: "+91 5946 000 000",
  whatsapp: WHATSAPP,
  email: "stay@motimahalinn.com",
  address: {
    street: "Nainital Road (NH-87), opposite SDM Court",
    locality: "Haldwani",
    region: "Uttarakhand",
    district: "Nainital",
    postalCode: "263139",
    country: "IN",
  },
  geo: { lat: 29.2183, lng: 79.5130 },
  rating: { value: 4.0, count: 600 },
  rates: { min: 1750, max: 4250, currency: "INR" },
  checkIn: "12:00",
  checkOut: "10:00",
  stars: 3,
} as const;

export const meals = [
  { label: "Breakfast", from: "7:30", to: "12:00" },
  { label: "Lunch", from: "12:00", to: "17:30" },
  { label: "Dinner", from: "17:30", to: "23:00" },
] as const;

/** §2.2 — the threshold. These distances are the whole proposition. */
export const distances = [
  {
    place: "Haldwani bus station",
    metres: 200,
    display: "200 m",
    note: "Close enough to hear the last bus leave. Far enough not to.",
    kind: "transit",
  },
  {
    place: "Haldwani railway station",
    metres: 750,
    display: "750 m",
    note: "A ten-minute walk with a bag. Less with an auto.",
    kind: "transit",
  },
  {
    place: "Kathgodam railway station",
    metres: 6200,
    display: "6.2 km",
    note: "Where the rails stop and the hills begin.",
    kind: "transit",
  },
  {
    place: "Pantnagar Airport",
    metres: 32500,
    display: "32.5 km",
    note: "Roughly fifty minutes, traffic permitting.",
    kind: "transit",
  },
] as const;

export const amenities = [
  { label: "Multi-cuisine restaurant", icon: "plate" },
  { label: "24-hour room service", icon: "bell" },
  { label: "Air conditioning", icon: "ac" },
  { label: "Free Wi-Fi", icon: "wifi" },
  { label: "Daily housekeeping", icon: "broom" },
  { label: "Luggage storage", icon: "bag" },
  { label: "Doctor on call", icon: "cross" },
  { label: "On-site parking", icon: "car" },
  { label: "Laundry service", icon: "shirt" },
] as const;

/** §8.4 — every direct booking saves 15–20% commission. Make it the guest’s win. */
export const otas = [
  "Goibibo",
  "MakeMyTrip",
  "Agoda",
  "Cleartrip",
  "EaseMyTrip",
  "Trip.com",
] as const;

export const bookDirect = {
  headline: "Book direct. Same room, better price, and a real person answers the phone.",
  savingPct: 18,
  confirmWindow: "within 30 minutes, 7 a.m. – 11 p.m.",
} as const;

export const nav = [
  { href: "/rooms", label: "Rooms" },
  { href: "/dining/restaurant", label: "Restaurant" },
  { href: "/dining/cafe", label: "Café" },
  { href: "/journeys", label: "Journeys" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;
