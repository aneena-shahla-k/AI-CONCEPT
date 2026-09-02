// AISolutions.jsx
import React from 'react';
import './AISolutions.css';

const aiCapabilities = [
  {
    title: "AI-Powered Software",
    desc: "Custom AI platforms & intelligent core systems",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8m-4-4v4"/>
      </svg>
    )
  },
  {
    title: "Autonomous AI Agents",
    desc: "Goal-oriented agents executing complex business routines",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <circle cx="12" cy="5" r="2"/>
        <path d="M12 7v4m-4 4h.01m8 0h.01"/>
      </svg>
    )
  },
  {
    title: "Smart Chatbots & Assistants",
    desc: "24/7 intelligent customer support and automated sales reps",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    title: "Workflow Automation",
    desc: "Streamlined business logic and cross-tool AI pipelines",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    title: "Document Processing",
    desc: "Automated OCR, semantic extraction, and data indexing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )
  },
  {
    title: "Analytics & ML Systems",
    desc: "Predictive modeling, data analytics, and recommendations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  }
];

const AISolutions = () => {
  return (
    <section className="ai-section-wrapper">
      <div className="ai-container">
        
        {/* Header Content */}
        <div className="ai-header">
          <span className="ai-tag">AI SOLUTIONS</span>
          <h2 className="ai-title">
            We don’t just add AI.<br />
            <span className="highlight-ai">We build AI into the business.</span>
          </h2>
          <p className="ai-subtitle">
            Custom AI systems engineered around your business data, workflows, customers, and operations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="ai-grid">
          {aiCapabilities.map((item, index) => (
            <div key={index} className="ai-card">
              <div className="ai-card-glow" />
              <div className="ai-icon-container">
                {item.icon}
              </div>
              <h3 className="ai-card-title">{item.title}</h3>
              <p className="ai-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="ai-bottom-banner">
          <div className="ai-badge-pulse" />
          <p className="ai-banner-text">
            Enterprise-ready integration with your existing CRM, ERP, and operational infrastructure.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AISolutions;