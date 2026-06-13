import { beforeEach, describe, expect, it, vi } from 'vitest';

const payload = {
  name: 'Case Client',
  email: 'client@example.com',
  phone: '504-555-0199',
  preferredLanguage: 'English',
  practiceArea: 'Immigration',
  matterType: 'Family petition',
  urgency: 'No deadline yet',
  deadline: '',
  shortMessage: 'I need help with a family petition review.',
  consent: true,
  turnstileToken: 'token-from-widget',
};

type ContactContext = {
  env: Record<string, string | undefined>;
  request: Request;
};

function createContext(env: Record<string, string | undefined> = {}): ContactContext {
  return {
    env: {
      MAIL_TO: 'review@steelyourcase.com',
      TURNSTILE_SECRET_KEY: 'turnstile-secret',
      ...env,
    },
    request: new Request('https://preview.steelyourcase.pages.dev/api/contact', {
      method: 'POST',
      headers: {
        'CF-Connecting-IP': '198.51.100.20',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }),
  };
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('blocks mail when Turnstile verification fails', async () => {
    const sendMail = vi.fn();

    vi.doMock('@/lib/mail', () => ({ sendMail }));
    vi.doMock('@/lib/turnstile', () => ({
      verifyTurnstile: vi.fn().mockResolvedValue({ success: false }),
    }));

    const { onRequestPost } = await import('../../functions/api/contact');
    const response = await onRequestPost(createContext() as never);
    const result = (await response.json()) as { error?: string };

    expect(response.status).toBe(403);
    expect(result.error).toBe('Turnstile verification failed.');
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('accepts a mock-mode submission without external delivery', async () => {
    vi.doMock('@/lib/mail', async () => vi.importActual('@/lib/mail'));
    vi.doMock('@/lib/turnstile', () => ({
      verifyTurnstile: vi.fn().mockResolvedValue({ success: true }),
    }));

    const { onRequestPost } = await import('../../functions/api/contact');
    const response = await onRequestPost(
      createContext({ MAIL_TRANSPORT_MODE: 'mock' }) as never
    );
    const result = (await response.json()) as { message?: string; mode?: string };

    expect(response.status).toBe(200);
    expect(result.mode).toBe('mock');
    expect(result.message).toContain('Your message has been received.');
  });
});
