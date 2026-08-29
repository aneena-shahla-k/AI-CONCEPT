import React, { useState } from "react";
import { Bot } from "lucide-react";
import CompanyNavbar from "../components/CompanyHome/CompanyNavbar";
import CompanyHero from "../components/CompanyHome/CompanyHero";
import ServicesSection from "../components/CompanyHome/ServicesSection";
import SpeedSection from "../components/CompanyHome/SpeedSection";
import ProjectScoper from "../components/CompanyHome/ProjectScoper";
import PortfolioSection from "../components/CompanyHome/PortfolioSection";
import ReviewSection from "../components/CompanyHome/ReviewSection";
// import StartProject from "../components/CompanyHome/StartProject";
import FinalCTA from "../components/CompanyHome/FinalCTA";
import AIChatDrawer from "../components/CompanyHome/AIChatDrawer";
import BookingModal from "../components/CompanyHome/BookingModal";
import "./CompanyHome.css";
import HeroScroll from "../components/CompanyHome/HeroScroll";
import DesignCodeSlider from "../components/CompanyHome/DesignCodeSlider";
import TerminalSimulator from "../components/CompanyHome/TerminalSimulator";
import ArchitectureSection from "../components/CompanyHome/ArchitectureSection";
import FloatingScopeWidget from "../components/CompanyHome/FloatingScopeWidget";

export default function CompanyHome() {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="company-home-main">
      <CompanyNavbar onOpenBooking={() => setIsBookingOpen(true)} />
      <HeroScroll />
      <CompanyHero
        onSearchTrigger={(q) => {
          setHeroSearchQuery(q);
          setIsAiDrawerOpen(true);
        }}
      />
      <ServicesSection />
      <SpeedSection />
      <ProjectScoper />
      <FloatingScopeWidget/>
      <ArchitectureSection/>
      <PortfolioSection />
      <DesignCodeSlider/>
      <TerminalSimulator/>
      {/* <StartProject /> */}
      <ReviewSection />
      <FinalCTA onOpenBooking={() => setIsBookingOpen(true)} />

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
        <Bot size={16} />
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