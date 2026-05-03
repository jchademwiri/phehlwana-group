# Build Now Checklist — No Client Content Required

Everything below can be built today using copy already in `docs/content/` and images already in `public/`.
Items marked ⚠️ will use placeholder images — swap them when the client delivers real photos.

---

## Shared Components (build these first — everything else depends on them)

- [ ] **`PageHeader.astro`** — reusable interior page header (title, subtitle, breadcrumb)
- [ ] **`ContactCTA.astro`** — reusable bottom CTA strip (used on every page)
- [ ] **`StatsBar.astro`** — 4 animated counters (129+ projects, 20+ awards, 50+ staff, 10+ years)

---

## Home Page (`/`)

- [ ] **Hero section** — 3-slide carousel, all copy ready in `docs/content/home.md` ⚠️ placeholder images
- [ ] **About snapshot** — company description, vision, mission, 3 values, "Learn More" CTA ✅ copy ready
- [ ] **Stats counters** — 129+, 20+, 50+, 10+ ✅ copy ready
- [ ] **Services grid** — 5 service cards with summaries and links ⚠️ 4 of 5 images exist (no Security image)
- [ ] **Trust strip** — OHS Act, 10+ years, 129+ projects (skip CIDB/BBBEE until client confirms)
- [ ] **Featured projects strip** — pull 2 featured projects from content collection ✅ data exists
- [ ] **Contact CTA** — reuse `ContactCTA.astro` ✅ no content needed

---

## About Page (`/about`)

- [ ] **Page header** — "About Us / Building South Africa since 2015" ✅ copy ready
- [ ] **Company overview** — 2 paragraphs ✅ copy ready
- [ ] **Vision, Mission & Values** — all 6 values ✅ copy ready
- [ ] **Our Story** — 3 paragraphs ✅ copy ready (placeholder note for client to personalise)
- [ ] **Stats section** — reuse `StatsBar.astro` ✅ ready
- [ ] **Why Choose Us** — 8 differentiators ✅ copy ready
- [ ] **Accreditations** — OHS Act + NEM:WA confirmed; CIDB/BBBEE show as "pending" ✅ partial
- [ ] **Team preview** — skip or show "Coming Soon" card (no headshots yet) ⚠️ blocked on photos
- [ ] **Contact CTA** — reuse `ContactCTA.astro`

---

## Services Overview (`/services`)

- [ ] **Page header** — "Our Services" ✅ copy ready
- [ ] **Intro copy** ✅ ready in `docs/content/services.md`
- [ ] **5 service cards** — title, summary, image, "Read More" link ⚠️ 4 images exist, Security missing
- [ ] **How We Work** — 5-step process ✅ copy ready
- [ ] **Safety commitment** — OHS Act section ✅ copy ready
- [ ] **Contact CTA** — reuse `ContactCTA.astro`

---

## Individual Service Pages (all 5)

All copy is in `docs/content/services.md`. Images are placeholders for now.

- [ ] **`/services/construction`** — General Building + Road Construction sections ✅ copy ready ⚠️ image
- [ ] **`/services/mechanical`** — 6 service sections ✅ copy ready ⚠️ image
- [ ] **`/services/cleaning`** — Cleaning + Waste Management sections ✅ copy ready ⚠️ image
- [ ] **`/services/plant-hire`** — Equipment table + How to Hire ✅ copy ready ⚠️ image
- [ ] **`/services/security`** — 6 service sections ✅ copy ready ⚠️ no image yet

---

## FAQ Page (`/faq`) — new page

- [ ] **Create `src/pages/faq.astro`** — full FAQ with accordion ✅ all copy ready in `docs/content/faq.md`
  - 6 categories: General, Quotes, Construction, Plant Hire, Cleaning, Safety, Security
  - TODOs shown inline for client to fill in (CIDB, BBBEE, hire periods, etc.)
- [ ] **Add FAQ to footer quick links** in `navigation.ts`

---

## SEO Groundwork (Phase 7 prep — no content needed)

- [ ] **Open Graph tags** — add to `Layout.astro` (title, description, url, locale)
- [ ] **Twitter Card tags** — add to `Layout.astro`
- [ ] **JSON-LD LocalBusiness schema** — add to `Layout.astro` (address, phone, services)
- [ ] **OG image fallback** — use `public/images/placeholder.svg` until real OG image is made

---

## Suggested Build Order

1. `PageHeader.astro` + `ContactCTA.astro` + `StatsBar.astro`
2. Home page (highest impact — first thing visitors see)
3. About page
4. Services overview + all 5 individual service pages
5. FAQ page
6. SEO groundwork

---

## What's Actually Blocked (needs client before touching)

| Item | Blocked on |
|---|---|
| Real hero photography | Client photos |
| Team section on About | Headshots + bios |
| CIDB / BBBEE credentials | Client documents |
| Awards section | Client list |
| Social media links | Client URLs |
| Security service image | Client photo |
| Stats verification | Client confirmation |
| Testimonials | Client quotes |
