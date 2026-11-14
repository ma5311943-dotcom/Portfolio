"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./HeroIntro.css";

const MotionP = motion.p;

// Caption start times follow the pauses in public/intro.mp3.
const INTRO_CAPTIONS = [
  {
    start: 0,
    text: "Hi, I’m Muhammad Ilyas, a full-stack developer who loves turning ideas into useful digital experiences.",
  },
  {
    start: 7.7,
    text: "I build modern websites, mobile apps, and software—from clean, intuitive interfaces to reliable back-end systems.",
  },
  {
    start: 15.42,
    text: "I work with Next.js, React, React Native, Node.js, Express, MongoDB, MySQL, and PostgreSQL.",
  },
  {
    start: 23.9,
    text: "I also create Chrome extensions and am growing my DevOps skills with Linux, Docker, networking, and CI/CD.",
  },
  {
    start: 31.44,
    text: "I’ve spent over four years learning and building, and I’ve completed more than twenty-five projects along the way.",
  },
  {
    start: 37.88,
    text: "I believe in staying curious, working consistently, and always improving.",
  },
];

const HeroIntro = ({ onBack }) => {
  const [lineIndex, setLineIndex] = useState(-1);
  const [displayedLine, setDisplayedLine] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const audioRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const stopAudio = () => audio.pause();
    window.addEventListener("pagehide", stopAudio);
    audio.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        setVoiceStatus("Press Replay to start the introduction audio.");
      } else {
        setVoiceStatus("The introduction audio could not be played.");
      }
    });

    return () => {
      window.removeEventListener("pagehide", stopAudio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const handleBack = () => {
    audioRef.current?.pause();
    setIsSpeaking(false);
    onBack();
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    if (audioRef.current) audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setHasEnded(false);
    setLineIndex(-1);
    setDisplayedLine("");
    setIsSpeaking(false);
    setVoiceStatus("");
    audio.play().catch((error) => {
      setVoiceStatus(
        error.name === "NotAllowedError"
          ? "Press Replay to start the introduction audio."
          : "The introduction audio could not be played.",
      );
    });
  };

  const handleTimeUpdate = (event) => {
    const currentTime = event.currentTarget.currentTime;
    let activeIndex = -1;

    for (let index = INTRO_CAPTIONS.length - 1; index >= 0; index -= 1) {
      if (currentTime >= INTRO_CAPTIONS[index].start) {
        activeIndex = index;
        break;
      }
    }

    if (activeIndex === lineIndex) return;

    setLineIndex(activeIndex);
    setDisplayedLine(activeIndex < 0 ? "" : INTRO_CAPTIONS[activeIndex].text);
  };

  const handleAudioEnded = () => {
    setHasEnded(true);
    setIsSpeaking(false);
    setLineIndex(-1);
    setDisplayedLine("");
  };

  const handleAudioError = () => {
    setIsSpeaking(false);
    setVoiceStatus("The introduction audio could not be loaded.");
  };

  const handleProjectsClick = () => {
    audioRef.current?.pause();
    setIsSpeaking(false);
    document.getElementById("portfolio")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section className="hero-intro" aria-labelledby="intro-heading">
      <audio
        ref={audioRef}
        className="intro-audio"
        src="/intro.mp3"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {
          setHasEnded(false);
          setIsSpeaking(true);
          setVoiceStatus("");
        }}
        onPause={() => setIsSpeaking(false)}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        aria-label="Muhammad Ilyas introduction audio"
      />
      <div className="intro-copy">
        <button
          type="button"
          className="intro-back"
          onClick={handleBack}
          aria-label="Back to the main hero"
        >
          <span aria-hidden="true">←</span> Back
        </button>

        <p className="intro-eyebrow">A QUICK INTRODUCTION</p>
        <h2 id="intro-heading" className="intro-heading">
          Meet <span>Muhammad Ilyas</span>
        </h2>

        <div className="intro-current-line" aria-live="polite" aria-atomic="true">
          {displayedLine ? (
            <MotionP
              key={lineIndex}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            >
              {displayedLine}
            </MotionP>
          ) : (
            <p className="intro-waiting">Getting the introduction ready...</p>
          )}
        </div>

        {hasEnded && (
          <button
            type="button"
            className="intro-projects-button"
            onClick={handleProjectsClick}
            aria-label="Stop the introduction and scroll to projects"
          >
            Explore Projects <ArrowDown className="intro-projects-icon" aria-hidden="true" />
          </button>
        )}

        <div className="intro-controls" aria-label="Introduction controls">
          <button
            type="button"
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute voice narration" : "Mute voice narration"}
            aria-pressed={isMuted}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button
            type="button"
            onClick={handleReplay}
            aria-label="Replay the introduction from the beginning"
          >
            Replay
          </button>
        </div>
        <p className="intro-voice-status" aria-live="polite">{voiceStatus}</p>
      </div>

      <div className="intro-avatar-stage" aria-label="Animated speaking avatar">
        {displayedLine && (
          <div className="intro-speech-bubble" aria-hidden="true">
            {displayedLine}
          </div>
        )}
        <div className={`intro-avatar-art${isSpeaking ? " intro-avatar-art--speaking" : ""}`}>
          <div className="intro-photo-container">
            <img
              src="/profile.png"
              alt="Muhammad Ilyas talking avatar"
              className="intro-photo-image"
            />
            {/* Visualizer audio waves overlay around the photo */}
            <div className="intro-audio-ripples" aria-hidden="true">
              <span className="ripple ripple-1"></span>
              <span className="ripple ripple-2"></span>
              <span className="ripple ripple-3"></span>
            </div>
            {/* Audio frequency wave bars at bottom of portrait */}
            <div className="intro-voice-bars" aria-hidden="true">
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
              <span className="bar bar-4"></span>
              <span className="bar bar-5"></span>
              <span className="bar bar-6"></span>
              <span className="bar bar-7"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
