// GpsPhilosophy.jsx
import React from 'react';
import './GpsPhilosophy.css';

const comparisonData = {
  traditional: {
    tag: "Traditional Agency",
    headline: "“Give us the business, we'll manage everything.”",
    points: [
      "Retainer locks & high dependency",
      "Opaque technical bottlenecks",
      "You rent their team & output",
      "You remain a passenger in your company"
    ]
  },
  ourModel: {
    tag: "Our Philosophy",
    headline: "“We build the route. You take the wheel.”",
    points: [
      "Complete ownership & clear blueprints",
      "Tailored technology, ERP & AI architecture",
      "Autonomous systems built for your team",
      "You drive the business with total control"
    ]
  }
};

const routeSteps = [
  { step: "01", label: "Identify Opportunity", desc: "Market & revenue validation" },
  { step: "02", label: "Design Strategy", desc: "Monetization & brand positioning" },
  { step: "03", label: "Build Tech & Systems", desc: "Web, ERP, CRM & AI infrastructure" },
  { step: "04", label: "Hand Off the Wheel", desc: "Clear turn-by-turn execution" }
];

const GpsPhilosophy = () => {
  return (
    <section className="gps-phil-section">
      <div className="gps-ambient-glow" />

      <div className="gps-phil-container">
        
        {/* Section Header */}
        <div className="gps-phil-header">
          <div className="gps-badge">
            <span className="gps-pulse-beacon" />
            <span>THE GPS PHILOSOPHY</span>
          </div>
          
          <h2 className="gps-phil-title">
            We Sell the GPS. <br />
            <span className="gps-gradient-title">You Drive.</span>
          </h2>
          
          <p className="gps-phil-lead">
            We don't believe in building client dependency. We build the complete route—systems, 
            technology, and strategy—so your business can run and scale under your command.
          </p>
        </div>

        {/* Philosophy Comparison Cards */}
        <div className="gps-comparison-grid">
          
          {/* Traditional Card */}
          <div className="comparison-card traditional-card">
            <div className="comp-tag-badge dim">{comparisonData.traditional.tag}</div>
            <h3 className="comp-headline">{comparisonData.traditional.headline}</h3>
            <ul className="comp-list">
              {comparisonData.traditional.points.map((p, idx) => (
                <li key={idx}>
                  <span className="comp-cross">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Our GPS Model Card */}
          <div className="comparison-card signature-card">
            <div className="comp-tag-badge active">{comparisonData.ourModel.tag}</div>
            <h3 className="comp-headline active-headline">{comparisonData.ourModel.headline}</h3>
            <ul className="comp-list">
              {comparisonData.ourModel.points.map((p, idx) => (
                <li key={idx}>
                  <span className="comp-check">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Route Breakdown Strip */}
        <div className="route-strip">
          <div className="route-strip-header">
            <span className="strip-title">THE TURN-BY-TURN BLUEPRINT</span>
          </div>
          <div className="route-step-grid">
            {routeSteps.map((item, idx) => (
              <div key={idx} className="route-step-card">
                <span className="route-step-num">{item.step}</span>
                <h4 className="route-step-label">{item.label}</h4>
                <p className="route-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GpsPhilosophy;