// src/components/common/GsapMagneticButton.jsx
import React, { useRef } from "react";
import gsap from "gsap";

export default function GsapMagneticButton({ children, onClick, className = "", style = {} }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Magnetic pull
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // Return to original point with elastic bounce
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ willChange: "transform", display: "inline-block", ...style }}
    >
      {children}
    </button>
  );
}