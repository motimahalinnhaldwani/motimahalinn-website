"use client";

import { useEffect, useId, useState } from "react";
import { bookDirect } from "@/content/site";
import { rooms } from "@/content/rooms";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * §8.5 — no PMS yet, so this does not pretend to confirm instantly.
 * It sends the enquiry and says exactly what happens next.
 *
 * §7 — real labels, autocomplete attributes, inline validation announced by
 * aria-live, errors described in words rather than colour.
 */

type Status = "idle" | "sending" | "sent" | "error";

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export default function EnquiryForm({
  defaults,
  compact = false,
}: {
  defaults?: { checkIn?: string; checkOut?: string; adults?: number; room?: string };
  compact?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const [minDate, setMinDate] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    /* Prerendered pages must not bake in a build-time date. */
    checkIn: defaults?.checkIn ?? "",
    checkOut: defaults?.checkOut ?? "",
    adults: defaults?.adults ?? 2,
    children: 0,
    room: defaults?.room ?? rooms[0].slug,
    notes: "",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    setMinDate(today(0));
    setForm((f) => ({
      ...f,
      checkIn: f.checkIn || today(0),
      checkOut: f.checkOut || today(1),
    }));
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please tell us your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim()))
      e.phone = "Please give a phone number we can reach you on.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "That email address does not look complete.";
    if (form.checkOut <= form.checkIn)
      e.checkOut = "Check-out needs to be after check-in.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      setMessage("Some details need a look before we can send this.");
      return;
    }
    setStatus("sending");
    setMessage("Sending your enquiry.");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      setMessage(
        `Thank you. We have your enquiry and will confirm ${bookDirect.confirmWindow}.`,
      );
    } catch {
      setStatus("error");
      setMessage(
        "That did not send. Please use WhatsApp or the phone number below — both reach the same desk.",
      );
    }
  };

  const field =
    "w-full rounded-sm border border-brass/25 bg-ink/60 px-3 py-2.5 text-sm text-rice placeholder:text-mist/65";
  const labelCls = "text-[0.625rem] uppercase tracking-[0.18em] text-mist/65";

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-brass/30 bg-ink/60 p-8" role="status">
        <p className="font-display text-3xl text-brass">Sent.</p>
        <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-mist/80">{message}</p>
        <p className="mt-4 text-[0.8125rem] text-mist/65">
          If it is urgent, or you are already on the road,{" "}
          <a
            href={whatsappHref({ intent: "stay" })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline underline-offset-4"
          >
            message us on WhatsApp
          </a>{" "}
          and someone will answer.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-sm border border-brass/25 bg-ink/50 p-6 sm:p-8"
      aria-describedby={`${id}-status`}
    >
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-name`} className={labelCls}>
            Your name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={field}
            required
          />
          {errors.name ? (
            <p id={`${id}-name-err`} className="text-[0.75rem] text-geru">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-phone`} className={labelCls}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            className={field}
            required
          />
          {errors.phone ? (
            <p id={`${id}-phone-err`} className="text-[0.75rem] text-geru">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor={`${id}-email`} className={labelCls}>
            Email <span className="normal-case tracking-normal text-mist/65">(optional)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={field}
          />
          {errors.email ? (
            <p id={`${id}-email-err`} className="text-[0.75rem] text-geru">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-in`} className={labelCls}>
            Check in
          </label>
          <input
            id={`${id}-in`}
            type="date"
            min={minDate}
            value={form.checkIn}
            onChange={(e) => set("checkIn", e.target.value)}
            className={`${field} tnum`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-out`} className={labelCls}>
            Check out
          </label>
          <input
            id={`${id}-out`}
            type="date"
            min={form.checkIn}
            value={form.checkOut}
            onChange={(e) => set("checkOut", e.target.value)}
            aria-invalid={!!errors.checkOut}
            aria-describedby={errors.checkOut ? `${id}-out-err` : undefined}
            className={`${field} tnum`}
          />
          {errors.checkOut ? (
            <p id={`${id}-out-err`} className="text-[0.75rem] text-geru">
              {errors.checkOut}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-room`} className={labelCls}>
            Room
          </label>
          <select
            id={`${id}-room`}
            value={form.room}
            onChange={(e) => set("room", e.target.value)}
            className={field}
          >
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name} · {r.sqft} sq ft · from ₹{r.from}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-adults`} className={labelCls}>
              Adults
            </label>
            <select
              id={`${id}-adults`}
              value={form.adults}
              onChange={(e) => set("adults", Number(e.target.value))}
              className={field}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-children`} className={labelCls}>
              Children
            </label>
            <select
              id={`${id}-children`}
              value={form.children}
              onChange={(e) => set("children", Number(e.target.value))}
              className={field}
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor={`${id}-notes`} className={labelCls}>
            Anything we should know
          </label>
          <textarea
            id={`${id}-notes`}
            rows={compact ? 2 : 3}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Arriving late off the Kathgodam train, leaving at 5:30 for Kainchi, a quiet room at the back — all useful."
            className={field}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-sm bg-brass px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-haldu disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a
          href={whatsappHref({
            room: rooms.find((r) => r.slug === form.room)?.name,
            checkIn: form.checkIn,
            checkOut: form.checkOut,
            adults: form.adults,
            children: form.children,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm border border-brass/40 px-5 py-3 text-[0.8125rem] uppercase tracking-[0.14em] text-rice transition-colors hover:bg-brass/10"
        >
          Or send it on WhatsApp
        </a>
      </div>

      <p
        id={`${id}-status`}
        aria-live="polite"
        className="mt-4 text-[0.8125rem] text-mist/65"
      >
        {message || `We confirm ${bookDirect.confirmWindow}. A real person, not an automatic email.`}
      </p>
    </form>
  );
}
