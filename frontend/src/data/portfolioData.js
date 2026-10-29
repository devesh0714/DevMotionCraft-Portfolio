export const socialLinks = [
  {
    label: 'GitHub',
    value: 'github.com/devesh0714',
    href: 'https://github.com/devesh0714',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/devesh-kumar-b4ab3b21a',
    href: 'https://www.linkedin.com/in/devesh-kumar-b4ab3b21a/',
    external: true,
  },
  {
    label: 'Email',
    value: 'deveshkumar0714@gmail.com',
    href: 'mailto:deveshkumar0714@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 8544279557',
    href: 'tel:+918544279557',
  },
];

export const experiences = [
  {
    role: 'Software Development Engineer',
    company: 'Le Reve Franchise',
    period: 'May 2026 – Present',
    detail: [
      'Developed full-stack applications with Next.js, React, TypeScript, Node.js, Express, PostgreSQL, and Prisma.',
      'Designed REST APIs that reduced manual lead-processing effort by 40% and streamlined business automation workflows.',
      'Strengthened security with JWT authentication, form validation, and secure data handling.',
      'Improved page-load performance by 35% and reduced LCP by 30% through code splitting, lazy loading, and responsive UI improvements.',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
  },
  {
    role: 'Software Development Engineer Intern',
    company: 'ITJOBXS',
    period: 'January 2026 – May 2026',
    location: 'Remote',
    detail: [
      'Integrated Google reCAPTCHA with Node.js and Express backend verification, reducing bot traffic by 90% and securing form submissions.',
      'Built request-validation and abuse-detection pipelines to identify anomalous behavior and prevent fraudulent requests.',
    ],
    technologies: ['Node.js', 'Express', 'Google reCAPTCHA', 'API Security', 'Request Validation'],
  },
  {
    role: 'Software Development Engineer',
    company: 'Blynk Virtual Technologies',
    period: 'April 2025 – January 2026',
    location: 'Remote',
    detail: [
      'Co-developed the backend of a multi-module ERP platform spanning trading, finance, banking and compliance, KYC, and HRMS.',
      'Worked with PostgreSQL, Supabase, and more than 85 serverless TypeScript Edge Functions across a shared system with a 377-table schema, 1,378 RLS policies, and 1,367 PL/pgSQL functions.',
      'Built automated Binance P2P auto-payment and auto-pricing engines and integrated Razorpay payroll functionality.',
      'Contributed to an AI-powered RAG copilot using pgvector for trade-chat suggestions.',
    ],
    technologies: ['TypeScript', 'PostgreSQL', 'Supabase', 'Edge Functions', 'RLS', 'PL/pgSQL', 'pgvector', 'Razorpay'],
  },
];

export const projects = [
  {
    name: 'GateFlow',
    subtitle: 'High-Performance TypeScript API Gateway',
    summary: 'An API gateway engineered from scratch with Trie-based routing, Redis-backed sliding-window rate limiting, LRU caching, round-robin load balancing, and PostgreSQL-backed service configuration.',
    contributions: [
      'Implemented Trie-based request routing and Redis-backed sliding-window rate limiting.',
      'Built LRU caching, round-robin load balancing, and PostgreSQL-backed service configuration.',
      'Dockerized the service and added structured request logging, a live metrics endpoint, and automated tests.',
    ],
    technologies: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Docker', 'API Gateway', 'k6'],
    metrics: ['5,100 requests/second', '51,000 requests in 10 seconds', '99.99% validation checks passed', '35/35 automated tests passed'],
    metricNote: 'Results from project testing; not independent production benchmarks.',
    github: 'https://github.com/devesh0714/GateFlow',
  },
  {
    name: 'Personalized Learning Recommendation System with AI',
    subtitle: 'AI-powered personalized learning paths',
    summary: 'An AI-powered learning platform designed to generate personalized learning paths, track user progress, and provide intelligent study insights across multiple educational domains.',
    contributions: [
      'Developed a full-stack application using React, Node.js, Express, and MongoDB with JWT authentication.',
      'Built a hybrid rule-based and AI-driven recommendation engine within a domain-driven architecture.',
      'Implemented personalized learning paths and user progress tracking across multiple domains.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'AI Integration'],
    github: 'https://github.com/devesh0714/Personalized-Learning-Recommendation-System-with-AI',
    demo: 'https://personalized-learning-recommendatio.vercel.app',
  },
  {
    name: 'Le Reve Franchise',
    subtitle: 'Franchise website and lead workflows',
    summary: 'A premium franchise website supporting food, beverage, and hospitality franchise opportunities, with a focus on professional branding, website performance, and business lead generation.',
    contributions: [
      'Developed and maintained functionality using Next.js, React, and TypeScript with responsive interfaces.',
      'Integrated backend services, PostgreSQL and Prisma data functionality where applicable, and API and form workflows.',
      'Implemented application security and validation, technical SEO improvements, and Core Web Vitals work for LCP and CLS.',
      'Supported business automation and lead processing.',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    demo: 'https://www.revefranchise.com/',
  },
];

export const skillGroups = [
  {
    title: 'Backend Engineering & Security',
    skills: ['Node.js', 'Express.js', 'RESTful API design', 'JWT authentication', 'Google reCAPTCHA', 'Nodemailer / SMTP', 'Request validation', 'Backend security'],
  },
  {
    title: 'Databases & Data Platforms',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'MS SQL Server', 'Prisma ORM', 'pgvector', 'Row-Level Security (RLS)'],
  },
  {
    title: 'Programming Languages',
    skills: ['TypeScript', 'JavaScript', 'C++', 'Python', 'SQL'],
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Postman', 'Figma', 'CI/CD', 'Razorpay', 'OpenRouter API', 'Ollama'],
  },
  {
    title: 'Core Computer Science',
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Git workflow'],
  },
  {
    title: 'Frontend Technologies',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
  },
];

export const education = {
  institution: 'Kalinga University, Raipur',
  degree: 'Bachelor of Computer Applications (BCA)',
  period: '2023 – 2026',
  cgpa: '6.9 / 10',
};

export const achievements = [
  'Solved 50+ Data Structures and Algorithms problems across LeetCode and HackerRank.',
  'Achieved a 5-Star rating in Data Structures and Algorithms (C++) on HackerRank.',
];
