import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { renderAsync } from '@react-email/render';
import React from 'react';
import ContactNotification from '../emails/ContactNotification';
import ContactAutoReply from '../emails/ContactAutoReply';

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
            const fromEmail  = import.meta.env.FROM_EMAIL  ?? 'noreply@info.phehlwanagroup.co.za';
            const toEmail    = import.meta.env.TO_EMAIL    ?? 'info@phehlwanagroup.co.za';
            const subjectLine = subject?.trim() || `New enquiry - ${service}`;

            // Render React components to HTML strings
            const notificationHtml = await renderAsync(
                React.createElement(ContactNotification, {
                    name,
                    email,
                    phone,
                    service,
                    subject,
                    message,
                })
            );

            const autoReplyHtml = await renderAsync(
                React.createElement(ContactAutoReply, {
                    name,
                })
            );

            // ── Notification email to the business ───────────────────────────
            await resend.emails.send({
                from:    `Phehlwana Group Website <${fromEmail}>`,
                to:      toEmail,
                replyTo: email,
                subject: `[Website Enquiry] ${subjectLine}`,
                html:    notificationHtml,
            });

            // ── Auto-reply to the sender ──────────────────────────────────────
            await resend.emails.send({
                from:    `Phehlwana Group Investments <${fromEmail}>`,
                to:      email,
                subject: 'Thank you for contacting Phehlwana Group Investments',
                html:    autoReplyHtml,
            });

            return { success: true };
        },
    }),
};
