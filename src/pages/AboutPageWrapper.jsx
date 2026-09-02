// src/pages/AboutPageWrapper.jsx
import React from "react";
import AboutPage from "../components/About/AboutPage";

export default function AboutPageWrapper({ onOpenProject, onOpenBooking }) {
  return (
    <AboutPage
      onOpenProject={onOpenProject}
      onOpenBooking={onOpenBooking}
    />
  );
}