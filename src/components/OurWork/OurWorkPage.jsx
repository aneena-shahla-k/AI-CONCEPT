import React from "react";
import { ArrowUpRight, Check, Zap } from "lucide-react";
import GsapSpotlightCard from "../common/GsapSpotlightCard";
import "./OurWorkPage.css";
import img1 from "../../images/honey.png";
import img2 from "../../images/kitchen.png";
import img3 from "../../images/lumiere.png";
import img4 from "../../images/nexora.png";

const projects = [
  {
    id: "wayanad-premium",
    title: "Wayanad Premium",
    category: "Organic D2C & E-Commerce",
    image: img1,
    liveUrl: "https://wayanad-honey.netlify.app",
    metric: "60 FPS",
    metricLabel: "Smooth Canvas Scroll",
    problem: "Generic storefront templates failed to convey the premium, raw purity of wild forest honey.",
    solution: "Engineered a frame-by-frame scroll-driven canvas animation with interactive quiz & frictionless 1-click checkout.",
    ecosystem: ["Canvas Scroll Web", "Direct D2C Store", "Razorpay Rails", "WhatsApp Tracking"],
  },
  {
    id: "kitchen-crafts",
    title: "Kitchen Crafts",
    category: "Interior & Architecture",
    image: img2,
    metric: "+78%",
    metricLabel: "Design Consultation Leads",
    problem: "High-end clients needed to visualize modular layouts before booking costly physical site visits.",
    solution: "Crafted a minimalist portfolio portal with 3D modular layout previews, material estimators, and instant site-visit scheduling.",
    ecosystem: ["Interactive Showcase", "Estimate Calculator", "Consultation Booking", "Lead Desk CRM"],
  },
  {
    id: "lumiere-skincare",
    title: "Lumiere Skin Care",
    category: "Luxury Beauty & Cosmetics",
    image: img3,
    metric: "+125%",
    metricLabel: "Mobile Conversion Rate",
    problem: "High bounce rates on mobile due to slow page loads and complex routine-selection steps.",
    solution: "Designed a luxury glassmorphism storefront with personalized skin-routine builders and fast checkout.",
    ecosystem: ["Luxury PWA Storefront", "Routine Selector", "Bundle Engine", "Automated Post-Care"],
  },
  {
    id: "nexora",
    title: "Nexora",
    category: "Retail Tech & Home Essentials",
    image: img4,
    metric: "0 Min",
    metricLabel: "Inventory Sync Latency",
    problem: "Stock desyncs between physical retail registers and online flash sales led to frequent inventory errors.",
    solution: "Integrated a high-throughput electronics catalogue synced directly with multi-warehouse inventory and real-time order dispatch.",
    ecosystem: ["Omnichannel Store", "Multi-Warehouse Sync", "Flash-Sale Engine", "Logistics Webhooks"],
  },
];

export default function OurWorkPage({ onOpenProject }) {
  return (
    <div className="work-clean-page">
      <div className="work-clean-glow" />

      <div className="work-clean-container">
        {/* Simple Header */}
        <section className="work-clean-header">
          <span className="work-clean-tag">
            <Zap size={12} />
            <span>SELECTED WORK</span>
          </span>
          <h1 className="work-clean-title">
            Real Businesses. <br />
            <span className="work-clean-gradient">Connected Systems.</span>
          </h1>
          <p className="work-clean-sub">
            From interactive consumer storefronts to high-converting industry platforms.
          </p>
        </section>

        {/* GSAP Spotlight & Tilt Cards Grid */}
        <div className="work-cards-grid">
          {projects.map((item) => (
            <GsapSpotlightCard
              key={item.id}
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${item.title}`}
              className={item.liveUrl ? "work-card-interactive" : ""}
            >
              <div className="work-card-inner-grid">
                {/* Image Preview */}
                <div className="work-card-media">
                  <img src={item.image} alt={item.title} />
                  <div className="work-metric-chip">
                    <strong>{item.metric}</strong>
                    <span>{item.metricLabel}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="work-card-body">
                  <div className="work-card-header-row">
                    <div>
                      <span className="work-category">{item.category}</span>
                      <h3 className="work-card-name">{item.title}</h3>
                    </div>

                    {item.liveUrl && (
                      <div className="work-link-icon-badge">
                        <span>Visit Live</span>
                        <ArrowUpRight size={14} />
                      </div>
                    )}
                  </div>

                  <div className="work-summary-row">
                    <div className="work-summary-box">
                      <span className="work-label">THE PROBLEM</span>
                      <p>{item.problem}</p>
                    </div>
                    <div className="work-summary-box">
                      <span className="work-label">WHAT WE BUILT</span>
                      <p>{item.solution}</p>
                    </div>
                  </div>

                  {/* Ecosystem Tags */}
                  <div className="work-ecosystem-strip">
                    {item.ecosystem.map((tag, i) => (
                      <span key={i} className="work-eco-tag">
                        <Check size={11} className="work-eco-check" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GsapSpotlightCard>
          ))}
        </div>

        {/* Direct Action Bottom Bar */}
        <div className="work-clean-cta">
          <div>
            <h3>Want a custom high-performance system built for your brand?</h3>
            <p>From initial design blueprint to live production deployment in dedicated sprint windows.</p>
          </div>
          <button
            type="button"
            className="work-btn-action"
            onClick={() => {
              if (onOpenProject) onOpenProject();
            }}
          >
            <span>Start A Project</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}