import { motion } from 'framer-motion';
import SectionShell from './SectionShell';
import TerminalText from './TerminalText';

const experience = [
  {
    role: 'Software Development Engineer Intern',
    company: 'ITJOBXS',
    period: '2024 - Present',
    detail:
      'Design and Development part of a fully responsive webpage for a particular section, Worked on User Verification/Authentication + Engineering challenges of detecting and removing the fake bots and posts, Integrated Recaptcha and other anti-bot measures to enhance security and user experience. ',
  },
  // {
  //   role: 'Full Stack Developer',
  //   company: 'SaaS Lab',
  //   period: '2022 - 2024',
  //   detail:
  //     'Shipped dashboards, APIs, authentication, and developer tooling across MongoDB, Express, React, and Node.',
  // },
  // {
  //   role: 'UI Engineer',
  //   company: 'Independent',
  //   period: '2020 - 2022',
  //   detail:
  //     'Designed landing systems, prototypes, and high-conversion web experiences for early-stage teams.',
  // },
];

function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="~/portfolio/experience"
      title="Systems, screens, and the small details that make them feel alive."
      description="I like frontend work where the interaction model matters as much as the data model."
    >
      {(isInView) => (
        <div className="grid gap-5">
          {experience.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.company}`}
              className="glass-panel rounded-lg p-5 md:grid md:grid-cols-[0.55fr_1fr] md:gap-8 md:p-7"
              initial={{ opacity: 0, y: 34 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.72,
                delay: 0.25 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(190, 242, 100, 0.35)',
              }}
            >
              <div>
                <p className="font-mono text-sm text-lime-200/80">
                  <TerminalText
                    text={item.period}
                    start={isInView}
                    delay={650 + index * 180}
                    speed={20}
                  />
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-emerald-50">
                  <TerminalText
                    text={item.role}
                    start={isInView}
                    delay={760 + index * 180}
                    speed={18}
                  />
                </h3>
                <p className="mt-2 font-mono text-sm text-emerald-200/58">
                  <TerminalText
                    text={item.company}
                    start={isInView}
                    delay={900 + index * 180}
                    speed={18}
                  />
                </p>
              </div>
              <p className="mt-5 font-mono text-base leading-8 text-emerald-100/70 md:mt-0">
                <TerminalText
                  text={item.detail}
                  start={isInView}
                  delay={980 + index * 220}
                  speed={10}
                />
              </p>
            </motion.article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

export default ExperienceSection;
