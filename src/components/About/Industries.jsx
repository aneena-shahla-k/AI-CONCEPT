import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const tickingRef = useRef(false);
  const rafRef = useRef(null);

  const mountedRef = useRef(false);

  const lastIndexRef = useRef(0);
  const lastShowCardRef = useRef(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCard, setShowCard] = useState(true);

  /* =====================================================
     INITIALIZE SVG PATH
  ===================================================== */

  const initializePath = useCallback(() => {
    const path = pathRef.current;

    if (!path) return false;

    try {
      if (typeof path.getTotalLength !== "function") {
        return false;
      }

      const length = path.getTotalLength();

      if (!Number.isFinite(length) || length <= 0) {
        return false;
      }

      pathLengthRef.current = length;

      return true;
    } catch {
      pathLengthRef.current = 0;
      return false;
    }
  }, []);

  /* =====================================================
     MOVE PIN DIRECTLY
     
     IMPORTANT:
     This does NOT use React state.
     Therefore the whole component doesn't re-render
     every frame.
  ===================================================== */

  const movePinToProgress = useCallback((progress) => {
    const path = pathRef.current;
    const pin = pinRef.current;
    const length = pathLengthRef.current;

    if (!path || !pin || !length) return;

    try {
      const safeProgress = Math.max(
        0,
        Math.min(1, Number(progress) || 0)
      );

      const point = path.getPointAtLength(
        safeProgress * length
      );

      if (
        !point ||
        !Number.isFinite(point.x) ||
        !Number.isFinite(point.y)
      ) {
        return;
      }

      pin.setAttribute(
        "transform",
        `translate(${point.x} ${point.y})`
      );
    } catch {
      // Ignore SVG calculation errors.
    }
  }, []);

  /* =====================================================
     CALCULATE CURRENT INDUSTRY
  ===================================================== */

  const getIndustryIndex = useCallback((progress) => {
    const isMobile = window.innerWidth <= 768;

    let index;

    if (!isMobile) {
      /*
       * Small invisible beginning/end buffer.
       * Card only appears while route is actively moving.
       */
      if (progress < 0.03 || progress > 0.98) {
        return {
          index: lastIndexRef.current,
          show: false,
        };
      }

      const cardProgress =
        (progress - 0.03) / 0.95;

      index = Math.floor(
        cardProgress * industries.length
      );
    } else {
      index = Math.floor(
        progress * industries.length
      );
    }

    index = Math.max(
      0,
      Math.min(
        industries.length - 1,
        index
      )
    );

    return {
      index,
      show: true,
    };
  }, []);

  /* =====================================================
     SCROLL UPDATE
  ===================================================== */

  const updateScroll = useCallback(() => {
    const section = sectionRef.current;

    if (!section || !mountedRef.current) {
      tickingRef.current = false;
      rafRef.current = null;
      return;
    }

    tickingRef.current = false;
    rafRef.current = null;

    const rect = section.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      1;

    const scrollDistance =
      section.offsetHeight - viewportHeight;

    if (scrollDistance <= 0) {
      return;
    }

    let progress =
      -rect.top / scrollDistance;

    progress = Math.max(
      0,
      Math.min(1, progress)
    );

    /* -----------------------------------------------
       MOVE SVG PIN
    ------------------------------------------------ */

    movePinToProgress(progress);

    /* -----------------------------------------------
       UPDATE CARD ONLY WHEN NECESSARY
    ------------------------------------------------ */

    const {
      index,
      show,
    } = getIndustryIndex(progress);

    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      setActiveIndex(index);
    }

    if (show !== lastShowCardRef.current) {
      lastShowCardRef.current = show;
      setShowCard(show);
    }
  }, [
    getIndustryIndex,
    movePinToProgress,
  ]);

  /* =====================================================
     REQUEST SCROLL UPDATE
  ===================================================== */

  const requestScrollUpdate = useCallback(() => {
    if (!mountedRef.current) return;

    if (tickingRef.current) return;

    tickingRef.current = true;

    if (
      typeof window.requestAnimationFrame ===
      "function"
    ) {
      rafRef.current =
        window.requestAnimationFrame(
          updateScroll
        );
    } else {
      updateScroll();
    }
  }, [updateScroll]);

  /* =====================================================
     SCROLL ENGINE
  ===================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    mountedRef.current = true;

    initializePath();

    /*
     * Initial position.
     */
    requestScrollUpdate();

    const handleScroll = () => {
      requestScrollUpdate();
    };

    const handleResize = () => {
      initializePath();

      /*
       * Let browser finish layout before
       * recalculating section dimensions.
       */
      requestScrollUpdate();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      }
    );

    return () => {
      mountedRef.current = false;

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(
          rafRef.current
        );

        rafRef.current = null;
      }

      tickingRef.current = false;

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    initializePath,
    requestScrollUpdate,
  ]);

  /* =====================================================
     MOBILE / MANUAL NAVIGATION
  ===================================================== */

  const updateManualIndex = useCallback(
    (next) => {
      const safeIndex = Math.max(
        0,
        Math.min(
          industries.length - 1,
          next
        )
      );

      lastIndexRef.current = safeIndex;

      setActiveIndex(safeIndex);
    },
    []
  );

  const handlePrev = useCallback(() => {
    const next =
      activeIndex > 0
        ? activeIndex - 1
        : industries.length - 1;

    updateManualIndex(next);
  }, [
    activeIndex,
    updateManualIndex,
  ]);

  const handleNext = useCallback(() => {
    const next =
      activeIndex <
      industries.length - 1
        ? activeIndex + 1
        : 0;

    updateManualIndex(next);
  }, [
    activeIndex,
    updateManualIndex,
  ]);

  /* =====================================================
     DOT NAVIGATION
  ===================================================== */

  const handleDotClick = useCallback(
    (index) => {
      updateManualIndex(index);

      const section =
        sectionRef.current;

      if (!section) return;

      /*
       * Mobile:
       * Don't force scroll.
       * The user can use the arrows.
       */
      if (window.innerWidth <= 768) {
        return;
      }

      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        1;

      const scrollDistance =
        section.offsetHeight -
        viewportHeight;

      if (scrollDistance <= 0) return;

      /*
       * Keep the same visual route timing.
       */
      const targetProgress =
        index /
        (industries.length - 1);

      const target =
        section.offsetTop +
        targetProgress *
          scrollDistance;

      try {
        window.scrollTo({
          top: target,
          behavior: "smooth",
        });
      } catch {
        window.scrollTo(
          0,
          target
        );
      }
    },
    [updateManualIndex]
  );

  const activeIndustry =
    industries[activeIndex] ||
    industries[0];

  return (
    <section
      ref={sectionRef}
      className="industries-section"
    >
      <div className="industries-sticky">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="industries-heading">
          <span className="eyebrow">
            INDUSTRIES WE SERVE
          </span>

          <h2>
            Powered Businesses
            <br />
            Across Industries
          </h2>

          <p>
            We build digital solutions tailored
            to the unique needs of different
            industries, helping them grow,
            innovate and stay ahead.
          </p>
        </div>

        {/* =================================================
            TOP PILL
        ================================================= */}

        <div className="top-pill">
          <span className="pill-icon">
            ✦
          </span>

          <span>
            Different Industries
          </span>

          <b>•</b>

          <span>
            Same Goal
          </span>

          <b>→</b>

          <span>
            Your Growth
          </span>
        </div>

        {/* =================================================
            MAIN STAGE
        ================================================= */}

        <div className="industries-stage">

          {/* =================================================
              ROUTE
          ================================================= */}

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
                  <stop
                    offset="0%"
                    stopColor="white"
                    stopOpacity="0"
                  />

                  <stop
                    offset="14%"
                    stopColor="white"
                    stopOpacity="1"
                  />

                  <stop
                    offset="86%"
                    stopColor="white"
                    stopOpacity="1"
                  />

                  <stop
                    offset="100%"
                    stopColor="white"
                    stopOpacity="0"
                  />
                </linearGradient>

                <mask
                  id="industriesRouteMask"
                >
                  <rect
                    x="0"
                    y="0"
                    width="1400"
                    height="700"
                    fill="url(#industriesRouteFade)"
                  />
                </mask>

                {/* Lightweight pin glow */}
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

              {/* Route glow */}

              <path
                className="route-glow"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />

              {/* Outer road */}

              <path
                className="route-road"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />

              {/* Inner road */}

              <path
                className="route-inner"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />

              {/* Center dashed route */}

              <path
                ref={pathRef}
                className="route-center"
                mask="url(#industriesRouteMask)"
                d={ROUTE_PATH}
              />

              {/* =================================================
                  MOVING LOCATION PIN
              ================================================= */}

              <g
                ref={pinRef}
                className="moving-location-pin"
                filter="url(#industriesPinGlow)"
              >

                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  className="pin-pulse-ring"
                />

                <path
                  d="
                    M 0 6
                    C -14 6 -24 -4 -24 -18
                    C -24 -32 0 -54 0 -54
                    C 0 -54 24 -32 24 -18
                    C 24 -4 14 6 0 6
                    Z
                  "
                  fill="#ffffff"
                  stroke="#1e88e5"
                  strokeWidth="3.5"
                />

                <circle
                  cx="0"
                  cy="-18"
                  r="9"
                  fill="#1e88e5"
                />

                <circle
                  cx="0"
                  cy="-18"
                  r="4"
                  fill="#ffffff"
                />

              </g>
            </svg>

            {/* =================================================
                STATIONARY ROUTE POINTS
            ================================================= */}

            <div className="route-point point-2 desktop-only">
              <span />
            </div>

            <div className="route-point point-3 desktop-only">
              <span />
            </div>

            <div className="route-point point-4 desktop-only">
              <span />
            </div>

            <div className="route-point point-5 desktop-only">
              <span />
            </div>

            <div className="route-point point-6 desktop-only">
              <span />
            </div>

          </div>

          {/* =================================================
              INDUSTRY CARD
          ================================================= */}

          <div
            className={`center-industry-card ${
              showCard ? "show" : ""
            }`}
          >

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

              <div className="center-card-number">
                {activeIndustry.no}
              </div>

              <h3>
                {activeIndustry.title}
              </h3>

              <p>
                {activeIndustry.text}
              </p>

            </div>

          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================= */}

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

        {/* =================================================
            DOT NAVIGATION
        ================================================= */}

        <div className="route-message">

          <div className="small-dots">

            {industries.map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Jump to industry ${
                    index + 1
                  }`}
                  onClick={() =>
                    handleDotClick(index)
                  }
                  className={`dot-btn ${
                    index === activeIndex
                      ? "active"
                      : ""
                  }`}
                />
              )
            )}

          </div>

        </div>

        {/* =================================================
            EXPLORE
        ================================================= */}

        <div className="explore">
          <span>
            SCROLL TO EXPLORE
          </span>

          <div>↓</div>
        </div>

      </div>
    </section>
  );
}