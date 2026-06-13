export type SmtpResponse = {
  code: number;
  lines: string[];
  message: string;
};

export function parseSmtpResponse(raw: string): SmtpResponse {
  const normalized = raw.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n').filter(Boolean);
  const last = lines.at(-1) ?? '';
  const match = last.match(/^(\d{3})[ -](.*)$/);

  if (!match) {
    throw new Error(`Unexpected SMTP response: ${raw}`);
  }

  return {
    code: Number(match[1]),
    lines,
    message: lines.map((line) => line.replace(/^\d{3}[ -]?/, '')).join(' '),
  };
}

export function isCompleteSmtpResponse(raw: string) {
  const lines = raw.split('\r\n').filter(Boolean);
  const last = lines.at(-1);
  return Boolean(last && /^\d{3} /.test(last));
}

export function encodeBase64FromUtf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function dotStuffMessage(value: string) {
  const normalized = value.replace(/\r?\n/g, '\r\n');
  return normalized
    .split('\r\n')
    .map((line) => (line.startsWith('.') ? `.${line}` : line))
    .join('\r\n');
}

export function buildPlainTextMessage(input: {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  body: string;
}) {
  const headers = [
    `From: ${input.from}`,
    `To: ${input.to}`,
    `Subject: ${input.subject}`,
    ...(input.replyTo ? [`Reply-To: ${input.replyTo}`] : []),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
  ];

  return `${headers.join('\r\n')}\r\n\r\n${dotStuffMessage(input.body)}\r\n.`;
}
