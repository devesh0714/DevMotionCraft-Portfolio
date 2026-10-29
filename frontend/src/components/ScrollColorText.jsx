import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const colors = ['#5B665F', '#C6F58A', '#F5FFE8'];

/** Text whose color follows this element's own position through the viewport. */
function ScrollColorText({ as: Tag = 'span', children, className = '', ...props }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Begin as the text enters the lower reading area; finish as it reaches
    // the upper reading area. Motion reverses automatically when scrolling up.
    offset: ['start 0.9', 'end 0.28'],
  });
  const color = useTransform(scrollYProgress, [0, 0.5, 1], colors);
  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ color: reduceMotion ? colors[1] : color }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export default ScrollColorText;
