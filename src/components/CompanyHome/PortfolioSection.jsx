import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./PortfolioSection.css";

const projects = [
  {
    id: "01",
    title: "ROYAL FRESH",
    subtitle: "GLOBAL SOURCING & EXPORT PLATFORM",
    // ഇമേജ് ഉണ്ടെങ്കിൽ image URL നൽകാം, ഇല്ലെങ്കിൽ placeholder ഉപയോഗിക്കും
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "linear-gradient(135deg, #091a14 0%, #0d2e23 100%)",
  },
  {
    id: "02",
    title: "DM PHARMACY",
    subtitle: "HEALTHCARE E-COMMERCE & PRESCRIPTION DISPATCH",
    image: "", // ഇമേജ് ഇല്ലാത്ത കാർഡുകൾ സ്ക്രീൻഷോട്ടിലുള്ളതുപോലെ ക്ലീൻ ബാക്ക്ഗ്രൗണ്ടിൽ വരും
    bgGradient: "linear-gradient(135deg, #12211e 0%, #1a3832 100%)",
  },
  {
    id: "03",
    title: "SHAHENAN CONTRACTING",
    subtitle: "STRUCTURAL ARCHITECTURE & REAL ESTATE PORTAL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "linear-gradient(135deg, #181512 0%, #29211a 100%)",
  },
  {
    id: "04",
    title: "ZEVORA GROUPE",
    subtitle: "GLOBAL LOGISTICS & SUPPLY CHAIN SUITE",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  },
];

export default function PortfolioSection() {
  return (
    <section className="pf-simple-section" id="work">
      <div className="pf-simple-container">
        
        {/* Section Header */}
        <div className="pf-simple-header">
          <div className="pf-simple-eyebrow">
            <span className="pf-simple-dot" />
            <span>PORTFOLIO</span>
          </div>

          <h2 className="pf-simple-title">
            SELECTED <span className="pf-simple-title-outline">WORKS</span>
          </h2>
        </div>

        {/* 2-Column Simple Grid */}
        <div className="pf-simple-grid">
          {projects.map((item, idx) => (
            <motion.div
              key={item.id}
              className="pf-simple-card"
              style={{ background: item.bgGradient }}
              initial={{ opacity: 0, y: 20 }}
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
                /* Pure Minimal Text Layout (Like DM Pharmacy in screenshot) */
                <div className="pf-card-text-layout">
                  <div className="pf-center-watermark">
                    <span>{item.title}</span>
                  </div>
                  <div className="pf-card-bottom-info">
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