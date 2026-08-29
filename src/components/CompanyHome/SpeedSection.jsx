import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  X, 
  AlertCircle, 
  Send 
} from "lucide-react";
import "./SpeedSection.css";

const sprintSteps = [
  { step: "01", title: "BRIEF & SCOPE", desc: "Requirements locked & approved" },
  { step: "02", title: "UI DESIGN", desc: "High-fidelity mockups & system tokens" },
  { step: "03", title: "RAPID BUILD", desc: "Component assembly & logic wiring" },
  { step: "04", title: "QA & TEST", desc: "Cross-browser audit & speed optimization" },
  { step: "05", title: "PRODUCTION", desc: "Domain routing & live deployment" },
];

export default function SpeedSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Fit Checker Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fitStep, setFitStep] = useState(1); // 1: Questions, 2: Result
  const [fitAnswers, setFitAnswers] = useState({
    scopeType: "",
    designReady: "",
    timeline: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) {
      setActiveStep(0);
      return;
    }

    let current = 1;
    setActiveStep(1);

    const interval = setInterval(() => {
      current += 1;
      if (current <= sprintSteps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
      }
    }, 850);

    return () => clearInterval(interval);
  }, [isIntersecting]);

  const handleOpenFitModal = () => {
    setIsModalOpen(true);
    setFitStep(1);
    setFitAnswers({ scopeType: "", designReady: "", timeline: "" });
  };

  const handleCloseFitModal = () => {
    setIsModalOpen(false);
  };

  // 24-42 Hours sprint eligibility logic
  const isSprintFit = 
    fitAnswers.scopeType === "single_module" || 
    fitAnswers.scopeType === "landing_page";

  return (
    <section ref={sectionRef} className="sp-section" id="speed">
      <div className="sp-container">
        
        {/* Top Header */}
        <div className="sp-header">
          <div className="sp-eyebrow">
            <span className="sp-dot" />
            <span>RAPID DELIVERY SYSTEM</span>
          </div>

          <div className="sp-header__row">
            <h2 className="sp-title">
              24–42 <span className="sp-title-outline">HOURS</span>
            </h2>
          </div>
        </div>

        {/* Central Workspace Cards */}
        <div className="sp-workspace">
          
          {/* Left Narrative Card */}
          <div className="sp-narrative-card">
            <div className="sp-narrative-top">
              <span className="sp-card-index">01 VELOCITY</span>
              <div className="sp-pulse-chip">
                <span />
                ACTIVE ENGINE
              </div>
            </div>

            <div className="sp-narrative-body">
              <h3>How fast can an idea become a product?</h3>
              <p>
                For clearly scoped deliverables, our sprint pipeline transforms an approved brief 
                into a live, production-grade digital experience in a focused 24 to 42-hour delivery window.
              </p>
            </div>

            <div className="sp-narrative-footer">
              <div className="sp-note">
                <Zap size={14} />
                <span>Rapid delivery applies to defined, pre-approved project modules.</span>
              </div>
              <button 
                type="button"
                className="sp-btn-cta" 
                onClick={handleOpenFitModal}
              >
                <span>Check project fit</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Giant Time Matrix */}
          <div className="sp-time-card">
            <div className="sp-time-header">
              <span className="sp-card-index">02 SPRINT CLUSTER</span>
              <span className="sp-security-tag">
                <ShieldCheck size={13} /> QA VERIFIED
              </span>
            </div>

            <div className="sp-time-center">
              <div className="sp-time-giant">
                <span className="sp-giant-num">24</span>
                <span className="sp-giant-dash">–</span>
                <span className="sp-giant-num">42</span>
              </div>
              <span className="sp-giant-unit">HOURS RAPID DEPLOYMENT</span>
            </div>

            <div className="sp-micro-strip">
              <div className="sp-micro-item">
                <CheckCircle2 size={12} />
                <span>Single-Scope Releases</span>
              </div>
              <div className="sp-micro-item">
                <CheckCircle2 size={12} />
                <span>Clean Architecture</span>
              </div>
              <div className="sp-micro-item">
                <CheckCircle2 size={12} />
                <span>Instant DNS Launch</span>
              </div>
            </div>
          </div>

        </div>

        {/* Execution Pipeline */}
        <div className="sp-pipeline-wrap">
          <div className="sp-pipeline-header">
            <span className="sp-pipeline-label">EXECUTION PHASES</span>
            <div className={`sp-live-status-pill ${activeStep === 5 ? "completed" : ""}`}>
              <span className="sp-live-blink" />
              <span>
                {activeStep === 5
                  ? "SYSTEM DEPLOYED // READY FOR PRODUCTION"
                  : activeStep > 0
                  ? `EXECUTING PHASE 0${activeStep} // ${sprintSteps[activeStep - 1].title}`
                  : "INITIALIZING PIPELINE..."}
              </span>
            </div>
          </div>

          <div className="sp-pipeline">
            {sprintSteps.map((item, idx) => {
              const stepNum = idx + 1;
              const isCompleted = activeStep >= stepNum;
              const isCurrent = activeStep === stepNum;

              return (
                <div 
                  key={item.step} 
                  className={`sp-step ${isCompleted ? "is-completed" : ""} ${isCurrent ? "is-current" : ""}`}
                >
                  <div className="sp-step-top">
                    <div className="sp-step-circle">
                      {isCompleted ? (
                        <Check size={14} strokeWidth={3} className="sp-check-pop" />
                      ) : (
                        <span className="sp-step-index-text">{item.step}</span>
                      )}
                    </div>

                    {idx < sprintSteps.length - 1 && (
                      <div className="sp-step-line">
                        <div 
                          className="sp-step-line-fill" 
                          style={{ 
                            width: activeStep > stepNum ? "100%" : isCurrent ? "40%" : "0%",
                            transition: isCurrent ? "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : "width 0.35s ease"
                          }} 
                        />
                      </div>
                    )}
                  </div>

                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =========================================================
          CHECK PROJECT FIT POPUP MODAL
      ========================================================= */}
      {isModalOpen && (
        <div className="sp-modal-backdrop" onClick={handleCloseFitModal}>
          <div className="sp-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="sp-modal-header">
              <div>
                <span className="sp-modal-tag">VELOCITY ELIGIBILITY</span>
                <h3 className="sp-modal-title">PROJECT FIT CHECKER</h3>
              </div>
              <button 
                type="button" 
                className="sp-modal-close" 
                onClick={handleCloseFitModal}
              >
                <X size={18} />
              </button>
            </div>

            {fitStep === 1 ? (
              <div className="sp-modal-body">
                <p className="sp-modal-desc">
                  Answer 3 quick questions to verify if your project qualifies for our <strong>24–42 hour rapid sprint engine</strong>.
                </p>

                {/* Q1: Scope Type */}
                <div className="sp-quiz-block">
                  <label>1. WHAT IS THE PRIMARY SCOPE?</label>
                  <div className="sp-quiz-options">
                    {[
                      { id: "landing_page", label: "High-Converting Landing Page" },
                      { id: "single_module", label: "Single Feature / Component Wireup" },
                      { id: "full_platform", label: "Full Multi-Role SaaS / Mobile App" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`sp-quiz-btn ${fitAnswers.scopeType === opt.id ? "is-selected" : ""}`}
                        onClick={() => setFitAnswers({ ...fitAnswers, scopeType: opt.id })}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2: Design / Specs */}
                <div className="sp-quiz-block">
                  <label>2. ARE YOUR ASSETS & COPY READY?</label>
                  <div className="sp-quiz-options">
                    {[
                      { id: "ready", label: "Yes, ready / clear references available" },
                      { id: "need_help", label: "Need full UX wireframing from scratch" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`sp-quiz-btn ${fitAnswers.designReady === opt.id ? "is-selected" : ""}`}
                        onClick={() => setFitAnswers({ ...fitAnswers, designReady: opt.id })}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="sp-modal-submit-btn"
                  disabled={!fitAnswers.scopeType || !fitAnswers.designReady}
                  onClick={() => setFitStep(2)}
                >
                  <span>CALCULATE FIT RATING</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ) : (
              /* Step 2: Result */
              <div className="sp-modal-result">
                {isSprintFit ? (
                  <div className="sp-result-card is-success">
                    <CheckCircle2 size={38} className="sp-result-icon" />
                    <h4>100% SPRINT FIT DETECTED</h4>
                    <p>
                      Your requirement perfectly matches our <strong>24–42 Hour Rapid Engine</strong>. We can lock the brief and initiate component assembly immediately.
                    </p>
                    <button
                      type="button"
                      className="sp-modal-submit-btn"
                      onClick={() => {
                        handleCloseFitModal();
                        document.querySelector("#scoper")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>LOCK THIS SPRINT IN SCOPER</span>
                      <Send size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="sp-result-card is-custom">
                    <AlertCircle size={38} className="sp-result-icon" />
                    <h4>ENTERPRISE / FULL-STACK SCOPE</h4>
                    <p>
                      Your platform requires multi-module architecture (3–7 business days). Let’s configure your exact feature matrix using our Scope Builder.
                    </p>
                    <button
                      type="button"
                      className="sp-modal-submit-btn"
                      onClick={() => {
                        handleCloseFitModal();
                        document.querySelector("#scoper")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>GO TO SCOPE BUILDER</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}