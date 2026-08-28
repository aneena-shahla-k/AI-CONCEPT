import React, { useState } from "react";
import CompanyNavbar from "../components/CompanyHome/CompanyNavbar";
import CompanyHero from "../components/CompanyHome/CompanyHero";
import SpeedSection from "../components/CompanyHome/SpeedSection";
import StartProject from "../components/CompanyHome/StartProject";
import FinalCTA from "../components/CompanyHome/FinalCTA";
import ServicesSection from "../components/CompanyHome/ServicesSection";
import PortfolioSection from "../components/CompanyHome/PortfolioSection";
import ReviewSection from "../components/CompanyHome/ReviewSection";
import EstimatorSection from "../components/CompanyHome/EstimatorSection";
import AIChatDrawer from "../components/CompanyHome/AIChatDrawer";
import "./CompanyHome.css";

export default function CompanyHome() {
  const [lockedSpec, setLockedSpec] = useState(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");

  const handleLockSpec = (spec) => {
    setLockedSpec(spec);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenAiWithQuery = (query) => {
    setHeroSearchQuery(query);
    setIsAiDrawerOpen(true);
  };

  return (
    <main className="company-home-main">
      <CompanyNavbar />
      <CompanyHero onSearchTrigger={handleOpenAiWithQuery} />
      <ServicesSection />
      <SpeedSection />
      <EstimatorSection onLockSpec={handleLockSpec} />
      <PortfolioSection />
      <StartProject initialSpec={lockedSpec} />
      <ReviewSection />
      <FinalCTA />

      {/* Global Floating AI Trigger with Bot Icon */}
      <button
        type="button"
        className="global-audio-pill"
        onClick={() => {
          setHeroSearchQuery("");
          setIsAiDrawerOpen(true);
        }}
        aria-label="Open AI Assistant"
      >
        <div className="global-audio-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
        
      </button>

      {/* Global AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => {
          setIsAiDrawerOpen(false);
          setHeroSearchQuery("");
        }}
        initialQuery={heroSearchQuery}
      />
    </main>
  );
}