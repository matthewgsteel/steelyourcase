import { resolveAssistantResponse } from '@/lib/assistant/provider';
import type { SiteEnv } from '@/lib/env';
import { assistantSchema } from '@/lib/forms';
import { rateLimit } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

export const onRequestPost: PagesFunction<SiteEnv> = async (context) => {
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const limited = rateLimit({
      key: `assistant:${ip}`,
      limit: 10,
      windowMs: 60_000,
    });

    if (!limited.allowed) {
      return Response.json(
        {
          error: 'Assistant routing is temporarily rate-limited. Please try again in a moment.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(limited.retryAfterSeconds),
          },
        }
      );
    }

    const payload = await context.request.json();
    const result = assistantSchema.safeParse(payload);

    if (!result.success) {
      return Response.json(
        { error: result.error.issues[0]?.message || 'Invalid assistant submission.' },
        { status: 400 }
      );
    }

    const secretKey = context.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      return Response.json({ error: 'Turnstile secret is not configured.' }, { status: 503 });
    }

    const verification = await verifyTurnstile({
      secretKey,
      token: result.data.turnstileToken,
      remoteIp: ip,
    });

    if (!verification.success) {
      return Response.json({ error: 'Turnstile verification failed.' }, { status: 403 });
    }

    const response = await resolveAssistantResponse(result.data, context.env);
    return Response.json(response, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Unable to process the assistant request right now.',
      },
      { status: 500 }
    );
  }
};
