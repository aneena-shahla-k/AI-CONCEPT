import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "./HeroScroll.css";

const SCROLL_STEPS = [
  {
    id: 1,
    start: 0.0,
    end: 0.25,
    // title: "Strategy & Asset Handover",
    // desc: "Rapid wireframe lock & strategic architecture initialization.",
    // btnText: "Explore Capabilities",
  },
  {
    id: 3,
    start: 0.85,
    end: 1.0,
    // title: "Production Ready",
    // desc: "Global DNS launch, Lighthouse 99+ score and high conversion.",
    // btnText: "Lock Your Sprint",
  },
];

const TOTAL_FRAMES = 88;

const FRAME_PATH = (index) =>
  `/global-desk/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

const StepItem = ({ step, progress }) => {
  const start = Math.min(step.start, step.end);
  const end = Math.max(step.start, step.end);
  const mid = (start + end) / 2;

  const fadeStart = Math.min(start + 0.05, end);
  const fadeEnd = Math.max(end - 0.05, start);

  const opacity = useTransform(progress, [start, fadeStart, fadeEnd, end], [0, 1, 1, 0]);
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

export default function HeroScroll() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const framesCache = useRef(new Array(TOTAL_FRAMES));
  const currentFrameIndex = useRef(0);
  const isRendering = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Canvas context cache
  const ctxRef = useRef(null);
  const dimensionsRef = useRef({ w: 0, h: 0, dpr: 1 });

  /* 1. Setup Canvas Dimensions with Fixed DPR Cap for Android */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    // Cap DPR at 1.25 on mobile to avoid Android GPU memory thrashing
    const isMobile = window.innerWidth <= 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    dimensionsRef.current = { w, h, dpr };

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true, // Bypass compositor for zero-lag mobile render
    });

    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctxRef.current = ctx;
    }
  }, []);

  /* 2. Fast Hardware Draw Engine */
  const renderFrame = useCallback((index) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Direct frame lookup or fallback to nearest available frame
    let img = framesCache.current[index];
    if (!img) {
      for (let i = 1; i < 15; i++) {
        const fallback = framesCache.current[index - i] || framesCache.current[index + i];
        if (fallback) {
          img = fallback;
          break;
        }
      }
    }

    if (!img) return;

    const { w, h, dpr } = dimensionsRef.current;
    if (w === 0 || h === 0) return;

    const imgWidth = img.width || img.naturalWidth;
    const imgHeight = img.height || img.naturalHeight;

    const scale = Math.max((w * dpr) / imgWidth, (h * dpr) / imgHeight);
    const drawW = imgWidth * scale;
    const drawH = imgHeight * scale;
    const drawX = ((w * dpr) - drawW) / 2;
    const drawY = ((h * dpr) - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  /* 3. Android-Optimized Frame Loader (Using ImageBitmap where supported) */
  const loadFrame = useCallback(async (index) => {
    if (framesCache.current[index]) return;

    try {
      if ("createImageBitmap" in window) {
        const response = await fetch(FRAME_PATH(index));
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        framesCache.current[index] = bitmap;
      } else {
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_PATH(index);
        await img.decode();
        framesCache.current[index] = img;
      }
    } catch {
      // Ignore abort errors during fast scroll
    }
  }, []);

  /* 4. Progressive Background Preload (Zero UI Block) */
  const preloadSequence = useCallback(async () => {
    // Phase 1: Load critical keyframes first (every 4th frame)
    for (let i = 0; i < TOTAL_FRAMES; i += 4) {
      await loadFrame(i);
    }

    // Phase 2: Load intermediate frames quietly
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (!framesCache.current[i]) {
        await loadFrame(i);
        // Micro-yield to keep Android UI thread 100% responsive
        if (i % 6 === 0) {
          await new Promise((r) => setTimeout(r, 16));
        }
      }
    }
  }, [loadFrame]);

  /* 5. Initialize Frame 0 Immediately */
  useEffect(() => {
    initCanvas();

    const loadFirstFrame = async () => {
      await loadFrame(0);
      renderFrame(0);
      setLoaded(true);
      preloadSequence();
    };

    loadFirstFrame();

    const handleResize = () => {
      initCanvas();
      renderFrame(currentFrameIndex.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas, loadFrame, renderFrame, preloadSequence]);

  /* 6. Hardware-synced Scroll Listener */
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!loaded) return;

    const clamped = Math.max(0, Math.min(1, progress));
    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(clamped * (TOTAL_FRAMES - 1))
    );

    if (targetIndex === currentFrameIndex.current) return;
    currentFrameIndex.current = targetIndex;

    if (!isRendering.current) {
      isRendering.current = true;
      requestAnimationFrame(() => {
        renderFrame(targetIndex);
        isRendering.current = false;
      });
    }
  });

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
}