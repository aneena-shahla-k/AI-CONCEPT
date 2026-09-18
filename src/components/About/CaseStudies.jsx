import React, { useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./CaseStudies.css";

import img1 from "../assets/images/about/lumiere.png";
import img2 from "../assets/images/about/honey.png";
import img3 from "../assets/images/about/kitchen.png";
import img4 from "../assets/images/about/nexora.png";

const projects = [
  {
    id: 1,
    number: "01",
    category: "DIGITAL COMMERCE",
    title: "Lumière",
    year: "2026",
    image: img1,
    link: "https://lumiere-mocha-nine.vercel.app/",
  },
  {
    id: 2,
    number: "02",
    category: "INTERIOR EXPERIENCE",
    title: "Kitchen Crafts",
    year: "2026",
    image: img3,
    link: "https://kitchen-kohl-eight.vercel.app/",
  },
  {
    id: 3,
    number: "03",
    category: "BRAND EXPERIENCE",
    title: "Nexora",
    year: "2026",
    image: img4,
    link: "https://nexora-store-eta.vercel.app/",
  },
  {
    id: 4,
    number: "04",
    category: "NATURAL BRAND",
    title: "Wayanad Premium",
    year: "2026",
    image: img2,
    link: "https://wayanad-honey.netlify.app/",
  },
];

// Duplicate projects 4 times so it fills any ultra-wide screen comfortably
const displayProjects = [...projects, ...projects, ...projects, ...projects];

export default function CaseStudies() {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (isPaused) return;

    // Movement speed: 0.045 pixels per ms (smooth 60fps translation)
    const moveBy = delta * 0.045;
    let newX = x.get() - moveBy;

    // CARD_WIDTH (320px) + GAP (20px) = 340px
    // Total single-set width = 4 * 340 = 1360px
    const singleCycleWidth = projects.length * 340;

    // Reset smoothly the moment one complete original cycle has passed
    if (newX <= -singleCycleWidth) {
      newX += singleCycleWidth;
    }

    x.set(newX);
  });

  return (
    <section className="case-studies" id="case-studies">
      {/* HEADER */}
      <div className="case-studies__header">
        <div className="case-studies__eyebrow">
          <span className="case-studies__line" />
          <span>SELECTED WORK</span>
        </div>
        <div className="case-studies__reel-badge">
          <span>● LIVE REEL</span>
        </div>
      </div>

      {/* TITLE */}
      <div className="case-studies__heading">
        <div>
          <h2>
            Work that speaks
            <br />
            <em>for itself.</em>
          </h2>
        </div>
      </div>

      {/* FILM REEL WRAPPER */}
      <div
        className="case-studies__film"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Film sprockets top */}
        <div className="case-studies__sprockets">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        {/* Dynamic Film Window */}
        <div className="case-studies__film-window">
          <motion.div className="case-studies__film-track" style={{ x }}>
            {displayProjects.map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="case-studies__film-item"
              >
                <div className="case-studies__frame-header">
                  <span>FRAME {item.number}</span>
                  <span>{item.year}</span>
                </div>

                <div className="case-studies__frame-image">
                  <img src={item.image} alt={item.title} draggable="false" />
                  <div className="case-studies__image-overlay" />
                  <span className="case-studies__category">{item.category}</span>
                  <span className="case-studies__project-name">{item.title}</span>
                </div>

                <div className="case-studies__frame-footer">
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                  <span className="case-studies__link-icon">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Film sprockets bottom */}
        <div className="case-studies__sprockets">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}