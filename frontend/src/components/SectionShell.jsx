import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TerminalText from './TerminalText';

function SectionShell({ id, eyebrow, title, description, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      id={id}
      ref={ref}
      className="mx-auto min-h-screen max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-sm uppercase text-lime-200/80">
          <TerminalText text={eyebrow} start={isInView} speed={28} />
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-emerald-50 md:text-6xl">
          <TerminalText text={title} start={isInView} speed={20} delay={150} />
        </h2>
        {description ? (
          <p className="mt-6 max-w-3xl font-mono text-base leading-8 text-emerald-100/72 md:text-lg">
            <TerminalText
              text={description}
              start={isInView}
              speed={12}
              delay={450}
            />
          </p>
        ) : null}
      </motion.div>

      <div className="mt-12">{children(isInView)}</div>
    </section>
  );
}

export default SectionShell;
