export type TurnstileVerification = {
  success: boolean;
  errorCodes: string[];
};

export async function verifyTurnstile(input: {
  secretKey: string;
  token: string;
  remoteIp?: string | null;
}) {
  const body = new URLSearchParams({
    secret: input.secretKey,
    response: input.token,
  });

  if (input.remoteIp) {
    body.set('remoteip', input.remoteIp);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    return {
      success: false,
      errorCodes: [`siteverify_http_${response.status}`],
    } satisfies TurnstileVerification;
  }

  const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
  return {
    success: Boolean(result.success),
    errorCodes: result['error-codes'] ?? [],
  } satisfies TurnstileVerification;
}
