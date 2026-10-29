import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionShell from './SectionShell';
import { projects } from '../data/portfolioData';
import ScrollColorText from './ScrollColorText';

function GateFlowDiagram() {
  return (
    <div className="overflow-hidden rounded-lg border border-emerald-300/15 bg-[#020806] p-4 md:p-6" role="img" aria-label="GateFlow architecture diagram showing client requests flowing through Trie routing, Redis rate limiting and LRU cache, round-robin load balancing, and upstream services, with PostgreSQL service configuration and metrics logging.">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-emerald-100/50">Request path / system components</p>
      <div className="grid gap-3 text-center font-mono text-xs sm:grid-cols-[0.7fr_1fr_1.1fr_1fr] sm:items-center">
        <div className="rounded-md border border-emerald-300/20 bg-emerald-300/5 p-3 text-emerald-100">Client<br /><span className="text-emerald-100/45">HTTP request</span></div>
        <div className="rounded-md border border-lime-200/30 bg-lime-200/5 p-3 text-lime-100">Trie Router<br /><span className="text-lime-100/55">route match</span></div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-emerald-300/20 bg-emerald-300/5 p-3 text-emerald-100">Redis<br /><span className="text-emerald-100/45">rate limit</span></div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-300/5 p-3 text-emerald-100">LRU cache<br /><span className="text-emerald-100/45">response lookup</span></div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-300/5 p-3 text-emerald-100 sm:col-span-2">Round-robin load balancer</div>
        </div>
        <div className="rounded-md border border-emerald-300/20 bg-emerald-300/5 p-3 text-emerald-100">Upstream services<br /><span className="text-emerald-100/45">configured targets</span></div>
      </div>
      <div className="mt-3 grid gap-2 text-center font-mono text-xs sm:grid-cols-2">
        <div className="rounded-md border border-emerald-300/10 p-2 text-emerald-100/65">PostgreSQL · service configuration</div>
        <div className="rounded-md border border-emerald-300/10 p-2 text-emerald-100/65">Structured logs · live metrics</div>
      </div>
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-emerald-300/20 px-3 py-2 font-mono text-xs text-emerald-100 transition hover:border-lime-200/55 hover:text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-200/60"><Github className="h-4 w-4" aria-hidden="true" />GitHub Repository<span className="sr-only"> (opens in a new tab)</span></a> : null}
      {project.demo ? <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-300/10 px-3 py-2 font-mono text-xs text-lime-100 transition hover:bg-emerald-300/20 focus:outline-none focus:ring-2 focus:ring-lime-200/60">Live Demo<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a> : null}
    </div>
  );
}

function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="~/portfolio/projects"
      title="Projects built around real engineering constraints."
      description="Selected work across API infrastructure, AI-assisted learning, and full-stack business applications. GateFlow leads with its routing, rate limiting, caching, and load-testing work."
      scrollColor
    >
      {(isInView) => (
        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              className={`glass-panel flex h-full flex-col rounded-lg p-5 md:p-6 ${index === 0 ? 'lg:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <div className={index === 0 ? 'grid gap-6 lg:grid-cols-[1fr_1fr]' : 'flex h-full flex-col'}>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-lime-200/75">{index === 0 ? 'Featured · Backend systems' : `Project 0${index + 1}`}</p>
                  <ScrollColorText as="h3" className="mt-3 block text-2xl font-semibold leading-tight md:text-3xl">{project.name}</ScrollColorText>
                  <ScrollColorText as="p" className="mt-2 block font-mono text-sm">{project.subtitle}</ScrollColorText>
                  <ScrollColorText as="p" className="mt-4 block text-sm leading-7">{project.summary}</ScrollColorText>
                  <ul className="mt-4 space-y-2 text-sm leading-6">
                    {project.contributions.map((point) => <li key={point} className="list-inside list-disc marker:text-lime-200/70"><ScrollColorText>{point}</ScrollColorText></li>)}
                  </ul>
                </div>
                {index === 0 ? <GateFlowDiagram /> : null}
              </div>
              {project.metrics ? <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">{project.metrics.map((metric) => <div key={metric} className="rounded-md border border-emerald-300/15 bg-black/25 p-3 font-mono text-xs leading-5 text-lime-100">{metric}</div>)}</div> : null}
              {project.metricNote ? <p className="mt-2 font-mono text-xs text-emerald-100/50">{project.metricNote}</p> : null}
              <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                {project.technologies.map((technology) => <span key={technology} className="rounded-md border border-emerald-300/15 bg-emerald-300/5 px-2.5 py-1 font-mono text-xs text-emerald-100/70">{technology}</span>)}
              </div>
              <div className="mt-auto"><ProjectLinks project={project} /></div>
            </motion.article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

export default ProjectsSection;
