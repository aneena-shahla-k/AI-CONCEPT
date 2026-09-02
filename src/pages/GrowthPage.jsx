// src/pages/GrowthPage.jsx
import React from 'react';
import GrowthPlansPage from '../components/GrowthPlans/GrowthPlansPage';

export default function GrowthPage({ onOpenBooking, onOpenProject }) {
  return (
    <div>
      <GrowthPlansPage 
        onOpenBooking={onOpenBooking} 
        onOpenProject={onOpenProject} 
      />
    </div>
  );
}