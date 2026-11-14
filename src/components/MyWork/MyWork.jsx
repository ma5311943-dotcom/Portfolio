"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MyWork.css";
import projectsData from "../../lib/data.json";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";
import Magnetic from "../Magnetic/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const featuredIds = ["ilyas-ka-gpt", "pharma-ease", "lms", "vetement"];

const MyWork = () => {
  const router = useRouter();
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const hoverLockRef = useRef(false);
  const hoverTimeoutRef = useRef(null);
  const featuredProjects = projectsData.filter((project) => featuredIds.includes(project.id));
  const otherProjects = projectsData.filter((project) => !featuredIds.includes(project.id));
  const allProjects = [...featuredProjects, ...otherProjects];

  const handleProjectClick = (project) => {
    router.push(`/project/${project.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const centerHoveredProject = (event) => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (
      !stage ||
      !track ||
      stage.classList.contains("featured-stage-pinned") ||
      hoverLockRef.current ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const cardLeft = track.offsetLeft + card.offsetLeft;
    const left = cardLeft - (stage.clientWidth - card.clientWidth) / 2;
    stage.scrollTo({ left, behavior: "smooth" });

    hoverLockRef.current = true;
    window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      hoverLockRef.current = false;
    }, 700);
  };

  const focusProject = (event, index) => {
    const stage = stageRef.current;
    if (event.type === "focus" && stage?.classList.contains("featured-stage-pinned")) {
      const scrollTrigger = scrollTriggerRef.current;
      if (scrollTrigger) {
        const progress = index / Math.max(allProjects.length - 1, 1);
        scrollTrigger.scroll(
          scrollTrigger.start + progress * (scrollTrigger.end - scrollTrigger.start),
        );
      }
      return;
    }

    centerHoveredProject(event);
  };

  const updateProjectPointer = (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--image-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * -10}px`,
    );
    event.currentTarget.style.setProperty(
      "--image-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -10}px`,
    );
  };

  const resetProjectPointer = (event) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    event.currentTarget.style.setProperty("--image-x", "0px");
    event.currentTarget.style.setProperty("--image-y", "0px");
  };

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return undefined;

    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (min-height: 520px) and (prefers-reduced-motion: no-preference)", () => {
      if (allProjects.length < 2) return undefined;

      stage.classList.add("featured-stage-pinned");
      const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const railTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "center center",
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      scrollTriggerRef.current = railTween.scrollTrigger;

      const handleProjectWheel = (event) => {
        if (event.deltaY === 0) return;

        event.preventDefault();
        const multiplier =
          event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
        window.scrollBy({ top: event.deltaY * multiplier, behavior: "instant" });
      };

      stage.addEventListener("wheel", handleProjectWheel, { passive: false });

      return () => {
        stage.removeEventListener("wheel", handleProjectWheel);
        railTween.scrollTrigger?.kill();
        scrollTriggerRef.current = null;
        gsap.set(track, { clearProps: "transform" });
        stage.classList.remove("featured-stage-pinned");
      };
    });

    return () => {
      media.revert();
      window.clearTimeout(hoverTimeoutRef.current);
    };
  }, [allProjects.length]);

  return (
    <div id="portfolio" className="mywork">
      <div className="mywork-title">
        <LetterReveal as="h1" text="My Projects" />
        <img src="/theme_pattern.svg" alt="pattern" />
      </div>

      <div className="section-container">
        <div className="project-rail-heading">
          <LetterReveal as="h2" className="section-subtitle" text="All Projects" />
          <p>Scroll to explore · Hover to focus · Follow the rail</p>
        </div>

        <div
          className="featured-stage"
          ref={stageRef}
          role="region"
          tabIndex={0}
          aria-label="All projects"
        >
          <div className="featured-track" ref={trackRef} role="list">
            {allProjects.map((work, index) => (
              <article
                key={work.id}
                className="featured-card"
                role="listitem"
                data-cursor="project"
                data-cursor-label="EXPLORE"
                onMouseEnter={centerHoveredProject}
                onFocus={(event) => focusProject(event, index)}
                onPointerMove={updateProjectPointer}
                onPointerLeave={resetProjectPointer}
              >
                <span className="featured-hanger" aria-hidden="true" />
                <div className="featured-card-media">
                  <Reveal className="featured-media-reveal" delay={0.45} duration={1.15} amount={0.15}>
                    <img src={work.img} alt={`${work.name} project preview`} />
                  </Reveal>
                  <span className="featured-count">
                    {String(index + 1).padStart(2, "0")} / {String(allProjects.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="featured-details">
                  <LetterReveal as="h3" text={work.name} stagger={0.05} duration={0.5} />
                  <p>{work.title}</p>
                  <div className="featured-tech">
                    {work.tech.slice(0, 3).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                  <Magnetic className="featured-magnetic-wrap">
                    <button
                      type="button"
                      onClick={() => handleProjectClick(work)}
                      data-cursor-label="OPEN"
                    >
                      Explore Project <span aria-hidden="true">→</span>
                    </button>
                  </Magnetic>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyWork;
