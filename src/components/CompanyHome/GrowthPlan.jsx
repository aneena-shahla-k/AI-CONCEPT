// GrowthPlan.jsx
import React, { useState } from 'react';
import './GrowthPlan.css';

const planPhases = [
  {
    step: "01",
    phase: "Concept & Foundation",
    title: "Business Idea",
    question: "What should the business sell?",
    desc: "Market viability analysis, value proposition refinement, and defining your high-margin offerings.",
    category: "Foundation"
  },
  {
    step: "02",
    phase: "Monetization",
    title: "Business Model",
    question: "How will it make money?",
    desc: "Revenue streams, pricing mechanics, unit economics, and recurring cash-flow architecture.",
    category: "Foundation"
  },
  {
    step: "03",
    phase: "Targeting",
    title: "Market Strategy",
    question: "Who are the customers?",
    desc: "Ideal Customer Profile (ICP), competitive positioning, and market penetration routes.",
    category: "Go-to-Market"
  },
  {
    step: "04",
    phase: "Packaging",
    title: "Product / Service Structure",
    question: "What exactly should be offered?",
    desc: "Tiered service packages, deliverable scopes, catalog structuring, and SLA framework.",
    category: "Go-to-Market"
  },
  {
    step: "05",
    phase: "Brand Presentation",
    title: "Exhibition Strategy",
    question: "How should the business present itself?",
    desc: "Digital authority, brand narrative, showcase funnels, and enterprise pitch positioning.",
    category: "Brand & Sales"
  },
  {
    step: "06",
    phase: "Acquisition Engine",
    title: "Marketing Plan",
    question: "How will customers be acquired?",
    desc: "Multi-channel funnel, paid acquisition, organic reach, and automated conversion pipelines.",
    category: "Brand & Sales"
  },
  {
    step: "07",
    phase: "Digital Infrastructure",
    title: "Technology Plan",
    question: "What systems are required?",
    desc: "Target architecture across Web, Mobile Apps, CRM, ERP, E-Commerce, and integrated AI automation.",
    category: "Infrastructure"
  },
  {
    step: "08",
    phase: "Scale & Longevity",
    title: "Succession & Scaling Plan",
    question: "How does the business run without you?",
    desc: "Standard operating procedures (SOPs), delegation frameworks, and autonomous operating models.",
    category: "Infrastructure"
  }
];

const GrowthPlan = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="growth-plan-section">
      <div className="growth-glow-accent" />
      
      <div className="growth-container">
        
        {/* Header Block */}
        <div className="growth-header">
          <div className="growth-badge">
            <span className="gps-indicator" />
            <span>THE STRATEGIC BLUEPRINT</span>
          </div>

          <h1 className="growth-main-title">
            Don’t start with software.<br />
            <span className="growth-gradient-text">Start with the route.</span>
          </h1>

          <p className="growth-lead-text">
            A complete 8-stage strategic roadmap. We design every operational turn, 
            monetization channel, and technical requirement.
          </p>
        </div>

        {/* 8-Point Navigation / Blueprint Grid */}
        <div className="blueprint-grid">
          {planPhases.map((item, index) => (
            <div 
              key={item.step} 
              className={`blueprint-card ${activeStep === index ? 'card-active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="card-top-meta">
                <span className="step-number">{item.step}</span>
                <span className="step-category">{item.category}</span>
              </div>
              <h3 className="card-heading">{item.title}</h3>
              <p className="card-question">{item.question}</p>
              <p className="card-detail">{item.desc}</p>
              <div className="card-route-indicator" />
            </div>
          ))}
        </div>

        {/* Final GPS Hand-off Hero Card */}
        <div className="gps-handoff-banner">
          <div className="gps-banner-content">
            <div className="gps-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div>
              <h3 className="gps-banner-title">We hand you the roadmap. You drive.</h3>
              <p className="gps-banner-subtitle">
                Clear turn-by-turn guidance for technology, business systems, and scalable operations.
              </p>
            </div>
          </div>
          <button className="gps-cta-button">
            Request Growth Blueprint
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default GrowthPlan;