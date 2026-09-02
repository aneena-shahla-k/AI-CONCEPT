// HowWeWork.jsx
import React from 'react';
import './HowWeWork.css';

const steps = [
  {
    number: "01",
    phase: "Discover",
    title: "Understanding the Terrain",
    desc: "We analyze your business idea, market landscape, target customers, and core objectives to establish a solid baseline.",
    tags: ["Market Viability", "User Personas", "Core Objectives"]
  },
  {
    number: "02",
    phase: "Design the Route",
    title: "The Growth Blueprint",
    desc: "We craft your strategic Growth Plan, revenue model, technical architecture, and go-to-market execution roadmap.",
    tags: ["Monetization Model", "System Architecture", "Route Planning"]
  },
  {
    number: "03",
    phase: "Build",
    title: "Full-Stack Development",
    desc: "We build your website, mobile applications, booking engines, ERP, and bespoke AI automations with clean, scalable code.",
    tags: ["Web & App", "Custom ERP", "AI Automations"]
  },
  {
    number: "04",
    phase: "Connect",
    title: "Ecosystem Integration",
    desc: "We integrate every component into a unified operational pipeline where all data, funnels, and workflows sync in real time.",
    tags: ["API Pipelines", "Unified Data", "Single Ecosystem"]
  },
  {
    number: "05",
    phase: "Hand Over",
    title: "You Take the Wheel",
    desc: "We deliver full system ownership, comprehensive operational documentation, and the complete growth roadmap. You drive.",
    tags: ["System Transfer", "SOP Delivery", "Full Ownership"]
  }
];

const HowWeWork = () => {
  return (
    <section className="hww-section">
      <div className="hww-glow" />

      <div className="hww-container">
        
        {/* Header Block */}
        <div className="hww-header">
          <div className="hww-badge">
            <span className="hww-beacon" />
            <span>EXECUTION FRAMEWORK</span>
          </div>

          <h2 className="hww-title">
            How We Work.<br />
            <span className="hww-gradient-text">From Discovery to Full Control.</span>
          </h2>

          <p className="hww-subtitle">
            A battle-tested 5-step lifecycle designed to turn complex business ideas 
            into fully integrated, autonomous digital operations.
          </p>
        </div>

        {/* 5-Step Process Track */}
        <div className="hww-timeline">
          <div className="hww-line-track" />

          {steps.map((item, index) => (
            <div key={item.number} className={`hww-step-card ${index === steps.length - 1 ? 'final-step' : ''}`}>
              
              <div className="hww-step-indicator">
                <span className="hww-number">{item.number}</span>
                <span className="hww-dot" />
              </div>

              <div className="hww-step-body">
                <span className="hww-phase-tag">{item.phase}</span>
                <h3 className="hww-step-heading">{item.title}</h3>
                <p className="hww-step-desc">{item.desc}</p>
                
                <div className="hww-tag-group">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="hww-pill">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="hww-handoff-banner">
          <div className="hww-handoff-meta">
            <span className="hww-handoff-status">DESTINATION REACHED</span>
            <p className="hww-handoff-text">
              Zero vendor lock-in. Full code access, standard operating procedures, and technical autonomy handed to your team.
            </p>
          </div>
          <a href="#contact" className="hww-cta-btn">
            Initiate Step 01
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;