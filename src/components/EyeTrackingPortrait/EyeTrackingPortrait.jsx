"use client";

import "./EyeTrackingPortrait.css";

const EyeTrackingPortrait = ({ src, alt, variant }) => {
  return (
    <div className={`eye-follow-portrait eye-follow-portrait--${variant}`}>
      <div className="eye-follow-head">
        <div className="eye-follow-idle">
          <img src={src} alt={alt} />
          <div className="eye-follow-overlay" aria-hidden="true">
            <span className="eye-follow-eye eye-follow-eye--left">
              <span className="eye-follow-iris">
                <span className="eye-follow-pupil" />
                <span className="eye-follow-glint" />
                <span className="eye-follow-glint eye-follow-glint--small" />
              </span>
              <span className="eye-follow-lid" />
            </span>
            <span className="eye-follow-eye eye-follow-eye--right">
              <span className="eye-follow-iris">
                <span className="eye-follow-pupil" />
                <span className="eye-follow-glint" />
                <span className="eye-follow-glint eye-follow-glint--small" />
              </span>
              <span className="eye-follow-lid" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeTrackingPortrait;
