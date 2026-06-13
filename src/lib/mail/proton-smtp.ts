import type { SiteEnv } from '@/lib/env';
import {
  buildPlainTextMessage,
  encodeBase64FromUtf8,
  isCompleteSmtpResponse,
  parseSmtpResponse,
} from '@/lib/mail/smtp';

export type MailMessage = {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
};

export type MailDeliveryResult = {
  mode: 'proton_smtp' | 'mock' | 'disabled';
  ok: boolean;
  strategy?: string;
  transcript: string[];
  messageId?: string;
};

type SmtpStrategy = {
  name: string;
  port: number;
  secureTransport: 'starttls' | 'on';
  requiresUpgrade: boolean;
};

type SocketSession = {
  socket: Socket;
  reader: ReadableStreamDefaultReader<Uint8Array>;
  writer: WritableStreamDefaultWriter<Uint8Array>;
};

export async function sendViaProtonSmtp(env: SiteEnv, mail: MailMessage) {
  return attemptProtonDelivery(env, mail);
}

export async function probeProtonSmtp(env: SiteEnv, recipient?: string) {
  const target = recipient || env.MAIL_TO || env.PROTON_SMTP_USERNAME || '';
  return attemptProtonDelivery(env, {
    to: target,
    subject: 'SteelYourCase SMTP preview probe',
    body: 'This is a controlled SMTP probe message from the SteelYourCase Cloudflare Pages preview lane.',
  });
}

async function attemptProtonDelivery(env: SiteEnv, mail: MailMessage): Promise<MailDeliveryResult> {
  const host = env.PROTON_SMTP_HOST || 'smtp.protonmail.ch';
  const username = env.PROTON_SMTP_USERNAME || '';
  const password = env.PROTON_SMTP_PASSWORD || '';
  const from = env.MAIL_FROM || env.PROTON_SMTP_USERNAME || '';
  const defaultPort = Number(env.PROTON_SMTP_PORT || '587');

  if (!host || !username || !password || !from || !mail.to) {
    throw new Error('Proton SMTP is not fully configured.');
  }

  const strategies: SmtpStrategy[] = [
    {
      name: 'starttls-587',
      port: defaultPort || 587,
      secureTransport: 'starttls',
      requiresUpgrade: true,
    },
  ];

  if (strategies[0].port !== 465) {
    strategies.push({
      name: 'tls-465',
      port: 465,
      secureTransport: 'on',
      requiresUpgrade: false,
    });
  }

  const combinedTranscript: string[] = [];

  for (const strategy of strategies) {
    try {
      const transcript: string[] = [];
      await deliverWithStrategy({
        host,
        username,
        password,
        from,
        mail,
        strategy,
        transcript,
      });

      return {
        ok: true,
        mode: 'proton_smtp',
        strategy: strategy.name,
        transcript,
      };
    } catch (error) {
      combinedTranscript.push(
        `${strategy.name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  throw new Error(`SMTP delivery failed after probe-gated attempts. ${combinedTranscript.join(' | ')}`);
}

async function deliverWithStrategy(input: {
  host: string;
  username: string;
  password: string;
  from: string;
  mail: MailMessage;
  strategy: SmtpStrategy;
  transcript: string[];
}) {
  const { connect } = await import('cloudflare:sockets');
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let session: SocketSession | null = null;

  try {
    const socketOptions: SocketOptions = {
      allowHalfOpen: false,
      secureTransport: input.strategy.secureTransport,
    };

    let socket = connect({ hostname: input.host, port: input.strategy.port }, socketOptions);

    session = {
      socket,
      reader: socket.readable.getReader(),
      writer: socket.writable.getWriter(),
    };

    const read = async () => readSmtpResponse(session!, decoder, input.transcript);
    const write = async (command: string, label: string) => {
      input.transcript.push(`C ${label}`);
      await session!.writer.write(encoder.encode(`${command}\r\n`));
    };

    expectResponse(await read(), [220], 'SMTP greeting');
    await write('EHLO steelyourcase.com', 'EHLO');
    expectResponse(await read(), [250], 'EHLO');

    if (input.strategy.requiresUpgrade) {
      await write('STARTTLS', 'STARTTLS');
      expectResponse(await read(), [220], 'STARTTLS');

      session.writer.releaseLock();
      session.reader.releaseLock();

      socket = session.socket.startTls();
      session = {
        socket,
        reader: socket.readable.getReader(),
        writer: socket.writable.getWriter(),
      };

      await write('EHLO steelyourcase.com', 'EHLO-after-STARTTLS');
      expectResponse(await read(), [250], 'EHLO after STARTTLS');
    }

    await write(
      `AUTH PLAIN ${encodeBase64FromUtf8(`\u0000${input.username}\u0000${input.password}`)}`,
      'AUTH PLAIN'
    );
    const authResponse = await read();

    if (authResponse.code >= 500) {
      await write('AUTH LOGIN', 'AUTH LOGIN');
      expectResponse(await read(), [334], 'AUTH LOGIN username prompt');
      await write(encodeBase64FromUtf8(input.username), 'AUTH LOGIN username');
      expectResponse(await read(), [334], 'AUTH LOGIN password prompt');
      await write(encodeBase64FromUtf8(input.password), 'AUTH LOGIN password');
      expectResponse(await read(), [235], 'AUTH LOGIN complete');
    } else {
      expectResponse(authResponse, [235], 'AUTH PLAIN complete');
    }

    await write(`MAIL FROM:<${input.from}>`, 'MAIL FROM');
    expectResponse(await read(), [250], 'MAIL FROM');
    await write(`RCPT TO:<${input.mail.to}>`, 'RCPT TO');
    expectResponse(await read(), [250, 251], 'RCPT TO');
    await write('DATA', 'DATA');
    expectResponse(await read(), [354], 'DATA');

    const payload = buildPlainTextMessage({
      from: input.from,
      to: input.mail.to,
      subject: input.mail.subject,
      replyTo: input.mail.replyTo,
      body: input.mail.body,
    });

    input.transcript.push('C MESSAGE_BODY');
    await session.writer.write(encoder.encode(`${payload}\r\n`));
    expectResponse(await read(), [250], 'MESSAGE BODY');
    await write('QUIT', 'QUIT');
    const quitResponse = await read().catch(() => null);
    if (quitResponse) {
      expectResponse(quitResponse, [221], 'QUIT');
    }
  } finally {
    try {
      session?.writer.releaseLock();
      session?.reader.releaseLock();
      session?.socket.close();
    } catch {
      // Ignore cleanup errors from closed sockets.
    }
  }
}

async function readSmtpResponse(
  session: SocketSession,
  decoder: TextDecoder,
  transcript: string[]
) {
  let raw = '';

  while (!isCompleteSmtpResponse(raw)) {
    const { done, value } = await session.reader.read();
    if (done) {
      break;
    }
    raw += decoder.decode(value, { stream: true });
  }

  const parsed = parseSmtpResponse(raw);
  transcript.push(`S ${parsed.code} ${parsed.message}`);
  return parsed;
}

function expectResponse(response: { code: number; message: string }, allowed: number[], step: string) {
  if (!allowed.includes(response.code)) {
    throw new Error(`${step} failed with ${response.code}: ${response.message}`);
  }
}
