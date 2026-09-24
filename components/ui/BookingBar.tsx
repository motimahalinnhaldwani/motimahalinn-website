"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useUI } from "@/lib/store";
import { whatsappHref } from "@/lib/whatsapp";
import { rooms } from "@/content/rooms";

/**
 * §8.1 — after the hero, a slim bar docks with dates, guests and
 * "Check availability". It never covers content on mobile; there it collapses
 * to a single button that opens the same fields in a sheet.
 */

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export default function BookingBar() {
  const pastHero = useUI((s) => s.pastHero);
  const router = useRouter();
  const id = useId();

  const [open, setOpen] = useState(false);
  /* Empty on the first render. These pages are prerendered, so a date computed
     during render would be the build date, not the visitor's. */
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(today(0));
    setCheckIn((v) => v || today(0));
    setCheckOut((v) => v || today(1));
  }, []);
  const [adults, setAdults] = useState(2);
  const [room, setRoom] = useState(rooms[0].slug);

  const params = new URLSearchParams({
    in: checkIn,
    out: checkOut,
    adults: String(adults),
    room,
  }).toString();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/book?${params}`);
  };

  const fields = (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-in`} className="text-[0.625rem] uppercase tracking-[0.18em] text-mist/65">
          Check in
        </label>
        <input
          id={`${id}-in`}
          type="date"
          name="checkin"
          value={checkIn}
          min={minDate}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (e.target.value >= checkOut) {
              const d = new Date(e.target.value);
              d.setDate(d.getDate() + 1);
              setCheckOut(d.toISOString().slice(0, 10));
            }
          }}
          className="tnum w-full rounded-sm border border-brass/25 bg-ink/70 px-3 py-2 text-sm text-rice"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-out`} className="text-[0.625rem] uppercase tracking-[0.18em] text-mist/65">
          Check out
        </label>
        <input
          id={`${id}-out`}
          type="date"
          name="checkout"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className="tnum w-full rounded-sm border border-brass/25 bg-ink/70 px-3 py-2 text-sm text-rice"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-adults`} className="text-[0.625rem] uppercase tracking-[0.18em] text-mist/65">
          Guests
        </label>
        <select
          id={`${id}-adults`}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="w-full rounded-sm border border-brass/25 bg-ink/70 px-3 py-2 text-sm text-rice"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${id}-room`} className="text-[0.625rem] uppercase tracking-[0.18em] text-mist/65">
          Room
        </label>
        <select
          id={`${id}-room`}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full rounded-sm border border-brass/25 bg-ink/70 px-3 py-2 text-sm text-rice"
        >
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name} · {r.sqft} sq ft
            </option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop — a slim docked bar */}
      <form
        onSubmit={submit}
        aria-label="Check availability"
        data-docked={pastHero}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden translate-y-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[docked=true]:pointer-events-auto data-[docked=true]:translate-y-0 data-[docked=true]:opacity-100 lg:block"
      >
        <div className="shell pb-5">
          <div className="flex items-end gap-4 rounded-sm border border-brass/30 bg-ink-soft/95 p-4 shadow-[0_-8px_40px_rgba(0,0,0,0.45)]">
            <div className="grid flex-1 grid-cols-4 gap-4">{fields}</div>
            <button
              type="submit"
              className="rounded-sm bg-brass px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-haldu"
            >
              Check availability
            </button>
            <a
              href={whatsappHref({
                room: rooms.find((r) => r.slug === room)?.name,
                checkIn,
                checkOut,
                adults,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-brass/40 px-5 py-2.5 text-[0.8125rem] uppercase tracking-[0.14em] text-rice transition-colors hover:bg-brass/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </form>

      {/* Mobile — one button, and a sheet. Content is never covered. */}
      <div
        data-docked={pastHero}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 translate-y-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[docked=true]:pointer-events-auto data-[docked=true]:translate-y-0 data-[docked=true]:opacity-100 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {open ? (
          <form
            onSubmit={submit}
            aria-label="Check availability"
            className="border-t border-brass/30 bg-ink-soft/98 p-4"
          >
            <div className="grid grid-cols-2 gap-3">{fields}</div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-sm bg-brass px-4 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink"
              >
                Check availability
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm border border-brass/30 px-4 py-3 text-[0.8125rem] uppercase tracking-[0.14em] text-rice/80"
              >
                Close
              </button>
            </div>
          </form>
        ) : (
          <div className="flex gap-2 p-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              className="flex-1 rounded-sm bg-brass px-4 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink shadow-lg"
            >
              Check availability
            </button>
            <a
              href={whatsappHref({ adults, checkIn, checkOut })}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-brass/40 bg-ink-soft/95 px-4 py-3 text-[0.8125rem] uppercase tracking-[0.14em] text-rice"
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
