import { describe, expect, it } from 'vitest';

import { fixtures } from '../fixtures/smtp-responses';
import {
  buildPlainTextMessage,
  isCompleteSmtpResponse,
  parseSmtpResponse,
} from '@/lib/mail/smtp';

describe('SMTP helpers', () => {
  it('parses a multiline SMTP response fixture', () => {
    const parsed = parseSmtpResponse(fixtures.ehloComplete);

    expect(parsed.code).toBe(250);
    expect(parsed.lines).toHaveLength(3);
    expect(parsed.message).toBe('smtp.protonmail.ch at your service AUTH PLAIN LOGIN STARTTLS');
  });

  it('detects whether a fixture transcript is complete', () => {
    expect(isCompleteSmtpResponse(fixtures.ehloPartial)).toBe(false);
    expect(isCompleteSmtpResponse(fixtures.ehloComplete)).toBe(true);
  });

  it('builds a plain-text SMTP payload and dot-stuffs message lines', () => {
    const payload = buildPlainTextMessage({
      from: 'Steel Intake <info@steelyourcase.com>',
      to: 'review@steelyourcase.com',
      subject: 'Test subject',
      replyTo: 'client@example.com',
      body: 'First line\n.Second line\nThird line',
    });

    expect(payload).toContain('From: Steel Intake <info@steelyourcase.com>');
    expect(payload).toContain('Reply-To: client@example.com');
    expect(payload).toContain('\r\n..Second line\r\n');
    expect(payload.endsWith('\r\n.')).toBe(true);
  });
});
