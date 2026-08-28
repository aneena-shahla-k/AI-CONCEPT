import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Send } from "lucide-react";
import "./CompanyHero.css";

export default function CompanyHero({ onSearchTrigger }) {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchTrigger) {
      onSearchTrigger(searchQuery || "Help me get started");
      setSearchQuery("");
    }
  };

  return (
    <div ref={containerRef} className="deplot-scroll-wrapper">
      <div className="deplot-sticky-stage">
        {/* Left Indicator */}
        <div className="deplot-side-decor deplot-side-decor--left">
          <span className="deplot-side-label">WEB</span>
          <div className="deplot-side-dots">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="deplot-side-label">AI</span>
        </div>

        {/* Right Tracker */}
        <div className="deplot-side-decor deplot-side-decor--right">
          <span className="deplot-tracker-text">TRACKER</span>
          <div className="deplot-progress-rail">
            <motion.div
              className="deplot-progress-fill"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
        </div>

        {/* Massive Typography Animation */}
        <div className="deplot-horizontal-window">
          <motion.div style={{ x }} className="deplot-text-row">
            <span className="deplot-massive-text solid">AI CONCEPT</span>
            <span className="deplot-massive-text outline">BUILDING</span>
            <span className="deplot-massive-text solid">DIGITAL STUDIOS</span>
          </motion.div>
        </div>

        {/* Interactive Search Bar */}
        <div className="deplot-bottom-search">
          <form onSubmit={handleSearchSubmit} className="deplot-search-box">
            <span className="deplot-lang-badge">EN</span>
            <input
              type="text"
              placeholder="Ask me anything about our services..."
              className="deplot-input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className="deplot-btn-icon"
              onClick={() => onSearchTrigger && onSearchTrigger("")}
              aria-label="Open AI Assistant"
            >
              <Mic size={17} />
            </button>
            <button
              type="submit"
              className="deplot-btn-icon deplot-btn-send"
              aria-label="Send query"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}