"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789!@#$%^&*";

const TextScramble = ({ text, className = "", delay = 0, hoverTrigger = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const isScramblingRef = useRef(false);

  const scramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        isScramblingRef.current = false;
      }

      iteration += 1 / 3;
    }, 28);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <span
      className={className}
      onMouseEnter={hoverTrigger ? scramble : undefined}
      style={{ display: "inline-block", cursor: hoverTrigger ? "pointer" : "inherit" }}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;

