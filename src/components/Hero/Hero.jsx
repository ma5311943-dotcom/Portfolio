"use client";
import "./Hero.css";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";
import Magnetic from "../Magnetic/Magnetic";

const MotionDiv = motion.div;
const roles = [
  "Full-Stack Web Developer",
  "Full-Stack App Developer",
  "Full-Stack Software Developer",
  "Chrome Extension Developer",
  "DevOps Engineer",
];

const Hero = () => {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  useEffect(() => {
    let timeoutId;

    if (shouldReduceMotion) {
      timeoutId = window.setTimeout(() => {
        const nextIndex = (roleIndex + 1) % roles.length;
        setRoleIndex(nextIndex);
        setRoleText(roles[nextIndex]);
        setIsDeleting(false);
      }, 2800);
    } else if (!isDeleting && roleText === roles[roleIndex]) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting) {
      if (roleText.length > 0) {
        timeoutId = window.setTimeout(
          () => setRoleText(roleText.slice(0, -1)),
          35,
        );
      } else {
        setRoleIndex((currentIndex) => (currentIndex + 1) % roles.length);
        setIsDeleting(false);
      }
    } else {
      timeoutId = window.setTimeout(
        () => setRoleText(roles[roleIndex].slice(0, roleText.length + 1)),
        55,
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, roleIndex, roleText, shouldReduceMotion]);

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
        transition={{ duration: shouldReduceMotion ? 0 : 1.45, delay: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/profile.png" alt="Muhammad Ilyas" />
      </MotionDiv>
      <Reveal as="h1" delay={0.15}>
        <LetterReveal as="span" text="I am " />
        <LetterReveal as="span" text="Muhammad Ilyas" className="highlight-name" />
      </Reveal>

      <h2 className="hero-role" aria-label={`I'm a ${roles[roleIndex]}`}>
        <span className="hero-role-prefix" aria-hidden="true">I'm a</span>
        <span className="hero-role-text" aria-hidden="true">
          {roleText}
        </span>
      </h2>

      <Reveal as="p" delay={0.25}>
        A passionate developer from Pakistan specializing in scalable full-stack applications with{" "}
        <span>Next.js, React, React Native, Node.js, Express, MongoDB, MySQL & PostgreSQL</span>. 
        Expanding into DevOps with <span>Docker, Linux, Networking & CI/CD</span>.
      </Reveal>
      <div className="hero-action">
        <Reveal delay={0.35} className="hero-action-item">
          <Magnetic>
            <div className="hero-connect">
              <AnchorLink href="#contact" offset="80" className="anchor-link" data-cursor-label="HELLO">
                Connect With Me
              </AnchorLink>
            </div>
          </Magnetic>
        </Reveal>
        <Reveal delay={0.45} className="hero-action-item">
          <Magnetic>
            <div className="hero-resume">
              <a href="/cv.docx" download className="resume-link" data-cursor-label="DOWNLOAD">
                My Resume
              </a>
            </div>
          </Magnetic>
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
