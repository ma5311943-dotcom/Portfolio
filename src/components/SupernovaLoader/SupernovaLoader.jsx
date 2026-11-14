"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SupernovaLoader.css";

// Dynamic showcase phrases highlighting your exact skills & focus
const TECH_PILLARS = [
  { role: "FULL-STACK DEVELOPER", tag: "Next.js • React • Node.js • Mobile" },
  { role: "BACKEND ARCHITECT", tag: "Express • MongoDB • PostgreSQL • APIs" },
  { role: "DEVOPS ENGINEER", tag: "Docker • Linux • Networking • CI/CD" },
  { role: "TURNING IDEAS INTO REALITY", tag: "25+ Completed Scalable Projects" },
  { role: "MUHAMMAD ILYAS", tag: "Welcome to the Portfolio" },
];

const SupernovaLoader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Cycle through your developer specializations (stays for 1.1s each - sweet spot)
    const textInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < TECH_PILLARS.length - 1) {
          return prev + 1;
        }
        clearInterval(textInterval);
        return prev;
      });
    }, 1100);

    // 2. Smooth progress count from 0 -> 100% synced across ~5.5s
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              onComplete?.();
            }, 850); // Staggered shutter exit
          }, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 55);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="agency-loader-root">
      {/* 5 Vertical Staggered Shutter Columns */}
      <div className="agency-shutters">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="agency-shutter-bar"
            initial={{ y: "0%" }}
            animate={isDone ? { y: "-100%" } : { y: "0%" }}
            transition={{
              duration: 0.85,
              delay: i * 0.08,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>

      {/* Center Luxury Content */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            className="agency-loader-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          >
            {/* Top Minimal Branding */}
            <div className="agency-loader-top">
              <span className="agency-dot" />
              <span className="agency-brand">MUHAMMAD ILYAS // ARCHITECTING DIGITAL EXPERIENCES</span>
            </div>

            {/* Middle Rotating Portfolio Identity */}
            <div className="agency-greeting-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="agency-text-block"
                  initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <h1 className="agency-greeting">
                    {TECH_PILLARS[index].role}
                  </h1>
                  <p className="agency-subtag">
                    {TECH_PILLARS[index].tag}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Progress Bar + Number */}
            <div className="agency-loader-bottom">
              <div className="agency-progress-track">
                <div
                  className="agency-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="agency-progress-counter">
                <span>{progress < 10 ? `0${progress}` : progress}</span>
                <span className="agency-percent-symbol">%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupernovaLoader;
