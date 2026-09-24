export type Dish = {
  id: string;
  name: string;
  deva: string;
  note: string;
  veg: boolean;
};

/** The five that land on the thali as you scroll. */
export const thaliSequence: Dish[] = [
  { id: "kali-mirch-chicken", name: "Kali Mirch Chicken", deva: "काली मिर्च चिकन", note: "Chicken in a black-pepper gravy. The heat comes from pepper, not chilli, and it arrives late.", veg: false },
  { id: "dal-makhani", name: "Dal Makhani", deva: "दाल मखनी", note: "Black lentils and kidney beans, slow-cooked with butter and cream.", veg: true },
  { id: "mutton-rogan-josh", name: "Mutton Rogan Josh", deva: "मटन रोगन जोश", note: "Mutton braised in a deep red gravy of Kashmiri chilli and whole spice.", veg: false },
  { id: "dahi-kabab", name: "Dahi Kabab", deva: "दही कबाब", note: "Hung-curd patties, crisp outside and soft within. The vegetarian order that surprises people.", veg: true },
  { id: "paneer-lababdar", name: "Paneer Lababdar", deva: "पनीर लबाबदार", note: "Paneer in a rich tomato and cream gravy.", veg: true },
];

export const signatures: { section: string; deva: string; dishes: { name: string; deva: string; veg: boolean }[] }[] = [
  {
    section: "From the tandoor",
    deva: "तंदूर से",
    dishes: [
      { name: "Malai Tikka", deva: "मलाई टिक्का", veg: false },
      { name: "Mutton Seekh Kabab", deva: "मटन सीख कबाब", veg: false },
      { name: "Dahi Kabab", deva: "दही कबाब", veg: true },
    ],
  },
  {
    section: "Curries & dal",
    deva: "करी और दाल",
    dishes: [
      { name: "Kali Mirch Chicken", deva: "काली मिर्च चिकन", veg: false },
      { name: "Mutton Rogan Josh", deva: "मटन रोगन जोश", veg: false },
      { name: "Dal Makhani", deva: "दाल मखनी", veg: true },
      { name: "Paneer Lababdar", deva: "पनीर लबाबदार", veg: true },
      { name: "Mushroom Masala", deva: "मशरूम मसाला", veg: true },
    ],
  },
];

export const restaurant = {
  name: "Motimahal Restaurant",
  rank: { position: 14, of: 161, place: "Haldwani", on: "TripAdvisor" },
  cuisines: ["Indian", "Asian"],
} as const;
