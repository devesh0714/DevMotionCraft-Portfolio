import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function ClickEffect() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const nextBurst = {
        id: `${event.timeStamp}-${event.clientX}-${event.clientY}`,
        x: event.clientX,
        y: event.clientY,
      };

      setBursts((current) => [...current.slice(-14), nextBurst]);

      window.setTimeout(() => {
        setBursts((current) =>
          current.filter((burst) => burst.id !== nextBurst.id),
        );
      }, 900);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.span
            key={burst.id}
            aria-hidden="true"
            className="absolute font-mono text-lg font-bold text-lime-200 drop-shadow-[0_0_18px_rgba(190,242,100,0.75)]"
            style={{
              left: burst.x,
              top: burst.y,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, scale: 0.35, x: '-50%', y: '-50%' }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.35, 1.45, 1.9],
              x: '-50%',
              y: '-115%',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {'</>'}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ClickEffect;
