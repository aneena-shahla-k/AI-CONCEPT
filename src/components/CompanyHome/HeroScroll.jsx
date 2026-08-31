import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "./HeroScroll.css";

const SCROLL_STEPS = [
  {
    id: 1,
    start: 0.0,
    end: 0.25,
    title: "Strategy & Asset Handover",
    desc: "Rapid wireframe lock & strategic architecture initialization.",
    btnText: "Explore Capabilities",
  },
  {
    id: 3,
    start: 0.85,
    end: 1.0,
    title: "Production Ready",
    desc: "Global DNS launch, Lighthouse 99+ score and high conversion.",
    btnText: "Lock Your Sprint",
  },
];

/* =========================================================
   CONFIG
========================================================= */
const TOTAL_FRAMES = 88;

const FRAME_PATH = (index) =>
  `/global-desk/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

/* =========================================================
   TEXT STEP COMPONENT
========================================================= */
const StepItem = ({ step, progress }) => {
  const start = Math.min(step.start, step.end);
  const end = Math.max(step.start, step.end);
  const mid = (start + end) / 2;

  const fadeStart = Math.min(start + 0.05, end);
  const fadeEnd = Math.max(end - 0.05, start);

  const opacity = useTransform(
    progress,
    [start, fadeStart, fadeEnd, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(progress, [start, mid, end], [30, 0, -30]);

  return (
    <motion.div
      className="hero-content"
      style={{
        opacity,
        y,
        pointerEvents: "none",
      }}
    >
      <h1>{step.title}</h1>
      {step.desc && <p>{step.desc}</p>}
      {step.btnText && (
        <button
          type="button"
          style={{ pointerEvents: "auto" }}
          onClick={() =>
            document.querySelector("#sprint-tiers")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {step.btnText}
        </button>
      )}
    </motion.div>
  );
};

const HeroScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* =========================================================
     RESIZE CANVAS (Only runs on mount & window resize)
  ========================================================= */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (
      canvasSizeRef.current.width === width &&
      canvasSizeRef.current.height === height &&
      canvasSizeRef.current.dpr === dpr
    ) {
      return;
    }

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvasSizeRef.current = { width, height, dpr };
  }, []);

  /* =========================================================
     DRAW FRAME (No Layout Thrashing)
  ========================================================= */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fallback to closest available frame if target frame is loading
    let image = imagesRef.current[index];
    if (!image || !image.complete || image.naturalWidth === 0) {
      for (let offset = 1; offset < 10; offset++) {
        const prev = imagesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          image = prev;
          break;
        }
      }
    }

    if (!image || !image.complete || image.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { width, height, dpr } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth;
    let drawHeight;

    if (imageRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imageRatio;
    } else {
      drawWidth = width;
      drawHeight = width / imageRatio;
    }

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  }, []);

  /* =========================================================
     SMOOTH BACKGROUND PRELOADER
  ========================================================= */
  const preloadAllFramesBackground = useCallback(() => {
    let queueIndex = 1;
    const loadBatch = () => {
      const batchLimit = Math.min(queueIndex + 4, TOTAL_FRAMES);

      for (let i = queueIndex; i < batchLimit; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.decoding = "async";
          img.src = FRAME_PATH(i);
          img.onload = () => {
            imagesRef.current[i] = img;
          };
        }
      }
      queueIndex = batchLimit;

      if (queueIndex < TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(loadBatch, { timeout: 150 });
        } else {
          setTimeout(loadBatch, 60);
        }
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadBatch, { timeout: 200 });
    } else {
      setTimeout(loadBatch, 100);
    }
  }, []);

  /* =========================================================
     INITIALIZE FIRST FRAME & START PRELOAD
  ========================================================= */
  useEffect(() => {
    let cancelled = false;
    resizeCanvas();

    const firstImage = new Image();
    firstImage.decoding = "async";
    firstImage.src = FRAME_PATH(0);

    firstImage.onload = () => {
      if (cancelled) return;
      imagesRef.current[0] = firstImage;
      drawFrame(0);
      setLoaded(true);
      preloadAllFramesBackground();
    };

    firstImage.onerror = () => {
      if (cancelled) return;
      setLoaded(true);
    };

    return () => {
      cancelled = true;
      firstImage.onload = null;
      firstImage.onerror = null;
    };
  }, [resizeCanvas, drawFrame, preloadAllFramesBackground]);

  /* =========================================================
     SCROLL → FRAME TRIGGER (Smooth RAF)
  ========================================================= */
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!loaded) return;

    const clampedProgress = Math.max(0, Math.min(1, progress));
    const frame = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(clampedProgress * (TOTAL_FRAMES - 1))
    );

    if (frame === currentFrameRef.current) return;
    currentFrameRef.current = frame;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      drawFrame(frame);
    });
  });

  /* =========================================================
     HANDLE RESIZE
  ========================================================= */
  useEffect(() => {
    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeCanvas, drawFrame]);

  return (
    <section ref={containerRef} className="hero-scroll">
      <div className="hero-sticky">
        <canvas
          ref={canvasRef}
          className={`hero-canvas ${loaded ? "is-loaded" : ""}`}
        />

        {loaded &&
          SCROLL_STEPS.map((step) => (
            <StepItem key={step.id} step={step} progress={scrollYProgress} />
          ))}

        {!loaded && <div className="hero-loader" />}
      </div>
    </section>
  );
};

export default HeroScroll;