import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Bot, 
  Building2, 
  Globe, 
  ShoppingCart, 
  BarChart3, 
  Smartphone
} from "lucide-react";
import "./EcosystemCarousel.css";

const cardsData = [
  {
    id: "erp",
    category: "OPERATIONS",
    title: "CRM & ERP Core",
    desc: "Unified pipeline connecting sales, finance & inventory in real time.",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    glow: "rgba(159, 190, 240, 0.35)",
    icon: <Building2 size={22} />
  },
  {
    id: "ai",
    category: "INTELLIGENCE",
    title: "Autonomous AI Agents",
    desc: "Self-executing agents for lead triage, routing & customer support.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    glow: "rgba(183, 162, 233, 0.35)",
    icon: <Bot size={22} />
  },
  {
    id: "web",
    category: "ACQUISITION",
    title: "Web Platforms",
    desc: "Ultra-fast corporate sites engineered for maximum conversions.",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0369a1 100%)",
    glow: "rgba(6, 182, 212, 0.35)",
    icon: <Globe size={22} />
  },
  {
    id: "ecom",
    category: "TRANSACTIONS",
    title: "E-Com & Booking",
    desc: "Automated checkout storefronts & scheduling booking engines.",
    gradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    glow: "rgba(16, 185, 129, 0.35)",
    icon: <ShoppingCart size={22} />
  },
  {
    id: "analytics",
    category: "SCALING",
    title: "Analytics & BI",
    desc: "Real-time telemetry, predictive insights & automated reporting.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    glow: "rgba(245, 158, 11, 0.35)",
    icon: <BarChart3 size={22} />
  },
  {
    id: "mobile",
    category: "RETENTION",
    title: "Mobile Apps",
    desc: "Native iOS & Android apps synced directly to core operations.",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    glow: "rgba(244, 63, 94, 0.35)",
    icon: <Smartphone size={22} />
  }
];

export default function EcosystemCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = cardsData.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const getCardClass = (index) => {
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) return "card-center";
    if (diff === 1) return "card-right-1";
    if (diff === 2) return "card-right-2";
    if (diff === total - 1) return "card-left-1";
    if (diff === total - 2) return "card-left-2";
    return "card-hidden";
  };

  return (
    <section className="rotate-section">
      <div className="rotate-container">
        
        {/* Header */}
        <div className="rotate-header" data-aos="fade-up"
     data-aos-anchor-placement="center-center">
          <h2 className="rotate-title">One Business. One Ecosystem.</h2>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          className="rotate-stage-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Controls */}
          <button 
            type="button" 
            className="nav-btn nav-prev" 
            onClick={handlePrev}
            aria-label="Previous Capability"
          >
            <ChevronLeft size={18} />
          </button>

          <button 
            type="button" 
            className="nav-btn nav-next" 
            onClick={handleNext}
            aria-label="Next Capability"
          >
            <ChevronRight size={18} />
          </button>

          {/* 3D Cards Stack */}
          <div className="rotate-cards-stack">
            {cardsData.map((card, idx) => {
              const posClass = getCardClass(idx);
              const isCurrent = posClass === "card-center";

              return (
                <div
                  key={card.id}
                  className={`card-3d ${posClass}`}
                  style={{
                    background: card.gradient,
                    boxShadow: isCurrent 
                      ? `0 20px 40px -10px ${card.glow}, 0 0 20px ${card.glow}` 
                      : "0 8px 20px rgba(15, 23, 42, 0.08)"
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="card-sheen" />

                  {/* Card Header */}
                  <div className="card-top-row">
                    <div className="card-icon-bubble">
                      {card.icon}
                    </div>
                    <span className="card-category-lbl">{card.category}</span>
                  </div>

                  {/* Card Main Info */}
                  <div className="card-body-content">
                    <h3 className="card-main-title">{card.title}</h3>
                    <p className="card-description">{card.desc}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer-row">
                    <span className="card-status-dot" />
                    <span className="card-status-text">
                      {isCurrent ? "Active Engine" : "Click to view"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="rotate-dots-bar">
          {cardsData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`dot-indicator ${activeIndex === idx ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
