import React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import "./BlueprintTiersSection.css";

const tiers = [
  {
    badge: "EARLY STAGE",
    name: "Starter Route",
    timeline: "2-Week Turnaround",
    features: [
      "Market Viability & ICP Analysis",
      "Core Monetization Architecture",
      "MVP Web / App Tech Specifications",
      "30-Day Go-to-Market Action Plan",
      "Master Route Blueprint (20+ Pages)",
    ],
    popular: false,
  },
  {
    badge: "RECOMMENDED",
    name: "Scale Blueprint",
    timeline: "3-Week Turnaround",
    features: [
      "Complete 8-Pillar Strategic Roadmap",
      "Full Tech Stack Spec (Web, App, CRM)",
      "E-Commerce / Booking Funnel Architecture",
      "AI Automation & Workflow Pipelines",
      "60-Day Turn-by-Turn Execution Roadmap",
      "Interactive Architecture Diagram (Figma)",
    ],
    popular: true,
  },
  {
    badge: "ENTERPRISE",
    name: "Custom Infrastructure",
    timeline: "4-Week Turnaround",
    features: [
      "Full Enterprise Ecosystem Design",
      "Custom ERP & Back-Office Architecture",
      "Proprietary AI Assistant & Agent Modeling",
      "Operational SOPs & Succession Playbook",
      "90-Day Guided Execution Milestones",
      "Direct Strategy Hand-off Sessions",
    ],
    popular: false,
  },
];

export default function BlueprintTiersSection({ onOpenProject }) {
  return (
    <section className="gp-packages-section" id="packages">
      <div className="gp-container">
        
        <div className="gp-section-header" data-aos="zoom-out-up">
          <h2 className="gp-section-title">Select Your Strategic Route</h2>
        </div>

        <div className="gp-packages-grid">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`gp-package-card ${tier.popular ? "is-popular" : ""}`} data-aos="flip-right">
              {tier.popular && <span className="gp-popular-badge">RECOMMENDED ROUTE</span>}
              <div className="gp-package-header">
                <span className="gp-package-badge">{tier.badge}</span>
                <h3 className="gp-package-name">{tier.name}</h3>
                <p className="gp-package-desc">{tier.desc}</p>
                <span className="gp-package-time">{tier.timeline}</span>
              </div>

              <hr className="gp-package-divider" />

              <ul className="gp-package-features">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <Check size={14} className="gp-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`gp-package-btn ${tier.popular ? "btn-highlight" : "btn-subtle"}`}
                onClick={() => onOpenProject && onOpenProject()}
              >
                <span>Request This Blueprint</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}