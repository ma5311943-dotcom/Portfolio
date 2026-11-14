"use client";
import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import "./About.css";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";
import EyeTrackingPortrait from "../EyeTrackingPortrait/EyeTrackingPortrait";

const MotionDiv = motion.div;

const About = () => {
  const SkillBar = ({ name, percent, color, index }) => {
    const skillRef = useRef(null);
    const isInView = useInView(skillRef, { once: true, amount: 0.2 });
    const shouldReduceMotion = useReducedMotion();
    const count = useMotionValue(0);
    const displayCount = useTransform(count, (value) => `${Math.round(value)}%`);

    useEffect(() => {
      if (!isInView) return undefined;

      const animation = animate(count, percent, {
        duration: shouldReduceMotion ? 0 : 1.2,
        ease: "easeOut",
      });
      return () => animation.stop();
    }, [count, isInView, percent, shouldReduceMotion]);

    return (
      <MotionDiv
        ref={skillRef}
        className="about-skill"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : index * 0.025 }}
      >
        <p>
          <LetterReveal
            as="span"
            className="skill-name"
            text={name}
            stagger={0.035}
            duration={0.45}
            once
            preserveWords
          />
          <motion.span className="skill-percent">{displayCount}</motion.span>
        </p>
        <div className="skill-bar">
          <MotionDiv
            className="skill-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? percent / 100 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut" }}
            style={{ background: color || "linear-gradient(277deg, #da7c25 0.35%, #b923e1)" }}
          />
        </div>
      </MotionDiv>
    );
  };

  return (
    <div id="about" className="about">
      <Reveal className="about-title" from="down" once>
        <LetterReveal as="h1" text="About me" once />
        <img src="/theme_pattern.svg" alt="pattern" />
      </Reveal>
      <div className="about-sections">
        <Reveal className="about-left" from="left" delay={0.45} duration={1.1} once>
          <EyeTrackingPortrait src="/profile.png" alt="Profile" variant="about" />
        </Reveal>
        <Reveal className="about-right" from="up" duration={0.55} once>
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
      <Reveal className="about-achievements" once>
        <div className="about-achievement">
          <h1>4+</h1>
          <LetterReveal as="p" text="Years of Learning Experience" stagger={0.05} duration={0.5} once />
        </div>

        <hr />

        <div className="about-achievement">
          <h1>25+</h1>
          <LetterReveal as="p" text="Projects Built" stagger={0.05} duration={0.5} once />
        </div>

        <hr />

        <div className="about-achievement">
          <h1>100%</h1>
          <LetterReveal as="p" text="Learning Focus" stagger={0.05} duration={0.5} once />
        </div>
      </Reveal>

    </div>
  );
};

export default About;