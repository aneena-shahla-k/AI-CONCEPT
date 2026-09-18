import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import "./Industries.css";

import retailImg from "../assets/images/about/retail.jpg";
import healthcareImg from "../assets/images/about/hosp.jpg";
import hospitalityImg from "../assets/images/about/hotel.jpg";
import educationImg from "../assets/images/about/educa.jpg";
import professionalImg from "../assets/images/about/prof.jpg";
import logisticsImg from "../assets/images/about/logistic.jpg";
import realEstateImg from "../assets/images/about/real.jpg";
import startupsImg from "../assets/images/about/start.jpg";

const industries = [
  {
    no: "01",
    title: "Retail",
    text: "E-commerce, inventory, POS, CRM, loyalty.",
    image: retailImg,
  },
  {
    no: "02",
    title: "Healthcare",
    text: "Booking, patient systems, portals, AI assistance.",
    image: healthcareImg,
  },
  {
    no: "03",
    title: "Hospitality",
    text: "Reservations, websites, apps, CRM, operations.",
    image: hospitalityImg,
  },
  {
    no: "04",
    title: "Education",
    text: "Learning platforms, student systems, ERP.",
    image: educationImg,
  },
  {
    no: "05",
    title: "Professional Services",
    text: "Booking, CRM, invoicing, dashboards.",
    image: professionalImg,
  },
  {
    no: "06",
    title: "Logistics",
    text: "Tracking, dispatch, delivery systems, mobile applications.",
    image: logisticsImg,
  },
  {
    no: "07",
    title: "Real Estate",
    text: "Property portals, CRM, booking, lead management.",
    image: realEstateImg,
  },
  {
    no: "08",
    title: "Startups",
    text: "MVPs, SaaS platforms, apps, AI products.",
    image: startupsImg,
  },
];

const ROUTE_PATH =
  "M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680";

export default function Industries() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const pinRef = useRef(null);

  const pathLengthRef = useRef(0);
  const animationControls = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Controlled Motion Value for Progress
  const autoProgress = useMotionValue(0);

  /* =====================================================
     INITIALIZE SVG PATH
  ===================================================== */
  const initializePath = useCallback(() => {
    const path = pathRef.current;
    if (!path) return false;

    try {
      if (typeof path.getTotalLength !== "function") return false;
      const length = path.getTotalLength();
      if (!Number.isFinite(length) || length <= 0) return false;

      pathLengthRef.current = length;
      return true;
    } catch {
      pathLengthRef.current = 0;
      return false;
    }
  }, []);

  useLayoutEffect(() => {
    initializePath();
    const handleResize = () => initializePath();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initializePath]);

  /* =====================================================
     MOVE PIN DIRECTLY VIA ANIMATION PROGRESS
  ===================================================== */
  const movePinToProgress = useCallback((progress) => {
    const path = pathRef.current;
    const pin = pinRef.current;
    let length = pathLengthRef.current;

    if (!length && path && typeof path.getTotalLength === "function") {
      length = path.getTotalLength();
      pathLengthRef.current = length;
    }

    if (!path || !pin || !length) return;

    try {
      const safeProgress = Math.max(0, Math.min(1, Number(progress) || 0));
      const point = path.getPointAtLength(safeProgress * length);

      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;

      pin.setAttribute("transform", `translate(${point.x} ${point.y})`);
    } catch {
      // Ignore calculation errors
    }
  }, []);

  useMotionValueEvent(autoProgress, "change", (progress) => {
    movePinToProgress(progress);

    // Update active card based on progress
    const idx = Math.min(
      industries.length - 1,
      Math.floor(progress * industries.length)
    );
    setActiveIndex(idx);
  });

  /* =====================================================
     AUTOMATIC ROUTE FLOW
  ===================================================== */
  const runAutoFlow = useCallback((fromStart = false) => {
    if (animationControls.current) animationControls.current.stop();
    setIsPlaying(true);

    if (fromStart) {
      autoProgress.set(0);
    }

    const currentVal = fromStart ? 0 : (autoProgress.get() >= 0.98 ? 0 : autoProgress.get());

    // 14 seconds for a cinematic, readable transition
    animationControls.current = animate(autoProgress, 1, {
      from: currentVal,
      duration: 14 * (1 - currentVal),
      ease: "easeInOut",
      onComplete: () => {
        setIsPlaying(false);
        if (sectionRef.current) {
          const nextTarget = sectionRef.current.nextElementSibling;
          if (nextTarget) {
            nextTarget.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }
        }
      },
    });
  }, [autoProgress]);

  const togglePlay = () => {
    if (isPlaying) {
      if (animationControls.current) animationControls.current.stop();
      setIsPlaying(false);
    } else {
      runAutoFlow(false);
    }
  };

  const jumpToIndustry = useCallback((index) => {
    if (animationControls.current) animationControls.current.stop();
    setIsPlaying(false);

    const targetProgress = index / (industries.length - 1);
    animate(autoProgress, targetProgress, {
      duration: 0.8,
      ease: "easeInOut",
    });
  }, [autoProgress]);

  const handlePrev = useCallback(() => {
    const next = activeIndex > 0 ? activeIndex - 1 : industries.length - 1;
    jumpToIndustry(next);
  }, [activeIndex, jumpToIndustry]);

  const handleNext = useCallback(() => {
    const next = activeIndex < industries.length - 1 ? activeIndex + 1 : 0;
    jumpToIndustry(next);
  }, [activeIndex, jumpToIndustry]);

  /* =====================================================
     RESTART EVERY TIME SECTION ENTERS VIEWPORT
  ===================================================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          initializePath();
          runAutoFlow(true);
        } else {
          if (animationControls.current) animationControls.current.stop();
          setIsPlaying(false);
          autoProgress.set(0);
          setActiveIndex(0);
        }
      },
      { threshold: 0.35 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
      observer.disconnect();
    };
  }, [runAutoFlow, autoProgress, initializePath]);

  const activeIndustry = industries[activeIndex] || industries[0];

  return (
    <section ref={sectionRef} className="industries-section">
      <div className="industries-sticky">

        {/* HEADING */}
        <div className="industries-heading">
          <span className="eyebrow">INDUSTRIES WE SERVE</span>

          <h2>Powered Businesses<br />
            <span className="heading-gradient">Across Industries</span>
          </h2>

          <p>
            Tailored digital solutions driving industry innovation.
          </p>

          <div className="industries-action-row">
            <button
              type="button"
              className="industries-play-btn"
              onClick={togglePlay}
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
              {isPlaying ? "Pause Tour" : "Auto Play Tour"}
            </button>
          </div>
        </div>

        {/* TOP PILL */}
        <div className="top-pill">
          <span className="pill-icon">✦</span>
          <span>Different Industries</span>
          <b>•</b>
          <span>Same Goal</span>
          <b>→</b>
          <span>Your Growth</span>
        </div>

        {/* MAIN STAGE */}
        <div className="industries-stage">

          {/* ROUTE SVG */}
          <div className="route-container">
            <svg
              className="route-svg"
              viewBox="0 0 1400 700"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="industriesRouteFade"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="14%" stopColor="white" stopOpacity="1" />
                  <stop offset="86%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                <mask id="industriesRouteMask">
                  <rect
                    x="0"
                    y="0"
                    width="1400"
                    height="700"
                    fill="url(#industriesRouteFade)"
                  />
                </mask>

                <filter
                  id="industriesPinGlow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="3"
                    floodColor="#1e88e5"
                    floodOpacity="0.25"
                  />
                </filter>
              </defs>

              <path
                className="route-glow"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />
              <path
                className="route-road"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />
              <path
                className="route-inner"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />
              <path
                ref={pathRef}
                className="route-center"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />

              {/* MOVING LOCATION PIN */}
              {/* =================================================
    MOVING LOCATION PIN (CORRECT ORIENTATION)
================================================= */}
<g
  ref={pinRef}
  className="moving-location-pin"
  filter="url(#industriesPinGlow)"
>
  <circle
    cx="0"
    cy="0"
    r="16"
    className="pin-pulse-ring"
  />

  <path
    d="
      M 0 0
      C -8 -12 -18 -22 -18 -34
      A 18 18 0 1 1 18 -34
      C 18 -22 8 -12 0 0
      Z
    "
    fill="#ffffff"
    stroke="#0284c7"
    strokeWidth="3.5"
    strokeLinejoin="round"
  />

  <circle
    cx="0"
    cy="-34"
    r="7.5"
    fill="#0284c7"
  />

  <circle
    cx="0"
    cy="-34"
    r="3"
    fill="#ffffff"
  />
</g>
            </svg>

            {/* STATIONARY ROUTE POINTS */}
            <div className="route-point point-2 desktop-only" onClick={() => jumpToIndustry(1)}>
              <span />
            </div>
            <div className="route-point point-3 desktop-only" onClick={() => jumpToIndustry(3)}>
              <span />
            </div>
            <div className="route-point point-4 desktop-only" onClick={() => jumpToIndustry(4)}>
              <span />
            </div>
            <div className="route-point point-5 desktop-only" onClick={() => jumpToIndustry(5)}>
              <span />
            </div>
            <div className="route-point point-6 desktop-only" onClick={() => jumpToIndustry(7)}>
              <span />
            </div>
          </div>

          {/* ACTIVE INDUSTRY CARD */}
          <div className="center-industry-card show">
            <div className="center-card-image">
              <img
                src={activeIndustry.image}
                alt={activeIndustry.title}
                loading="lazy"
                decoding="async"
              />
              <span className="card-counter-badge">
                {activeIndustry.no} / 08
              </span>
            </div>

            <div className="center-card-content">
              <div className="center-card-number">{activeIndustry.no}</div>
              <h3>{activeIndustry.title}</h3>
              <p>{activeIndustry.text}</p>
            </div>
          </div>

          {/* MOBILE ARROW CONTROLS */}
          <div className="mobile-nav-controls">
            <button
              type="button"
              className="nav-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Industry"
            >
              ‹
            </button>

            <button
              type="button"
              className="nav-arrow-btn next"
              onClick={handleNext}
              aria-label="Next Industry"
            >
              ›
            </button>
          </div>
        </div>

        {/* DOT NAVIGATION */}
        <div className="route-message">
          <div className="small-dots">
            {industries.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Jump to industry ${index + 1}`}
                onClick={() => jumpToIndustry(index)}
                className={`dot-btn ${index === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* AUTO STATUS INDICATOR */}
        <div className="explore">
          <span>{isPlaying ? "AUTO EXPLORING INDUSTRIES" : "TOUR PAUSED"}</span>
          <div className="explore-dot-pulse" />
        </div>

      </div>
    </section>
  );
}