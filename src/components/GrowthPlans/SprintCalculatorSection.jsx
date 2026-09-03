import React, { useState } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import "./SprintCalculatorSection.css";

const serviceOptions = [
  { id: "web", name: "Website Platform" },
  { id: "ecom", name: "E-Commerce Storefront" },
  { id: "app", name: "Mobile App (iOS/Android)" },
  { id: "booking", name: "Booking Platform" },
  { id: "erp", name: "ERP & Back-Office" },
  { id: "custom", name: "Custom Software" },
  { id: "ai_dev", name: "AI Agent Development" },
  { id: "ai_auto", name: "AI Automation Flow" },
  { id: "integrations", name: "System Integration" },
];

const urgencyRates = {
  normal: { label: "Normal (Standard Sprint)", rate: 55 },
  priority: { label: "Priority (+25% Faster Allocation)", rate: 65 },
  express: { label: "Express 24/48H Pod (Urgent Deployment)", rate: 80 },
};

export default function SprintCalculatorSection({ onOpenProject }) {
  const [selectedServices, setSelectedServices] = useState(["web"]);
  const [hoursSprint, setHoursSprint] = useState(48);
  const [urgency, setUrgency] = useState("normal");

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const ratePerHour = urgencyRates[urgency].rate;
  const estimatedCost = hoursSprint * ratePerHour;

  return (
    <section className="gp-calculator-section" id="calculator">
      <div className="gp-container">
        
        <div className="gp-section-header" data-aos="zoom-out-up">
          <h2 className="gp-section-title">Configure Your Solution Route</h2>
        </div>

        <div className="gp-calc-card">
          {/* Step 1 */}
          <div className="gp-calc-step">
            <span className="gp-calc-step-label">1. SELECT REQUIRED MODULES</span>
            <div className="gp-calc-chips" >
              {serviceOptions.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`gp-calc-chip ${isSelected ? "is-selected" : ""}`}
                    onClick={() => toggleService(service.id)}
                  >
                    <span className="gp-calc-dot" />
                    <span>{service.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 */}
          <div className="gp-calc-step">
            <span className="gp-calc-step-label">2. CHOOSE DEVELOPMENT HOURS SPRINT</span>
            <div className="gp-calc-hours-strip">
              {[12, 24, 48, 72, 100].map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`gp-calc-hour-btn ${hoursSprint === h ? "is-active" : ""}`}
                  onClick={() => setHoursSprint(h)}
                >
                  <Clock size={13} />
                  <span>{h === 100 ? "100+ HRS" : `${h} HRS`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="gp-calc-step">
            <span className="gp-calc-step-label">3. SPRINT ALLOCATION URGENCY</span>
            <div className="gp-calc-urgency-grid">
              {Object.keys(urgencyRates).map((key) => {
                const u = urgencyRates[key];
                const isCurrent = urgency === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`gp-calc-urgency-btn ${isCurrent ? "is-active" : ""}`}
                    onClick={() => setUrgency(key)}
                  >
                    <span className="gp-calc-urgency-title">{key.toUpperCase()}</span>
                    <span className="gp-calc-urgency-sub">{u.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4 */}
          <div className="gp-calc-summary">
            <div className="gp-calc-summary-left">
              <span className="gp-calc-summary-tag">ESTIMATED SPRINT SPECIFICATION:</span>
              <div className="gp-calc-summary-meta">
                <span>{hoursSprint} Development Hours</span>
                <span>•</span>
                <span>{selectedServices.length} Modules</span>
                <span>•</span>
                <span>${ratePerHour}/hr Allocation</span>
              </div>
            </div>

            <div className="gp-calc-summary-right">
              <span className="gp-calc-total-val">${estimatedCost.toLocaleString()}</span>
              <button
                type="button"
                className="gp-calc-submit-btn"
                onClick={() => onOpenProject && onOpenProject()}
              >
                <span>Lock In Project Brief</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}