/**
 * Moti Mahal Inn — ground truth.
 * One place for every fact the site states out loud.
 */

/** Calls and WhatsApp both go here. The number must have WhatsApp active. */
export const PHONE = "+916397359584";
export const WHATSAPP = "916397359584";

export const site = {
  name: "Moti Mahal Inn",
  nameDeva: "मोती महल इन",
  legalName: "Motimahal Inn",
  kinds: "Three-star hotel",
  description:
    "A three-star hotel on Nainital Road, Haldwani — 300 m from the bus station and 1 km from the railway station, with our own restaurant a short walk down the same road.",
  url: "https://motimahalinn.com",
  phone: PHONE,
  phoneDisplay: "+91 63973 59584",
  whatsapp: WHATSAPP,
  address: {
    street: "Nainital Road, opposite SDM Court, near Domino's Pizza, Heera Nagar",
    locality: "Haldwani",
    region: "Uttarakhand",
    district: "Nainital",
    postalCode: "263139",
    country: "IN",
  },
  /** The Google Maps pin for "Motimahal Inn Hotel" (checked 24 Sept 2026). */
  geo: { lat: 29.2190583, lng: 79.5301014 },
  mapsUrl: "https://maps.google.com/?cid=17299989384343897728",
  rating: { value: 4.2, count: 772, on: ["Google"] },
  checkIn: "13:00",
  checkOut: "11:00",
  checkInText: "1 p.m.",
  checkOutText: "11 a.m.",
  stars: 3,
} as const;

/**
 * Minutes after midnight, IST. Drives the "kitchen open now" status.
 * One window: the kitchen (restaurant and food to the rooms) runs from
 * breakfast at 8 a.m. to last orders for dinner at 10:45 p.m.
 */
export const meals = [
  { label: "Kitchen", from: "8:00 a.m.", to: "10:45 p.m.", start: 480, end: 1365 },
] as const;

/** Getting here — the transit points, from the front door. */
export const distances = [
  { place: "Motimahal Restaurant", short: "Motimahal Restaurant", display: "170 m", time: "2 min walk", mode: "food", note: "Our own restaurant, down the same road near Khanchand Market." },
  { place: "Haldwani bus station", short: "Bus stand", display: "300 m", time: "4 min walk", mode: "bus", note: "A four-minute walk." },
  { place: "Haldwani railway station", short: "Haldwani station", display: "1 km", time: "12 min walk", mode: "train", note: "About twelve minutes on foot, five by auto." },
  { place: "Kathgodam railway station", short: "Kathgodam station", display: "6.2 km", time: "15 min drive", mode: "train", note: "Where the line ends and the hills begin." },
  { place: "Pantnagar Airport", short: "Pantnagar airport", display: "32.5 km", time: "50 min drive", mode: "plane", note: "About fifty minutes by road." },
] as const;

/**
 * Up the hill — approximate road distances and drive times from Haldwani.
 * Facts for travellers, not a tour service.
 */
export const places = [
  { id: "bhimtal", place: "Bhimtal", deva: "भीमताल", km: 25, drive: "50 min", note: "A bigger lake than Naini, and quieter." },
  { id: "nainital", place: "Nainital", deva: "नैनीताल", km: 38, drive: "1 hr 15 min", note: "The lake town everyone comes up for." },
  { id: "kainchi", place: "Kainchi Dham", deva: "कैंची धाम", km: 38, drive: "1 hr 15 min", note: "Neem Karoli Baba’s ashram, in the Kosi valley." },
  { id: "corbett", place: "Jim Corbett", deva: "जिम कॉर्बेट", km: 52, drive: "1 hr 30 min", note: "Ramnagar, for the national park gates." },
  { id: "mukteshwar", place: "Mukteshwar", deva: "मुक्तेश्वर", km: 70, drive: "2 hr 15 min", note: "Orchards, and the snows on a clear morning." },
  { id: "almora", place: "Almora", deva: "अल्मोड़ा", km: 87, drive: "3 hr", note: "The old Kumaoni capital, along its ridge." },
] as const;

/** What every guest gets — runs in the band under the hero. */
export const amenities = [
  "Airport pickup & drop",
  "Tea maker / kettle in every room",
  "Hot & cold water",
  "Free parking",
  "Easy public transport",
  "Doctor on call",
  "Day trips to Kainchi Dham",
  "Hygiene well maintained",
  "Daily housekeeping",
  "Spacious rooms",
  "Lift access",
  "24/7 room service",
  "Free Wi-Fi",
  "Wheelchair accessible",
  "24/7 power backup",
] as const;

export const nav = [
  { href: "/rooms", label: "Rooms" },
  { href: "/dining/restaurant", label: "Restaurant" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;
