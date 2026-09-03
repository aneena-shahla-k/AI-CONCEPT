import React from 'react';
import PillarsSpotlightSection from '../components/GrowthPlans/PillarsSpotlightSection';
import DeliverablesSection from '../components/GrowthPlans/DeliverablesSection';
import SprintCalculatorSection from '../components/GrowthPlans/SprintCalculatorSection';
import BlueprintTiersSection from '../components/GrowthPlans/BlueprintTiersSection';
import PhilosophyBannerSection from '../components/GrowthPlans/PhilosophyBannerSection';
import FaqAccordionSection from '../components/GrowthPlans/FaqAccordionSection';
import "./GrowthPlansPage.css";

export default function GrowthPage({ onOpenBooking, onOpenProject }) {
  return (
    <div>
      <PillarsSpotlightSection/>
      <DeliverablesSection/>
      <SprintCalculatorSection/>
      <BlueprintTiersSection onOpenProject={onOpenProject} />
      <PhilosophyBannerSection />
      <FaqAccordionSection />
     
    </div>
  );
}