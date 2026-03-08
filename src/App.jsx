import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar"
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import MyWork from './components/MyWork/MyWork'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import AOS from 'aos'
import { fullstack_projects } from './assets/mywork_data'

import NexusMarketplace from "./components/ProjectDetails/NexusMarketplace";
import NovelNest from "./components/ProjectDetails/NovelNest";
import WebTestingToolView from "./components/ProjectDetails/WebTestingToolView";
import SocialSphere from "./components/ProjectDetails/SocialSphere";
import TechTitanStore from "./components/ProjectDetails/TechTitanStore";

const Home = () => (
  <>
    <Hero />
    <About />
    <Services />
    <MyWork />
    <Contact />
  </>
);

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = fullstack_projects.find(p => p.w_name.toLowerCase().replace(/\s+/g, '-') === id);

  if (!project) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><h2>Project not found</h2></div>;

  const props = {
    project,
    onBack: () => navigate('/')
  };

  switch (project.w_name) {
    case "Nexus Marketplace": return <NexusMarketplace {...props} />;
    case "Novel Nest": return <NovelNest {...props} />;
    case "Web Testing Tool": return <WebTestingToolView {...props} />;
    case "SocialSphere": return <SocialSphere {...props} />;
    case "TechTitan Store": return <TechTitanStore {...props} />;
    default: return null;
  }
};

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App
