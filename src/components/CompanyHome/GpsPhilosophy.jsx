import React from 'react';
import { 
  X, 
  Check, 
  Compass, 
  Search, 
  Cpu, 
  KeyRound, 
  ArrowRight 
} from 'lucide-react';
import './GpsPhilosophy.css';

const comparisonData = {
  traditional: {
    tag: "Traditional Agency Model",
    headline: "“Give us the business, we'll manage everything.”",
    points: [
      "Retainer locks & continuous client dependency",
      "Opaque technical bottlenecks and hidden code",
      "You rent their team, time, and temporary output",
      "You remain a permanent passenger in your own company"
    ]
  },
  ourModel: {
    tag: "Our Turnkey GPS Philosophy",
    badge: "Full Client Ownership",
    headline: "“We build the route. You take the wheel.”",
    points: [
      "Complete code ownership & clear architecture blueprints",
      "Tailored technology, enterprise ERP & AI automation",
      "Autonomous operating systems engineered for your internal team",
      "You drive and expand the business with absolute authority"
    ]
  }
};

const routeSteps = [
  { 
    step: "01", 
    label: "Identify Opportunity", 
    desc: "Market & revenue validation",
    icon: <Search size={16} />
  },
  { 
    step: "02", 
    label: "Design Strategy", 
    desc: "Monetization & brand positioning",
    icon: <Compass size={16} />
  },
  { 
    step: "03", 
    label: "Build Tech & Systems", 
    desc: "Web, ERP, CRM & AI pipelines",
    icon: <Cpu size={16} />
  },
  { 
    step: "04", 
    label: "Hand Off the Wheel", 
    desc: "Clear turn-by-turn execution",
    icon: <KeyRound size={16} />
  }
];

export default function GpsPhilosophy() {
  return (
    <section className="gps-phil-section">
      <div className="gps-ambient-glow" />

      <div className="gps-phil-container">
        
        {/* Section Header */}
        <div className="gps-phil-header" data-aos="zoom-in-down">
          <h2 className="gps-phil-title">
            We Sell the GPS. <br />
            <span className="gps-gradient-title">You Drive.</span>
          </h2>
        </div>

        {/* Philosophy Comparison Cards */}
        <div className="gps-comparison-grid">
          
          {/* Traditional Agency Card */}
          <div className="comparison-card traditional-card" data-aos="zoom-in-down">
            <div className="comp-tag-header" data-aos="zoom-in-down">
              <span className="comp-tag-badge dim">{comparisonData.traditional.tag}</span>
            </div>
            <h3 className="comp-headline">{comparisonData.traditional.headline}</h3>
            <ul className="comp-list">
              {comparisonData.traditional.points.map((p, idx) => (
                <li key={idx}>
                  <div className="comp-icon-pill cross">
                    <X size={12} strokeWidth={2.5} />
                  </div>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our GPS Model Card */}
          <div className="comparison-card signature-card" data-aos="zoom-in-down">
            <div className="comp-tag-header" data-aos="zoom-in-down">
              <span className="comp-tag-badge active">{comparisonData.ourModel.tag}</span>
              <span className="comp-ownership-pill">{comparisonData.ourModel.badge}</span>
            </div>
            <h3 className="comp-headline active-headline">{comparisonData.ourModel.headline}</h3>
            <ul className="comp-list">
              {comparisonData.ourModel.points.map((p, idx) => (
                <li key={idx}>
                  <div className="comp-icon-pill check">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Route Breakdown Strip */}
        <div className="route-strip">
          <div className="route-strip-header">
            <span className="strip-title">THE TURN-BY-TURN BLUEPRINT</span>
            <span className="strip-subtitle">Complete Architecture Hand-off</span>
          </div>

          <div className="route-step-grid">
            {routeSteps.map((item, idx) => (
              <React.Fragment key={item.step}>
                <div className="route-step-card">
                  <div className="route-icon-box">
                    {item.icon}
                    <span className="route-num-tag">{item.step}</span>
                  </div>
                  <div className="route-text-meta">
                    <h4 className="route-step-label">{item.label}</h4>
                    <p className="route-step-desc">{item.desc}</p>
                  </div>
                </div>

                {idx < routeSteps.length - 1 && (
                  <div className="route-step-divider">
                    <ArrowRight size={14} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}