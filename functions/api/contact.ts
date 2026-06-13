import { contactSchema } from '@/lib/forms';
import type { SiteEnv } from '@/lib/env';
import { sendMail } from '@/lib/mail';
import { verifyTurnstile } from '@/lib/turnstile';

export const onRequestPost: PagesFunction<SiteEnv> = async (context) => {
  try {
    const payload = await context.request.json();
    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      return Response.json(
        { error: result.error.issues[0]?.message || 'Invalid contact form submission.' },
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
      remoteIp: context.request.headers.get('CF-Connecting-IP'),
    });

    if (!verification.success) {
      return Response.json({ error: 'Turnstile verification failed.' }, { status: 403 });
    }

    const delivery = await sendMail(context.env, {
      to: context.env.MAIL_TO || 'info@steelyourcase.com',
      subject: `[SteelYourCase] ${result.data.practiceArea} intake - ${result.data.urgency}`,
      replyTo: result.data.email,
      body: [
        `Name: ${result.data.name}`,
        `Email: ${result.data.email}`,
        `Phone: ${result.data.phone}`,
        `Preferred language: ${result.data.preferredLanguage}`,
        `Practice area: ${result.data.practiceArea}`,
        `Matter type: ${result.data.matterType}`,
        `Urgency: ${result.data.urgency}`,
        `Deadline: ${result.data.deadline || 'None provided'}`,
        '---',
        result.data.shortMessage,
      ].join('\n'),
    });

    if (!delivery.ok) {
      return Response.json({ error: 'Mail delivery is disabled for this environment.' }, { status: 503 });
    }

    return Response.json({
      message: 'Your message has been received. If this involves a deadline, call +1.833.43.STEEL after submitting.',
      mode: delivery.mode,
    });
  } catch {
    return Response.json({ error: 'Unable to process the contact request right now.' }, { status: 500 });
  }
};
