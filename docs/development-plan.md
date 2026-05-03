# Phehlwana Group Investments — Development Plan

**Project:** Website Rebuild
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Stack:** Astro v6 · Starwind UI · Tailwind CSS v4 · Vanilla JS · Resend · React Email
**Package Manager:** Bun
**Deployment:** Vercel
**Document Version:** 3.0 — May 2026
**Last Updated:** Reflects actual project state — Phases 0 and 1 complete

---

## Progress Overview

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Foundation & Config | ✅ Complete | |
| 1 | Shared Layout & Navigation | ✅ Complete | |
| 2 | Home Page | ⏳ Blocked | Awaiting client content |
| 3 | About Page | ⏳ Blocked | Awaiting client content |
| 4 | Services Pages | ⏳ Blocked | Awaiting client content |
| 5 | Projects Portfolio | ⏳ Blocked | Awaiting client content |
| 6 | Contact, Email & Utility | ⏳ Not started | Awaiting Resend setup |
| 7 | SEO & Analytics | ⏳ Not started | |
| 8 | Performance & Accessibility | ⏳ Not started | |
| 9 | Pre-Launch & Go Live | ⏳ Not started | |

> **Content Blocker:** Phases 2–5 require real content from the client. Send the questionnaire (`docs/client-questionnaire.md`) and wait for responses before starting Phase 2.

---

## ✅ Phase 0 — Foundation & Config — COMPLETE

### What was done

- [x] Astro v6 + Starwind UI initialised
- [x] `@astrojs/vercel` adapter installed
- [x] `@astrojs/sitemap` installed and configured
- [x] `output: 'static'` set in `astro.config.mjs`
  - **Note:** Astro v6 removed `hybrid` mode. Use `export const prerender = false` on individual routes that need SSR (e.g. contact page with form action)
- [x] `site: 'https://phehlwanagroup.co.za'` set in `astro.config.mjs`
- [x] `react` integration installed (required for React Email templates in Phase 6)
- [x] All Starwind components installed: accordion, avatar, badge, breadcrumb, button, card, dialog, dropdown, input, input-group, label, separator, sheet, skeleton, spinner, tabs, textarea, toast, tooltip
- [x] `src/content.config.ts` created with Astro v6 glob loader format (projects + blog collections)
- [x] `src/content/projects/` and `src/content/blog/` folders created
- [x] `src/data/navigation.ts` created — single source of truth for all nav links
- [x] `src/components/sections/` folder created (empty — Phase 2+)
- [x] `public/images/{hero,services,projects,team}/` folders created
- [x] `public/docs/` folder created
- [x] `public/scripts/animations.js` created (Intersection Observer scroll animations)
- [x] `.env` created with placeholder values
- [x] `.env.example` created (safe to commit)
- [x] `public/robots.txt` created
- [x] All stub pages created and resolving:
  - `src/pages/index.astro`
  - `src/pages/about.astro`
  - `src/pages/projects.astro`
  - `src/pages/contact.astro`
  - `src/pages/thank-you.astro`
  - `src/pages/404.astro`
  - `src/pages/services/index.astro`
  - `src/pages/services/construction.astro`
  - `src/pages/services/mechanical.astro`
  - `src/pages/services/cleaning.astro`
  - `src/pages/services/plant-hire.astro`
  - `src/pages/services/security.astro` ← Security division added
- [x] `bun run build` — 12 pages built, sitemap generated, zero errors

### Deferred from Phase 0

- [ ] `bun add resend @react-email/components` — install when starting Phase 6
- [ ] `@astrojs/partytown` — install when starting Phase 7 (GA4)
- [ ] Real `.env` values — replace placeholders before Phase 6

### Phase 0 Commit

```bash
git add .
git commit -m "chore: Phase 0 complete — config, Vercel adapter, sitemap, content collections, stub pages"
git push origin master
```

---

## ✅ Phase 1 — Shared Layout & Navigation — COMPLETE

### What was done

- [x] `src/layouts/Layout.astro` — root layout with:
  - `lang="en-ZA"` on `<html>`
  - Starwind CSS import
  - Dark mode `initTheme` script (runs before paint, no FOUC)
  - `astro:after-swap` listener for View Transitions compatibility
  - Skip-to-content accessibility link
  - `<Header />` and `<Footer />` on every page
  - `<main id="main-content">` wrapping the slot
  - `animations.js` deferred script

- [x] `src/components/shared/Header.astro` — full header with:
  - Topbar (desktop only): address → Google Maps, email → mailto, social icons with `aria-label`
  - Sticky navbar: logo + text lockup, nav links, Services dropdown, theme toggle, phone, "Request a Quote" CTA
  - **Services dropdown:** click-to-open (not hover — fixes the disappearing bug), closes on outside click or Escape, active service highlighted
  - **Mobile drawer:** slides in from the right, backdrop overlay, Services accordion, body scroll lock, focus management
  - **Theme toggle:** sun/moon icons, saves to `localStorage`, works on desktop and mobile

- [x] `src/components/shared/Footer.astro` — full footer with:
  - 4-column grid: Brand, Quick Links, Our Services, Get In Touch
  - Fully theme-aware (responds to light/dark toggle)
  - Social icons with `aria-label`
  - Phone as `tel:`, email as `mailto:`
  - Developer credit (Apex Web Solutions)
  - Dynamic copyright year

- [x] `src/data/navigation.ts` — centralised nav data:
  - 5 service divisions: Construction, Mechanical, Cleaning, Plant Hire, **Security**
  - `serviceLinks` derived automatically from `serviceDivisions`
  - All footer links, legal links, developer credit in one place

- [x] `src/pages/404.astro` — branded 404 page:
  - Animated background grid
  - Giant "404" with floating search icon and pulse dot
  - CTAs: Back to Home, Contact Us
  - Helpful links section (Pages + Services cards from `navigation.ts`)
  - Contact strip at bottom
  - Fully theme-aware

- [x] `src/styles/starwind.css` — scroll animation CSS added:
  ```css
  [data-animate] { opacity: 0; transform: translateY(20px); transition: ... }
  [data-animate].animate-in { opacity: 1; transform: translateY(0); }
  ```

- [x] `bun run build` — 12 pages, sitemap, zero errors

### Known gaps (intentional — Phase 2+)

- Social media links are `href="#"` — update in `navigation.ts` when client confirms URLs
- Logo images are placeholders from old site — replace with final brand assets
- No WhatsApp widget yet — add to `Layout.astro` in Phase 1 final or Phase 2
- No Open Graph / JSON-LD — Phase 7

### Phase 1 Commit

```bash
git add .
git commit -m "feat: Phase 1 complete — Layout, Header, Footer, dark mode, 404, navigation data"
git push origin main
```

---

## ⏳ Phase 2 — Home Page — BLOCKED (awaiting client content)

**Branch:** `feature/home-page`

> Do not start until the following are received from the client:
> - Hero photography (minimum 2 photos, 1920×800px, WebP)
> - Updated About Us copy (questionnaire Q21, Q23)
> - Confirmed stat numbers (Q27)
> - Service photography (1 per service, 800×500px, WebP)

### Tasks

#### 2.1 Apply Brand Colours

Update `src/styles/starwind.css` `:root` block with confirmed brand colours. Use the Starwind Theme Designer: https://pro.starwind.dev/tools/theme-designer/

```css
/* TODO: Replace with confirmed brand colours from client (questionnaire Q50) */
:root {
  --primary: var(--color-blue-700);  /* Current default — update this */
}
```

#### 2.2 Build Section Components

Create in `src/components/sections/`:

| Component | Content needed |
|---|---|
| `Hero.astro` | Hero photo, headline, subtext |
| `TrustBar.astro` | CIDB grade, BBBEE level, years, project count |
| `ServicesGrid.astro` | Service photos, descriptions (use `serviceLinks` from navigation.ts) |
| `StatsCounter.astro` | Confirmed numbers from client Q27 |
| `AboutSnapshot.astro` | Company copy Q21, company photo |
| `WhyUs.astro` | 4 differentiators (can draft without client) |
| `PortfolioGrid.astro` | 6 project photos (Phase 5 content) |
| `Testimonials.astro` | Client quotes Q60 — skip if none available |
| `ContactCTA.astro` | No client content needed — can build now |

#### 2.3 Assemble `index.astro`

Replace the stub with the full home page importing all section components.

#### 2.4 WhatsApp Widget

Add to `Layout.astro` inside `<body>` before `</body>`:

```astro
<script is:inline>
  (function() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://whatsapp.socialintents.com/api/chat/siwhatsapp.1.0.js';
    s.onload = function() {
      addWidget({
        backgroundColor: '#25D366',
        textColor: '#ffffff',
        position: 'right',
        marginBottom: '25',
        marginRight: '25',
        ctaText: 'Chat with us',
        showPopup: false,
        welcomeText: 'Hi! How can we help you?',
        messageText: 'Hello, I would like to know more about your services.',
        phoneNumber: '27792947635'
      });
    };
    document.head.appendChild(s);
  })();
</script>
```

### ✅ Phase 2 Checkpoint

- [ ] All home sections render at 375px, 768px, 1440px
- [ ] Hero image loads eagerly (not lazy)
- [ ] Stat counters animate on scroll
- [ ] All service cards link to correct service pages
- [ ] No placeholder images — all real WebP files
- [ ] No lorem ipsum — all real client content
- [ ] `bun run build` — no errors
- [ ] Lighthouse Performance > 85

### 📦 Phase 2 Commit

```bash
git add .
git commit -m "feat: build home page — hero, trust bar, services, about snapshot, portfolio, CTA"
git push origin feature/home-page
```

---

## ⏳ Phase 3 — About Page — BLOCKED (awaiting client content)

**Branch:** `feature/about-page`

> Required from client: updated company copy (Q21, Q23), team headshots + bios (Q45), CIDB/BBBEE credentials (Q2, Q3), vision/mission/values (Q24–Q26), company profile PDF.

### Tasks

#### 3.1 Build `PageHeader.astro`

Reusable page header for all interior pages. Uses Starwind `Breadcrumb` component.

```
src/components/sections/PageHeader.astro
```

Props: `title`, `subtitle?`, `breadcrumbs`, `bgImage?`

#### 3.2 Build `about.astro`

Sections in order:
1. `PageHeader` — "About Us"
2. Company Story — 2-column (copy + photo)
3. Vision, Mission & Values — 3 Starwind Cards
4. Stats — reuse `StatsCounter.astro`
5. Credentials — CIDB, BBBEE, Reg No. using `Badge` + PDF download links
6. Team Grid — `Avatar` + name + title + bio
7. `ContactCTA`

### ✅ Phase 3 Checkpoint

- [ ] All copy is real — no lorem ipsum
- [ ] All team members are real — no placeholder names
- [ ] CIDB and BBBEE values match client credentials
- [ ] All 3 PDF files exist in `public/docs/` and download correctly
- [ ] Stats counters animate on scroll
- [ ] Page fully responsive

### 📦 Phase 3 Commit

```bash
git add .
git commit -m "feat: build about page — company story, credentials, team, vision/mission"
git push origin feature/about-page
```

---

## ⏳ Phase 4 — Services Pages — BLOCKED (awaiting client content)

**Branch:** `feature/services`

> Required from client: service photography (1 per division, 800×500px, WebP), detailed service descriptions.

### Tasks

#### 4.1 Build `ServiceLayout.astro`

Shared layout for all 5 individual service pages. Avoids repeating the shell.

```
src/layouts/ServiceLayout.astro
```

Props: `title`, `description`, `heroImage`, `heroAlt`

Includes: `PageHeader` with breadcrumb, `<slot />`, `ContactCTA`

#### 4.2 Build `services/index.astro` — Overview

Large card grid (2×3 on desktop). Each card: photo, icon, title, description, sub-service list, "Learn More →" link.

**Note:** Now has 5 service divisions including Security. Update the services grid accordingly.

#### 4.3 Build Individual Service Pages

Use `ServiceLayout`. Content in Starwind `Accordion` groups.

| Page | Key accordion groups |
|---|---|
| `construction.astro` | General Building, Road Construction & Safety |
| `mechanical.astro` | Design & Development, Maintenance, Commissioning |
| `cleaning.astro` | Cleaning Services, Waste Management |
| `plant-hire.astro` | Equipment grid (TLB, Tipper Trucks, Water Carts, Excavators, Bulldozers, Generators) |
| `security.astro` | Manned Guarding, Access Control, CCTV, Risk Assessment, Event Security, Site Security |

Each page has an inline quote CTA: `/contact?service=[Service+Name]`

### ✅ Phase 4 Checkpoint

- [ ] All 6 service pages render without errors (5 divisions + overview)
- [ ] All "Request a Quote" CTAs pre-populate service in contact form
- [ ] Accordion expand/collapse works on all service pages
- [ ] Breadcrumbs correct: Home → Services → [Service Name]
- [ ] All images are real WebP files
- [ ] `ServiceLayout.astro` used on all 5 individual service pages

### 📦 Phase 4 Commit

```bash
git add .
git commit -m "feat: build services overview and 5 individual service pages with accordion"
git push origin feature/services
```

---

## ⏳ Phase 5 — Projects Portfolio — BLOCKED (awaiting client content)

**Branch:** `feature/projects`

> Required from client: minimum 6 project photos (800×600px, WebP) + descriptions (Q37). Deploy with "Portfolio coming soon" if content is delayed.

### Tasks

#### 5.1 Add Project MDX Files

One file per project in `src/content/projects/`. Minimum 6.

```mdx
---
title: "Project Name"
client: "Client Name"
location: "Pretoria, Gauteng"
year: 2025
category: "Construction"
coverImage: "/images/projects/project-01-name.webp"
featured: true
published: true
---

2–3 sentence description of scope and outcome.
```

**Note:** `category` enum now includes `'Security'` — update `src/content.config.ts` if needed.

#### 5.2 Build `projects.astro`

- Import from content collection using `getCollection('projects')`
- Category filter buttons (vanilla JS): All | Construction | Mechanical | Cleaning | Plant Hire | Road | Security
- 3-column grid with hover effects
- Empty state when category has no projects
- `PageHeader` + `ContactCTA`

#### 5.3 Portfolio Filter Script

```
src/scripts/portfolio-filter.js
```

Vanilla JS — no framework. Updates `data-active` on filter buttons and shows/hides cards.

### ✅ Phase 5 Checkpoint

- [ ] Minimum 6 published projects in content collection
- [ ] All project images exist at declared paths
- [ ] Category filter works for all categories including Security
- [ ] Empty state shows when category has 0 projects
- [ ] No TypeScript errors (`bun run check`)

### 📦 Phase 5 Commit

```bash
git add .
git commit -m "feat: build projects portfolio with content collection and category filter"
git push origin feature/projects
```

---

## ⏳ Phase 6 — Contact, Email & Utility Pages

**Branch:** `feature/contact`

> Required before starting: Resend account + verified domain. Install packages first.

### Pre-requisites

```bash
bun add resend @react-email/components
```

Verify domain `phehlwanagroup.co.za` in Resend dashboard (DKIM, SPF, DMARC DNS records).

### Tasks

#### 6.1 Build React Email Templates

```
src/emails/EnquiryNotification.tsx   — notification to info@phehlwanagroup.co.za
src/emails/EnquiryAutoReply.tsx      — confirmation to the person who submitted
```

Both use `@react-email/components` with Tailwind. Brand colour: `#2596be` (update once confirmed).

#### 6.2 Build Astro Server Action

```
src/actions/index.ts
```

- `defineAction` with `accept: 'form'`
- Zod validation: name (min 2), email (valid), phone (optional), service (optional), message (min 10)
- Renders email templates with `@react-email/components` `render()`
- Sends via Resend — notification first, auto-reply second
- Returns `{ success: true }` on success
- Throws `ActionError` with user-friendly message on failure

#### 6.3 Build `ContactForm.astro`

```
src/components/sections/ContactForm.astro
```

- `method="POST" action={actions.sendEnquiry}`
- Progressive enhancement — works without JS
- Error state with `role="alert"`
- Field values re-populated on validation error
- Service field pre-populated from `?service=` URL param
- Redirects to `/thank-you` on success

#### 6.4 Build `contact.astro`

**Important:** Do NOT add `export const prerender = true` — this page needs SSR for the form action.

Sections: PageHeader, contact info cards (4-column), form + Google Maps (2-column), business hours.

#### 6.5 Update `thank-you.astro`

Replace stub with full confirmation page.

#### 6.6 Verify `404.astro`

Already built in Phase 1. No changes needed.

### ✅ Phase 6 Checkpoint

- [ ] Resend domain verified
- [ ] Test form — notification arrives at `info@phehlwanagroup.co.za`
- [ ] Test form — auto-reply arrives at submitter's address
- [ ] Redirect to `/thank-you` on success
- [ ] Error state renders on invalid submission
- [ ] Field values re-populated on error
- [ ] Service field pre-populates from URL param
- [ ] Contact page does NOT have `export const prerender = true`
- [ ] `bun run build` — no errors

### 📦 Phase 6 Commit

```bash
git add .
git commit -m "feat: build contact page, Resend email action, React Email templates, thank-you"
git push origin feature/contact
```

---

## ⏳ Phase 7 — SEO & Analytics

**Branch:** `feature/seo-analytics`

### Tasks

#### 7.1 Add Open Graph + JSON-LD to Layout

Update `src/layouts/Layout.astro` `<head>` with:
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- Twitter Card tags
- JSON-LD LocalBusiness schema (include all 5 services in `hasOfferCatalog`)

#### 7.2 Add GA4 via Partytown

```bash
bunx astro add partytown
```

Add GA4 script tags to Layout with `type="text/partytown"`.

#### 7.3 Add Event Tracking

```
src/scripts/analytics.js
```

Track: phone clicks, email clicks, WhatsApp clicks, quote CTA clicks, PDF downloads.

#### 7.4 Verify Sitemap + robots.txt

After deploy: confirm `sitemap-index.xml` lists all 12+ pages.

#### 7.5 Google Search Console

Verify ownership, submit sitemap, request indexing of home page.

#### 7.6 Update SEO Meta Per Page

All pages need unique, keyword-rich titles (50–60 chars) and descriptions (140–160 chars). Include Security service in descriptions where relevant.

### ✅ Phase 7 Checkpoint

- [ ] All pages have unique title + description
- [ ] JSON-LD validates at https://validator.schema.org
- [ ] `sitemap-index.xml` contains all pages
- [ ] GA4 Realtime shows live traffic
- [ ] Phone click event fires in GA4
- [ ] OG image renders at https://opengraph.xyz
- [ ] Google Search Console verified + sitemap submitted

### 📦 Phase 7 Commit

```bash
git add .
git commit -m "feat: SEO meta, JSON-LD schema, GA4 analytics, event tracking, sitemap"
git push origin feature/seo-analytics
```

---

## ⏳ Phase 8 — Performance & Accessibility

**Branch:** `feature/performance`

### Tasks

#### 8.1 Lighthouse Audit

Run on all pages. Target: Performance > 85, Accessibility > 90, SEO = 100, Best Practices > 90.

```bash
bunx lighthouse http://localhost:4321 --view
```

#### 8.2 Image Audit

- All photos in WebP format
- Hero image has `loading="eager"` and `<link rel="preload">`
- All other images have `loading="lazy"`
- All images have descriptive `alt` text

#### 8.3 Content Sweep

```bash
# Run these before committing
grep -ri "lorem" src/
grep -ri "coming soon" src/
grep -ri "Phehlawana" src/   # Typo check
grep -rn 'href="#"' src/     # Broken links (social links excepted)
grep -rn 'alt=""' src/       # Missing alt text
```

#### 8.4 Cross-Browser Testing

| Device | Browser | Viewport |
|---|---|---|
| iPhone 14 | Safari | 390×844 |
| Samsung Galaxy S23 | Chrome | 360×780 |
| iPad Air | Safari | 820×1180 |
| Desktop | Chrome | 1440×900 |
| Desktop | Firefox | 1440×900 |

### ✅ Phase 8 Checkpoint

- [ ] Lighthouse Performance > 85 on home page
- [ ] Lighthouse Accessibility > 90 on home page
- [ ] Zero axe DevTools critical errors
- [ ] All content sweep greps return zero results
- [ ] Passes visual check on iOS Safari and Android Chrome

### 📦 Phase 8 Commit

```bash
git add .
git commit -m "perf: performance fixes, accessibility, content sweep — Lighthouse >85"
git push origin feature/performance
```

---

## ⏳ Phase 9 — Pre-Launch & Go Live

**Branch:** `main`

### Tasks

#### 9.1 Connect Repo to Vercel

1. https://vercel.com → New Project → Import `phehlwana-group` from GitHub
2. Framework: Astro (auto-detected)
3. Build command: `bun run build`
4. Install command: `bun install`

#### 9.2 Add Environment Variables to Vercel

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Real key from Resend |
| `FROM_EMAIL` | `noreply@phehlwanagroup.co.za` |
| `TO_EMAIL` | `info@phehlwanagroup.co.za` |
| `PUBLIC_GA4_ID` | Real GA4 Measurement ID |
| `PUBLIC_SITE_URL` | `https://phehlwanagroup.co.za` |

Apply to: Production, Preview, and Development.

#### 9.3 Connect Custom Domain

DNS records at registrar:
- `A` record: `@` → `76.76.21.21`
- `CNAME`: `www` → `cname.vercel-dns.com`

#### 9.4 Post-Deploy Verification

```bash
curl -I https://phehlwanagroup.co.za              # 200 OK + HTTPS
curl -I http://phehlwanagroup.co.za               # 301 → HTTPS
curl -I https://www.phehlwanagroup.co.za          # 301 → apex
curl -I https://phehlwanagroup.co.za/sitemap-index.xml
curl -I https://phehlwanagroup.co.za/robots.txt
curl -I https://phehlwanagroup.co.za/unknown-page  # 404 branded
```

#### 9.5 Final Form Test on Production

Submit from a personal email. Verify both emails arrive and redirect works.

#### 9.6 Client Handover

- [ ] GA4 access (add client as Editor)
- [ ] Search Console access (add client as Owner)
- [ ] Vercel access (add client as Member)
- [ ] Resend access (add client)
- [ ] Handover document with instructions for adding projects, updating content, uploading PDFs

### ✅ Phase 9 Checkpoint

- [ ] `https://phehlwanagroup.co.za` loads with valid SSL
- [ ] `http://` redirects to `https://`
- [ ] `www.` redirects to apex
- [ ] Contact form works on production
- [ ] Both emails delivered correctly
- [ ] GA4 Realtime shows production traffic
- [ ] Sitemap submitted to Search Console
- [ ] Client has access to all platforms
- [ ] Handover document delivered

### 📦 Phase 9 Final Commit

```bash
git add .
git commit -m "chore: production launch — phehlwanagroup.co.za live on Vercel"
git push origin main
```

---

## Content Dependency Tracker

| Item | Needed For | Status |
|---|---|---|
| Logo — colour PNG, white PNG, SVG | Phase 1 (replace placeholder) | ⚠️ Placeholder in use |
| Hero photography ×2 (1920×800px, WebP) | Phase 2 | ❌ Not received |
| About Us copy (Q21, Q23) | Phase 2, 3 | ❌ Not received |
| Service photography ×5 (800×500px, WebP) | Phase 2, 4 | ❌ Not received |
| Confirmed stat numbers (Q27) | Phase 2, 3 | ❌ Not received |
| Client testimonials ×2–3 (Q60) | Phase 2 | ❌ Not received |
| CIDB registration number + grading (Q2) | Phase 2, 3 | ❌ Not received |
| BBBEE level + certificate PDF (Q3) | Phase 2, 3 | ❌ Not received |
| Company Profile PDF | Phase 3 | ❌ Not received |
| CIDB Certificate PDF | Phase 3 | ❌ Not received |
| Team headshots + bios (Q45) | Phase 3 | ❌ Not received |
| Vision + Mission statements (Q24, Q25) | Phase 3 | ❌ Not received |
| Core values (Q26) | Phase 3 | ❌ Not received |
| Awards list (Q43) | Phase 3 | ❌ Not received |
| Project photos ×6 min (Q37) | Phase 5 | ❌ Not received |
| Project descriptions ×6 min | Phase 5 | ❌ Not received |
| Social media URLs (Q17–Q19) | Phase 1 (update navigation.ts) | ❌ Not received |
| Business hours confirmed (Q15) | Phase 6 | ❌ Not received |
| Security division details (services offered) | Phase 4 | ❌ Not received |
| Resend API key | Phase 6 | ❌ Not set up |
| GA4 Measurement ID | Phase 7 | ❌ Not set up |
| Google Search Console access | Phase 7 | ❌ Not set up |
| Domain registrar access (for DNS) | Phase 9 | ❌ Confirm with client |
| OG image (1200×630px, JPG) | Phase 7 | ❌ Not received |
| Brand colour hex codes (Q50) | Phase 2 | ❌ Not received |
