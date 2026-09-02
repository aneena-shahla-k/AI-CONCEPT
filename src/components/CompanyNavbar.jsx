import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import "./CompanyNavbar.css";

const solutionItems = [
  { label: "Website Development", slug: "website-development" },
  { label: "E-Commerce", slug: "e-commerce" },
  { label: "App Development", slug: "app-development" },
  { label: "Booking Platforms", slug: "booking-platforms" },
  { label: "ERP Solutions", slug: "erp-solutions" },
  { label: "Custom Software", slug: "custom-software" },
  { label: "AI Solutions", slug: "ai-solutions" },
  { label: "Automation", slug: "ai-solutions" },
];

export default function CompanyNavbar({ onOpenProject, onNavigate, currentPage = "home" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const navRef = useRef(null);
  const navLinksRef = useRef(null);
  const pillRef = useRef(null);
  const ctaRef = useRef(null);
  const lastScrollY = useRef(0);
  const closeTimeoutRef = useRef(null);

  // 1. GSAP Smart Auto-Hide on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50 && currentScroll > lastScrollY.current) {
        gsap.to(navRef.current, { y: -100, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Sliding Pill Indicator
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
    if (pillRef.current) {
      gsap.to(pillRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  };

  // 3. Robust Dropdown Hover Handlers (Prevents menu disappearing)
  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 280); // 280ms cushion delay so moving to menu doesn't close it
  };

  // 4. Click Handler for Solutions and Pages
  const handleItemSelect = (e, page, slug = null) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileOpen(false);
    setDropdownOpen(false);

    if (onNavigate) {
      onNavigate(page, slug);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header ref={navRef} className="ac-nav">
      <div className="ac-nav__bar">
        {/* Brand */}
        <button
          type="button"
          className="ac-nav__brand"
          onClick={(e) => handleItemSelect(e, "home")}
        >
          <span className="ac-nav__brand-name">AI CONCEPT</span>
          <span className="ac-nav__brand-badge">LLC</span>
        </button>

        {/* Desktop Navigation */}
        <nav 
          ref={navLinksRef} 
          className="ac-nav__links"
          onMouseLeave={handleMouseLeaveNav}
        >
          <div ref={pillRef} className="ac-nav-active-pill" />

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "home" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "home")}
          >
            Home
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "growth-plans" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "growth-plans")}
          >
            Growth Plans
          </button>

          {/* Solutions Dropdown Wrapper with Safe Hover */}
          <div
            className="ac-nav__dropdown-wrap"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              type="button"
              className={`ac-nav__link-btn ac-nav__dropdown-trigger ${currentPage === "solution-detail" ? "active-link" : ""}`}
              onMouseEnter={handleItemHover}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span>Solutions</span>
              <ChevronDown size={13} className={`ac-dropdown-chevron ${dropdownOpen ? "is-rotated" : ""}`} />
            </button>

            {dropdownOpen && (
              <div 
                className="ac-nav__dropdown-menu"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="ac-dropdown-grid">
                  {solutionItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ac-dropdown-item"
                      onMouseDown={(e) => handleItemSelect(e, "solution-detail", item.slug)}
                      onClick={(e) => handleItemSelect(e, "solution-detail", item.slug)}
                    >
                      <span className="ac-dropdown-dot" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "ai" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "ai")}
          >
            AI
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "industries" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "industries")}
          >
            Industries
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "work" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "work")}
          >
            Our Work
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "about" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "about")}
          >
            About
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "contact" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={(e) => handleItemSelect(e, "contact")}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA */}
        <div className="ac-nav__right">
          <button
            ref={ctaRef}
            type="button"
            className="ac-nav__cta"
            onClick={onOpenProject}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            className="ac-nav__menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}