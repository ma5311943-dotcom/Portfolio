"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./Navbar.css";
import CustomCursor from "../CustomCursor/CustomCursor";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

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

  // Sync active menu item with current route
  useEffect(() => {
    if (pathname === "/") setMenu("home");
    else if (pathname === "/about") setMenu("about");
    else if (pathname === "/services") setMenu("services");
    else if (pathname === "/projects") setMenu("portfolio");
    else if (pathname === "/contact") setMenu("contact");
    else if (pathname.startsWith("/project/")) setMenu("portfolio");
  }, [pathname]);

  const navItems = [
    { name: "Home",     id: "home",      href: "/",         section: "home" },
    { name: "About Me", id: "about",     href: "/about",    section: "about" },
    { name: "Services", id: "services",  href: "/services", section: "services" },
    { name: "Projects", id: "portfolio", href: "/projects", section: "portfolio" },
    { name: "Contact",  id: "contact",   href: "/contact",  section: "contact" },
  ];

  const scrollToSection = (sectionId) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const navHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  const handleNavClick = (item) => {
    setMenu(item.id);
    setOpen(false);
    if (isHome) {
      scrollToSection(item.section);
    } else {
      router.push(item.href);
    }
  };

  const handleLogoClick = () => {
    setMenu("home");
    setOpen(false);
    if (isHome) {
      scrollToSection("home");
    } else {
      router.push("/");
    }
  };

  return (
    <>
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo" onClick={handleLogoClick} data-cursor-label="HOME">
        ILYAS
      </div>

      {/* ── Hamburger button (mobile only) ── */}
      <button
        className={`hamburger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        data-cursor-label={open ? "CLOSE" : "MENU"}
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
              <span
                className={menu === item.id ? "active" : ""}
                onClick={() => handleNavClick(item)}
                data-cursor-label="GO"
              >
                {item.name}
              </span>
            </li>
          ))}

          {/* Desktop Socials dropdown (Hidden on mobile via CSS) */}
          <li className="nav-social-dropdown">
            <span className="dropdown-trigger" data-cursor-label="SOCIAL">Socials ▾</span>
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
        <span
          className="mobile-connect"
          data-cursor-label="HELLO"
          onClick={() => {
            setOpen(false);
            if (isHome) {
              scrollToSection("contact");
            } else {
              router.push("/contact");
            }
          }}
        >
          Connect With Me
        </span>
      </div>

      {/* Desktop connect button */}
      <div className="nav-connect">
        <span
          data-cursor-label="HELLO"
          onClick={() => {
            if (isHome) {
              scrollToSection("contact");
            } else {
              router.push("/contact");
            }
          }}
        >
          Connect With Me
        </span>
      </div>
    </div>
    <CustomCursor />
    </>
  );
};

export default Navbar;