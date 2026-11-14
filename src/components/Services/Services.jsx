// ===== Imports =====
"use client";
import React from "react";

import "./Services.css";
import Services_Data from "../../lib/services_data";

import {
  Layers3,
  Monitor,
  ServerCog,
  Database,
  PlugZap,
  Sparkles,
  GaugeCircle,
  BugOff,
} from "lucide-react";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";
// ===== Icon Mapper =====
const serviceIcons = {
  "MERN Stack Development": { icon: Layers3, color: "#61dafb" },
  "Frontend Development": { icon: Monitor, color: "#38bdf8" },
  "Backend Development": { icon: ServerCog, color: "#68a063" },
  "Database Management": { icon: Database, color: "#47a248" },
  "API Integration": { icon: PlugZap, color: "#f7df1e" },
  "Single Page Apps (SPA)": { icon: Sparkles, color: "#ff0080" },
  "App Performance & Opt": { icon: GaugeCircle, color: "#00df9a" },
  "Bug Fixing & Support": { icon: BugOff, color: "#ff4d4d" },
};

// ===== Services Component =====
const Services = () => {
  const getSearchLink = (name) => {
    return `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  };

  return (
    <div id="services" className="services">
      <Reveal className="services-title" from="down">
        <LetterReveal as="h1" text="My Services" />
        <img src="/theme_pattern.svg" alt="" />
      </Reveal>

      <div className="services-container">
        {Services_Data.map((service, i) => {
          const serviceData = serviceIcons[service.s_name] || { icon: Sparkles, color: "#b923e1" };
          const Icon = serviceData.icon;

          return (
            <Reveal
              key={i}
              className="service-reveal"
              delay={i * 0.07}
              amount={0.15}
            >
              <div className="service-format">
                <div className="service-top">
                  <span>{service.s_no}</span>
                  {Icon && <Icon size={40} className="service-icon" style={{ color: serviceData.color, background: `${serviceData.color}15` }} />}
                </div>

                <LetterReveal as="h2" text={service.s_name} stagger={0.05} duration={0.5} />
                <p>{service.s_desc}</p>

                <a
                  href={getSearchLink(service.s_name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services-readmore"
                  data-cursor-label="MORE"
                >
                  <p>Read More</p>
                  <img src="/arrow_icon.svg" alt="" />
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
