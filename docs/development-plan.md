# Phehlwana Group Investments — Development Plan

**Project:** Website Rebuild
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Stack:** Astro v6 · Starwind UI · Tailwind CSS v4 · Vanilla JS · Resend · React Email
**Package Manager:** Bun
**Deployment:** Vercel
**Document Version:** 2.0 — May 2026

---

## How to Use This Document

- **Developer** — follow tasks in order, run the checkpoint before every commit
- **AI Assistant** — use the 🤖 prompt blocks verbatim. Copy, paste, and send to your AI tool (Claude, Cursor, Copilot, etc.)
- **Coworker** — tasks marked 👥 are good candidates for parallel work once the phase is branched
- Every phase ends with a ✅ checkpoint and a 📦 git commit — do not skip either

---

## Overview

| Phase | Name | Who | Est. Time |
|---|---|---|---|
| 0 | Foundation & Config | Developer | 2–4 hours |
| 1 | Shared Layout & Navigation | Developer + AI | 1–2 days |
| 2 | Home Page | Developer + AI + Coworker | 2–3 days |
| 3 | About Page | Developer + AI + Coworker | 1–2 days |
| 4 | Services Pages | Developer + AI + Coworker | 2–3 days |
| 5 | Projects Portfolio | Developer + AI | 1–2 days |
| 6 | Contact, Email & Utility Pages | Developer + AI | 1–2 days |
| 7 | SEO & Analytics | Developer + AI | 1 day |
| 8 | Performance & Accessibility | Developer + AI | 1–2 days |
| 9 | Pre-Launch & Go Live | Developer | 1 day |

**Total estimated time:** 12–18 working days.

> **Content Blocker:** Phases 2–6 require real content from the client — photos, copy, credentials. Send the questionnaire first. Do not commit placeholder images or lorem ipsum at any point.

> **Already done:** Astro v6 + Starwind UI is initialised. Start at Phase 0 task 0.3.

---

## Phase 0 — Foundation & Config

**Goal:** Correct tooling, adapters, environment variables, and folder structure. No UI yet — just a clean, working base the rest of the project builds on.

**Branch:** `main`

---

### Tasks

#### 0.1 Verify Existing Setup

```bash
bun run dev
```

Confirm the dev server starts at `http://localhost:4321` with no errors. If it does, Astro + Starwind is confirmed working.

#### 0.2 Add Vercel Adapter

Resend requires SSR (server-side rendering) to protect the API key. Enable it with the Vercel adapter:

```bash
bunx astro add vercel
```

Then confirm `astro.config.mjs` looks like this:

```js
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://phehlwanagroup.co.za',
  output: 'hybrid',            // Static by default, SSR opt-in per route
  adapter: vercel(),
  integrations: [
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      FROM_EMAIL:     envField.string({ context: 'server', access: 'secret' }),
      TO_EMAIL:       envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
```

#### 0.3 Install Resend + React Email

```bash
bun add resend @react-email/components react react-dom
bun add -d @types/react @types/react-dom
```

#### 0.4 Environment Variables

Create `.env.local` (never commit this file):

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@phehlwanagroup.co.za
TO_EMAIL=info@phehlwanagroup.co.za
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

> **Resend setup:** Create account at https://resend.com → API Keys → Create Key. Then verify the domain `phehlwanagroup.co.za` under Domains → Add Domain. Add the DKIM, SPF, and DMARC DNS records at the domain registrar before launch.

Create `.env.example` (safe to commit — values are placeholders):

```bash
# .env.example — copy to .env.local and fill in real values
RESEND_API_KEY=re_your_key_here
FROM_EMAIL=noreply@yourdomain.co.za
TO_EMAIL=info@yourdomain.co.za
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

#### 0.5 Update `.gitignore`

```gitignore
node_modules/
dist/
.astro/
.env
.env.local
.env.production
.DS_Store
*.log
.vercel/
bun.lock
```

#### 0.6 Create Folder Structure

```bash
mkdir -p src/components/{shared,sections}
mkdir -p src/actions
mkdir -p src/emails
mkdir -p src/scripts
mkdir -p src/content/{projects,blog}
mkdir -p public/images/{hero,services,projects,team}
mkdir -p public/docs
```

#### 0.7 Configure `tsconfig.json`

Verify the `@/` alias is present (Starwind CLI should have done this):

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

The `jsx` settings are required for React Email templates.

#### 0.8 Add Required Starwind Components

Install all components needed across the project in one go:

```bash
bunx starwind@latest add button
bunx starwind@latest add card
bunx starwind@latest add input
bunx starwind@latest add textarea
bunx starwind@latest add label
bunx starwind@latest add input-group
bunx starwind@latest add dropdown
bunx starwind@latest add sheet
bunx starwind@latest add toast
bunx starwind@latest add dialog
bunx starwind@latest add accordion
bunx starwind@latest add badge
bunx starwind@latest add breadcrumb
bunx starwind@latest add avatar
bunx starwind@latest add separator
bunx starwind@latest add skeleton
bunx starwind@latest add spinner
bunx starwind@latest add tabs
bunx starwind@latest add tooltip
```

#### 0.9 Content Collection Schema

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    client:      z.string().optional(),
    location:    z.string(),
    year:        z.number(),
    category:    z.enum(['Construction', 'Mechanical', 'Cleaning', 'Plant Hire', 'Road']),
    coverImage:  z.string(),
    images:      z.array(z.string()).optional(),
    featured:    z.boolean().default(false),
    published:   z.boolean().default(true),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    author:      z.string().default('Phehlwana Group'),
    coverImage:  z.string().optional(),
    tags:        z.array(z.string()).default([]),
    published:   z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
```

#### 0.10 Stub All Pages

Create minimal stub pages so every nav link resolves immediately. Each stub:

```astro
---
// src/pages/about.astro
import SharedLayout from '@/layouts/shared.astro';
export const prerender = true;
---
<SharedLayout title="About Us" description="About Phehlwana Group Investments.">
  <h1>About — Coming Soon</h1>
</SharedLayout>
```

Pages to stub:
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/services/index.astro`
- `src/pages/services/construction.astro`
- `src/pages/services/mechanical.astro`
- `src/pages/services/cleaning.astro`
- `src/pages/services/plant-hire.astro`
- `src/pages/projects.astro`
- `src/pages/contact.astro`
- `src/pages/thank-you.astro`
- `src/pages/404.astro`

---

### 🤖 AI Prompt — Phase 0

> Use this prompt to have AI verify your config and catch issues before committing.

```
I am building a website for Phehlwana Group Investments — a South African construction 
and engineering company based in Pretoria.

Tech stack:
- Astro v6 (hybrid output mode)
- Starwind UI v1.16 (component library)
- Tailwind CSS v4 (via Starwind)
- Bun as package manager
- Vercel adapter (@astrojs/vercel)
- Resend + React Email for transactional email
- @astrojs/sitemap and @astrojs/partytown integrations
- TypeScript strict mode
- @/ path alias pointing to src/

Here is my current astro.config.mjs:
[PASTE YOUR CONFIG HERE]

Here is my tsconfig.json:
[PASTE YOUR TSCONFIG HERE]

Please review both files and:
1. Confirm they are correctly configured for hybrid SSR with the Vercel adapter
2. Confirm the jsx and jsxImportSource settings are correct for React Email
3. Confirm the env schema is correctly typed for Resend API key security
4. Flag any missing integrations or misconfigurations
5. Suggest any improvements specific to this project's needs
```

---

### ✅ Phase 0 Checkpoint

- [ ] `bun run dev` — starts with no errors
- [ ] `bun run build` — builds with no errors
- [ ] Vercel adapter is installed and `output: 'hybrid'` is set
- [ ] Resend and React Email packages installed (`bun pm ls | grep resend`)
- [ ] `.env.local` exists with all 5 variables filled in
- [ ] `.env.example` committed with placeholder values
- [ ] `.env.local` is in `.gitignore` and NOT tracked by git
- [ ] All Starwind components added to `src/components/starwind/`
- [ ] `src/content/config.ts` exists with project and blog schemas
- [ ] All stub pages exist and resolve without errors
- [ ] `@/` path alias works (test: `import x from '@/components/starwind/button.astro'`)

### 📦 Phase 0 Commit

```bash
git add .
git commit -m "chore: configure Vercel adapter, Resend, React Email, content collections, stub pages"
git push origin main
```

---

## Phase 1 — Shared Layout & Navigation

**Goal:** Every page has a consistent shell using `src/layouts/shared.astro`. Topbar, navbar, and footer are built with real content, working links, and the WhatsApp widget on every page.

**Branch:** `main` (or `feature/layout` if working with coworker)

---

### Tasks

#### 1.1 Build `Head.astro`

```
src/components/layout/Head.astro
```

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

const {
  title,
  description,
  ogImage = '/images/og-image.jpg',
  canonical = Astro.url.href,
} = Astro.props;

const siteName = 'Phehlwana Group Investments';
const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
---
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />

<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

<meta property="og:type"        content="website" />
<meta property="og:url"         content={canonical} />
<meta property="og:title"       content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image"       content={new URL(ogImage, Astro.site)} />
<meta property="og:site_name"   content={siteName} />
<meta property="og:locale"      content="en_ZA" />
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image"       content={new URL(ogImage, Astro.site)} />

<!-- JSON-LD LocalBusiness schema -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://phehlwanagroup.co.za",
  "name": "Phehlwana Group Investments",
  "description": "Construction, civil engineering, mechanical engineering, cleaning and plant hire services in Pretoria, Gauteng.",
  "url": "https://phehlwanagroup.co.za",
  "telephone": "+27126550284",
  "email": "info@phehlwanagroup.co.za",
  "foundingDate": "2015",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office No 06, PKN Office Park, 62 Taaifontein Street",
    "addressLocality": "Montana Park",
    "addressRegion": "Gauteng",
    "postalCode": "0182",
    "addressCountry": "ZA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -25.6792539, "longitude": 28.2747313 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "17:00"
  }]
})} />
```

#### 1.2 Build `TopBar.astro`

Desktop-only bar. Hidden on mobile with `hidden lg:block`.

```
src/components/layout/TopBar.astro
```

Left side: address (links to Google Maps) + email (mailto link).
Right side: social icon links — each must have `aria-label`.

Use the Google Maps URL already in the old site:
`https://www.google.com/maps/place/PKN+Office+Park`

Confirmed socials from client questionnaire before adding links. Use `#` only as a temporary placeholder — flag with a `TODO` comment.

#### 1.3 Build `Navbar.astro`

```
src/components/layout/Navbar.astro
```

Structure:
- Logo image (`/images/logo.png`) → `href="/"`
- Desktop nav links: Home · About · Services ▾ · Projects · Contact
- Services dropdown (Starwind `Dropdown`) with 4 service links + "View All Services"
- "Request a Quote" button → `/contact?ref=nav-quote`
- Mobile: hamburger triggers Starwind `Sheet` drawer with same nav links
- Sticky with scroll shadow via vanilla JS:

```js
// src/scripts/navbar.js
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow-md', window.scrollY > 10);
  }, { passive: true });
}
```

#### 1.4 Build `Footer.astro`

```
src/components/layout/Footer.astro
```

4-column grid:
- **Col 1:** White logo + tagline + social icons with `aria-label`
- **Col 2:** Quick Links — real hrefs to all pages (no `href="#"`)
- **Col 3:** Services — links to each individual service page
- **Col 4:** Contact — address, phone (`tel:`), email (`mailto:`), WhatsApp

Bottom strip: `© 2026 Phehlwana Group Investments · All rights reserved · Designed by Mothupi Solutions`

#### 1.5 Build `shared.astro` Layout

```
src/layouts/shared.astro
```

```astro
---
import Head from '@/components/layout/Head.astro';
import TopBar from '@/components/layout/TopBar.astro';
import Navbar from '@/components/layout/Navbar.astro';
import Footer from '@/components/layout/Footer.astro';
import '@/styles/starwind.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}
const { title, description, ogImage } = Astro.props;
---
<!DOCTYPE html>
<html lang="en-ZA" class="scroll-smooth">
<head>
  <Head {title} {description} {ogImage} />
</head>
<body class="min-h-screen flex flex-col bg-background text-foreground antialiased">

  <!-- Skip to content — accessibility -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
  >
    Skip to main content
  </a>

  <TopBar />
  <Navbar />

  <main id="main-content" class="flex-1">
    <slot />
  </main>

  <Footer />

  <!-- WhatsApp Widget — global, on every page -->
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

  <!-- Scroll animations -->
  <script src="/scripts/animations.js" is:inline></script>

</body>
</html>
```

#### 1.6 Create Scroll Animation Script

```js
// public/scripts/animations.js
(function() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
})();
```

Add corresponding CSS to `src/styles/starwind.css`:

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

#### 1.7 Update All Stub Pages to Use `shared.astro`

Replace every stub's layout import:

```astro
---
import SharedLayout from '@/layouts/shared.astro';
export const prerender = true;
---
<SharedLayout title="Page Title" description="Page description.">
  <section class="container mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold">Page — In Progress</h1>
  </section>
</SharedLayout>
```

---

### 🤖 AI Prompt — Navbar Component

```
Build an accessible, responsive Navbar component for an Astro v6 project using 
Starwind UI components and Tailwind CSS v4.

Company: Phehlwana Group Investments
Logo: /images/logo.png (white version: /images/logo-white.png)
Primary colour: #2596be

Requirements:
- Sticky navbar — adds shadow-md class when scrolled past 10px (vanilla JS)
- Desktop (lg+): horizontal nav links + Services dropdown + "Request a Quote" button
- Mobile (<lg): hamburger button opens a Starwind Sheet drawer with the same links
- Nav links: Home (/) | About (/about) | Services (/services) | Projects (/projects) | Contact (/contact)
- Services dropdown items:
    Construction & Civil Engineering → /services/construction
    Mechanical Engineering → /services/mechanical
    Cleaning & Waste Management → /services/cleaning
    Plant Hire → /services/plant-hire
    ─────────────────────────
    View All Services → /services
- "Request a Quote" button links to /contact?ref=nav-quote
- Active link styling based on current URL (use Astro.url.pathname)
- All interactive elements keyboard accessible
- Uses Starwind Dropdown for the Services menu (desktop)
- Uses Starwind Sheet for the mobile drawer
- Uses Starwind Button for the CTA
- Vanilla JS only — no React, no Vue
- File: src/components/layout/Navbar.astro

Output the complete Navbar.astro file with all imports, TypeScript frontmatter, and HTML.
```

---

### 🤖 AI Prompt — Footer Component

```
Build a complete Footer component for an Astro v6 + Starwind UI + Tailwind CSS v4 project.

Company: Phehlwana Group Investments
White logo path: /images/logo-white.png
Address: Office No 06, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
Phone: 012 655 0284 (tel: link)
Mobile: 079 294 7635 (tel: link)
Email: info@phehlwanagroup.co.za (mailto: link)
WhatsApp: 27792947635

Footer structure — 4 columns on desktop, stacked on mobile:
Col 1: White logo + "We pride ourselves on meeting the latest client specifications 
        and demands." + social icons (Facebook, Instagram, LinkedIn) — 
        each with aria-label, links currently #
Col 2: Quick Links — About, Services, Projects, Contact — real hrefs
Col 3: Services — Construction (/services/construction), Mechanical (/services/mechanical), 
        Cleaning (/services/cleaning), Plant Hire (/services/plant-hire)
Col 4: Contact — address with map icon, phone with phone icon, email with envelope icon

Bottom strip (full width, dark background):
"© 2026 Phehlwana Group Investments · All rights reserved"
Right: "Designed by Mothupi Solutions" (link: https://www.mothupisolutions.co.za)

Requirements:
- Dark background (use --color-secondary or a dark Tailwind class)
- Accessible: all icon-only links have aria-label
- No href="#" for navigation links — all real paths
- Social links that are not yet confirmed should have a TODO comment

Output the complete Footer.astro file.
```

---

### 🤖 AI Prompt — shared.astro Layout Review

```
Review this Astro layout file for a South African construction company website 
(Phehlwana Group Investments). The layout is named shared.astro and located at 
src/layouts/shared.astro.

[PASTE YOUR shared.astro FILE CONTENT HERE]

Check for and fix:
1. Correct lang attribute (en-ZA for South African English)
2. Skip to content link present and accessible
3. scroll-smooth on html element
4. Correct flex column structure so footer sticks to bottom
5. WhatsApp widget loads asynchronously and does not block rendering
6. JSON-LD schema is in Head.astro, not duplicated in shared.astro
7. starwind.css imported exactly once
8. No framework JS (no React, no Vue hydration islands)
9. TypeScript Props interface is correct
10. The <slot /> is inside <main id="main-content">

Return the corrected file with a comment for each fix made.
```

---

### ✅ Phase 1 Checkpoint

- [ ] `bun run dev` — no console errors on any stub page
- [ ] TopBar visible on desktop, hidden on mobile
- [ ] Navbar sticky — shadow appears after scrolling 10px
- [ ] Services dropdown opens and closes on desktop
- [ ] Sheet drawer opens and closes on mobile
- [ ] All nav links resolve (no 404s in Network tab)
- [ ] All footer links resolve
- [ ] Social icon buttons have `aria-label` attributes
- [ ] WhatsApp widget visible on every page
- [ ] Skip to content link present in DOM (visible on Tab keypress)
- [ ] `<main id="main-content">` present on every page
- [ ] `shared.astro` is the layout used on every stub page
- [ ] No `href="#"` in navigation (only in social links with TODO comment)
- [ ] `bun run build` — no build errors

### 📦 Phase 1 Commit

```bash
git add .
git commit -m "feat: build shared layout, topbar, navbar, footer, WhatsApp widget"
git push origin main
```

---

## Phase 2 — Home Page

**Goal:** Complete, production-quality home page with real content and real images. This is the highest-priority page and sets the visual standard for all other pages.

**Branch:** `feature/home-page`

> **Content blocker:** Hero photography, company copy, and stat numbers must be confirmed by client before this phase starts.

---

### Tasks

#### 2.1 Apply Brand Colours

Update `src/styles/starwind.css` with confirmed brand colours. If not yet confirmed, use the current blue as a placeholder and add a `TODO`:

```css
/* TODO: Confirm final brand colours with client (questionnaire Q50) */
/* Use Starwind Theme Designer: https://pro.starwind.dev/tools/theme-designer/ */
:root {
  --primary: oklch(0.60 0.13 218);   /* #2596be */
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.20 0.02 240); /* Dark navy */
  --accent: oklch(0.75 0.16 60);     /* Warm amber — optional, for CTA contrast */
}
```

#### 2.2 Build `Hero.astro`

```
src/components/sections/Hero.astro
```

- Full-width real site photography, 1920×800px WebP
- `loading="eager"` on hero image
- Add `<link rel="preload" as="image">` in `Head.astro` for the hero image
- Company name headline + subheadline with location + services
- Two CTAs: "Request a Quote" (primary button) + "Our Services" (outline button)
- Subtle dark overlay on image for text legibility

#### 2.3 Build `TrustBar.astro`

```
src/components/sections/TrustBar.astro
```

Horizontal band directly below hero. Use Starwind `Badge` components for CIDB and BBBEE:

Items (populate from client questionnaire):
- 🏗️ Established 2015
- ✅ CIDB Registered — Grade [X]
- ⭐ BBBEE Level [X]
- 📁 129+ Projects Completed

#### 2.4 Build `ServicesGrid.astro`

```
src/components/sections/ServicesGrid.astro
```

4-column grid using Starwind `Card`. Each card:
- Real service photo (800×500px WebP) with `loading="lazy"`
- SVG icon
- Service title (`<h3>`)
- 2-sentence description
- "Learn More →" link to individual service page

#### 2.5 Build `StatsCounter.astro`

```
src/components/sections/StatsCounter.astro
```

4 animated counters with vanilla JS Intersection Observer. Confirm all numbers with client (Q27) before hardcoding.

```astro
---
const stats = [
  { value: 129, suffix: '+', label: 'Projects Completed' },
  { value: 20,  suffix: '+', label: 'Awards Won' },
  { value: 50,  suffix: '+', label: 'Skilled Professionals' },
  { value: 6,   suffix: '+', label: 'Management Team' },
];
---
<section class="py-16 bg-primary text-primary-foreground">
  <div class="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {stats.map(stat => (
      <div>
        <div class="text-5xl font-bold">
          <span data-counter data-target={stat.value}>0</span>{stat.suffix}
        </div>
        <p class="mt-2 text-sm uppercase tracking-wide">{stat.label}</p>
      </div>
    ))}
  </div>
</section>

<script>
// Counter animation — fires once when section scrolls into view
function animateCounter(el: HTMLElement) {
  const target = parseInt(el.dataset.target || '0', 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = String(target); clearInterval(timer); }
    else { el.textContent = String(Math.floor(current)); }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target as HTMLElement);
      counterObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
</script>
```

#### 2.6 Build `AboutSnapshot.astro`

```
src/components/sections/AboutSnapshot.astro
```

Two-column layout:
- Left: real About Us copy (2 paragraphs from client Q21, Q23) + "Learn More About Us" button → `/about`
- Right: real company/site photo + reused `StatsCounter.astro`

#### 2.7 Build `WhyUs.astro`

```
src/components/sections/WhyUs.astro
```

4 cards with icon + bold title + 1-sentence description. Suggested items:
- ✅ Licensed & CIDB Registered
- 🏆 10+ Years Industry Experience
- 📍 Proudly Pretoria-Based
- 🛡️ Health & Safety Compliant

#### 2.8 Build `PortfolioGrid.astro`

```
src/components/sections/PortfolioGrid.astro
```

6-photo grid (3×2 on desktop). Each tile:
- Real project photo (WebP, 800×600px), `loading="lazy"`
- Hover: dark overlay fades in with project name and category `Badge`
- Click: opens Starwind `Dialog` with larger image + brief description

Footer of section: "View All Projects →" button → `/projects`

#### 2.9 Build `Testimonials.astro`

```
src/components/sections/Testimonials.astro
```

2–3 client quote cards. Each: quote text, client name, company. Build only when real testimonials are supplied (Q60). Skip section entirely if none available at launch.

#### 2.10 Build `ContactCTA.astro`

```
src/components/sections/ContactCTA.astro
```

Full-width primary/dark background section. Used on every page — build it once, reuse everywhere:
- Headline: "Ready to Start Your Project?"
- Subtext: "Contact us today for a free quote."
- Phone number as `tel:` link
- "Request a Quote" primary button → `/contact?ref=cta-banner`

#### 2.11 Assemble `index.astro`

```astro
---
import SharedLayout from '@/layouts/shared.astro';
import Hero from '@/components/sections/Hero.astro';
import TrustBar from '@/components/sections/TrustBar.astro';
import ServicesGrid from '@/components/sections/ServicesGrid.astro';
import AboutSnapshot from '@/components/sections/AboutSnapshot.astro';
import WhyUs from '@/components/sections/WhyUs.astro';
import PortfolioGrid from '@/components/sections/PortfolioGrid.astro';
import Testimonials from '@/components/sections/Testimonials.astro';
import ContactCTA from '@/components/sections/ContactCTA.astro';

export const prerender = true;
---
<SharedLayout
  title="Phehlwana Group Investments | Construction & Engineering Pretoria"
  description="Phehlwana Group Investments — construction, civil engineering, mechanical engineering, cleaning, waste management and plant hire in Pretoria, Gauteng. Established 2015."
>
  <Hero />
  <TrustBar />
  <ServicesGrid />
  <AboutSnapshot />
  <WhyUs />
  <PortfolioGrid />
  <Testimonials />
  <ContactCTA />
</SharedLayout>
```

---

### 👥 Coworker Task — Home Page Sections

While the main developer builds `Hero.astro` and `ServicesGrid.astro`, the coworker can work in parallel on:
- `WhyUs.astro`
- `ContactCTA.astro`
- `TrustBar.astro`

Branch off `feature/home-page`:

```bash
git checkout feature/home-page
git checkout -b feature/home-sections-cw
```

When done, open a PR back into `feature/home-page`.

---

### 🤖 AI Prompt — Hero Section

```
Build a Hero section component for an Astro v6 website using Tailwind CSS v4.

File: src/components/sections/Hero.astro

Company: Phehlwana Group Investments
Tagline: "Building Excellence Across Pretoria and Gauteng"
Subtext: "Construction · Civil Engineering · Mechanical Engineering · Plant Hire"
Hero image: /images/hero/hero-construction.webp (1920x800px)
Primary colour: #2596be

Requirements:
- Full-width section, min-height 80vh
- Hero image as CSS background or <img> with object-cover, loading="eager"
- Dark overlay (bg-black/50) for text contrast
- Content centred vertically and horizontally
- H1 for the headline (large, white, bold)
- Subtext paragraph (white, slightly muted)
- Two CTA buttons side by side on desktop, stacked on mobile:
    Primary: "Request a Quote" → /contact?ref=hero-quote (uses Starwind Button, variant="default")
    Outline: "Our Services" → /services (uses Starwind Button, variant="outline", white border)
- Subtle fade-in animation on load using CSS @keyframes (no JS needed for hero)
- Fully responsive: text and buttons scale gracefully to mobile (375px)
- Accessible: heading is an <h1>, buttons have clear labels, image has descriptive alt text

Output the complete Hero.astro file.
```

---

### 🤖 AI Prompt — Services Grid

```
Build a ServicesGrid section component for an Astro v6 website using Starwind UI 
Card components and Tailwind CSS v4.

File: src/components/sections/ServicesGrid.astro

Services data (hardcode as a TypeScript array in the frontmatter):
[
  {
    title: "Construction & Civil Engineering",
    description: "General building, road construction, road maintenance, and safety management across Pretoria and Gauteng.",
    image: "/images/services/construction-civil-engineering.webp",
    href: "/services/construction",
    icon: "🏗️"
  },
  {
    title: "Mechanical Engineering",
    description: "Design, maintenance, system analysis, and installation of mechanical systems and machinery.",
    image: "/images/services/mechanical-engineering.webp",
    href: "/services/mechanical",
    icon: "⚙️"
  },
  {
    title: "Cleaning & Waste Management",
    description: "Commercial and industrial cleaning, hygiene services, and comprehensive waste collection and disposal.",
    image: "/images/services/cleaning-waste-management.webp",
    href: "/services/cleaning",
    icon: "🧹"
  },
  {
    title: "Plant Hire",
    description: "TLBs, tipper trucks, water carts, excavators, bulldozers, and generators available for hire.",
    image: "/images/services/plant-hire.webp",
    href: "/services/plant-hire",
    icon: "🚜"
  }
]

Requirements:
- Section heading: "Our Services" (h2) with "We Provide Best Services" subtitle
- 4-column grid on desktop (xl), 2-column on tablet (md), 1-column on mobile
- Each card uses the Starwind Card component
- Card structure: image (top, aspect-video, object-cover) → icon + title → description → "Learn More →" link
- Card has hover effect: subtle lift (translate-y) and shadow increase
- All images use loading="lazy"
- All images have descriptive alt text
- data-animate attribute on each card for scroll animation
- Section background: light grey (bg-muted or similar)

Output the complete ServicesGrid.astro file.
```

---

### 🤖 AI Prompt — ContactCTA Section

```
Build a reusable ContactCTA section component for an Astro v6 website.
This component is used at the bottom of every interior page.

File: src/components/sections/ContactCTA.astro

Content:
- Headline: "Ready to Start Your Project?"
- Subtext: "Contact us today for a free quote. Our team is ready to help."
- Phone: 012 655 0284 (tel: +27126550284)
- CTA button: "Request a Quote" → /contact?ref=cta-banner

Requirements:
- Full-width section, primary brand background (#2596be), white text
- Headline is h2 (not h1)
- Phone number is a real <a href="tel:+27126550284"> link
- Button uses Starwind Button component, variant that contrasts on primary background
- Responsive: stacks vertically on mobile, side-by-side on desktop
- data-animate on the content block

Output the complete ContactCTA.astro file.
```

---

### ✅ Phase 2 Checkpoint

- [ ] All home sections render at 375px, 768px, 1440px — no overflow or layout breaks
- [ ] Hero image loads eagerly — check Network tab: hero image is NOT lazy
- [ ] Stat counters animate on scroll — verify by scrolling down slowly
- [ ] Portfolio lightbox opens and closes correctly
- [ ] All "Request a Quote" CTAs link to correct URLs with `ref` params
- [ ] "Our Services" cards all link to correct service pages
- [ ] No placeholder images — all images are real WebP files
- [ ] No lorem ipsum — all copy is real client content
- [ ] No console errors
- [ ] Lighthouse Performance > 85 on home page (`bunx lighthouse http://localhost:4321 --view`)

### 📦 Phase 2 Commit

```bash
git add .
git commit -m "feat: build home page — hero, trust bar, services, about snapshot, portfolio, CTA"
git push origin feature/home-page
# Then open PR to main and merge
```

---

## Phase 3 — About Page

**Goal:** A credible, B2B-grade about page with verified company information, real team members, and downloadable credentials.

**Branch:** `feature/about-page`

> **Content blocker:** Updated company copy, team headshots, and credential details required from client before building.

---

### Tasks

#### 3.1 Build `PageHeader.astro`

Reusable page header used on all interior pages:

```
src/components/sections/PageHeader.astro
```

```astro
---
import { Breadcrumb } from '@/components/starwind/breadcrumb';

interface Props {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
  bgImage?: string;
}
const { title, subtitle, breadcrumbs, bgImage } = Astro.props;
---
<div class="relative bg-secondary text-white py-16 px-4">
  {bgImage && (
    <img src={bgImage} alt="" aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
  )}
  <div class="relative container mx-auto text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
    {subtitle && <p class="text-lg text-white/80 mb-6">{subtitle}</p>}
    <Breadcrumb items={breadcrumbs} class="justify-center" />
  </div>
</div>
```

#### 3.2 Build `about.astro`

Sections in order:

1. `PageHeader` — "About Us" · breadcrumb: Home → About
2. **Company Story** — 2-column: copy (left) + real photo (right)
3. **Vision, Mission & Values** — 3-column card row
4. **Stats** — reuse `StatsCounter.astro`
5. **Credentials Block** — CIDB, BBBEE, Reg No., certifications using `Badge` components + download links
6. **Team Grid** — cards with `Avatar`, name, title, bio
7. `ContactCTA`

#### 3.3 Credentials Block

```astro
<!-- Credentials — populate from client questionnaire Q1–Q6 -->
<section class="py-16 bg-muted">
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold mb-8 text-center">Our Credentials</h2>
    <div class="flex flex-wrap gap-3 justify-center mb-8">
      <Badge variant="outline">CIDB: Grade [X] — Reg No. [XXXXXXX]</Badge>
      <Badge variant="outline">BBBEE Level [X]</Badge>
      <Badge variant="outline">Company Reg: [XXXXXXXXXX]</Badge>
      <Badge variant="outline">VAT: [XXXXXXXXXX]</Badge>
      <Badge variant="outline">Established 2015</Badge>
    </div>
    <div class="flex flex-wrap gap-4 justify-center">
      <a href="/docs/company-profile.pdf" download
        class="starwind-button starwind-button-outline">
        📄 Download Company Profile
      </a>
      <a href="/docs/bbbee-certificate.pdf" download
        class="starwind-button starwind-button-outline">
        📄 Download BBBEE Certificate
      </a>
      <a href="/docs/cidb-certificate.pdf" download
        class="starwind-button starwind-button-outline">
        📄 Download CIDB Certificate
      </a>
    </div>
  </div>
</section>
```

---

### 🤖 AI Prompt — About Page

```
Build the complete About page for an Astro v6 + Starwind UI + Tailwind CSS v4 website.

File: src/pages/about.astro
Layout: src/layouts/shared.astro

Company: Phehlwana Group Investments
Founded: 2015
Location: Montana Park, Pretoria, Gauteng

Page sections in this exact order:

1. PageHeader component (src/components/sections/PageHeader.astro)
   title="About Us"
   breadcrumbs=[{ label: "Home", href: "/" }, { label: "About Us" }]

2. Company Story — two-column section
   Left: heading "About Phehlwana Group Investments" then 2–3 paragraphs using this copy:
   [PASTE CLIENT COPY FROM QUESTIONNAIRE Q21 AND Q23 HERE]
   Right: <img src="/images/about/company-photo.webp" alt="Phehlwana Group team" loading="lazy">

3. Vision, Mission & Values — 3 Starwind Cards in a row
   Card 1: Icon 👁️  Title "Our Vision"   Body: [CLIENT VISION FROM Q24]
   Card 2: Icon 🎯  Title "Our Mission"  Body: [CLIENT MISSION FROM Q25]
   Card 3: Icon 💎  Title "Our Values"   Body: bullet list from [Q26]

4. Stats counters (reuse StatsCounter.astro component)

5. Credentials block with Badge components and PDF download links:
   CIDB Grade, BBBEE Level, Company Reg No., VAT No.
   Download links for: Company Profile PDF, BBBEE Certificate, CIDB Certificate

6. Management team grid — 3 columns desktop, 2 tablet, 1 mobile
   Each card: Avatar image, name (h3), job title, 2-sentence bio
   Team members: [PASTE TEAM DATA FROM QUESTIONNAIRE Q45]

7. ContactCTA component (src/components/sections/ContactCTA.astro)

Requirements:
- export const prerender = true
- One <h1> only (in PageHeader)
- All team photos: /images/team/[firstname-lastname].webp, loading="lazy"
- All Starwind components imported from @/components/starwind/
- Scroll animations: data-animate on each section wrapper
- No lorem ipsum — use real copy throughout

Output the complete about.astro page file and any new sub-components needed.
```

---

### 👥 Coworker Task — Team Cards

The coworker can build individual team member card markup once headshots and bios are received from the client. Branch from `feature/about-page`:

```bash
git checkout -b feature/team-cards-cw
```

Deliver as a `TeamCard.astro` component using Starwind `Card` + `Avatar`.

---

### ✅ Phase 3 Checkpoint

- [ ] All copy is real — no lorem ipsum
- [ ] All team members are real — no placeholder names
- [ ] CIDB and BBBEE values match client-supplied credentials
- [ ] All 3 PDF files exist in `public/docs/` and download correctly when link is clicked
- [ ] Breadcrumb correct: Home → About Us
- [ ] Vision, Mission, Values cards all populated from client
- [ ] Stats counters animate on scroll
- [ ] Page fully responsive at all breakpoints
- [ ] No console errors

### 📦 Phase 3 Commit

```bash
git add .
git commit -m "feat: build about page — company story, credentials, team, vision/mission"
git push origin feature/about-page
# Open PR to main and merge
```

---

## Phase 4 — Services Pages

**Goal:** Services overview plus 4 individual pages — each with detailed, real content, working quote CTAs, and Accordion sub-sections.

**Branch:** `feature/services`

---

### Tasks

#### 4.1 Build `ServiceLayout.astro`

Shared layout for all individual service pages — avoid repeating the shell 4 times:

```
src/layouts/ServiceLayout.astro
```

```astro
---
import SharedLayout from '@/layouts/shared.astro';
import PageHeader from '@/components/sections/PageHeader.astro';
import ContactCTA from '@/components/sections/ContactCTA.astro';

interface Props {
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  parentLabel?: string;
}
const {
  title, description, heroImage, heroAlt,
  parentLabel = 'Services'
} = Astro.props;

export const prerender = true;
---
<SharedLayout {title} {description}>
  <PageHeader
    {title}
    bgImage={heroImage}
    breadcrumbs={[
      { label: 'Home', href: '/' },
      { label: parentLabel, href: '/services' },
      { label: title },
    ]}
  />
  <main class="container mx-auto px-4 py-12 max-w-4xl">
    <slot />
  </main>
  <ContactCTA />
</SharedLayout>
```

#### 4.2 Build `services/index.astro` — Overview Page

Large 2×2 card grid. Each card contains:
- Real service photo
- Icon + service title (`<h2>`)
- 3-sentence description
- Sub-service list (3–4 bullet points)
- "Learn More →" link

#### 4.3 Build `services/construction.astro`

Use `ServiceLayout`. Content in `Accordion` groups:
- General Building & Construction
- Renovations & Remodeling
- Road Construction & Maintenance
- Road Safety Management

Inline quote CTA: `/contact?service=Construction+%26+Civil+Engineering`

#### 4.4 Build `services/mechanical.astro`

Accordion items: Design & Development · Manufacturing · Maintenance & Reliability · System Analysis · Installation & Commissioning

#### 4.5 Build `services/cleaning.astro`

Two Accordion groups:
- **Cleaning Services:** Commercial, Industrial, Hygiene & Sanitation, Specialised, Hazmat
- **Waste Management:** Collection, Recycling, Hazardous Waste, Organic Waste, Landfill

#### 4.6 Build `services/plant-hire.astro`

Equipment grid — photo + name + brief description for each item.
Confirmed equipment from client (Q20): TLB, Water Carts, Tipper Trucks, Excavators, Bulldozers, Generators, Tools.

---

### 🤖 AI Prompt — Services Overview Page

```
Build the Services overview page for an Astro v6 + Starwind UI + Tailwind CSS v4 website.

File: src/pages/services/index.astro
Layout: src/layouts/shared.astro

Page meta:
  title: "Our Services"
  description: "Phehlwana Group offers construction & civil engineering, mechanical 
  engineering, cleaning & waste management, and plant hire services across Pretoria 
  and Gauteng."

Services data:
[
  {
    title: "Construction & Civil Engineering",
    description: "From new builds to road construction and safety management, we deliver 
    quality construction across Pretoria and Gauteng.",
    subServices: ["General Building", "Road Construction", "Road Maintenance", "Safety Management"],
    image: "/images/services/construction-civil-engineering.webp",
    href: "/services/construction",
    icon: "🏗️"
  },
  {
    title: "Mechanical Engineering",
    description: "Professional mechanical engineering including design, manufacturing, 
    maintenance, and commissioning of systems and machinery.",
    subServices: ["Design & Development", "Maintenance", "System Analysis", "Commissioning"],
    image: "/images/services/mechanical-engineering.webp",
    href: "/services/mechanical",
    icon: "⚙️"
  },
  {
    title: "Cleaning & Waste Management",
    description: "Commercial, industrial, and specialised cleaning alongside comprehensive 
    waste collection, recycling, and disposal services.",
    subServices: ["Commercial Cleaning", "Industrial Cleaning", "Waste Collection", "Recycling"],
    image: "/images/services/cleaning-waste-management.webp",
    href: "/services/cleaning",
    icon: "🧹"
  },
  {
    title: "Plant Hire",
    description: "Rent TLBs, tipper trucks, water carts, excavators, bulldozers, and 
    generators for your construction or landscaping project.",
    subServices: ["TLB", "Tipper Trucks", "Water Carts", "Excavators", "Generators"],
    image: "/images/services/plant-hire.webp",
    href: "/services/plant-hire",
    icon: "🚜"
  }
]

Page structure:
1. PageHeader — title "Our Services", breadcrumb Home → Services
2. Intro paragraph: "At Phehlwana Group, we are committed to delivering excellence 
   across every service we provide. Choosing us means partnering with a company 
   built on integrity, efficiency, and a passion for quality."
3. 2×2 card grid (on xl) — large cards with image (top), icon + title, description, 
   sub-service list, "Learn More →" link button
4. "Why Choose Phehlwana Group" — 3 differentiator blocks (reuse WhyUs.astro if possible)
5. ContactCTA component

Requirements:
- export const prerender = true
- data-animate on each card
- All images loading="lazy"
- All hrefs are real paths
- No lorem ipsum

Output the complete services/index.astro file.
```

---

### 🤖 AI Prompt — Individual Service Page (Construction)

```
Build the Construction & Civil Engineering service page for an Astro v6 + Starwind UI website.

File: src/pages/services/construction.astro
Layout: src/layouts/ServiceLayout.astro

Page meta:
  title: "Construction & Civil Engineering"
  description: "General building construction, renovations, road construction, road 
  maintenance and road safety management services in Pretoria and Gauteng — 
  Phehlwana Group Investments."
  heroImage: "/images/services/construction-civil-engineering.webp"
  heroAlt: "Phehlwana Group construction site in Pretoria, Gauteng"

Page content (inside the ServiceLayout slot):

1. Intro paragraph (2–3 sentences about the service)

2. Two Accordion groups using Starwind Accordion:

   Group 1: "General Building & Construction"
   Accordion items:
   - New Builds: Constructing houses, offices, factories, schools, clinics, and other facilities
   - Renovations & Remodeling: Updating kitchens, bathrooms, and entire spaces, including adding or removing walls, partitions, and mezzanines
   - Structural Work: Foundations, brickwork, concrete, steel installations, and structural repairs
   - Finishes & Interiors: Painting, tiling, ceilings, plastering, drywalling, built-in cupboards, and internal fit-outs
   - Specialized Trades: Electrical installations, plumbing, drainage, waterproofing, and carpentry
   - External Works: Roofing, gutter installation, landscaping, and retaining walls
   - Maintenance & Repairs: General upkeep, roof repairs, plumbing emergencies, and facility maintenance

   Group 2: "Road Construction & Safety Management"
   Accordion items:
   - Surface Treatment: Asphalt paving, resurfacing, and road surface treatments
   - Civil Works: General road construction including tar road maintenance and repair
   - Preventive Maintenance: Routine inspections, repairing cracks, and pothole filling
   - Drainage & Vegetation Control: Maintaining drainage systems and managing roadside vegetation
   - Work Zone Safety: Cones, barriers, and median separators to protect workers
   - Traffic Control: Flagging operations, reduced speed limits, and signage
   - Worker Protection: PPE enforcement including high-visibility clothing and hard hats
   - Audits and Inspections: Road safety audits (RSA) and blackspot identification

3. Inline quote CTA box:
   Background: muted/light grey
   Heading: "Need a Construction Quote?"
   Button: "Request a Quote" → /contact?service=Construction+%26+Civil+Engineering

Requirements:
- export const prerender = true
- All Starwind Accordion components imported from @/components/starwind/accordion
- data-animate on each major section
- No lorem ipsum

Output the complete services/construction.astro file.
```

---

### 👥 Coworker Tasks — Parallel Service Pages

Once `ServiceLayout.astro` and `services/construction.astro` are merged, the coworker can build the remaining 3 service pages in parallel:

```bash
git checkout feature/services
git checkout -b feature/services-mechanical-cleaning-cw
```

Build: `services/mechanical.astro`, `services/cleaning.astro`, `services/plant-hire.astro`

Use the same pattern as `construction.astro`. Content is in the current `service.html` of the old site.

---

### ✅ Phase 4 Checkpoint

- [ ] All 5 service pages render without errors
- [ ] "Learn More" links on services overview all resolve to correct pages
- [ ] All "Request a Quote" CTAs pre-populate service in contact form
- [ ] Accordion expand/collapse works on all service pages
- [ ] Breadcrumbs correct on all pages: Home → Services → [Service Name]
- [ ] All images are real WebP files — no `blog-1.png` placeholders
- [ ] `ServiceLayout.astro` used on all 4 individual service pages (no repeated boilerplate)
- [ ] Fully responsive at all breakpoints
- [ ] No console errors

### 📦 Phase 4 Commit

```bash
git add .
git commit -m "feat: build services overview and 4 individual service pages with accordion"
git push origin feature/services
# Open PR to main and merge
```

---

## Phase 5 — Projects Portfolio

**Goal:** A filterable portfolio grid powered by Astro Content Collections. Real project photos and descriptions only. No placeholder projects committed at any point.

**Branch:** `feature/projects`

> **Content blocker:** Minimum 6 real project photos + descriptions required from client (Q37) before this page goes live. If content is delayed, deploy the page with a "Portfolio coming soon" message and add projects as they arrive.

---

### Tasks

#### 5.1 Add Project MDX Files

Create one MDX file per project in `src/content/projects/`. Minimum 6, ideally 10–12:

```mdx
---
# src/content/projects/project-01-pkn-office-renovation.mdx
title: "PKN Office Park Renovation"
client: "PKN Properties"
location: "Montana Park, Pretoria"
year: 2024
category: "Construction"
coverImage: "/images/projects/project-01-pkn-office.webp"
images:
  - "/images/projects/project-01-pkn-office-a.webp"
  - "/images/projects/project-01-pkn-office-b.webp"
featured: true
published: true
---

Full interior renovation of a 6-unit commercial office park including structural 
repairs, tiling, painting, ceiling work, and electrical upgrades completed over 
8 weeks within budget.
```

#### 5.2 Add Project Images

Convert all project photos to WebP (use https://squoosh.app if needed):

```
public/images/projects/
  project-01-[name].webp       # Cover — 800×600px
  project-01-[name]-a.webp     # Additional — 1200×800px
  project-01-[name]-b.webp
  ...
```

#### 5.3 Build `projects.astro`

```
src/pages/projects.astro
```

```astro
---
import SharedLayout from '@/layouts/shared.astro';
import PageHeader from '@/components/sections/PageHeader.astro';
import ContactCTA from '@/components/sections/ContactCTA.astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const allProjects = await getCollection('projects', ({ data }) => data.published);
const sorted = allProjects.sort((a, b) => b.data.year - a.data.year);
const categories = ['All', 'Construction', 'Mechanical', 'Cleaning', 'Plant Hire', 'Road'];
---

<SharedLayout
  title="Our Projects"
  description="Browse completed construction, civil engineering, and maintenance projects 
  by Phehlwana Group Investments across Pretoria and Gauteng."
>
  <PageHeader
    title="Our Projects"
    subtitle="Quality work delivered across Pretoria and Gauteng since 2015"
    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
  />

  <!-- Category filter -->
  <section class="py-8 bg-background border-b">
    <div class="container mx-auto px-4 flex flex-wrap gap-3 justify-center">
      {categories.map(cat => (
        <button
          data-filter-btn={cat.toLowerCase()}
          class="starwind-button starwind-button-outline text-sm px-4 py-2
                 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          data-active={cat === 'All' ? 'true' : 'false'}
        >
          {cat}
        </button>
      ))}
    </div>
  </section>

  <!-- Projects grid -->
  <section class="py-16 bg-muted">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-grid">
        {sorted.map(project => (
          <div
            data-project-card
            data-category={project.data.category.toLowerCase()}
            data-animate
            class="group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-lg bg-card shadow-md 
                        hover:shadow-xl transition-shadow duration-300">
              <div class="aspect-video overflow-hidden">
                <img
                  src={project.data.coverImage}
                  alt={`${project.data.title} — ${project.data.location}`}
                  loading="lazy"
                  class="w-full h-full object-cover 
                         group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                  <span class="starwind-badge starwind-badge-secondary text-xs">
                    {project.data.category}
                  </span>
                  <span class="text-sm text-muted-foreground">{project.data.year}</span>
                </div>
                <h3 class="font-semibold text-lg mb-1">{project.data.title}</h3>
                <p class="text-sm text-muted-foreground">📍 {project.data.location}</p>
                {project.data.client && (
                  <p class="text-sm text-muted-foreground mt-1">
                    Client: {project.data.client}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <!-- Empty state -->
      <div id="no-results" class="hidden text-center py-16 text-muted-foreground">
        <p class="text-lg">No projects found in this category yet.</p>
      </div>
    </div>
  </section>

  <ContactCTA />
</SharedLayout>
```

#### 5.4 Portfolio Filter Script

```js
// src/scripts/portfolio-filter.js
(function () {
  const buttons = document.querySelectorAll('[data-filter-btn]');
  const cards   = document.querySelectorAll('[data-project-card]');
  const noResults = document.getElementById('no-results');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filterBtn;

      // Update active state on buttons
      buttons.forEach(b => b.dataset.active = 'false');
      btn.dataset.active = 'true';

      // Show/hide cards
      let visible = 0;
      cards.forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.style.display = match ? 'block' : 'none';
        if (match) visible++;
      });

      // Show empty state if no matches
      if (noResults) noResults.classList.toggle('hidden', visible > 0);
    });
  });
})();
```

Add to `projects.astro` before closing body (or use `<script src="/scripts/portfolio-filter.js">` in the page).

---

### 🤖 AI Prompt — Projects Page

```
Build the complete Projects portfolio page for an Astro v6 + Tailwind CSS v4 website 
using Astro Content Collections.

File: src/pages/projects.astro
Layout: src/layouts/shared.astro

Company: Phehlwana Group Investments — construction company, Pretoria, Gauteng

Page meta:
  title: "Our Projects"
  description: "Browse completed construction, civil engineering, and maintenance 
  projects by Phehlwana Group Investments across Pretoria and Gauteng."

Requirements:
- export const prerender = true
- Import projects from content collection using getCollection('projects')
- Filter to published: true projects only
- Sort by year descending (newest first)
- Category filter buttons: All | Construction | Mechanical | Cleaning | Plant Hire | Road
  - Active button has primary background colour
  - Filter is vanilla JS only — no framework
  - Show empty state message when category has no projects
- Project grid: 3 columns desktop (lg), 2 tablet (md), 1 mobile
- Each project card:
    - Cover image (aspect-video, object-cover, loading="lazy", scale on hover)
    - Category Badge (top-left overlay or below image)
    - Project year (top-right)
    - Project title (h3, font-semibold)
    - Location with 📍 icon
    - Client name (if data.client exists)
    - Hover: card lifts with shadow increase
- data-animate on each card (staggered if possible)
- PageHeader component at top: "Our Projects"
  breadcrumb: Home → Our Projects
- ContactCTA component at bottom
- No lorem ipsum

Output the complete projects.astro file and the vanilla JS filter script 
as src/scripts/portfolio-filter.js.
```

---

### 🤖 AI Prompt — Project MDX Files

```
I am adding real project data to the Astro Content Collection at src/content/projects/.

The collection schema is:
{
  title: string
  client?: string
  location: string
  year: number
  category: 'Construction' | 'Mechanical' | 'Cleaning' | 'Plant Hire' | 'Road'
  coverImage: string        // path under /images/projects/
  images?: string[]         // additional photo paths
  featured: boolean
  published: boolean
}

Here are the project details from the client:
[PASTE PROJECT DATA FROM QUESTIONNAIRE Q37 HERE]

For each project:
1. Generate a valid MDX filename using this format: project-0N-[kebab-case-title].mdx
2. Write the complete frontmatter with all available fields
3. Write a 2–3 sentence project description body (factual, no filler language)
4. Suggest the coverImage path following this convention:
   /images/projects/project-0N-[kebab-case-title].webp

Output all MDX files, one after another, clearly separated.
```

---

### ✅ Phase 5 Checkpoint

- [ ] Minimum 6 published projects in `src/content/projects/`
- [ ] All project images exist at their declared `coverImage` paths
- [ ] Category filter works — clicking each category shows correct projects
- [ ] "All" filter shows all published projects
- [ ] Empty state message shows when a category has 0 projects
- [ ] Breadcrumb correct: Home → Our Projects
- [ ] All project images use `loading="lazy"` and have descriptive `alt` text
- [ ] No placeholder projects, no lorem ipsum descriptions
- [ ] Page fully responsive
- [ ] No TypeScript errors in content collection (`bun run check`)
- [ ] No console errors

### 📦 Phase 5 Commit

```bash
git add .
git commit -m "feat: build projects portfolio with content collection and category filter"
git push origin feature/projects
# Open PR to main and merge
```

---

## Phase 6 — Contact, Email & Utility Pages

**Goal:** A fully working contact system — Astro Server Action sends email via Resend using a React Email template. Thank-you page loads on success. 404 page is branded. The old FormSubmit.co dependency is gone entirely.

**Branch:** `feature/contact`

---

### Tasks

#### 6.1 Set Up Resend Domain

Before any email can be sent from `@phehlwanagroup.co.za`:

1. Log in to https://resend.com → Domains → Add Domain
2. Enter `phehlwanagroup.co.za` → choose the closest region (e.g. EU for South Africa)
3. Add the DKIM, SPF, and DMARC DNS records at the domain registrar
4. Click "Verify DNS Records" — wait for status to show "Verified"
5. Create an API Key → copy it into `.env.local` as `RESEND_API_KEY`
6. Set `FROM_EMAIL=noreply@phehlwanagroup.co.za` in `.env.local`

> In development you can use `onboarding@resend.dev` as `FROM_EMAIL` and your own email as `TO_EMAIL` to test without a verified domain.

#### 6.2 Build React Email Template — Enquiry Notification

This is the email that arrives in `info@phehlwanagroup.co.za` when someone submits the contact form.

```tsx
// src/emails/EnquiryNotification.tsx
import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Row, Column, Preview,
  Tailwind,
} from '@react-email/components';

interface Props {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  submittedAt: string;
}

export default function EnquiryNotification({
  name,
  email,
  phone,
  service,
  message,
  submittedAt,
}: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New enquiry from {name} via phehlwanagroup.co.za</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-8 max-w-xl bg-white rounded-lg overflow-hidden shadow">

            {/* Header */}
            <Section className="bg-[#2596be] px-8 py-6">
              <Heading className="text-white text-2xl font-bold m-0">
                New Website Enquiry
              </Heading>
              <Text className="text-white/80 text-sm m-0 mt-1">
                Phehlwana Group Investments — phehlwanagroup.co.za
              </Text>
            </Section>

            {/* Body */}
            <Section className="px-8 py-6">
              <Row>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">From</Text>
                  <Text className="text-gray-900 font-semibold text-base m-0 mt-1">{name}</Text>
                </Column>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">Email</Text>
                  <Text className="text-gray-900 text-base m-0 mt-1">{email}</Text>
                </Column>
              </Row>

              <Hr className="my-4 border-gray-200" />

              <Row>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">Phone</Text>
                  <Text className="text-gray-900 text-base m-0 mt-1">{phone || 'Not provided'}</Text>
                </Column>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">Service Required</Text>
                  <Text className="text-gray-900 text-base m-0 mt-1">{service || 'Not specified'}</Text>
                </Column>
              </Row>

              <Hr className="my-4 border-gray-200" />

              <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">Message</Text>
              <Text className="text-gray-900 text-base m-0 mt-2 whitespace-pre-wrap">{message}</Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <Text className="text-gray-400 text-xs m-0">
                Submitted {submittedAt} via phehlwanagroup.co.za
              </Text>
              <Text className="text-gray-400 text-xs m-0 mt-1">
                Reply directly to this email to respond to {name}.
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

#### 6.3 Build React Email Template — Auto-Reply to Sender

This email goes to the person who submitted the form, confirming receipt.

```tsx
// src/emails/EnquiryAutoReply.tsx
import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Button, Preview, Tailwind,
} from '@react-email/components';

interface Props {
  name: string;
}

export default function EnquiryAutoReply({ name }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>We received your enquiry — Phehlwana Group Investments</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-8 max-w-xl bg-white rounded-lg overflow-hidden shadow">

            <Section className="bg-[#2596be] px-8 py-6">
              <Heading className="text-white text-2xl font-bold m-0">
                Thank You, {name}!
              </Heading>
              <Text className="text-white/80 text-sm m-0 mt-1">
                Phehlwana Group Investments
              </Text>
            </Section>

            <Section className="px-8 py-6">
              <Text className="text-gray-700 text-base">
                Thank you for reaching out to Phehlwana Group Investments. We have received 
                your enquiry and a member of our team will contact you within 1 business day.
              </Text>
              <Text className="text-gray-700 text-base">
                In the meantime, feel free to browse our services or view our completed projects.
              </Text>

              <Button
                href="https://phehlwanagroup.co.za/services"
                className="bg-[#2596be] text-white rounded px-6 py-3 font-semibold text-sm"
              >
                View Our Services
              </Button>
            </Section>

            <Hr className="border-gray-200" />

            <Section className="px-8 py-4 bg-gray-50">
              <Text className="text-gray-500 text-xs m-0">
                📍 Office No 06, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
              </Text>
              <Text className="text-gray-500 text-xs m-0 mt-1">
                📞 012 655 0284 &nbsp;|&nbsp; ✉️ info@phehlwanagroup.co.za
              </Text>
              <Text className="text-gray-400 text-xs m-0 mt-3">
                You are receiving this email because you submitted an enquiry on phehlwanagroup.co.za.
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

#### 6.4 Build Astro Server Action

```ts
// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import EnquiryNotification from '@/emails/EnquiryNotification';
import EnquiryAutoReply from '@/emails/EnquiryAutoReply';
import { RESEND_API_KEY, FROM_EMAIL, TO_EMAIL } from 'astro:env/server';

const resend = new Resend(RESEND_API_KEY);

export const server = {
  sendEnquiry: defineAction({
    accept: 'form',
    input: z.object({
      name:    z.string().min(2, 'Name must be at least 2 characters'),
      email:   z.string().email('Please enter a valid email address'),
      phone:   z.string().optional(),
      service: z.string().optional(),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    }),
    handler: async (input) => {
      const submittedAt = new Date().toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      // Render email templates to HTML
      const notificationHtml = await render(
        EnquiryNotification({ ...input, submittedAt })
      );
      const autoReplyHtml = await render(
        EnquiryAutoReply({ name: input.name })
      );

      // Send notification to Phehlwana Group
      const { error: notifyError } = await resend.emails.send({
        from: `Phehlwana Group Website <${FROM_EMAIL}>`,
        to:   [TO_EMAIL],
        replyTo: input.email,
        subject: `New Enquiry from ${input.name}${input.service ? ` — ${input.service}` : ''}`,
        html: notificationHtml,
      });

      if (notifyError) {
        console.error('Resend notification error:', notifyError);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send enquiry. Please call us directly on 012 655 0284.',
        });
      }

      // Send auto-reply to the enquirer
      await resend.emails.send({
        from: `Phehlwana Group Investments <${FROM_EMAIL}>`,
        to:   [input.email],
        subject: 'We received your enquiry — Phehlwana Group Investments',
        html: autoReplyHtml,
      });

      return { success: true };
    },
  }),
};
```

#### 6.5 Build `ContactForm.astro`

```astro
---
// src/components/sections/ContactForm.astro
import { actions } from 'astro:actions';

const result = Astro.getActionResult(actions.sendEnquiry);
const service = Astro.url.searchParams.get('service') ?? '';

// If successful, redirect to thank-you
if (result?.data?.success) {
  return Astro.redirect('/thank-you');
}
---

{result?.error && (
  <div class="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20"
       role="alert">
    <p class="font-medium">Something went wrong</p>
    <p class="text-sm mt-1">{result.error.message}</p>
  </div>
)}

<form method="POST" action={actions.sendEnquiry} class="grid gap-5" novalidate>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="grid gap-1.5">
      <label for="name" class="text-sm font-medium">
        Full Name <span class="text-destructive" aria-hidden="true">*</span>
      </label>
      <input
        type="text" id="name" name="name" required
        placeholder="Your full name"
        class="starwind-input"
        value={result?.error?.fields?.name ?? ''}
      />
    </div>

    <div class="grid gap-1.5">
      <label for="email" class="text-sm font-medium">
        Email Address <span class="text-destructive" aria-hidden="true">*</span>
      </label>
      <input
        type="email" id="email" name="email" required
        placeholder="your@email.com"
        class="starwind-input"
        value={result?.error?.fields?.email ?? ''}
      />
    </div>

    <div class="grid gap-1.5">
      <label for="phone" class="text-sm font-medium">Phone Number</label>
      <input
        type="tel" id="phone" name="phone"
        placeholder="012 655 0284"
        class="starwind-input"
        value={result?.error?.fields?.phone ?? ''}
      />
    </div>

    <div class="grid gap-1.5">
      <label for="service" class="text-sm font-medium">Service Required</label>
      <input
        type="text" id="service" name="service"
        placeholder="e.g. Plant Hire, Construction"
        class="starwind-input"
        value={service || (result?.error?.fields?.service ?? '')}
      />
    </div>
  </div>

  <div class="grid gap-1.5">
    <label for="message" class="text-sm font-medium">
      Message <span class="text-destructive" aria-hidden="true">*</span>
    </label>
    <textarea
      id="message" name="message" required rows="5"
      placeholder="Tell us about your project..."
      class="starwind-textarea"
    >{result?.error?.fields?.message ?? ''}</textarea>
  </div>

  <button type="submit"
    class="starwind-button starwind-button-primary w-full sm:w-auto sm:px-10">
    Send Message
  </button>

</form>
```

#### 6.6 Build `contact.astro`

```
src/pages/contact.astro
```

This page needs SSR for the server action to work:

```astro
---
// IMPORTANT: Do NOT set prerender = true here — this page needs SSR for the form action
import SharedLayout from '@/layouts/shared.astro';
import PageHeader from '@/components/sections/PageHeader.astro';
import ContactForm from '@/components/sections/ContactForm.astro';
---
<SharedLayout
  title="Contact Us"
  description="Contact Phehlwana Group Investments — call 012 655 0284, email 
  info@phehlwanagroup.co.za, or fill in our enquiry form. Office in Montana Park, Pretoria."
>
  <PageHeader
    title="Contact Us"
    subtitle="We're here to help. Get in touch for a free quote."
    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
  />

  <section class="py-16 bg-background">
    <div class="container mx-auto px-4">

      <!-- Contact info cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {[
          { icon: '📍', title: 'Address',   text: 'Office No 06, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182' },
          { icon: '📞', title: 'Phone',     text: '012 655 0284', href: 'tel:+27126550284' },
          { icon: '✉️', title: 'Email',     text: 'info@phehlwanagroup.co.za', href: 'mailto:info@phehlwanagroup.co.za' },
          { icon: '💬', title: 'WhatsApp',  text: '079 294 7635', href: 'https://wa.me/27792947635' },
        ].map(item => (
          <div class="p-6 bg-muted rounded-lg text-center" data-animate>
            <div class="text-3xl mb-3">{item.icon}</div>
            <h3 class="font-semibold mb-1">{item.title}</h3>
            {item.href
              ? <a href={item.href} class="text-sm text-primary hover:underline">{item.text}</a>
              : <p class="text-sm text-muted-foreground">{item.text}</p>
            }
          </div>
        ))}
      </div>

      <!-- Form + Map -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div data-animate>
          <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>
        <div data-animate>
          <h2 class="text-2xl font-bold mb-6">Find Us</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.762599447415!2d28.2720771750622!3d-25.679163242796296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfdfb60cc92eaf%3A0xeba42ca9ede1cd67!2sPKN%20Office%20Park!5e0!3m2!1sen!2sza!4v1768891930905!5m2!1sen!2sza"
            width="100%" height="400"
            class="rounded-lg border"
            style="border:0;"
            allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Phehlwana Group Investments office location — PKN Office Park, Montana Park, Pretoria"
          ></iframe>
          <div class="mt-4 p-4 bg-muted rounded-lg">
            <p class="text-sm font-medium">Business Hours</p>
            <p class="text-sm text-muted-foreground mt-1">Monday – Friday: 08:00 – 17:00</p>
            <p class="text-sm text-muted-foreground">Saturday – Sunday: Closed</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</SharedLayout>
```

#### 6.7 Build `thank-you.astro`

```astro
---
// src/pages/thank-you.astro
import SharedLayout from '@/layouts/shared.astro';
export const prerender = true;
---
<SharedLayout
  title="Message Sent"
  description="Thank you for contacting Phehlwana Group Investments."
>
  <section class="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-20">
    <div class="text-6xl mb-6" aria-hidden="true">✅</div>
    <h1 class="text-3xl font-bold mb-4">Message Received!</h1>
    <p class="text-muted-foreground mb-2 max-w-md text-lg">
      Thank you for reaching out to Phehlwana Group Investments.
    </p>
    <p class="text-muted-foreground mb-10 max-w-md">
      A member of our team will contact you within <strong>1 business day</strong>. 
      Check your inbox — we've sent you a confirmation email.
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <a href="/" class="starwind-button starwind-button-primary">Back to Home</a>
      <a href="/services" class="starwind-button starwind-button-outline">View Our Services</a>
      <a href="/projects" class="starwind-button starwind-button-outline">See Our Projects</a>
    </div>
  </section>
</SharedLayout>
```

#### 6.8 Build `404.astro`

```astro
---
// src/pages/404.astro
import SharedLayout from '@/layouts/shared.astro';
export const prerender = true;
---
<SharedLayout
  title="Page Not Found"
  description="This page does not exist — Phehlwana Group Investments."
>
  <section class="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-20">
    <p class="text-8xl font-black text-primary mb-4" aria-hidden="true">404</p>
    <h1 class="text-2xl font-bold mb-3">Page Not Found</h1>
    <p class="text-muted-foreground mb-10 max-w-sm">
      Sorry, we couldn't find the page you were looking for. It may have moved or no longer exists.
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <a href="/" class="starwind-button starwind-button-primary">Go to Home</a>
      <a href="/contact" class="starwind-button starwind-button-outline">Contact Us</a>
    </div>
  </section>
</SharedLayout>
```

---

### 🤖 AI Prompt — React Email Templates

```
Build two React Email templates for a South African construction company website 
(Phehlwana Group Investments) using @react-email/components and Tailwind.

Company brand colour: #2596be
Company website: https://phehlwanagroup.co.za
Company address: Office No 06, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
Company phone: 012 655 0284

Template 1: EnquiryNotification.tsx  (goes to info@phehlwanagroup.co.za)
Props: { name, email, phone?, service?, message, submittedAt }
Content:
- Header: branded primary blue background, "New Website Enquiry" heading
- Body: clean table layout showing name, email, phone, service required, message
- The reply-to header will be set to the enquirer's email address
- Footer: timestamp, "Reply directly to this email to respond"
- Professional, scannable layout — this is a business notification email

Template 2: EnquiryAutoReply.tsx  (goes to the person who submitted the form)
Props: { name }
Content:
- Header: branded primary blue background, "Thank You, {name}!"
- Body: friendly confirmation that their enquiry was received, response within 1 business day
- CTA button: "View Our Services" → https://phehlwanagroup.co.za/services
- Footer: company address, phone, email
- Unsubscribe-style note: "You received this because you submitted an enquiry on our website"

Requirements for both:
- Use @react-email/components (Html, Head, Body, Container, Section, Heading, Text, 
  Hr, Row, Column, Button, Preview, Tailwind)
- TypeScript with explicit Props interface
- Use Tailwind classes via the <Tailwind> wrapper
- Preview text must be descriptive
- Both files in src/emails/
- Export as default function

Output both complete .tsx files.
```

---

### 🤖 AI Prompt — Astro Server Action for Contact Form

```
Build an Astro Server Action that handles contact form submissions for 
Phehlwana Group Investments and sends emails via Resend.

File: src/actions/index.ts

Requirements:
- Use defineAction from 'astro:actions'
- Use z from 'astro:schema' for input validation
- Import Resend from 'resend'
- Import render from '@react-email/components'
- Import environment variables from 'astro:env/server':
    RESEND_API_KEY, FROM_EMAIL, TO_EMAIL
- Accept: 'form' (native form submission, no JS required)

Input schema (with validation messages):
- name:    string, min 2 chars
- email:   string, valid email
- phone:   string, optional
- service: string, optional  
- message: string, min 10 chars

Action logic:
1. Render EnquiryNotification template to HTML
2. Send notification email to TO_EMAIL with replyTo set to submitter's email
3. If Resend returns an error, throw ActionError with code INTERNAL_SERVER_ERROR
   and a user-friendly message referencing the phone number 012 655 0284
4. If notification succeeds, send EnquiryAutoReply to the submitter's email
   (auto-reply failure should not block success — wrap in try/catch, log only)
5. Return { success: true }

The submittedAt timestamp should use Africa/Johannesburg timezone.

Output the complete src/actions/index.ts file.
```

---

### 🤖 AI Prompt — Contact Form Component

```
Build a ContactForm Astro component that uses Astro Server Actions (not fetch, 
not FormSubmit.co) for a progressive enhancement contact form.

File: src/components/sections/ContactForm.astro

The server action is: actions.sendEnquiry (defined in src/actions/index.ts)
On success, redirect to /thank-you via Astro.redirect

Form fields:
- name (text, required)
- email (email, required)
- phone (tel, optional)
- service (text, optional — pre-populated from URL param ?service=)
- message (textarea, required, 5 rows)

Requirements:
- Use method="POST" action={actions.sendEnquiry} on the <form> tag
- On error, display the error message in a styled alert div with role="alert"
- On error, re-populate field values from result.error.fields so user does not retype
- Every field has a <label> with for attribute matching the input id
- Required fields show a red asterisk (aria-hidden="true")
- Use Starwind input classes (starwind-input, starwind-textarea)
- Submit button text: "Send Message" — full width on mobile, auto width on sm+
- novalidate on the form (server-side validation is the source of truth)
- Pre-populate service field from URL searchParam: Astro.url.searchParams.get('service')
- No fetch, no JavaScript for submission — works without JS (progressive enhancement)

Output the complete ContactForm.astro file.
```

---

### ✅ Phase 6 Checkpoint

- [ ] Resend domain `phehlwanagroup.co.za` is verified in Resend dashboard
- [ ] Test form submission with real email — notification arrives at `info@phehlwanagroup.co.za`
- [ ] Test auto-reply — confirmation email arrives at the submitter's address
- [ ] After successful submit, browser redirects to `/thank-you` page
- [ ] `/thank-you` page renders correctly
- [ ] Error state renders when form submitted with invalid data (test: empty name field)
- [ ] Field values are re-populated on validation error (user doesn't lose their input)
- [ ] Service field pre-populates from URL param (test: `/contact?service=Plant+Hire`)
- [ ] Google Maps iframe loads correctly on `/contact`
- [ ] `/404` page renders for any unknown URL
- [ ] No `<FormSubmit>` or `handler.php` references anywhere in the codebase
- [ ] Contact page does NOT have `export const prerender = true`
- [ ] `bun run build` — no TypeScript or build errors
- [ ] No console errors

### 📦 Phase 6 Commit

```bash
git add .
git commit -m "feat: build contact page, Resend email action, React Email templates, thank-you, 404"
git push origin feature/contact
# Open PR to main and merge
```

---

## Phase 7 — SEO & Analytics

**Goal:** Every page scores 100 for SEO on Lighthouse. GA4 is tracking real events. Google Search Console is verified. Schema validates. Sitemap is live.

**Branch:** `feature/seo-analytics`

---

### Tasks

#### 7.1 Audit All Page Meta Tags

Visit every page in the browser and inspect `<head>` to verify:

| Page | Title | Description |
|---|---|---|
| `/` | Phehlwana Group Investments \| Construction & Engineering Pretoria | Full 150-char description with location |
| `/about` | About Us \| Phehlwana Group Investments | Company + location |
| `/services` | Our Services \| Phehlwana Group Investments | Services summary with location |
| `/services/construction` | Construction & Civil Engineering \| Phehlwana Group | Service + Pretoria + Gauteng |
| `/services/mechanical` | Mechanical Engineering \| Phehlwana Group | Service + location |
| `/services/cleaning` | Cleaning & Waste Management \| Phehlwana Group | Service + location |
| `/services/plant-hire` | Plant Hire \| Phehlwana Group Investments | Equipment + location |
| `/projects` | Our Projects \| Phehlwana Group Investments | Portfolio + location |
| `/contact` | Contact Us \| Phehlwana Group Investments | Phone + email + address |

#### 7.2 Verify JSON-LD Schema

```bash
# After deploying to Vercel preview, test at:
# https://validator.schema.org — paste the live URL
# Fix any warnings or errors before launch
```

#### 7.3 Verify Sitemap

After deploy: `https://phehlwanagroup.co.za/sitemap-index.xml`

Confirm all pages are listed. If a page is missing, check it has `export const prerender = true` or that `@astrojs/sitemap` is configured correctly.

#### 7.4 Add GA4

1. Create GA4 property at https://analytics.google.com
2. Copy Measurement ID (`G-XXXXXXXXXX`)
3. Add to `.env.local`: `PUBLIC_GA4_ID=G-XXXXXXXXXX`
4. Add to `astro.config.mjs` env schema:

```js
PUBLIC_GA4_ID: envField.string({ context: 'client', access: 'public' }),
```

5. Add to `Head.astro` via Partytown:

```astro
---
const ga4Id = import.meta.env.PUBLIC_GA4_ID;
---
{ga4Id && (
  <>
    <script
      type="text/partytown"
      src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
      async
    />
    <script type="text/partytown" define:vars={{ ga4Id }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ga4Id);
    </script>
  </>
)}
```

#### 7.5 Add Event Tracking

```js
// src/scripts/analytics.js
(function () {
  if (typeof gtag === 'undefined') return;

  // Phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () =>
      gtag('event', 'click', { event_category: 'contact', event_label: 'phone_click' })
    );
  });

  // Email clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.addEventListener('click', () =>
      gtag('event', 'click', { event_category: 'contact', event_label: 'email_click' })
    );
  });

  // WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
    el.addEventListener('click', () =>
      gtag('event', 'click', { event_category: 'contact', event_label: 'whatsapp_click' })
    );
  });

  // Quote request clicks (any button with ref=*quote* or ref=*cta*)
  document.querySelectorAll('a[href*="ref="]').forEach(el => {
    el.addEventListener('click', () => {
      const ref = new URL(el.href).searchParams.get('ref') || 'unknown';
      gtag('event', 'generate_lead', { event_category: 'cta', event_label: ref });
    });
  });

  // PDF downloads
  document.querySelectorAll('a[href$=".pdf"]').forEach(el => {
    el.addEventListener('click', () => {
      const file = el.href.split('/').pop();
      gtag('event', 'file_download', { event_category: 'engagement', event_label: file });
    });
  });
})();
```

Add to `shared.astro` before `</body>`:

```astro
<script src="/scripts/analytics.js" defer></script>
```

#### 7.6 Verify Google Search Console

1. Add property: `https://phehlwanagroup.co.za`
2. Verify via HTML tag — add to `Head.astro`:
   ```astro
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Submit sitemap: `https://phehlwanagroup.co.za/sitemap-index.xml`
4. Request indexing of the home page

#### 7.7 Verify Google Business Profile

Confirm `https://phehlwanagroup.co.za` is the website URL in the listing. Business name, address, phone, and hours must match the website exactly.

---

### 🤖 AI Prompt — SEO Meta Descriptions

```
Write SEO-optimised meta descriptions for each page of the Phehlwana Group 
Investments website. The company is a construction and engineering company 
based in Montana Park, Pretoria, Gauteng, South Africa. Established 2015.

Services: Construction & Civil Engineering, Mechanical Engineering, 
Cleaning & Waste Management, Plant Hire.

Target keywords:
- construction company Pretoria
- civil engineering Gauteng
- plant hire Tshwane
- building contractor Pretoria
- road maintenance Pretoria
- cleaning services Pretoria
- mechanical engineering Gauteng

Rules:
- Each description must be 140–160 characters (count carefully)
- Must include the primary keyword for that page
- Must include a location signal (Pretoria or Gauteng)
- Must include a soft call to action
- Write in South African English
- Do not use the word "premier" (overused in this industry)
- Do not start descriptions with "Welcome to"

Pages:
1. Home page
2. About Us
3. Services overview
4. Construction & Civil Engineering
5. Mechanical Engineering
6. Cleaning & Waste Management
7. Plant Hire
8. Our Projects
9. Contact Us

For each page, output:
- Page name
- Recommended title tag (50–60 characters)
- Meta description (140–160 characters)
- Character counts for both
```

---

### 🤖 AI Prompt — Schema Markup Audit

```
Audit the JSON-LD schema markup for the Phehlwana Group Investments website.

Current schema (from src/components/layout/Head.astro):
[PASTE YOUR CURRENT JSON-LD BLOCK HERE]

Company details:
- Name: Phehlwana Group Investments
- Type: Construction company (LocalBusiness)
- Address: Office No 06, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
- Phone: +27 12 655 0284
- Email: info@phehlwanagroup.co.za
- Website: https://phehlwanagroup.co.za
- Founded: 2015
- Geo: -25.6792539, 28.2747313
- Hours: Monday–Friday 08:00–17:00
- Services: Construction, Mechanical Engineering, Cleaning, Plant Hire

Please:
1. Validate the current schema structure
2. Add missing recommended properties for a LocalBusiness
3. Add a hasOfferCatalog with all 4 services listed
4. Add areaServed for Pretoria and Gauteng
5. Suggest a BreadcrumbList schema for interior pages
6. Flag any properties that would cause validation errors at https://validator.schema.org

Output the corrected and enhanced JSON-LD schema.
```

---

### ✅ Phase 7 Checkpoint

- [ ] All 9 pages have unique meta title (50–60 chars) and description (140–160 chars)
- [ ] JSON-LD validates at https://validator.schema.org — zero errors
- [ ] `sitemap-index.xml` accessible and contains all pages
- [ ] `robots.txt` accessible
- [ ] GA4 Realtime report shows visit when browsing the site in browser
- [ ] Phone click event fires in GA4 Realtime when clicking phone number
- [ ] PDF download event fires when downloading company profile
- [ ] OG image renders at https://opengraph.xyz with correct title and description
- [ ] Google Search Console verified + sitemap submitted
- [ ] `PUBLIC_GA4_ID` added to Vercel environment variables

### 📦 Phase 7 Commit

```bash
git add .
git commit -m "feat: add GA4 analytics, event tracking, SEO meta, schema markup, sitemap"
git push origin feature/seo-analytics
# Open PR to main and merge
```

---

## Phase 8 — Performance & Accessibility

**Goal:** Lighthouse > 85 across all 4 categories. Zero axe DevTools critical errors. Verified on real mobile devices.

**Branch:** `feature/performance`

---

### Tasks

#### 8.1 Run Lighthouse on All Pages

```bash
# Install globally if needed
bunx lighthouse https://[your-vercel-preview-url].vercel.app --view
bunx lighthouse https://[your-vercel-preview-url].vercel.app/about --view
bunx lighthouse https://[your-vercel-preview-url].vercel.app/services --view
bunx lighthouse https://[your-vercel-preview-url].vercel.app/contact --view
```

Record scores. Fix everything below 85.

#### 8.2 Image Audit

```bash
# Check for non-WebP images in public/
find public/images -not -name "*.webp" -not -name "*.svg" -not -name "*.ico" -not -name "*.png"

# Check for images missing lazy loading
grep -r 'loading="eager"' src/ | grep -v 'hero'

# Check for images missing alt text
grep -rn '<img' src/ | grep -v 'alt='
```

#### 8.3 Dependency Audit

```bash
# Confirm no jQuery
grep -r "jquery" src/ public/

# Confirm no Bootstrap
grep -r "bootstrap" src/ public/

# Confirm no WOW.js / OwlCarousel / CounterUp / old libraries
grep -rE "(wow\.js|owlcarousel|counterup|lightbox\.js)" src/ public/

# Check total JS shipped to browser (Astro ships almost none by default)
bun run build && du -sh dist/_astro/*.js 2>/dev/null || echo "No JS bundles — perfect"
```

#### 8.4 Accessibility Checklist

Run axe DevTools browser extension on each page. Fix all critical and serious issues.

```bash
# Heading hierarchy — should show exactly one h1 per page
grep -n '<h[1-6]' src/pages/index.astro src/pages/about.astro

# Check for missing aria-labels on icon buttons
grep -n 'btn.*icon\|icon.*btn' src/components/ -r | grep -v 'aria-label'

# Check for missing form labels
grep -n '<input\|<textarea' src/components/sections/ContactForm.astro
```

Manual checks:
- [ ] Tab through entire site — all interactive elements reachable
- [ ] Enter/Space activate all buttons and links
- [ ] Screen reader announces all images (VoiceOver on Mac: Cmd+F5)
- [ ] Colour contrast passes — test primary blue `#2596be` on white at https://webaim.org/resources/contrastchecker/

#### 8.5 Mobile & Cross-Browser Testing

| Device | Browser | Viewport | Pass |
|---|---|---|---|
| iPhone 14 / iOS 17 | Safari | 390×844 | |
| Samsung Galaxy S23 | Chrome | 360×780 | |
| iPad Air | Safari | 820×1180 | |
| Desktop | Chrome 125+ | 1440×900 | |
| Desktop | Firefox | 1440×900 | |
| Desktop | Edge | 1440×900 | |

#### 8.6 Final Content Sweep

```bash
# No placeholder content
grep -ri "lorem"       src/
grep -ri "coming soon" src/
grep -ri "placeholder" src/ | grep -v "placeholder=" | grep -v ".css"

# No old template references
grep -ri "lifesure"   src/
grep -ri "htmlcodex"  src/
grep -ri "formsubmit" src/

# No typo in company name
grep -r "Phehlawana"  src/

# No broken hrefs
grep -rn 'href="#"'   src/
grep -rn 'href=""'    src/

# No empty alt attributes on non-decorative images
grep -rn 'alt=""'     src/ | grep -v 'aria-hidden'
```

---

### 🤖 AI Prompt — Performance Audit & Fix

```
I am auditing the performance of an Astro v6 website for Phehlwana Group Investments.
Stack: Astro v6, Starwind UI, Tailwind CSS v4, Bun, Vercel adapter (hybrid output).

Here is my current Lighthouse report for the home page:
[PASTE LIGHTHOUSE JSON OR SCREENSHOT DESCRIPTION HERE]

Here are the specific issues flagged:
[LIST THE ISSUES FROM LIGHTHOUSE HERE — e.g., "LCP image not preloaded", "render-blocking resources", etc.]

For each issue:
1. Explain what it means in plain language
2. Show the exact code change needed in my Astro project to fix it
3. Indicate which file to edit
4. Estimate the expected improvement

Additional context:
- The hero image is at /images/hero/hero-construction.webp
- Layout file is src/layouts/shared.astro
- Head component is src/components/layout/Head.astro
- I am using @astrojs/partytown for GA4
- Images use Astro's <Image /> component or native <img> tags with loading="lazy"

Focus on changes that will improve LCP and CLS scores specifically.
```

---

### 🤖 AI Prompt — Accessibility Audit & Fix

```
Perform an accessibility audit of this Astro component and fix all issues.

[PASTE COMPONENT CODE HERE]

Check for and fix:
1. Missing or incorrect aria-label on icon-only interactive elements
2. Missing role attributes where needed
3. Incorrect heading hierarchy (h1 → h2 → h3, no skipping)
4. Images missing descriptive alt text
5. Form inputs missing associated <label> elements
6. Interactive elements that are not keyboard accessible
7. Missing focus styles on focusable elements
8. Colour contrast issues (flag them — I will verify manually)
9. Missing aria-required on required form fields
10. Any use of aria attributes that override semantics incorrectly

For each issue found:
- Quote the problematic line
- Explain the WCAG guideline it violates (include the criterion number)
- Show the corrected code

Output the fully corrected component file.
```

---

### ✅ Phase 8 Checkpoint

- [ ] Lighthouse Performance > 85 on home page
- [ ] Lighthouse Accessibility > 90 on home page
- [ ] Lighthouse SEO = 100 on home page
- [ ] Lighthouse Best Practices > 90 on home page
- [ ] Zero axe DevTools critical or serious errors on any page
- [ ] No jQuery, Bootstrap, WOW.js, OwlCarousel, or old libraries in codebase
- [ ] All grep sweeps above return zero results
- [ ] Passes visual check on iOS Safari and Android Chrome
- [ ] No broken links (`bunx broken-link-checker https://[preview-url] -ro`)
- [ ] `bun run build` completes with zero errors and zero TypeScript errors

### 📦 Phase 8 Commit

```bash
git add .
git commit -m "perf: fix performance, accessibility, content sweep — Lighthouse >85"
git push origin feature/performance
# Open PR to main and merge
```

---

## Phase 9 — Pre-Launch & Go Live

**Goal:** Live on `https://phehlwanagroup.co.za` with SSL, all systems verified working, and client handed over.

**Branch:** `main` (deploy directly)

---

### Tasks

#### 9.1 Production Build Test

```bash
bun run build
bun run preview
```

Walk through every page on the local preview. No broken assets, no errors, no missing images.

#### 9.2 Connect Repo to Vercel

1. Go to https://vercel.com → New Project → Import from GitHub
2. Select `phehlwana-group` repo
3. Framework preset: **Astro** (auto-detected)
4. Build command: `bun run build`
5. Output directory: `dist`
6. Install command: `bun install`

#### 9.3 Add Environment Variables to Vercel

In Vercel dashboard → Project Settings → Environment Variables, add all production values:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` |
| `FROM_EMAIL` | `noreply@phehlwanagroup.co.za` |
| `TO_EMAIL` | `info@phehlwanagroup.co.za` |
| `PUBLIC_GA4_ID` | `G-XXXXXXXXXX` |
| `PUBLIC_SITE_URL` | `https://phehlwanagroup.co.za` |

Apply to: **Production**, **Preview**, and **Development**.

#### 9.4 Connect Custom Domain

1. Vercel → Project → Settings → Domains → Add `phehlwanagroup.co.za`
2. Add `www.phehlwanagroup.co.za` → set redirect to apex domain
3. Update DNS records at the domain registrar:
   - `A` record: `@` → `76.76.21.21` (Vercel)
   - `CNAME`: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 24 hours)
5. Confirm Vercel shows "Valid Configuration" and SSL certificate is issued

#### 9.5 Post-Deploy Verification

```bash
# Test all critical paths
curl -I https://phehlwanagroup.co.za              # 200 OK + HTTPS
curl -I http://phehlwanagroup.co.za               # 301 redirect to HTTPS
curl -I https://www.phehlwanagroup.co.za          # 301 redirect to apex
curl -I https://phehlwanagroup.co.za/sitemap-index.xml   # 200 OK
curl -I https://phehlwanagroup.co.za/robots.txt          # 200 OK
curl -I https://phehlwanagroup.co.za/unknown-page        # 404 — branded page
```

#### 9.6 Final Form Test on Production

Submit the contact form from a personal email address. Verify:
- Notification email arrives at `info@phehlwanagroup.co.za` — formatted correctly
- Auto-reply arrives in the sender's inbox — branded and correct
- Browser redirects to `/thank-you`

#### 9.7 Client Handover Package

Provide the client with a handover document covering:

- [ ] Live site URL confirmed
- [ ] Google Analytics access (add client as Editor)
- [ ] Google Search Console access (add client as Owner)
- [ ] Vercel dashboard access (add client as Member)
- [ ] Resend dashboard access (add client)
- [ ] Instructions: how to add a new project (create MDX file → push to main → auto-deploys)
- [ ] Instructions: how to update contact details (edit `TopBar.astro` and `Footer.astro`)
- [ ] Instructions: how to upload a new company profile PDF (`public/docs/company-profile.pdf`)
- [ ] Developer contact for future changes

---

### 🤖 AI Prompt — Client Handover Document

```
Write a non-technical client handover document for Phehlwana Group Investments 
whose new website has just launched at https://phehlwanagroup.co.za.

The site is built with:
- Astro v6 (static site generator)
- Hosted on Vercel (auto-deploys when code is pushed to GitHub)
- Emails sent via Resend
- Analytics via Google Analytics 4

The client is not a developer. Write in plain, friendly South African English.

Include the following sections:

1. Congratulations — your new website is live!
2. What to do first (check the site, test the contact form, update Google Business Profile)
3. How to add a new project to the portfolio
   - Find the file: src/content/projects/
   - Copy an existing .mdx file
   - Fill in the frontmatter fields (explain each one simply)
   - Add the project photo to public/images/projects/
   - Commit and push — site auto-updates within 2 minutes
4. How to update your contact details or business hours
   - Which files to edit (TopBar.astro, Footer.astro)
   - When to call the developer instead
5. How to update the company profile PDF
   - Replace the file at public/docs/company-profile.pdf
   - Keep the exact same filename
6. Understanding your analytics (Google Analytics 4)
   - How to see how many people visited
   - How to see enquiry conversions
7. What the developer handles vs what the client can handle themselves
8. Support contact details

Format as a clean, numbered document. No code blocks — the client does not code.
```

---

### ✅ Phase 9 Checkpoint

- [ ] `https://phehlwanagroup.co.za` loads with valid SSL (green padlock)
- [ ] `http://` redirects to `https://`
- [ ] `www.` redirects to apex domain
- [ ] Contact form works on production — emails delivered to both parties
- [ ] `/thank-you` loads after form submit on production
- [ ] WhatsApp widget functional on all pages
- [ ] GA4 Realtime shows live traffic from production visits
- [ ] Sitemap submitted to Google Search Console on production URL
- [ ] OG image previews correctly when URL shared on WhatsApp
- [ ] Client has access to: GA4, Search Console, Vercel, Resend
- [ ] Client handover document delivered

### 📦 Phase 9 Final Commit

```bash
git add .
git commit -m "chore: production launch — phehlwanagroup.co.za live on Vercel"
git push origin main
```

---

## Git Log — End State

At the end of all phases the commit history should read:

```
chore: production launch — phehlwanagroup.co.za live on Vercel
perf:  fix performance, accessibility, content sweep — Lighthouse >85
feat:  add GA4 analytics, event tracking, SEO meta, schema markup, sitemap
feat:  build contact page, Resend email action, React Email templates, thank-you, 404
feat:  build projects portfolio with content collection and category filter
feat:  build services overview and 4 individual service pages with accordion
feat:  build about page — company story, credentials, team, vision/mission
feat:  build home page — hero, trust bar, services, about snapshot, portfolio, CTA
feat:  build shared layout, topbar, navbar, footer, WhatsApp widget
chore: configure Vercel adapter, Resend, React Email, content collections, stub pages
```

---

## Content Dependency Tracker

| Item | Needed For | Status |
|---|---|---|
| Logo — all formats (PNG, white PNG, SVG) | Phase 1 | ⏳ Awaiting client |
| Hero photography ×2 (1920×800px, WebP) | Phase 2 | ⏳ Awaiting client |
| About Us copy — updated (Q21, Q23) | Phase 2, 3 | ⏳ Awaiting client |
| Service photography ×4 (800×500px, WebP) | Phase 2, 4 | ⏳ Awaiting client |
| Confirmed stat numbers (Q27) | Phase 2, 3 | ⏳ Awaiting questionnaire |
| Client testimonials ×2–3 (Q60) | Phase 2 | ⏳ Awaiting client |
| CIDB registration number + grading (Q2) | Phase 2, 3 | ⏳ Awaiting questionnaire |
| BBBEE level + certificate PDF (Q3) | Phase 2, 3 | ⏳ Awaiting questionnaire |
| Company Profile PDF | Phase 3 | ⏳ Awaiting client |
| CIDB Certificate PDF | Phase 3 | ⏳ Awaiting client |
| Team headshots + bios (Q45) | Phase 3 | ⏳ Awaiting client |
| Vision + Mission statements (Q24, Q25) | Phase 3 | ⏳ Awaiting questionnaire |
| Core values (Q26) | Phase 3 | ⏳ Awaiting questionnaire |
| Awards list — name + year (Q43) | Phase 3 | ⏳ Awaiting questionnaire |
| Project photos ×6 min (Q37) | Phase 5 | ⏳ Awaiting client |
| Project descriptions ×6 min | Phase 5 | ⏳ Awaiting client |
| Social media URLs (Q17–Q19) | Phase 1 | ⏳ Awaiting questionnaire |
| Business hours confirmed (Q15) | Phase 1, 6 | ⏳ Awaiting questionnaire |
| Resend API key | Phase 6 | ⏳ Create Resend account |
| GA4 Measurement ID | Phase 7 | ⏳ Create GA4 property |
| Google Search Console access | Phase 7 | ⏳ Verify ownership |
| Domain registrar access (for DNS) | Phase 9 | ⏳ Confirm with client |
| OG image (1200×630px, JPG) | Phase 1 | ⏳ Awaiting client |
