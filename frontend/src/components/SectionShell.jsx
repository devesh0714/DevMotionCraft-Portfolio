import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollColorText from './ScrollColorText';

function SectionShell({ id, eyebrow, title, description, children, scrollColor = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      id={id}
      ref={ref}
      className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:scroll-mt-20 md:px-8 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-sm uppercase text-lime-200/80">{eyebrow}</p>
        {scrollColor ? <ScrollColorText as="h2" className="mt-4 block max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{title}</ScrollColorText> : <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-emerald-50 md:text-6xl">{title}</h2>}
        {description ? (
          scrollColor ? <ScrollColorText as="p" className="mt-6 block max-w-3xl font-mono text-base leading-8 md:text-lg">{description}</ScrollColorText> : <p className="mt-6 max-w-3xl font-mono text-base leading-8 text-emerald-100/72 md:text-lg">{description}</p>
        ) : null}
      </motion.div>

      <div className="mt-12">{children(isInView)}</div>
    </section>
  );
}

export default SectionShell;
