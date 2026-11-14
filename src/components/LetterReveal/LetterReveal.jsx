"use client";

import { motion, useReducedMotion } from "framer-motion";

const LetterReveal = ({
  text,
  as: Element = "span",
  className = "",
  delay = 0,
  stagger = 0.035,
  duration = 0.32,
  amount = 0.35,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = motion[Element] || motion.span;
  const characters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : delay,
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      },
    },
  };
  const characterVariants = {
    hidden: { opacity: 0, y: "0.55em", rotateX: -55, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionElement
      className={`letter-reveal ${className}`.trim()}
      aria-label={text}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      variants={containerVariants}
      viewport={{ once: false, amount }}
      {...props}
    >
      {characters.map((character, index) =>
        character === " " ? (
          " "
        ) : (
          <motion.span
            key={`${character}-${index}`}
            aria-hidden="true"
            className="letter-reveal-character"
            variants={characterVariants}
          >
            {character}
          </motion.span>
        ),
      )}
    </MotionElement>
  );
};

export default LetterReveal;
