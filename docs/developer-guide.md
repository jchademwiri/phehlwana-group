# Phehlwana Group Investments — Developer Guide

**Project:** Website Rebuild
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Live Site:** https://phehlwanagroup.co.za
**Document Version:** 5.0 — May 2026
**Last Updated:** Reflects actual project state as of Phase 1 + partial Phase 5 & 6 completion

---

## Current Project Status

| Phase | Status | Notes |
|---|---|---|
| 0 — Foundation & Config | ✅ Complete | |
| 1 — Shared Layout & Navigation | ✅ Complete | |
| 2 — Home Page | ⏳ Pending client content | Stub only |
| 3 — About Page | ⏳ Pending client content | Stub only |
| 4 — Services Pages | ⏳ Pending client content | All 6 stubs exist |
| 5 — Projects Portfolio | ✅ Functional | 4 real projects + detail pages live |
| 6 — Contact, Email & Utility | ✅ Functional | Form + Resend action built |
| 7 — SEO & Analytics | ⏳ Not started | |
| 8 — Performance & Accessibility | ⏳ Not started | |
| 9 — Pre-Launch & Go Live | ⏳ Not started | |

---

## 1. Tech Stack

```
Framework:          Astro v6
UI Components:      Starwind UI v1.16  (https://starwind.dev)
Styling:            Tailwind CSS v4    (via @tailwindcss/vite)
Typography:         @tailwindcss/typography (prose formatting for MD content)
Forms:              @tailwindcss/forms
JavaScript:         Vanilla JS only in UI layer
React:              Installed — used for @astrojs/react integration
Email:              Resend v6 (installed — needs API key + domain verification)
Animations:         CSS @keyframes + Intersection Observer (public/scripts/animations.js)
Analytics:          @vercel/analytics (installed)
Deployment:         Vercel (@astrojs/vercel adapter)
Package Manager:    Bun
Node:               >=24.x
```

---

## 2. Project Structure — Actual Current State

```
phehlwana-group/
├── public/
│   ├── favicon.ico / favicon-16x16.png / favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png / android-chrome-512x512.png
│   ├── site.webmanifest
│   ├── robots.txt                    ✅ Created
│   ├── img/
│   │   ├── logo.png                  ⚠️ Placeholder — replace with final brand asset
│   │   └── logow.png                 ⚠️ Placeholder — replace with final brand asset
│   ├── images/
│   │   ├── placeholder.svg           ✅ Branded SVG fallback image
│   │   ├── about-1.png               ⚠️ Placeholder from old site
│   │   ├── about-site.jpg            ⚠️ Placeholder from old site
│   │   ├── contact-img.png           ⚠️ Placeholder from old site
│   │   ├── blog/
│   │   │   ├── building-maintenance.svg  ✅ Branded SVG cover
│   │   │   ├── ohs-safety.svg            ✅ Branded SVG cover
│   │   │   ├── plant-hire-guide.svg      ✅ Branded SVG cover
│   │   │   └── waste-management.svg      ✅ Branded SVG cover
│   │   ├── hero/
│   │   │   ├── bg-breadcrumb.jpg     ⚠️ Placeholder from old site
│   │   │   └── carousel-2.png        ⚠️ Placeholder from old site
│   │   ├── projects/
│   │   │   └── project-01 to 09.jpeg ✅ Real project photos (9 images)
│   │   ├── services/
│   │   │   ├── service-cleaning.png      ⚠️ Placeholder
│   │   │   ├── service-construction.png  ⚠️ Placeholder
│   │   │   ├── service-mechanical.png    ⚠️ Placeholder
│   │   │   └── service-plant-hire.png    ⚠️ Placeholder
│   │   └── team/                     ❌ Empty — awaiting client headshots
│   ├── docs/                         ❌ Empty — awaiting client PDFs
│   └── scripts/
│       └── animations.js             ✅ Scroll animation (Intersection Observer)
│
├── src/
│   ├── actions/
│   │   └── index.ts                  ✅ Resend contact form action (Zod validation)
│   │
│   ├── assets/
│   │   └── images/                   ✅ Folder structure — for Astro <Image /> component
│   │       ├── about/ hero/ blog/ projects/ services/ team/
│   │       ├── bg-page-header.jpg
│   │       └── contact-illustration.png
│   │
│   ├── components/
│   │   ├── starwind/                 ✅ All 19 components installed
│   │   ├── shared/
│   │   │   ├── Header.astro          ✅ Glassmorphism sticky header, topbar, dropdown, mobile drawer
│   │   │   └── Footer.astro          ✅ 4-column, theme-aware, logo switches light/dark
│   │   ├── helpful-links.astro       ✅ Used on 404 page
│   │   └── sections/                 ⏳ Empty — Phase 2+ builds these
│   │
│   ├── content/
│   │   ├── blog/
│   │   │   ├── building-maintenance-saves-money.md  ✅ Published
│   │   │   ├── ohs-act-construction-compliance.md   ✅ Published
│   │   │   ├── waste-management-compliance.md       ✅ Published
│   │   │   ├── wet-hire-vs-dry-hire.md              ✅ Published
│   │   │   └── placeholder.md                       ✅ Draft (published: false)
│   │   └── projects/
│   │       ├── montana-park-office-renovation.md    ✅ Published — Construction
│   │       ├── tshwane-road-resurfacing.md          ✅ Published — Road
│   │       ├── industrial-facility-cleaning-contract.md  ✅ Published — Cleaning
│   │       ├── gauteng-civil-earthworks-plant-hire.md    ✅ Published — Plant Hire
│   │       └── placeholder.md                       ✅ Draft (published: false)
│   │
│   ├── content.config.ts             ✅ Astro v6 glob loader — projects + blog schemas
│   │
│   ├── data/
│   │   └── navigation.ts             ✅ Single source of truth for all nav links
│   │
│   ├── layouts/
│   │   └── Layout.astro              ✅ Root layout — CSS, Header, Footer, dark mode, analytics
│   │
│   ├── pages/
│   │   ├── index.astro               ⏳ Stub
│   │   ├── about.astro               ⏳ Stub
│   │   ├── contact.astro             ✅ Full page — form, map, FAQ, contact info
│   │   ├── thank-you.astro           ✅ Confirmation page
│   │   ├── 404.astro                 ✅ Branded 404
│   │   ├── blog/
│   │   │   ├── index.astro           ✅ Blog listing with card grid
│   │   │   └── [id].astro            ✅ Blog post detail — TOC sidebar, prose, reading time
│   │   ├── projects/
│   │   │   ├── index.astro           ✅ Project grid with category filter
│   │   │   └── [id].astro            ✅ Project detail — gallery, sidebar, description
│   │   └── services/
│   │       ├── index.astro           ⏳ Stub
│   │       ├── construction.astro    ⏳ Stub
│   │       ├── mechanical.astro      ⏳ Stub
│   │       ├── cleaning.astro        ⏳ Stub
│   │       ├── plant-hire.astro      ⏳ Stub
│   │       └── security.astro        ⏳ Stub
│   │
│   └── styles/
│       └── starwind.css              ✅ Tailwind v4 + typography plugin + prose overrides + animations
│
├── astro.config.mjs                  ✅ site URL, static output, Vercel adapter, sitemap
├── src/content.config.ts             ✅ Astro v6 content collections (glob loader)
├── tsconfig.json                     ✅ @/ path alias, strict mode
├── .env                              ✅ Placeholder values — replace before launch
├── .env.example                      ✅ Safe to commit
├── .gitignore                        ✅ Excludes .env, dist, node_modules
└── package.json                      ✅ All dependencies installed
```

---

## 3. What Has Been Built

### `src/data/navigation.ts` — Single Source of Truth

All navigation links live here. Update this file and every component updates automatically.

**Exports:**
- `primaryNavLinks` — Home, About, Projects, Blog, Contact
- `serviceDivisions` — 5 service divisions (no sub-items until service pages have real content with anchor IDs)
- `serviceLinks` — flat list derived from `serviceDivisions` (used in footer + dropdown)
- `quickLinks` — full site nav for footer
- `legalLinks` — empty array (add Privacy Policy etc. once pages exist)
- `developer` — Apex Web Solutions credit
- `socialLinks` — social media hrefs (currently `#` — update when client confirms)

**Service divisions (5):**
1. Construction & Civil Engineering → `/services/construction`
2. Mechanical Engineering → `/services/mechanical`
3. Cleaning & Waste Management → `/services/cleaning`
4. Plant Hire → `/services/plant-hire`
5. Security → `/services/security`

> **Note:** `ServiceItem` and `items` arrays were removed from `serviceDivisions` — all service pages are stubs with no anchor IDs. Re-add sub-items once service pages have real sectioned content.

---

### `src/layouts/Layout.astro` — Root Layout

Every page uses this layout. Provides:
- `lang="en-ZA"` on `<html>`
- Starwind CSS import
- Dark mode `initTheme` script (runs before paint — no FOUC)
- `astro:after-swap` listener for View Transitions compatibility
- Skip-to-content accessibility link
- `<Header />` and `<Footer />` on every page
- `<main id="main-content">` wrapping the slot
- `@vercel/analytics` component
- `animations.js` deferred script

---

### `src/components/shared/Header.astro`

**Desktop:**
- Topbar (hidden on mobile): address → Google Maps, email → mailto, phone → tel
- Glassmorphism sticky navbar: `bg-background/80 backdrop-blur-lg backdrop-saturate-150`
- Logo switches between `logo.png` (light) and `logow.png` (dark) automatically
- Nav links with active state, Services dropdown (click-to-open), theme toggle, phone, "Request a Quote" CTA

**Mobile:**
- Hamburger only in header bar (theme toggle moved to drawer footer)
- Glassmorphism drawer: `bg-background/70 backdrop-blur-xl backdrop-saturate-150`
- Softened backdrop: `bg-foreground/20 backdrop-blur-sm`
- Services accordion inside drawer
- Body scroll locked while drawer is open, focus management on open/close

**Theme toggle:** Single instance per context (desktop navbar / mobile drawer footer). Saves to `localStorage`. Sun/moon icons sync on load and after swap.

---

### `src/components/shared/Footer.astro`

- 4-column grid: Brand, Quick Links, Our Services, Get In Touch
- Logo switches between `logo.png` (light) and `logow.png` (dark)
- Social icons, phone as `tel:`, email as `mailto:`
- Developer credit: Apex Web Solutions
- Dynamic copyright year

---

### Blog — `/blog` and `/blog/[id]`

**Listing page (`blog/index.astro`):**
- Card grid (1/2/3 columns), sorted newest first
- Full-card clickable links (`absolute inset-0` anchor pattern)
- Branded SVG cover images for all 4 published posts
- Falls back to `/images/placeholder.svg` if no `coverImage`

**Detail page (`blog/[id].astro`):**
- Two-column layout: article + sticky TOC sidebar (desktop only)
- TOC built from `headings` returned by Astro's `render()` — h2 and h3
- Active heading highlight via `IntersectionObserver`
- Copy link button in sidebar
- Reading time estimate (200 wpm)
- `prose-lg` with `@tailwindcss/typography` — fully themed to CSS variables
- Cover image always shown (falls back to placeholder)

**Content schema (blog):**
```ts
title:       z.string()
description: z.string()
pubDate:     z.date()
author:      z.string().default('Phehlwana Group')
coverImage:  z.string().optional()
tags:        z.array(z.string()).default([])
published:   z.boolean().default(false)
```

---

### Projects — `/projects` and `/projects/[id]`

**Listing page (`projects/index.astro`):**
- Category filter buttons (All / Construction / Road / Mechanical / Cleaning / Plant Hire)
- Featured projects sort first, then by year descending
- Full-card clickable links
- Falls back to `/images/placeholder.svg` if no `coverImage`

**Detail page (`projects/[id].astro`):**
- Hero image + thumbnail strip (click to swap with fade transition)
- Project description shown below images (left primary border accent)
- Two-column layout: article + sticky info sidebar
- Sidebar order: Client → Project No. → Category → Location → Project Duration
- CTA card pre-fills contact form `?service=` param
- `prose-lg` for body content

**Content schema (projects):**
```ts
title:        z.string()
projectNo:    z.string().optional()       // e.g. 'PGI-2024-002'
description:  z.string().optional()       // shown below images
scopeOfWorks: z.string().optional()       // stored but not displayed in sidebar
client:       z.string().optional()
location:     z.string()
duration:     z.string().optional()       // e.g. 'January 2024 – June 2024'
year:         z.number()                  // used for sorting
category:     z.enum(['Construction', 'Mechanical', 'Cleaning', 'Plant Hire', 'Road'])
coverImage:   z.string()
images:       z.array(z.string()).optional()
featured:     z.boolean().default(false)
published:    z.boolean().default(true)
```

---

### Contact — `/contact`

**Full page built.** No `export const prerender = true` — SSR required for the form action.

- Two-column layout: form + contact info sidebar
- Service dropdown pre-fills from `?service=` URL param
- Per-field Zod validation errors shown inline with `aria-describedby`
- General error banner if Resend fails
- On success → redirects to `/thank-you`
- Contact sidebar: address (Google Maps link), two phone numbers, email, office hours
- WhatsApp button (brand green `#25d366`)
- Google Maps embed (constrained to `max-w-5xl`, rounded, bordered)
- FAQ accordion (5 questions, JS-powered, `aria-expanded`)

**`src/actions/index.ts`** — Astro Action:
- Validates: name (min 2), email (format), phone (SA 10-digit regex `^0[0-9]{9}$`), service (required), message (min 20)
- Sends notification email to `TO_EMAIL` with all field values
- Sends branded auto-reply to submitter
- Uses env vars: `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`

---

### Placeholder Image System

`public/images/placeholder.svg` — branded SVG fallback used when no real image exists.

Topic-specific blog cover SVGs in `public/images/blog/`:
- `building-maintenance.svg` — blue, building + wrench icon
- `ohs-safety.svg` — green, hard hat + OHS shield
- `plant-hire-guide.svg` — amber, TLB excavator
- `waste-management.svg` — emerald, bin + recycling arrows

All SVGs share: dark navy gradient, grid overlay, left accent bar, category label pill, title, divider, `phehlwanagroup.co.za` watermark.

---

## 4. Theming — Brand Colours

Primary colour is currently `--color-blue-700` (`#1d4ed8`). Update `src/styles/starwind.css` once brand colours are confirmed.

**Token rule — never use hardcoded Tailwind palette classes:**

| ❌ Don't use | ✅ Use instead |
|---|---|
| `bg-neutral-950` | `bg-background` |
| `text-white` | `text-foreground` |
| `text-neutral-400` | `text-muted-foreground` |
| `bg-neutral-800` | `bg-accent` |
| `border-neutral-200` | `border-border` |

---

## 5. Content Collections — Astro v6 Format

Config at `src/content.config.ts` (not `src/content/config.ts`). Uses Astro v6 glob loaders.

Two collections: `projects` and `blog`. See schemas in section 3 above.

**Adding a new blog post:**
1. Create `src/content/blog/my-post-slug.md`
2. Add required frontmatter (`title`, `description`, `pubDate`, `published: true`)
3. The post appears automatically on `/blog` and gets its own page at `/blog/my-post-slug`

**Adding a new project:**
1. Create `src/content/projects/my-project-slug.md`
2. Add required frontmatter (`title`, `location`, `year`, `category`, `coverImage`, `published: true`)
3. The project appears automatically on `/projects` and gets its own page at `/projects/my-project-slug`

---

## 6. Typography — `@tailwindcss/typography`

Installed and configured. Add `prose prose-neutral dark:prose-invert prose-lg` to any container rendering Markdown content.

Prose variables are overridden in `src/styles/starwind.css` to use the site's CSS design tokens — so prose respects light/dark mode automatically. Custom rules also applied for:
- `h2` — bottom border separator
- `blockquote` — tinted primary background
- `code` — pill-style inline code
- `table` — accent header background

---

## 7. Navigation — How to Update

All navigation is centralised in `src/data/navigation.ts`.

### Add a new service division
1. Add to `serviceDivisions` in `navigation.ts`
2. Create `src/pages/services/[slug].astro`
3. Dropdown, mobile accordion, footer, and sitemap all update automatically

### Add sub-items to service dropdown
Once a service page has real sectioned content with `id` anchors:
1. Add `items: ServiceItem[]` back to the `ServiceDivision` interface
2. Add `items` array to the relevant division in `serviceDivisions`
3. Update `Header.astro` dropdown to render sub-items

### Update social media links
Find `socialLinks` in `navigation.ts` and replace `href: '#'` with real URLs.

---

## 8. Environment Variables

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx        # Get from resend.com
RESEND_REGISTERED_DOMAIN=info.phehlwanagroup.co.za
FROM_EMAIL=noreply@info.phehlwanagroup.co.za  # Must be verified domain in Resend
TO_EMAIL=info@phehlwanagroup.co.za            # Where enquiries are delivered
PUBLIC_GA4_ID=G-XXXXXXXXXX                   # Get from Google Analytics (Phase 7)
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

Current `.env` has placeholder values. Replace `RESEND_API_KEY`, `FROM_EMAIL`, and `TO_EMAIL` before the contact form can send real emails.

**Resend domain verification required:** The domain `phehlwanagroup.co.za` must be verified in the Resend dashboard (DKIM, SPF, DMARC DNS records) before emails will deliver.

---

## 9. SEO — Current State

**Done:**
- `site: 'https://phehlwanagroup.co.za'` in `astro.config.mjs`
- `@astrojs/sitemap` — auto-generates `sitemap-index.xml` on build
- `public/robots.txt` created
- `lang="en-ZA"` on `<html>`
- All pages have `<title>` and `<meta name="description">`
- `@vercel/analytics` installed and active

**Missing (Phase 7):**
- Open Graph tags
- Twitter Card tags
- JSON-LD LocalBusiness schema
- Google Analytics 4
- Google Search Console verification
- OG image (1200×630px)

---

## 10. Deployment

**Adapter:** `@astrojs/vercel` installed, `output: 'static'`

Individual routes needing SSR use `export const prerender = false`. The contact page already does this.

**Build:** `bun run build`
**Preview:** `bun run preview`

Not yet connected to Vercel — happens in Phase 9.

---

## 11. Starwind Components — Installed

All 19 components in `src/components/starwind/`. Fully editable — you own the code.

| Component | Used in |
|---|---|
| `accordion` | FAQ on contact page; service pages (Phase 4) |
| `avatar` | Team cards (Phase 3) |
| `badge` | Project categories, credentials |
| `breadcrumb` | Interior page headers |
| `button` | CTAs throughout |
| `card` | Services grid, project cards |
| `dialog` | Project lightbox (future) |
| `dropdown` | Not used — custom dropdown built in Header |
| `input` | Contact form |
| `input-group` | Contact form |
| `label` | Contact form |
| `separator` | Layout dividers |
| `sheet` | Not used — custom drawer built in Header |
| `skeleton` | Loading states |
| `spinner` | Loading states |
| `tabs` | Service category tabs (Phase 4) |
| `textarea` | Contact form |
| `toast` | Form feedback (future enhancement) |
| `tooltip` | Optional enhancements |

---

## 12. Image Guidelines

### Current image status

| Image | Location | Status |
|---|---|---|
| Logo (colour) | `public/img/logo.png` | ⚠️ Placeholder from old site |
| Logo (white) | `public/img/logow.png` | ⚠️ Placeholder from old site |
| Branded placeholder | `public/images/placeholder.svg` | ✅ Created |
| Blog covers (×4) | `public/images/blog/*.svg` | ✅ Branded SVGs created |
| Project photos (×9) | `public/images/projects/project-01 to 09.jpeg` | ✅ Real photos |
| Service images (×4) | `public/images/services/` | ⚠️ Placeholders — no Security image |
| Hero images | `public/images/hero/` | ⚠️ Placeholders from old site |
| Team headshots | `public/images/team/` | ❌ Empty |
| OG image | `public/images/og-image.jpg` | ❌ Missing |

### Required from client

| Image | Size | Notes |
|---|---|---|
| Logo (colour + white PNG, SVG) | Any | Replace placeholders in `public/img/` |
| OG image | 1200×630px | Phase 7 |
| Hero photos (×2 min) | 1920×800px WebP | Phase 2 |
| About section photo | 800×600px WebP | Phase 3 |
| Service covers (×5 incl. Security) | 800×500px WebP | Phase 4 |
| Team headshots | 400×400px WebP | Phase 3 |
| Additional project photos | 800×600px WebP | Phase 5 |

### Using Astro's Image component (for `src/assets/images/`)

```astro
---
import { Image } from 'astro:assets';
import heroImg from '@/assets/images/hero/hero-construction.webp';
---
<Image src={heroImg} alt="..." width={1920} height={800} loading="eager" />
```

For images in `public/`, use plain `<img>` tags with `loading="lazy"` and the `??  '/images/placeholder.svg'` fallback pattern.

---

## 13. Git Workflow

```
main        → production
feature/*   → new features and pages
fix/*       → bug fixes
content/*   → content-only changes (copy, images, MD files)
```

**Commit convention:**
```
feat:     new feature or page
fix:      bug fix
content:  copy, image, or MD content update
style:    CSS/Tailwind changes only
chore:    config, tooling, dependencies
docs:     documentation updates
```

**Never commit:** `.env`, client PDFs or legal documents.

---

## 14. Pre-Launch Checklist

### Content (blocking)
- [ ] Real logo files (colour + white PNG, SVG if available)
- [ ] Hero photography (min 2, 1920×800px, WebP)
- [ ] About Us copy
- [ ] Service photography (1 per service including Security, 800×500px, WebP)
- [ ] Team headshots + bios
- [ ] CIDB registration number + grading
- [ ] BBBEE level + certificate PDF
- [ ] Company registration number
- [ ] Confirmed stat numbers (projects, awards, staff)
- [ ] Social media URLs (Facebook, Instagram, LinkedIn)
- [ ] Client testimonials (optional but recommended)

### Technical
- [ ] All meta `title` and `description` filled in on every page
- [ ] Open Graph tags added (Phase 7)
- [ ] JSON-LD schema added (Phase 7)
- [ ] Resend domain verified + contact form tested end-to-end
- [ ] GA4 tracking verified (Phase 7)
- [ ] Google Search Console verified + sitemap submitted (Phase 7)
- [ ] `sitemap-index.xml` accessible
- [ ] `robots.txt` accessible
- [ ] Lighthouse scores > 85 across all categories (Phase 8)
- [ ] Tested on iOS Safari and Android Chrome (Phase 8)
- [ ] No `href="#"` in navigation (social links excepted until URLs confirmed)
- [ ] Company name spelled "Phehlwana" consistently throughout

---

## 15. Useful Links

| Resource | URL |
|---|---|
| Astro Docs | https://docs.astro.build |
| Astro v6 Migration Guide | https://docs.astro.build/en/guides/upgrade-to/v6/ |
| Starwind UI Docs | https://starwind.dev/docs/getting-started/ |
| Starwind Theme Designer | https://pro.starwind.dev/tools/theme-designer/ |
| Tailwind CSS v4 Docs | https://tailwindcss.com/docs |
| Tailwind Typography | https://tailwindcss.com/docs/typography-plugin |
| Resend Docs | https://resend.com/docs |
| Astro Actions | https://docs.astro.build/en/guides/actions/ |
| Astro Content Collections v6 | https://docs.astro.build/en/guides/content-collections/ |
| Astro Sitemap Integration | https://docs.astro.build/en/guides/integrations-guide/sitemap/ |
| Vercel Analytics | https://vercel.com/docs/analytics |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |
| Squoosh (image converter) | https://squoosh.app |
| OG Image Tester | https://opengraph.xyz |
| Schema Markup Validator | https://validator.schema.org |
| WCAG Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Vercel Dashboard | https://vercel.com/dashboard |
