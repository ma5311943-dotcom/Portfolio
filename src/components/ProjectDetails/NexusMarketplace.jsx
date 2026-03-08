import React from 'react';
import './ProjectDetail.css';

const NexusMarketplace = ({ onBack, project }) => {
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
                            This is a full-featured multi-vendor ecommerce marketplace. It allows different sellers
                            to list their products, manages global inventory, and provides a secure shopping
                            experience for customers.
                        </p>
                    </div>

                    <div className="text-section">
                        <h3>How I Built It</h3>
                        <p>
                            Built using Next.js for server-side rendering and SEO optimization. I integrated
                            Stripe for secure payment processing and Clerk for user authentication. The backend
                            is powered by MongoDB, ensuring fast and scalable data management.
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
                        <img src={project.w_img} alt="Nexus Marketplace" className="detail-video" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NexusMarketplace;
