// ===== Imports =====
"use client";
import React from "react";

import "./Footer.css";
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";




// ===== Footer Component =====
const Footer = () => {

    // scrollToSection
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        el && el.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <footer className="footer">

            <Reveal className="footer-container">

                <div className="footer-brand">
                    <div
                        className="nav-logo"
                        onClick={() => scrollToSection("home")}
                    >
                        ILYAS
                    </div>

                    <p>
                        Full Stack Web & Mobile App Developer building clean, modern, and scalable applications.
                    </p>
                </div>


                <div className="footer-links">
                    <LetterReveal as="h4" text="Navigation" />

                    <ul>
                        <li onClick={() => scrollToSection("home")}>Home</li>
                        <li onClick={() => scrollToSection("about")}>About</li>
                        <li onClick={() => scrollToSection("services")}>Services</li>
                        <li onClick={() => scrollToSection("portfolio")}>Projects</li>
                        <li onClick={() => scrollToSection("contact")}>Contact</li>
                    </ul>
                </div>


                <div className="footer-socials">
                    <LetterReveal as="h4" text="Social" />

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

            </Reveal>


            <div className="footer-bottom">
                © 2025 Muhammad Ilyas. All rights reserved.
            </div>

        </footer>
    );
};




export default Footer;
