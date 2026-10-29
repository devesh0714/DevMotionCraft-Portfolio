import { motion, MotionConfig } from 'framer-motion';
import AboutSection from './components/AboutSection';
import BackgroundAnimation from './components/BackgroundAnimation';
import ClickEffect from './components/ClickEffect';
import ContactSection from './components/ContactSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';

const navItems = ['about', 'experience', 'projects', 'contact'];

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen overflow-x-hidden bg-[#030806] text-emerald-50 selection:bg-emerald-300 selection:text-black">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_14%,rgba(16,185,129,0.22),transparent_28%),radial-gradient(circle_at_80%_8%,rgba(45,212,191,0.14),transparent_22%),linear-gradient(135deg,#030806_0%,#06130d_46%,#020403_100%)]" />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:54px_54px] opacity-55" />
      <BackgroundAnimation />
      <ClickEffect />

      <motion.header
        className="fixed left-0 right-0 top-0 z-40 border-b border-emerald-300/10 bg-[#030806]/72 backdrop-blur-xl"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-5 py-4 md:px-8">
          <a
            href="#about"
            className="font-mono text-sm font-semibold uppercase text-emerald-200"
          >
            dk<span className="text-lime-300">.dev</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="rounded-lg px-4 py-2 font-mono text-xs uppercase text-emerald-100/72 transition duration-300 hover:bg-emerald-300/10 hover:text-lime-200 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex w-full items-center justify-between gap-1 md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="rounded-md px-2 py-2 font-mono text-[0.65rem] uppercase text-emerald-100/75 transition hover:bg-emerald-300/10 hover:text-lime-200 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </motion.header>

      <main className="relative z-10">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
    </MotionConfig>
  );
}

export default App;
