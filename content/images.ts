/**
 * The image registry.
 *
 * Every photograph on this site is declared here and nowhere else. A slot with
 * `src: null` renders a generated, on-palette stand-in carrying its shot brief —
 * deliberately not a photograph, so it can never be mistaken for one and can
 * never quietly survive to launch (§14).
 *
 * To place a real photograph: drop the file in /public/photos, then set `src`,
 * `width`, `height` and write `alt` for a human.
 *
 * `maxRenderWidth` is an honesty cap. The four supplied photographs are OTA
 * thumbnails (300×200 to 516×387); scaling them across a full-bleed panel would
 * look worse than the stand-in and would undercut the one thing this site is
 * built to prove. They are used at sizes their resolution supports.
 */

export type Tone = "plains" | "lamp" | "hill" | "cream" | "cocoa";

export type Shot = {
  id: string;
  src: string | null;
  width: number;
  height: number;
  alt: string;
  brief: string;
  tone: Tone;
  maxRenderWidth?: number;
};

const shot = (s: Shot) => s;

export const images = {
  /* ── Supplied ───────────────────────────────────────────────── */

  premierBalcony: shot({
    id: "premierBalcony",
    src: "/photos/premier-balcony.jpg",
    width: 300,
    height: 200,
    maxRenderWidth: 300,
    alt: "A Premier room with a navy upholstered headboard, white bedding and a curtained balcony doorway leading to a small seating area.",
    brief: "Premier room, wide, lamps on, balcony door open",
    tone: "lamp",
  }),

  deluxeEvening: shot({
    id: "deluxeEvening",
    src: "/photos/deluxe-evening.jpg",
    width: 308,
    height: 232,
    maxRenderWidth: 308,
    alt: "A Deluxe room at night: teal and white bedding, a dark wood panel behind the bed, warm cove lighting and a wall-mounted television.",
    brief: "Deluxe room, 9 p.m. lamp light, bed made",
    tone: "lamp",
  }),

  corridorFrames: shot({
    id: "corridorFrames",
    src: "/photos/corridor-frames.jpg",
    width: 516,
    height: 387,
    maxRenderWidth: 516,
    alt: "A narrow corridor hung with a column of black-framed prints, lit by a recessed ceiling strip, brown marble underfoot.",
    brief: "Corridor towards reception, framed prints, evening",
    tone: "lamp",
  }),

  corridorDoors: shot({
    id: "corridorDoors",
    src: "/photos/corridor-doors.jpg",
    width: 516,
    height: 387,
    maxRenderWidth: 516,
    alt: "A guest-floor corridor with polished green marble, four dark wood room doors, framed pictures between them and a window at the far end.",
    brief: "Guest floor corridor, green marble, window at the end",
    tone: "lamp",
  }),

  /* ── Awaiting the shoot (§13) ───────────────────────────────── */

  heroPlains: shot({
    id: "heroPlains",
    src: null,
    width: 2400,
    height: 1350,
    alt: "",
    brief: "Shivalik foothills from the Haldwani side, 6 a.m., haze still on the plains",
    tone: "plains",
  }),

  exterior: shot({
    id: "exterior",
    src: null,
    width: 1800,
    height: 1200,
    alt: "",
    brief: "Hotel frontage from Nainital Road, dusk, signage lit, no wide-angle",
    tone: "plains",
  }),

  lobby: shot({
    id: "lobby",
    src: null,
    width: 1800,
    height: 1200,
    alt: "",
    brief: "Reception with a person at the desk, natural light, undistorted",
    tone: "lamp",
  }),

  deluxeMorning: shot({
    id: "deluxeMorning",
    src: null,
    width: 1600,
    height: 1200,
    alt: "",
    brief: "Deluxe room, 6 a.m. light through the window, bed slept-in-looking",
    tone: "plains",
  }),

  deluxePlan: shot({
    id: "deluxePlan",
    src: null,
    width: 1200,
    height: 900,
    alt: "",
    brief: "Deluxe floor plan, 120 sq ft, drawn to scale with the bed in place",
    tone: "hill",
  }),

  premierMorning: shot({
    id: "premierMorning",
    src: null,
    width: 1600,
    height: 1200,
    alt: "",
    brief: "Premier room, morning, king bed, full width of the room visible",
    tone: "plains",
  }),

  premierPlan: shot({
    id: "premierPlan",
    src: null,
    width: 1200,
    height: 900,
    alt: "",
    brief: "Premier floor plan, 160 sq ft, drawn to scale, four-guest layout",
    tone: "hill",
  }),

  bathroom: shot({
    id: "bathroom",
    src: null,
    width: 1200,
    height: 1500,
    alt: "",
    brief: "Bathroom, lights on, honest about size, fittings clean and in focus",
    tone: "lamp",
  }),

  restaurantRoom: shot({
    id: "restaurantRoom",
    src: null,
    width: 2000,
    height: 1250,
    alt: "",
    brief: "Motimahal Restaurant at 8 p.m., tables occupied, warm light",
    tone: "lamp",
  }),

  thali: shot({
    id: "thali",
    src: null,
    width: 1400,
    height: 1400,
    alt: "",
    brief: "Brass thali, top-down, five signature dishes plated, real table",
    tone: "lamp",
  }),

  kaliMirchChicken: shot({
    id: "kaliMirchChicken",
    src: null,
    width: 1200,
    height: 1200,
    alt: "",
    brief: "Kali mirch chicken, three-quarter, steel bowl, no styling gloss",
    tone: "lamp",
  }),

  cafeCounter: shot({
    id: "cafeCounter",
    src: null,
    width: 2000,
    height: 1250,
    alt: "",
    brief: "Choco Doodle chocolate counter, full wall, daylight",
    tone: "cream",
  }),

  cafeRoom: shot({
    id: "cafeRoom",
    src: null,
    width: 1800,
    height: 1200,
    alt: "",
    brief: "Café seating, mid-morning, bright, a pizza on a table",
    tone: "cream",
  }),

  hamper: shot({
    id: "hamper",
    src: null,
    width: 1400,
    height: 1400,
    alt: "",
    brief: "Open gift hamper, twelve chocolates on a tray, ribbon tied",
    tone: "cocoa",
  }),

  kainchiDham: shot({
    id: "kainchiDham",
    src: null,
    width: 1600,
    height: 1000,
    alt: "",
    brief: "Kainchi Dham, early morning, river below the temple",
    tone: "hill",
  }),

  nainital: shot({
    id: "nainital",
    src: null,
    width: 1600,
    height: 1000,
    alt: "",
    brief: "Naini lake from Mallital, haze burning off",
    tone: "hill",
  }),

  bhimtal: shot({
    id: "bhimtal",
    src: null,
    width: 1600,
    height: 1000,
    alt: "",
    brief: "Bhimtal lake and the island, flat morning light",
    tone: "hill",
  }),

  mukteshwar: shot({
    id: "mukteshwar",
    src: null,
    width: 1600,
    height: 1000,
    alt: "",
    brief: "Mukteshwar ridge, Himalaya visible on the horizon",
    tone: "hill",
  }),

  corbett: shot({
    id: "corbett",
    src: null,
    width: 1600,
    height: 1000,
    alt: "",
    brief: "Corbett sal forest and the Kosi, no captive animals",
    tone: "hill",
  }),

  staff: shot({
    id: "staff",
    src: null,
    width: 1400,
    height: 1000,
    alt: "",
    brief: "Reception and kitchen staff, named, looking at the camera, no uniformly posed line-up",
    tone: "lamp",
  }),
} as const;

export type ImageKey = keyof typeof images;

/** Slots still waiting on the shoot — drives the shot list on /gallery. */
export const pendingShots = (Object.values(images) as Shot[]).filter((s) => !s.src);
