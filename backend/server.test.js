import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp, createContactEmailSender } from './server.js';

const validContact = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello from the contact form.',
};

async function withServer(app, run) {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

async function postContact(baseUrl, body, options = {}) {
  return fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...options.headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('rejects missing name, email, or message', async () => {
  const app = createApp({ deliverEmail: async () => assert.fail('Invalid submissions must not be sent.') });
  await withServer(app, async (baseUrl) => {
    for (const body of [
      { ...validContact, name: '  ' },
      { ...validContact, email: '' },
      { ...validContact, message: '  ' },
      { email: validContact.email, message: validContact.message },
    ]) {
      const response = await postContact(baseUrl, body);
      assert.equal(response.status, 400);
    }
  });
});

test('rejects invalid email addresses and fields above their maximum lengths', async () => {
  const app = createApp({ deliverEmail: async () => assert.fail('Invalid submissions must not be sent.') });
  await withServer(app, async (baseUrl) => {
    assert.equal((await postContact(baseUrl, { ...validContact, email: 'not-an-email' })).status, 400);
    assert.equal((await postContact(baseUrl, { ...validContact, name: 'n'.repeat(101) })).status, 400);
    assert.equal((await postContact(baseUrl, { ...validContact, email: `${'a'.repeat(260)}@x.io` })).status, 400);
    assert.equal((await postContact(baseUrl, { ...validContact, message: 'm'.repeat(5001) })).status, 400);
  });
});

test('rejects bodies over the configured JSON size limit', async () => {
  const app = createApp({ jsonLimit: '1kb', deliverEmail: async () => assert.fail('Oversized bodies must not be sent.') });
  await withServer(app, async (baseUrl) => {
    const response = await postContact(baseUrl, { ...validContact, message: 'm'.repeat(2000) });
    assert.equal(response.status, 413);
  });
});

test('trims valid submissions and returns success only after the email sender resolves', async () => {
  let sentContact;
  const app = createApp({ deliverEmail: async (contact) => { sentContact = contact; } });
  await withServer(app, async (baseUrl) => {
    const response = await postContact(baseUrl, {
      name: ' Ada Lovelace ',
      email: ' ada@example.com ',
      message: ' Hello from the form. ',
    }, { headers: { 'Idempotency-Key': 'portfolio-contact/test-123' } });
    assert.equal(response.status, 202);
    assert.deepEqual(sentContact, {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello from the form.',
      idempotencyKey: 'portfolio-contact/test-123',
    });
    assert.equal((await response.json()).message, 'Message sent successfully. Thank you for reaching out!');
  });
});

test('passes sender, recipient, subject, reply-to, timestamp, and plain text to Resend', async () => {
  let apiKeyUsed;
  let messageSent;
  const sendEmail = createContactEmailSender({
    env: {
      RESEND_API_KEY: 'test-key',
      CONTACT_FROM_EMAIL: 'Portfolio <sender@example.com>',
      CONTACT_TO_EMAIL: 'owner@example.com',
    },
    createClient: (apiKey) => {
      apiKeyUsed = apiKey;
      return { emails: { send: async (message) => { messageSent = message; return { data: { id: 'mock-id' }, error: null }; } } };
    },
  });

  await sendEmail(validContact);
  assert.equal(apiKeyUsed, 'test-key');
  assert.equal(messageSent.from, 'Portfolio <sender@example.com>');
  assert.deepEqual(messageSent.to, ['owner@example.com']);
  assert.equal(messageSent.replyTo, validContact.email);
  assert.equal(messageSent.subject, 'New Portfolio Contact — Ada Lovelace');
  assert.match(messageSent.idempotencyKey, /^portfolio-contact\//);
  assert.match(messageSent.text, /Submitted: \d{4}-\d{2}-\d{2}T/);
  assert.match(messageSent.text, /Hello from the contact form\./);
  assert.equal('html' in messageSent, false);
});

test('maps a mocked Resend rejection to a safe API error', async () => {
  const sendEmail = createContactEmailSender({
    env: {
      RESEND_API_KEY: 'test-key',
      CONTACT_FROM_EMAIL: 'Portfolio <sender@example.com>',
      CONTACT_TO_EMAIL: 'owner@example.com',
    },
    createClient: () => ({
      emails: { send: async () => ({ data: null, error: { name: 'validation_error', statusCode: 403, message: 'private provider detail' } }) },
    }),
  });
  const app = createApp({ deliverEmail: sendEmail });
  await withServer(app, async (baseUrl) => {
    const response = await postContact(baseUrl, validContact);
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.match(body, /could not send your message/);
    assert.doesNotMatch(body, /private provider detail|test-key/);
  });
});

test('returns unavailable when email configuration is missing', async () => {
  const variables = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL'];
  const previous = Object.fromEntries(variables.map((key) => [key, process.env[key]]));
  variables.forEach((key) => delete process.env[key]);
  try {
    await withServer(createApp(), async (baseUrl) => {
      const response = await postContact(baseUrl, validContact);
      assert.equal(response.status, 503);
      assert.match((await response.json()).error, /temporarily unavailable/);
    });
  } finally {
    for (const key of variables) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});

test('returns a safe provider error and does not log message contents', async () => {
  const app = createApp({ deliverEmail: async () => { throw new Error('private provider details'); } });
  await withServer(app, async (baseUrl) => {
    const response = await postContact(baseUrl, validContact);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      ok: false,
      error: 'We could not send your message right now. Please try again shortly.',
    });
  });
});

test('limits contact submissions and keeps the health route available', async () => {
  const app = createApp({ contactLimit: 1, deliverEmail: async () => {} });
  await withServer(app, async (baseUrl) => {
    assert.equal((await fetch(`${baseUrl}/api/health`)).status, 200);
    assert.equal((await postContact(baseUrl, validContact)).status, 202);
    const limited = await postContact(baseUrl, validContact);
    assert.equal(limited.status, 429);
    assert.match((await limited.json()).error, /Too many messages/);
  });
});

test('allows configured CORS origins and omits CORS access for other origins', async () => {
  const previous = process.env.CLIENT_ORIGIN;
  process.env.CLIENT_ORIGIN = 'https://portfolio.example';
  try {
    const app = createApp({ deliverEmail: async () => {} });
    await withServer(app, async (baseUrl) => {
      const allowed = await fetch(`${baseUrl}/api/health`, { headers: { origin: 'https://portfolio.example' } });
      assert.equal(allowed.headers.get('access-control-allow-origin'), 'https://portfolio.example');
      const rejected = await fetch(`${baseUrl}/api/health`, { headers: { origin: 'https://attacker.example' } });
      assert.equal(rejected.headers.get('access-control-allow-origin'), null);
    });
  } finally {
    if (previous === undefined) delete process.env.CLIENT_ORIGIN;
    else process.env.CLIENT_ORIGIN = previous;
  }
});
