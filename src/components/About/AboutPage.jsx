import React from "react";
import { 
  Compass, 
  ArrowUpRight, 
} from "lucide-react";
import "./AboutPage.css";
import img from "../../images/aiimg.jpg";

const systemLayers = [
  {
    num: "01",
    label: "COMMERCIAL ROUTE",
    title: "Unit Economics & Offer Strategy",
    desc: "Before writing code, we map pricing tiers, recurring monetization loops, buyer personas, and operational margin thresholds."
  },
  {
    num: "02",
    label: "UNIFIED PLATFORMS",
    title: "Web, Mobile & Real-Time POS",
    desc: "Decoupled web platforms and native mobile apps that synchronize transactions, user logins, and catalog inventory with zero delay."
  },
  {
    num: "03",
    label: "OPERATIONAL CORE",
    title: "Custom ERP & Internal Back-Office",
    desc: "Replacing scattered WhatsApp threads and manual spreadsheets with central order dispatch, automated invoicing, and role-based staff permissions."
  },
  {
    num: "04",
    label: "NEURAL & AUTOMATION",
    title: "Autonomous Agents & Private AI",
    desc: "Custom AI triage assistants, document parsers, and recommendation algorithms trained directly on your business records."
  }
];

const studioHighlights = [
  {
    title: "Strategy & Systems Discovery",
    tag: "DISCOVERY & SPEC",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    desc: "Collaborative whiteboarding sessions defining technical data models and customer journeys."
  },
  {
    title: "High-Velocity Software",
    tag: "24-48H SPRINTS",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    desc: "Rapid production builds executing clean, reusable components with automated CI/CD staging."
  }
];

export default function AboutPage({ onOpenProject, onOpenBooking }) {
  return (
    <div className="about-editorial-page">
      <div className="about-ambient-glow" />

      <div className="about-editorial-container">
        {/* 1. Header & Hero Narrative */}
        <section className="about-story-hero">
          <div className="about-badge">
            <span>MORE THAN JUST DEVELOPERS</span>
          </div>

          <h1 className="about-editorial-title">
            We don’t just write software. <br />
            <span className="about-gradient-text">We build the connected engine.</span>
          </h1>

          <p className="about-editorial-lead">
            AI Concept bridges business strategy, software architecture, artificial intelligence, 
            and operational planning. We believe founders shouldn't have to piece together disconnected agencies, 
            freelance developers, and fragmented SaaS tools on their own.
          </p>

          <div className="about-mantra-strip">
            <Compass size={18} className="about-mantra-icon" />
            <span className="about-mantra-text">"We create the route. You drive the business."</span>
          </div>
        </section>

        {/* 2. Visual Story Split (Removed boxes, added real metrics) */}
        <section className="about-narrative-split">
          <div className="about-narrative-media">
            <img
            src={img}
              alt="System Architecture & Strategy"
              className="about-split-img"
            />
            <div className="about-media-badge">
              <span className="about-badge-dot" />
              <span>PRODUCTION ECOSYSTEM v3.4</span>
            </div>
          </div>

          <div className="about-narrative-copy">
            <span className="about-sub-label">THE CORE DISCONNECT</span>
            <h2>Traditional agencies build pages. We engineer operations.</h2>
            <p>
              Most businesses end up with an isolated website, an unconnected CRM, manual spreadsheets, 
              and disjointed WhatsApp chats. When order volume spikes, the human operation breaks under the friction.
            </p>
            <p>
              We view software as a single, unified nervous system. Your website feeds your CRM, your CRM syncs 
              with inventory, your inventory triggers warehouse dispatches, and custom AI handles the repetitive customer triage.
            </p>

            <div className="about-stats-row">
              <div className="about-stat-item">
                <span className="about-stat-val">100%</span>
                <span className="about-stat-lbl">Code & System Ownership</span>
              </div>
              <div className="about-stat-item">
                <span className="about-stat-val">0</span>
                <span className="about-stat-lbl">Retainer Locks</span>
              </div>
              <div className="about-stat-item">
                <span className="about-stat-val">24-48H</span>
                <span className="about-stat-lbl">Sprint Turnarounds</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Open Architectural Layers (Clean List, No Boxed Borders) */}
        <section className="about-layers-section">
          <div className="about-layers-header">
            <span className="about-sub-label">THE 4-LAYER BLUEPRINT</span>
            <h2>What Goes Into An AI Concept Build</h2>
            <p>Every client deployment touches four essential organizational layers.</p>
          </div>

          <div className="about-layers-list">
            {systemLayers.map((layer) => (
              <div key={layer.num} className="about-layer-row">
                <div className="about-layer-meta">
                  <span className="about-layer-num">{layer.num}</span>
                  <span className="about-layer-pill">{layer.label}</span>
                </div>
                <div className="about-layer-body">
                  <h3>{layer.title}</h3>
                  <p>{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Studio Highlights Visual Cards */}
        <section className="about-studio-section">
          <div className="about-studio-grid">
            {studioHighlights.map((item, idx) => (
              <div key={idx} className="about-studio-card">
                <div className="about-studio-media">
                  <img src={item.image} alt={item.title} />
                  <span className="about-studio-tag">{item.tag}</span>
                </div>
                <div className="about-studio-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Minimalist Closing CTA Strip */}
        <section className="about-minimal-cta">
          <div className="about-cta-text">
            <h3>Ready to map your business route?</h3>
            <p>We scope, architect, and deploy production digital systems in dedicated sprint windows.</p>
          </div>

          <div className="about-cta-actions">
            <button
              type="button"
              className="about-btn-action"
              onClick={() => {
                if (onOpenProject) onOpenProject();
              }}
            >
              <span>Start A Project</span>
              <ArrowUpRight size={14} />
            </button>
            <button
              type="button"
              className="about-btn-ghost"
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
            >
              <span>Book Strategy Call</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}