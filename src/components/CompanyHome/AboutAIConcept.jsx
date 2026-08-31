import React from 'react';
import './AboutAIConcept.css';
import img1 from "../../images/aiimg.jpg";

const AboutAIConcept = () => {
  const highlights = [
    {
      title: "Velocity-First Execution",
      description: "From initial concept to a custom-coded, live website in just 24 to 48 hours."
    },
    {
      title: "No Cookie-Cutter Templates",
      description: "Tailor-made digital architecture built specifically around your brand's unique identity."
    },
    {
      title: "Direct 1-on-1 Access",
      description: "Zero agency overhead—direct developer communication with real-time daily updates."
    }
  ];

  return (
    <section className="about-section">
      <div className="ambient-glow" />
      
      <div className="about-container">
        <div className="about-grid">
          
          {/* LEFT SIDE: Image & Live Badge Card */}
          <div className="about-left">
            <div className="card-glow" />
            <div className="glass-card">
              
              <div className="image-wrapper">
                <img
                src={img1}
                  alt="AI Concept Studio"
                  className="studio-img"
                />
                
                <div className="floating-badge">
                  <div className="badge-status">
                    <span className="pulse-dot" />
                    <span>Live Sprint Active</span>
                  </div>
                  <span className="badge-timeline">Avg. 36h Launch</span>
                </div>
              </div>

              {/* Metrics Bottom Bar */}
              <div className="metrics-row">
                <div className="metric-item">
                  <p className="metric-value">99<span>+</span></p>
                  <p className="metric-label">Google Lighthouse Score</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">24-48<span>h</span></p>
                  <p className="metric-label">Turnaround Window</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Narrative Content */}
          <div className="about-right">
            
            <div className="badge-tag">
              WHAT IS AI CONCEPT
            </div>

            <h2 className="about-heading">
              Engineering High-Impact Digital Presence at{" "}
              <span className="gradient-text">Breakneck Speed.</span>
            </h2>

            <p className="about-description">
              Traditional agencies take weeks and months. We deliver high-performing, conversion-focused digital experiences in <strong>24 to 48 hours</strong> with zero compromise on quality—that is the <strong className="brand-highlight">AI Concept</strong> guarantee.
            </p>

            {/* Value Highlights */}
            <div className="highlights-list">
              {highlights.map((item, idx) => (
                <div key={idx} className="highlight-card">
                  <div className="highlight-info">
                    <h3 className="highlight-title">{item.title}</h3>
                    <p className="highlight-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Row */}
            <div className="about-footer">
              <span className="footer-scope">
                E-Commerce • Portfolio • Shopify • Custom SaaS
              </span>
              <a href="#services" className="cta-link">
                Explore Sprint Packages <span>↗</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutAIConcept;