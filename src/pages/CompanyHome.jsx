import React, { useState } from "react";
import CompanyNavbar from "../components/CompanyHome/CompanyNavbar";
// import CompanyHero from "../components/CompanyHome/CompanyHero";
import ServicesSection from "../components/CompanyHome/ServicesSection";
import SpeedSection from "../components/CompanyHome/SpeedSection";
import PortfolioSection from "../components/CompanyHome/PortfolioSection";
import ReviewSection from "../components/CompanyHome/ReviewSection";
import FinalCTA from "../components/CompanyHome/FinalCTA";
import AIChatDrawer from "../components/CompanyHome/AIChatDrawer";
import BookingModal from "../components/CompanyHome/BookingModal";
import "./CompanyHome.css";
import HeroScroll from "../components/CompanyHome/HeroScroll";
import AboutAIConcept from "../components/CompanyHome/AboutAIConcept";
import { ServiceSection, CtaBanner, ProcessSection, SpeedTiersSection } from "../components/CompanyHome/AgencySections";
import MarqueeSection from "../components/CompanyHome/MarqueeSection";

export default function CompanyHome() {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <main className="company-home-main">
      <CompanyNavbar 
        onOpenBooking={() => setIsBookingOpen(true)} 
        isOpenProjectDirectly={isProjectModalOpen}
        onCloseProjectModal={() => setIsProjectModalOpen(false)}
      />
      <HeroScroll />
      {/* <CompanyHero
        onSearchTrigger={(q) => {
          setHeroSearchQuery(q);
          setIsAiDrawerOpen(true);
        }}
      /> */}
      <AboutAIConcept />
      <MarqueeSection />
      <ServiceSection />
      
      {/* Connected 1:1 Booking modal trigger */}
      <SpeedTiersSection onOpenBooking={() => setIsBookingOpen(true)} />
      
      <ProcessSection />
      
      {/* Connected 1:1 Booking modal & Start A Project triggers */}
      <CtaBanner 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenProject={() => setIsProjectModalOpen(true)}
      />

      <ServicesSection />
      <SpeedSection />
      <PortfolioSection />
      <ReviewSection />
      <FinalCTA 
          onOpenBooking={() => setIsBookingOpen(true)} 
          onOpenProject={() => setIsProjectModalOpen(true)}
      />

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