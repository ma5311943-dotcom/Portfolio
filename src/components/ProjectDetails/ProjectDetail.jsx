import React from 'react';
import './ProjectDetail.css';

const ProjectDetail = ({ onBack, project }) => {
    if (!project) return null;

    return (
        <div className="project-detail">
            <button className="back-btn" onClick={onBack}>
                &larr; Back to Portfolio
            </button>

            <div className="detail-header">
                <h1>{project.name}</h1>
                <h2>{project.title}</h2>
            </div>

            <div className="detail-content">
                <div className="detail-text">
                    <div className="text-section">
                        <h3>What is this Project?</h3>
                        <p>{project.desc}</p>
                    </div>

                    <div className="text-section">
                        <h3>How I Built It</h3>
                        <p>{project.how_built}</p>
                    </div>

                    <div className="text-section">
                        <h3>Technologies Used</h3>
                        <div className="tech-stack">
                            {project.tech && project.tech.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {project.url && (
                        <div className="visit-link">
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="work-btn">
                                Visit Live Site
                            </a>
                        </div>
                    )}
                </div>

                <div className="detail-video-container">
                    {project.video && (
                        <video
                            src={project.video}
                            controls
                            autoPlay
                            muted
                            loop
                            className="detail-video"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
