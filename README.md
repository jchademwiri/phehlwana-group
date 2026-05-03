# Phehlwana Group Investments — Website

**Live site:** https://phehlwanagroup.co.za
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Stack:** Astro v6 · Starwind UI · Tailwind CSS v4 · Vanilla JS · Resend · React Email
**Package manager:** Bun
**Deployment:** Vercel

---

## Build Status

| Phase | Description | Status |
| :---- | :---------- | :----- |
| 0 | Foundation & Config | ✅ Complete |
| 1 | Shared Layout & Navigation | ✅ Complete |
| 2 | Home Page | ⏳ Pending client content |
| 3 | About Page | ⏳ Pending client content |
| 4 | Services Pages | ⏳ Pending client content |
| 5 | Projects Portfolio | ⏳ Pending client content |
| 6 | Contact, Email & Utility | ⏳ Pending Resend setup |
| 7 | SEO & Analytics | ⏳ Not started |
| 8 | Performance & Accessibility | ⏳ Not started |
| 9 | Pre-Launch & Go Live | ⏳ Not started |

---

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | Astro v6 |
| UI Components | Starwind UI v1.16 |
| Styling | Tailwind CSS v4 (bundled with Starwind UI) |
| JavaScript | Vanilla JS only (no React/Vue in the UI layer) |
| React | Installed for React Email templates only |
| Animations | CSS `@keyframes` + Intersection Observer |
| Forms | Astro Server Actions + Resend (Phase 6) |
| Images | Astro `<Image />` — automatic WebP + lazy loading |
| Deployment | Vercel (`@astrojs/vercel` adapter) |
| Analytics | Google Analytics 4 (Phase 7) |
| Package manager | Bun |

---

## Commands

All commands are run from the root of the project:

| Command | Action |
| :------ | :----- |
| `bun install` | Install dependencies |
| `bun dev` | Start local dev server at `localhost:4321` |
| `bun build` | Build production site to `./dist/` |
| `bun preview` | Preview the production build locally |
| `bun astro ...` | Run Astro CLI commands |
| `bun astro check` | TypeScript type-check all `.astro` files |

---

## Project Structure

```
phehlwana-group/
├── public/
│   ├── favicon.ico / favicon-16x16.png / favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png / android-chrome-512x512.png
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── img/
│   │   ├── logo.png                 ⚠️  Placeholder — replace with final brand asset
│   │   └── logow.png                ⚠️  Placeholder — replace with final brand asset
│   ├── images/                      ❌  Awaiting client photography
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   └── team/
│   ├── docs/                        ❌  Awaiting client PDFs (CIDB, BBBEE, company profile)
│   └── scripts/
│       └── animations.js            Scroll-triggered entrance animations (Intersection Observer)
│
├── src/
│   ├── components/
│   │   ├── starwind/                All Starwind UI components (accordion, button, card, etc.)
│   │   ├── shared/
│   │   │   ├── Header.astro         Sticky header — topbar, dropdown nav, mobile drawer, dark mode
│   │   │   └── Footer.astro         4-column footer — theme-aware, dynamic copyright year
│   │   ├── helpful-links.astro      Used on 404 page
│   │   └── sections/                ⏳  Empty — Phase 2+ builds page section components here
│   │
│   ├── content/
│   │   ├── projects/                ❌  Awaiting client project data (MDX files)
│   │   └── blog/                    ❌  Awaiting content (MDX files)
│   │
│   ├── content.config.ts            Astro v6 content collection schema (projects + blog)
│   │
│   ├── data/
│   │   └── navigation.ts            ⭐  Single source of truth for all nav links and service divisions
│   │
│   ├── layouts/
│   │   └── Layout.astro             Root layout — CSS, Header, Footer, dark mode, skip-to-content
│   │
│   ├── pages/
│   │   ├── index.astro              ⏳  Stub (Phase 2)
│   │   ├── about.astro              ⏳  Stub (Phase 3)
│   │   ├── projects.astro           ⏳  Stub (Phase 5)
│   │   ├── contact.astro            ⏳  Stub — phone + email only (Phase 6)
│   │   ├── thank-you.astro          ⏳  Stub (Phase 6)
│   │   ├── 404.astro                ✅  Built — branded, theme-aware, helpful links
│   │   └── services/
│   │       ├── index.astro          ⏳  Stub (Phase 4)
│   │       ├── construction.astro   ⏳  Stub (Phase 4)
│   │       ├── mechanical.astro     ⏳  Stub (Phase 4)
│   │       ├── cleaning.astro       ⏳  Stub (Phase 4)
│   │       ├── plant-hire.astro     ⏳  Stub (Phase 4)
│   │       └── security.astro       ⏳  Stub (Phase 4)
│   │
│   └── styles/
│       └── starwind.css             Starwind base + Tailwind v4 + scroll animation CSS
│
├── docs/
│   ├── developer-guide.md           Full technical reference for this project
│   ├── development-plan.md          Phase-by-phase build plan with checklists
│   ├── client-questionnaire.md      Outstanding questions for the client
│   ├── website-audit-report.md      Audit of the old site
│   └── content/                     Page-by-page content files (copy, structure, TODOs)
│       ├── README.md                Content status tracker and global content reference
│       ├── home.md
│       ├── about.md
│       ├── services.md
│       ├── blog.md
│       ├── team.md
│       ├── contact.md
│       ├── faq.md
│       └── thank-you.md
│
├── astro.config.mjs                 Site URL, static output, Vercel adapter, sitemap
├── content.config.ts                Astro v6 content collections (glob loader)
├── starwind.config.json             Starwind CLI config
├── tsconfig.json                    @/ path alias, strict mode, jsx for React Email
├── .env                             ⚠️  Placeholder values — replace before Phase 6
├── .env.example                     Safe to commit — placeholder values only
└── package.json
```

---

## Navigation Structure

Navigation is centralised in `src/data/navigation.ts`. Edit that file — the Header, Footer, mobile drawer, and sitemap all update automatically.

```
Home          /
About         /about
Services ▾    (dropdown)
  ├── Construction & Civil Engineering   /services/construction
  ├── Mechanical Engineering             /services/mechanical
  ├── Cleaning & Waste Management        /services/cleaning
  ├── Plant Hire                         /services/plant-hire
  └── Security                           /services/security
Projects      /projects
Contact       /contact
[Request a Quote] → /contact
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in real values before Phase 6.

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx        # resend.com — needed for Phase 6
FROM_EMAIL=noreply@phehlwanagroup.co.za       # Must be a verified domain in Resend
TO_EMAIL=info@phehlwanagroup.co.za            # Where enquiries are delivered
PUBLIC_GA4_ID=G-XXXXXXXXXX                   # Google Analytics — needed for Phase 7
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

> **Never commit `.env`** — it is in `.gitignore`. Use `.env.example` for safe reference.

---

## Key Conventions

**Always use semantic Tailwind tokens — never hardcoded palette classes:**

| ❌ Avoid | ✅ Use |
| :------- | :----- |
| `bg-neutral-950` | `bg-background` |
| `text-white` | `text-foreground` |
| `text-neutral-400` | `text-muted-foreground` |
| `bg-neutral-800` | `bg-accent` |
| `border-neutral-200` | `border-border` |

Semantic tokens make light/dark mode work automatically everywhere.

**Scroll animations:** Add `data-animate` to any element to opt into the entrance animation. Handled by `public/scripts/animations.js` via Intersection Observer.

**SSR opt-in:** The project uses `output: 'static'`. Pages that need server-side rendering (e.g. the contact form in Phase 6) must add `export const prerender = false`.

---

## Git Workflow

```
main        → production
feature/*   → new features and pages
fix/*       → bug fixes
content/*   → copy, images, MDX files only
```

**Commit convention:**

```
feat:     new feature or page
fix:      bug fix
content:  copy, image, or MDX update
style:    CSS/Tailwind only
chore:    config, tooling, dependencies
docs:     documentation updates
```

---

## Documentation

Full project documentation is in the `docs/` folder:

| File | Purpose |
| :--- | :------ |
| `docs/developer-guide.md` | Technical reference — components, theming, deployment, image guidelines |
| `docs/development-plan.md` | Phase-by-phase plan with tasks and checklists |
| `docs/client-questionnaire.md` | Questions outstanding from the client |
| `docs/website-audit-report.md` | Audit findings from the old site |
| `docs/content/README.md` | Content status tracker — what's done, what's needed |

---

## Useful Links

| Resource | URL |
| :------- | :-- |
| Astro Docs | https://docs.astro.build |
| Starwind UI | https://starwind.dev/docs/getting-started/ |
| Starwind Theme Designer | https://pro.starwind.dev/tools/theme-designer/ |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| Resend | https://resend.com/docs |
| React Email | https://react.email |
| Vercel Dashboard | https://vercel.com/dashboard |
| Google Analytics | https://analytics.google.com |
| Google Search Console | https://search.google.com/search-console |
| Squoosh (image optimiser) | https://squoosh.app |
