// src/components/Home/TimeSprintSelector.jsx
import React, { useState } from "react";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import "./TimeSprintSelector.css";

const sprintData = {
  "24": {
    label: "24 HOURS",
    badge: "Rapid Build Sprint",
    headline: "Urgent Execution & Rapid Validation",
    rate: "$65 / hr",
    value: "$1,560",
    description: "Configured for urgent requirements, standalone high-converting campaign pages, or quick system automations.",
    scope: [
      "High-converting landing pages",
      "UI / UX performance overhauls",
      "Interactive prototypes & MVP pilots",
      "Stripe / WhatsApp API integrations",
      "Bug remediation & speed optimization"
    ]
  },
  "48": {
    label: "48 HOURS",
    badge: "Accelerated Business Solution",
    headline: "Full Web Platform or Core System Module",
    rate: "$60 / hr",
    value: "$2,880",
    description: "Our standard sprint window to deliver a complete responsive web application or database back-office.",
    scope: [
      "Complete multi-page business websites",
      "Headless E-Commerce components & checkout",
      "Self-serve appointment booking platforms",
      "Client intake & dashboard consoles",
      "AI conversational agent triage embedded"
    ]
  },
  "72": {
    label: "72 HOURS",
    badge: "Extended Architecture Sprint",
    headline: "Multi-Surface Operational Platform",
    rate: "$55 / hr",
    value: "$3,960",
    description: "For connected operations requiring synchronized web storefronts, native mobile apps, and ERP database back-offices.",
    scope: [
      "Cross-platform iOS & Android apps",
      "Inventory & POS sync engines",
      "Custom internal operations ERP",
      "Automated document OCR & AI pipelines",
      "Multi-tenant role permissions & billing"
    ]
  },
  "custom": {
    label: "CUSTOM",
    badge: "Enterprise Ecosystem",
    headline: "Full-Scale Route Architecture",
    rate: "Variable / Milestone",
    value: "Custom Scope",
    description: "For complex software architectures, legacy database migrations, and large-scale AI automation ecosystems.",
    scope: [
      "SaaS product builds from zero to launch",
      "Multi-warehouse logistics telematics",
      "Fine-tuned proprietary AI models",
      "Complete company-wide digital cutover",
      "Dedicated senior architecture pod"
    ]
  }
};

export default function TimeSprintSelector({ onOpenProject }) {
  const [activeKey, setActiveKey] = useState("48");
  const current = sprintData[activeKey];

  return (
    <section className="sprint-section">
      <div className="sprint-container">
        {/* Header */}
        <div className="sprint-header">
          <span className="sprint-eyebrow">TIME-BASED DEVELOPMENT CAPACITY</span>
          <h2 className="sprint-title">How Much Time Do You Want to Invest?</h2>
          <p className="sprint-sub">
            We operate in calibrated sprint windows. Select your turnaround capacity to view deliverable scope.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="sprint-tabs">
          {Object.keys(sprintData).map((key) => (
            <button
              key={key}
              type="button"
              className={`sprint-tab-btn ${activeKey === key ? "is-active" : ""}`}
              onClick={() => setActiveKey(key)}
            >
              <Clock size={13} />
              <span>{sprintData[key].label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Card */}
        <div className="sprint-card">
          <div className="sprint-card-left">
            <span className="sprint-badge">{current.badge}</span>
            <h3 className="sprint-card-title">{current.headline}</h3>
            <p className="sprint-card-desc">{current.description}</p>

            <span className="sprint-scope-label">DELIVERABLE IN THIS WINDOW:</span>
            <div className="sprint-scope-grid">
              {current.scope.map((item, idx) => (
                <div key={idx} className="sprint-scope-item">
                  <Check size={13} className="sprint-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sprint-card-right">
            <div className="sprint-metric-box">
              <span className="sprint-metric-lbl">ESTIMATED CAPACITY</span>
              <span className="sprint-metric-hrs">{current.label}</span>
              <div className="sprint-divider" />
              <span className="sprint-metric-lbl">ESTIMATED SERVICE VALUE</span>
              <span className="sprint-metric-val">{current.value}</span>
            </div>

            <button
              type="button"
              className="sprint-cta-btn"
              onClick={onOpenProject}
            >
              <span>Lock This Sprint Window</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="sprint-disclaimer">
          *Note: Presented as estimated development sprint capacity. Precise project scope and deliverables are validated during technical blueprint discovery.
        </p>
      </div>
    </section>
  );
}