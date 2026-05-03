# Phehlwana Group Investments — Developer Guide

**Project:** Website Rebuild
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Live Site:** https://phehlwanagroup.co.za
**Document Version:** 4.0 — May 2026
**Last Updated:** Reflects actual project state as of Phase 1 completion

---

## Current Project Status

| Phase | Status | Notes |
|---|---|---|
| 0 — Foundation & Config | ✅ Complete | |
| 1 — Shared Layout & Navigation | ✅ Complete | |
| 2 — Home Page | ⏳ Pending client content | |
| 3 — About Page | ⏳ Pending client content | |
| 4 — Services Pages | ⏳ Pending client content | |
| 5 — Projects Portfolio | ⏳ Pending client content | |
| 6 — Contact, Email & Utility | ⏳ Pending Resend setup | |
| 7 — SEO & Analytics | ⏳ Not started | |
| 8 — Performance & Accessibility | ⏳ Not started | |
| 9 — Pre-Launch & Go Live | ⏳ Not started | |

---

## 1. Tech Stack

```
Framework:        Astro v6
UI Components:    Starwind UI v1.16  (https://starwind.dev)
Styling:          Tailwind CSS v4   (bundled with Starwind UI)
JavaScript:       Vanilla JS only   (no React/Vue in the UI layer)
React:            Installed for React Email templates only
Animations:       CSS @keyframes + Intersection Observer (public/scripts/animations.js)
Forms:            Astro Server Actions + Resend (Phase 6 — not yet implemented)
Images:           Astro <Image /> component (automatic WebP + lazy loading)
Deployment:       Vercel (@astrojs/vercel adapter — installed)
Analytics:        Google Analytics 4 (Phase 7 — not yet implemented)
Package Manager:  Bun
```

---

## 2. Project Structure — Actual Current State

```
phehlwana-group/
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── site.webmanifest
│   ├── robots.txt                   ✅ Created
│   ├── img/
│   │   ├── logo.png                 ✅ Copied from old site (replace with final brand asset)
│   │   └── logow.png                ✅ Copied from old site (replace with final brand asset)
│   ├── images/                      ✅ Folder structure created — awaiting client photos
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   └── team/
│   ├── docs/                        ✅ Folder created — awaiting client PDFs
│   └── scripts/
│       └── animations.js            ✅ Scroll animation script (Intersection Observer)
│
├── src/
│   ├── components/
│   │   ├── starwind/                ✅ All components installed via Starwind CLI
│   │   │   ├── accordion/
│   │   │   ├── avatar/
│   │   │   ├── badge/
│   │   │   ├── breadcrumb/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── dialog/
│   │   │   ├── dropdown/
│   │   │   ├── input/
│   │   │   ├── input-group/
│   │   │   ├── label/
│   │   │   ├── separator/
│   │   │   ├── sheet/
│   │   │   ├── skeleton/
│   │   │   ├── spinner/
│   │   │   ├── tabs/
│   │   │   ├── textarea/
│   │   │   ├── toast/
│   │   │   └── tooltip/
│   │   │
│   │   ├── shared/
│   │   │   ├── Header.astro         ✅ Built — sticky, topbar, dropdown nav, mobile drawer
│   │   │   └── Footer.astro         ✅ Built — 4-column, theme-aware, developer credit
│   │   │
│   │   ├── helpful-links.astro      ✅ Built — used on 404 page
│   │   └── sections/                ⏳ Empty — Phase 2+ builds these
│   │
│   ├── content/
│   │   ├── projects/                ✅ Folder created — awaiting client project data
│   │   └── blog/                    ✅ Folder created — awaiting content
│   │
│   ├── content.config.ts            ✅ Astro v6 content collection schema (projects + blog)
│   │
│   ├── data/
│   │   └── navigation.ts            ✅ Single source of truth for all nav links
│   │
│   ├── layouts/
│   │   └── Layout.astro             ✅ Root layout — starwind.css, Header, Footer,
│   │                                   dark mode initTheme, skip-to-content, animations
│   │
│   ├── pages/
│   │   ├── index.astro              ✅ Stub — "under construction"
│   │   ├── about.astro              ✅ Stub — "under construction"
│   │   ├── projects.astro           ✅ Stub — "portfolio coming soon"
│   │   ├── contact.astro            ✅ Stub — phone + email links (no SSR yet)
│   │   ├── thank-you.astro          ✅ Stub — confirmation page
│   │   ├── 404.astro                ✅ Built — branded, with helpful links
│   │   └── services/
│   │       ├── index.astro          ✅ Stub
│   │       ├── construction.astro   ✅ Stub
│   │       ├── mechanical.astro     ✅ Stub
│   │       ├── cleaning.astro       ✅ Stub
│   │       ├── plant-hire.astro     ✅ Stub
│   │       └── security.astro       ✅ Stub — Security division added
│   │
│   └── styles/
│       └── starwind.css             ✅ Starwind base + Tailwind v4 + scroll animation CSS
│
├── astro.config.mjs                 ✅ site URL, static output, Vercel adapter, sitemap
├── content.config.ts                ✅ Astro v6 content collections (glob loader)
├── starwind.config.json             ✅ Starwind CLI config
├── tsconfig.json                    ✅ @/ path alias, strict mode, jsx for React Email
├── .env                             ✅ Placeholder values — replace before launch
├── .env.example                     ✅ Safe to commit — placeholder values only
├── .gitignore                       ✅ Excludes .env, dist, node_modules
└── package.json                     ✅ All dependencies installed
```

---

## 3. What Was Built in Phase 0 + 1

### `src/data/navigation.ts` — Single Source of Truth

All navigation links live here. Update this file and every component updates automatically.

**Exports:**
- `primaryNavLinks` — Home, About, Projects, Contact
- `serviceDivisions` — 5 service divisions with sub-items (used in mobile accordion)
- `serviceLinks` — flat list derived from `serviceDivisions` (used in footer + dropdown)
- `quickLinks` — full site nav for footer
- `legalLinks` — Privacy Policy, Contact
- `developer` — Apex Web Solutions credit
- `socialLinks` — social media hrefs (currently `#` — update when client confirms)

**Service divisions (5):**
1. Construction & Civil Engineering → `/services/construction`
2. Mechanical Engineering → `/services/mechanical`
3. Cleaning & Waste Management → `/services/cleaning`
4. Plant Hire → `/services/plant-hire`
5. Security → `/services/security`

**To add a new service division:** add one object to `serviceDivisions` in `navigation.ts` and create the corresponding stub page in `src/pages/services/`.

---

### `src/layouts/Layout.astro` — Root Layout

Every page uses this layout. It provides:
- `lang="en-ZA"` on `<html>`
- Starwind CSS import
- Dark mode `initTheme` script (runs before paint — no FOUC)
- Skip-to-content accessibility link
- `<Header />` and `<Footer />` on every page
- `<main id="main-content">` wrapping the slot
- `animations.js` deferred script

**Dark mode implementation:**
- Reads `localStorage.getItem('colorTheme')` on load
- Falls back to `prefers-color-scheme` if no saved preference
- Adds/removes `.dark` class on `<html>`
- Re-runs on `astro:after-swap` for View Transitions compatibility

---

### `src/components/shared/Header.astro`

**Desktop:**
- Topbar (hidden on mobile): address → Google Maps, email → mailto, social icons
- Sticky navbar: logo + text lockup, nav links, Services dropdown, theme toggle, phone, "Request a Quote" CTA
- Services dropdown: click-to-open (not hover), stays open while interacting, closes on outside click or Escape

**Mobile:**
- Theme toggle + hamburger in header bar
- Full-height drawer slides in from the right
- Backdrop overlay with fade
- Services accordion inside drawer
- Body scroll locked while drawer is open
- Focus management: focus moves into drawer on open, returns to hamburger on close

**Theme toggle:** Sun/moon icons swap on click. Saves to `localStorage`. Works on both desktop and mobile.

---

### `src/components/shared/Footer.astro`

- 4-column grid (stacks on mobile): Brand, Quick Links, Our Services, Get In Touch
- Fully theme-aware — responds to light/dark toggle
- Social icons with `aria-label` on each
- Phone numbers as `tel:` links, email as `mailto:`
- Developer credit: Apex Web Solutions
- Copyright year is dynamic (`new Date().getFullYear()`)

---

### `src/pages/404.astro`

- Branded 404 with animated background grid
- Giant "404" numeral with floating search icon
- "Back to Home" and "Contact Us" CTAs
- "You might be looking for" section with Pages and Services cards
- Contact strip at the bottom
- Fully theme-aware

---

### `public/scripts/animations.js`

Scroll-triggered entrance animations using Intersection Observer. Add `data-animate` to any element to opt in. Fires once per element (unobserves after triggering).

CSS in `src/styles/starwind.css`:
```css
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-animate].animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 4. Theming — Brand Colours

The current theme uses Starwind's default blue (`--color-blue-700`). Update `src/styles/starwind.css` once brand colours are confirmed by the client (questionnaire Q50).

Use the Starwind Theme Designer to generate the full token set: https://pro.starwind.dev/tools/theme-designer/

```css
/* src/styles/starwind.css — update :root block */
:root {
  /* TODO: Replace with confirmed brand colours */
  --primary: var(--color-blue-700);   /* Current default */
  --primary-foreground: var(--color-neutral-50);
}
```

**Token rule — never use hardcoded Tailwind palette classes:**

| ❌ Don't use | ✅ Use instead |
|---|---|
| `bg-neutral-950` | `bg-background` |
| `text-white` | `text-foreground` |
| `text-neutral-400` | `text-muted-foreground` |
| `bg-neutral-800` | `bg-accent` |
| `border-neutral-200` | `border-border` |

Using semantic tokens means light/dark mode switching works automatically everywhere.

---

## 5. Content Collections — Astro v6 Format

The project uses Astro v6's new content collection format with glob loaders. The config is at `src/content.config.ts` (not `src/content/config.ts`).

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title:      z.string(),
    client:     z.string().optional(),
    location:   z.string(),
    year:       z.number(),
    category:   z.enum(['Construction', 'Mechanical', 'Cleaning', 'Plant Hire', 'Road', 'Security']),
    coverImage: z.string(),
    images:     z.array(z.string()).optional(),
    featured:   z.boolean().default(false),
    published:  z.boolean().default(true),
  }),
});
```

> **Note:** The `category` enum now includes `'Security'` to match the new service division.

---

## 6. Navigation — How to Update

All navigation is centralised in `src/data/navigation.ts`. This is the only file you need to edit for nav changes.

### Add a new service division

1. Add to `serviceDivisions` array in `navigation.ts`
2. Create `src/pages/services/[slug].astro` stub
3. The dropdown, mobile accordion, footer, and sitemap all update automatically

### Update social media links

Find `socialLinks` in `navigation.ts` and replace `href: '#'` with real URLs once confirmed by client.

### Update developer credit

Find `developer` in `navigation.ts` and update `name` and `href`.

---

## 7. Contact Form — Phase 6 (Not Yet Built)

The contact page currently shows a stub with phone and email links. The full form with Resend email integration is Phase 6.

**What's needed before Phase 6:**
- Resend account created at https://resend.com
- Domain `phehlwanagroup.co.za` verified in Resend (DKIM, SPF, DMARC DNS records)
- Real `RESEND_API_KEY` in `.env`
- `bun add resend @react-email/components` (not yet installed)

**Current `.env` state:** Placeholder values only. Do not use in production.

---

## 8. SEO — Current State

**What's done:**
- `site: 'https://phehlwanagroup.co.za'` set in `astro.config.mjs`
- `@astrojs/sitemap` installed — auto-generates `sitemap-index.xml` on build
- `public/robots.txt` created
- `lang="en-ZA"` on `<html>`
- All pages have `<title>` and `<meta name="description">`

**What's missing (Phase 7):**
- Open Graph tags
- Twitter Card tags
- JSON-LD LocalBusiness schema
- Google Analytics 4
- Google Search Console verification
- OG image (1200×630px)

---

## 9. Deployment — Current State

**Adapter:** `@astrojs/vercel` installed, `output: 'static'`

**Note on SSR:** Astro v6 removed the `hybrid` output mode. Use `output: 'static'` (default) and opt individual routes into SSR with `export const prerender = false`. The contact page will need this when the form action is added in Phase 6.

**Build command:** `bun run build`
**Preview command:** `bun run preview`

The project is not yet connected to Vercel. That happens in Phase 9.

---

## 10. Starwind Components — Installed

All components are in `src/components/starwind/`. They are fully editable — you own the code.

| Component | Status | Used in |
|---|---|---|
| `accordion` | ✅ Installed | Service pages (Phase 4) |
| `avatar` | ✅ Installed | Team cards (Phase 3) |
| `badge` | ✅ Installed | Credentials, project categories |
| `breadcrumb` | ✅ Installed | Interior page headers |
| `button` | ✅ Installed | CTAs throughout |
| `card` | ✅ Installed | Services grid, project cards |
| `dialog` | ✅ Installed | Project lightbox (Phase 5) |
| `dropdown` | ✅ Installed | (Not used — custom dropdown built in Header) |
| `input` | ✅ Installed | Contact form (Phase 6) |
| `input-group` | ✅ Installed | Contact form (Phase 6) |
| `label` | ✅ Installed | Contact form (Phase 6) |
| `separator` | ✅ Installed | Layout dividers |
| `sheet` | ✅ Installed | (Not used — custom drawer built in Header) |
| `skeleton` | ✅ Installed | Loading states |
| `spinner` | ✅ Installed | Loading states |
| `tabs` | ✅ Installed | Service category tabs |
| `textarea` | ✅ Installed | Contact form (Phase 6) |
| `toast` | ✅ Installed | Form feedback (Phase 6) |
| `tooltip` | ✅ Installed | Optional enhancements |

> **Note:** The Header uses a custom-built dropdown and drawer instead of the Starwind `Dropdown` and `Sheet` components. This was intentional — the custom implementation gives tighter control over the Services dropdown behaviour (click-to-open, no hover gap issue) and the slide-in drawer animation.

---

## 11. Image Guidelines

### Required images — obtain from client

| Image | Size | Location | Status |
|---|---|---|---|
| Logo (colour, transparent bg) | Any | `public/img/logo.png` | ⚠️ Placeholder from old site |
| Logo (white version) | Any | `public/img/logow.png` | ⚠️ Placeholder from old site |
| OG image | 1200×630px | `public/images/og-image.jpg` | ❌ Missing |
| Hero (×2 minimum) | 1920×800px | `public/images/hero/` | ❌ Missing |
| About section photo | 800×600px | `public/images/about/` | ❌ Missing |
| Service covers (×5) | 800×500px | `public/images/services/` | ❌ Missing |
| Project photos (×6 min) | 800×600px | `public/images/projects/` | ❌ Missing |
| Team headshots | 400×400px | `public/images/team/` | ❌ Missing |

### Using Astro's Image component

```astro
---
import { Image } from 'astro:assets';
import heroImg from '@/assets/images/hero-construction.webp';
---
<Image
  src={heroImg}
  alt="Phehlwana Group construction crew on a building site in Pretoria"
  width={1920}
  height={800}
  loading="eager"
  class="w-full h-full object-cover"
/>
```

For images in `public/`, use plain `<img>` tags with `loading="lazy"`.

---

## 12. Git Workflow

### Branch strategy

```
main          → production (auto-deploys to phehlwanagroup.co.za once connected)
feature/*     → individual features and pages
fix/*         → bug fixes
content/*     → content-only changes (copy, images, MDX files)
```

### Commit message convention

```
feat:     new feature or page
fix:      bug fix
content:  copy, image, or MDX content update
style:    CSS/Tailwind changes only
chore:    config, tooling, dependencies
docs:     documentation updates
```

### Never commit

- `.env` file (real API keys)
- Client PDFs or legal documents
- `bun.lock` (in `.gitignore`)

---

## 13. Environment Variables

Current `.env` has placeholder values. Replace before Phase 6.

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   # Get from resend.com
FROM_EMAIL=noreply@info.phehlwanagroup.co.za  # Must be verified domain in Resend
TO_EMAIL=info@info.phehlwanagroup.co.za       # Where enquiries are delivered
PUBLIC_GA4_ID=G-XXXXXXXXXX              # Get from Google Analytics
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

---

## 14. Pre-Launch Checklist

### Content (blocking — cannot launch without these)
- [ ] Real logo files (colour + white PNG, SVG if available)
- [ ] Hero photography (minimum 2 photos, 1920×800px, WebP)
- [ ] About Us copy (updated from client questionnaire Q21, Q23)
- [ ] Service photography (1 per service, 800×500px, WebP)
- [ ] Team headshots + bios
- [ ] CIDB registration number + grading
- [ ] BBBEE level + certificate PDF
- [ ] Company registration number
- [ ] Confirmed stat numbers (projects, awards, staff)
- [ ] Social media URLs (Facebook, Instagram, LinkedIn)
- [ ] Minimum 6 project photos + descriptions
- [ ] Client testimonials (optional but recommended)

### Technical
- [ ] All meta `title` and `description` filled in on every page
- [ ] Open Graph tags added (Phase 7)
- [ ] JSON-LD schema added (Phase 7)
- [ ] Contact form tested end-to-end (Phase 6)
- [ ] Resend domain verified
- [ ] GA4 tracking verified (Phase 7)
- [ ] Google Search Console verified + sitemap submitted (Phase 7)
- [ ] `sitemap-index.xml` accessible
- [ ] `robots.txt` accessible
- [ ] SSL certificate active (Vercel handles this automatically)
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
| Resend Docs | https://resend.com/docs |
| React Email | https://react.email |
| Astro Sitemap Integration | https://docs.astro.build/en/guides/integrations-guide/sitemap/ |
| Astro Content Collections v6 | https://docs.astro.build/en/guides/content-collections/ |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |
| Squoosh (image converter) | https://squoosh.app |
| OG Image Tester | https://opengraph.xyz |
| Schema Markup Validator | https://validator.schema.org |
| WCAG Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Vercel Dashboard | https://vercel.com/dashboard |
