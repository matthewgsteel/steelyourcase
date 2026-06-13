import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('mail transport selector', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('returns disabled mode without attempting delivery', async () => {
    const { sendMail } = await import('@/lib/mail');
    const result = await sendMail(
      { MAIL_TRANSPORT_MODE: 'disabled' },
      { to: 'review@steelyourcase.com', subject: 'Disabled', body: 'No send' }
    );

    expect(result).toEqual({
      ok: false,
      mode: 'disabled',
      transcript: ['Mail delivery is disabled.'],
    });
  });

  it('uses mock mode by default for local and CI flows', async () => {
    const { sendMail, probeMail } = await import('@/lib/mail');

    const delivery = await sendMail(
      {},
      { to: 'review@steelyourcase.com', subject: 'Mock', body: 'No external send' }
    );
    const probe = await probeMail({});

    expect(delivery.ok).toBe(true);
    expect(delivery.mode).toBe('mock');
    expect(delivery.transcript[0]).toContain('Mock transport');
    expect(probe.ok).toBe(true);
    expect(probe.mode).toBe('mock');
    expect(probe.transcript[0]).toContain('skipped');
  });

  it('delegates proton mode to the Worker-native SMTP transport', async () => {
    const sendViaProtonSmtp = vi.fn().mockResolvedValue({
      ok: true,
      mode: 'proton_smtp',
      strategy: 'starttls-587',
      transcript: ['S 220 ready'],
    });
    const probeProtonSmtp = vi.fn().mockResolvedValue({
      ok: true,
      mode: 'proton_smtp',
      strategy: 'starttls-587',
      transcript: ['S 220 ready'],
    });

    vi.doMock('@/lib/mail/proton-smtp', () => ({
      probeProtonSmtp,
      sendViaProtonSmtp,
    }));

    const { probeMail, sendMail } = await import('@/lib/mail');
    const env = { MAIL_TRANSPORT_MODE: 'proton_smtp' as const };
    const mail = {
      to: 'review@steelyourcase.com',
      subject: 'Probe',
      body: 'Send the Worker-compatible SMTP probe.',
    };

    await sendMail(env, mail);
    await probeMail(env, 'proof@steelyourcase.com');

    expect(sendViaProtonSmtp).toHaveBeenCalledWith(env, mail);
    expect(probeProtonSmtp).toHaveBeenCalledWith(env, 'proof@steelyourcase.com');
  });
});
