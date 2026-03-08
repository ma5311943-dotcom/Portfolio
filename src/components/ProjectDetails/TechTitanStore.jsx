import React from 'react';
import './ProjectDetail.css';

const TechTitanStore = ({ onBack, project }) => {
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
                            TechTitan is a premium e-commerce hub specifically for high-end tech gadgets.
                            The focus is on detailed product specifications, comparison tools, and a
                            luxurious shopping experience.
                        </p>
                    </div>

                    <div className="text-section">
                        <h3>How I Built It</h3>
                        <p>
                            I used Redis for high-performance caching of product search results.
                            The application uses Mongoose for elegant modeling of complex tech specifications.
                            Payments are handled via the PayPal API for global trust and reliability.
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
                        <img src={project.w_img} alt="TechTitan Store" className="detail-video" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechTitanStore;
