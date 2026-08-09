"use client";
import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  // Custom hook for counting animation
  const useCounter = (target, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target, 10);
      if (start === end) return;

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 15);

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
        <img src="/theme_pattern.svg" alt="pattern" />
      </div>
      <div className="about-sections">
        <div className="about-left" data-aos="fade-right">
          <img src="/profile.png" alt="Profile" />
        </div>
        <div className="about-right" data-aos="fade-left">
          <div className="about-para">
            <p>
              I am a dedicated Full Stack Web & Mobile App Developer with expertise in building scalable, production-ready applications. My core stack includes Next.js, React.js, React Native, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, and Firebase.
            </p>
            <p>
              Constantly expanding my horizons, I am actively diving deep into DevOps — mastering Linux system administration, Git & GitHub workflows, computer networking fundamentals, and Docker containerization to build automated, reliable software pipelines.
            </p>
          </div>
          <div className="about-skills">
            <SkillBar name="HTML & CSS & JavaScript" percent={90} color="linear-gradient(to right, #e34c26, #f7df1e)" index={0} />
            <SkillBar name="React.js" percent={93} color="linear-gradient(to right, #38bdf8, #0ea5e9)" index={1} />
            <SkillBar name="Node.js" percent={94} color="linear-gradient(to right, #68a063, #3c873a)" index={2} />
            <SkillBar name="Express.js" percent={95} color="linear-gradient(to right, #0070f3, #00dfd8)" index={3} />
            <SkillBar name="MongoDB" percent={96} color="linear-gradient(to right, #47a248, #3f8f41)" index={4} />
            <SkillBar name="Next.js" percent={92} color="linear-gradient(to right, #61dafb, #00b4e5)" index={5} />
            <SkillBar name="React Native Expo" percent={88} color="linear-gradient(to right, #61dafb, #38bdf8)" index={1} />
            <SkillBar name="Next.js with MySQL" percent={88} color="linear-gradient(to right, #f29111, #00758f)" index={6} />
            <SkillBar name="Next.js with PostgreSQL" percent={86} color="linear-gradient(to right, #336791, #6db3e5)" index={7} />
            <SkillBar name="Linux" percent={84} color="linear-gradient(to right, #f8b000, #dd4814)" index={8} />
            <SkillBar name="Git & GitHub" percent={92} color="linear-gradient(to right, #f05032, #24292e)" index={11} />
            <SkillBar name="Networking" percent={82} color="linear-gradient(to right, #a855f7, #ec4899)" index={9} />
            <SkillBar name="Docker" percent={80} color="linear-gradient(to right, #2496ed, #0db7ed)" index={10} />
            
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
          <h1>25+</h1>
          <p>NEXT JS , MERN STACK , REACT NATIVE PROJECTS</p>
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