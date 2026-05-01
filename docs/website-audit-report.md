# Phehlwana Group Investments — Website Audit Report

**Site:** [phehlwanagroup.co.za](https://phehlwanagroup.co.za/)  
**GitHub:** [jchademwiri/phehlwana-group](https://github.com/jchademwiri/phehlwana-group)  
**Audit Date:** May 2026  
**Auditor:** Kiro AI  
**Stack Audited:** Static HTML/CSS/JS (Bootstrap 5, jQuery, OWL Carousel, WOW.js)

---

## Executive Summary

The current site is a partially-customised Bootstrap 5 HTML template (originally "LifeSure" by HTML Codex) that has been adapted for Phehlwana Group. While it establishes a basic online presence, it carries significant technical debt, incomplete customisation, broken assets, zero SEO metadata, and several UX/accessibility issues that undermine credibility and discoverability. A full rebuild in Astro is the right call.

**Overall Score: 38 / 100**

| Category | Score |
|---|---|
| SEO | 4 / 20 |
| Design / Visual | 10 / 20 |
| UI / UX | 9 / 20 |
| Performance | 7 / 20 |
| Accessibility | 5 / 10 |
| Code Quality | 3 / 10 |

---

## 1. SEO Audit

### 1.1 Meta Tags — Critical Failures

Every single page has empty `<meta>` tags:

```html
<meta content="" name="keywords">
<meta content="" name="description">
```

- **No page descriptions** — Google cannot generate meaningful snippets; click-through rates will be near zero.
- **No Open Graph tags** — Sharing on WhatsApp, LinkedIn, or Facebook shows no image, title, or description.
- **No Twitter/X Card tags** — Same problem on X.
- **No canonical tags** — Risk of duplicate content penalties.
- **No structured data (JSON-LD)** — No chance of rich results (star ratings, business info, breadcrumbs) in Google.
- **No sitemap.xml** — Search engines have no map of the site.
- **No robots.txt** — No crawl guidance.

### 1.2 Page Titles

| Page | Current Title | Issue |
|---|---|---|
| index.html | Phehlwana Group Investments | Generic, no keyword |
| about.html | Phehlwana Group Investments | Identical to home |
| service.html | Phehlwana Group Investments | Identical to home |
| contact.html | Phehlwana Group Investments | Identical to home |
| blog.html | **LifeSure - Life Insurance Website Template** | Template title never replaced |
| team.html | **LifeSure - Life Insurance Website Template** | Template title never replaced |

### 1.3 Heading Structure

- `<h4>` is used as the first heading on most pages (e.g. "About Phehlwana Group Investments"), skipping `<h1>` and `<h2>`. This breaks semantic hierarchy and confuses crawlers.
- The hero carousel uses `<h1>` correctly but the rest of the page hierarchy collapses.
- No keyword-rich headings targeting South African construction/civil engineering search terms.

### 1.4 Image Alt Text

- All carousel images: `alt=""` — empty.
- All service images: `alt=""` — empty.
- Logo images: `alt="Logo"` — generic, not descriptive.
- Footer Instagram images: `alt=""` — empty.
- The `sed.png` about image: `alt=""` — empty.

### 1.5 URL Structure

- All pages use `.html` extensions with no logical hierarchy (e.g. `/services/construction` vs `/service.html`).
- Blog and team pages are referenced as `blogx.html` and `teamx.html` in the nav dropdown — these files do not exist in the repo.

### 1.6 Content Gaps

- No location-specific content targeting "construction company Pretoria" or "plant hire Montana Park".
- No CIDB grading or B-BBEE level mentioned anywhere.
- No certifications, registrations, or compliance information.
- Company name is spelled inconsistently: "Phehlwana" vs "Phehlawana" (typo in about text).

---

## 2. Design Audit

### 2.1 Template Origin — Incomplete Customisation

The site is built on the "LifeSure" life insurance template. Several pages (`blog.html`, `team.html`) were never properly customised:

- Title still reads "LifeSure - Life Insurance Website Template".
- Footer still shows "LifeSure" branding with placeholder "123 Street New York, USA" address.
- Footer contact shows "example@gmail.com" and "+0123 456 7890".
- Blog content is entirely Lorem Ipsum placeholder text.
- Team page shows "David James / Profession" × 4 with placeholder images that don't exist.
- The "Buy Pro Version" button linking to htmlcodex.com is still present in the blog and team navbars.

### 2.2 Logo Implementation

The logo is implemented using a CSS 3D Windows-logo animation (`main-div` with rotating squares) as a wrapper around the actual logo image. This is:
- Visually confusing — the logo appears to be a spinning Windows logo.
- Inaccessible — no meaningful alt text or ARIA label.
- Inconsistent — the footer uses a plain `<img>` without the animation.
- The logo `<a>` tag has no `href` value (just `href="#"`), so clicking the logo doesn't navigate home.

### 2.3 Visual Consistency

- The hero carousel uses only one image (`carousel-2.png`) for both slides — no visual variety.
- Service cards use blog post images (`blog-1.png` through `blog-4.png`) — these are clearly repurposed from the template and don't represent actual services.
- The about section image (`sed.png`) appears to be a placeholder or unrelated graphic.
- Footer "Explore Our Plant" / "Instagram" section references images that don't exist (`instagram-footer-1777.jpg`, etc.) — these will render as broken images.
- No real photography of the company, projects, equipment, or team.

### 2.4 Colour & Typography

- Primary colour is Bootstrap blue (`#015FC9`) — functional but generic for a construction company.
- No brand colour system defined beyond Bootstrap defaults.
- Two fonts loaded (DM Sans, Inter) but no clear typographic hierarchy applied.
- Font Awesome 5 + Bootstrap Icons both loaded — redundant icon libraries adding unnecessary weight.

### 2.5 Missing Pages / Sections

- No Projects / Portfolio page — critical for a construction company.
- No Testimonials / Client Logos section.
- No Certifications / Compliance section (CIDB, B-BBEE, ISO).
- No FAQ page.
- No 404 error page.
- Blog and Team pages exist but are entirely placeholder content.

---

## 3. UI / UX Audit

### 3.1 Navigation

- The "Explore" dropdown links to `blogx.html` and `teamx.html` — files that don't exist. Clicking these will produce 404 errors.
- The "Request Quote" CTA button on `about.html` and `service.html` has an empty `href=""` — clicking it reloads the page.
- The active nav state is incorrect: `about.html` marks "Home" as active instead of "About".
- No mobile-first consideration for the topbar — it's hidden on mobile (`d-none d-lg-block`) but the contact info it contains is important.
- Language switcher dropdown lists Bangla, French, Spanish, Arabic on some pages (template defaults) — not relevant for a South African company. Other pages correctly list local languages (IsiNdebele, Sesotho, IsiZulu, Sepedi) but the feature is non-functional (all links are `href="#"`).

### 3.2 Contact Form

- The contact form has a structural bug: there are **two nested `<form>` tags** — the outer one has no action, the inner one uses `formsubmit.co`. Nested forms are invalid HTML and will cause unpredictable behaviour.
- The `_next` redirect URL is `https://phehlwanagroup/thanks.html` — missing `.co.za` and the `thanks.html` page doesn't exist.
- Form fields use `type="phone"` — this is not a valid HTML input type (should be `type="tel"`).
- No client-side validation or required field indicators.
- No CAPTCHA or spam protection (the hidden field explicitly sets `_captcha: false`).
- The `form.css` and `form.js` files are referenced in `contact.html` but don't exist at the referenced path.

### 3.3 Calls to Action

- "Watch Video" buttons exist on the hero carousel but link to `href="#"` — no video exists.
- "Learn More" buttons on the carousel link to `href="#"`.
- Service card "Read More" links all go to `href="#"` or `service.html` — no individual service detail pages.
- The phone number in the navbar (`012 655 0284`) is a `tel:` link but formatted with spaces — some mobile browsers may not parse this correctly.

### 3.4 Mobile Experience

- The hero carousel height is set to `700px` on desktop, `1300px` on tablet, `950px` on mobile — the tablet height is excessively tall.
- The animated logo wrapper causes layout issues on mobile due to the 3D transform.
- The topbar (address, email, social links) is hidden on mobile with no alternative.
- No sticky header on mobile — users must scroll all the way back up to navigate.

### 3.5 Loading & Performance UX

- Page spinner is present but set to disappear after 1ms (`setTimeout(..., 1)`) — effectively invisible and pointless.
- No lazy loading on images.
- No `loading="lazy"` on the Google Maps iframe.
- Multiple CDN requests on every page load (jQuery, Bootstrap, Font Awesome, Google Fonts, Bootstrap Icons).

---

## 4. Performance Audit

### 4.1 Dependencies & Bundle Size

Every page loads the following external resources:

| Resource | Type | Issue |
|---|---|---|
| Google Fonts (2 families) | CSS | Render-blocking |
| Font Awesome 5 (full) | CSS | ~400KB, only a few icons used |
| Bootstrap Icons | CSS | Redundant with Font Awesome |
| Bootstrap 5 CSS (local) | CSS | Full framework, no purging |
| Animate.css | CSS | Full library for a few animations |
| Lightbox CSS | CSS | Used only in footer (broken images) |
| OWL Carousel CSS | CSS | Used only on homepage |
| jQuery 3.6.4 | JS | ~90KB, loaded from Google CDN |
| Bootstrap 5 JS | JS | Full bundle |
| WOW.js | JS | Scroll animations |
| Easing.js | JS | jQuery easing plugin |
| Waypoints.js | JS | Scroll detection |
| CounterUp.js | JS | Counter animations |
| Lightbox.js | JS | Used only in footer |
| OWL Carousel JS | JS | Used only on homepage |

All of these are loaded on every page regardless of whether they're needed.

### 4.2 Images

- No WebP format — all images are PNG/JPEG.
- No responsive images (`srcset`/`sizes`).
- No image compression evidence.
- Broken image references throughout (footer Instagram grid, team photos).

### 4.3 Caching & Hosting

- No evidence of a CDN for the site itself.
- No service worker or offline capability.
- Static HTML with no build optimisation.

---

## 5. Accessibility Audit

### 5.1 Critical Issues

- All decorative and content images have empty or missing `alt` attributes.
- The spinner uses `<span class="sr-only">Loading...</span>` — `sr-only` is a Bootstrap utility class but the spinner `role="status"` is correct.
- Colour contrast: light grey text on white backgrounds in several sections likely fails WCAG AA (4.5:1 ratio).
- The animated logo has no accessible name.
- Form labels exist but are visually hidden (floating labels) — screen readers should handle these, but the nested form structure breaks the association.
- Social media icon links have no accessible text (e.g. `<a href="#"><i class="fab fa-facebook-f"></i></a>` — no `aria-label`).
- The language switcher is non-functional but presents as interactive — misleading for assistive technology users.

### 5.2 Keyboard Navigation

- No visible focus styles beyond browser defaults.
- The dropdown menus rely on hover (CSS `rotateX`) — keyboard users cannot access them without JavaScript.
- No skip-to-content link.

---

## 6. Code Quality Audit

### 6.1 HTML

- Massive code duplication: the entire navbar, topbar, and footer are copy-pasted across all 6 pages with no templating.
- Inconsistent indentation and formatting throughout.
- Invalid HTML: nested `<form>` elements on contact page.
- `<br>` tags used for spacing instead of CSS margins.
- Inline styles scattered throughout (`style="max-width: 800px;"`, `style="height: 120px"`, etc.).
- `<b>` tags used inside `<li>` elements instead of semantic `<strong>`.
- `py-7` and `g-7` Bootstrap classes used — these don't exist in Bootstrap 5 (max is 5), so they have no effect.

### 6.2 CSS

- The `style.css` file contains unrelated CSS at the bottom: a Windows logo animation (`.main-div`, `@keyframes rotate-windows`) and a Twitter/X icon hack — these are leftover experiments.
- No CSS custom properties (variables) defined — relies entirely on Bootstrap's `var(--bs-*)` tokens.
- No dark mode support.

### 6.3 JavaScript

- jQuery used for everything — no modern vanilla JS or framework.
- The spinner timeout is set to `1ms` — effectively broken.
- No error handling anywhere.
- `console.log` debugging not present but no structured error reporting either.

### 6.4 Security

- Contact form has `_captcha: false` — open to spam.
- No Content Security Policy headers (static site, but still relevant).
- Social media links all use `href="#"` — no `rel="noopener noreferrer"` needed but also no actual links.

---

## 7. Content Audit

### 7.1 Accuracy Issues

- Company name spelled as "Phehlawana" (missing 'n') in the about section body text.
- Two different addresses used: "62 Taaifontein Street, Montana Park" (topbar) vs "Office No 06, PKN Office Park, Montana" (footer) — these may be the same location but are presented inconsistently.
- Stats (129 projects, 20 awards, 50 professionals, 6 management) are unverified and may be outdated.
- "20 Awards WON" — no awards are named or evidenced anywhere on the site.

### 7.2 Missing Content

- No project portfolio or case studies.
- No client list or testimonials.
- No CIDB registration number or grading.
- No B-BBEE certificate or level.
- No company registration number.
- No VAT number.
- No team bios or photos.
- No blog content (all Lorem Ipsum).
- No privacy policy or terms of service.
- No WhatsApp contact option (common expectation in South Africa).

---

## 8. Summary of Issues by Priority

### 🔴 Critical (Fix Before Launch)

1. Empty meta descriptions on all pages.
2. Broken nav links (`blogx.html`, `teamx.html` don't exist).
3. Nested form bug on contact page.
4. Template content left on blog and team pages (LifeSure branding, Lorem Ipsum, placeholder data).
5. Broken image references throughout (footer gallery, team photos).
6. Empty `href` on "Request Quote" buttons.
7. Wrong `_next` URL in contact form.

### 🟠 High Priority

8. All images missing meaningful alt text.
9. No Open Graph / social sharing metadata.
10. No structured data (LocalBusiness schema).
11. Inconsistent company name spelling.
12. Inconsistent address information.
13. Logo animation is confusing and inaccessible.
14. Active nav state incorrect on about page.
15. Language switcher non-functional.

### 🟡 Medium Priority

16. No portfolio/projects section.
17. No testimonials or social proof.
18. No CIDB/B-BBEE compliance information.
19. Redundant icon libraries (Font Awesome + Bootstrap Icons).
20. No lazy loading on images.
21. No sitemap.xml or robots.txt.
22. Inline styles should be moved to CSS.
23. `py-7` / `g-7` Bootstrap classes that don't exist.

### 🟢 Low Priority / New Build Improvements

24. Migrate to Astro with component-based architecture (eliminates duplication).
25. Implement WebP images with responsive `srcset`.
26. Add proper SEO with per-page metadata.
27. Add WhatsApp contact integration.
28. Implement proper contact form with validation and CAPTCHA.
29. Add dark mode support.
30. Add a Projects/Portfolio page.
