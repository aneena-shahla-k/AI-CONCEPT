import React, { useState } from "react";
import { Clock, Check, ArrowUpRight, ShieldCheck, Rocket, Timer } from "lucide-react";
import "./TimeSprintSelector.css";

const sprintData = {
  "24": {
    label: "24 HOURS",
    badge: "RAPID BUILD",
    headline: "Urgent Execution & Rapid Validation",
    value: "$1,560",
    description: "Configured for urgent campaign pages, quick automations, or standalone high-converting MVPs.",
    scope: [
      "High-converting landing pages",
      "UI / UX performance overhauls",
      "Interactive prototypes & MVPs",
      "API integrations & fixes"
    ]
  },
  "48": {
    label: "48 HOURS",
    badge: "MOST POPULAR",
    headline: "Full Web Platform",
    value: "$2,880",
    description: "Complete web application or core system module ready for deployment.",
    scope: [
      "Business websites",
      "E-commerce checkout",
      "Booking platforms",
      "Admin dashboards"
    ]
  },
  "72": {
    label: "72 HOURS",
    badge: "EXTENDED ARCHITECTURE",
    headline: "Multi-Surface Operational Platform",
    value: "$3,960",
    description: "For connected web storefronts, native mobile apps, and ERP database back-offices.",
    scope: [
      "Cross-platform iOS & Android apps",
      "Inventory & POS sync engines",
      "Custom internal operations ERP",
      "Automated AI pipelines"
    ]
  },
  "custom": {
    label: "CUSTOM",
    badge: "ENTERPRISE ECOSYSTEM",
    headline: "Full-Scale Custom Architecture",
    value: "Custom Scope",
    description: "For complex software architectures, legacy migrations, and large AI systems.",
    scope: [
      "SaaS product builds from scratch",
      "Dedicated senior architecture pod",
      "Fine-tuned proprietary AI models",
      "Full digital infrastructure cutover"
    ]
  }
};

export default function TimeSprintSelector({ onOpenProject }) {
  const [activeKey, setActiveKey] = useState("48");
  const current = sprintData[activeKey];

  return (
    <section className="glass-sprint-section">
      {/* Ambient Liquid Gradient Blobs */}
      <div className="liquid-orb orb-1" />
      <div className="liquid-orb orb-2" />

      <div className="glass-sprint-container">
        
        {/* Header */}
        <div className="glass-sprint-header"  data-aos="fade-up"
     data-aos-duration="3000">
          <h2 className="glass-sprint-title">Choose Your Sprint Window</h2>
        </div>

        {/* Apple-Style Glass Pill Tabs */}
        <div className="glass-tabs-wrapper">
          <div className="glass-tabs-bar">
            {Object.keys(sprintData).map((key) => (
              <button
                key={key}
                type="button"
                className={`glass-tab-btn ${activeKey === key ? "is-active" : ""}`}
                onClick={() => setActiveKey(key)}
              >
                <Clock size={14} />
                <span>{sprintData[key].label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Master Frosted Glass Card */}
        <div className="glass-master-card">
          <div className="glass-sheen-overlay" />
          
          {/* Left Content Column */}
          <div className="glass-card-left">
            <span className="glass-badge-pill">{current.badge}</span>
            <h3 className="glass-card-title">{current.headline}</h3>
            <p className="glass-card-desc">{current.description}</p>

            <div className="glass-scope-grid">
              {current.scope.map((item, idx) => (
                <div key={idx} className="glass-scope-item">
                  <div className="glass-check-wrap">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Inner Liquid Glass Pocket */}
          <div className="glass-card-right">
            <div className="glass-inner-pocket">
              <div className="glass-clock-icon-box">
                <Clock size={18} />
              </div>

              <span className="glass-metric-lbl">ESTIMATED CAPACITY</span>
              <span className="glass-metric-hrs">{current.label}</span>
              
              <div className="glass-inner-divider" />
              
              <span className="glass-metric-lbl">ESTIMATED VALUE</span>
              <span className="glass-metric-val">{current.value}</span>

              <button
                type="button"
                className="liquid-cta-btn"
                onClick={onOpenProject}
              >
                <span>Lock This Window</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Glass Strip */}
        <div className="glass-bottom-strip">
          <div className="glass-strip-item">
            <div className="glass-strip-icon">
              <Timer size={17} />
            </div>
            <div>
              <strong>Fixed sprint window</strong>
              <span>Clear start & end</span>
            </div>
          </div>

          <div className="glass-strip-sep" />

          <div className="glass-strip-item">
            <div className="glass-strip-icon">
              <ShieldCheck size={17} />
            </div>
            <div>
              <strong>Scope confirmed</strong>
              <span>Before sprint starts</span>
            </div>
          </div>

          <div className="glass-strip-sep" />

          <div className="glass-strip-item">
            <div className="glass-strip-icon">
              <Rocket size={17} />
            </div>
            <div>
              <strong>Fast delivery</strong>
              <span>Results you can use</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}