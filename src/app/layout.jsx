import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AppLoaderWrapper from "../components/SupernovaLoader/AppLoaderWrapper";

export const metadata = {
  title: "Muhammad Ilyas | MERN Stack Developer",
  description:
    "Portfolio of Muhammad Ilyas — a passionate MERN Stack Developer from Pakistan specializing in Next.js, React.js, Node.js, Express.js, and MongoDB.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <AppLoaderWrapper>
          <div className="app-container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AppLoaderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;