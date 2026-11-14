"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./About.css";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";

const MotionDiv = motion.div;

const About = () => {
  const useCounter = (target, duration = 1200, active = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!active) {
        setCount(0);
        return undefined;
      }

      const startTime = performance.now();
      let frameId;
      const updateCount = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) frameId = requestAnimationFrame(updateCount);
      };

      frameId = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(frameId);
    }, [active, duration, target]);

    return count;
  };

  const SkillBar = ({ name, percent, color, index }) => {
    const skillRef = useRef(null);
    const isInView = useInView(skillRef, { once: false, amount: 0.5 });
    const shouldReduceMotion = useReducedMotion();
    const count = useCounter(percent, 1200, isInView);

    return (
      <MotionDiv
        ref={skillRef}
        className="about-skill"
        initial={{ opacity: 0, x: -18 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : index * 0.04 }}
      >
        <p>
          <LetterReveal as="span" className="skill-name" text={name} stagger={0.018} duration={0.2} />
          <span>{count}%</span>
        </p>
        <div className="skill-bar">
          <MotionDiv
            className="skill-fill"
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${percent}%` : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut" }}
            style={{ background: color || "linear-gradient(277deg, #da7c25 0.35%, #b923e1)" }}
          />
        </div>
      </MotionDiv>
    );
  };

  return (
    <div id="about" className="about">
      <Reveal className="about-title" from="down">
        <LetterReveal as="h1" text="About me" />
        <img src="/theme_pattern.svg" alt="pattern" />
      </Reveal>
      <div className="about-sections">
        <Reveal className="about-left" from="left">
          <img src="/profile.png" alt="Profile" />
        </Reveal>
        <Reveal className="about-right" from="right">
          <div className="about-para">
            <p>
              I am a dedicated Full Stack Web & Mobile App Developer with expertise in building scalable, production-ready applications. My core stack includes Next.js, React.js, React Native, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, and Firebase.
            </p>
            <p>
              Constantly expanding my horizons, I am actively diving deep into DevOps — mastering Linux system administration, Git & GitHub workflows, computer networking fundamentals, and Docker containerization to build automated, reliable software pipelines.
            </p>
          </div>
          <div className="about-skills">
            <SkillBar name="HTML & CSS & JavaScript" percent={90} color="linear-gradient(to right, #e34c26, #f7df1e)" index={0} />
            <SkillBar name="React.js" percent={93} color="linear-gradient(to right, #38bdf8, #0ea5e9)" index={1} />
            <SkillBar name="Node.js" percent={94} color="linear-gradient(to right, #68a063, #3c873a)" index={2} />
            <SkillBar name="Express.js" percent={95} color="linear-gradient(to right, #0070f3, #00dfd8)" index={3} />
            <SkillBar name="MongoDB" percent={96} color="linear-gradient(to right, #47a248, #3f8f41)" index={4} />
            <SkillBar name="Next.js" percent={92} color="linear-gradient(to right, #61dafb, #00b4e5)" index={5} />
            <SkillBar name="React Native Expo" percent={88} color="linear-gradient(to right, #61dafb, #38bdf8)" index={1} />
            <SkillBar name="Next.js with MySQL" percent={88} color="linear-gradient(to right, #f29111, #00758f)" index={6} />
            <SkillBar name="Next.js with PostgreSQL" percent={86} color="linear-gradient(to right, #336791, #6db3e5)" index={7} />
            <SkillBar name="Linux" percent={84} color="linear-gradient(to right, #f8b000, #dd4814)" index={8} />
            <SkillBar name="Git & GitHub" percent={92} color="linear-gradient(to right, #f05032, #24292e)" index={11} />
            <SkillBar name="Networking" percent={82} color="linear-gradient(to right, #a855f7, #ec4899)" index={9} />
            <SkillBar name="Docker" percent={80} color="linear-gradient(to right, #2496ed, #0db7ed)" index={10} />
            
          </div>
        </Reveal>
      </div>
      <Reveal className="about-achievements">
        <div className="about-achievement">
          <h1>3+</h1>
          <LetterReveal as="p" text="Years Learning Experience" stagger={0.02} duration={0.2} />
        </div>

        <hr />

        <div className="about-achievement">
          <h1>25+</h1>
          <LetterReveal as="p" text="NEXT JS, MERN STACK, REACT NATIVE PROJECTS" stagger={0.012} duration={0.18} />
        </div>

        <hr />

        <div className="about-achievement">
          <h1>100%</h1>
          <LetterReveal as="p" text="Learning Focus" stagger={0.02} duration={0.2} />
        </div>
      </Reveal>

    </div>
  );
};

export default About;