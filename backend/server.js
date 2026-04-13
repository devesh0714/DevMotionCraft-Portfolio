import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5050;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: clientOrigin,
    methods: ['GET', 'POST'],
  }),
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      ok: false,
      error: 'Name, email, and message are required.',
    });
  }

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailLooksValid) {
    return res.status(400).json({
      ok: false,
      error: 'Please provide a valid email address.',
    });
  }

  const contactRequest = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  console.log('New contact request:', contactRequest);

  return res.status(201).json({
    ok: true,
    message: 'Message received. I will get back to you soon.',
  });
});

app.listen(port, () => {
  console.log(`Portfolio API running on http://localhost:${port}`);
});
