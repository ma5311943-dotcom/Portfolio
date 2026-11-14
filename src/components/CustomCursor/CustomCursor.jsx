"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MotionDiv = motion.div;

const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const followerX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.45 });
  const followerY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.45 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointerPosition = { x: -100, y: -100 };

    const updateCursorTarget = (target) => {
      if (target?.closest("input, textarea, [contenteditable='true']")) {
        setActive(false);
        setLabel("");
        return;
      }

      const interactive = target?.closest("a, button, [data-cursor], [data-cursor-label]");
      setActive(Boolean(interactive));
      setLabel(
        interactive?.getAttribute("data-cursor-label") ||
          (interactive?.tagName === "BUTTON" ? "CLICK" : interactive ? "OPEN" : ""),
      );
    };

    const updateCursorMode = () => {
      const enabled = pointerQuery.matches && !motionQuery.matches;
      document.body.classList.toggle("custom-cursor-enabled", enabled);
      setVisible(false);
      if (!enabled) {
        setActive(false);
        setLabel("");
      }
    };

    const handlePointerMove = (event) => {
      if (!pointerQuery.matches || motionQuery.matches) return;
      pointerPosition = { x: event.clientX, y: event.clientY };
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      setVisible(!target?.closest("input, textarea, [contenteditable='true']"));
      updateCursorTarget(target);
    };

    const handlePointerOver = (event) => {
      if (!pointerQuery.matches || motionQuery.matches) return;
      const target = event.target instanceof Element ? event.target : null;
      updateCursorTarget(target);
    };

    const handleScroll = () => {
      if (!pointerQuery.matches || motionQuery.matches) return;
      const target = document.elementFromPoint(pointerPosition.x, pointerPosition.y);
      updateCursorTarget(target);
    };

    const hideCursor = () => {
      setVisible(false);
      setActive(false);
      setLabel("");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("blur", hideCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);
    pointerQuery.addEventListener("change", updateCursorMode);
    motionQuery.addEventListener("change", updateCursorMode);
    updateCursorMode();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("blur", hideCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
      pointerQuery.removeEventListener("change", updateCursorMode);
      motionQuery.removeEventListener("change", updateCursorMode);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [x, y]);

  return (
    <>
      <MotionDiv
        className={`cursor-follower${active ? " is-active" : ""}`}
        aria-hidden="true"
        style={{ x: followerX, y: followerY }}
        animate={{
          width: active ? 72 : 34,
          height: active ? 72 : 34,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <span>{label}</span>
      </MotionDiv>
      <MotionDiv
        className="cursor-dot"
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0.65 : 1 }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
};

export default CustomCursor;
