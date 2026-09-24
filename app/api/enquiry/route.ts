import { NextResponse } from "next/server";

/**
 * §8.5 — the owner has no PMS yet, so this does not pretend to confirm a
 * booking. It takes the enquiry, records it, and the desk answers.
 *
 * Wire either of these up before launch and the route needs no other changes:
 *   ENQUIRY_WEBHOOK_URL — a Google Apps Script / Sheet endpoint
 * With nothing set the enquiry is logged and the response still succeeds, so
 * the guest is never shown a failure caused by a missing key.
 */

export const runtime = "nodejs";

type Enquiry = {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: string;
  notes?: string;
};

function clean(v: unknown, max = 400) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Partial<Enquiry>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const enquiry: Enquiry = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    checkIn: clean(body.checkIn, 10),
    checkOut: clean(body.checkOut, 10),
    adults: Math.min(8, Math.max(1, Number(body.adults) || 1)),
    children: Math.min(6, Math.max(0, Number(body.children) || 0)),
    room: clean(body.room, 40),
    notes: clean(body.notes, 1200),
  };

  if (enquiry.name.length < 2 || enquiry.phone.length < 8) {
    return NextResponse.json(
      { ok: false, error: "A name and a reachable phone number are needed." },
      { status: 422 },
    );
  }

  const received = new Date().toISOString();

  try {
    const hook = process.env.ENQUIRY_WEBHOOK_URL;
    if (hook) {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiry, received }),
      });
    } else {
      console.info("[enquiry]", JSON.stringify({ ...enquiry, received }));
    }
  } catch (err) {
    /* The guest has done their part. Never show them our plumbing. */
    console.error("[enquiry] delivery failed", err);
  }

  return NextResponse.json({ ok: true, received });
}
