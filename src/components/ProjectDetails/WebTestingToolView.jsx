import React from 'react';
import './ProjectDetail.css';

const WebTestingToolView = ({ onBack, project }) => {
    return (
        <div className="project-detail">
            <button className="back-btn" onClick={onBack}>
                &larr; Back to Portfolio
            </button>

            <div className="detail-header">
                <h1>{project.w_name}</h1>
                <h2>{project.w_title}</h2>
            </div>

            <div className="detail-content">
                <div className="detail-text">
                    <div className="text-section">
                        <h3>What is this Project?</h3>
                        <p>
                            This is a specialized automation tool for web developers. It allows users to input
                            a URL and run a suite of automated smoke tests and performance evaluations to
                            ensure their websites are healthy and fast.
                        </p>
                    </div>

                    <div className="text-section">
                        <h3>How I Built It</h3>
                        <p>
                            The core engine leverages Puppeteer for browser automation. Results are processed
                            in the Next.js API routes and visualized using Chart.js for easy analysis. Redux
                            Toolkit manages the complex application state during long-running tests.
                        </p>
                    </div>

                    <div className="text-section">
                        <h3>Technologies Used</h3>
                        <div className="tech-stack">
                            {project.w_tech.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>

                    <div className="visit-link">
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="work-btn">
                            Visit Live Site
                        </a>
                    </div>
                </div>

                <div className="detail-video-container">
                    {project.video ? (
                        <video src={project.video} controls className="detail-video" />
                    ) : (
                        <img src={project.w_img} alt="Web Testing Tool" className="detail-video" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebTestingToolView;
