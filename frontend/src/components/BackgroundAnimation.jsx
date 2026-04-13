import { motion, useReducedMotion } from 'framer-motion';

const symbols = [
  { left: '8%', top: '18%', size: 32, duration: 18, delay: 0 },
  { left: '18%', top: '76%', size: 20, duration: 24, delay: 2.5 },
  { left: '30%', top: '36%', size: 26, duration: 22, delay: 1.2 },
  { left: '44%', top: '12%', size: 18, duration: 20, delay: 3.1 },
  { left: '56%', top: '70%', size: 34, duration: 26, delay: 0.8 },
  { left: '70%', top: '28%', size: 22, duration: 21, delay: 4.2 },
  { left: '84%', top: '62%', size: 28, duration: 23, delay: 1.8 },
  { left: '92%', top: '20%', size: 17, duration: 19, delay: 5 },
  { left: '12%', top: '48%', size: 16, duration: 17, delay: 4.8 },
  { left: '76%', top: '86%', size: 19, duration: 25, delay: 2.9 },
];

function BackgroundAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {symbols.map((symbol, index) => (
        <motion.span
          aria-hidden="true"
          className="absolute select-none font-mono font-semibold text-lime-200/12"
          key={`${symbol.left}-${symbol.top}`}
          style={{
            left: symbol.left,
            top: symbol.top,
            fontSize: symbol.size,
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0.05, x: 0, y: 0, rotate: -8 }}
          animate={
            reduceMotion
              ? { opacity: 0.08 }
              : {
                  opacity: [0.05, 0.16, 0.07],
                  x: [0, index % 2 === 0 ? 48 : -44, 0],
                  y: [0, index % 3 === 0 ? -58 : 52, 0],
                  rotate: [-10, index % 2 === 0 ? 10 : -18, -10],
                }
          }
          transition={{
            duration: symbol.duration,
            delay: symbol.delay,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          {'</>'}
        </motion.span>
      ))}
    </div>
  );
}

export default BackgroundAnimation;
