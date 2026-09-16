import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
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

const getStepProgress = (index) => {
  const center = 0.12 + index * 0.2;
  const range = 0.08;

  return {
    center,
    start: center - range,
    end: center + range,
  };
};

export default function HowWeWork() {
  const containerRef = useRef(null);
  const desktopPathRef = useRef(null);
  const mobilePathRef = useRef(null);

  const desktopPathLengthRef = useRef(0);
  const mobilePathLengthRef = useRef(0);

  const rafRef = useRef(0);
  const lastProgressRef = useRef(-1);

  const [isMobile, setIsMobile] = useState(false);

  /* ---------------------------------------------------------
     RESPONSIVE CHECK
  --------------------------------------------------------- */

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 850px)");

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateDevice);
      return () => {
        mediaQuery.removeEventListener("change", updateDevice);
      };
    }

    mediaQuery.addListener(updateDevice);

    return () => {
      mediaQuery.removeListener(updateDevice);
    };
  }, []);

  /* ---------------------------------------------------------
     CACHE SVG PATH LENGTHS
  --------------------------------------------------------- */

  useLayoutEffect(() => {
    const cachePathLengths = () => {
      try {
        const desktopPath = desktopPathRef.current;
        const mobilePath = mobilePathRef.current;

        if (
          desktopPath &&
          typeof desktopPath.getTotalLength === "function"
        ) {
          const length = desktopPath.getTotalLength();

          desktopPathLengthRef.current =
            Number.isFinite(length) && length > 0 ? length : 0;
        }

        if (
          mobilePath &&
          typeof mobilePath.getTotalLength === "function"
        ) {
          const length = mobilePath.getTotalLength();

          mobilePathLengthRef.current =
            Number.isFinite(length) && length > 0 ? length : 0;
        }
      } catch (error) {
        console.warn("HowWeWork path measurement skipped.");
      }
    };

    cachePathLengths();

    const handleResize = () => {
      window.requestAnimationFrame(cachePathLengths);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ---------------------------------------------------------
     SCROLL PROGRESS
  --------------------------------------------------------- */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ---------------------------------------------------------
     DESKTOP PIN
  --------------------------------------------------------- */

  const desktopX = useMotionValue(40);
  const desktopY = useMotionValue(390);

  const desktopMarkerLeft = useTransform(
    desktopX,
    (value) => `${(value / 1600) * 100}%`
  );

  const desktopMarkerTop = useTransform(
    desktopY,
    (value) => `${(value / 500) * 100}%`
  );

  /* ---------------------------------------------------------
     MOBILE PIN
  --------------------------------------------------------- */

  const mobileX = useMotionValue(180);
  const mobileY = useMotionValue(20);

  const mobileMarkerLeft = useTransform(
    mobileX,
    (value) => `${(value / 360) * 100}%`
  );

  const mobileMarkerTop = useTransform(
    mobileY,
    (value) => `${(value / 850) * 100}%`
  );

  /* ---------------------------------------------------------
     MOVE PIN
     
     Important:
     SVG path calculation is throttled through requestAnimationFrame.
  --------------------------------------------------------- */

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    lastProgressRef.current = Math.min(Math.max(progress, 0), 1);

    if (rafRef.current) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;

      const currentProgress = lastProgressRef.current;

      if (currentProgress < 0) return;

      try {
        if (isMobile) {
          const path = mobilePathRef.current;
          const length = mobilePathLengthRef.current;

          if (
            !path ||
            !length ||
            typeof path.getPointAtLength !== "function"
          ) {
            return;
          }

          const point = path.getPointAtLength(currentProgress * length);

          if (
            point &&
            Number.isFinite(point.x) &&
            Number.isFinite(point.y)
          ) {
            mobileX.set(point.x);
            mobileY.set(point.y);
          }
        } else {
          const path = desktopPathRef.current;
          const length = desktopPathLengthRef.current;

          if (
            !path ||
            !length ||
            typeof path.getPointAtLength !== "function"
          ) {
            return;
          }

          const point = path.getPointAtLength(currentProgress * length);

          if (
            point &&
            Number.isFinite(point.x) &&
            Number.isFinite(point.y)
          ) {
            desktopX.set(point.x);
            desktopY.set(point.y);
          }
        }
      } catch {
        // Keep section usable on browsers with limited SVG support.
      }
    });
  });

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="how-work-sticky-wrapper">
      <section className="how-work">
        <div className="how-work-glow glow-one" />
        <div className="how-work-glow glow-two" />

        <div className="how-work-container">

          {/* -------------------------------------------------------
              HEADER
          ------------------------------------------------------- */}

          <div className="how-work-header">
            <div className="section-label">
              <span>HOW WE WORK</span>
            </div>

            <h2>
              From idea to
              <br />
              Execution
            </h2>

            <p>
              We follow a clear and strategic process to turn your vision
              <br className="desktop-break" />
              into a connected digital business.
            </p>
          </div>

          {/* -------------------------------------------------------
              TOP TAGS
          ------------------------------------------------------- */}

          <div className="route-tags">
            <div className="route-tag active">
              <span className="tag-icon">⌘</span>
              Strategy
            </div>

            <span className="tag-dot">•</span>

            <div className="route-tag">
              <span className="tag-icon">⚙</span>
              Systems
            </div>

            <span className="tag-dot">•</span>

            <div className="route-tag">
              <span className="tag-icon">↗</span>
              Growth
            </div>
          </div>

          {/* =======================================================
              DESKTOP
          ======================================================= */}

          {!isMobile && (
            <div className="route-area desktop-route-area">

              <div className="map-line map-line-1" />
              <div className="map-line map-line-2" />
              <div className="map-line map-line-3" />

              <svg
                className="route-svg desktop-route-svg"
                viewBox="0 0 1600 500"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="route-glow"
                  d={DESKTOP_PATH}
                />

                <path
                  ref={desktopPathRef}
                  className="route-road"
                  d={DESKTOP_PATH}
                />

                <path
                  className="route-dashed"
                  d={DESKTOP_PATH}
                />
              </svg>

              {/* MOVING PIN */}

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
                const { center, start, end } = getStepProgress(index);

                return (
                  <DesktopStepCard
                    key={step.number}
                    step={step}
                    index={index}
                    progress={scrollYProgress}
                    center={center}
                    start={start}
                    end={end}
                    position={desktopCardPositions[index]}
                  />
                );
              })}
            </div>
          )}

          {/* =======================================================
              MOBILE
          ======================================================= */}

          {isMobile && (
            <div className="mobile-stage-area">

              <svg
                className="mobile-stage-svg"
                viewBox="0 0 360 850"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="mobile-road-glow"
                  d={MOBILE_PATH}
                />

                <path
                  ref={mobilePathRef}
                  className="mobile-road-base"
                  d={MOBILE_PATH}
                />

                <path
                  className="mobile-road-dashed"
                  d={MOBILE_PATH}
                />
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
                const { center, start, end } = getStepProgress(index);

                return (
                  <MobileStepCard
                    key={step.number}
                    step={step}
                    progress={scrollYProgress}
                    center={center}
                    start={start}
                    end={end}
                    position={mobileCardPositions[index]}
                  />
                );
              })}
            </div>
          )}

          {/* -------------------------------------------------------
              PROGRESS
          ------------------------------------------------------- */}

          <div className="route-progress">
            {steps.map((step, index) => (
              <ProgressDot
                key={step.number}
                index={index}
                progress={scrollYProgress}
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
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="tag-pin-icon"
          aria-hidden="true"
        >
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
  end,
  position,
}) {
  const opacity = useTransform(
    progress,
    [start - 0.04, start, center, end, end + 0.04],
    [0, 1, 1, 1, 0.35]
  );

  const scale = useTransform(
    progress,
    [start, center, end],
    [0.96, 1.03, 0.97]
  );

  const y = useTransform(
    progress,
    [start, center, end],
    [8, -8, 5]
  );

  const glowOpacity = useTransform(
    progress,
    [start, center, end],
    [0, 1, 0]
  );

  const pinScale = useTransform(
    progress,
    [start, center, end],
    [0.85, 1.3, 0.85]
  );

  return (
    <>
      <motion.div
        className={`route-pin pin-${index + 1}`}
        style={{
          left: position.left,
          top: "66%",
          scale: pinScale,
        }}
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
        }}
      >
        <motion.div
          className="card-active-glow"
          style={{
            opacity: glowOpacity,
          }}
        />

        <div className="card-number">
          {step.number}
        </div>

        <h3>{step.title}</h3>

        <p>{step.text}</p>

        <div className="card-image">
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
            decoding="async"
          />
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
  end,
  position,
}) {
  const opacity = useTransform(
    progress,
    [start - 0.03, start + 0.01, center, end - 0.01, end + 0.03],
    [0, 1, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [start, center, end],
    [0.94, 1.01, 0.94]
  );

  const y = useTransform(
    progress,
    [start, center, end],
    [10, 0, -10]
  );

  return (
    <motion.article
      className="work-card mobile-step-card"
      style={{
        left: position.left,
        top: position.top,
        opacity,
        scale,
        y,
        pointerEvents: "none",
      }}
    >
      <div className="card-number">
        {step.number}
      </div>

      <h3>{step.title}</h3>

      <p>{step.text}</p>

      <div className="card-image">
        <img
          src={step.image}
          alt={step.title}
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.article>
  );
});

/* =========================================================
   PROGRESS DOT
========================================================= */

const ProgressDot = memo(function ProgressDot({
  index,
  progress,
}) {
  const center = 0.12 + index * 0.2;

  const opacity = useTransform(
    progress,
    [center - 0.08, center, center + 0.08],
    [0.35, 1, 0.6]
  );

  const scale = useTransform(
    progress,
    [center - 0.08, center, center + 0.08],
    [0.9, 1.15, 1]
  );

  return (
    <motion.span
      className="progress-dot"
      style={{
        opacity,
        scale,
      }}
    />
  );
});