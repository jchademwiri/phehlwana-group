# Site Content — Phehlwana Group Investments

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
| `home.md`         | Homepage              | ✅ Copy written — needs photos, social URLs               |
| `about.md`        | About Us              | ✅ All sections written — needs client story, accreditations, awards list |
| `services.md`     | Our Services          | ✅ All 4 services fully detailed — needs real photos, plant hire specs |
| `blog.md`         | Blog / News           | ✅ 6 full articles written and ready to publish           |
| `team.md`         | Our Team              | ✅ Structure and guidelines ready — needs real team data  |
| `contact.md`      | Contact Us            | ✅ Form fixed, FAQ added, WhatsApp added                  |
| `faq.md`          | FAQ *(new page)*      | ✅ Full FAQ written — needs client-specific answers       |
| `thank-you.md`    | Thank You *(new page)*| ✅ Ready — no client input needed                         |

**Legend:**
- ✅ Content written and applied
- 🟡 Needs client input to complete
- 🔴 Not started

---

## What Was Applied (Changes from Initial Audit)

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
- ✅ Hero Slide 3 added (Cleaning & Waste Management — all 4 services now represented)
- ✅ "Our Story" section added to About page (with placeholder for client narrative)
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

### New Pages Created
- ✅ `faq.md` — Full FAQ page with 25+ questions across 5 categories
- ✅ `thank-you.md` — Post-form-submission confirmation page

### Technical Fixes Documented
- ✅ Contact form redirect URL fixed: `https://phehlwanagroup/thanks.html` → `https://www.phehlwanagroup.co.za/thank-you`
- ✅ Spam protection: FormSubmit honeypot field documented
- ✅ Auto-response email rewritten professionally
- ✅ Duplicate `<form>` tags flagged for removal
- ✅ "Your Project" free-text field replaced with service-type dropdown (8 options)
- ✅ Address standardised across all pages: "Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182"
- ✅ Map iframe `title` attribute added for accessibility
- ✅ "Features" removed from footer navigation (was unclear/irrelevant)
- ✅ Language dropdown simplified (remove untranslated languages)
- ✅ "Watch Video" CTAs replaced with "Learn More" and "Request a Quote"
- ✅ Self-referencing "More Information" CTA on About page fixed → "View Our Services"
- ✅ Hospital icon on Construction service card flagged for replacement
- ✅ Phone number link format corrected: `tel:+27126550284`
- ✅ WhatsApp link format: `https://wa.me/27792947635`
- ✅ `noindex` meta added to Thank You page

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
| Designer/Dev      | Mothupi Solutions (www.mothupisolutions.co.za)                                      |

### Navigation Structure

```
Home          /
About         /about
Services      /services
Explore       (dropdown)
  ├── Blog    /blog
  └── Team    /team
Contact       /contact
FAQ           /faq          ← new page
Thank You     /thank-you    ← new page (noindex)
[Request Quote] → /contact  ← CTA button
```

### Footer (Standardised)

**Tagline:**
> We pride ourselves on our ability to meet the latest client specifications and deliver on every concept — from the first consultation to final handover.

**Links:** About Us | Services | Blog | Contact | FAQ

**Contact:**
- Address: Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
- Email: info@phehlwanagroup.co.za
- Phone: 012 655 0284

**Newsletter:** Subscribe for project updates and industry news
*(Backend: connect to Mailchimp / Brevo before launch)*

**Copyright:** © Phehlwana Group Investments 2026. All rights reserved.
Designed by [Mothupi Solutions](https://www.mothupisolutions.co.za)

---

## Remaining TODOs — Client Must Provide

These items cannot be written without information from the client:

### 🔴 Required Before Launch

| # | Item                          | Page(s)                    | Notes                                                  |
|---|-------------------------------|----------------------------|--------------------------------------------------------|
| 1 | Social media profile URLs     | All pages (topbar + footer) | Facebook, Twitter/X, Instagram, LinkedIn               |
| 2 | Team member names & titles    | Team, About                | All 6 management team members                          |
| 3 | Team member bios              | Team                       | Follow bio guidelines in `team.md`                     |
| 4 | Team member headshots         | Team, About                | Professional photos — see photo guidelines in `team.md` |
| 5 | Newsletter platform setup     | All pages (footer)         | Mailchimp or Brevo account + form integration          |
| 6 | Hero images (3)               | Homepage                   | Real project/site photography                          |
| 7 | Service images (4)            | Services, Homepage         | One per service — construction, mechanical, cleaning, plant |
| 8 | Blog post images (6)          | Blog                       | One per article — see image paths in `blog.md`         |

### 🟡 Important (Complete Soon After Launch)

| # | Item                          | Page(s)                    | Notes                                                  |
|---|-------------------------------|----------------------------|--------------------------------------------------------|
| 9  | CIDB registration details    | About, FAQ                 | Grade, category, registration number                   |
| 10 | BBBEE level                  | About, FAQ, Blog           | Current level and certificate                          |
| 11 | Awards list                  | About                      | All 20+ awards with names, bodies, and years           |
| 12 | Client testimonials          | About                      | 2–3 quotes with permission to publish                  |
| 13 | Our Story narrative          | About                      | Founding story, milestones, growth journey             |
| 14 | Operating hours              | Contact, FAQ               | Saturday, Sunday, public holiday hours                 |
| 15 | Geographic service area      | FAQ, Contact               | Pretoria only? Gauteng? National?                      |
| 16 | Plant hire specs             | Services, FAQ              | Equipment capacity, tonnage, kVA                       |
| 17 | Plant hire hire periods      | Services, FAQ              | Minimum hire, daily/weekly/monthly rates               |
| 18 | Plant hire delivery policy   | FAQ                        | Delivery charges, collection process                   |
| 19 | Public liability insurance   | FAQ                        | Confirm coverage                                       |
| 20 | CV submission email          | Team                       | Confirm careers@ email address                         |

---

## Content Approval Checklist

Before any page goes live, confirm:

- [ ] All `[TODO]` items resolved or deferred with a decision
- [ ] All images are real, high-quality, and have descriptive alt text
- [ ] All links tested and pointing to correct destinations
- [ ] Social media URLs confirmed and working
- [ ] Contact details accurate and consistent across all pages
- [ ] Contact form tested end-to-end (submit → email received → redirect to /thank-you)
- [ ] Spelling and grammar checked by a human reviewer
- [ ] Content approved by Phehlwana Group management
- [ ] Newsletter form connected to email platform
- [ ] Google Analytics or similar tracking installed
- [ ] robots.txt updated (thank-you page noindex confirmed)
