# Moti Mahal Inn — Haldwani

> A three-star hotel on Nainital Road — 300 m from the bus station, 1 km from the
> railway station, with its own restaurant a short walk down the road — built so a tired traveller on a slow phone can ask for a
> room in under thirty seconds, straight to the front desk.

---

## What is in this folder

| Folder / file | What it is |
|---|---|
| `site/` | **The finished website as plain files** (`index.html`, CSS, JS, photos). Upload or copy this folder to any web host. Not uploaded to GitHub. |
| `app/` | One folder per page (`app/page.tsx` is the home page, `app/rooms/` the rooms…). |
| `components/` | The building blocks the pages are made of (hero, nav, footer, room cards…). |
| `content/` | The words and facts: phone number, rooms, photos list, menu. Most edits happen here. |
| `lib/` | Small helpers (WhatsApp message, kitchen hours, SEO data). |
| `public/` | Fonts and photos, served as-is. |
| `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs` | Settings Vercel needs to build the site. Leave them in place. |

There is no `index.html` at the top level on purpose: the pages are written in
`app/` and turned into HTML by the build. `site/index.html` is the result.

## Publishing (Vercel, linked to GitHub)

Vercel builds the site from the source every time GitHub changes. So:

1. Open the folder in **GitHub Desktop** (or use `git`), commit, and **Push**.
2. Vercel picks it up and publishes in about a minute.

Do **not** use GitHub's "Add files via upload" button for updates. It only adds
files, it never removes old ones, so leftovers from earlier versions pile up
and break or change the build. A push keeps GitHub identical to this folder.

Never upload `node_modules/`, `.next/` or `out/` — they are made by the build
and are listed in `.gitignore` so git skips them.

## Rebuilding `site/` yourself (optional)

```bash
npm install
npm run dev          # preview at http://localhost:3000
npm run build        # writes the plain-HTML site to out/ — copy it to site/
```

Node 20+. No environment variables are needed. The pages use root paths
(`/rooms`, `/_next/...`), so open `site/` through a web host or a local server,
not by double-clicking `index.html`.

---

## Booking — direct, no commission

There is no booking engine and no payment. Every "check availability" and "book"
button builds a WhatsApp message to the front desk (dates, nights, room, guests,
name, note) and opens it ready to send; the desk replies with the room and the
rate. The other route is a phone call. Both read one number:

- **`content/site.ts` → `PHONE` / `WHATSAPP`** — `+91 63973 59584`. WhatsApp must
  be active on this number (WhatsApp Business is best: quick replies, labels,
  an away message for the night).
- The message is built in `lib/whatsapp.ts` (`bookingMessage`).
- Keep the Goibibo / MakeMyTrip / ixigo listings for reach, but when a direct
  booking is confirmed, close that date on the OTA extranets (or use a channel
  manager) so the same room cannot be sold twice.

The restaurant (a separate building, down the same road) is **not** orderable from
the site — menu, hours (kitchen 8:00 a.m.–10:45 p.m.) and a live open/closed status only (`lib/kitchen.ts`, times in IST).

## Palette

Light, taken from the building: off-white ground (`--color-ink`, the page),
charcoal text (`--color-rice`), deep antique gold for text (`--color-brass`),
bright gold and warm yellow for fills and glow (`--color-gold`, `--color-haldu`),
burnt orange as the accent (`--color-geru`). The token names are older than the
light theme, so read them as roles, not colours. Anything inside `.dark-panel`
(footer, the gateway map, the WhatsApp preview) gets the charcoal-and-gold set.
The amenities band under the hero reads `amenities` in `content/site.ts`.

## Before launch

- **Prices** — the site shows no room prices on purpose; every room says "Drop an
  enquiry for today's price" and sends people to WhatsApp or the phone.
- **Photography** — see below.
- **Reviews** — `content/reviews.ts` is empty on purpose. Add real guest quotes
  (with permission) and the section appears.
- **Direct rates** — the site promises a direct rate lower than the booking
  sites (hero, the "Book direct. Pay less." section, rooms, booking page). Keep
  the OTA rates above the direct rate so that stays true.

---

## Photography

Four photographs were supplied and are in `public/photos`. They are OTA
thumbnails — 300×200 to 516×387 — so they are used at sizes their resolution
actually supports, in captioned cards, and never stretched across a hero. The
site's whole argument is that its photographs match the rooms; a blown-up
thumbnail would lose that argument on the first screen.

Two supplied images were **not** used:

- A European hotel room with damask wallpaper and a French casement window. It
  is not this property.
- A storefront reading *Bittoo's Moti Mahal Restaurant*. That is a different
  business with a similar name — exactly the ownership confusion the brief warns
  about in §1. Using it would claim a restaurant this hotel may not run.

Every image slot on the site is declared in **`content/images.ts`**. A slot with
`src: null` renders a generated, on-palette stand-in carrying its own shot brief
— deliberately not a photograph, so it cannot be mistaken for one or quietly
survive to launch. `/gallery` lists every outstanding frame as a shot list.

To place a real photograph: drop the file in `public/photos`, then set `src`,
`width`, `height` and write `alt` for a human. Nothing else changes.

---

## How it is put together

### Motion without jank

All motion is CSS: transitions fired once by an `IntersectionObserver`
(`lib/useInView.ts`), and scroll-driven animations (`animation-timeline: view()`)
for the stacked room cards and the thali, behind `@supports` so browsers without
them get the finished state. No GSAP, no Lenis, no animation library. Rules kept:
animate only `transform`/`opacity` (or the individual `translate`/`rotate`/`scale`
properties), never write custom properties to `:root`, pause looping animations
when their section is off-screen (`.loops.is-offscreen`), no full-screen
`mix-blend-mode` or `backdrop-filter`.

### Scrolling costs nothing (§5.1)

The first build of this site ran at **12fps** on a desktop and 5fps on a
throttled one. It now holds **60fps**, and 30fps with the CPU throttled 4x.
Four things were wrong, found by measurement rather than guesswork — the notes
are here because each one is an easy mistake to make again.

**1. Custom properties on `:root`, written every frame.** The scroll progress
and the ground tint were set on the document element. A custom property set
there invalidates the computed style of every node that could reference it,
which is all of them. Measured: **5.9 seconds of style recalculation** for a
single scroll of the home page. The same values written to the leaf elements
that actually use them cost 0.2s. Never animate a custom property on `:root`.

**2. Smooth scroll.** Lenis, with GSAP's ticker driving it and ScrollTrigger
updating on every Lenis frame, halved the frame rate on its own. The browser
already scrolls on the compositor, perfectly. Smoothing that costs 30fps is not
smooth, so it is gone, along with the dependency.

**3. Sixty ScrollTriggers for animations that happen once.** Every reveal, every
aipan threshold, every amenity icon had its own scrubbed tween recomputing each
frame, forever, for a thing that plays once on arrival. They are now one
`IntersectionObserver` (`lib/useInView.ts`) and a CSS transition. The last three
scroll-scrubbed pieces moved to CSS scroll timelines, and GSAP was removed.

**4. Two full-screen effects reading the backdrop.** The film grain
(`mix-blend-mode`) and the nav's `backdrop-filter` each forced the compositor to
re-read the whole viewport every frame — and removing either one alone changed
nothing, because the other still did it. The grain is now a background layer of
`.ground` blended with `background-blend-mode`, which is free; the nav uses a
scrim. The panels that had `backdrop-blur` were 92–98% opaque, so the blur
behind them was never visible anyway.

What survives is one `scroll` listener, throttled to one rAF, writing exactly
one property to one element (the Gaula progress line).

The plains-to-hills axis (§2.2) needed no JavaScript at all in the end. The
tint is a function of scroll position, and scroll position is just position in
the document, so `.ground` and `.fog` are gradients the height of the page.
They paint once and scroll with everything else.

The home page is **140 kB** first-load JS against the 180 kB budget.

### The line splitter (§5.3)

Blocks are split when they come near the viewport, not on load, and the markup
is **restored as soon as the animation ends**. A line mask is an overflow:hidden
box around a promoted layer; leaving fifty of them alive for the life of the
page makes every later frame more expensive. A per-element failsafe reveals the
text regardless if the observer never fires, because text must never be
stranded invisible.

`lib/split.ts` splits headings into `.line-mask > .line-inner` pairs on
whitespace only — never on characters, because Devanagari is written in grapheme
clusters that a character split shatters. Inline elements that straddle a line
break are cloned into both lines rather than dropped, and genuine word spacing
is preserved exactly (React renders `#{n}` as two adjacent text nodes; joining
every pair of words with a space would produce "# 14").

`npm run verify:text` guards this by loading every page twice — once with
JavaScript disabled — and comparing the text of every revealed block.

### Tiering (§6)

`lib/tier.ts` detects once and caches in `sessionStorage`. Tier C (reduced
motion, save-data) gets no cursor, no parallax and no loops; reduced motion gets
every animation at its end state. It is a complete, dignified site, not
a degraded one.

### Where the inn sits (the gateway map)

`components/sections/Gateway.tsx`, straight after the hero: a night map, north
up, with the roads drawing out of the inn to Bhimtal, Nainital, Kainchi Dham,
Jim Corbett, Mukteshwar, Almora and Pantnagar airport, headlights climbing them,
and an arrivals board (bus stand, Haldwani and Kathgodam stations, airport) that
flips its digits in. Distances live in `content/site.ts` (`places`, `distances`)
— change a number there and the map, the board and Find Us all follow. The map
is stylised and says so; the land is one SVG painted once, the roads and lights
sit on their own layer so the moving lights never repaint it.

### Small things that move

- Page change: the page fades out, a brass hairline runs along the top, the new
  page rises in (`components/motion/PageTransition.tsx`, `html[data-route]`).
- Brass buttons catch a sheen on hover; the hero's does it every few seconds.
- Room photographs develop from sepia as their card arrives.
- The WhatsApp preview shows the desk "typing" before the message appears.

### The hero

`components/sections/Hero.tsx` + the `.hs-*` rules in `app/globals.css`: the
real photograph of the building (`public/photos/hotel-exterior.jpg`). On a
desktop it fills the screen and holds (sticky) for one extra screen of scroll:
the copy card steps aside, the camera pushes in on the hotel, the street around
it sinks to charcoal while the hotel stays lit, and pins rise on the rooms,
reception and parking. On a phone the same plays as the photo scrolls past.
It is CSS scroll-driven animation of transform and opacity only, so it runs
on the compositor; the only script is a pointer light on desktop.

The dimmed street is not drawn live: `hotel-exterior-lit.jpg` is the same
photo with the surroundings already sunk to charcoal, and scroll fades it in
over the original. (The first version darkened the street with a huge soft
box-shadow inside the zooming layer, which made the GPU re-rasterise a
several-thousand-pixel texture as it scaled. That was the scroll lag.)
Keep keyframes free of custom properties and discrete properties such as
`pointer-events`, or Chrome moves the animation back to the main thread.

The pins are placed in percentages of the photo (the zoom layer keeps the
photo's 1672 × 941 shape), so a new photo means new pin positions in `pins`
in Hero.tsx and a new `-lit` version of it.

---

## Notes from testing

Reveals are hidden with `opacity`, never `visibility: hidden` — the latter
takes an element out of the accessibility tree, which silently dropped every
below-the-fold heading from the screen-reader outline.

Contrast was set from measured ratios rather than by eye: muted text on `--ink`
clears 4.5:1 at 65% `--mist`, brass needs 90%, and cocoa-soft on cream needs 90%.

---

## Not built

- 360° room panoramas.
- The `/hi` route with human-translated copy, `next/og` images, and Lighthouse
  on a real budget Android.

## Assets still to collect

`/gallery` is the live version of this list. In short: rooms at 6 a.m. and 9 p.m.,
a 360° capture of one Deluxe and one Premier, exterior and lobby, 15–20 plated
dishes, current menus with prices, staff photographs with names, the logo in
vector, the family story, and written permission to quote guests.
