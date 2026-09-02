// src/components/common/GsapSpotlightCard.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import "./GsapSpotlightCard.css";

export default function GsapSpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. Move the cursor spotlight glow
    gsap.to(glowRef.current, {
      opacity: 1,
      x: x - 150,
      y: y - 150,
      duration: 0.2,
      ease: "power2.out",
    });

    // 2. 3D Tilt calculation (subtle luxury angle)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    // Reset tilt and hide glow
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4,
    });

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`gsap-tilt-card ${className}`}
    >
      <div ref={glowRef} className="gsap-card-spotlight" />
      <div className="gsap-card-inner">{children}</div>
    </div>
  );
}