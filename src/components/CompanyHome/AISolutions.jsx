import React from 'react';
import './AISolutions.css';

const capabilities = [
  {
    id: "software",
    title: "AI-Powered Software",
    desc: "Custom AI platforms and intelligent core systems built for business impact.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    id: "agents",
    title: "Autonomous AI Agents",
    desc: "Goal-oriented agents executing complex business routines independently.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
      </svg>
    )
  },
  {
    id: "copilot",
    title: "Smart Assistants",
    desc: "24/7 intelligent customer support and automated sales engagement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    desc: "Streamline operations with AI-driven workflows and cross-tool integration.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    id: "ocr",
    title: "Document Intelligence",
    desc: "Automated OCR, data extraction, classification, and indexing at scale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  },
  {
    id: "analytics",
    title: "Analytics & ML Systems",
    desc: "Predictive modeling, data analytics, and recommendations to drive growth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  }
];

export default function AISolutions() {
  return (
    <section className="clean-ai-section">
      {/* Background Liquid Light Glows */}
      <div className="liquid-glow glow-left" />
      <div className="liquid-glow glow-right" />

      <div className="clean-ai-container" data-aos="zoom-out-down">
        
        {/* Minimal Header */}
        <h2 className="clean-ai-heading">Areas of Expertise.</h2>

        {/* Liquid Glassmorphic Grid */}
        <div className="clean-ai-grid">
          {capabilities.map((item) => (
            <div key={item.id} className="clean-ai-card" data-aos="zoom-out-down">
              <div className="card-gloss-sheen" />
              <div className="clean-card-icon">
                {item.icon}
              </div>
              <h3 className="clean-card-title">{item.title}</h3>
              <p className="clean-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}