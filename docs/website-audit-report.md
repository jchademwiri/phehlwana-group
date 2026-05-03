# Phehlwana Group Investments — Website Audit Report

**Site:** https://phehlwanagroup.co.za
**Repo:** https://github.com/jchademwiri/phehlwana-group.git
**Audit Date:** May 2026
**Auditor:** Claude (Anthropic)
**Scope:** Design, SEO, UI/UX, Performance, Content, Technical

---

## Executive Summary

The current site is functional and contains all the essential pages (Home, About, Services, Contact). However, it was built on a generic Bootstrap template — **HTMLCodex's "LifeSure"**, a life insurance template — that was never purpose-built for a construction or engineering company. This mismatch creates brand inconsistency, weak SEO signals, and a user experience that does not inspire confidence in prospective B2B clients. The rebuild is an opportunity to create a site that genuinely reflects the company's credibility, credentials, and range of services.

**Overall Score: 42 / 100**

| Category | Score | Status |
|---|---|---|
| Design & Visual Identity | 5/20 | ⚠️ Needs major work |
| SEO | 6/20 | ⚠️ Needs major work |
| UI/UX | 12/25 | ⚠️ Needs improvement |
| Performance & Technical | 10/20 | ⚠️ Needs improvement |
| Content & Messaging | 9/15 | 🟡 Fair |

---

## 1. Design & Visual Identity

### 1.1 Template Origin — Critical Issue

The site is built on HTMLCodex's "LifeSure" life insurance template. Evidence of this is still visible in `blog.html` and `team.html`, which carry the original "LifeSure" branding and Lorem Ipsum placeholder content. This creates:

- Inconsistent branding across pages
- Sections with no real content (team page has placeholder names "David James x4")
- Mismatched design language (insurance-style vs construction industry)

### 1.2 Logo & Brand Mark

- The logo appears correctly on pages using `img/logo.png` (dark background) and `img/logow.png` (footer/white).
- There is **no favicon** defined in any `<head>` — the browser tab shows a blank icon.
- No brand colour palette is documented or consistently applied beyond the template's default `--primary`.

### 1.3 Hero / Carousel

- Both carousel slides use the **same image** (`carousel-2.png`). This looks like an oversight and significantly reduces visual impact.
- The "Watch Video" CTA button links to `#` — no video exists. This is a broken promise to the user.
- "Learn More" on both slides also links to `#`.

### 1.4 Imagery

- Service cards use `blog-1.png`, `blog-2.png`, etc. — these are clearly placeholder blog images from the original template, not actual construction or site photography.
- The footer image grid ("Explore Our Plant") references images with `7777` suffixes, suggesting renamed placeholders that may not be displaying real company imagery.
- The about section uses `sed.png` — an unclear, unnamed placeholder.
- **No real photography of the company's projects, equipment, or staff exists on the site.**

### 1.5 Colour & Typography

- Typography uses `DM Sans` + `Inter` — acceptable but generic for the construction sector.
- The primary blue (`#2596be`, per WhatsApp widget config) is used throughout. There are no secondary or accent colours to create visual hierarchy.
- No dark or contrasting sections to create rhythm on long-scrolling pages.

---

## 2. SEO

### 2.1 Meta Tags — Critical Issue

Every page contains:

```html
<meta content="" name="keywords">
<meta content="" name="description">
```

**All meta descriptions and keywords are blank.** This is a critical SEO failure — search engines use meta descriptions as the snippet text in results pages. A blank description means Google auto-generates one, usually poorly.

### 2.2 Page Titles

- Most pages are titled `"Phehlwana Group Investments"` with no page-specific context.
- `blog.html` and `team.html` are still titled `"LifeSure - Life Insurance Website Template"` — this actively damages search rankings if those pages are indexed by Google.

### 2.3 Heading Structure

- Multiple `<h1>` tags appear on the home page (the carousel uses `display-1` styled `<h1>` for both slides).
- About and Services sections use `<h4>` for section headers and `<h1>` for body headings — the hierarchy is inverted.
- Correct structure: one `<h1>` per page → `<h2>` for section headers → `<h3>` for sub-sections.

### 2.4 Image Alt Text

- Most images have empty `alt=""` attributes or generic text like `"Image"`.
- Alt text is critical for both accessibility and image search SEO.

### 2.5 Schema Markup

- No structured data (JSON-LD) is present anywhere on the site.
- A construction company should implement `LocalBusiness`, `Organization`, and `Service` schema at minimum.

### 2.6 Open Graph / Social Sharing

- No `og:title`, `og:description`, or `og:image` tags on any page.
- When the site is shared on WhatsApp, LinkedIn, or Facebook, no preview card will generate — just a plain link.

### 2.7 Canonical Tags & Sitemap

- No `<link rel="canonical">` tags present.
- No `sitemap.xml` or `robots.txt` exists in the codebase.

### 2.8 Local SEO

- The office address (PKN Office Park, Montana, Pretoria) is mentioned in the footer but there is no Google Business Profile schema integration.
- The Google Maps embed on the contact page is positive, but schema data would reinforce local ranking signals.

### 2.9 Content Keyword Targeting

- No evidence of keyword research informing the page copy.
- High-value South African construction search terms — "construction company Pretoria", "plant hire Gauteng", "civil engineering contractors Tshwane", "road maintenance Pretoria" — are absent from headings and body copy.

---

## 3. UI / UX

### 3.1 Navigation

- The nav includes a language switcher (English, IsiNdebele, Sesotho, IsiZulu, Sepedi) — **none of these translations are implemented**. All options link to `#`. Either implement translations or remove the switcher entirely.
- On mobile, the navbar logo area uses `<br><br><br>` tags for spacing — this is a layout hack that breaks on smaller screens.
- The "Explore" dropdown leads to `blogx.html` and `teamx.html` — both contain unbranded LifeSure template content.

### 3.2 Calls to Action (CTAs)

At least **8 broken CTAs** were identified across the site:

| CTA | Page | Issue |
|---|---|---|
| Watch Video | Home | Links to `#` — no video exists |
| Learn More (×2) | Home carousel | Links to `#` |
| Request Quote | About, Services | Empty `href=""` — goes nowhere |
| Read More (×4) | Services | Links to `#` |
| Footer Useful Links (×6) | All pages | All link to `#` |

### 3.3 Contact Form

- The contact form on `contact.html` contains **two nested `<form>` tags** — this is invalid HTML and causes unpredictable browser behaviour.
- The outer form has no action attribute; the inner form uses FormSubmit.co correctly.
- The `<div id="sendmessage">` success message block is from an old jQuery-based handler and will not trigger with FormSubmit.
- `handler.php` exists with a typo: `$S_POST` instead of `$_POST` — the file is broken and is not connected to the live contact form.

### 3.4 WhatsApp Widget

- The floating WhatsApp widget is implemented and functional (phone: 0792947635).
- It appears on `index.html`, `contact.html`, and `service.html` but is **missing from `about.html`**. It should be consistent across all pages.

### 3.5 Mobile Responsiveness

- The Bootstrap 5 grid provides basic responsiveness.
- The navbar logo area uses `<br>` spacers that cause layout issues on mobile.
- Carousel headline text (`display-1`) is oversized on small screens and may overflow or wrap badly.
- Service cards stack correctly on mobile — this works well.

### 3.6 Accessibility

- The loading spinner uses `<span class="sr-only">` — a Bootstrap 4 class. In Bootstrap 5 the correct class is `visually-hidden`.
- No `aria-label` attributes on icon-only social media buttons.
- No "skip to content" link for keyboard navigation users.
- Light grey text on white backgrounds in several sections may not meet WCAG AA contrast requirements (4.5:1 ratio minimum).

### 3.7 Newsletter Form

- The footer newsletter input has no `action` attribute — submissions go nowhere.
- No email format validation is applied to the field.

### 3.8 Missing Pages / Dead Ends

| Page / Link | Issue |
|---|---|
| `blogx.html` | Unbranded LifeSure template content |
| `teamx.html` | Placeholder team members ("David James ×4") |
| `thanks.html` | Referenced in FormSubmit redirect — does not exist, returns 404 |
| Footer FAQ link | Links to `#` |

---

## 4. Performance & Technical

### 4.1 Library Loading

- jQuery 3.6.4 loaded from Google CDN — acceptable.
- Bootstrap 5.0.0 JS loaded from CDN — not the latest version (5.3.x is current).
- Six additional libraries are loaded: WOW.js, EasingJS, Waypoints, CounterUp, Lightbox, OwlCarousel. These could be replaced with CSS animations and the Intersection Observer API for significantly better performance.
- All `<script>` tags are correctly placed at the bottom of `<body>`.

### 4.2 CSS Architecture

- Two stylesheets in use: `bootstrap.min.css` + `style.css`. Custom CSS is likely overriding Bootstrap defaults, creating specificity conflicts.
- `form.css` is linked in `contact.html` but appears to reference an old `contactform/` directory path — likely a broken link.

### 4.3 Image Optimisation

- No WebP format images in use — all images appear to be PNG or JPG.
- No `loading="lazy"` attribute on images (the Google Maps iframe has it correctly, but images do not).
- No `width` and `height` attributes on most images, which causes Cumulative Layout Shift (CLS) — a Core Web Vitals penalty.

### 4.4 HTTPS & Security

- The live site loads over HTTPS — this is correct.
- FormSubmit.co handles contact form submissions — acceptable for a static site, but all submissions pass through a third-party server.

### 4.5 Analytics — Critical Gap

- No Google Analytics (GA4) or Google Tag Manager present.
- No Facebook Pixel or LinkedIn Insight Tag.
- **There is currently no way to measure website traffic, user behaviour, or enquiry conversions.**

### 4.6 GitHub Repository

- The repo at `https://github.com/jchademwiri/phehlwana-group.git` is public.
- This is generally acceptable for a static business website, but ensure no API keys, credentials, form tokens, or sensitive business data are committed to the repository.

---

## 5. Content & Messaging

### 5.1 Brand Voice & Accuracy

- The about text contains a **typo in the company name**: "Phehlawana" (incorrect) vs "Phehlwana" (correct). This appears in both `index.html` and `about.html`.
- The language is formal but undifferentiated. "Premier service provider" is overused across the South African construction sector and does not help the company stand out.
- Vision and Mission statements are present but very brief and generic.

### 5.2 Services Content

- `service.html` has well-detailed service descriptions — this is a genuine strength and should be preserved in the rebuild.
- Each service section has `<a href="#">` "Read More" links that go nowhere. Individual service detail pages do not exist.
- Each service should have its own dedicated page for better SEO and user experience.

### 5.3 Social Proof

- Counter stats (129+ projects, 20+ awards, 50+ professionals) are present but unverified. Awards are not named anywhere on the site.
- No client logos, testimonials, case studies, or project portfolio.
- No certifications displayed (CIDB grading, ISO, health & safety) — these are critical trust signals for B2B and government clients in the SA construction industry.

### 5.4 B2B Trust Signals Missing

The following information, which procurement officers and project managers look for, is absent from the site:

- Company registration number
- CIDB contractor grading
- BBBEE certificate level
- Professional Indemnity / Public Liability insurance
- Named awards with years
- Real project photography

---

## Summary of Critical Issues — Fix First

| Priority | Issue | Area |
|---|---|---|
| P0 | Blank meta descriptions on all pages | SEO |
| P0 | "LifeSure" titles on `blog.html` and `team.html` | SEO / Brand |
| P0 | 8+ broken CTA links (`href="#"` or `href=""`) | UX / Conversions |
| P0 | Nested `<form>` tags on contact page | Functionality |
| P0 | `thanks.html` missing — 404 after form submit | UX |
| P0 | No analytics — zero visibility into traffic | Business |
| P1 | Same image used on both carousel slides | Design |
| P1 | No favicon | Brand |
| P1 | Placeholder content on blog and team pages | Brand / SEO |
| P1 | No real project photography | Trust / Conversions |
| P1 | WhatsApp widget missing from `about.html` | UX |
| P2 | No JSON-LD schema markup | SEO |
| P2 | No Open Graph tags | Social sharing |
| P2 | Language switcher non-functional | UX |
| P2 | Company name typo ("Phehlawana") | Brand |
| P2 | No CIDB / BBBEE credentials displayed | Trust |
| P2 | Newsletter form has no action | Functionality |
