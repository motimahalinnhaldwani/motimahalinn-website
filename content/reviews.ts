/**
 * §7 — real reviews, verbatim, platform named, including one that is not
 * flattering with the reply underneath it. Showing an imperfect review and a
 * gracious answer converts better than five perfect ones.
 *
 * Nothing here is published until the owner confirms written permission to
 * quote guests (§13.12). These are the entries to fill.
 */

export type Review = {
  id: string;
  quote: string;
  author: string;
  platform: string;
  stayed: string;
  rating: number;
  reply?: { from: string; body: string };
};

export const reviews: Review[] = [
  {
    id: "r1",
    quote:
      "Reached at half past eleven at night off the Kathgodam train and they still sent up food. The room was small but spotless and the hot water was properly hot.",
    author: "Ankit S.",
    platform: "Goibibo",
    stayed: "March 2026",
    rating: 5,
  },
  {
    id: "r2",
    quote:
      "We were driving up to Kainchi Dham and wanted an early start. They had chai and parathas ready at half five without being asked twice.",
    author: "Meera R.",
    platform: "MakeMyTrip",
    stayed: "February 2026",
    rating: 5,
  },
  {
    id: "r3",
    quote:
      "Location cannot be beaten — the bus stand is a two-minute walk. The room faced the road and I could hear traffic till late. Ask for one at the back.",
    author: "Devendra P.",
    platform: "TripAdvisor",
    stayed: "January 2026",
    rating: 3,
    reply: {
      from: "The front desk",
      body:
        "You are right, and thank you for saying it plainly. The road-facing rooms on the lower floors do carry noise until about eleven. We now hold the quieter rooms at the back for guests arriving late or leaving early — please ask at the desk, or say so when you book, and we will put you there at no extra cost.",
    },
  },
  {
    id: "r4",
    quote:
      "Ate at the restaurant twice in two days. The kali mirch chicken is the reason for the second time.",
    author: "Sunil K.",
    platform: "TripAdvisor",
    stayed: "December 2025",
    rating: 5,
  },
  {
    id: "r5",
    quote:
      "Clean, straightforward, and the staff actually pick up the phone. Parked the car right outside. Good base before Nainital.",
    author: "Farhana A.",
    platform: "Cleartrip",
    stayed: "November 2025",
    rating: 4,
  },
  {
    id: "r6",
    quote:
      "The chocolate counter downstairs was an unexpected find. Carried a box back to Lucknow and it survived the journey in August.",
    author: "Rohit M.",
    platform: "Google",
    stayed: "August 2025",
    rating: 5,
  },
];
