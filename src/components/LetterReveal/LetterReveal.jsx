"use client";

import { motion, useReducedMotion } from "framer-motion";

const LetterReveal = ({
  text,
  as: Element = "span",
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 0.5,
  amount = 0.35,
  once = false,
  preserveWords = false,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = motion[Element] || motion.span;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : delay,
        staggerChildren: shouldReduceMotion || preserveWords ? 0 : stagger,
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
  const wordVariants = {
    hidden: {},
    visible: (characterOffset) => ({
      transition: {
        delayChildren: shouldReduceMotion ? 0 : characterOffset * stagger,
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      },
    }),
  };
  let characterOffset = 0;
  const content = preserveWords
    ? text.split(/(\s+)/).map((word, wordIndex) => {
        if (/^\s+$/.test(word)) return word;

        const startOffset = characterOffset;
        const charactersInWord = Array.from(word);
        characterOffset += charactersInWord.length;

        return (
          <motion.span
            key={`word-${wordIndex}`}
            className="letter-reveal-word"
            variants={wordVariants}
            custom={startOffset}
          >
            {charactersInWord.map((character, characterIndex) => (
              <motion.span
                key={`${wordIndex}-${characterIndex}`}
                aria-hidden="true"
                className="letter-reveal-character"
                variants={characterVariants}
              >
                {character}
              </motion.span>
            ))}
          </motion.span>
        );
      })
    : Array.from(text).map((character, index) =>
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
      );

  return (
    <MotionElement
      className={`letter-reveal ${className}`.trim()}
      aria-label={text}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      variants={containerVariants}
      viewport={{ once, amount }}
      {...props}
    >
      {content}
    </MotionElement>
  );
};

export default LetterReveal;
