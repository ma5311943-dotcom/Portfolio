import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import MyWork from "../components/MyWork/MyWork";
import Contact from "../components/Contact/Contact";

export const metadata = {
  title: "Muhammad Ilyas | MERN Stack Developer",
  description:
    "Portfolio of Muhammad Ilyas — a passionate MERN Stack Developer from Pakistan specializing in Next.js, React.js, Node.js, Express.js, and MongoDB.",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <MyWork />
      <Contact />
    </>
  );
};

export default Home;