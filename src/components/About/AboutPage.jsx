import React from "react";
import { Compass, ArrowUpRight } from "lucide-react";
import "./AboutPage.css";
import img from "../../images/aiimg.jpg";

const layers = [
  {
    num: "01",
    tag: "ROUTE",
    title: "Unit Economics & Offer Strategy",
    desc: "Pricing logic, retention dynamics, and operational margins mapped prior to code deployment."
  },
  {
    num: "02",
    tag: "INTERFACE",
    title: "Web Platforms & Mobile Apps",
    desc: "Decoupled web frontends and native apps with real-time catalog and login sync."
  },
  {
    num: "03",
    tag: "NERVOUS CORE",
    title: "Internal ERP & Operations",
    desc: "Order dispatch, automated PDF invoices, and role-based staff permissions."
  },
  {
    num: "04",
    tag: "AUTONOMY",
    title: "Autonomous Agents & Private AI",
    desc: "Document OCR parsing and private conversational triage trained on internal records."
  }
];

const highlights = [
  {
    title: "Strategy & Discovery",
    badge: "SPECIFICATION",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    desc: "Collaborative scoping defining data models and core operational bottlenecks."
  },
  {
    title: "Production Sprints",
    badge: "VELOCITY",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    desc: "Fixed-scope modular engineering with zero technical debt and live CI/CD staging."
  }
];

export default function AboutPage({ onOpenProject, onOpenBooking }) {
  return (
    <div className="abt-page">
      <div className="abt-container">

        {/* 1. Hero Section */}
        <section className="abt-hero">
          <span className="abt-eyebrow">STUDIO MANIFESTO</span>
          <h1 className="abt-hero-title">
            We build the <span className="abt-gradient-text">connected engine.</span>
          </h1>
          <p className="abt-hero-lead">
            Bridging strategy, web platforms, operational ERPs, and private AI into a single autonomous system.
          </p>
          <div className="abt-mantra-pill">
            <Compass size={14} />
            <span>"We sell the GPS. You drive the business."</span>
          </div>
        </section>

        {/* 2. Visual Story Narrative */}
        <section className="abt-narrative">
          <div className="abt-media-frame">
            <img src={img} alt="Connected Systems Architecture" />
            <div className="abt-media-pill">
              <span className="abt-pulse-dot" />
              <span>PRODUCTION STACK v3.4</span>
            </div>
          </div>

          <div className="abt-narrative-info">
            <span className="abt-section-tag">THE SYSTEM PHILOSOPHY</span>
            <h2>Traditional agencies build pages. We engineer operations.</h2>
            <p>
              Disconnected tools create human friction under load. We connect your storefront directly to inventory, back-office ERP, and autonomous triage bots.
            </p>

            <div className="abt-metrics-strip">
              <div className="abt-metric-box">
                <strong>100%</strong>
                <span>Code Ownership</span>
              </div>
              <div className="abt-metric-box">
                <strong>0</strong>
                <span>Retainer Locks</span>
              </div>
              <div className="abt-metric-box">
                <strong>24-48H</strong>
                <span>Sprint Velocity</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 4-Layer Blueprint */}
        <section className="abt-layers">
          <div className="abt-layers-head">
            <span className="abt-section-tag">ARCHITECTURE</span>
            <h2>The 4-Layer Blueprint</h2>
          </div>

          <div className="abt-layers-grid">
            {layers.map((layer) => (
              <div key={layer.num} className="abt-layer-card">
                <div className="abt-layer-meta">
                  <span className="abt-num">{layer.num}</span>
                  <span className="abt-tag">{layer.tag}</span>
                </div>
                <h3>{layer.title}</h3>
                <p>{layer.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Studio Highlights */}
        <section className="abt-highlights">
          {highlights.map((item, idx) => (
            <div key={idx} className="abt-high-card">
              <div className="abt-high-media">
                <img src={item.image} alt={item.title} />
                <span className="abt-high-badge">{item.badge}</span>
              </div>
              <div className="abt-high-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 5. Minimal CTA */}
        <section className="abt-cta">
          <div>
            <h3>Ready to map your business route?</h3>
            <p>Fixed-turnaround production engineering in dedicated sprint windows.</p>
          </div>
          <div className="abt-cta-btns">
            <button
              type="button"
              className="abt-btn-solid"
              onClick={() => onOpenProject && onOpenProject()}
            >
              <span>Start A Project</span>
              <ArrowUpRight size={13} />
            </button>
            <button
              type="button"
              className="abt-btn-outline"
              onClick={() => onOpenBooking && onOpenBooking()}
            >
              <span>Book Strategy Call</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}