import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import "./FinalCTA.css";

export default function FinalCTA({ onOpenBooking, onOpenProject }) {
  const go = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProject = () => {
    if (onOpenProject) {
      onOpenProject();
    }
  };

  return (
    <footer className="fn-footer">
      {/* Upper High-Impact Conversion Hub */}
      <section className="fn-cta">
        <div className="fn-cta__glow" />

        <motion.div
          className="fn-cta__content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="fn-eyebrow">
            <span>AI CONCEPT LLC</span>
          </div>

          <h2 className="fn-cta__title">
            HAVE AN IDEA? <br />
            <span className="fn-cta__title-gradient">LET'S MAKE IT REAL.</span>
          </h2>

          <p className="fn-cta__lead">
            Engineering high-performance digital products & platforms from Calicut, India.
          </p>

          <button type="button" className="fn-btn-primary" onClick={handleStartProject}>
            <span>START A PROJECT</span>
            <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </section>

      {/* Main Footer Links Matrix */}
      <div className="fn-footer__container">
        <div className="fn-footer__main">
          {/* Brand Identity */}
          <div className="fn-footer__brand">
            <button
              type="button"
              className="fn-brand-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>AI CONCEPT</span>
              <small className="fn-logo-sub">LLC</small>
            </button>

            <p className="fn-brand-desc">
              Building Digital Experiences. <br />
              Software Company · AI Solutions · Custom Platforms
            </p>

            <div className="fn-location-badge">
              <MapPin size={12} />
              <span>Calicut, Kerala, India</span>
            </div>
          </div>

          {/* Nav & Info Columns */}
          <div className="fn-footer__columns">
            <div className="fn-col">
              <span className="fn-col-label">EXPLORE</span>
              <button type="button" onClick={() => go("#services")}>Services</button>
              <button type="button" onClick={() => go("#speed")}>24H / 42H Sprint</button>
              <button type="button" onClick={() => go("#work")}>Selected Works</button>
              <button type="button" onClick={() => go("#reviews")}>Reviews</button>
              <button type="button" onClick={handleStartProject}>Start Project</button>
              {onOpenBooking && (
                <button type="button" onClick={onOpenBooking}>Book 1:1 Meet</button>
              )}
            </div>

            <div className="fn-col">
              <span className="fn-col-label">CAPABILITIES</span>
              <span>Web Platforms</span>
              <span>Mobile Apps</span>
              <span>E-Commerce</span>
              <span>Booking Engines</span>
              <span>AI Solutions</span>
            </div>

            <div className="fn-col">
              <span className="fn-col-label">DIRECT INTAKE</span>
              <a href="mailto:info@aiconcept.in">
                <Mail size={13} />
                <span>info@aiconcept.in</span>
              </a>
              <button type="button" onClick={handleStartProject}>
                <Phone size={13} />
                <span>Project Desk</span>
              </button>
              <span className="fn-base-pill">
                <span className="fn-green-dot" />
                <span>Calicut Core Studio</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fn-footer__bottom">
          <span>&copy; {new Date().getFullYear()} AI CONCEPT LLC. ALL RIGHTS RESERVED.</span>
          <span className="fn-bottom-tag">BUILDING DIGITAL EXPERIENCES</span>
          <button
            type="button"
            className="fn-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}