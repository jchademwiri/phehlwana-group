# Phehlwana Group Investments — Development Plan

**Project:** Website Rebuild
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Stack:** Astro v6 · Starwind UI · Tailwind CSS v4 · Vanilla JS · Resend · @vercel/analytics
**Package Manager:** Bun
**Deployment:** Vercel
**Document Version:** 4.0 — May 2026
**Last Updated:** Reflects actual project state — Phases 0, 1, 5 (partial), and 6 complete

---

## Progress Overview

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Foundation & Config | ✅ Complete | |
| 1 | Shared Layout & Navigation | ✅ Complete | |
| 2 | Home Page | ⏳ Blocked | Awaiting client content |
| 3 | About Page | ⏳ Blocked | Awaiting client content |
| 4 | Services Pages | ⏳ Blocked | Awaiting client content |
| 5 | Projects Portfolio | ✅ Functional | 4 projects + blog live |
| 6 | Contact, Email & Utility | ✅ Functional | Needs Resend domain verification |
| 7 | SEO & Analytics | ⏳ Not started | |
| 8 | Performance & Accessibility | ⏳ Not started | |
| 9 | Pre-Launch & Go Live | ⏳ Not started | |

> **Content Blocker:** Phases 2–4 require real content from the client. Send the questionnaire (`docs/client-questionnaire.md`) and wait for responses before starting those phases.

---

## ✅ Phase 0 — Foundation & Config — COMPLETE

- [x] Astro v6 + Starwind UI initialised
- [x] `@astrojs/vercel` adapter installed
- [x] `@astrojs/sitemap` installed and configured
- [x] `@astrojs/react` installed (required for Resend email rendering)
- [x] `@vercel/analytics` installed and active in Layout
- [x] `output: 'static'` in `astro.config.mjs` (individual routes use `export const prerender = false` for SSR)
- [x] `site: 'https://phehlwanagroup.co.za'` set
- [x] All 19 Starwind components installed
- [x] `src/content.config.ts` — Astro v6 glob loader format (projects + blog)
- [x] `src/data/navigation.ts` — single source of truth for all nav links
- [x] `public/scripts/animations.js` — Intersection Observer scroll animations
- [x] `.env` + `.env.example` created
- [x] `public/robots.txt` created
- [x] All stub pages created and resolving (index, about, contact, thank-you, 404, 6 service pages)
- [x] `bun run build` — zero errors

---

## ✅ Phase 1 — Shared Layout & Navigation — COMPLETE

- [x] `src/layouts/Layout.astro` — root layout with dark mode, skip-to-content, analytics, animations
- [x] `src/components/shared/Header.astro`:
  - Glassmorphism sticky header (`bg-background/80 backdrop-blur-lg`)
  - Topbar: address, email, phone (desktop only)
  - Logo switches `logo.png` ↔ `logow.png` with theme
  - Services dropdown (click-to-open, Escape to close)
  - Mobile drawer with glassmorphism, Services accordion, focus management
  - Theme toggle in drawer footer (single instance — no duplicate ID bug)
- [x] `src/components/shared/Footer.astro` — 4-column, theme-aware, logo switches with theme
- [x] `src/data/navigation.ts` — 5 service divisions, Blog added to primary nav and footer
- [x] `src/pages/404.astro` — branded, animated, helpful links
- [x] `src/styles/starwind.css` — `@tailwindcss/typography` + `@tailwindcss/forms` plugins, prose overrides using CSS tokens, scroll animation CSS

---

## ✅ Phase 5 — Projects Portfolio & Blog — FUNCTIONAL

> Completed ahead of schedule using placeholder content. Real client content to replace when received.

### What was built

**Content collections:**
- 4 published project entries (Construction, Road, Cleaning, Plant Hire)
- 4 published blog posts (building maintenance, OHS Act, plant hire, waste management)
- Placeholder entries (draft, `published: false`) for both collections

**Project schema fields:** `title`, `projectNo`, `description`, `scopeOfWorks`, `client`, `location`, `duration`, `year`, `category`, `coverImage`, `images`, `featured`, `published`

**Blog schema fields:** `title`, `description`, `pubDate`, `author`, `coverImage`, `tags`, `published`

**Pages built:**
- `/projects` — filterable grid (category buttons, JS filter, featured-first sort)
- `/projects/[id]` — detail page with image gallery, thumbnail strip, description below images, sticky sidebar (Client → Project No. → Category → Location → Project Duration), CTA card
- `/blog` — card grid, newest first, full-card links
- `/blog/[id]` — article with sticky TOC sidebar, active heading highlight, copy link, reading time

**Placeholder image system:**
- `public/images/placeholder.svg` — branded SVG fallback
- `public/images/blog/*.svg` — 4 topic-specific branded SVG covers (no broken images)

**Typography:** `@tailwindcss/typography` installed, prose overrides in `starwind.css` use CSS design tokens for full light/dark compatibility.

### Remaining for Phase 5

- [ ] Replace placeholder project content with real client projects (min 6)
- [ ] Replace SVG blog covers with real photography
- [ ] Add Mechanical and Security category projects (services confirmed active, awaiting project photos)

---

## ✅ Phase 6 — Contact, Email & Utility — FUNCTIONAL

> Core functionality built. Blocked on Resend domain verification before emails can send.

### What was built

**`src/actions/index.ts`** — Astro Server Action:
- Zod validation: name (min 2), email (format), phone (SA 10-digit `^0[0-9]{9}$`), service (required), message (min 20)
- Notification email to `TO_EMAIL` with all field values and reply-to set
- Branded auto-reply to submitter
- Uses `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL` env vars

**`src/pages/contact.astro`** — full contact page (no `prerender = true`):
- Two-column layout: form + contact info sidebar
- Service dropdown pre-fills from `?service=` URL param (all service pages link here)
- Per-field inline validation errors with `aria-describedby`
- General error banner for Resend failures
- Redirects to `/thank-you` on success
- Contact sidebar: address (Google Maps link), two phone numbers, email, office hours
- WhatsApp CTA button
- Google Maps embed (constrained to `max-w-5xl`, rounded, bordered)
- FAQ accordion (5 questions, `aria-expanded`)

**`src/pages/thank-you.astro`** — confirmation page with CTAs.

### Before emails will work

1. Create Resend account at https://resend.com
2. Verify domain `info.phehlwanagroup.co.za` (add DKIM, SPF, DMARC DNS records)
3. Set real values in Vercel environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@info.phehlwanagroup.co.za
   TO_EMAIL=info@phehlwanagroup.co.za
   ```
4. Test form end-to-end on production

---

## ⏳ Phase 2 — Home Page — BLOCKED (awaiting client content)

**Branch:** `feature/home-page`

> Required from client before starting:
> - Hero photography (min 2, 1920×800px, WebP)
> - About Us copy
> - Confirmed stat numbers
> - Service photography (1 per service, 800×500px, WebP)
> - Brand colours (Grey and Blue confirmed, need hex codes or choose suitable ones)

### Tasks

#### 2.1 Apply Brand Colours

Update `src/styles/starwind.css` `:root` block. Use Starwind Theme Designer: https://pro.starwind.dev/tools/theme-designer/

```css
:root {
  --primary: var(--color-blue-700);  /* Replace with confirmed brand colour */
}
```

#### 2.2 Build Section Components in `src/components/sections/`

| Component | Content needed |
|---|---|
| `Hero.astro` | Hero photo, headline, subtext |
| `TrustBar.astro` | CIDB grade, BBBEE level, years, project count |
| `ServicesGrid.astro` | Service photos, descriptions |
| `StatsCounter.astro` | Confirmed numbers from client |
| `AboutSnapshot.astro` | Company copy, company photo |
| `WhyUs.astro` | 4 differentiators |
| `PortfolioGrid.astro` | 6 project photos (use content collection) |
| `Testimonials.astro` | Client quotes — skip if none available |
| `ContactCTA.astro` | No client content needed — can build now |

#### 2.3 Assemble `index.astro`

Replace stub with full home page importing all section components.

### ✅ Phase 2 Checkpoint

- [ ] All sections render at 375px, 768px, 1440px
- [ ] Hero image loads eagerly
- [ ] No placeholder images — all real WebP
- [ ] No lorem ipsum — all real client content
- [ ] `bun run build` — no errors
- [ ] Lighthouse Performance > 85

---

## ⏳ Phase 3 — About Page — BLOCKED (awaiting client content)

**Branch:** `feature/about-page`

> Required: company copy, team headshots + bios, CIDB/BBBEE credentials, vision/mission/values, company profile PDF.

### Tasks

#### 3.1 Build `PageHeader.astro`

Reusable page header for all interior pages. Props: `title`, `subtitle?`, `breadcrumbs`, `bgImage?`

#### 3.2 Build `about.astro`

Sections: PageHeader → Company Story → Vision/Mission/Values → Stats → Credentials → Team Grid → ContactCTA

### ✅ Phase 3 Checkpoint

- [ ] All copy is real — no lorem ipsum
- [ ] CIDB and BBBEE values match client credentials
- [ ] All PDF files exist in `public/docs/` and download correctly
- [ ] Page fully responsive

---

## ⏳ Phase 4 — Services Pages — BLOCKED (awaiting client content)

**Branch:** `feature/services`

> Required: service photography (1 per division, 800×500px, WebP), detailed service descriptions, Security division details.

### Tasks

#### 4.1 Build `ServiceLayout.astro`

Shared layout for all 5 individual service pages. Props: `title`, `description`, `heroImage`, `heroAlt`

#### 4.2 Build `services/index.astro` — Overview

5-card grid. Each card: photo, icon, title, description, "Learn More →" link.

#### 4.3 Build Individual Service Pages

Use `ServiceLayout` with Starwind `Accordion` for content groups.

| Page | Key sections |
|---|---|
| `construction.astro` | General Building, Road Construction & Safety |
| `mechanical.astro` | Design & Development, Maintenance, Commissioning |
| `cleaning.astro` | Cleaning Services, Waste Management |
| `plant-hire.astro` | Equipment grid (TLB, Tipper Trucks, Water Carts, Excavators, Bulldozers, Generators) |
| `security.astro` | Manned Guarding, Access Control, CCTV, Risk Assessment, Event Security, Site Security |

Each page CTA: `/contact?service=[Service+Name]`

#### 4.4 Re-add Service Sub-items to Navigation

Once service pages have real sectioned content with `id` anchors, add `items` arrays back to `serviceDivisions` in `navigation.ts` and update the Header dropdown to render them.

### ✅ Phase 4 Checkpoint

- [ ] All 6 service pages render without errors
- [ ] All "Request a Quote" CTAs pre-populate service in contact form
- [ ] Breadcrumbs correct: Home → Services → [Service Name]
- [ ] All images are real WebP files
- [ ] Security service image added to `public/images/services/`

---

## ⏳ Phase 7 — SEO & Analytics

**Branch:** `feature/seo-analytics`

### Tasks

- [ ] Add Open Graph + Twitter Card tags to `Layout.astro`
- [ ] Add JSON-LD LocalBusiness schema (include all 5 services)
- [ ] Install and configure GA4 via `@astrojs/partytown`
- [ ] Add event tracking script (`public/scripts/analytics.js`) — phone, email, WhatsApp, CTA, PDF clicks
- [ ] Verify `sitemap-index.xml` lists all pages after deploy
- [ ] Verify and submit to Google Search Console
- [ ] Create OG image (1200×630px) — can use the branded placeholder SVG as a starting point
- [ ] Update all page meta titles (50–60 chars) and descriptions (140–160 chars)

### ✅ Phase 7 Checkpoint

- [ ] All pages have unique title + description
- [ ] JSON-LD validates at https://validator.schema.org
- [ ] GA4 Realtime shows live traffic
- [ ] OG image renders at https://opengraph.xyz
- [ ] Google Search Console verified + sitemap submitted

---

## ⏳ Phase 8 — Performance & Accessibility

**Branch:** `feature/performance`

### Tasks

- [ ] Lighthouse audit on all pages (target: Performance > 85, Accessibility > 90, SEO = 100)
- [ ] Convert all placeholder images to WebP
- [ ] Hero image: `loading="eager"` + `<link rel="preload">`
- [ ] All other images: `loading="lazy"` + `alt` text
- [ ] Content sweep:
  ```bash
  grep -ri "lorem" src/
  grep -ri "coming soon" src/
  grep -ri "Phehlawana" src/   # Typo check
  grep -rn 'href="#"' src/     # Broken links (social links excepted)
  grep -rn 'alt=""' src/       # Missing alt text
  ```
- [ ] Cross-browser test: iOS Safari, Android Chrome, desktop Chrome + Firefox

### ✅ Phase 8 Checkpoint

- [ ] Lighthouse Performance > 85 on home page
- [ ] Lighthouse Accessibility > 90 on home page
- [ ] Zero axe DevTools critical errors
- [ ] All content sweep greps return zero results
- [ ] Passes visual check on iOS Safari and Android Chrome

---

## ⏳ Phase 9 — Pre-Launch & Go Live

**Branch:** `main`

### Tasks

1. Connect repo to Vercel (New Project → Import from GitHub, framework: Astro, build: `bun run build`, install: `bun install`)
2. Add all environment variables to Vercel (Production + Preview + Development)
3. Connect custom domain — DNS at registrar:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME`: `www` → `cname.vercel-dns.com`
4. Post-deploy verification:
   ```bash
   curl -I https://phehlwanagroup.co.za              # 200 OK + HTTPS
   curl -I http://phehlwanagroup.co.za               # 301 → HTTPS
   curl -I https://www.phehlwanagroup.co.za          # 301 → apex
   curl -I https://phehlwanagroup.co.za/sitemap-index.xml
   curl -I https://phehlwanagroup.co.za/robots.txt
   curl -I https://phehlwanagroup.co.za/unknown-page  # 404 branded
   ```
5. Final form test on production — verify both emails deliver
6. Client handover: GA4, Search Console, Vercel, Resend access + handover document

### ✅ Phase 9 Checkpoint

- [ ] `https://phehlwanagroup.co.za` loads with valid SSL
- [ ] `http://` redirects to `https://`
- [ ] `www.` redirects to apex
- [ ] Contact form works on production — both emails delivered
- [ ] GA4 Realtime shows production traffic
- [ ] Sitemap submitted to Search Console
- [ ] Client has access to all platforms
- [ ] Handover document delivered

---

## Content Dependency Tracker

| Item | Needed For | Status |
|---|---|---|
| Logo — colour PNG, white PNG, SVG | All phases | ⚠️ Placeholder in use |
| Brand colour hex codes | Phase 2 | ✅ Grey and Blue confirmed, can proceed with approximations |
| Hero photography ×2 (1920×800px, WebP) | Phase 2 | ❌ Not received (Unorganized) |
| About Us copy | Phase 2, 3 | ✅ Will curate from existing content |
| Service photography ×5 incl. Security (800×500px, WebP) | Phase 2, 4 | ❌ Not received |
| Confirmed stat numbers | Phase 2, 3 | ✅ Confirmed (0 awards, 10 employees, prefer no project #) |
| Client testimonials ×2–3 | Phase 2 | ❌ Need assistance gathering |
| CIDB registration number + grading | Phase 2, 3 | ⚠️ Grading 4CE, 5GB confirmed, need registration # |
| BBBEE level + certificate PDF | Phase 2, 3 | ⚠️ Level 1 confirmed, need PDF |
| Company Profile PDF | Phase 3 | ❌ Not received |
| Team headshots + bios | Phase 3 | ❌ Not received (Photos not available) |
| Vision + Mission statements | Phase 3 | ✅ Keeping existing |
| Core values | Phase 3 | ❌ Not received |
| Awards list | Phase 3 | ✅ Confirmed 0 awards (remove) |
| Additional project photos + descriptions (min 6 total) | Phase 5 | ⚠️ 4 placeholder projects exist |
| Social media URLs (Facebook, Instagram, LinkedIn) | Phase 1 update | ⚠️ Billy working on it, use 'Phehlwana Group' |
| Business hours (Saturday, Sunday, public holidays) | Phase 6 | ✅ Confirmed existing |
| Security division service details | Phase 4 | ✅ Active & Keep |
| Resend API key + domain verification | Phase 6 | ❌ Not set up |
| GA4 Measurement ID | Phase 7 | ❌ Not set up |
| Google Search Console access | Phase 7 | ❌ Not set up |
| Domain registrar access (for DNS) | Phase 9 | ❌ Confirm with client |
| OG image (1200×630px, JPG) | Phase 7 | ❌ Not received |
