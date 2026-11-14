"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./HeroPortrait3D.css";

const HeroPortrait3D = ({ src, alt }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="hero-3d-wrapper">
      {/* Background ambient multi-color glow */}
      <div className="hero-3d-glow" aria-hidden="true" />

      {/* Floating 3D card */}
      <motion.div
        ref={cardRef}
        className="hero-3d-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.25 }}
      >
        {/* Holographic animated gradient border */}
        <div className="hero-3d-border" aria-hidden="true" />

        {/* Inner container */}
        <div className="hero-3d-inner">
          <img src={src} alt={alt} className="hero-3d-img" />

          {/* Dynamic 3D specular light glare */}
          <motion.div
            className="hero-3d-glare"
            style={{
              opacity: isHovered ? 0.45 : 0,
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)`,
              left: glareX,
              top: glareY,
            }}
            aria-hidden="true"
          />

          {/* Subtle bottom shadow vignette */}
          <div className="hero-3d-vignette" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroPortrait3D;

