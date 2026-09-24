export type Dish = {
  id: string;
  name: string;
  deva: string;
  note: string;
  veg: boolean;
  signature?: boolean;
};

/** §4 — the five that plate themselves onto the thali as you scroll. */
export const thaliSequence: Dish[] = [
  {
    id: "kali-mirch-chicken",
    name: "Kali Mirch Chicken",
    deva: "काली मिर्च चिकन",
    note: "Black pepper, not chilli. The heat arrives late and stays a while. The dish the restaurant is known for, and the one to order first.",
    veg: false,
    signature: true,
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    deva: "दाल मखनी",
    note: "On the stove overnight. You can tell, which is the whole point of doing it that way.",
    veg: true,
    signature: true,
  },
  {
    id: "mutton-rogan-josh",
    name: "Mutton Rogan Josh",
    deva: "मटन रोगन जोश",
    note: "Slow, red, unhurried. Ordered by most tables that have eaten here before.",
    veg: false,
    signature: true,
  },
  {
    id: "dahi-kabab",
    name: "Dahi Kabab",
    deva: "दही कबाब",
    note: "Hung curd, crisp outside, almost liquid inside. The vegetarian order that surprises people.",
    veg: true,
    signature: true,
  },
  {
    id: "paneer-lababdar",
    name: "Paneer Lababdar",
    deva: "पनीर लबाबदार",
    note: "Tomato, cream, a little kasuri methi crushed in at the end.",
    veg: true,
    signature: true,
  },
];

export const restaurantMenu: { section: string; deva?: string; dishes: Dish[] }[] = [
  {
    section: "From the tandoor",
    deva: "तंदूर से",
    dishes: [
      { id: "malai-tikka", name: "Malai Tikka", deva: "मलाई टिक्का", note: "Cream, cheese, green cardamom. Mild on purpose.", veg: false, signature: true },
      { id: "mutton-seekh", name: "Mutton Seekh Kabab", deva: "मटन सीख कबाब", note: "Minced on the premises, not bought in.", veg: false, signature: true },
      { id: "dahi-kabab-2", name: "Dahi Kabab", deva: "दही कबाब", note: "Hung curd, crisp outside, almost liquid inside.", veg: true, signature: true },
      { id: "paneer-tikka", name: "Paneer Tikka", deva: "पनीर टिक्का", note: "Thick cut, charred at the edges.", veg: true },
    ],
  },
  {
    section: "The main table",
    deva: "मुख्य व्यंजन",
    dishes: [
      { id: "kali-mirch-chicken-2", name: "Kali Mirch Chicken", deva: "काली मिर्च चिकन", note: "Black pepper, not chilli. The one to order first.", veg: false, signature: true },
      { id: "rogan-josh-2", name: "Mutton Rogan Josh", deva: "मटन रोगन जोश", note: "Slow, red, unhurried.", veg: false, signature: true },
      { id: "butter-chicken", name: "Butter Chicken", deva: "बटर चिकन", note: "For the table that cannot agree on anything else.", veg: false },
      { id: "dal-makhani-2", name: "Dal Makhani", deva: "दाल मखनी", note: "On the stove overnight.", veg: true, signature: true },
      { id: "paneer-lababdar-2", name: "Paneer Lababdar", deva: "पनीर लबाबदार", note: "Tomato, cream, kasuri methi at the end.", veg: true, signature: true },
      { id: "mushroom-masala", name: "Mushroom Masala", deva: "मशरूम मसाला", note: "Onion-heavy, thick, good with roti rather than rice.", veg: true, signature: true },
    ],
  },
  {
    section: "Rice, bread and the rest",
    deva: "चावल और रोटी",
    dishes: [
      { id: "roti", name: "Tandoori Roti", deva: "तंदूरी रोटी", note: "Plain or buttered.", veg: true },
      { id: "naan", name: "Butter Naan", deva: "बटर नान", note: "", veg: true },
      { id: "jeera-rice", name: "Jeera Rice", deva: "जीरा चावल", note: "", veg: true },
      { id: "raita", name: "Boondi Raita", deva: "बूंदी रायता", note: "Worth it with anything from the tandoor.", veg: true },
    ],
  },
];

export const cafeMenu: { section: string; items: { name: string; note: string; from?: number }[] }[] = [
  {
    section: "Pizza",
    items: [
      { name: "Margherita", note: "Thin base. The one the kitchen makes best.", from: 220 },
      { name: "Farmhouse", note: "Capsicum, onion, corn, mushroom.", from: 280 },
      { name: "Chicken Tikka", note: "The leftover argument between the two kitchens, settled.", from: 320 },
    ],
  },
  {
    section: "Pasta",
    items: [
      { name: "Alfredo", note: "White, heavy, unapologetic.", from: 260 },
      { name: "Arrabbiata", note: "Red, hot, faster to arrive.", from: 240 },
    ],
  },
  {
    section: "Shakes and coffee",
    items: [
      { name: "Chocolate Shake", note: "Made with the same chocolate that is sold by the wall.", from: 150 },
      { name: "Cold Coffee", note: "", from: 140 },
      { name: "Hot Chocolate", note: "For the evening you come back down from the hills.", from: 160 },
    ],
  },
];

/** §5 — the hamper configurator. Prices are per box, before taxes. */
export const hamper = {
  sizes: [
    { id: "six", count: 6, label: "Six", price: 450 },
    { id: "twelve", count: 12, label: "Twelve", price: 820 },
    { id: "twentyfour", count: 24, label: "Twenty-four", price: 1550 },
  ],
  ribbons: [
    { id: "geru", label: "Geru red", hex: "#9C3B24" },
    { id: "brass", label: "Brass", hex: "#C08A3E" },
    { id: "deodar", label: "Deodar green", hex: "#24382E" },
    { id: "rice", label: "Rice white", hex: "#F4EDE2" },
  ],
  fills: [
    { id: "dark", label: "Dark", hex: "#3A2318" },
    { id: "milk", label: "Milk", hex: "#8A5A3B" },
    { id: "white", label: "White", hex: "#E8D9C5" },
    { id: "assorted", label: "Assorted", hex: "#6B452F" },
  ],
  keeps: "Six months, unrefrigerated. They travel.",
} as const;

export const cafe = {
  name: "Choco Doodle Café",
  hours: { from: "7:30", to: "22:30" },
  forTwo: 450,
  cuisines: ["Italian", "North Indian", "American"],
} as const;

export const restaurant = {
  name: "Motimahal Restaurant",
  rank: { position: 14, of: 161, place: "Haldwani" },
  cuisines: ["Indian", "Asian"],
} as const;
