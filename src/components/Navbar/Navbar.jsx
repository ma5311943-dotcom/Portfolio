import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from "../../assets/menu_open.svg";
import menu_close from "../../assets/menu_close.svg";
import "./Navbar.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
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

  const handleMenuClick = (id) => {
    setMenu(id);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">ILYAS</div>

      {/* Hamburger icon */}
      <img
        src={open ? menu_close : menu_open}
        alt="toggle-menu"
        className={open ? "nav-mob-close" : "nav-mob-open"}
        onClick={() => setOpen(!open)}
      />

      {/* Blurred backdrop */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2500,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div className={`nav-menu-wrapper ${open ? "open" : ""}`}>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              {isHome ? (
                <AnchorLink href={`#${item.id}`} offset="80">
                  <span
                    className={menu === item.id ? "active" : ""}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.name}
                  </span>
                </AnchorLink>
              ) : (
                <a href={`/#${item.id}`}>
                  <span
                    className={menu === item.id ? "active" : ""}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.name}
                  </span>
                </a>
              )}
            </li>
          ))}

          <li className="nav-social-dropdown">
            <span className="dropdown-trigger">Socials ▾</span>
            <div className="dropdown-content">
              <a
                href="https://github.com/ma5311943-dotcom"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={18} /> <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-ilyas-69a5913a1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={18} /> <span>LinkedIn</span>
              </a>
            </div>
          </li>
        </ul>
        {/* Connect With Me inside mobile panel */}
        {isHome ? (
          <AnchorLink
            href="#contact"
            offset="80"
            className="mobile-connect"
            onClick={() => setOpen(false)}
          >
            Connect With Me
          </AnchorLink>
        ) : (
          <a
            href="/#contact"
            className="mobile-connect"
            onClick={() => setOpen(false)}
          >
            Connect With Me
          </a>
        )}
      </div>

      {/* Desktop connect button */}
      <div className="nav-connect">
        {isHome ? (
          <AnchorLink href="#contact" offset="80">
            Connect With Me
          </AnchorLink>
        ) : (
          <a href="/#contact">
            Connect With Me
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;