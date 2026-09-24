"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { bookingMessage, nightsBetween, whatsappHref } from "@/lib/whatsapp";
import { WhatsAppGlyph, CallButton } from "./WhatsAppCTA";
import { rooms } from "@/content/rooms";
import { site } from "@/content/site";
import { useInView } from "@/lib/useInView";

/**
 * Direct booking without a booking engine.
 *
 * The guest picks dates, guests and a room; the message they are about to send
 * is written out live beside the form; one tap opens WhatsApp with it ready.
 * Nothing is submitted to this site and nothing is sent until the guest presses
 * send in WhatsApp — the front desk confirms availability and the rate.
 */

function isoDay(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function BookingComposer({ room: initialRoom }: { room?: string }) {
  const id = useId();
  const bubble = useRef<HTMLDivElement>(null);
  const win = useInView<HTMLDivElement>({ rootMargin: "0px 0px -20% 0px" });

  /* Empty on the server; filled on mount. A prerendered page would otherwise
     bake in the build date. */
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(initialRoom ?? "any");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setToday(isoDay(0));
    setCheckIn((v) => v || isoDay(0));
    setCheckOut((v) => v || isoDay(1));
    /* A link like /book?room=premier preselects that room. Read in the
       browser, so the page can be plain static HTML. */
    const want = new URLSearchParams(window.location.search).get("room");
    if (!initialRoom && want && rooms.some((r) => r.slug === want)) setRoom(want);
  }, [initialRoom]);

  const chosen = rooms.find((r) => r.slug === room);
  const nights = nightsBetween(checkIn, checkOut);
  const invalid = Boolean(checkIn && checkOut && nights <= 0);

  const message = useMemo(
    () =>
      bookingMessage({
        checkIn,
        checkOut,
        adults,
        children,
        room: chosen ? `${chosen.name} (${chosen.sqft} sq ft)` : undefined,
        name,
        note,
      }),
    [checkIn, checkOut, adults, children, chosen, name, note],
  );

  useEffect(() => {
    const el = bubble.current;
    if (!el) return;
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }, [message]);

  const field =
    "w-full rounded-sm border border-brass/25 bg-ink/60 px-3 py-2.5 text-sm text-rice placeholder:text-mist/60";
  const label = "text-[0.625rem] uppercase tracking-[0.18em] text-mist/70";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
      <form
        className="stay-card rounded-sm border border-brass/25 bg-ink-soft/80 p-6 sm:p-8"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby={`${id}-hint`}
      >
        <p className="eyebrow">Your stay</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-in`} className={label}>Check in</label>
            <input id={`${id}-in`} type="date" min={today} value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)} className={`${field} tnum`} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-out`} className={label}>Check out</label>
            <input id={`${id}-out`} type="date" min={checkIn || today} value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)} className={`${field} tnum`}
              aria-invalid={invalid} aria-describedby={invalid ? `${id}-err` : undefined} />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor={`${id}-room`} className={label}>Room</label>
            <select id={`${id}-room`} value={room} onChange={(e) => setRoom(e.target.value)} className={field}>
              <option value="any">No preference — whatever suits</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} · {r.sqft} sq ft · sleeps {r.sleeps}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-adults`} className={label}>Adults</label>
            <select id={`${id}-adults`} value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={field}>
              {[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-kids`} className={label}>Children</label>
            <select id={`${id}-kids`} value={children} onChange={(e) => setChildren(Number(e.target.value))} className={field}>
              {[0, 1, 2, 3].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor={`${id}-name`} className={label}>
              Your name <span className="normal-case tracking-normal text-mist/65">(optional)</span>
            </label>
            <input id={`${id}-name`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor={`${id}-note`} className={label}>
              Anything we should know <span className="normal-case tracking-normal text-mist/65">(optional)</span>
            </label>
            <textarea id={`${id}-note`} rows={2} value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Arriving late off the train, travelling with parents…" className={field} />
          </div>
        </div>

        {invalid ? (
          <p id={`${id}-err`} role="alert" className="mt-4 text-sm text-brass">
            Check-out needs to be at least a day after check-in.
          </p>
        ) : nights > 0 ? (
          <p className="mt-4 text-sm text-mist/70">
            <span className="tnum">{nights}</span> night{nights === 1 ? "" : "s"}
          </p>
        ) : null}
      </form>

      <div className="flex flex-col">
        <div ref={win} className="dark-panel wa-window flex-1 overflow-hidden rounded-sm border border-brass/25">
          <div className="flex items-center gap-3 border-b border-brass/20 bg-ink-soft px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brass/20 font-display text-brass" aria-hidden="true">M</span>
            <div className="leading-tight">
              <p className="text-sm text-rice">{site.name} · front desk</p>
              <p className="tnum text-[0.75rem] text-mist/70">{site.phoneDisplay}</p>
            </div>
          </div>
          <div className="wa-body px-4 py-6 sm:px-6">
            <p className="sr-only" id={`${id}-preview`}>Message preview:</p>
            <span className="wa-typing" aria-hidden="true"><span /><span /><span /></span>
            <div className="wa-arrive">
              <div ref={bubble} className="wa-bubble" aria-labelledby={`${id}-preview`} aria-live="polite">
                {message}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {invalid ? (
            <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2.5 rounded-sm bg-gold/40 px-5 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-charcoal/70">
              <WhatsAppGlyph /> Send on WhatsApp
            </button>
          ) : (
            <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" data-magnetic
              className="sheen inline-flex items-center gap-2.5 rounded-sm bg-gold px-5 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-haldu">
              <WhatsAppGlyph /> Send on WhatsApp
            </a>
          )}
          <CallButton label="Or call us" />
        </div>
        <p id={`${id}-hint`} className="mt-4 text-[0.8125rem] leading-relaxed text-mist/70">
          WhatsApp opens with this message ready — nothing is sent until you press send
          there. The front desk replies to confirm the room and the rate.
        </p>
      </div>
    </div>
  );
}
