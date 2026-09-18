import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
} from "framer-motion";
import "./HowWeWork.css";

import img1 from "../assets/images/about/img1.png";
import img2 from "../assets/images/about/img2.png";
import img3 from "../assets/images/about/img3.png";
import img4 from "../assets/images/about/img4.png";
import img5 from "../assets/images/about/img5.png";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the idea, business, market, customers, and objectives.",
    image: img1,
  },
  {
    number: "02",
    title: "Design the Route",
    text: "Create the Growth Plan, business model, technology strategy, and marketing roadmap.",
    image: img2,
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the website, app, e-commerce, booking system, ERP, AI, integrations, and other technology.",
    image: img3,
  },
  {
    number: "04",
    title: "Connect",
    text: "Connect the systems into one business ecosystem.",
    image: img4,
  },
  {
    number: "05",
    title: "Hand Over",
    text: "You receive the roadmap, technology, systems, and operating structure. You drive the business.",
    image: img5,
  },
];

const desktopCardPositions = [
  { left: "15%", top: "18%" },
  { left: "35%", top: "7%" },
  { left: "55%", top: "20%" },
  { left: "74%", top: "6%" },
  { left: "90%", top: "18%" },
];

const mobileCardPositions = [
  { left: "28%", top: "8%" },
  { left: "70%", top: "26%" },
  { left: "26%", top: "45%" },
  { left: "72%", top: "65%" },
  { left: "34%", top: "84%" },
];

const DESKTOP_PATH =
  "M 40 390 C 180 390, 210 310, 360 350 S 560 450, 700 340 S 900 250, 1030 350 S 1240 430, 1370 320 S 1500 220, 1580 270";

const MOBILE_PATH =
  "M 180 20 C 50 120, 50 200, 180 280 S 310 400, 180 500 S 50 630, 180 720 S 260 780, 180 835";

const STEP_CENTERS = [0.12, 0.32, 0.52, 0.72, 0.92];

const getStepProgress = (index) => {
  const center = STEP_CENTERS[index];
  const range = 0.08;
  return {
    center,
    start: center - range,
    end: center + range,
  };
};

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const desktopPathRef = useRef(null);
  const mobilePathRef = useRef(null);

  const desktopPathLengthRef = useRef(0);
  const mobilePathLengthRef = useRef(0);

  const rafRef = useRef(0);
  const animationControls = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const autoProgress = useMotionValue(0);

  /* ---------------------------------------------------------
     RESPONSIVE CHECK
  --------------------------------------------------------- */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 850px)");
    const updateDevice = () => setIsMobile(mediaQuery.matches);
    updateDevice();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateDevice);
      return () => mediaQuery.removeEventListener("change", updateDevice);
    }
    mediaQuery.addListener(updateDevice);
    return () => mediaQuery.removeListener(updateDevice);
  }, []);

  /* ---------------------------------------------------------
     CACHE SVG PATH LENGTHS
  --------------------------------------------------------- */
  const cachePathLengths = useCallback(() => {
    try {
      if (desktopPathRef.current && typeof desktopPathRef.current.getTotalLength === "function") {
        const length = desktopPathRef.current.getTotalLength();
        desktopPathLengthRef.current = Number.isFinite(length) && length > 0 ? length : 0;
      }

      if (mobilePathRef.current && typeof mobilePathRef.current.getTotalLength === "function") {
        const length = mobilePathRef.current.getTotalLength();
        mobilePathLengthRef.current = Number.isFinite(length) && length > 0 ? length : 0;
      }
    } catch (error) {
      console.warn("Path measurement error:", error);
    }
  }, []);

  useLayoutEffect(() => {
    cachePathLengths();
    const handleResize = () => window.requestAnimationFrame(cachePathLengths);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cachePathLengths, isMobile]);

  /* ---------------------------------------------------------
     PIN POSITION VALUES
  --------------------------------------------------------- */
  const desktopX = useMotionValue(40);
  const desktopY = useMotionValue(390);

  const desktopMarkerLeft = useTransform(desktopX, (value) => `${(value / 1600) * 100}%`);
  const desktopMarkerTop = useTransform(desktopY, (value) => `${(value / 500) * 100}%`);

  const mobileX = useMotionValue(180);
  const mobileY = useMotionValue(20);

  const mobileMarkerLeft = useTransform(mobileX, (value) => `${(value / 360) * 100}%`);
  const mobileMarkerTop = useTransform(mobileY, (value) => `${(value / 850) * 100}%`);

  /* ---------------------------------------------------------
     ANIMATION PROGRESS -> PIN MOVEMENT
  --------------------------------------------------------- */
  useMotionValueEvent(autoProgress, "change", (progress) => {
    const currentProgress = Math.min(Math.max(progress, 0), 1);

    if (rafRef.current) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;

      try {
        if (isMobile) {
          const path = mobilePathRef.current;
          let length = mobilePathLengthRef.current;

          // If cache was missed, calculate directly
          if (!length && path && typeof path.getTotalLength === "function") {
            length = path.getTotalLength();
            mobilePathLengthRef.current = length;
          }

          if (path && length) {
            const point = path.getPointAtLength(currentProgress * length);
            if (point && Number.isFinite(point.x) && Number.isFinite(point.y)) {
              mobileX.set(point.x);
              mobileY.set(point.y);
            }
          }
        } else {
          const path = desktopPathRef.current;
          let length = desktopPathLengthRef.current;

          if (!length && path && typeof path.getTotalLength === "function") {
            length = path.getTotalLength();
            desktopPathLengthRef.current = length;
          }

          if (path && length) {
            const point = path.getPointAtLength(currentProgress * length);
            if (point && Number.isFinite(point.x) && Number.isFinite(point.y)) {
              desktopX.set(point.x);
              desktopY.set(point.y);
            }
          }
        }

        let currentActive = 0;
        for (let i = 0; i < STEP_CENTERS.length; i++) {
          if (currentProgress >= STEP_CENTERS[i] - 0.1) {
            currentActive = i;
          }
        }
        setActiveStep(currentActive);
      } catch (err) {
        // Fallback
      }
    });
  });

  /* ---------------------------------------------------------
     AUTO FLOW & SCROLL DOWN TO NEXT SECTION
  --------------------------------------------------------- */
  const runAutoFlow = useCallback((fromStart = false) => {
    if (animationControls.current) animationControls.current.stop();
    setIsPlaying(true);

    if (fromStart) {
      autoProgress.set(0);
    }

    const currentVal = fromStart ? 0 : (autoProgress.get() >= 0.98 ? 0 : autoProgress.get());

    animationControls.current = animate(autoProgress, 1, {
      from: currentVal,
      duration: 13 * (1 - currentVal),
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

  const goToStep = (index) => {
    if (animationControls.current) animationControls.current.stop();
    setIsPlaying(false);

    animate(autoProgress, STEP_CENTERS[index], {
      duration: 0.9,
      ease: "easeInOut",
    });
  };

  /* ---------------------------------------------------------
     RESTART EVERY TIME SECTION ENTERS VIEWPORT
  --------------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Whenever user scrolls in, restart movement from 0
          cachePathLengths();
          runAutoFlow(true);
        } else {
          // When user scrolls away, stop and reset
          if (animationControls.current) animationControls.current.stop();
          setIsPlaying(false);
          autoProgress.set(0);
          setActiveStep(0);
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
  }, [runAutoFlow, autoProgress, cachePathLengths]);

  return (
    <div ref={sectionRef} className="how-work-wrapper">
      <section className="how-work">
        <div className="how-work-glow glow-one" />
        <div className="how-work-glow glow-two" />

        <div className="how-work-container">
          {/* HEADER */}
          <div className="how-work-header">
            <div className="section-label">
              <span>HOW WE WORK</span>
            </div>

            <h2>
              From idea to<br />
             <span className="heading-gradient">Execution </span>  
            </h2>

            <p>
              We follow a clear and strategic process to turn your vision
              <br className="desktop-break" />
              into a connected digital business.
            </p>

            <div className="header-action-row">
              <button className="how-work-play-btn" onClick={togglePlay}>
                <span>{isPlaying ? "⏸" : "▶"}</span>
                {isPlaying ? "Pause Journey" : "Auto Play Journey"}
              </button>
            </div>
          </div>

          {/* TOP TAGS */}
          <div className="route-tags">
            <div
              className={`route-tag ${activeStep <= 1 ? "active" : ""}`}
              onClick={() => goToStep(0)}
            >
              <span className="tag-icon">⌘</span>
              Strategy
            </div>
            <span className="tag-dot">•</span>
            <div
              className={`route-tag ${activeStep >= 2 && activeStep <= 3 ? "active" : ""}`}
              onClick={() => goToStep(2)}
            >
              <span className="tag-icon">⚙</span>
              Systems
            </div>
            <span className="tag-dot">•</span>
            <div
              className={`route-tag ${activeStep === 4 ? "active" : ""}`}
              onClick={() => goToStep(4)}
            >
              <span className="tag-icon">↗</span>
              Growth
            </div>
          </div>

          {/* DESKTOP STAGE */}
          {!isMobile && (
            <div className="route-area desktop-route-area">

              <svg
                className="route-svg desktop-route-svg"
                viewBox="0 0 1600 500"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className="route-glow" d={DESKTOP_PATH} />
                <path ref={desktopPathRef} className="route-road" d={DESKTOP_PATH} />
                <path className="route-dashed" d={DESKTOP_PATH} />
              </svg>

              {/* DESKTOP PIN */}
              <motion.div
                className="route-location-tag desktop-pin-tag"
                style={{
                  left: desktopMarkerLeft,
                  top: desktopMarkerTop,
                }}
              >
                <PinBubble />
              </motion.div>

              {/* STEP CARDS */}
              {steps.map((step, index) => {
                const { center, start } = getStepProgress(index);
                return (
                  <DesktopStepCard
                    key={step.number}
                    step={step}
                    index={index}
                    progress={autoProgress}
                    center={center}
                    start={start}
                    position={desktopCardPositions[index]}
                    onClick={() => goToStep(index)}
                  />
                );
              })}
            </div>
          )}

          {/* MOBILE STAGE */}
          {isMobile && (
            <div className="mobile-stage-area">
              <svg
                className="mobile-stage-svg"
                viewBox="0 0 360 850"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className="mobile-road-glow" d={MOBILE_PATH} />
                <path ref={mobilePathRef} className="mobile-road-base" d={MOBILE_PATH} />
                <path className="mobile-road-dashed" d={MOBILE_PATH} />
              </svg>

              {/* MOVING MOBILE PIN */}
              <motion.div
                className="route-location-tag mobile-pin-tag"
                style={{
                  left: mobileMarkerLeft,
                  top: mobileMarkerTop,
                }}
              >
                <PinBubble />
              </motion.div>

              {/* MOBILE CARDS */}
              {steps.map((step, index) => {
                const { center, start } = getStepProgress(index);
                return (
                  <MobileStepCard
                    key={step.number}
                    step={step}
                    progress={autoProgress}
                    center={center}
                    start={start}
                    position={mobileCardPositions[index]}
                    onClick={() => goToStep(index)}
                  />
                );
              })}
            </div>
          )}

          {/* PROGRESS BAR */}
          <div className="route-progress">
            {steps.map((step, index) => (
              <ProgressDot
                key={step.number}
                index={index}
                progress={autoProgress}
                onClick={() => goToStep(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   PIN
========================================================= */
const PinBubble = memo(function PinBubble() {
  return (
    <>
      <div className="tag-ripple-ring" />
      <div className="tag-pin-bubble">
        <svg viewBox="0 0 24 24" fill="currentColor" className="tag-pin-icon" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </svg>
      </div>
      <div className="tag-pointer-tip" />
    </>
  );
});

/* =========================================================
   DESKTOP CARD
========================================================= */
const DesktopStepCard = memo(function DesktopStepCard({
  step,
  index,
  progress,
  center,
  start,
  position,
  onClick,
}) {
  const opacity = useTransform(progress, [start - 0.04, start, center], [0.35, 0.8, 1]);
  const scale = useTransform(progress, [start, center, center + 0.06], [0.96, 1.05, 1]);
  const y = useTransform(progress, [start, center, center + 0.06], [6, -6, 0]);
  const glowOpacity = useTransform(progress, [start, center, center + 0.06], [0, 1, 0.12]);
  const pinScale = useTransform(progress, [start, center, center + 0.06], [0.9, 1.35, 1.1]);

  return (
    <>
      <motion.div
        className={`route-pin pin-${index + 1}`}
        style={{
          left: position.left,
          top: "66%",
          scale: pinScale,
        }}
        onClick={onClick}
      >
        <span />
      </motion.div>

      <motion.article
        className={`work-card card-${index + 1}`}
        style={{
          left: position.left,
          top: position.top,
          opacity,
          scale,
          y,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <motion.div className="card-active-glow" style={{ opacity: glowOpacity }} />
        <div className="card-number">{step.number}</div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <div className="card-image">
          <img src={step.image} alt={step.title} loading="lazy" decoding="async" />
        </div>
      </motion.article>
    </>
  );
});

/* =========================================================
   MOBILE CARD
========================================================= */
const MobileStepCard = memo(function MobileStepCard({
  step,
  progress,
  center,
  start,
  position,
  onClick,
}) {
  const opacity = useTransform(progress, [start - 0.04, start, center], [0, 0.7, 1]);
  const scale = useTransform(progress, [start, center, center + 0.06], [0.94, 1.03, 1]);
  const y = useTransform(progress, [start, center, center + 0.06], [8, -4, 0]);

  return (
    <motion.article
      className="work-card mobile-step-card"
      style={{
        left: position.left,
        top: position.top,
        opacity,
        scale,
        y,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="card-number">{step.number}</div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
      <div className="card-image">
        <img src={step.image} alt={step.title} loading="lazy" decoding="async" />
      </div>
    </motion.article>
  );
});

/* =========================================================
   PROGRESS DOT
========================================================= */
const ProgressDot = memo(function ProgressDot({ index, progress, onClick }) {
  const center = STEP_CENTERS[index];
  const opacity = useTransform(progress, [center - 0.08, center, center + 0.08], [0.35, 1, 0.6]);
  const scale = useTransform(progress, [center - 0.08, center, center + 0.08], [0.9, 1.15, 1]);

  return (
    <motion.span
      className="progress-dot"
      style={{ opacity, scale, cursor: "pointer" }}
      onClick={onClick}
    />
  );
});