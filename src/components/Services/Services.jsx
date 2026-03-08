// ===== Imports =====
import React from "react";

import "./Services.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import Services_Data from "../../assets/services_data";
import arrow_icon from "../../assets/arrow_icon.svg";

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
      <div className="services-title">
        <h1>My Services</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="services-container">
        {Services_Data.map((service, i) => {
          const serviceData = serviceIcons[service.s_name] || { icon: Sparkles, color: "#b923e1" };
          const Icon = serviceData.icon;

          return (
            <div 
              className="service-format" 
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Top Row */}
              <div className="service-top">
                <span>{service.s_no}</span>
                {Icon && <Icon size={40} className="service-icon" style={{ color: serviceData.color, background: `${serviceData.color}15` }} />}
              </div>

              <h2>{service.s_name}</h2>
              <p>{service.s_desc}</p>

              <a
                href={getSearchLink(service.s_name)}
                target="_blank"
                rel="noopener noreferrer"
                className="services-readmore"
              >
                <p>Read More</p>
                <img src={arrow_icon} alt="" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
