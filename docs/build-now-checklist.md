# Build Now Checklist - Updated After Questionnaire Responses (3 May 2026)

> **Status:** Client questionnaire received. Several TODOs are now resolved.
> Several critical corrections are required before further development.

---

## 🔴 CRITICAL CORRECTIONS - Do Before Anything Else

These are factual errors that must be fixed across ALL pages before any new work:

- [ ] **Remove "20+ Awards Won"** - from StatsBar, About page, homepage. Confirmed zero awards.
- [ ] **Remove "129+ Projects Completed"** - client prefers not to display a number.
- [ ] **Remove "50+ Skilled Professionals"** - actual count is 10. Remove or replace with accurate copy.
- [ ] **Update geographic coverage** - change "Gauteng and beyond" to "nationally" / "across South Africa" everywhere.
- [ ] **Fix StatsBar.astro** - replace the 4 counters with verified stats (see below).

### Revised Stats Bar Content
Replace the current 4-stat bar with these confirmed facts:

| Display | Value | Status |
|---|---|---|
| BBBEE Level | Level 1 | ✅ Confirmed |
| CIDB Grade | 4CE / 5GB | ✅ Confirmed |
| Years in Business | 10+ | ✅ Confirmed (est. 2015) |
| National Coverage | ✅ | ✅ Confirmed |

---

## ✅ Now Unblocked - Can Build With Confirmed Data

### Credentials / Compliance Section (About Page - was blocked)
All of the following are now confirmed and can be written into the site:

- **VAT Number:** 4520316631
- **CIDB Grade:** 4CE, 5GB *(registration number still pending)*
- **BBBEE Level:** Level 1 *(certificate document still pending)*
- **ISO 45001:** Occupational Health & Safety *(certificate document still pending)*
- **NHBRC:** Member *(registration number still pending)*

> Build the credentials section on the About page now using these confirmed values.
> Add placeholder rows for registration numbers / certificate upload links.

### CEO / Leadership (Team Page - was blocked)
- **Nicholas Mahlangu** - Group CEO. Add to About page and Team page.
- **Sbusiso Mashilwane** - appears to be a team member. Role/title unclear - show as "Coming Soon" card.
- No headshots available yet - use placeholder cards.

### Named Clients (About / Projects - was blocked)
Can now be listed on the website with client permission confirmed:
- City of Tshwane
- Sanparks
- AgriSkills
- JB Levelling
- Magalies Water
- Civicon

Add to: About page (Client Trust section), Projects page (filter/tag), homepage trust strip.

### Plant Hire Equipment (Services - was partially blocked)
Add **Grader** to the equipment table on `/services/plant-hire`.
Updated fleet: TLB, Water Carts, Tipper Trucks, Excavators, Bulldozers, **Grader**, Tools, Generators.

### Geographic Coverage (All pages - was pending)
Replace all instances of "Pretoria", "Gauteng", or "Gauteng and beyond" with **"nationally"** or "across South Africa".

### Contact Page FAQ (was blocked on some answers)
Now confirmed:
- Geographic coverage: Nationally
- CIDB registered: Yes - 4CE, 5GB
- BBBEE compliant: Yes - Level 1
- Business hours: Monday–Friday 07:30–17:00

### Founding Story (About Page)
Update from: *"established in 2015"*
Update to: *"founded in 2015 and incorporated as Phehlwana Group Investments in 2020"*

---

## Shared Components (build these first - everything else depends on them)

- [ ] **`StatsBar.astro`** - 🔴 MUST update first. Remove inflated stats. Use confirmed 4-stat layout above.
- [ ] **`PageHeader.astro`** - ✅ Already built, no changes needed
- [ ] **`ContactCTA.astro`** - ✅ Already built, no changes needed

---

## About Page (`/about`)

- [ ] **Credentials section** - ✅ NOW UNBLOCKED. Add CIDB, BBBEE, ISO 45001, NHBRC, VAT.
- [ ] **CEO card** - ✅ NOW UNBLOCKED. Nicholas Mahlangu, Group CEO. Add placeholder headshot.
- [ ] **Team preview** - Add Nicholas Mahlangu card. Add "Coming Soon" card for Sbusiso Mashilwane. ⚠️ No headshots yet.
- [ ] **Remove Awards section** - 🔴 Confirmed 0 awards. Remove entirely.
- [ ] **Update Our Story** - Add 2020 re-registration milestone.
- [ ] **Named clients strip** - ✅ NOW UNBLOCKED. Add 6 confirmed clients.
- [ ] **Geographic coverage** - Update to "nationally".

---

## Home Page (`/`)

- [ ] **Hero section** - ⚠️ Still needs real photography. Use existing placeholder images for now.
- [ ] **Stats bar** - 🔴 MUST fix. Remove 3 unsubstantiated stats. Use confirmed values.
- [ ] **Services grid** - ⚠️ Confirm Mechanical Engineering and Security with client before featuring.
- [ ] **Trust strip** - ✅ Update with: CIDB 4CE/5GB, BBBEE Level 1, ISO 45001, Nationally.
- [ ] **Primary CTA** - Consider changing from "Request a Quote" to "View Our Projects" based on client's stated primary CTA goal.
- [ ] **Named clients** - Add client logos / names strip between services and projects sections.

---

## Services Pages

- [ ] **Construction** (`/services/construction`) - ✅ Active & confirmed. Update geographic ref.
- [ ] **Mechanical Engineering** (`/services/mechanical`) - ✅ Active & confirmed. All services to be promoted equally.
- [ ] **Cleaning & Waste Management** (`/services/cleaning`) - ✅ Active & confirmed. Update geographic ref.
- [ ] **Plant Hire** (`/services/plant-hire`) - ✅ Active & confirmed. Add Grader to equipment table.
- [ ] **Security** (`/services/security`) - ✅ Active & confirmed. All services to be promoted equally.

---

## FAQ Page (`/faq`)

Now can answer these previously-blocked questions:

- **Geographic coverage:** Nationally ✅
- **CIDB registered:** Yes - 4CE, 5GB ✅
- **BBBEE compliant:** Yes - Level 1 ✅
- **OHS compliant:** Yes - ISO 45001 certified ✅
- **Plant hire equipment:** Add Grader to the list ✅

Still blocked:
- PSIRA registration (Security)
- Minimum hire periods
- Plant hire delivery/fuel policy
- Emergency maintenance availability

---

## Contact Page (`/contact`)

- [ ] Business hours - ✅ Confirmed existing hours from previous website.
- [ ] All confirmed contact details - ✅ no changes needed.

---

## What's Still Blocked (needs client before touching)

| Item | Blocked on | Priority |
|---|---|---|
| Real hero photography | Client photoshoot | High |
| Team headshots | Client photos | High |
| Nicholas Mahlangu bio | Client input | High |
| Sbusiso Mashilwane role + bio | Client clarification | Medium |
| CIDB full registration number | Client | High (tender support) |
| BBBEE certificate document | Client | High (tender support) |
| ISO 45001 certificate document | Client | Medium |
| NHBRC registration number | Client | Medium |
| 2020 registration number | Client | Medium |
| Social media URLs | Billy Maphothoma | Medium |
| Project photos (organised) | Client Drive link | High |
| Project detail submissions | Client form responses | High |
| Client testimonials | Email campaign needed | Medium |
| Logo (SVG + white versions) | Client | Medium |
| Resend API key + domain verification | Phase 6 | ❌ Not set up (Domain: info.phehlwanagroup.co.za) |

---

## Suggested Next Steps (Priority Order)

1. ✅ Apply critical stat corrections across all pages
2. ✅ Build credentials section on About page
3. ✅ Add Nicholas Mahlangu to team/about
4. ✅ Add named clients to about/projects
5. ✅ Add Grader to plant hire page
6. ✅ Update all geographic references to "nationally"
7. 📧 Send client: project detail submission template
8. 📧 Send client: testimonial request email template for named clients
9. 🎨 Apply Grey and Blue as primary brand colours (from questionnaire)
10. 📸 Arrange photoshoot - this is the single highest-impact action
