import "./Hero.css";
import profile from "../../assets/profile.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import cv from "../../assets/cv.pdf";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = () => {
  return (
    <div id="home" className="hero">
      <img
        src={profile}
        alt="Muhammad Ilyas"
        data-aos="zoom-in"
        data-aos-duration="1500"
      />
      <h1 data-aos="fade-up" data-aos-delay="200">
        I am <span className="highlight-name">Muhammad Ilyas</span> <br />
        MERN Stack Developer
      </h1>

      <p data-aos="fade-up" data-aos-delay="400">
        A passionate developer from Pakistan, specializing in building robust
        and scalable web applications using{" "}
        <span>Next.js, React.js, Node.js, Express.js, and MongoDB</span>.
      </p>
      <div className="hero-action">
        <div className="hero-connect" data-aos="fade-up" data-aos-delay="600">
          <AnchorLink
            href="#contact"
            offset="80"
            className="anchor-link"
          >
            Connect With Me
          </AnchorLink>
        </div>
        <div className="hero-resume" data-aos="fade-up" data-aos-delay="700">
          <a
            href={cv}
            download
            className="resume-link"
          >
            My Resume
          </a>
        </div>
      </div>
      <div className="hero-socials" data-aos="fade-up" data-aos-delay="800">
        <a href="https://github.com/ma5311943-dotcom" target="_blank" rel="noopener noreferrer">
          <FaGithub /> <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default Hero;
