# Green Terminal Portfolio

A polished MERN-style portfolio with a Vite React frontend, Tailwind CSS, Framer Motion animations, and a simple Express backend contact API.

## Features

- Apple-like smooth motion using Framer Motion
- Floating `</>` background animation
- Global click burst effect
- Terminal-style typewriter text with blinking cursor
- First-screen About section with contact icons
- Animated project, experience, and contact sections
- Basic Express `/api/contact` endpoint

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
