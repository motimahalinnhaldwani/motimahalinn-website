import { WHATSAPP, site } from "@/content/site";

/**
 * Direct booking, by design. The site never takes a booking itself: it writes
 * the guest's request into a WhatsApp message to the front desk, and the desk
 * confirms. No payment, no inventory to keep in sync, no commission.
 */

export type Booking = {
  checkIn?: string; // yyyy-mm-dd
  checkOut?: string;
  adults?: number;
  children?: number;
  room?: string; // display name, or undefined for "no preference"
  name?: string;
  note?: string;
};

/** Parse yyyy-mm-dd as a local calendar date. `new Date("2026-09-25")` is UTC
    midnight, which shows as the 24th anywhere west of Greenwich. */
export function parseDay(iso?: string): Date | null {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function nightsBetween(a?: string, b?: string) {
  const d1 = parseDay(a);
  const d2 = parseDay(b);
  if (!d1 || !d2) return 0;
  return Math.round((d2.getTime() - d1.getTime()) / 86_400_000);
}

const fmt = (iso?: string) =>
  parseDay(iso)?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function bookingMessage(b: Booking = {}): string {
  const { checkIn, checkOut, adults = 2, children = 0, room, name, note } = b;
  const nights = nightsBetween(checkIn, checkOut);
  const lines = [`Hi ${site.name}, I'd like to book a room directly.`, ""];

  lines.push(`Room: ${room ?? "No preference"}`);
  if (fmt(checkIn)) lines.push(`Check-in: ${fmt(checkIn)}`);
  if (fmt(checkOut)) lines.push(`Check-out: ${fmt(checkOut)}${nights > 0 ? ` (${plural(nights, "night", "nights")})` : ""}`);
  lines.push(`Guests: ${plural(adults, "adult", "adults")}${children ? `, ${plural(children, "child", "children")}` : ""}`);
  if (name?.trim()) lines.push(`Name: ${name.trim()}`);
  if (note?.trim()) lines.push(`Note: ${note.trim()}`);
  lines.push("", "Is it available, and what is your direct rate?");
  return lines.join("\n");
}

/** What the guest is asking about. Booking fields present → a booking message. */
export type EnquiryContext = Booking & { intent?: string; extra?: string };

const opener: Record<string, string> = {
  stay: "I'd like to ask about a room.",
  table: "I'd like to reserve a table at the restaurant.",
  cab: "I'd like to arrange a cab",
  hamper: "I'd like to order a chocolate hamper:",
  general: "I have a question.",
};

export function enquiryMessage(ctx: EnquiryContext = {}): string {
  const { intent = "general", extra, ...booking } = ctx;
  if (Object.values(booking).some((v) => v !== undefined && v !== "")) return bookingMessage(booking);
  const line = opener[intent] ?? opener.general;
  return `Hi ${site.name}, ${line}${extra ? ` ${extra}` : ""}`.trim();
}

export const whatsappHref = (ctx: string | EnquiryContext = {}) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(typeof ctx === "string" ? ctx : enquiryMessage(ctx))}`;

export const bookingHref = (b: Booking = {}) => whatsappHref(bookingMessage(b));

export const generalHref = whatsappHref(`Hi ${site.name}, I have a question.`);

export const telHref = `tel:${site.phone}`;
