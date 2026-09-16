import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Navbar.css";

export default function Navbar({ onOpenProject }) {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef(null);
  const navLinksRef = useRef(null);
  const pillRef = useRef(null);

  const lastScrollY = useRef(0);

  // Scroll hide / show animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (mobileOpen) return;

      if (currentScroll > 50 && currentScroll > lastScrollY.current) {
        gsap.to(navRef.current, { y: -100, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Hover Active Pill
  const handleItemHover = (e) => {
    const link = e.currentTarget;
    if (!navLinksRef.current || !pillRef.current) return;

    const navBounds = navLinksRef.current.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();

    gsap.to(pillRef.current, {
      opacity: 1,
      x: linkBounds.left - navBounds.left,
      width: linkBounds.width,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveNav = () => {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  // Navigation Helper
  const goTo = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <header ref={navRef} className="ac-nav">
      <div className="ac-nav__bar">
        {/* BRAND */}
        <button
          type="button"
          className="ac-nav__brand"
          onClick={() => goTo("/")}
          aria-label="Go to home"
        >
          <span className="ac-nav__brand-name">AI CONCEPT</span>
          <span className="ac-nav__brand-badge">LLC</span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav
          ref={navLinksRef}
          className="ac-nav__links"
          onMouseLeave={handleMouseLeaveNav}
        >
          <div ref={pillRef} className="ac-nav-active-pill" />

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `ac-nav__link-btn ${isActive ? "active-link" : ""}`
            }
            onMouseEnter={handleItemHover}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `ac-nav__link-btn ${isActive ? "active-link" : ""}`
            }
            onMouseEnter={handleItemHover}
          >
            About
          </NavLink>

          {/* NORMAL SOLUTIONS LINK */}
          <NavLink
            to="/solutions"
            className={({ isActive }) =>
              `ac-nav__link-btn ${isActive ? "active-link" : ""}`
            }
            onMouseEnter={handleItemHover}
          >
            Solutions
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `ac-nav__link-btn ${isActive ? "active-link" : ""}`
            }
            onMouseEnter={handleItemHover}
          >
            Contact
          </NavLink>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="ac-nav__right">
          <button
            type="button"
            className="ac-nav__cta desktop-only-cta"
            onClick={onOpenProject}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            className="ac-nav__menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="ac-mobile-drawer">
          <div className="ac-mobile-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `ac-mobile-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `ac-mobile-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>About</span>
            </NavLink>

            {/* NORMAL MOBILE SOLUTIONS LINK */}
            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                `ac-mobile-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>Solutions</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `ac-mobile-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>Contact</span>
            </NavLink>
          </div>

          <div className="ac-mobile-footer">
            <button
              type="button"
              className="ac-mobile-cta-btn"
              onClick={() => {
                setMobileOpen(false);
                if (onOpenProject) onOpenProject();
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}