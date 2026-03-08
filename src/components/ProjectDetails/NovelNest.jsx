import React from 'react';
import './ProjectDetail.css';

const NovelNest = ({ onBack, project }) => {
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
                            Novel Nest is an online bookstore and digital reading platform. It goes beyond simple
                            purchasing by offering readers a way to preview book chapters and manage a personal
                            digital library.
                        </p>
                    </div>

                    <div className="text-section">
                        <h3>How I Built It</h3>
                        <p>
                            I utilized Prisma with PostgreSQL for a strong relational database structure.
                            Inngest was used for background jobs like sending order confirmation emails and
                            syncing inventory. The UI is crafted with Tailwind CSS for a clean, literary aesthetic.
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
                        <img src={project.w_img} alt="Novel Nest" className="detail-video" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NovelNest;
