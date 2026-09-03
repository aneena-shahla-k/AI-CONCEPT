// src/components/AISolutions/components/AIHeroSection.jsx
import React from "react";
import { Bot, ArrowUpRight, Activity } from "lucide-react";
import "./AIHeroSection.css";

export default function AIHeroSection({ onOpenProject, onOpenBooking }) {
  return (
    <section className="ai-hero">
      <span className="ai-eyebrow">
        <Bot size={13} />
        <span>AI SOLUTIONS & ARCHITECTURE</span>
      </span>

      <h1 className="ai-hero-title">
        We don’t just add AI. <br />
        <span className="ai-gradient-text">We build AI into the business.</span>
      </h1>


      <div className="ai-hero-actions">
        <button
          type="button"
          className="ai-btn-primary"
          onClick={() => onOpenProject && onOpenProject()}
        >
          <span>Build Custom AI System</span>
          <ArrowUpRight size={14} />
        </button>

        <button
          type="button"
          className="ai-btn-secondary"
          onClick={() => onOpenBooking && onOpenBooking()}
        >
          <Activity size={14} />
          <span>Discuss Technical Architecture</span>
        </button>
      </div>
    </section>
  );
}