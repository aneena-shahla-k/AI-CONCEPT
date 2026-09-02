import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./GlobalCursor.css";

export default function GlobalCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Touch screens-ൽ custom cursor ഡിസേബിൾ ചെയ്യുക
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const glow = glowRef.current;

    const onMouseMove = (e) => {
      // 1. Precise Center Dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      // 2. Trailing Smooth Ambient Glow Ring
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    // Hover interactive elements (Buttons, links, inputs)
    const handleLinkHover = () => {
      gsap.to(glow, {
        scale: 2.2,
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgba(168, 85, 247, 0.6)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const handleLinkLeave = () => {
      gsap.to(glow, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(56, 189, 248, 0.4)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Attach listeners to all clickable elements across every page
    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "button, a, input, textarea, select, .work-card, .ind-clean-card"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHover);
        el.addEventListener("mouseleave", handleLinkLeave);
      });
    };

    attachHoverListeners();

    // DOM changes ഉണ്ടാവുമ്പോൾ (പേജ് മാറുമ്പോൾ) പുതിയ ലിങ്കുകൾ പിക്ക് ചെയ്യാൻ
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="global-cursor-dot" />
      <div ref={glowRef} className="global-cursor-glow" />
    </>
  );
}