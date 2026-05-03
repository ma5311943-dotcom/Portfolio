// ===== Imports =====
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyWork.css";
import projectsData from "../../assets/data.json";
import theme_pattern from "../../assets/theme_pattern.svg";

const MyWork = () => {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate(`/project/${project.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="portfolio" className="mywork">
      <div className="mywork-title" data-aos="fade-down">
        <h1>My Projects</h1>
        <img src={theme_pattern} alt="pattern" />
      </div>

      <div className="section-container">
        <h2 className="section-subtitle" data-aos="fade-right">Fullstack Next.js Projects</h2>
        <div className="mywork-container">
          {projectsData.map((work, i) => (
            <div
              key={i}
              className="mywork-item"
              data-aos="zoom-in"
              onClick={() => handleProjectClick(work)}
              style={{ cursor: "pointer" }}
            >
              <div className="mywork-card">
                <img src={work.img} alt={`project-${work.id}`} />
                <div className="mywork-overlay">
                  <span>View Details &rarr;</span>
                </div>
              </div>
              <h3 className="mywork-item-title">{work.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWork;
