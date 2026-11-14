"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MyWork.css";
import projectsData from "../../lib/data.json";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";

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

  const focusFeaturedProject = (event, index) => {
    const stage = stageRef.current;
    if (event.type === "focus" && stage?.classList.contains("featured-stage-pinned")) {
      const scrollTrigger = scrollTriggerRef.current;
      if (scrollTrigger) {
        const progress = index / Math.max(featuredProjects.length - 1, 1);
        scrollTrigger.scroll(
          scrollTrigger.start + progress * (scrollTrigger.end - scrollTrigger.start),
        );
      }
      return;
    }

    centerHoveredProject(event);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return undefined;

    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
      if (featuredProjects.length < 2) return undefined;

      stage.classList.add("featured-stage-pinned");
      const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const railTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top+=100",
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      scrollTriggerRef.current = railTween.scrollTrigger;

      return () => {
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
  }, [featuredProjects.length]);

  return (
    <div id="portfolio" className="mywork">
      <div className="mywork-title">
        <LetterReveal as="h1" text="My Projects" />
        <img src="/theme_pattern.svg" alt="pattern" />
      </div>

      <div className="section-container">
        <div className="project-rail-heading">
          <LetterReveal as="h2" className="section-subtitle" text="Featured Projects" />
          <p>Scroll to explore · Hover to focus · Follow the rail</p>
        </div>

        <div
          className="featured-stage"
          ref={stageRef}
          role="region"
          tabIndex={0}
          aria-label="Featured project collection"
        >
          <div className="featured-track" ref={trackRef} role="list">
            {featuredProjects.map((work, index) => (
              <article
                key={work.id}
                className="featured-card"
                role="listitem"
                onMouseEnter={centerHoveredProject}
                onFocus={(event) => focusFeaturedProject(event, index)}
              >
                <span className="featured-hanger" aria-hidden="true" />
                <div className="featured-card-media">
                  <img src={work.img} alt={`${work.name} project preview`} />
                  <span className="featured-count">
                    {String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="featured-details">
                  <LetterReveal as="h3" text={work.name} stagger={0.025} />
                  <p>{work.title}</p>
                  <div className="featured-tech">
                    {work.tech.slice(0, 3).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                  <button type="button" onClick={() => handleProjectClick(work)}>
                    Explore Project <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <LetterReveal as="h2" className="section-subtitle more-projects-title" text="More Projects" />
        <div className="mywork-container">
          {otherProjects.map((work, index) => (
            <Reveal
              key={work.id}
              className="mywork-item-reveal"
              delay={(index % 3) * 0.07}
              amount={0.15}
            >
              <button
                type="button"
                className="mywork-item"
                onClick={() => handleProjectClick(work)}
              >
                <div className="mywork-card">
                  <img src={work.img} alt={`${work.name} project preview`} />
                  <div className="mywork-overlay">
                    <span>View Details &rarr;</span>
                  </div>
                </div>
                <LetterReveal as="h3" className="mywork-item-title" text={work.name} stagger={0.018} duration={0.2} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWork;
