"use client";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const ScrambleText = ({ text, className, triggerOnMount = true }) => {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!triggerOnMount) return;

    let frameId;
    let startTime = null;
    const scrambleDuration = 600; // ms of pure scramble
    const revealDuration = 800;   // ms to progressively reveal

    const mountTimeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < scrambleDuration) {
          // Pure scramble phase
          const scrambled = text
            .split("")
            .map((ch) =>
              ch === " "
                ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join("");
          setDisplayed(scrambled);
          frameId = requestAnimationFrame(animate);
        } else {
          // Progressive reveal phase
          const revealElapsed = elapsed - scrambleDuration;
          const revealProgress = Math.min(revealElapsed / revealDuration, 1);
          const revealCount = Math.floor(revealProgress * text.length);

          const result = text
            .split("")
            .map((ch, i) => {
              if (i < revealCount) return ch;
              if (ch === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");

          setDisplayed(result);

          if (revealProgress < 1) {
            frameId = requestAnimationFrame(animate);
          } else {
            setDisplayed(text);
          }
        }
      };

      frameId = requestAnimationFrame(animate);
    }, 600);

    return () => {
      clearTimeout(mountTimeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [text, triggerOnMount]);

  return <span className={className}>{displayed}</span>;
};

export default ScrambleText;
