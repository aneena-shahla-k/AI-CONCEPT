import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import "./PillarsSpotlightSection.css";

const pillars = [
  {
    num: "01",
    title: "Business Idea & Niche",
    question: "What should the business sell?",
    desc: "Market viability analysis, competitive gap audit, and high-margin product/service positioning.",
    category: "Foundation",
    deliverables: ["Value Proposition Canvas", "Niche Defensibility Audit", "Competitive Moat Blueprint"]
  },
  {
    num: "02",
    title: "Monetization Model",
    question: "How will it generate revenue?",
    desc: "Pricing tier design, recurring subscription logic, unit economics, and margin forecasting.",
    category: "Foundation",
    deliverables: ["Tiered Pricing Matrix", "CAC-to-LTV Unit Economics", "Billing Infrastructure Spec"]
  },
  {
    num: "03",
    title: "Target Market & ICP",
    question: "Who are the high-value buyers?",
    desc: "Ideal Customer Profiles, buyer persona motivations, and direct acquisition channels.",
    category: "Strategy",
    deliverables: ["B2B/B2C Buyer Archetypes", "Decision Maker Pain Points", "Conversion Trigger Mapping"]
  },
  {
    num: "04",
    title: "Product / Service Packaging",
    question: "How should offers be structured?",
    desc: "Core offerings vs. add-on structuring, deliverable scopes, and clear value-tier packaging.",
    category: "Strategy",
    deliverables: ["Service Level Agreements", "Scope Boundary Architecture", "Upsell / Cross-Sell Pipelines"]
  },
  {
    num: "05",
    title: "Brand Presentation",
    question: "How should authority be established?",
    desc: "Digital authority blueprints, conversion-led storytelling, and trust-building signals.",
    category: "Go-to-Market",
    deliverables: ["Enterprise Deck Structure", "Case Study Storytelling Framework", "Conversion Funnel Narrative"]
  },
  {
    num: "06",
    title: "Acquisition Engine",
    question: "How will leads convert predictably?",
    desc: "Inbound pipelines, paid acquisition routes, funnel architectures, and automated retargeting.",
    category: "Go-to-Market",
    deliverables: ["Multi-Channel Ad Architecture", "Cold-to-Warm Inbound Funnel", "Lead Scoring Logic"]
  },
  {
    num: "07",
    title: "Technology Architecture",
    question: "What digital stack is required?",
    desc: "End-to-end stack blueprint: Web platforms, Mobile Apps, CRM, ERP, and custom AI automations.",
    category: "Infrastructure",
    deliverables: ["Web & App Component Spec", "Custom CRM / ERP Data Schema", "Autonomous AI Agents"]
  },
  {
    num: "08",
    title: "Succession & Scaling Plan",
    question: "How does the business run autonomously?",
    desc: "Standard operating procedures (SOPs), delegation workflows, and system handoff protocols.",
    category: "Infrastructure",
    deliverables: ["Standard Operating Procedures", "Executive Dashboard Metric Specs", "Internal Team Handoff Runbook"]
  },
];

export default function PillarsSpotlightSection() {
  const [activePillar, setActivePillar] = useState(0);
  const current = pillars[activePillar];

  return (
    <section className="gp-pillars-section" id="pillars">
      <div className="gp-pillars-container">
        
        {/* Header Block */}
        <div className="gp-pillars-header" data-aos="zoom-in">
          <h2 className="gp-pillars-title">
            The 8 Pillars of Every <br />
            <span>Growth Plan</span>
          </h2>
          
        </div>

        {/* Master Blueprint Console */}
        <div className="gp-console-card">
          <div className="gp-console-layout">
            
            {/* Left Column: Navigation */}
            <div className="gp-console-nav" data-aos="zoom-in">
              <span className="gp-nav-label">PILLAR LAYERS</span>
              <div className="gp-nav-items" >
                {pillars.map((item, idx) => (
                  <button
                    key={item.num}
                    type="button"
                    className={`gp-nav-btn ${activePillar === idx ? "is-active" : ""}`}
                    onClick={() => setActivePillar(idx)}
                  >
                    <span className="gp-nav-btn-num">{item.num}</span>
                    <span className="gp-nav-btn-title">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Display Card */}
            <div className="gp-console-display">
              <div className="gp-display-card">
                
                {/* Top Meta */}
                <div className="gp-display-meta">
                  <span className="gp-display-cat">{current.category}</span>
                  <div className="gp-meta-right">
                   
                    <span className="gp-display-step">PILLAR {current.num}</span>
                  </div>
                </div>

                {/* Main Content */}
                <h3 className="gp-display-title">{current.title}</h3>
                <p className="gp-display-question">“{current.question}”</p>
                <p className="gp-display-desc">{current.desc}</p>

                {/* Included Deliverables Modules (Fills the White Space) */}
                <div className="gp-deliverables-box">
                  <span className="gp-box-label">KEY ARCHITECTURE OUTPUTS:</span>
                  <div className="gp-chips-grid">
                    {current.deliverables.map((item, i) => (
                      <div key={i} className="gp-output-chip">
                        <CheckCircle2 size={13} className="chip-check" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="gp-display-footer">
                  <span className="gp-display-note">Turnkey system architecture deliverable</span>
                  <button 
                    type="button" 
                    className="gp-display-cta"
                    onClick={() => {
                      const el = document.getElementById("packages");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>Explore Tiers</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}