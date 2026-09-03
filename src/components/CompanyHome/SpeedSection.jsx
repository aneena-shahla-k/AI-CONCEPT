import React, { useState, useEffect, useRef } from "react";
import { Check, Clock } from "lucide-react";
import "./SpeedSection.css";

const sprintSteps = [
  { step: "01", title: "BRIEF & SCOPE", desc: "Requirements locked & approved" },
  { step: "02", title: "UI DESIGN", desc: "High-fidelity mockups & design tokens" },
  { step: "03", title: "RAPID BUILD", desc: "Component assembly & logic wiring" },
  { step: "04", title: "QA & TEST", desc: "Cross-browser audit & speed check" },
  { step: "05", title: "PRODUCTION", desc: "Domain routing & live deployment" },
];

export default function SpeedSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Live Micro-Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 36,
    seconds: 15,
    ms: 54,
  });

  // Intersection Observer
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Sequential Step Animation
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

  // Clock Countdown Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.ms > 0) return { ...prev, ms: prev.ms - 1 };
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1, ms: 99 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59, ms: 99 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, ms: 99 };
        return { hours: 24, minutes: 0, seconds: 0, ms: 0 };
      });
    }, 10);

    return () => clearInterval(timer);
  }, []);

  const format2 = (val) => String(val).padStart(2, "0");

  return (
    <section ref={sectionRef} className="sp-section" id="speed">
      <div className="sp-container">
        
        {/* 1. Minimal Header */}
        <div className="sp-header" data-aos="fade-down-left">
          <h2 className="sp-title">
            24–42 <span className="sp-title-gradient">Hours Sprint</span>
          </h2>
          
        </div>

        {/* 2. Standalone Minimal Timer */}
        <div className="sp-timer-card">
          <div className="sp-timer-top">
            <div className="sp-timer-tag">
              <Clock size={13} />
              <span>LIVE SPRINT CLOCK</span>
            </div>
            <span className="sp-timer-status">TARGET: 24H LIVE DNS</span>
          </div>

          <div className="sp-digital-clock">
            <div className="sp-unit">
              <span className="sp-val">{format2(timeLeft.hours)}</span>
              <span className="sp-lbl">HRS</span>
            </div>
            <span className="sp-colon">:</span>
            <div className="sp-unit">
              <span className="sp-val">{format2(timeLeft.minutes)}</span>
              <span className="sp-lbl">MIN</span>
            </div>
            <span className="sp-colon">:</span>
            <div className="sp-unit">
              <span className="sp-val">{format2(timeLeft.seconds)}</span>
              <span className="sp-lbl">SEC</span>
            </div>
            <span className="sp-colon sp-colon-ms">:</span>
            <div className="sp-unit">
              <span className="sp-val sp-ms">{format2(timeLeft.ms)}</span>
              <span className="sp-lbl">MS</span>
            </div>
          </div>
        </div>

        {/* 3. Execution Pipeline */}
        <div className="sp-pipeline-wrap">
          <div className="sp-pipeline-header">
            <span className="sp-pipeline-label">EXECUTION PHASES</span>
            <div className={`sp-status-pill ${activeStep === 5 ? "completed" : ""}`}>
              <span className="sp-live-dot" />
              <span>
                {activeStep === 5
                  ? "SYSTEM DEPLOYED // READY FOR PRODUCTION"
                  : activeStep > 0
                  ? `EXECUTING PHASE 0${activeStep} // ${sprintSteps[activeStep - 1].title}`
                  : "INITIALIZING PIPELINE..."}
              </span>
            </div>
          </div>

          <div className="sp-pipeline" data-aos="fade-down-left"> 
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
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <span>{item.step}</span>
                      )}
                    </div>

                    {idx < sprintSteps.length - 1 && (
                      <div className="sp-step-line">
                        <div 
                          className="sp-step-line-fill" 
                          style={{ 
                            width: activeStep > stepNum ? "100%" : isCurrent ? "50%" : "0%",
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
    </section>
  );
}