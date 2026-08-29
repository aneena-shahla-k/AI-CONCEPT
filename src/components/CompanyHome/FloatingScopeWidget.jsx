import React, { useState, useEffect } from "react";
import { Zap, Calendar, ArrowUpRight, X } from "lucide-react";
import "./FloatingScopeWidget.css";

export default function FloatingScopeWidget({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px സ്ക്രോൾ ചെയ്ത ശേഷം വിജറ്റ് കാണിക്കുന്നു
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToScope = () => {
    document.querySelector("#scoper")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fl-widget-container">
      <div className="fl-widget-panel">
        
        {/* Engine Status Left */}
        <div className="fl-widget-left" onClick={scrollToScope}>
          <div className="fl-live-indicator">
            <span className="fl-dot-pulse" />
            <Zap size={13} className="fl-zap" />
          </div>

          <div className="fl-widget-text">
            <div className="fl-title-row">
              <strong>RAPID SPRINT ENGINE</strong>
              <span className="fl-speed-tag">24–42H DELIVERY</span>
            </div>
            <p>Direct Module Intake Active &bull; Lock your project scope</p>
          </div>
        </div>

        {/* Action Controls Right */}
        <div className="fl-widget-actions">
          <button
            type="button"
            className="fl-btn-scope"
            onClick={scrollToScope}
          >
            <span>BUILD BRIEF</span>
            <ArrowUpRight size={13} />
          </button>

          {onOpenBooking && (
            <button
              type="button"
              className="fl-btn-meet"
              onClick={onOpenBooking}
              title="Schedule Strategy Call"
            >
              <Calendar size={13} />
              <span>1:1 MEET</span>
            </button>
          )}

          <button
            type="button"
            className="fl-btn-close"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}