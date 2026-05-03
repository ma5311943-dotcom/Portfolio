import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", open);
    document.body.classList.toggle("no-scroll", open);
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Me", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "portfolio" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    setMenu(id);
    setOpen(false);
    // Small delay lets the panel animate out before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  const handleNavClick = (id) => {
    if (isHome) {
      scrollToSection(id);
    } else {
      setMenu(id);
      setOpen(false);
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo" onClick={() => handleNavClick("home")}>
        ILYAS
      </div>

      {/* ── Hamburger button (mobile only) ── */}
      <button
        className={`hamburger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {/* ── Backdrop (mobile only) ── */}
      {open && (
        <div
          className="nav-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Slide-in panel / desktop nav ── */}
      <div className={`nav-menu-wrapper ${open ? "open" : ""}`}>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              {isHome ? (
                <span
                  className={menu === item.id ? "active" : ""}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </span>
              ) : (
                <a href={`/#${item.id}`} onClick={() => { setMenu(item.id); setOpen(false); }}>
                  <span className={menu === item.id ? "active" : ""}>
                    {item.name}
                  </span>
                </a>
              )}
            </li>
          ))}

          {/* Desktop Socials dropdown (Hidden on mobile via CSS) */}
          <li className="nav-social-dropdown">
            <span className="dropdown-trigger">Socials ▾</span>
            <div className="dropdown-content">
              <a href="https://github.com/ma5311943-dotcom" target="_blank" rel="noopener noreferrer">
                <FaGithub size={18} /> <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={18} /> <span>LinkedIn</span>
              </a>
            </div>
          </li>

          {/* Simple Social Links for Mobile (Hidden on desktop via CSS) */}
          <li className="mobile-socials-row">
            <a href="https://github.com/ma5311943-dotcom" target="_blank" rel="noopener noreferrer" className="simple-social-link">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/" target="_blank" rel="noopener noreferrer" className="simple-social-link">
              <FaLinkedin size={24} />
            </a>
          </li>
        </ul>

        {/* Connect button inside mobile panel */}
        {isHome ? (
          <span className="mobile-connect" onClick={() => scrollToSection("contact")}>
            Connect With Me
          </span>
        ) : (
          <a href="/#contact" className="mobile-connect" onClick={() => setOpen(false)}>
            Connect With Me
          </a>
        )}
      </div>

      {/* Desktop connect button */}
      <div className="nav-connect">
        {isHome ? (
          <span onClick={() => scrollToSection("contact")}>Connect With Me</span>
        ) : (
          <a href="/#contact">Connect With Me</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;