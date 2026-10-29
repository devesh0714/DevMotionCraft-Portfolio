import { motion } from 'framer-motion';
import SectionShell from './SectionShell';
import { experiences } from '../data/portfolioData';
import ScrollColorText from './ScrollColorText';

function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="~/portfolio/experience"
      title="Engineering work, built with teams."
      description="Backend and full-stack experience across business automation, API security, and shared production systems."
      scrollColor
    >
      {(isInView) => (
        <div className="relative grid gap-5 before:absolute before:bottom-8 before:left-3 before:top-8 before:w-px before:bg-emerald-300/20 md:gap-6">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.company}`}
              className="glass-panel relative rounded-lg p-5 pl-10 md:grid md:grid-cols-[0.55fr_1fr] md:gap-8 md:p-7 md:pl-12"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * index }}
            >
              <span className="absolute left-[0.42rem] top-7 h-3 w-3 rounded-full border-2 border-lime-200 bg-[#06130d]" aria-hidden="true" />
              <div>
                <p className="font-mono text-sm text-lime-200/85">{item.period}</p>
                <ScrollColorText as="h3" className="mt-3 block text-xl font-semibold md:text-2xl">{item.role}</ScrollColorText>
                <ScrollColorText as="p" className="mt-2 block font-mono text-sm">{item.company}</ScrollColorText>
                {item.location ? <p className="mt-1 font-mono text-xs text-emerald-100/50">{item.location}</p> : null}
              </div>
              <div className="mt-5 md:mt-0">
                <ul className="space-y-3 text-sm leading-7">
                  {item.detail.map((point) => <li key={point} className="list-inside list-disc marker:text-lime-200/75"><ScrollColorText>{point}</ScrollColorText></li>)}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2" aria-label={`${item.company} technologies`}>
                  {item.technologies.map((technology) => <span key={technology} className="rounded-md border border-emerald-300/15 bg-black/25 px-2.5 py-1 font-mono text-xs text-emerald-100/70">{technology}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

export default ExperienceSection;
