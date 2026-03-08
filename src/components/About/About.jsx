import React, { useEffect, useState } from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import profile from "../../assets/profile.png";

const About = () => {
  // Custom hook for counting animation
  const useCounter = (target, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target, 10);
      if (start === end) return;

      let totalMilSec = duration;
      let incrementTime = (totalMilSec / end) * 1000;

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 15); // Update frequency

      return () => clearInterval(timer);
    }, [target, duration]);

    return count;
  };

  // Component for individual skill to handle its own animation
  const SkillBar = ({ name, percent, color, index }) => {
    const count = useCounter(percent);

    return (
      <div
        className="about-skill"
        data-aos="fade-right"
        data-aos-delay={index * 100}
      >
        <p>
          {name} <span>{count}%</span>
        </p>
        <div className="skill-bar">
          <div
            className="skill-fill"
            style={{
              "--skill-width": `${percent}%`,
              background: color || "linear-gradient(277deg, #da7c25 0.35%, #b923e1)"
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div id="about" className="about">
      <div className="about-title" data-aos="fade-down">
        <h1>About me</h1>
        <img src={theme_pattern} alt="pattern" />
      </div>
      <div className="about-sections">
        <div className="about-left" data-aos="fade-right">
          <img src={profile} alt="Profile" />
        </div>
        <div className="about-right" data-aos="fade-left">
          <div className="about-para">
            <p>
              I am an experienced Frontend Developer with over a decade of
              professional expertise in the field. Throughout my career, I have
              access to diverse and prestigious organizations, contributing to
              their success and growth.
            </p>
            <p>
              My passion for frontend development is also reflected in my
              dedication to my enthusiasm, as I consistently engage in learning
              new technologies and techniques to enhance my skills.
            </p>
          </div>
          <div className="about-skills">
            <SkillBar name="HTML & CSS" percent={98} color="linear-gradient(to right, #e34c26, #f06529)" index={0} />
            <SkillBar name="Tailwind CSS" percent={95} color="linear-gradient(to right, #7952b3, #563d7c)" index={1} />
            <SkillBar name="Bootstrap" percent={85} color="linear-gradient(to right, #47a248, #3f8f41)" index={2} />
            <SkillBar name="JavaScript" percent={92} color="linear-gradient(to right, #f472b6, #db2777)" index={3} />
            <SkillBar name="shadcn/ui" percent={88} color="linear-gradient(to right, #f7df1e, #d6ba00)" index={4} />
            <SkillBar name="React.js" percent={94} color="linear-gradient(to right, #38bdf8, #0ea5e9)" index={5} />
            <SkillBar name="Node.js" percent={88} color="linear-gradient(to right, #0070f3, #00dfd8)" index={6} />
            <SkillBar name="Express.js" percent={86} color="linear-gradient(to right, #68a063, #3c873a)" index={7} />
            <SkillBar name="MongoDB" percent={90} color="linear-gradient(to right, #daa520, #ffd700)" index={8} />
            <SkillBar name="Next.js" percent={90} color="linear-gradient(to right, #61dafb, #00b4e5)" index={9} />
          </div>
        </div>
      </div>
      <div className="about-achievements" data-aos="fade-up">
        <div className="about-achievement">
          <h1>3+</h1>
          <p>Years Learning Experience</p>
        </div>

        <hr />

        <div className="about-achievement">
          <h1>15+</h1>
          <p>MERN & Fullstack Projects</p>
        </div>

        <hr />

        <div className="about-achievement">
          <h1>100%</h1>
          <p>Learning Focus</p>
        </div>
      </div>

    </div>
  );
};

export default About;
