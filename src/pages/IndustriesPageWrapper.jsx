// src/pages/IndustriesPageWrapper.jsx
import React from "react";
import IndustriesPage from "../components/Industries/IndustriesPage";

export default function IndustriesPageWrapper({ onOpenBooking, onOpenProject }) {
  return (
    <IndustriesPage
      onOpenBooking={onOpenBooking}
      onOpenProject={onOpenProject}
    />
  );
}