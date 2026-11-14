"use client";
import "./Hero.css";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";

const MotionDiv = motion.div;

const Hero = () => {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <div id="home" className="hero" ref={heroRef}>
      <MotionDiv
        className="hero-glow"
        style={shouldReduceMotion ? undefined : { y: glowY }}
        aria-hidden="true"
      />
      <MotionDiv
        className="hero-image-reveal"
        initial={shouldReduceMotion ? false : { opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/profile.png" alt="Muhammad Ilyas" />
      </MotionDiv>
      <Reveal as="h1" delay={0.15}>
        <LetterReveal as="span" text="I am " />
        <LetterReveal as="span" text="Muhammad Ilyas" className="highlight-name" />
        <br />
        <LetterReveal as="span" text="Full Stack Web & Mobile App Developer" />
      </Reveal>

      <Reveal as="p" delay={0.25}>
        A passionate developer from Pakistan specializing in scalable full-stack applications with{" "}
        <span>Next.js, React, React Native, Node.js, Express, MongoDB, MySQL & PostgreSQL</span>. 
        Expanding into DevOps with <span>Docker, Linux, Networking & CI/CD</span>.
      </Reveal>
      <div className="hero-action">
        <Reveal delay={0.35} className="hero-action-item">
          <div className="hero-connect">
            <AnchorLink href="#contact" offset="80" className="anchor-link">
              Connect With Me
            </AnchorLink>
          </div>
        </Reveal>
        <Reveal delay={0.45} className="hero-action-item">
          <div className="hero-resume">
            <a href="/cv.docx" download className="resume-link">
              My Resume
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.55} className="hero-socials">
        <a href="https://github.com/ma5311943-dotcom" target="_blank" rel="noopener noreferrer">
          <FaGithub /> <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> <span>LinkedIn</span>
        </a>
      </Reveal>
      <Reveal delay={0.65} className="hero-scroll-cue">
        <AnchorLink href="#about" offset="80" aria-label="Scroll to About section">
          <span aria-hidden="true" />
          Scroll to explore
        </AnchorLink>
      </Reveal>
    </div>
  );
};

export default Hero;
