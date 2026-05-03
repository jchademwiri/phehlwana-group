# Phehlwana Group Investments — Developer Guide

**Project:** Website Rebuild
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Live Site:** https://phehlwanagroup.co.za
**Document Version:** 3.0 — May 2026

---

## 1. Tech Stack

```
Framework:       Astro v6
UI Components:   Starwind UI v1.16  (https://starwind.dev)
Styling:         Tailwind CSS v4   (bundled with Starwind UI)
JavaScript:      Vanilla JS only   (no React, no Vue — Astro + Starwind are framework-free)
Animations:      Starwind UI built-in animations + CSS @keyframes + Intersection Observer
Forms:           Astro native + FormSubmit.co
Images:          Astro <Image /> component (automatic WebP + lazy loading)
Deployment:      Netlify or Vercel (both support Astro SSG/SSR out of the box)
Analytics:       Partytown + Google Analytics 4 (@astrojs/partytown)
```

**Why this stack:**
- Astro ships zero JS by default — excellent Lighthouse scores out of the box
- Starwind UI gives 45+ accessible, animated components with full code ownership (no black-box npm package to maintain)
- Tailwind CSS v4 is included and configured by Starwind's CLI — no separate setup needed
- Pure vanilla JS means no framework hydration overhead — ideal for a mostly-static marketing site

---

## 2. Project Initialisation

### Step 1 — Create Astro project

```bash
npm create astro@latest phehlwana-group
cd phehlwana-group
```

Follow the prompts. When asked about TypeScript, select **Strict**.

**If using pnpm** (recommended), create `.npmrc` first:

```text
# .npmrc
auto-install-peers=true
node-linker=hoisted
lockfile=true
```

### Step 2 — Initialise Starwind UI

```bash
npx starwind@latest init
```

This single command:
- Configures `tsconfig.json` with `@/` path aliases
- Creates `starwind.config.json`
- Adjusts `astro.config.mjs` to include Tailwind v4
- Creates and imports `src/styles/starwind.css` into your main layout
- Installs all dependencies

### Step 3 — Add components as needed

```bash
# Add individual components
npx starwind@latest add button
npx starwind@latest add card
npx starwind@latest add input
npx starwind@latest add textarea
npx starwind@latest add dropdown
npx starwind@latest add sheet        # Mobile nav drawer
npx starwind@latest add toast        # Form feedback
npx starwind@latest add carousel     # Hero/project slider
npx starwind@latest add accordion    # FAQ / service details
npx starwind@latest add tabs         # Service category tabs
npx starwind@latest add badge        # CIDB / BBBEE labels
npx starwind@latest add skeleton     # Loading states
npx starwind@latest add spinner      # Replace the old Bootstrap spinner
```

Components are copied directly into `src/components/starwind/` — you own the code and can modify anything.

### Step 4 — Verify layout import

Starwind's CLI will handle this automatically for common layout names, but confirm `starwind.css` is imported in your root layout:

```astro
---
// src/layouts/Layout.astro
import "@/styles/starwind.css";
---
```

---

## 3. Project Structure

```
phehlwana-group/
├── public/
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   ├── sitemap.xml                  # Or use @astrojs/sitemap (preferred)
│   ├── images/
│   │   ├── logo.png                 # Full colour, transparent bg
│   │   ├── logo-white.png           # White version for dark backgrounds
│   │   ├── og-image.jpg             # 1200×630px — social sharing
│   │   ├── hero/
│   │   │   ├── hero-construction.webp
│   │   │   └── hero-plant-hire.webp
│   │   ├── services/
│   │   │   ├── construction-civil-engineering.webp
│   │   │   ├── mechanical-engineering.webp
│   │   │   ├── cleaning-waste-management.webp
│   │   │   └── plant-hire.webp
│   │   ├── projects/
│   │   │   ├── project-01-[name].webp
│   │   │   └── project-02-[name].webp
│   │   └── team/
│   │       └── [firstname-lastname].webp
│   └── docs/
│       ├── company-profile.pdf      # Downloadable company profile
│       ├── bbbee-certificate.pdf
│       └── cidb-certificate.pdf
│
├── src/
│   ├── components/
│   │   ├── starwind/                # Starwind UI — CLI-generated, fully editable
│   │   │   ├── button.astro
│   │   │   ├── card.astro
│   │   │   ├── input.astro
│   │   │   ├── textarea.astro
│   │   │   ├── dropdown.astro
│   │   │   ├── sheet.astro
│   │   │   ├── toast.astro
│   │   │   ├── carousel.astro
│   │   │   ├── accordion.astro
│   │   │   ├── badge.astro
│   │   │   └── ...
│   │   │
│   │   ├── shared/
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   └── TopBar.astro         # Address + email bar (desktop only)
│   │   │
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── TrustBar.astro       # CIDB, BBBEE, stats
│   │       ├── ServicesGrid.astro
│   │       ├── AboutSnapshot.astro
│   │       ├── StatsCounter.astro
│   │       ├── WhyUs.astro
│   │       ├── PortfolioGrid.astro
│   │       ├── Testimonials.astro
│   │       ├── ContactCTA.astro
│   │       ├── ContactForm.astro
│   │       └── MapEmbed.astro
│   │
│   ├── layouts/
│   │   └── Layout.astro             # Root layout — imports starwind.css
│   │
│   ├── pages/
│   │   ├── index.astro              # Home
│   │   ├── about.astro
│   │   ├── services/
│   │   │   ├── index.astro          # Services overview
│   │   │   ├── construction.astro
│   │   │   ├── mechanical.astro
│   │   │   ├── cleaning.astro
│   │   │   └── plant-hire.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   ├── thank-you.astro          # Post-form confirmation
│   │   └── 404.astro                # Branded not-found page
│   │
│   ├── styles/
│   │   └── starwind.css             # Starwind base + Tailwind v4 — do not delete
│   │
│   └── content/                     # Optional: Astro Content Collections
│       ├── projects/                # MDX files for each project
│       │   └── project-01.mdx
│       └── blog/                    # MDX files for blog posts (when ready)
│           └── post-01.mdx
│
├── astro.config.mjs
├── starwind.config.json             # Starwind CLI config
├── tsconfig.json                    # Includes @/ path alias
├── .npmrc                           # If using pnpm
├── .gitignore
└── package.json
```

---

## 4. Theming — Brand Colours

Starwind UI uses CSS custom properties for theming. After running `init`, edit `src/styles/starwind.css` to apply Phehlwana Group's brand colours.

```css
/* src/styles/starwind.css */

@import "tailwindcss";

:root {
  /* Phehlwana Group brand — update these once brand guidelines are confirmed */
  --color-primary:        #2596be;   /* Current brand blue from WhatsApp widget */
  --color-primary-hover:  #1d7fa3;
  --color-secondary:      #1a1a2e;   /* Dark navy — adjust to match logo */
  --color-accent:         #f59e0b;   /* Optional warm accent for CTAs */

  /* Starwind semantic tokens — map to brand */
  --background:           oklch(1 0 0);
  --foreground:           oklch(0.145 0 0);
  --primary:              oklch(0.6 0.15 220);   /* Adjust to match #2596be */
  --primary-foreground:   oklch(0.985 0 0);
  --card:                 oklch(1 0 0);
  --card-foreground:      oklch(0.145 0 0);
  --border:               oklch(0.922 0 0);
  --ring:                 oklch(0.6 0.15 220);
}
```

> **Note:** Get exact brand colours from the client via the questionnaire (Q50) before finalising. Use the Starwind Pro Theme Designer at https://pro.starwind.dev/tools/theme-designer/ to generate the full token set from your hex values.

---

## 5. SEO — Astro Implementation

### 5.1 Base Head Component

Create `src/components/layout/Head.astro` and include it in `Layout.astro`:

```astro
---
// src/components/layout/Head.astro
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

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

<!-- Open Graph -->
<meta property="og:type"        content="website" />
<meta property="og:url"         content={canonical} />
<meta property="og:title"       content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image"       content={new URL(ogImage, Astro.site)} />
<meta property="og:site_name"   content={siteName} />
<meta property="og:locale"      content="en_ZA" />

<!-- Twitter -->
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image"       content={new URL(ogImage, Astro.site)} />
```

### 5.2 Per-Page Usage

```astro
---
// src/pages/services/construction.astro
import Layout from '@/layouts/Layout.astro';
---
<Layout
  title="Construction & Civil Engineering"
  description="General building construction, road maintenance, road construction and road safety management services in Pretoria and Gauteng — Phehlwana Group Investments."
>
  <!-- page content -->
</Layout>
```

### 5.3 JSON-LD Schema

Add to `Layout.astro` inside `<head>`:

```astro
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
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.6792539,
    "longitude": 28.2747313
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "17:00"
  }]
})} />
```

### 5.4 Sitemap — Use @astrojs/sitemap

```bash
npx astro add sitemap
```

Then in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phehlwanagroup.co.za',
  integrations: [sitemap()],
});
```

This auto-generates `/sitemap-index.xml` from all your pages. No manual maintenance needed.

### 5.5 robots.txt

```text
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://phehlwanagroup.co.za/sitemap-index.xml
```

---

## 6. Navigation

### Remove from current site
- Language switcher (all options were `href="#"` — not implemented)
- All `<br>` spacer hacks in the navbar

### Recommended structure

```
[Logo]   Home   About   Services ▾   Projects   Contact   [Request a Quote →]

Services dropdown (Starwind Dropdown component):
  Construction & Civil Engineering  →  /services/construction
  Mechanical Engineering            →  /services/mechanical
  Cleaning & Waste Management       →  /services/cleaning
  Plant Hire                        →  /services/plant-hire
  ─────────────────────────────────
  View All Services                 →  /services
```

### Mobile nav — use Starwind Sheet

```astro
---
import { Sheet, SheetTrigger, SheetContent } from '@/components/starwind/sheet';
import { Button } from '@/components/starwind/button';
---

<!-- Hamburger trigger (mobile only) -->
<Sheet>
  <SheetTrigger>
    <Button variant="ghost" size="icon" aria-label="Open navigation menu">
      ☰
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <!-- nav links -->
  </SheetContent>
</Sheet>
```

---

## 7. Contact Form

### Remove from current site
- Outer `<form>` wrapper (nested forms = invalid HTML)
- `handler.php` — broken, unused
- jQuery-based `#sendmessage` success/error block

### Astro implementation with FormSubmit.co

```astro
---
// src/components/sections/ContactForm.astro
---

<form
  action="https://formsubmit.co/info@phehlwanagroup.co.za"
  method="POST"
  class="grid gap-4"
>
  <!-- FormSubmit hidden config -->
  <input type="hidden" name="_subject"  value="New enquiry — phehlwanagroup.co.za" />
  <input type="hidden" name="_next"     value="https://phehlwanagroup.co.za/thank-you" />
  <input type="hidden" name="_captcha"  value="true" />
  <input type="hidden" name="_template" value="table" />

  <!-- Use Starwind Input component -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <label for="name" class="text-sm font-medium">Full Name *</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        placeholder="Your full name"
        class="starwind-input w-full"
      />
    </div>
    <div>
      <label for="email" class="text-sm font-medium">Email Address *</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="your@email.com"
        class="starwind-input w-full"
      />
    </div>
    <div>
      <label for="phone" class="text-sm font-medium">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="012 655 0284"
        class="starwind-input w-full"
      />
    </div>
    <div>
      <label for="service" class="text-sm font-medium">Service Required</label>
      <input
        type="text"
        id="service"
        name="service"
        placeholder="e.g. Plant Hire, Construction"
        class="starwind-input w-full"
      />
    </div>
  </div>

  <div>
    <label for="message" class="text-sm font-medium">Message *</label>
    <textarea
      id="message"
      name="message"
      required
      rows="5"
      placeholder="Tell us about your project..."
      class="starwind-textarea w-full"
    ></textarea>
  </div>

  <button type="submit" class="starwind-button starwind-button-primary w-full sm:w-auto">
    Send Message
  </button>
</form>
```

### Create `/thank-you` page

```astro
---
// src/pages/thank-you.astro
import Layout from '@/layouts/Layout.astro';
---
<Layout
  title="Message Sent"
  description="Thank you for contacting Phehlwana Group Investments."
>
  <section class="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
    <h1 class="text-3xl font-bold mb-4">Message Received!</h1>
    <p class="text-muted-foreground mb-8 max-w-md">
      Thank you for reaching out. One of our consultants will be in touch with you shortly.
    </p>
    <a href="/" class="starwind-button starwind-button-primary">Back to Home</a>
  </section>
</Layout>
```

---

## 8. Home Page — Section Structure

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
import Hero from '@/components/sections/Hero.astro';
import TrustBar from '@/components/sections/TrustBar.astro';
import ServicesGrid from '@/components/sections/ServicesGrid.astro';
import AboutSnapshot from '@/components/sections/AboutSnapshot.astro';
import WhyUs from '@/components/sections/WhyUs.astro';
import PortfolioGrid from '@/components/sections/PortfolioGrid.astro';
import Testimonials from '@/components/sections/Testimonials.astro';
import ContactCTA from '@/components/sections/ContactCTA.astro';
---
<Layout
  title="Phehlwana Group Investments | Construction & Engineering Pretoria"
  description="Phehlwana Group Investments — construction, civil engineering, mechanical engineering, cleaning, waste management and plant hire in Pretoria, Gauteng."
>
  <Hero />          <!-- Full-width photo, headline, 2 CTAs -->
  <TrustBar />      <!-- CIDB badge, BBBEE level, years in business -->
  <ServicesGrid />  <!-- 4 service cards with icons -->
  <AboutSnapshot /> <!-- Company summary + animated stat counters -->
  <WhyUs />         <!-- 3–4 differentiators -->
  <PortfolioGrid /> <!-- 6 project photos → /projects -->
  <Testimonials />  <!-- 2–3 client quotes -->
  <ContactCTA />    <!-- Full-width banner: phone + quote button -->
</Layout>
```

---

## 9. Animations

Starwind UI components include built-in entrance animations. For scroll-triggered animations on custom sections, use the native Intersection Observer API — no WOW.js or AOS needed:

```js
// src/scripts/animations.js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Fire once only
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
```

```css
/* In starwind.css or a custom CSS file */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

[data-animate].animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

```astro
<!-- Usage in any component -->
<div data-animate class="service-card">...</div>
```

### Stat Counter (replaces CounterUp jQuery plugin)

```js
// Vanilla JS counter — add to a <script> tag in StatsCounter.astro
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));
```

```astro
<!-- Usage -->
<span data-counter data-target="129">0</span><span>+</span>
```

---

## 10. Analytics — Astro + Partytown

```bash
npx astro add partytown
```

Then in `Layout.astro`:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <!-- ... other head content ... -->

  <!-- GA4 via Partytown (offloads to web worker — no main thread blocking) -->
  <script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script type="text/partytown">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

Replace `G-XXXXXXXXXX` with the actual GA4 Measurement ID once the property is created.

### Events to track

```js
// Phone click
document.querySelector('a[href^="tel:"]')?.addEventListener('click', () => {
  gtag('event', 'click', { event_category: 'contact', event_label: 'phone_click' });
});

// WhatsApp widget open
// (Add to the WhatsApp script block on each page)

// Form submit — fires on the thank-you page load
// GA4 automatically tracks page_view on /thank-you as a conversion
```

---

## 11. Image Guidelines

### Astro `<Image />` component

Use Astro's built-in Image component for all content images — it handles WebP conversion, lazy loading, and width/height automatically:

```astro
---
import { Image } from 'astro:assets';
import constructionImg from '@/images/services/construction-civil-engineering.webp';
---

<Image
  src={constructionImg}
  alt="Phehlwana Group construction crew on a building site in Pretoria, Gauteng"
  width={800}
  height={500}
  loading="lazy"
  class="rounded-lg w-full object-cover"
/>
```

For the hero image (above the fold), use `loading="eager"` and add a preload hint in `<head>`:

```astro
<link rel="preload" as="image" href="/images/hero/hero-construction.webp" />
```

### Required images — obtain from client

| Image | Size | Notes |
|---|---|---|
| `og-image.jpg` | 1200×630px | Social sharing — required before launch |
| Hero (×2) | 1920×800px | Real site photography — critical |
| About section | 800×600px | Team/office/site photo |
| Service covers (×4) | 800×500px | Replace placeholder blog images |
| Project photos (×6–12) | 800×600px | Portfolio grid |
| Team headshots | 400×400px | Square crop, professional |
| Equipment photos | 800×500px | Plant Hire section |
| Logo variants | — | See below |

### Logo variants required

- Full colour, transparent PNG background
- White reversed PNG for dark backgrounds
- Square icon-only for favicon
- SVG if available

---

## 12. Starwind Components — Usage Map

| Section / Feature | Starwind Component | Notes |
|---|---|---|
| Mobile nav drawer | `Sheet` | Replaces Bootstrap collapse |
| Service cards | `Card` | Use Card with hover animation |
| Services nav dropdown | `Dropdown` | Desktop nav |
| Contact form fields | `Input`, `Textarea`, `Label` | With `InputGroup` for icon prefix |
| Form submit feedback | `Toast` | Success / error notification |
| Project lightbox | `Dialog` | Click project photo → full-size dialog |
| Hero image slider | `Carousel` | If multiple hero images are available |
| Service detail expand | `Accordion` | Expand sub-services on service pages |
| Page loading | `Spinner` | Replaces Bootstrap spinner hack |
| CIDB / BBBEE tags | `Badge` | Display credential labels |
| Stats section | Custom (vanilla counter) | No Starwind component needed |
| Tooltips on icons | `Tooltip` | Optional enhancement |

---

## 13. Deployment

### Netlify (recommended for static)

```bash
# Install Netlify adapter
npx astro add netlify
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### Vercel (alternative)

```bash
npx astro add vercel
```

Both platforms support automatic deploys from the GitHub repo — push to `main` → site rebuilds automatically.

---

## 14. Performance Checklist

### Images
- [ ] All photos in WebP format (use Squoosh or Sharp if not converting via Astro Image)
- [ ] Astro `<Image />` used for all content images
- [ ] Hero image has `loading="eager"` and a `<link rel="preload">` tag
- [ ] All images have meaningful `alt` text

### JavaScript
- [ ] No jQuery — vanilla JS only
- [ ] No WOW.js / CounterUp / OwlCarousel / Lightbox — all replaced (see section 9 + 12)
- [ ] Animations use Intersection Observer + CSS transitions
- [ ] GA4 loaded via Partytown (off main thread)

### Astro-specific
- [ ] `astro.config.mjs` has `site: 'https://phehlwanagroup.co.za'` set
- [ ] `@astrojs/sitemap` integration added — sitemap auto-generated
- [ ] `output` mode is `'static'` (default) unless SSR is needed

### Core Web Vitals Targets

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

```bash
# Run Lighthouse locally before launch
npx lighthouse https://phehlwanagroup.co.za --view
```

---

## 15. Pre-Launch Checklist

### Content
- [ ] All meta `title` and `description` filled in on every page
- [ ] Company name spelled "Phehlwana" consistently (not "Phehlawana") — search all files
- [ ] No Lorem Ipsum or placeholder text remaining
- [ ] No "LifeSure" or "HTMLCodex" references remaining
- [ ] All CTA buttons link to real pages

### Functionality
- [ ] Contact form submits → email received → `/thank-you` page loads correctly
- [ ] WhatsApp widget present and functional on all pages
- [ ] All navigation links resolve correctly
- [ ] All footer links resolve correctly
- [ ] Mobile nav (Sheet) opens and closes correctly
- [ ] `/404.astro` page exists and is branded

### Technical
- [ ] Favicon renders in browser tab and on mobile
- [ ] OG image renders when URL is shared (test at https://opengraph.xyz)
- [ ] `sitemap-index.xml` is accessible at `https://phehlwanagroup.co.za/sitemap-index.xml`
- [ ] `robots.txt` is accessible
- [ ] GA4 tracking verified (check Realtime report in Google Analytics)
- [ ] Google Search Console verified + sitemap submitted
- [ ] SSL certificate active (HTTPS)
- [ ] Lighthouse scores > 85 across all four categories
- [ ] Tested on iOS Safari and Android Chrome

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Business Profile links to the site URL
- [ ] Set up GA4 conversion events for form submissions and phone clicks
- [ ] Test contact form from a real external email address
- [ ] Confirm FormSubmit.co activation email has been clicked (required on first submission)

---

## 16. Page-by-Page Build Specifications

### 16.1 Home — `src/pages/index.astro`

**Meta:**
- Title: `Phehlwana Group Investments | Construction & Engineering Pretoria`
- Description: `Phehlwana Group Investments — construction, civil engineering, mechanical engineering, cleaning, waste management and plant hire services in Pretoria, Gauteng. Established 2015.`

**Sections in order:**

| # | Section | Component | Key Content |
|---|---|---|---|
| 1 | Hero | `Hero.astro` | Headline, subtext, "Request a Quote" + "Our Services" CTAs, real site photo |
| 2 | Trust Bar | `TrustBar.astro` | CIDB grading badge, BBBEE level, years in business, project count |
| 3 | Services Grid | `ServicesGrid.astro` | 4 cards — icon, title, 2-line description, link to service page |
| 4 | About Snapshot | `AboutSnapshot.astro` | 2-paragraph company summary + animated stat counters |
| 5 | Why Choose Us | `WhyUs.astro` | 4 icons: Licensed · Experienced · Local · Compliant |
| 6 | Portfolio Preview | `PortfolioGrid.astro` | 6 project photo grid → link to `/projects` |
| 7 | Testimonials | `Testimonials.astro` | 2–3 client quotes (obtain from client) |
| 8 | Contact CTA | `ContactCTA.astro` | Full-width banner — phone number + "Request a Quote" button |

---

### 16.2 About — `src/pages/about.astro`

**Meta:**
- Title: `About Us`
- Description: `Learn about Phehlwana Group Investments — established 2015, a professional construction and civil engineering company based in Montana Park, Pretoria, serving Gauteng and beyond.`

**Sections in order:**

| # | Section | Notes |
|---|---|---|
| 1 | Page header / breadcrumb | "About Us" heading with `Breadcrumb` component |
| 2 | Company story | Updated About Us copy from client (Q21 in questionnaire) |
| 3 | Vision, Mission, Values | 3-column cards or icon list |
| 4 | Stats counters | 129+ Projects, 20+ Awards, 50+ Staff, 6+ Management |
| 5 | Credentials block | CIDB number + grading, BBBEE level, reg number, certifications — use `Badge` components |
| 6 | Downloadable assets | "Download Company Profile (PDF)" button — link to `public/docs/company-profile.pdf` |
| 7 | Management team | Grid of team cards — photo, name, title, brief bio |
| 8 | Contact CTA | Same `ContactCTA.astro` used on home page |

---

### 16.3 Services Overview — `src/pages/services/index.astro`

**Meta:**
- Title: `Our Services`
- Description: `Phehlwana Group offers construction & civil engineering, mechanical engineering, cleaning & waste management, and plant hire services across Pretoria and Gauteng.`

**Sections:**

| # | Section | Notes |
|---|---|---|
| 1 | Page header | "Our Services" heading + short intro paragraph |
| 2 | Service cards (×4) | Large cards — real photo, title, description, "Learn More" → individual service page |
| 3 | Why Phehlwana | 3-column differentiator block (reuse `WhyUs.astro`) |
| 4 | Contact CTA | Standard CTA banner |

---

### 16.4 Individual Service Pages

Each follows the same layout template. Create `src/layouts/ServiceLayout.astro` to avoid repetition:

```astro
---
// src/layouts/ServiceLayout.astro
import Layout from '@/layouts/Layout.astro';
import Breadcrumb from '@/components/starwind/breadcrumb.astro';
import ContactCTA from '@/components/sections/ContactCTA.astro';

interface Props {
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
}
const { title, description, heroImage, heroAlt } = Astro.props;
---
<Layout title={title} description={description}>
  <!-- Page hero image -->
  <div class="relative h-64 w-full overflow-hidden">
    <img src={heroImage} alt={heroAlt} class="w-full h-full object-cover" loading="eager" />
    <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
      <h1 class="text-4xl font-bold text-white">{title}</h1>
    </div>
  </div>

  <!-- Breadcrumb -->
  <div class="container mx-auto px-4 py-4">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: title }
    ]} />
  </div>

  <!-- Page content slot -->
  <main class="container mx-auto px-4 py-12">
    <slot />
  </main>

  <ContactCTA />
</Layout>
```

**Service page content structure:**

```astro
---
// src/pages/services/construction.astro
import ServiceLayout from '@/layouts/ServiceLayout.astro';
import { Accordion, AccordionItem } from '@/components/starwind/accordion';
---
<ServiceLayout
  title="Construction & Civil Engineering"
  description="General building construction, renovations, road construction, road maintenance and road safety management services in Pretoria and Gauteng."
  heroImage="/images/services/construction-civil-engineering.webp"
  heroAlt="Phehlwana Group construction site in Pretoria"
>
  <!-- Intro paragraph -->
  <p class="text-lg text-muted-foreground mb-8">...</p>

  <!-- Sub-services in Accordion -->
  <Accordion>
    <AccordionItem title="General Building & Construction">
      New builds, renovations, structural work, finishes, and maintenance...
    </AccordionItem>
    <AccordionItem title="Road Construction & Maintenance">
      Surface treatment, civil works, preventive maintenance, drainage...
    </AccordionItem>
    <AccordionItem title="Road Safety Management">
      Work zone safety, traffic control, PPE, audits and inspections...
    </AccordionItem>
  </Accordion>

  <!-- Quote CTA inline -->
  <div class="mt-12 p-8 bg-muted rounded-lg text-center">
    <h3 class="text-2xl font-bold mb-4">Need a Quote?</h3>
    <a href="/contact?service=construction" class="starwind-button starwind-button-primary">
      Request a Quote
    </a>
  </div>
</ServiceLayout>
```

Apply same pattern for:
- `src/pages/services/mechanical.astro`
- `src/pages/services/cleaning.astro`
- `src/pages/services/plant-hire.astro`

---

### 16.5 Projects — `src/pages/projects.astro`

**Meta:**
- Title: `Our Projects`
- Description: `Browse completed construction, engineering, and maintenance projects by Phehlwana Group Investments across Pretoria and Gauteng.`

**Implementation using Astro Content Collections (recommended):**

Each project is an MDX file — easy to add new projects without touching code.

```mdx
---
# src/content/projects/montana-park-office.mdx
title: "PKN Office Park Renovation"
client: "PKN Properties"
location: "Montana Park, Pretoria"
year: 2024
category: "Construction"
coverImage: "/images/projects/project-01-montana-park.webp"
featured: true
---

Full interior renovation of a 6-unit commercial office park including...
```

```astro
---
// src/pages/projects.astro
import { getCollection } from 'astro:content';
import Layout from '@/layouts/Layout.astro';
import { Card } from '@/components/starwind/card';

const projects = await getCollection('projects');
const featured = projects.filter(p => p.data.featured);
---
<Layout title="Our Projects" description="...">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map(project => (
      <Card>
        <img src={project.data.coverImage} alt={project.data.title} loading="lazy" />
        <div class="p-4">
          <h3>{project.data.title}</h3>
          <p>{project.data.location} · {project.data.year}</p>
        </div>
      </Card>
    ))}
  </div>
</Layout>
```

---

### 16.6 Contact — `src/pages/contact.astro`

**Meta:**
- Title: `Contact Us`
- Description: `Contact Phehlwana Group Investments — call 012 655 0284, email info@phehlwanagroup.co.za, or fill in our enquiry form. Office in Montana Park, Pretoria.`

**Sections:**

| # | Section | Notes |
|---|---|---|
| 1 | Page header | "Contact Us" heading |
| 2 | Contact info cards | Address, phone, email, WhatsApp — 4-column grid |
| 3 | Two-column layout | Left: `ContactForm.astro` · Right: Google Maps embed |
| 4 | Business hours | Simple table or list |

**Pre-populate service field from URL:**

```astro
---
const service = Astro.url.searchParams.get('service') ?? '';
---
<input type="text" name="service" value={service} placeholder="e.g. Plant Hire" />
```

This allows "Request a Quote" buttons on service pages to pre-fill the service field.

---

### 16.7 Thank You — `src/pages/thank-you.astro`

Simple confirmation page. Fixes the current 404 on form submission.

```astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout
  title="Message Sent"
  description="Thank you for contacting Phehlwana Group Investments."
>
  <section class="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-20">
    <div class="mb-6 text-5xl">✅</div>
    <h1 class="text-3xl font-bold mb-4">Message Received!</h1>
    <p class="text-muted-foreground mb-8 max-w-md">
      Thank you for reaching out to Phehlwana Group Investments.
      One of our consultants will contact you within 1 business day.
    </p>
    <div class="flex gap-4 flex-wrap justify-center">
      <a href="/" class="starwind-button starwind-button-primary">Back to Home</a>
      <a href="/services" class="starwind-button starwind-button-outline">View Our Services</a>
    </div>
  </section>
</Layout>
```

---

### 16.8 404 — `src/pages/404.astro`

```astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout title="Page Not Found" description="This page does not exist.">
  <section class="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-20">
    <h1 class="text-8xl font-bold text-primary mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
    <p class="text-muted-foreground mb-8 max-w-md">
      Sorry, we couldn't find the page you were looking for.
    </p>
    <div class="flex gap-4 flex-wrap justify-center">
      <a href="/" class="starwind-button starwind-button-primary">Go to Home</a>
      <a href="/contact" class="starwind-button starwind-button-outline">Contact Us</a>
    </div>
  </section>
</Layout>
```

---

## 17. Content Collections Setup

Use Astro Content Collections to manage projects and blog posts. This keeps content structured, type-safe, and easy to edit without touching component code.

### Schema definition

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
    published:   z.boolean().default(false), // Default false — must opt-in to publish
  }),
});

export const collections = { projects, blog };
```

### Querying content

```astro
---
// Get all published projects, sorted by year descending
import { getCollection } from 'astro:content';

const allProjects = await getCollection('projects', ({ data }) => data.published);
const sorted = allProjects.sort((a, b) => b.data.year - a.data.year);
const featured = sorted.filter(p => p.data.featured).slice(0, 6);
---
```

---

## 18. WhatsApp Widget — Astro Implementation

The current WhatsApp widget (Social Intents) is implemented inconsistently — missing from `about.html`. In Astro, add it once to `Layout.astro` so it appears on every page automatically.

```astro
---
// src/layouts/Layout.astro  — add inside <body>, before </body>
---

<!-- WhatsApp Chat Widget — loads on every page -->
<script is:inline>
  var url = 'https://whatsapp.socialintents.com/api/chat/siwhatsapp.1.0.js';
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = url;

  var chatSettings = {
    backgroundColor: '#25D366',      // WhatsApp green (more recognisable than the old #2596be)
    textColor: '#ffffff',
    position: 'right',
    marginBottom: '25',
    marginRight: '25',
    logo: 'https://whatsapp.socialintents.com/images/whatsapp.png',
    ctaText: 'Chat with us',
    showPopup: false,
    welcomeText: 'Hi! How can we help you?',
    messageText: 'Hello, I would like to know more about your services.',
    phoneNumber: '27792947635'       // International format — no leading 0
  };

  s.onload = function () { addWidget(chatSettings); };
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
</script>
```

> **Note:** The phone number must be in international format without `+` or spaces: `27792947635` not `0792947635`. Confirm the correct number with the client (questionnaire Q16).

---

## 19. Accessibility Standards

Starwind UI components are built with accessibility in mind, but the following must be verified and implemented throughout custom components.

### Required for every page
- [ ] One `<h1>` per page — page title only
- [ ] Logical heading hierarchy: `h1` → `h2` → `h3` (never skip levels)
- [ ] All images have descriptive `alt` text (or `alt=""` only for decorative images)
- [ ] All interactive elements reachable and operable by keyboard (`Tab`, `Enter`, `Space`)
- [ ] Focus styles visible on all focusable elements — never use `outline: none` without a replacement
- [ ] Colour contrast meets WCAG AA: 4.5:1 for normal text, 3:1 for large text

### Social media icon buttons

The current site has icon-only social buttons with no accessible label. Fix:

```astro
<!-- Wrong -->
<a href="#"><i class="fab fa-facebook-f"></i></a>

<!-- Right -->
<a href="https://facebook.com/phehlwanagroup" aria-label="Phehlwana Group on Facebook" target="_blank" rel="noopener noreferrer">
  <!-- SVG icon or icon font -->
</a>
```

### Skip to content link

Add as the very first element inside `<body>` in `Layout.astro`:

```astro
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded">
  Skip to main content
</a>
```

Add `id="main-content"` to the `<main>` element on each page.

### Form labels

Every form field must have an associated `<label>`:

```astro
<!-- Wrong — placeholder is not a label -->
<input type="text" name="name" placeholder="Your Name" />

<!-- Right -->
<label for="name" class="text-sm font-medium">Full Name <span aria-hidden="true">*</span></label>
<input type="text" id="name" name="name" required aria-required="true" placeholder="Your full name" />
```

---

## 20. Git Workflow

### Branch strategy

```
main          → production (auto-deploys to phehlwanagroup.co.za)
develop       → staging / preview branch
feature/*     → individual features and pages
fix/*         → bug fixes
content/*     → content-only changes (copy, images, MDX files)
```

### Recommended workflow

```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/services-page

# Work, commit regularly
git add .
git commit -m "feat: add construction service page with accordion"

# Push and open PR to develop
git push origin feature/services-page

# After review, merge develop → main to deploy
git checkout main
git merge develop
git push origin main
```

### Commit message convention

Use conventional commits for a clean history:

```
feat:     new feature or page
fix:      bug fix
content:  copy, image, or MDX content update
style:    CSS/Tailwind changes only (no logic change)
chore:    config, tooling, dependencies
docs:     documentation updates
```

### .gitignore

```gitignore
# .gitignore
node_modules/
dist/
.astro/
.env
.env.local
.env.production
.DS_Store
*.log
.netlify/
.vercel/
```

### Never commit
- API keys or secrets
- `.env` files
- FormSubmit.co activation tokens
- Client PDFs or legal documents (host these on a private storage bucket if needed)

---

## 21. Environment Variables

For any secrets (future API integrations, CMS tokens), use `.env`:

```bash
# .env.local — never commit this file
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

Access in Astro:

```astro
---
const ga4Id = import.meta.env.PUBLIC_GA4_ID;
---
```

Variables prefixed with `PUBLIC_` are safe to expose client-side. Variables without the prefix are server-only (relevant if using Astro SSR mode).

---

## 22. README Template

Add this `README.md` to the root of the repository:

```markdown
# Phehlwana Group Investments — Website

**Live site:** https://phehlwanagroup.co.za
**Stack:** Astro v6 · Starwind UI · Tailwind CSS v4 · Vanilla JS
**Deployment:** Netlify (auto-deploy from `main` branch)

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Install

```bash
npm install
# or
pnpm install
```

### Dev server

```bash
npm run dev
# Opens at http://localhost:4321
```

### Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

### Add a Starwind UI component

```bash
npx starwind@latest add [component-name]
# e.g. npx starwind@latest add toast
```

---

## Project Structure

See `developer-guide.md` in the project docs for full structure and conventions.

Key directories:
- `src/pages/` — one file per route
- `src/components/starwind/` — Starwind UI components (fully editable)
- `src/components/sections/` — page section components
- `src/content/projects/` — MDX files for project portfolio
- `src/styles/starwind.css` — brand colours + Tailwind v4 config
- `public/images/` — all static images (WebP)
- `public/docs/` — downloadable PDFs

---

## Adding a New Project to the Portfolio

1. Add project photos to `public/images/projects/`
2. Create a new MDX file in `src/content/projects/`:

```mdx
---
title: "Project Name"
client: "Client Name"
location: "Pretoria, Gauteng"
year: 2026
category: "Construction"
coverImage: "/images/projects/project-name.webp"
featured: false
published: true
---

Description of the project scope and outcome...
```

3. The project will automatically appear on `/projects`

---

## Deployment

Push to `main` branch → Netlify automatically builds and deploys.

Preview deployments are created for every PR against `develop`.

---

## Key Contacts

| Role | Name | Contact |
|---|---|---|
| Client | Phehlwana Group | info@phehlwanagroup.co.za |
| Developer | [Your name] | [Your email] |
| Designer | [If applicable] | — |
```

---

## 23. Useful Links & Resources

| Resource | URL |
|---|---|
| Astro Docs | https://docs.astro.build |
| Starwind UI Docs | https://starwind.dev/docs/getting-started/ |
| Starwind Components | https://starwind.dev/docs/components/ |
| Starwind Theme Designer | https://pro.starwind.dev/tools/theme-designer/ |
| Starwind Discord | https://discord.gg/hYxyyFHNJb |
| Tailwind CSS v4 Docs | https://tailwindcss.com/docs |
| FormSubmit.co Docs | https://formsubmit.co |
| Astro Sitemap Integration | https://docs.astro.build/en/guides/integrations-guide/sitemap/ |
| Astro Partytown Integration | https://docs.astro.build/en/guides/integrations-guide/partytown/ |
| Astro Content Collections | https://docs.astro.build/en/guides/content-collections/ |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |
| Squoosh (image converter) | https://squoosh.app |
| Real Favicon Generator | https://realfavicongenerator.net |
| OG Image Tester | https://opengraph.xyz |
| Schema Markup Validator | https://validator.schema.org |
| WCAG Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Lighthouse CLI | `npx lighthouse <url> --view` |
