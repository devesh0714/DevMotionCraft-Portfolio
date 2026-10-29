# Green Terminal Portfolio

A dark green, terminal-inspired engineering portfolio for Devesh Kumar. The Vite React frontend uses Tailwind CSS, Framer Motion, and Lucide icons; portfolio content is grouped in `frontend/src/data/portfolioData.js`.

## Features

- Apple-like smooth motion using Framer Motion
- Floating `</>` background animation
- Global click burst effect
- Terminal-style typewriter text with blinking cursor
- Responsive introduction, contact links, and resume download
- Resume-based skills, experience, education, achievements, and featured projects
- Express `/api/contact` endpoint with validated Resend email notifications

The contact form sends a plain-text notification through Resend to `CONTACT_TO_EMAIL`. The API returns success when Resend accepts the request; confirm actual delivery in the Resend email logs.

## Project Structure

```text
.
├── backend
│   ├── package.json
│   └── server.js
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── components
│           ├── AboutSection.jsx
│           ├── BackgroundAnimation.jsx
│           ├── ClickEffect.jsx
│           ├── ContactSection.jsx
│           ├── ExperienceSection.jsx
│           ├── ProjectsSection.jsx
│           ├── SectionShell.jsx
│           └── TerminalText.jsx
└── package.json
```

## Install

```bash
npm run install:all
```

## Run Development

```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5050

Create `backend/.env` from `backend/.env.example` if it does not exist (a blank local copy is prepared here). Set `RESEND_API_KEY` there and set `CONTACT_FROM_EMAIL` to an address on a domain verified for sending in Resend. `CONTACT_TO_EMAIL` defaults to the portfolio owner's Gmail address. Never put the Resend key in the frontend environment.

For local development the frontend uses `http://localhost:5050` by default. Set `VITE_API_URL` in `frontend/.env` only when the backend is at a different origin. In production, set `VITE_API_URL` to the backend's public base URL when frontend and backend are deployed separately; leave it empty when a same-origin `/api` reverse proxy is configured. Set `CLIENT_ORIGIN` (or comma-separated `CLIENT_ORIGINS`) on the backend to the exact frontend origin(s).

The contact endpoint limits JSON request bodies to 32 KB, validates and bounds all fields, and applies an in-memory limit of 5 submissions per IP per 15 minutes. The counter resets when the process restarts and is not shared across multiple backend instances. If the backend runs behind a reverse proxy, set `TRUST_PROXY_HOPS` to that host's trusted proxy hop count so rate limiting uses the real client IP. No production hosting configuration is present in this repository, so configure these variables on the chosen backend and frontend hosting platforms.

The resume is served from `frontend/public/resume.pdf` at `/resume.pdf`.

## Build Frontend

```bash
npm run build
```

## Run Backend Only

```bash
npm run start --prefix backend
```

The contact API accepts `POST /api/contact` with:

```json
{
  "name": "Ada",
  "email": "ada@example.com",
  "message": "Let's build."
}
```

Install dependencies from the repository root with `npm run install:all`. Run backend tests with `npm test --prefix backend` and build the frontend with `npm run build`.
