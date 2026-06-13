import type { SiteEnv } from '@/lib/env';
import { mailProbeSchema } from '@/lib/forms';
import { probeMail } from '@/lib/mail';

export const onRequestPost: PagesFunction<SiteEnv> = async (context) => {
  const url = new URL(context.request.url);
  const authHeader = context.request.headers.get('Authorization');
  const expected = context.env.MAIL_PROBE_TOKEN;
  const branch = context.env.CF_PAGES_BRANCH || '';
  const isProductionHost =
    url.hostname === 'steelyourcase.com' || url.hostname === 'www.steelyourcase.com';

  if (branch === 'main' || isProductionHost) {
    return new Response('Not found', { status: 404 });
  }

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return Response.json({ error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const payload = await context.request.json().catch(() => ({}));
    const result = mailProbeSchema.safeParse(payload);
    if (!result.success) {
      return Response.json({ error: 'Invalid mail probe payload.' }, { status: 400 });
    }

    const probe = await probeMail(context.env, result.data.recipient);
    return Response.json({
      ok: probe.ok,
      mode: probe.mode,
      strategy: 'strategy' in probe ? probe.strategy : undefined,
      transcript: probe.transcript,
      branch: branch || 'unknown',
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Mail probe failed.' },
      { status: 500 }
    );
  }
};
