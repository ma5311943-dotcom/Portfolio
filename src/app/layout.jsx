import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AOSInit from "../components/AOSInit/AOSInit";

export const metadata = {
  title: "Muhammad Ilyas | MERN Stack Developer",
  description:
    "Portfolio of Muhammad Ilyas — a passionate MERN Stack Developer from Pakistan specializing in Next.js, React.js, Node.js, Express.js, and MongoDB.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <AOSInit />
        <div className="app-container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;