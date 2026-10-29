import { ArrowDown, Download, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import TerminalText from './TerminalText';
import ScrollColorText from './ScrollColorText';
import { achievements, education, skillGroups, socialLinks } from '../data/portfolioData';

const socialIcons = { GitHub: Github, LinkedIn: Linkedin, Email: Mail, Phone };

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
      <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-sm uppercase text-lime-200/80">~/portfolio/about</p>
          <ScrollColorText as="h1" className="mt-5 block text-5xl font-semibold leading-tight md:text-7xl">Devesh Kumar</ScrollColorText>
          <ScrollColorText as="p" className="mt-2 block font-mono text-lg font-medium md:text-xl">Software Development Engineer</ScrollColorText>
          <p className="mt-6 min-h-24 max-w-3xl font-mono text-lg leading-8 text-emerald-100/78 md:min-h-20 md:text-xl">
            <ScrollColorText as="span">Building modern web applications, scalable backend systems, and AI-powered solutions.</ScrollColorText>
          </p>
          <ScrollColorText as="p" className="mt-4 block max-w-2xl text-sm leading-7">
            Focused on backend engineering, full-stack development, API architecture, database design, application security, and performance optimization.
          </ScrollColorText>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <motion.a href="#projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300/20 px-5 py-3 font-mono text-sm text-emerald-100 transition duration-300 hover:border-lime-200/60 hover:bg-lime-200/10 hover:text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-200/60" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              View Projects
            </motion.a>
            <motion.a href="/resume.pdf" download="Devesh_Kumar_SDE_Resume_.pdf" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-300 px-5 py-3 font-mono text-sm font-bold text-black shadow-glow transition duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-lime-200/70" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Download Resume <Download className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="Contact and social links">
            {socialLinks.map(({ label, value, href, external }) => {
              const Icon = socialIcons[label];
              return (
                <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={label === 'LinkedIn' ? 'Visit my LinkedIn profile' : `${label}: ${value}`} title={label} className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-emerald-300/15 bg-emerald-300/5 px-3 py-2 font-mono text-xs text-emerald-50 transition duration-300 hover:border-lime-200/55 hover:bg-lime-200/10 hover:text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-200/60">
                  <Icon className="h-4 w-4 text-lime-200 transition group-hover:drop-shadow-[0_0_9px_rgba(190,242,100,0.8)]" aria-hidden="true" />
                  <span>{value}</span>
                </a>
              );
            })}
          </div>

          <a href="#experience" className="mt-8 inline-flex min-h-10 items-center gap-2 rounded-lg px-2 py-2 font-mono text-sm text-emerald-100/65 transition hover:text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-200/60">
            <TerminalText text="continue" speed={45} cursor={false} /> <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div className="glass-panel scanline rounded-lg p-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }}>
          <div className="rounded-lg border border-emerald-300/15 bg-black/45 p-4 md:p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/85" /><span className="h-3 w-3 rounded-full bg-yellow-300/85" /><span className="h-3 w-3 rounded-full bg-lime-300/85" />
              <span className="ml-2 font-mono text-xs text-emerald-100/50">dev-console</span>
            </div>
            <div className="terminal-output rounded-lg border border-emerald-300/10 bg-[#020403]/80 p-4 font-mono text-sm leading-6 md:p-5">
              <div className="terminal-row">
                <p><span className="text-lime-200">$</span> whoami</p>
                <p className="terminal-result">Software Development Engineer</p>
              </div>
              <div className="terminal-row">
                <p><span className="text-lime-200">$</span> focus --areas</p>
                <p className="terminal-result">APIs · data systems · application security · performance</p>
              </div>
              <div className="terminal-row">
                <p><span className="text-lime-200">$</span> git status</p>
                <p className="terminal-result">building useful things, one reliable system at a time<span className="terminal-cursor">_</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="glass-panel rounded-lg p-5 md:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-lime-200/75">~/portfolio/profile</p>
          <ScrollColorText as="h2" className="mt-3 block text-2xl font-semibold">About</ScrollColorText>
          <div className="mt-4 max-w-4xl space-y-4 text-sm leading-7">
            <ScrollColorText as="p">I’m Devesh Kumar, a Software Development Engineer with experience building full-stack applications, backend services, secure APIs, database-driven systems, and AI-powered applications.</ScrollColorText>
            <ScrollColorText as="p">My experience includes developing web applications, designing RESTful APIs, implementing authentication and request validation, optimizing application performance, and building backend automation.</ScrollColorText>
            <ScrollColorText as="p">I enjoy solving engineering problems, designing reliable backend systems, improving application performance, and building software that addresses real-world requirements.</ScrollColorText>
          </div>
          <div className="mt-7">
            <ScrollColorText as="h3" className="block font-mono text-sm">Education</ScrollColorText>
            <ScrollColorText as="p" className="mt-2 block font-medium">{education.degree}</ScrollColorText>
            <ScrollColorText as="p" className="mt-1 block text-sm">{education.institution} · {education.period} · CGPA {education.cgpa}</ScrollColorText>
          </div>
          <div className="mt-6">
            <h3 className="font-mono text-sm text-emerald-50">Achievements</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-emerald-100/68">{achievements.map((achievement) => <li key={achievement} className="list-inside list-disc marker:text-lime-200/70">{achievement}</li>)}</ul>
          </div>
        </article>

        <article className="glass-panel rounded-lg p-5 md:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-lime-200/75">~/portfolio/stack</p>
          <ScrollColorText as="h2" className="mt-3 block text-2xl font-semibold">Technical Skills</ScrollColorText>
          <ScrollColorText as="p" className="mt-2 block text-sm leading-6">Grouped by the systems and tools I work with.</ScrollColorText>
          <div className="mt-5 space-y-5">
            {skillGroups.map((group) => <div key={group.title}>
              <h3 className="font-mono text-xs text-lime-100/80">{group.title}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">{group.skills.map((skill) => <li key={skill} className="rounded-md border border-emerald-300/15 bg-black/20 px-2.5 py-1.5 font-mono text-xs text-emerald-100/70">{skill}</li>)}</ul>
            </div>)}
          </div>
        </article>
      </div>
    </section>
  );
}

export default AboutSection;
