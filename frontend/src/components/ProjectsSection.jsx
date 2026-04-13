import { motion } from 'framer-motion';
import SectionShell from './SectionShell';
import TerminalText from './TerminalText';

const projects = [
  {
    name: 'Personalized Learning Recommendation System with AI',
    tag: 'React / Node / MongoDB / Ollama',
    summary:
      'Built a personalized learning recommendation system using React, Node.js, and MongoDB, implementing a hierarchical (Domain → Topic) learning model with real-time progress tracking. Designed a hybrid recommendation engine combining rule-based logic and AI insights using Ollama to dynamically suggest next learning steps and identify weak areas.',
    },
  {
    name: 'Motion Notes',
    tag: 'Framer Motion / Vite',
    summary:
      'A writing space where notes fold, expand, and reorganize through spring-driven transitions instead of abrupt state changes.',
  },
  {
    name: 'Deploy Lens',
    tag: 'Express / Webhooks',
    summary:
      'A release monitor that groups deployment events, failed checks, and team comments into one readable timeline.',
  },
];

function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="~/portfolio/projects"
      title="Developer tools with texture, speed, and a little electricity."
      description="Each project is shaped around fast feedback, legible state, and interfaces that respond like they are paying attention."
    >
      {(isInView) => (
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              className="glass-panel rounded-lg p-5"
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: 0.25 + index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 28px 90px rgba(4, 120, 87, 0.22)',
              }}
            >
              <div className="mb-6 h-36 rounded-lg border border-emerald-300/15 bg-[#020403] p-4">
                <div className="flex h-full flex-col justify-between font-mono text-sm">
                  <p className="text-emerald-200/62">
                    <span className="text-lime-200">const</span> project =
                  </p>
                  <p className="text-3xl font-semibold text-emerald-50">
                    {'{'}
                  </p>
                  <p className="text-emerald-200/72">
                    status:{' '}
                    <span className="text-lime-200">"shipping"</span>
                  </p>
                </div>
              </div>

              <p className="font-mono text-xs uppercase text-lime-200/72">
                <TerminalText
                  text={project.tag}
                  start={isInView}
                  delay={650 + index * 220}
                  speed={16}
                />
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-emerald-50">
                <TerminalText
                  text={project.name}
                  start={isInView}
                  delay={800 + index * 220}
                  speed={20}
                />
              </h3>
              <p className="mt-4 font-mono text-sm leading-7 text-emerald-100/70">
                <TerminalText
                  text={project.summary}
                  start={isInView}
                  delay={960 + index * 220}
                  speed={9}
                />
              </p>
            </motion.article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

export default ProjectsSection;
