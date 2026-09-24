/**
 * Guest reviews — verbatim, with the platform named.
 *
 * Empty on purpose. Only add a review you have the guest's permission to quote
 * (or one that is public on the platform you name), copied word for word.
 * The reviews section shows the rating summary until this has entries, then
 * shows these as well.
 *
 * {
 *   id: "r1",
 *   quote: "…exactly as written…",
 *   author: "First name + initial",
 *   platform: "Google",
 *   stayed: "March 2026",
 *   rating: 5,
 *   reply: { from: "The front desk", body: "…" },   // optional
 * }
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

export const reviews: Review[] = [];
