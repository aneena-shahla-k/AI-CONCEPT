import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GsapAnimatedCard.css";

gsap.registerPlugin(ScrollTrigger);

export default function GsapAnimatedCard({ children, className = "", delay = 0, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 1. Scroll-driven staggered entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  // 2. Mousemove: Spotlight & 3D Tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight glow animation
    gsap.to(glowRef.current, {
      opacity: 1,
      x: x - 150,
      y: y - 150,
      duration: 0.15,
      ease: "power2.out",
    });

    // 3D tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 900,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    // Hide glow
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    // Reset tilt back to level
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`gsap-home-card ${className}`}
    >
      <div ref={glowRef} className="gsap-home-card-glow" />
      <div className="gsap-home-card-content">{children}</div>
    </div>
  );
}