"use client";
import { useEffect, useRef } from "react";
import "./HeroParticles.css";

const PARTICLE_COUNT = 90;
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 0.35;

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: 1 + Math.random() * 1.5,
    color: Math.random() < 0.5 ? "rgba(218,124,37,0.7)" : "rgba(185,35,225,0.7)",
  };
}

const HeroParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let particles = [];

    const resize = () => {
      const rect = canvas.parentElement
        ? canvas.parentElement.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const heroEl = canvas.parentElement;
    if (heroEl) {
      heroEl.addEventListener("mousemove", handleMouseMove);
    }

    const ro = new ResizeObserver(resize);
    if (heroEl) ro.observe(heroEl);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * REPEL_STRENGTH;
          p.vy += (dy / dist) * force * REPEL_STRENGTH;
        }

        // dampen velocity to avoid runaway
        p.vx *= 0.98;
        p.vy *= 0.98;

        // move
        p.x += p.vx;
        p.y += p.vy;

        // toroidal wrap
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        // draw glowing dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      if (heroEl) heroEl.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles-canvas" aria-hidden="true" />;
};

export default HeroParticles;
