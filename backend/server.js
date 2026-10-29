import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { Resend } from 'resend';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const port = process.env.PORT || 5050;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

class EmailConfigurationError extends Error {}
class EmailDeliveryError extends Error {}

function normalizeContact(body) {
  const { name, email, message } = body ?? {};
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return { error: 'Name, email, and message are required.' };
  }

  const contact = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (!contact.name || !contact.email || !contact.message) {
    return { error: 'Name, email, and message are required.' };
  }
  if (contact.name.length > MAX_NAME_LENGTH) {
    return { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` };
  }
  if (contact.email.length > MAX_EMAIL_LENGTH || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contact.email)) {
    return { error: 'Please provide a valid email address.' };
  }
  if (/[\u0000-\u001f\u007f]/.test(contact.name) || /[\u0000-\u001f\u007f]/.test(contact.email)) {
    return { error: 'Name or email contains unsupported characters.' };
  }
  if (contact.message.length > MAX_MESSAGE_LENGTH) {
    return { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` };
  }

  return { contact };
}

export function createContactEmailSender({ env = process.env, createClient = (apiKey) => new Resend(apiKey) } = {}) {
  return async ({ name, email, message, idempotencyKey = `portfolio-contact/${randomUUID()}` }) => {
    const { RESEND_API_KEY: apiKey, CONTACT_FROM_EMAIL: from, CONTACT_TO_EMAIL: to } = env;
    if (!apiKey || !from || !to) {
      throw new EmailConfigurationError('Contact email delivery is not configured.');
    }

    const resend = createClient(apiKey);
    const timestamp = new Date().toISOString();
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New Portfolio Contact — ${name.replace(/[\r\n]+/g, ' ')}`,
      idempotencyKey,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Submitted: ${timestamp}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    if (error || !data?.id) {
      console.error('Resend rejected contact email.', {
        errorName: error?.name || 'ResendError',
        statusCode: error?.statusCode,
      });
      throw new EmailDeliveryError('The email provider did not accept the message.');
    }

    // Acceptance is not the same as confirmed delivery; check the Resend email log for delivery status.
    console.info('Resend accepted contact email.', { emailId: data?.id });
  };
}

export function createApp({
  deliverEmail = createContactEmailSender(),
  contactLimit = Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  contactWindowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  jsonLimit = '32kb',
} = {}) {
  const app = express();
  const trustedProxyHops = Number(process.env.TRUST_PROXY_HOPS);
  if (Number.isInteger(trustedProxyHops) && trustedProxyHops > 0) {
    app.set('trust proxy', trustedProxyHops);
  }
  const allowedOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
    methods: ['GET', 'POST'],
  }));
  app.use(express.json({ limit: jsonLimit, strict: true }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'portfolio-api' });
  });

  app.post('/api/contact', rateLimit({
    windowMs: contactWindowMs,
    limit: contactLimit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({
      ok: false,
      error: 'Too many messages. Please wait a little while and try again.',
    }),
  }), async (req, res) => {
    const { contact, error } = normalizeContact(req.body);
    if (error) {
      return res.status(400).json({ ok: false, error });
    }

    const requestedIdempotencyKey = req.get('Idempotency-Key');
    const idempotencyKey = requestedIdempotencyKey && requestedIdempotencyKey.length <= 256
      && /^[A-Za-z0-9._/-]+$/.test(requestedIdempotencyKey)
      ? requestedIdempotencyKey
      : `portfolio-contact/${randomUUID()}`;

    try {
      await deliverEmail({ ...contact, idempotencyKey });
      return res.status(202).json({
        ok: true,
        message: 'Message sent successfully. Thank you for reaching out!',
      });
    } catch (sendError) {
      if (sendError instanceof EmailConfigurationError) {
        console.error(sendError.message);
        return res.status(503).json({
          ok: false,
          error: 'Contact email is temporarily unavailable. Please try again later.',
        });
      }

      if (!(sendError instanceof EmailDeliveryError)) {
        console.error('Unexpected contact email failure.', {
          errorName: sendError?.name || 'Error',
        });
      }
      return res.status(502).json({
        ok: false,
        error: 'We could not send your message right now. Please try again shortly.',
      });
    }
  });

  app.use((error, _req, res, _next) => {
    if (error?.type === 'entity.too.large') {
      return res.status(413).json({ ok: false, error: 'Request is too large.' });
    }
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).json({ ok: false, error: 'Request body must be valid JSON.' });
    }
    console.error('Unhandled API request error.', { errorName: error?.name || 'Error' });
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  });

  return app;
}

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  createApp().listen(port, () => {
    console.log(`Portfolio API running on http://localhost:${port}`);
  });
}
