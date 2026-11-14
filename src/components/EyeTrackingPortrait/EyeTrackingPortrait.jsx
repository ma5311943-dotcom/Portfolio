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

        const gazeX = Math.min(4, bounds.width * 0.015);
        const gazeY = Math.min(2.4, bounds.width * 0.009);

        portrait.style.setProperty("--head-tilt-x", `${directionY * -3.5}deg`);
        portrait.style.setProperty("--head-tilt-y", `${directionX * 5}deg`);
        portrait.style.setProperty("--head-rotation", `${directionX * 2.4}deg`);
        portrait.style.setProperty(
          "--gaze-x",
          `${directionX * gazeX}px`,
        );
        portrait.style.setProperty(
          "--gaze-y",
          `${directionY * gazeY}px`,
        );
      });
    };

    const resetMotion = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      const portrait = portraitRef.current;
      if (!portrait) return;

      [
        "--head-tilt-x",
        "--head-tilt-y",
        "--head-rotation",
        "--gaze-x",
        "--gaze-y",
      ].forEach((property) => portrait.style.removeProperty(property));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetMotion);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", resetMotion);
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
        <div className="eye-follow-idle">
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
    </div>
  );
};

export default EyeTrackingPortrait;
