import React, { useState } from "react";
import { 
  Calculator, 
  Check, 
  ArrowUpRight, 
  Timer,
  ShieldCheck 
} from "lucide-react";
import "./EstimatorSection.css";

const platforms = [
  { id: "web", name: "Web Application", baseScope: "Modern Responsive React / Next.js Setup", formType: "website" },
  { id: "mobile", name: "Mobile App (iOS/Android)", baseScope: "Cross-Platform Native Bridge", formType: "app" },
  { id: "full", name: "Web + Mobile Suite", baseScope: "Unified Full-Stack Ecosystem", formType: "ai" },
];

const featureMatrix = [
  { id: "auth", name: "User Auth & Multi-Role RBAC" },
  { id: "pay", name: "Payment Gateway (Stripe / Razorpay)" },
  { id: "ai", name: "Private AI Assistant / LLM Chat" },
  { id: "booking", name: "Real-time Slot Booking Engine" },
  { id: "dash", name: "Custom Analytics & Admin CRM" },
  { id: "notif", name: "SMS / WhatsApp Automation" },
  { id: "db", name: "Tailored Database Schema & Cloud" },
  { id: "seo", name: "Performance & Core Web Vitals" },
];

export default function EstimatorSection({ onLockSpec }) {
  const [platform, setPlatform] = useState(platforms[0]);
  const [selectedFeatures, setSelectedFeatures] = useState(["auth", "pay"]);

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const getTier = () => {
    const count = selectedFeatures.length;
    if (count <= 2) return { name: "FLASH SPRINT", window: "24–42 HOURS" };
    if (count <= 5) return { name: "GROWTH PLATFORM", window: "3–6 DAYS" };
    return { name: "ENTERPRISE CORE", window: "CUSTOM MILESTONES" };
  };

  const currentTier = getTier();

  const handleLockClick = () => {
    const activeModuleNames = featureMatrix
      .filter((f) => selectedFeatures.includes(f.id))
      .map((f) => f.name);

    if (onLockSpec) {
      onLockSpec({
        formType: platform.formType,
        platformName: platform.name,
        tierName: currentTier.name,
        deliveryWindow: currentTier.window,
        modules: activeModuleNames,
      });
    }
  };

  return (
    <section className="est-section" id="estimator">
      <div className="est-container">
        
        {/* Header */}
        <div className="est-header">
          <div className="est-eyebrow">
            <span className="est-dot" />
            <span>INTERACTIVE CALCULATOR // ARCHITECTURE</span>
          </div>

          <div className="est-header__row">
            <h2 className="est-title">
              SCOPE <span className="est-title-outline">ESTIMATOR</span>
            </h2>
            <div className="est-badge">
              <Calculator size={14} />
              <span>DYNAMIC SPECIFICATION MATRIX</span>
            </div>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="est-workspace">
          
          {/* Left Configuration Matrix */}
          <div className="est-controls">
            
            {/* Step 1: Select Platform */}
            <div className="est-group">
              <span className="est-step-label">01 // CHOOSE CORE PLATFORM</span>
              <div className="est-platform-grid">
                {platforms.map((p) => {
                  const isActive = platform.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={`est-plat-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => setPlatform(p)}
                    >
                      <div className="est-plat-top">
                        <strong>{p.name}</strong>
                        <div className="est-radio">{isActive && <div className="est-radio-dot" />}</div>
                      </div>
                      <small>{p.baseScope}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Modules */}
            <div className="est-group">
              <span className="est-step-label">02 // SELECT INTEGRATED MODULES</span>
              <div className="est-feature-grid">
                {featureMatrix.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      className={`est-feat-pill ${isChecked ? "is-checked" : ""}`}
                      onClick={() => toggleFeature(feat.id)}
                    >
                      <div className="est-feat-checkbox">
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span>{feat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Live Computation Card */}
          <div className="est-summary">
            <div className="est-summary-card">
              <div className="est-summary-top">
                <span className="est-summary-label">SPECIFICATION BREAKDOWN</span>
                <span className="est-tier-tag">
                   {currentTier.name}
                </span>
              </div>

              <div className="est-summary-body">
                <div className="est-stat-row">
                  <span>Target Platform</span>
                  <strong>{platform.name}</strong>
                </div>

                <div className="est-stat-row">
                  <span>Active Modules</span>
                  <strong>{selectedFeatures.length} Selected</strong>
                </div>

                <div className="est-stat-row">
                  <span>Estimated Delivery</span>
                  <div className="est-time-pill">
                    <Timer size={12} />
                    <span>{currentTier.window}</span>
                  </div>
                </div>
              </div>

              <div className="est-summary-footer">
                <div className="est-notice">
                  <ShieldCheck size={13} />
                  <span>Final pricing confirmed upon signed scope approval. Advance confirms development.</span>
                </div>

                <button type="button" onClick={handleLockClick} className="est-cta-btn">
                  <span>Lock this specification</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}