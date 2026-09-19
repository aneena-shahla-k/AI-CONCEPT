import React, { useState } from "react";
import "./TimeBasedService.css";

export default function TimeBasedService() {
  const [selectedTime, setSelectedTime] = useState("24h");
  const [hourlyRate] = useState(500);

  const routeData = {
    "24h": {
      hours: 24,
      progress: "12%",
      name: "Rapid Route",
      description: "A small, clearly defined development allocation.",
      scope: [
        "Landing page",
        "Small website",
        "UI implementation",
        "Bug fixes",
        "Small integration",
        "Prototype",
        "AI feature",
        "Automation task",
      ],
    },

    "48h": {
      hours: 48,
      progress: "36%",
      name: "Accelerated Route",
      description: "Suitable for a larger defined scope.",
      scope: [
        "Multi-page website",
        "E-commerce setup",
        "Booking module",
        "Dashboard",
        "API integration",
        "AI feature set",
      ],
    },

    "72h": {
      hours: 72,
      progress: "64%",
      name: "Extended Route",
      description: "For larger and more complex development needs.",
      scope: [
        "Larger websites",
        "Custom portals",
        "Advanced booking",
        "Business dashboards",
        "Multiple integrations",
        "Complex AI functionality",
      ],
    },

    custom: {
      hours: 120,
      progress: "90%",
      name: "Custom Route",
      description: "For complex business systems and software.",
      scope: [
        "ERP modules",
        "Custom business systems",
        "SaaS MVP",
        "Complex e-commerce",
        "Multi-system integration",
        "Advanced AI software",
      ],
    },
  };

  const currentRoute = routeData[selectedTime];
  const estimatedValue = currentRoute.hours * hourlyRate;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleRouteStart = () => {
    alert(
      `${currentRoute.name} selected — ${currentRoute.hours} development hours allocated.`
    );
  };

  return (
    <section className="tm-tbs-section">
      <div className="tm-tbs-container">

        {/* =====================================================
            TOP HEADER
        ===================================================== */}
        <div className="tm-tbs-top-header">
          <div className="tm-tbs-header-left">
            <span className="tm-tbs-sub-tag">TIME MODEL</span>

            <h2 className="tm-tbs-title">
              Choose your
              <br />
              <i>development allocation.</i>
            </h2>

            <p className="tm-tbs-subtitle">
              Your scope. Your hours. Your build.
            </p>
          </div>

          
        </div>

        {/* =====================================================
            PACKAGE CARDS
        ===================================================== */}
        <div className="tm-tbs-cards-row">
          {[
            {
              id: "24h",
              num: "01",
              title: "24 HOURS",
              name: "Rapid Route",
              desc: "A small, clearly defined development allocation.",
            },
            {
              id: "48h",
              num: "02",
              title: "48 HOURS",
              name: "Accelerated Route",
              desc: "Suitable for a larger defined scope.",
            },
            {
              id: "72h",
              num: "03",
              title: "72 HOURS",
              name: "Extended Route",
              desc: "For larger and more complex development needs.",
            },
            {
              id: "custom",
              num: "04",
              title: "120 HOURS",
              name: "Custom Route",
              desc: "For complex business systems and software.",
            },
          ].map((card) => (
            <div
              key={card.id}
              className={`tm-tbs-plan-card ${
                selectedTime === card.id ? "active" : ""
              }`}
              onClick={() => setSelectedTime(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedTime(card.id);
                }
              }}
            >
              <div className="tm-tbs-card-top">
                <span className="tm-tbs-card-num">{card.num}</span>

                <span className="tm-tbs-radio-dot">
                  {selectedTime === card.id && (
                    <span className="tm-tbs-radio-inner"></span>
                  )}
                </span>
              </div>

              <h3 className="tm-tbs-card-time">{card.title}</h3>

              <h4 className="tm-tbs-card-name">{card.name}</h4>

              <p className="tm-tbs-card-desc">{card.desc}</p>

              <div className="tm-tbs-card-price">
                {formatCurrency(routeData[card.id].hours * hourlyRate)}
              </div>

              <div className="tm-tbs-card-price-label">
                {routeData[card.id].hours} hrs × ₹{hourlyRate}/hr
              </div>

              <div className="tm-tbs-card-arrow">→</div>
            </div>
          ))}
        </div>

        {/* =====================================================
            INTERACTIVE GRID
        ===================================================== */}
        <div className="tm-tbs-interactive-grid">

          {/* ===================================================
              ALLOCATION STATUS PANEL
          =================================================== */}
          <div className="tm-tbs-countdown-panel">
            <div>
              <span className="tm-tbs-panel-tag">
                DEVELOPMENT ALLOCATION
              </span>

              <span className="tm-tbs-panel-title">
                SELECTED DEVELOPMENT HOURS
              </span>

              <div className="tm-tbs-timer-digits">
                {String(currentRoute.hours).padStart(3)}
                <span className="tm-tbs-hours-suffix"> HRS</span>
              </div>

              <div className="tm-tbs-timer-labels">
                <span>ALLOCATED</span>
                <span>₹{hourlyRate} / HOUR</span>
              </div>
            </div>

            <div>
              <div className="tm-tbs-route-status">
                <span className="tm-tbs-lime-dot"></span>

                <span>{currentRoute.name.toUpperCase()} SELECTED</span>
              </div>

              <div className="tm-tbs-progress-footer">
                <div className="tm-tbs-progress-text">
                  <span>Allocation</span>

                  <strong>
                    {currentRoute.hours} development hours
                  </strong>
                </div>

                <div className="tm-tbs-progress-bar-bg">
                  <div
                    className="tm-tbs-progress-bar-fill"
                    style={{
                      width: currentRoute.progress,
                    }}
                  ></div>
                </div>

                <span className="tm-tbs-perc">
                  {currentRoute.progress}
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              ROUTE VISUALIZATION
          =================================================== */}
          <div className="tm-tbs-map-panel-clean">
            <div className="tm-tbs-map-top-label">
              DEVELOPMENT ROUTE
            </div>

            <div className="tm-tbs-curved-route-container">
              <svg
                className="tm-tbs-svg-path"
                viewBox="0 0 600 150"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 50,90 Q 150,10 260,85 T 550,75"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                />
              </svg>

              {/* 24 HOURS */}
              <div
                className={`tm-tbs-map-node tm-node-24 ${
                  selectedTime === "24h" ? "active-glow" : ""
                }`}
                onClick={() => setSelectedTime("24h")}
              >
                <div className="tm-node-info">
                  <span className="tm-node-val">24</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Rapid Route</small>
                </div>

                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>

                <span className="tm-node-idea">FOCUSED SCOPE</span>
              </div>

              {/* 48 HOURS */}
              <div
                className={`tm-tbs-map-node tm-node-48 ${
                  selectedTime === "48h" ? "active-glow" : ""
                }`}
                onClick={() => setSelectedTime("48h")}
              >
                <div className="tm-node-info">
                  <span className="tm-node-val">48</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Accelerated Route</small>
                </div>

                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
              </div>

              {/* 72 HOURS */}
              <div
                className={`tm-tbs-map-node tm-node-72 ${
                  selectedTime === "72h" ? "active-glow" : ""
                }`}
                onClick={() => setSelectedTime("72h")}
              >
                <div className="tm-node-info">
                  <span className="tm-node-val">72</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Extended Route</small>
                </div>

                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
              </div>

              {/* 120 HOURS */}
              <div
                className={`tm-tbs-map-node tm-node-custom ${
                  selectedTime === "custom" ? "active-glow" : ""
                }`}
                onClick={() => setSelectedTime("custom")}
              >
                <div className="tm-node-info">
                  <span className="tm-node-val">120</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Custom Route</small>
                </div>

                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
              </div>

              {/* MOVING INDICATOR */}
              <div
                className="tm-tbs-moving-car-wrapper"
                style={{
                  left: currentRoute.progress,
                }}
              >
                <div className="tm-tbs-realistic-car">
                  <div className="tm-car-roof"></div>
                  <div className="tm-car-windshield-front"></div>
                  <div className="tm-car-windshield-rear"></div>
                </div>
              </div>
            </div>

            <div className="tm-tbs-map-footer">
              <div className="tm-tbs-idea-badge">
                <span className="tm-tbs-target-icon-sm">◎</span>

                <span className="tm-tbs-idea-text">
                  From idea
                  <br />
                  to impact. Fast.
                </span>
              </div>

              <div className="tm-tbs-gps-text">
                <span className="tm-tbs-lime-dot-sm"></span>{" "}
                <strong>DEVELOPMENT ROUTE ACTIVE</strong>
                <br />

                <small>
                  {currentRoute.hours} HOURS · ₹{hourlyRate}/HR
                </small>
              </div>
            </div>
          </div>

          {/* ===================================================
              CALCULATOR
          =================================================== */}
          <div className="tm-tbs-calculator-panel">
            <span className="tm-tbs-calc-header-tag">
              DEVELOPMENT HOURS CALCULATOR
            </span>

            <div className="tm-tbs-rate-display">
              <span>Base Hourly Rate</span>

              <strong>₹{hourlyRate}</strong>

              <small>per development hour</small>
            </div>

            <div className="tm-tbs-input-group">
              <label htmlFor="development-time">
                Development Allocation
              </label>

              <select
                id="development-time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="24h">24 hours — Rapid Route</option>
                <option value="48h">48 hours — Accelerated Route</option>
                <option value="72h">72 hours — Extended Route</option>
                <option value="custom">120 hours — Custom Route</option>
              </select>
            </div>

            <div className="tm-tbs-value-box">
              <span>Estimated Service Value</span>

              <strong>{formatCurrency(estimatedValue)}</strong>

              <small>Based on ₹{hourlyRate}/hour</small>
            </div>

            <button
              className="tm-tbs-start-route-btn"
              onClick={handleRouteStart}
            >
              Select This Allocation →
            </button>
          </div>
        </div>

        {/* =====================================================
            SELECTED SCOPE
        ===================================================== */}
        <div className="tm-tbs-scope-panel">
          <div className="tm-tbs-scope-header">
            <div>
              <span className="tm-tbs-scope-tag">
                SELECTED PACKAGE
              </span>

              <h3>
                {currentRoute.name}
              </h3>

              <p>
                {currentRoute.description}
              </p>
            </div>

            <div className="tm-tbs-scope-hours">
              <strong>{currentRoute.hours}</strong>
              <span>HOURS</span>
            </div>
          </div>

          <div className="tm-tbs-scope-list">
            {currentRoute.scope.map((item, index) => (
              <div
                className="tm-tbs-scope-item"
                key={`${item}-${index}`}
              >
                <span className="tm-tbs-scope-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM METRICS
        ===================================================== */}
        <div className="tm-tbs-bottom-metrics">
          <div className="tm-tbs-bm-item">
            <span className="tm-tbs-bm-icon">⏱</span>

            <div>
              <strong>
                Development is scoped in hours
              </strong>

              <p>
                Final delivery time depends on project scope,
                requirements and complexity.
              </p>
            </div>
          </div>

          <div className="tm-tbs-bm-stat">
            <strong>₹500</strong>
            <span>Base Hourly Rate</span>
          </div>

          <div className="tm-tbs-bm-stat">
            <strong>24+</strong>
            <span>Starting Hours</span>
          </div>

          <div className="tm-tbs-bm-stat">
            <strong>120</strong>
            <span>Custom Allocation</span>
          </div>

          <div className="tm-tbs-bm-stat">
            <strong>100%</strong>
            <span>Scope Focused</span>
          </div>
        </div>
      </div>
    </section>
  );
}