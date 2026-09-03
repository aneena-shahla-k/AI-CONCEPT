import React from 'react';
import { ArrowRight } from 'lucide-react';
import './HowWeWork.css';

const steps = [
  {
    number: "01",
    color: "#9ae1d7", // Teal
    title: "Discover",
    desc: "Analyze business landscape, user personas, and target viability to establish baseline metrics.",
  },
  {
    number: "02",
    color: "#cbc1eb", // Soft Purple
    title: "Design Route",
    desc: "Architecting revenue models, system blueprints, and conversion-focused customer journeys.",
  },
  {
    number: "03",
    color: "#b1d8e9", // Sky Blue
    title: "Build Systems",
    desc: "Engineering scalable web platforms, native mobile applications, custom ERP, and autonomous AI.",
  },
  {
    number: "04",
    color: "#b2e6c5", // Leaf Green
    title: "Connect",
    desc: "Unifying funnels, payments, inventory, and back-office databases into a single pipeline.",
  },
  {
    number: "05",
    color: "#e9c6a9", // Warm Coral
    title: "Hand Over",
    desc: "Delivering complete code ownership, operational documentation, and turnkey architecture.",
  }
];

export default function HowWeWork({ onOpenProject }) {
  return (
    <section className="hww-clean-section">
      <div className="hww-clean-container">
        
        {/* Header Block */}
        <div className="hww-clean-header" data-aos="fade-up">
          <h2 className="hww-clean-title">
            How We Work.<br />
            <span className="hww-title-gradient">From Discovery to Full Control.</span>
          </h2>
          
        </div>

        {/* Seamless 5-Step Track (No White Card Box) */}
        <div className="hww-pure-track">
          {steps.map((item) => (
            <div key={item.number} className="hww-pure-col">
              
              {/* Reference 3D Paper-Cut Pocket Slot */}
              <div className="hww-slot-wrapper">
                <span className="hww-slot-number" style={{ color: item.color }}>
                  {item.number}
                </span>
                {/* Visual slit with realistic shadow underneath */}
                <div className="hww-slit-shelf" />
              </div>

              {/* Title & Description */}
              <div className="hww-pure-content" data-aos="fade-up">
                <h3 className="hww-pure-title">{item.title}</h3>
                <p className="hww-pure-desc">{item.desc}</p>
              </div>

              

            </div>
          ))}
        </div>

        {/* Minimal Action Row */}
        <div className="hww-clean-footer">
          <div className="hww-footer-note">
            <span className="hww-green-dot" />
            <span>Turnkey Hand-off • Zero Vendor Dependency</span>
          </div>
          <button 
            type="button" 
            className="hww-action-btn"
            onClick={onOpenProject}
          >
            <span>Initiate Step 01</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}