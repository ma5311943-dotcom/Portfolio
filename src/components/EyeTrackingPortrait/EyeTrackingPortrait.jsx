"use client";

import { useEffect, useRef } from "react";
import "./EyeTrackingPortrait.css";

const EyeTrackingPortrait = ({ src, alt, variant }) => {
  const portraitRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const portrait = portraitRef.current;
        if (!portrait) return;

        const bounds = portrait.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;

        const directionX = Math.max(
          -1,
          Math.min(1, (pointerRef.current.x - (bounds.left + bounds.width / 2)) / (bounds.width / 2)),
        );
        const eyeLine = variant === "hero" ? 0.418 : 0.312;
        const directionY = Math.max(
          -1,
          Math.min(
            1,
            (pointerRef.current.y - (bounds.top + bounds.height * eyeLine)) /
              (bounds.height / 2),
          ),
        );

        portrait.style.setProperty(
          "--head-x",
          `${directionX * Math.min(1.8, bounds.width * 0.006)}px`,
        );
        portrait.style.setProperty(
          "--head-y",
          `${directionY * Math.min(1.1, bounds.width * 0.004)}px`,
        );
        portrait.style.setProperty("--head-rotation", `${directionX * 0.65}deg`);
        portrait.style.setProperty(
          "--gaze-x",
          `${directionX * Math.min(2.8, bounds.width * 0.01)}px`,
        );
        portrait.style.setProperty(
          "--gaze-y",
          `${directionY * Math.min(1.4, bounds.width * 0.005)}px`,
        );
      });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [variant]);

  return (
    <div
      ref={portraitRef}
      className={`eye-follow-portrait eye-follow-portrait--${variant}`}
    >
      <div className="eye-follow-head">
        <img src={src} alt={alt} />
        <div className="eye-follow-overlay" aria-hidden="true">
          <span className="eye-follow-eye eye-follow-eye--left">
            <span className="eye-follow-iris">
              <span className="eye-follow-pupil" />
              <span className="eye-follow-glint" />
            </span>
            <span className="eye-follow-lid" />
          </span>
          <span className="eye-follow-eye eye-follow-eye--right">
            <span className="eye-follow-iris">
              <span className="eye-follow-pupil" />
              <span className="eye-follow-glint" />
            </span>
            <span className="eye-follow-lid" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EyeTrackingPortrait;
