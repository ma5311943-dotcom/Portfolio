"use client";

import { motion, useReducedMotion } from "framer-motion";

const offsets = {
  up: { y: 28 },
  down: { y: -24 },
  left: { x: -32 },
  right: { x: 32 },
};

const Reveal = ({
  as: Element = "div",
  children,
  className,
  from = "up",
  delay = 0,
  duration = 0.65,
  amount = 0.2,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = motion[Element] || motion.div;
  const offset = offsets[from] || offsets.up;

  return (
    <MotionElement
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: false, amount }}
      {...props}
    >
      {children}
    </MotionElement>
  );
};

export default Reveal;
