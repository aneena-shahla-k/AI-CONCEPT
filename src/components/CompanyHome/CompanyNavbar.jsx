import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X} from "lucide-react";
import "./CompanyNavbar.css";

const links = [
  ["#services", "Services"],
  ["#speed", "Speed"],
  ["#scoper", "Scope Builder"],
  ["#work", "Work"],
  ["#reviews", "Reviews"],
];

export default function CompanyNavbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`ac-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="ac-nav__bar">
        {/* Brand Logo */}
        <button
          type="button"
          className="ac-nav__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="ac-nav__brand-name">AI CONCEPT</span>
        </button>

        {/* Center Nav Links + 1:1 Call Link */}
        <nav className="ac-nav__links">
          {links.map(([selector, label]) => (
            <button
              type="button"
              key={label}
              onClick={() => go(selector)}
              className="ac-nav__link-btn"
            >
              {label}
            </button>
          ))}
          {/* Book 1:1 seamlessly inside nav */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="ac-nav__link-btn ac-nav__link-highlight"
          >
            Book 1:1 Meet
          </button>
        </nav>

        {/* Single Right Action */}
        <div className="ac-nav__right">
          <button
            type="button"
            className="ac-nav__cta"
            onClick={() => go("#contact")}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            className="ac-nav__menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`ac-nav__mobile ${open ? "is-open" : ""}`}>
        <div className="ac-nav__mobile-inner">
          {links.map(([selector, label], index) => (
            <button
              type="button"
              key={label}
              onClick={() => go(selector)}
              className="ac-nav__mobile-link"
            >
              <span className="ac-nav__mobile-num">0{index + 1}</span>
              <span className="ac-nav__mobile-text">{label}</span>
            </button>
          ))}

          <button
            type="button"
            className="ac-nav__mobile-link"
            onClick={() => {
              setOpen(false);
              onOpenBooking();
            }}
          >
            <span className="ac-nav__mobile-num">06</span>
            <span className="ac-nav__mobile-text">Book 1:1 Meeting</span>
          </button>

          <button
            type="button"
            className="ac-nav__mobile-cta"
            onClick={() => go("#contact")}
          >
            <span>Start a project</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}