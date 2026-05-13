# Thank You Page - Phehlwana Group Investments

> **File:** `thank-you.md`
> **Page:** Thank You (`/thank-you`)
> **Status:** 🟢 Ready - no client TODOs required
> **Last reviewed:** May 2026
> **Triggered by:** Contact form submission redirect

---

## SEO / Meta

```
Title:       Thank You | Phehlwana Group Investments
Description: Thank you for contacting Phehlwana Group Investments. We'll be in touch
             within 1 business day.
Robots:      noindex, nofollow
```

> **Note:** This page should be set to `noindex` so it doesn't appear in search results.
> It's a transactional confirmation page, not a content page.

---

## Page Content

### Heading
Thank You for Getting in Touch!

### Body copy
> We've received your message and a member of our team will be in touch within
> **1 business day**.
>
> In the meantime, feel free to explore our services or give us a call if your
> matter is urgent.

---

### Contact Details (for urgent matters)

| Type    | Detail                                                                    |
|---------|---------------------------------------------------------------------------|
| Office  | [012 655 0284](tel:+27126550284)                                          |
| Mobile  | [079 294 7635](tel:+27792947635)                                          |
| WhatsApp | [Chat on WhatsApp](https://wa.me/27792947635)                            |
| Email   | [info@phehlwanagroup.co.za](mailto:info@phehlwanagroup.co.za)             |

---

### CTAs

- **Back to Home** → `/` *(primary button)*
- **View Our Services** → `/services` *(secondary button)*

---

## Design Notes

- Keep this page simple and clean - it's a confirmation, not a sales page
- Use the standard header and footer
- Consider adding a subtle animation or icon (e.g. a checkmark or envelope icon) to
  reinforce the "message received" feeling
- Do not show the contact form again on this page

---

## Auto-Response Email (sent to the user)

This email is sent automatically by **Resend** via the Astro Server Action when the form is submitted successfully (`src/actions/index.ts` - Phase 6).

**Subject:** Thank you for contacting Phehlwana Group Investments

**Body:**
> Dear [Name],
>
> Thank you for reaching out to Phehlwana Group Investments. We have received your
> message and a member of our team will be in touch within 1 business day.
>
> If your matter is urgent, please contact us directly:
> - Office: 012 655 0284
> - Mobile: 079 294 7635
> - Email: info@phehlwanagroup.co.za
>
> We look forward to speaking with you.
>
> Kind regards,
> The Phehlwana Group Team
> www.phehlwanagroup.co.za
>
> ---
> Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182
