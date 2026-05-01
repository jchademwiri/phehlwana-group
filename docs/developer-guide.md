# Phehlwana Group — Developer Guide: New Website Build

**Project:** Phehlwana Group Investments Website Rebuild  
**Stack:** Astro 5, TypeScript, Tailwind CSS v4  
**Repo:** [github.com/jchademwiri/phehlwana-group](https://github.com/jchademwiri/phehlwana-group)  
**Live Site:** [phehlwanagroup.co.za](https://phehlwanagroup.co.za/)

---

## 1. Project Overview

This guide covers the full rebuild of the Phehlwana Group website from a static Bootstrap HTML template to a modern Astro-based site. The goal is to fix every issue identified in the audit report while building a maintainable, performant, and SEO-optimised site.

### Core Objectives

- Eliminate all template placeholder content and broken assets.
- Establish a proper component architecture to remove code duplication.
- Implement full SEO metadata on every page.
- Build a real portfolio/projects section.
- Create a working, spam-protected contact form.
- Achieve Lighthouse scores of 90+ across all categories.
- Make the site fully accessible (WCAG 2.1 AA).

---

## 2. Tech Stack

| Tool | Purpose | Version |
|---|---|---|
| [Astro](https://astro.build) | Static site generator / framework | 5.x |
| TypeScript | Type safety | 5.x |
| Tailwind CSS | Utility-first styling | 4.x |
| `@astrojs/sitemap` | Auto-generate sitemap.xml | latest |
| `@astrojs/image` | Optimised image component | latest |
| Astro Content Collections | Blog, projects, team data | built-in |
| Resend / Formspree | Contact form backend | latest |
| Zod | Schema validation for content | built-in with Astro |

### Why Astro?

- Zero JS by default — only ships JS where needed (contact form, carousel).
- Built-in image optimisation (WebP conversion, lazy loading, `srcset`).
- Content Collections for type-safe blog posts, projects, and team members.
- Excellent SEO primitives.
- The project already has an Astro scaffold in place (`astro.config.mjs`, `src/`).

---

## 3. Recommended Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro          # Topbar + Navbar combined
│   │   ├── Footer.astro          # Single source of truth for footer
│   │   └── SEO.astro             # Meta tags, OG, Twitter Card, JSON-LD
│   ├── sections/
│   │   ├── Hero.astro            # Homepage hero carousel/banner
│   │   ├── About.astro           # About snippet (homepage)
│   │   ├── Services.astro        # Services grid
│   │   ├── Stats.astro           # Counter stats
│   │   ├── Projects.astro        # Portfolio grid
│   │   ├── Testimonials.astro    # Client testimonials
│   │   ├── Team.astro            # Team members grid
│   │   ├── BlogPreview.astro     # Latest blog posts
│   │   └── ContactForm.astro     # Contact form with validation
│   └── ui/
│       ├── Button.astro
│       ├── ServiceCard.astro
│       ├── ProjectCard.astro
│       ├── TeamCard.astro
│       └── BlogCard.astro
├── content/
│   ├── config.ts                 # Content collection schemas
│   ├── blog/                     # .md or .mdx blog posts
│   ├── projects/                 # .md project case studies
│   └── team/                     # .md team member profiles
├── layouts/
│   ├── BaseLayout.astro          # HTML shell, SEO, fonts
│   └── PageLayout.astro          # BaseLayout + Header + Footer
├── pages/
│   ├── index.astro               # Home
│   ├── about.astro               # About
│   ├── services/
│   │   ├── index.astro           # Services overview
│   │   ├── construction.astro    # Construction & Civil Engineering
│   │   ├── mechanical.astro      # Mechanical Engineering
│   │   ├── cleaning.astro        # Cleaning & Waste Management
│   │   └── plant-hire.astro      # Plant Hire
│   ├── projects/
│   │   ├── index.astro           # Projects listing
│   │   └── [slug].astro          # Individual project page
│   ├── blog/
│   │   ├── index.astro           # Blog listing
│   │   └── [slug].astro          # Individual blog post
│   ├── team.astro                # Team page
│   ├── contact.astro             # Contact page
│   ├── 404.astro                 # Custom 404 page
│   └── thanks.astro              # Form submission success page
├── styles/
│   └── global.css                # Tailwind base + custom tokens
└── assets/
    ├── images/                   # Optimised source images
    └── icons/                    # SVG icons
```

---

## 4. SEO Implementation

### 4.1 SEO Component

Create `src/components/layout/SEO.astro` to handle all metadata:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  canonicalURL?: string;
}

const {
  title,
  description,
  image = '/og-default.jpg',
  type = 'website',
  canonicalURL = Astro.url.href,
} = Astro.props;

const siteName = 'Phehlwana Group Investments';
const fullTitle = `${title} | ${siteName}`;
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.site)} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content="en_ZA" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(image, Astro.site)} />
```

### 4.2 LocalBusiness Structured Data

Add JSON-LD to the homepage and contact page:

```astro
---
const schema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Phehlwana Group Investments",
  "url": "https://phehlwanagroup.co.za",
  "telephone": "+27126550284",
  "email": "info@phehlwanagroup.co.za",
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
    "latitude": -25.679249,
    "longitude": 28.2721564
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "areaServed": "Gauteng, South Africa"
};
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### 4.3 Per-Page SEO Targets

| Page | Title | Description |
|---|---|---|
| Home | Construction & Maintenance Services in Pretoria | Phehlwana Group Investments — construction, civil engineering, plant hire, and cleaning services in Pretoria, Gauteng. |
| About | About Us — Established 2015 | Learn about Phehlwana Group, a Pretoria-based construction and maintenance company with 10+ years of experience. |
| Services | Our Services — Construction, Plant Hire & More | Explore Phehlwana Group's full range of services: civil engineering, mechanical engineering, cleaning, waste management, and plant hire. |
| Construction | Construction & Civil Engineering Services | General building, road construction, road maintenance, and safety management services in Gauteng. |
| Plant Hire | Plant Hire — TLB, Tipper Trucks & Excavators | Hire TLBs, water carts, tipper trucks, excavators, and more from Phehlwana Group in Pretoria. |
| Contact | Contact Us — Get a Free Quote | Contact Phehlwana Group for a free quote. Call 012 655 0284 or email info@phehlwanagroup.co.za. |

### 4.4 Sitemap & Robots

In `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phehlwanagroup.co.za',
  integrations: [sitemap()],
});
```

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://phehlwanagroup.co.za/sitemap-index.xml
```

---

## 5. Content Collections

### 5.1 Schema Definition (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string().optional(),
    location: z.string(),
    completedDate: z.date(),
    category: z.enum(['construction', 'mechanical', 'cleaning', 'plant-hire', 'road']),
    images: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string(),
    linkedin: z.string().optional(),
    email: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { blog, projects, team };
```

---

## 6. Contact Form

### 6.1 Recommended Approach: Resend + Astro API Route

Create `src/pages/api/contact.ts`:

```typescript
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name')?.toString();
  const email = data.get('email')?.toString();
  const phone = data.get('phone')?.toString();
  const message = data.get('message')?.toString();

  // Basic validation
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
    });
  }

  try {
    await resend.emails.send({
      from: 'website@phehlwanagroup.co.za',
      to: 'info@phehlwanagroup.co.za',
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
};
```

### 6.2 Form Component with Validation

The `ContactForm.astro` component should:
- Use `type="tel"` (not `type="phone"`) for phone fields.
- Mark required fields with `required` attribute and visual indicator.
- Show success/error states without a full page reload (use a small `<script>` with `fetch`).
- Include honeypot field for basic spam protection.
- Redirect to `/thanks` on success.

---

## 7. Image Strategy

### 7.1 Use Astro's Image Component

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero-construction.jpg';
---

<Image
  src={heroImage}
  alt="Phehlwana Group construction team working on a building project in Pretoria"
  width={1200}
  height={600}
  format="webp"
  loading="eager"
/>
```

### 7.2 Image Requirements to Gather from Client

The following real images are needed before launch:

- [ ] Hero banner: 2–3 high-quality photos of active construction/maintenance projects (1920×1080px minimum).
- [ ] About section: Company office or team photo (800×600px minimum).
- [ ] Services: One representative photo per service (800×600px minimum each).
- [ ] Projects: 3–5 photos per completed project.
- [ ] Team: Professional headshots for each team member (400×400px, square crop).
- [ ] Logo: High-resolution PNG with transparent background + white version for dark backgrounds.
- [ ] OG image: 1200×630px branded image for social sharing.

### 7.3 Alt Text Guidelines

Every image must have descriptive alt text:
- **Bad:** `alt="image"` or `alt=""`
- **Good:** `alt="TLB excavator on a road construction site in Pretoria, Gauteng"`
- Decorative images only: `alt=""` with `role="presentation"`

---

## 8. Accessibility Checklist

- [ ] All images have meaningful alt text.
- [ ] All interactive elements are keyboard-accessible.
- [ ] Focus styles are visible (don't remove `outline`).
- [ ] Colour contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text).
- [ ] Form labels are properly associated with inputs.
- [ ] Social media links have `aria-label` (e.g. `aria-label="Follow us on Facebook"`).
- [ ] Skip-to-content link at the top of every page.
- [ ] Heading hierarchy is logical: one `<h1>` per page, then `<h2>`, `<h3>`, etc.
- [ ] Navigation landmark (`<nav>`) with `aria-label`.
- [ ] Main content wrapped in `<main>`.
- [ ] Footer wrapped in `<footer>`.
- [ ] Language attribute set: `<html lang="en-ZA">`.

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse Best Practices | ≥ 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

### Key Performance Actions

1. **Remove jQuery** — use vanilla JS for any interactivity.
2. **Remove OWL Carousel** — use CSS scroll snap or a lightweight alternative.
3. **Remove WOW.js** — use Intersection Observer API directly or CSS `@keyframes` with `animation-play-state`.
4. **Use a single icon library** — prefer inline SVGs or a single set (Lucide, Heroicons).
5. **Self-host fonts** — download Google Fonts and serve locally to avoid render-blocking.
6. **Purge unused CSS** — Tailwind does this automatically.
7. **Lazy load all below-fold images** — `loading="lazy"` on all non-hero images.
8. **Defer non-critical JS** — use `defer` or `type="module"`.

---

## 10. Navigation Fix

The new navigation must:

1. Have correct active state detection using `Astro.url.pathname`.
2. Link to real pages (no `blogx.html` or `teamx.html`).
3. Have a working logo link to `/`.
4. Have a working "Request Quote" button linking to `/contact`.
5. Include a WhatsApp link (common in South Africa).
6. Be fully keyboard-navigable.

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];
---

<nav aria-label="Main navigation">
  {navLinks.map(link => (
    <a
      href={link.href}
      class:list={['nav-link', { active: currentPath === link.href }]}
      aria-current={currentPath === link.href ? 'page' : undefined}
    >
      {link.label}
    </a>
  ))}
</nav>
```

---

## 11. Deployment

### Recommended: Netlify or Vercel

Both support Astro out of the box with zero configuration.

**Netlify:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

**Environment Variables to Set:**
- `RESEND_API_KEY` — for contact form emails.

### Domain Configuration

The domain `phehlwanagroup.co.za` is currently live. Plan the cutover:
1. Build and test on a preview URL first.
2. Update DNS to point to new host only when the new site is fully tested.
3. Set up redirects for any old URLs (e.g. `/service.html` → `/services`).

---

## 12. Pre-Launch Checklist

### Content
- [ ] All Lorem Ipsum replaced with real content.
- [ ] Company name spelled consistently as "Phehlwana" throughout.
- [ ] Single consistent address used everywhere.
- [ ] Real team photos and bios.
- [ ] At least 3 real project case studies.
- [ ] CIDB registration number added.
- [ ] B-BBEE level/certificate added.
- [ ] Company registration number added.
- [ ] Privacy policy page created.

### Technical
- [ ] All pages have unique, keyword-rich `<title>` and `<meta description>`.
- [ ] Open Graph images set for all pages.
- [ ] JSON-LD structured data on home and contact pages.
- [ ] `sitemap.xml` generated and submitted to Google Search Console.
- [ ] `robots.txt` in place.
- [ ] All internal links work (no 404s).
- [ ] Contact form tested end-to-end.
- [ ] Google Analytics or Plausible Analytics installed.
- [ ] Google Search Console verified.
- [ ] Google Business Profile linked to website.
- [ ] SSL certificate active (HTTPS).
- [ ] 404 page in place.
- [ ] Lighthouse audit run on all pages.

### Social
- [ ] Real Facebook URL added.
- [ ] Real Instagram URL added.
- [ ] Real LinkedIn URL added.
- [ ] WhatsApp business number added.
- [ ] Social media icons have `aria-label` attributes.

---

## 13. Recommended New Pages

Beyond fixing existing pages, add:

| Page | Priority | Reason |
|---|---|---|
| `/projects` | High | Construction companies win work by showing past work |
| `/projects/[slug]` | High | Individual case studies with photos, scope, outcome |
| `/services/construction` | High | Dedicated page for SEO targeting |
| `/services/plant-hire` | High | High search volume for plant hire in Pretoria |
| `/services/cleaning` | Medium | Separate page improves SEO |
| `/services/mechanical` | Medium | Separate page improves SEO |
| `/certifications` | Medium | CIDB, B-BBEE, ISO — builds trust |
| `/faq` | Medium | Reduces support enquiries |
| `/thanks` | High | Required for form redirect |
| `/404` | High | Professional error handling |
| `/privacy-policy` | Medium | Legal requirement |

---

## 14. Quick Wins (Can Be Done Immediately)

These can be fixed on the current site while the rebuild is in progress:

1. Fix the `<title>` tags on `blog.html` and `team.html`.
2. Add basic `<meta name="description">` to all pages.
3. Fix the broken nav links (`blogx.html` → `blog.html`, `teamx.html` → `team.html`).
4. Fix the "Request Quote" button `href` to point to `contact.html`.
5. Fix the nested `<form>` bug on `contact.html`.
6. Fix the `_next` URL in the contact form.
7. Add `alt` text to the logo images.
8. Remove the "Buy Pro Version" button from blog and team pages.
