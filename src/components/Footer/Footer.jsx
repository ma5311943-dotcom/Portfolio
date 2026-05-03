// ===== Imports =====
import React from "react";
import "./Footer.css";




// ===== Footer Component =====
const Footer = () => {

    // scrollToSection
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        el && el.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <footer className="footer">

            <div className="footer-container" data-aos="fade-up">

                <div className="footer-brand">
                    <div
                        className="nav-logo"
                        onClick={() => scrollToSection("home")}
                    >
                        ILYAS
                    </div>

                    <p>
                        MERN Stack Developer building clean, modern and scalable web applications.
                    </p>
                </div>


                <div className="footer-links">
                    <h4>Navigation</h4>

                    <ul>
                        <li onClick={() => scrollToSection("home")}>Home</li>
                        <li onClick={() => scrollToSection("about")}>About</li>
                        <li onClick={() => scrollToSection("services")}>Services</li>
                        <li onClick={() => scrollToSection("portfolio")}>Projects</li>
                        <li onClick={() => scrollToSection("contact")}>Contact</li>
                    </ul>
                </div>


                <div className="footer-socials">
                    <h4>Social</h4>

                    <ul>
                        <li>
                            <a
                                href="https://github.com/ma5311943-dotcom"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>

            </div>


            <div className="footer-bottom">
                © 2025 Muhammad Ilyas. All rights reserved.
            </div>

        </footer>
    );
};




export default Footer;
