# Site Content - Phehlwana Group Investments

> **Purpose:** This folder contains the structured content for every page of the
> Phehlwana Group Investments website. Each file is the single source of truth for
> that page's copy, structure, and content requirements.
>
> All recommendations from the initial content audit have been applied. Remaining
> items require input from the client (real photos, team details, accreditation numbers).

---

## Files in This Folder

| File              | Page                  | Status                                                    |
|-------------------|-----------------------|-----------------------------------------------------------|
| `home.md`         | Homepage              | ✅ Copy written - needs photos, social URLs               |
| `about.md`        | About Us              | ✅ All sections written - needs client story, accreditations, awards list |
| `services.md`     | Our Services (all 5)  | ✅ All 5 services detailed incl. Security - needs real photos, plant hire specs |
| `blog.md`         | Blog / News           | ✅ 6 full articles written and ready to publish           |
| `team.md`         | Our Team              | ✅ Structure and guidelines ready - needs real team data  |
| `contact.md`      | Contact Us            | ✅ Resend form documented, FAQ added, WhatsApp added      |
| `faq.md`          | FAQ *(new page)*      | ✅ Full FAQ written incl. Security - needs client-specific answers |
| `thank-you.md`    | Thank You *(new page)*| ✅ Ready - stub already exists at `src/pages/thank-you.astro` |

**Legend:**
- ✅ Content written and applied
- 🟡 Needs client input to complete
- 🔴 Not started

---

## What Was Applied (Changes from Initial Audit)

### Corrections from Documentation Review (May 2026)
- ✅ **Security division added** - 5th service confirmed in `navigation.ts` and `src/pages/services/security.astro`; added to all service listings, FAQ, contact form dropdown, and homepage
- ✅ **Developer credit corrected** - "Apex Web Solutions" (per `navigation.ts`), not "Mothupi Solutions" (old site)
- ✅ **Form backend corrected** - Resend + Astro Server Actions (per developer guide), not FormSubmit.co
- ✅ **Site URL corrected** - `https://phehlwanagroup.co.za` (no `www`), per `astro.config.mjs`
- ✅ **Navigation corrected** - Services is a dropdown with 5 divisions; Projects is a top-level nav item; no "Explore" dropdown; no Blog in main nav
- ✅ **Service URLs corrected** - each service has its own page: `/services/construction`, `/services/mechanical`, `/services/cleaning`, `/services/plant-hire`, `/services/security`
- ✅ **Contact form service dropdown** - Security added as an option
- ✅ **`?service=` URL param** - documented on all service CTAs (pre-populates contact form)
- ✅ **Thank You page** - already exists as stub at `src/pages/thank-you.astro` (Phase 0)
- ✅ **PSIRA compliance** - added to Security service and FAQ
- ✅ **Twitter/X removed from social** - developer guide only lists Facebook, Instagram, LinkedIn

### Copy & Content
- ✅ All Lorem Ipsum placeholder text replaced with real, written content
- ✅ Company description rewritten and expanded (fixed "Phehlawana" typo throughout)
- ✅ Vision statement expanded from 1 line to a full aspirational statement
- ✅ Mission statement expanded to include HOW the company delivers
- ✅ "Our Purpose" renamed to "Our Values" with 6 values, each with a description
- ✅ Footer tagline grammar fixed ("concept demand" → proper sentence)
- ✅ Contact page headline rewritten ("Have a Project in Mind? Let's Talk.")
- ✅ Services page intro expanded to mention experience, team size, and client types
- ✅ Plant Hire section significantly expanded with equipment table, hire options, and process
- ✅ Mechanical Engineering section expanded with industries served and safety compliance
- ✅ 6 full blog articles written and ready to publish (no Lorem Ipsum)
- ✅ Team page intro written (replaced Lorem Ipsum)
- ✅ Bio writing guidelines and example bios added to team page

### New Sections Added
- ✅ Hero Slide 3 added (Cleaning & Waste Management)
- ✅ Security service added as 5th service card on homepage
- ✅ "Our Story" section added to About page
- ✅ "Why Choose Us" section added to About page (8 differentiators)
- ✅ "Accreditations & Certifications" section added to About page
- ✅ "Awards & Recognition" section added to About page
- ✅ "Meet the Team" preview section added to About page
- ✅ "Client Testimonials" section added to About page
- ✅ "How We Work" (5-step process) section added to Services page
- ✅ "Safety Commitment" section added to Services page
- ✅ Bottom CTA section added to Services page
- ✅ "Our Skilled Workforce" section added to Team page
- ✅ "Join Our Team / Careers" section added to Team page
- ✅ FAQ section added to Contact page
- ✅ WhatsApp link added to Contact page
- ✅ Operating hours table added to Contact page
- ✅ Phone numbers labelled (Office vs Mobile)
- ✅ Trust / Accreditation strip added to Homepage
- ✅ Content calendar added to Blog page
- ✅ Security FAQ category added to FAQ page

### New Pages Created
- ✅ `faq.md` - Full FAQ page with 28+ questions across 6 categories (incl. Security)
- ✅ `thank-you.md` - Post-form-submission confirmation page

---

## Global Content (Standardised)

### Company Details

| Item              | Value                                                                               |
|-------------------|-------------------------------------------------------------------------------------|
| Company Name      | Phehlwana Group Investments                                                         |
| Trading Name      | Phehlwana Group                                                                     |
| Established       | 2015                                                                                |
| Address           | Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182 |
| Phone (Office)    | 012 655 0284 / +27 12 655 0284                                                      |
| Phone (Mobile)    | 079 294 7635 / +27 79 294 7635                                                      |
| WhatsApp          | https://wa.me/27792947635                                                           |
| Email             | info@phehlwanagroup.co.za                                                           |
| Website           | www.phehlwanagroup.co.za                                                            |
| Designer/Dev      | Apex Web Solutions (apexwebsolutions.co.za)                                         |

### Navigation Structure

```
Home          /
About         /about
Services      (dropdown - 5 divisions)
  ├── Construction & Civil Engineering  /services/construction
  ├── Mechanical Engineering            /services/mechanical
  ├── Cleaning & Waste Management      /services/cleaning
  ├── Plant Hire                       /services/plant-hire
  └── Security                         /services/security
Projects      /projects
Contact       /contact
FAQ           /faq          ← new page
Thank You     /thank-you    ← new page (noindex)
[Request Quote] → /contact  ← CTA button
```

> Source of truth: `src/data/navigation.ts`
> To add/change nav items, edit that file only - Header, Footer, and sitemap update automatically.

### Footer (Standardised)

**Tagline:**
> We pride ourselves on our ability to meet the latest client specifications and deliver on every concept - from the first consultation to final handover.

**Links:** About Us | Services | Projects | Contact

**Contact:**
- Address: Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
- Email: info@phehlwanagroup.co.za
- Phone: 012 655 0284

**Newsletter:** Subscribe for project updates and industry news
*(Backend: connect to Mailchimp / Brevo before launch)*

**Copyright:** © Phehlwana Group Investments 2026. All rights reserved.
Designed by [Apex Web Solutions](https://apexwebsolutions.co.za)

---

## Remaining TODOs - Client Must Provide

These items cannot be written without information from the client:

### 🔴 Required Before Launch

| # | Item                          | Page(s)                    | Notes                                                  |
|---|-------------------------------|----------------------------|--------------------------------------------------------|
| 1 | Social media profile URLs     | All pages (topbar + footer) | Facebook, Instagram, LinkedIn - update `navigation.ts` |
| 2 | Team member names & titles    | Team, About                | All 6 management team members                          |
| 3 | Team member bios              | Team                       | Follow bio guidelines in `team.md`                     |
| 4 | Team member headshots         | Team, About                | Professional photos - see photo guidelines in `team.md` |
| 5 | Newsletter platform setup     | All pages (footer)         | Mailchimp or Brevo account + form integration          |
| 6 | Hero images (3)               | Homepage                   | Real project/site photography                          |
| 7 | Service images (5)            | Services, Homepage         | One per service - construction, mechanical, cleaning, plant hire, security |
| 8 | Blog post images (6)          | Blog                       | One per article - see image paths in `blog.md`         |
| 9 | Resend domain verification    | Contact form               | Verify `phehlwanagroup.co.za` in Resend before Phase 6 |

### 🟡 Important (Complete Soon After Launch)

| # | Item                          | Page(s)                    | Notes                                                  |
|---|-------------------------------|----------------------------|--------------------------------------------------------|
| 10 | CIDB registration number     | About, FAQ                 | Grade 4CE, 5GB confirmed; need registration number     |
| 11 | BBBEE certificate document   | About, FAQ                 | Level 1 confirmed; need PDF certificate for upload     |
| 12 | PSIRA registration number    | Services (Security), FAQ   | Required for security services                         |
| 13 | Client testimonials          | About                      | 2–3 quotes with permission to publish                  |
| 14 | Plant hire specs             | Services, FAQ              | Equipment capacity, tonnage, kVA                       |
| 19 | Plant hire hire periods      | Services, FAQ              | Minimum hire, daily/weekly/monthly rates               |
| 20 | Plant hire delivery policy   | FAQ                        | Delivery charges, collection process                   |
| 21 | Public liability insurance   | FAQ                        | Confirm coverage                                       |
| 18 | CV submission email          | Team                       | Confirm careers@ email address                         |
| 19 | Project photos + descriptions | Projects page             | Minimum 6 projects for portfolio (Phase 5)             |

---

## Content Approval Checklist

Before any page goes live, confirm:

- [ ] All `[TODO]` items resolved or deferred with a decision
- [ ] All images are real, high-quality, and have descriptive alt text
- [ ] All links tested and pointing to correct destinations
- [ ] Social media URLs confirmed and working (`navigation.ts` updated)
- [ ] Contact details accurate and consistent across all pages
- [ ] Contact form tested end-to-end (submit → Resend email received → redirect to /thank-you)
- [ ] Spelling and grammar checked by a human reviewer
- [ ] Content approved by Phehlwana Group management
- [ ] Newsletter form connected to email platform
- [ ] Google Analytics 4 installed and verified (Phase 7)
- [ ] Google Search Console verified + sitemap submitted (Phase 7)
- [ ] Resend domain verified before Phase 6
- [ ] No `href="#"` in navigation (social links excepted until URLs confirmed)
- [ ] Company name spelled "Phehlwana" consistently throughout (run content sweep)
