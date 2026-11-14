"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const MotionDiv = motion.div;

const Magnetic = ({
  children,
  className = "",
  strength = 0.18,
  yStrength = strength,
  onPointerMove,
  onPointerLeave,
  ...props
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 190, damping: 20, mass: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  const handlePointerMove = (event) => {
    onPointerMove?.(event);
    if (shouldReduceMotion || event.pointerType !== "mouse" || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * strength;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * yStrength;
    x.set(Math.max(-12, Math.min(12, offsetX)));
    y.set(Math.max(-12, Math.min(12, offsetY)));
  };

  const handlePointerLeave = (event) => {
    x.set(0);
    y.set(0);
    onPointerLeave?.(event);
  };

  return (
    <MotionDiv
      {...props}
      ref={ref}
      className={`magnetic-wrap ${className}`.trim()}
      data-magnetic
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </MotionDiv>
  );
};

export default Magnetic;
