// src/pages/AIPageWrapper.jsx
import React from "react";
import AIPage from "../components/AISolutions/AIPage";

export default function AIPageWrapper({ onOpenBooking, onOpenProject }) {
  return (
    <AIPage
      onOpenBooking={onOpenBooking}
      onOpenProject={onOpenProject}
    />
  );
}