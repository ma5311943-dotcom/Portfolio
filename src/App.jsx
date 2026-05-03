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
import projectsData from './assets/data.json'
import ProjectDetail from "./components/ProjectDetails/ProjectDetail";

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

  const project = projectsData.find(p => p.id === id);

  if (!project) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><h2>Project not found</h2></div>;

  const props = { project, onBack: () => navigate('/') };

  return <ProjectDetail {...props} />;
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
