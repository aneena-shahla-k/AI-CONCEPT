// CtaBanner.jsx
import React from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import "./CtaBanner.css";

export default function CtaBanner({ onOpenBooking, onOpenProject }) {
  return (
    <section className="cta-banner-wrapper">
      <div className="cta-banner-container">
        <div className="cta-card">
          <div className="cta-glow-effect" />
          
          <div className="cta-card-content">
            <h2 className="cta-title">
              Ready to Launch Your Project in <br />
              <span className="cta-gradient-text">24 to 48 Hours?</span>
            </h2>

            <div className="cta-action-group">
              <button
                type="button"
                className="cta-btn-primary"
                onClick={() => {
                  if (onOpenProject) {
                    onOpenProject();
                  } else {
                    document.querySelector("#sprint-tiers")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span>Start A Project</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                type="button"
                className="cta-btn-secondary"
                onClick={() => {
                  if (onOpenBooking) onOpenBooking();
                }}
              >
                <Calendar size={14} />
                <span>Book 1:1 Meet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}