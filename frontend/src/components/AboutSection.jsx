import { Mail, Github, Phone, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import TerminalText from './TerminalText';

const contacts = [
  {
    label: 'Email',
    value: 'deveshkumar.dev',
    href: 'mailto:deveshkumar0714@gmail.com',
    Icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.devesh',
    href: 'https://github.com/devesh0714',
    Icon: Github,
  },
  {
    label: 'Phone',
    value: '+91 8544279557',
    href: 'tel:+918544279557',
    Icon: Phone,
  },
];

const bootLines = [
  'npm run build:ideas',
  'optimizing motion curves...',
  'shipping interfaces with calm precision',
];

function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-sm uppercase text-lime-200/80">
          <TerminalText text="~/portfolio/about" speed={34} />
        </p>

        <h1 className="mt-5 text-5xl font-semibold leading-tight text-emerald-50 md:text-7xl">
          <TerminalText text="Devesh Kumar" speed={28} delay={200} />
        </h1>

        <p className="mt-6 max-w-3xl font-mono text-lg leading-8 text-emerald-100/78 md:text-xl">
          <TerminalText
            text="Frontend engineer crafting fast, expressive products with React, motion systems, and developer-grade polish."
            speed={14}
            delay={700}
          />
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {contacts.map(({ label, value, href, Icon }, index) => (
            <motion.a
              key={label}
              href={href}
              className="group inline-flex items-center gap-3 rounded-lg border border-emerald-300/15 bg-emerald-300/7 px-4 py-3 font-mono text-sm text-emerald-50 backdrop-blur-md transition duration-300 hover:border-lime-200/55 hover:bg-lime-200/10 focus:outline-none focus:ring-2 focus:ring-lime-200/60"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 1 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 28px rgba(190, 242, 100, 0.22)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon
                className="h-5 w-5 text-lime-200 transition duration-300 group-hover:drop-shadow-[0_0_12px_rgba(190,242,100,0.95)]"
                aria-hidden="true"
              />
              <span className="sr-only">{label}</span>
              <span>{value}</span>
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#experience"
          className="mt-12 inline-flex items-center gap-3 rounded-lg border border-emerald-300/20 px-4 py-3 font-mono text-sm text-emerald-100/78 transition duration-300 hover:border-lime-200/50 hover:text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-200/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.7 }}
          whileHover={{ y: 4 }}
          whileTap={{ scale: 0.96 }}
        >
          <TerminalText text="continue" speed={45} delay={1450} cursor={false} />
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </motion.div>

      <motion.div
        className="glass-panel scanline rounded-lg p-3"
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-lg border border-emerald-300/15 bg-black/45 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/85" />
            <span className="h-3 w-3 rounded-full bg-yellow-300/85" />
            <span className="h-3 w-3 rounded-full bg-lime-300/85" />
            <span className="ml-2 font-mono text-xs text-emerald-100/50">
              dev-console
            </span>
          </div>

          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1763568258143-904ea924ac53?auto=format&fit=crop&w=1200&q=80"
              alt="Laptop with code editor open"
              className="h-64 w-full object-cover opacity-85 saturate-150 md:h-80"
              loading="eager"
            />
          </div>

          <div className="mt-5 space-y-3 rounded-lg border border-emerald-300/10 bg-[#020403]/80 p-4 font-mono text-sm text-emerald-100/76">
            {bootLines.map((line, index) => (
              <p key={line}>
                <span className="text-lime-200">$ </span>
                <TerminalText
                  text={line}
                  delay={1200 + index * 520}
                  speed={18}
                  cursor={index === bootLines.length - 1}
                />
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
