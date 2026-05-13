import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactAutoReplyProps {
  name: string;
}

export const ContactAutoReply = ({ name = 'John Doe' }: ContactAutoReplyProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for getting in touch with Phehlwana Group</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Thank you for getting in touch</Heading>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Dear {name},</Text>
            <Text style={paragraph}>
              Thank you for reaching out to Phehlwana Group Investments. We have
              received your message and a member of our team will be in touch
              within <strong>1 business day</strong>.
            </Text>
            <Text style={paragraph}>
              If your matter is urgent, please contact us directly:
            </Text>
            <ul>
              <li style={listItem}>
                Office:{' '}
                <Link href="tel:+27126550284" style={link}>
                  012 655 0284
                </Link>
              </li>
              <li style={listItem}>
                Mobile:{' '}
                <Link href="tel:+27792947635" style={link}>
                  079 294 7635
                </Link>
              </li>
              <li style={listItem}>
                Email:{' '}
                <Link href="mailto:info@phehlwanagroup.co.za" style={link}>
                  info@phehlwanagroup.co.za
                </Link>
              </li>
            </ul>
            <Text style={{ ...paragraph, marginTop: '24px' }}>
              Kind regards,
              <br />
              <strong>The Phehlwana Group Team</strong>
              <br />
              <Link href="https://phehlwanagroup.co.za" style={link}>
                phehlwanagroup.co.za
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactAutoReply;

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

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#0f172a',
  margin: '0 0 16px',
};

const listItem = {
  fontSize: '16px',
  color: '#0f172a',
  lineHeight: '1.6',
  marginBottom: '8px',
};

const link = {
  color: '#1d4ed8',
  textDecoration: 'none',
};
