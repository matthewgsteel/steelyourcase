import type { SiteEnv } from '@/lib/env';
import { probeProtonSmtp, sendViaProtonSmtp, type MailMessage } from '@/lib/mail/proton-smtp';

export async function sendMail(env: SiteEnv, message: MailMessage) {
  const mode = env.MAIL_TRANSPORT_MODE || 'mock';

  if (mode === 'disabled') {
    return {
      ok: false,
      mode: 'disabled' as const,
      transcript: ['Mail delivery is disabled.'],
    };
  }

  if (mode === 'proton_smtp') {
    return sendViaProtonSmtp(env, message);
  }

  return {
    ok: true,
    mode: 'mock' as const,
    transcript: ['Mock transport accepted the message for local or CI verification.'],
  };
}

export async function probeMail(env: SiteEnv, recipient?: string) {
  const mode = env.MAIL_TRANSPORT_MODE || 'mock';

  if (mode !== 'proton_smtp') {
    return {
      ok: true,
      mode,
      transcript: ['Mail probe skipped because proton_smtp mode is not active.'],
    };
  }

  return probeProtonSmtp(env, recipient);
}
