import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactNotificationProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject?: string;
  message: string;
}

export const ContactNotification = ({
  name = 'John Doe',
  email = 'john.doe@example.com',
  phone = '082 123 4567',
  service = 'Plant Hire',
  subject = 'Enquiry about Grader hire',
  message = 'Good day,\n\nI would like to enquire about hiring a Grader for a road resurfacing project in Pretoria. Please send me your rates.\n\nThank you.',
}: ContactNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Website Enquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>New Website Enquiry</Heading>
          </Section>
          <Section style={content}>
            <table style={table}>
              <tbody>
                <tr>
                  <td style={labelCell}>Name</td>
                  <td style={valueCell}>{name}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Email</td>
                  <td style={valueCell}>
                    <Link href={`mailto:${email}`} style={link}>
                      {email}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={labelCell}>Phone</td>
                  <td style={valueCell}>
                    <Link href={`tel:${phone}`} style={link}>
                      {phone}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={labelCell}>Service</td>
                  <td style={valueCell}>{service}</td>
                </tr>
                {subject && (
                  <tr>
                    <td style={labelCell}>Subject</td>
                    <td style={valueCell}>{subject}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Hr style={hr} />
            <Text style={messageLabel}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactNotification;

const main = {
  backgroundColor: '#f1f5f9',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: '40px 0',
};

const container = {
  margin: '0 auto',
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const header = {
  backgroundColor: '#1d4ed8', // blue-700
  padding: '24px 32px',
};

const headerTitle = {
  color: '#ffffff',
  margin: '0',
  fontSize: '20px',
  fontWeight: '600',
};

const content = {
  padding: '32px',
};

const table = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const labelCell = {
  padding: '8px 0',
  color: '#64748b', // slate-500
  width: '140px',
  verticalAlign: 'top',
  fontSize: '15px',
};

const valueCell = {
  padding: '8px 0',
  color: '#0f172a', // slate-900
  fontWeight: '500',
  fontSize: '15px',
};

const link = {
  color: '#1d4ed8',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#e2e8f0', // slate-200
  margin: '20px 0',
};

const messageLabel = {
  color: '#64748b',
  margin: '0 0 8px',
  fontSize: '15px',
};

const messageText = {
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
  lineHeight: '1.6',
  color: '#0f172a',
  fontSize: '15px',
};
