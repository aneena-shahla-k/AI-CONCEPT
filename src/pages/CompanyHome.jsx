import React, { useState } from "react";
// import CompanyHero from "../components/CompanyHome/CompanyHero";
import SpeedSection from "../components/CompanyHome/SpeedSection";
import ReviewSection from "../components/CompanyHome/ReviewSection";
import AIChatDrawer from "../components/CompanyHome/AIChatDrawer";
import BookingModal from "../components/CompanyHome/BookingModal";
import "./CompanyHome.css";
// import HeroScroll from "../components/CompanyHome/HeroScroll";
import MarqueeSection from "../components/CompanyHome/MarqueeSection";
import HeroSection from "../components/CompanyHome/HeroSection";
import CoreConcept from "../components/CompanyHome/CoreConcept";
import WhatWeBuild from "../components/CompanyHome/WhatWeBuild";
import AISolutions from "../components/CompanyHome/AISolutions";
import GrowthPlan from "../components/CompanyHome/GrowthPlan";
import GpsPhilosophy from "../components/CompanyHome/GpsPhilosophy";
import HowWeWork from "../components/CompanyHome/HowWeWork";
import IndustriesWeServe from "../components/CompanyHome/IndustriesWeServe";
// import CtaBanner from "../components/CompanyHome/CtaBanner";
import TimeSprintSelector from "../components/CompanyHome/TimeSprintSelector";
import EcosystemCarousel from "../components/CompanyHome/EcosystemCarousel";

export default function CompanyHome({ onNavigate, onOpenProject }) {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="company-home-main">
      <HeroSection onNavigate={onNavigate} onOpenProject={onOpenProject} />
      <CoreConcept />
      <WhatWeBuild onNavigate={onNavigate} />
      <AISolutions onNavigate={onNavigate} />
      <TimeSprintSelector onOpenProject={onOpenProject} />
      <MarqueeSection />
      <EcosystemCarousel/>
      <GrowthPlan onNavigate={onNavigate} onOpenProject={onOpenProject} />
      <GpsPhilosophy />
      <HowWeWork />
      <IndustriesWeServe onNavigate={onNavigate} />
      
      {/* Connected 1:1 Booking modal & Start A Project triggers */}
      {/* <CtaBanner 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenProject={onOpenProject}
      /> */}

      <SpeedSection />
      <ReviewSection />

      {/* Global Persistent Floating AI Trigger */}
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
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Global 1:1 Meeting Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}