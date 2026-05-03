import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    contact: defineAction({
        accept: 'form',
        input: z.object({
            name:    z.string().min(2,  'Please enter your full name.'),
            email:   z.email('Please enter a valid email address.'),
            phone:   z.string()
                       .regex(/^0[0-9]{9}$/, 'Please enter a valid 10-digit South African phone number.'),
            service: z.string().min(1, 'Please select a service.'),
            subject: z.string().optional(),
            message: z.string().min(20, 'Please enter at least 20 characters.'),
        }),
        handler: async ({ name, email, phone, service, subject, message }) => {
            const fromEmail  = import.meta.env.FROM_EMAIL  ?? 'noreply@phehlwanagroup.co.za';
            const toEmail    = import.meta.env.TO_EMAIL    ?? 'info@phehlwanagroup.co.za';
            const subjectLine = subject?.trim() || `New enquiry — ${service}`;

            // ── Notification email to the business ───────────────────────────
            await resend.emails.send({
                from:    `Phehlwana Group Website <${fromEmail}>`,
                to:      toEmail,
                replyTo: email,
                subject: `[Website Enquiry] ${subjectLine}`,
                html: `
                    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
                        <div style="background:#1d4ed8;padding:24px 32px;border-radius:8px 8px 0 0">
                            <h1 style="color:#fff;margin:0;font-size:20px">New Website Enquiry</h1>
                        </div>
                        <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
                            <table style="width:100%;border-collapse:collapse">
                                <tr><td style="padding:8px 0;color:#64748b;width:140px;vertical-align:top">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                                <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#1d4ed8">${email}</a></td></tr>
                                <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#1d4ed8">${phone}</a></td></tr>
                                <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Service</td><td style="padding:8px 0">${service}</td></tr>
                                ${subject ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ''}
                            </table>
                            <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0"/>
                            <p style="color:#64748b;margin:0 0 8px">Message</p>
                            <p style="white-space:pre-wrap;margin:0;line-height:1.6">${message}</p>
                        </div>
                    </div>
                `,
            });

            // ── Auto-reply to the sender ──────────────────────────────────────
            await resend.emails.send({
                from:    `Phehlwana Group Investments <${fromEmail}>`,
                to:      email,
                subject: 'Thank you for contacting Phehlwana Group Investments',
                html: `
                    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
                        <div style="background:#1d4ed8;padding:24px 32px;border-radius:8px 8px 0 0">
                            <h1 style="color:#fff;margin:0;font-size:20px">Thank you for getting in touch</h1>
                        </div>
                        <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
                            <p>Dear ${name},</p>
                            <p>Thank you for reaching out to Phehlwana Group Investments. We have received your message and a member of our team will be in touch within <strong>1 business day</strong>.</p>
                            <p>If your matter is urgent, please contact us directly:</p>
                            <ul>
                                <li>Office: <a href="tel:+27126550284" style="color:#1d4ed8">012 655 0284</a></li>
                                <li>Mobile: <a href="tel:+27792947635" style="color:#1d4ed8">079 294 7635</a></li>
                                <li>Email: <a href="mailto:info@phehlwanagroup.co.za" style="color:#1d4ed8">info@phehlwanagroup.co.za</a></li>
                            </ul>
                            <p style="margin-top:24px">Kind regards,<br/><strong>The Phehlwana Group Team</strong><br/><a href="https://phehlwanagroup.co.za" style="color:#1d4ed8">phehlwanagroup.co.za</a></p>
                        </div>
                    </div>
                `,
            });

            return { success: true };
        },
    }),
};
