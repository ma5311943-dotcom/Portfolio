"use client";
import "./Hero.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import LetterReveal from "../LetterReveal/LetterReveal";
import ScrambleText from "./ScrambleText";
import Reveal from "../Reveal/Reveal";
import Magnetic from "../Magnetic/Magnetic";
import HeroPortrait3D from "./HeroPortrait3D";
import HeroIntro from "./HeroIntro";
import HeroParticles from "./HeroParticles";
import { useAppLoader } from "../SupernovaLoader/AppLoaderWrapper";

const MotionDiv = motion.div;
const roles = [
  "Full-Stack Web Developer",
  "Full-Stack App Developer",
  "Full-Stack Software Developer",
  "Chrome Extension Developer",
  "DevOps Engineer",
];

const Hero = () => {
  const { isLoaded } = useAppLoader();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { amount: 0.25, once: false });
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isIntroOpen) return undefined;

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
  }, [isDeleting, isIntroOpen, roleIndex, roleText, shouldReduceMotion]);

  const openIntro = () => {
    setIsIntroOpen(true);
    document.getElementById("home")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div id="home" ref={heroRef} className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <HeroParticles />
      <AnimatePresence mode="wait" initial={false}>
        {isIntroOpen ? (
          <MotionDiv
            key="intro"
            className="hero-intro-shell"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.84, y: 28, rotateY: -22, filter: "blur(14px)" }
            }
            animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0, filter: "blur(0px)" }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, scale: 0.94, y: -20, rotateY: 14, filter: "blur(10px)" }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.82,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <HeroIntro onBack={() => setIsIntroOpen(false)} />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="landing"
            className="hero-landing"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, scale: 0.94, y: -24, rotateY: 10, filter: "blur(8px)" }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.52,
              ease: [0.7, 0, 0.84, 0],
            }}
          >
            <MotionDiv
              className="hero-image-reveal"
              initial={shouldReduceMotion ? false : { opacity: 0, x: "-100vw" }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : isLoaded && isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: "-100vw" }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 1.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <HeroPortrait3D src="/profile.png" alt="Muhammad Ilyas" />
            </MotionDiv>
            <div className="hero-copy">
              <Reveal as="h1" delay={0.15}>
                <LetterReveal as="span" text="I am " />
                <ScrambleText text="Muhammad Ilyas" className="highlight-name scramble-name" triggerOnMount={true} />
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
                <Reveal delay={0.55} className="hero-action-item">
                  <Magnetic>
                    <button
                      type="button"
                      className="hero-introduce"
                      onClick={openIntro}
                      aria-label="Open the animated introduction"
                    >
                      Introduce Me
                    </button>
                  </Magnetic>
                </Reveal>
              </div>
              <Reveal delay={0.65} className="hero-socials">
                <a href="https://github.com/ma5311943-dotcom" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.75} className="hero-scroll-cue">
              <AnchorLink href="#about" offset="80" aria-label="Scroll to About section">
                <span aria-hidden="true" />
                Scroll to explore
              </AnchorLink>
            </Reveal>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
