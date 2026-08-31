import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./PortfolioSection.css";

const projects = [
  {
    id: "01",
    title: "ROYAL FRESH",
    subtitle: "GLOBAL SOURCING & EXPORT PLATFORM",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "linear-gradient(135deg, rgba(9, 26, 20, 0.8) 0%, rgba(13, 46, 35, 0.9) 100%)",
  },
  {
    id: "02",
    title: "DM PHARMACY",
    subtitle: "HEALTHCARE E-COMMERCE & PRESCRIPTION DISPATCH",
    image: "",
    bgGradient: "linear-gradient(135deg, rgba(18, 33, 30, 0.8) 0%, rgba(26, 56, 50, 0.9) 100%)",
  },
  {
    id: "03",
    title: "SHAHENAN CONTRACTING",
    subtitle: "STRUCTURAL ARCHITECTURE & REAL ESTATE PORTAL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "linear-gradient(135deg, rgba(24, 21, 18, 0.8) 0%, rgba(41, 33, 26, 0.9) 100%)",
  },
  {
    id: "04",
    title: "ZEVORA GROUPE",
    subtitle: "GLOBAL LOGISTICS & SUPPLY CHAIN SUITE",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)",
  },
];

export default function PortfolioSection() {
  return (
    <section className="pf-simple-section" id="work">
      {/* Background Ambient Glows */}
      <div className="pf-glow-left" />
      <div className="pf-glow-right" />

      <div className="pf-simple-container">
        
        {/* Section Header */}
        <div className="pf-simple-header">
          <div className="pf-simple-eyebrow">
            <span>CURATED SHOWCASE</span>
          </div>

          <div className="pf-header-split">
            <h2 className="pf-simple-title">
              SELECTED <span className="pf-simple-title-gradient">WORKS</span>
            </h2>
            <span className="pf-badge-strip">PRODUCTION GRADE</span>
          </div>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="pf-simple-grid">
          {projects.map((item, idx) => (
            <motion.div
              key={item.id}
              className="pf-simple-card"
              style={{ background: item.bgGradient }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* If Image Exists */}
              {item.image ? (
                <div className="pf-card-img-wrap">
                  <img src={item.image} alt={item.title} className="pf-card-img" />
                  <div className="pf-img-overlay">
                    <div className="pf-card-content">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                    <div className="pf-card-arrow">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              ) : (
                /* Pure Minimal Layout */
                <div className="pf-card-text-layout">
                  <div className="pf-center-watermark">
                    <span>{item.title}</span>
                  </div>
                  <div className="pf-card-bottom-info">
                    <span className="pf-project-num">{`${item.id} // CASE STUDY`}</span>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                  <div className="pf-card-arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}