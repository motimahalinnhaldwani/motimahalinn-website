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
    src: "/photos/deluxe-room.jpg",
    width: 1448,
    height: 1086,
    alt: "A Deluxe room: a double bed in white linen with a rust-brown runner, a walnut and oak panelled wall behind it, bedside drawers, a desk and chair, and full-length gold curtains.",
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

  twinBeds: shot({
    id: "twinBeds",
    src: "/photos/twin-room.jpg",
    width: 1448,
    height: 1086,
    alt: "A Twin room: two single beds in white linen with bronze runners against a brown marble-effect wall, a kettle and phone on the bedside table, a wall-mounted television and air conditioning.",
    brief: "Twin room, both beds made, daylight through the curtains",
    tone: "lamp",
  }),

  twinWide: shot({
    id: "twinWide",
    src: "/photos/twin-wide.jpg",
    width: 1448,
    height: 1086,
    alt: "The Twin room seen from the window end: two single beds side by side, a wall-mounted television opposite and the door at the far end.",
    brief: "Twin room, full length of the room, door at the far end",
    tone: "lamp",
  }),

  twinBathroom: shot({
    id: "twinBathroom",
    src: "/photos/twin-bathroom.jpg",
    width: 1448,
    height: 1086,
    alt: "A white-tiled bathroom with a vessel basin on a granite counter under a framed mirror, a wall-hung western toilet and a hand shower.",
    brief: "Twin room bathroom, lights on",
    tone: "lamp",
  }),

  executiveKing: shot({
    id: "executiveKing",
    src: "/photos/executive-room.jpg",
    width: 1448,
    height: 1086,
    alt: "An Executive room at night: a king bed with teal cushions and runner, and a large smart television on a backlit wooden wall unit with shelves and plants.",
    brief: "Executive room, king bed, lamps on",
    tone: "lamp",
  }),

  executiveEvening: shot({
    id: "executiveEvening",
    src: "/photos/executive-evening.jpg",
    width: 1600,
    height: 1200,
    alt: "The Executive room in the evening: a king bed with white linen, track lights and a pendant lamp, a wall-mounted air conditioner and a dark wood door.",
    brief: "Executive room, evening light, whole room from the corner",
    tone: "lamp",
  }),

  executiveBathroom: shot({
    id: "executiveBathroom",
    src: "/photos/executive-bathroom.jpg",
    width: 1600,
    height: 1067,
    alt: "A dark-tiled bathroom with a backlit mirror over a vessel basin, a wall-hung toilet and a wood-panelled shower area.",
    brief: "Executive room bathroom, mirror lit",
    tone: "lamp",
  }),

  roomTealTv: shot({
    id: "roomTealTv",
    src: "/photos/room-teal-tv.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest room at night: a bed with a teal runner and teal cushions, a television on a backlit wooden wall panel, track lights and cove lighting overhead.",
    brief: "Guest room, evening, TV wall lit",
    tone: "lamp",
  }),

  roomOrangeHeadboard: shot({
    id: "roomOrangeHeadboard",
    src: "/photos/room-orange-headboard.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest room with a king bed under a rust-orange upholstered headboard, two brass pendant lamps, a framed sketch above the bed and a speckled terrazzo floor strip.",
    brief: "Guest room, king bed, pendant lamps",
    tone: "lamp",
  }),

  roomGreyHeadboard: shot({
    id: "roomGreyHeadboard",
    src: "/photos/room-grey-headboard.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest room with a king bed against a grey felt wall inlaid with brass lines, a plum runner on white linen, a wall-mounted television and cove lighting.",
    brief: "Guest room, king bed, grey headboard wall",
    tone: "lamp",
  }),

  roomMarbleHeadboard: shot({
    id: "roomMarbleHeadboard",
    src: "/photos/room-marble-headboard.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest room with a double bed set in white marble-pattern panelling with black strips, a rust-brown runner, hangers by a mirror and gold curtains.",
    brief: "Guest room, marble-pattern headboard wall",
    tone: "lamp",
  }),

  roomWoodHeadboard: shot({
    id: "roomWoodHeadboard",
    src: "/photos/room-wood-headboard.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest room with a double bed against a walnut and oak panelled wall, a bedside chest of drawers, a small desk with a black chair and gold curtains.",
    brief: "Guest room, wood-panelled headboard wall",
    tone: "lamp",
  }),

  roomBrownMarble: shot({
    id: "roomBrownMarble",
    src: "/photos/room-brown-marble.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest room with a double bed against a brown marble-pattern wall, a kettle and water on the side table, an air conditioner above and a television opposite.",
    brief: "Guest room, double bed, brown marble wall",
    tone: "lamp",
  }),

  roomTwinBeds: shot({
    id: "roomTwinBeds",
    src: "/photos/room-twin-beds.jpg",
    width: 1448,
    height: 1086,
    alt: "A twin room with two single beds against a brown marble-pattern wall, a telephone on the table between them and the door at the end of the room.",
    brief: "Twin room, both beds made",
    tone: "lamp",
  }),

  bathroomGreyStone: shot({
    id: "bathroomGreyStone",
    src: "/photos/bathroom-grey-stone.jpg",
    width: 1448,
    height: 1086,
    alt: "A bathroom in grey stone-look tiles with a backlit mirror over a white vessel basin on a granite counter and a wall-hung toilet.",
    brief: "Bathroom, grey stone tiles, mirror lit",
    tone: "lamp",
  }),

  bathroomWhite: shot({
    id: "bathroomWhite",
    src: "/photos/bathroom-white.jpg",
    width: 1448,
    height: 1086,
    alt: "A white-tiled bathroom with a vessel basin on a granite counter under a framed mirror, a wall-hung toilet and a hand shower.",
    brief: "Bathroom, white tiles",
    tone: "lamp",
  }),

  liftLobby: shot({
    id: "liftLobby",
    src: "/photos/lift-lobby.jpg",
    width: 1448,
    height: 1086,
    alt: "The lift lobby: steel lift doors framed in green marble, backlit amber stone panels on the wall and a green marble floor.",
    brief: "Lift lobby, lower ground floor",
    tone: "lamp",
  }),

  corridorTiledRunner: shot({
    id: "corridorTiledRunner",
    src: "/photos/corridor-tiled-runner.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest corridor with a patterned tile runner down the middle, round decorative plates on the wall and a framed golden tree at the far end.",
    brief: "Guest corridor, patterned tile runner",
    tone: "lamp",
  }),

  corridorRoom101: shot({
    id: "corridorRoom101",
    src: "/photos/corridor-room-101.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest corridor on green marble with wooden doors, room 101 in front, a painting on the wall and a window at the end.",
    brief: "Guest corridor, room 101",
    tone: "lamp",
  }),

  corridorEvening: shot({
    id: "corridorEvening",
    src: "/photos/corridor-evening.jpg",
    width: 1448,
    height: 1086,
    alt: "A guest corridor at night with four wooden doors, framed pictures on both walls, a strip of ceiling light and a window at the far end.",
    brief: "Guest corridor, evening light",
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
    src: "/photos/hotel-exterior.jpg",
    width: 1672,
    height: 941,
    alt: "Motimahal Inn at dusk: a five-storey building faced in cream stone, its rows of curtained windows lit gold, with the parking entrance and reception at street level on Nainital Road.",
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
    brief: "Premier floor plan, 160 sq ft, drawn to scale, three-guest layout",
    tone: "hill",
  }),

  twinPlan: shot({
    id: "twinPlan",
    src: null,
    width: 1200,
    height: 900,
    alt: "",
    brief: "Twin floor plan, 120 sq ft, drawn to scale with both single beds in place",
    tone: "hill",
  }),

  executivePlan: shot({
    id: "executivePlan",
    src: null,
    width: 1200,
    height: 900,
    alt: "",
    brief: "Executive floor plan, 180 sq ft, drawn to scale with the king bed in place",
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


  staff: shot({
    id: "staff",
    src: null,
    width: 1400,
    height: 1000,
    alt: "",
    brief: "Reception, housekeeping and kitchen staff, named, looking at the camera, no uniformly posed line-up",
    tone: "lamp",
  }),
} as const;

export type ImageKey = keyof typeof images;

/** Slots still waiting on the shoot — drives the shot list on /gallery. */
export const pendingShots = (Object.values(images) as Shot[]).filter((s) => !s.src);
