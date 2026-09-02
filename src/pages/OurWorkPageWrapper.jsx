// src/pages/OurWorkPageWrapper.jsx
import React from "react";
import OurWorkPage from "../components/OurWork/OurWorkPage";

export default function OurWorkPageWrapper({ onOpenProject, onOpenBooking }) {
  return (
    <OurWorkPage
      onOpenProject={onOpenProject}
      onOpenBooking={onOpenBooking}
    />
  );
}