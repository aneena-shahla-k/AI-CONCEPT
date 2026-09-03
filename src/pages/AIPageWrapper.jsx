// src/components/AISolutions/AIPage.jsx
import React from "react";
import AIHeroSection from "../components/AISolutions/AIHeroSection";
import AICapabilitiesConsole from "../components/AISolutions/AICapabilitiesConsole";
import AIPipelineSection from "../components/AISolutions/AIPipelineSection";
import AIFaqSection from "../components/AISolutions/AIFaqSection";
import "./AIPage.css";

export default function AIPageWrapper({ onOpenBooking, onOpenProject }) {
  return (
    <div className="ai-clean-page">
      <div className="ai-container">
        <AIHeroSection 
          onOpenProject={onOpenProject} 
          onOpenBooking={onOpenBooking} 
        />
        <AICapabilitiesConsole 
          onOpenProject={onOpenProject} 
        />
        <AIPipelineSection />
        <AIFaqSection />
      </div>
    </div>
  );
}