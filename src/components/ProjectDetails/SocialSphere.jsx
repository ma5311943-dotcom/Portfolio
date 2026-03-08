import React from 'react';
import './ProjectDetail.css';

const SocialSphere = ({ onBack, project }) => {
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
                            SocialSphere is a modern social networking application designed for high-interactivity.
                            Users can post updates, follow friends, and engage in real-time conversations.
                        </p>
                    </div>

                    <div className="text-section">
                        <h3>How I Built It</h3>
                        <p>
                            I used Firebase for real-time data syncing and Pusher for instant notifications.
                            The layout is fully responsive and features smooth micro-interactions powered
                            by Framer Motion to give it a premium, native-app feel.
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
                        <img src={project.w_img} alt="SocialSphere" className="detail-video" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialSphere;
