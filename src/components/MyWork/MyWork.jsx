// ===== Imports =====
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyWork.css";
import { frontend_projects, fullstack_projects } from "../../assets/mywork_data";
import theme_pattern from "../../assets/theme_pattern.svg";

const MyWork = () => {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    const routeId = project.w_name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/project/${routeId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="portfolio" className="mywork">
      <div className="mywork-title" data-aos="fade-down">
        <h1>My Projects</h1>
        <img src={theme_pattern} alt="pattern" />
      </div>

      <div className="section-container">
        <h2 className="section-subtitle" data-aos="fade-right">Frontend Projects</h2>
        <div className="mywork-container">
          {frontend_projects.map((work, i) => (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="mywork-card-link"
            >
              <div
                className="mywork-card"
                data-aos="zoom-in"
              >
                <img src={work.w_img} alt={`project-${work.w_no}`} />
                <div className="mywork-overlay">
                  <h3>{work.w_name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="section-container fullstack-section">
        <h2 className="section-subtitle" data-aos="fade-right">Fullstack Next.js Projects</h2>
        <div className="mywork-container">
          {fullstack_projects.map((work, i) => (
            <div
              key={i}
              className="mywork-card"
              data-aos="zoom-in"
              onClick={() => handleProjectClick(work)}
              style={{ cursor: "pointer" }}
            >
              <img src={work.w_img} alt={`project-${work.w_no}`} />
              <div className="mywork-overlay">
                <h3>{work.w_name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWork;
