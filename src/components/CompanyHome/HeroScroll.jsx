import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import "./HeroScroll.css";

/* =========================================================
   1. EDITABLE TEXT DATA (ഇവിടെ മാത്രം ടെക്സ്റ്റ് മാറ്റുക)
   start & end: സ്ക്രോൾ റേഞ്ച് (0 = തുടക്കം, 1 = അവസാനം)
========================================================= */
const SCROLL_STEPS = [
  {
    id: 1,
    start: 0.0,
    end: 0.25,
    title: "Next-Gen AI Experience",
    desc: "Seamless visual motion crafted for the modern web.",
    btnText: "Explore More",
  },
  {
    id: 2,
    start: 0.3,
    end: 0.55,
    title: "Realtime Performance",
    desc: "Zero lag 60fps canvas-driven progressive rendering.",
    btnText: "Learn Tech",
  },
  {
    id: 3,
    start: 0.6,
    end: 0.85,
    title: "Built For Conversions",
    desc: "Engage your audience with immersive interactive storytelling.",
    btnText: "Start Project",
  },
];

/* =========================================================
   CONFIG
========================================================= */
const DESKTOP_FRAMES = 80;
const MOBILE_FRAMES = 72;

const DESKTOP_PATH = (index) =>
  `/global-desk/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

const MOBILE_PATH = (index) =>
  `/global-phone/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

/* =========================================================
   TEXT STEP COMPONENT
========================================================= */
const StepItem = ({ step, progress }) => {
  const mid = (step.start + step.end) / 2;

  // സ്ക്രോൾ ചെയ്യുമ്പോൾ ടെക്സ്റ്റ് സ്മൂത്തായി വന്ന് പോകാനുള്ള അനിമേഷൻ
  const opacity = useTransform(
    progress,
    [step.start, step.start + 0.05, step.end - 0.05, step.end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [step.start, mid, step.end],
    [30, 0, -30]
  );

  return (
    <motion.div
      className="hero-content"
      style={{
        opacity,
        y,
        pointerEvents: "auto",
      }}
    >
      <h1>{step.title}</h1>
      {step.desc && <p>{step.desc}</p>}
      {step.btnText && <button type="button">{step.btnText}</button>}
    </motion.div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */
const HeroScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const loadingRef = useRef(new Set());
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile((prev) => (prev === mobile ? prev : mobile));
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

  const getFramePath = useCallback(
    (index) => (isMobile ? MOBILE_PATH(index) : DESKTOP_PATH(index)),
    [isMobile]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prev = canvasSizeRef.current;

    if (prev.width === width && prev.height === height && prev.dpr === dpr) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvasSizeRef.current = { width, height, dpr };
  }, []);

  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      const image = imagesRef.current[index];
      if (!canvas || !image || !image.complete || image.naturalWidth === 0) return;

      resizeCanvas();
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const { width, height, dpr } = canvasSizeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;
      let drawWidth, drawHeight;

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
    },
    [resizeCanvas]
  );

  const preloadFrame = useCallback(
    (index) => {
      if (index < 0 || index >= totalFrames || imagesRef.current[index] || loadingRef.current.has(index)) return;

      loadingRef.current.add(index);
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        imagesRef.current[index] = image;
        loadingRef.current.delete(index);
        if (index === currentFrameRef.current) drawFrame(index);
      };
      image.onerror = () => loadingRef.current.delete(index);
      image.src = getFramePath(index);
    },
    [getFramePath, totalFrames, drawFrame]
  );

  const preloadFrames = useCallback(
    (start, count = 8) => {
      const safeStart = Math.max(0, start);
      const end = Math.min(safeStart + count, totalFrames);
      for (let i = safeStart; i < end; i++) preloadFrame(i);
    },
    [preloadFrame, totalFrames]
  );

  useEffect(() => {
    let cancelled = false;
    imagesRef.current = [];
    loadingRef.current.clear();
    currentFrameRef.current = 0;
    canvasSizeRef.current = { width: 0, height: 0, dpr: 1 };
    setLoaded(false);

    const firstImage = new Image();
    firstImage.decoding = "async";
    firstImage.onload = () => {
      if (cancelled) return;
      imagesRef.current[0] = firstImage;
      resizeCanvas();
      drawFrame(0);
      setLoaded(true);
      preloadFrames(1, 8);
    };
    firstImage.onerror = () => {
      if (cancelled) return;
      setLoaded(false);
      console.error("Failed to load hero frame:", getFramePath(0));
    };
    firstImage.src = getFramePath(0);

    return () => {
      cancelled = true;
      firstImage.onload = null;
      firstImage.onerror = null;
    };
  }, [getFramePath, resizeCanvas, drawFrame, preloadFrames]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!loaded) return;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const frame = Math.min(totalFrames - 1, Math.floor(clampedProgress * (totalFrames - 1)));

    if (frame === currentFrameRef.current) return;
    currentFrameRef.current = frame;
    preloadFrames(frame, 8);

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => drawFrame(frame));
  });

  useEffect(() => {
    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeCanvas, drawFrame]);

  useEffect(() => {
    const loadingSet = loadingRef.current;
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      imagesRef.current = [];
      loadingSet.clear();
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-scroll">
      <div className="hero-sticky">
        <canvas
          ref={canvasRef}
          className={`hero-canvas ${loaded ? "is-loaded" : ""}`}
        />

        {/* സ്ക്രോൾ അനുസരിച്ച് മാറുന്ന ടെക്സ്റ്റുകൾ */}
        {loaded &&
          SCROLL_STEPS.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              progress={scrollYProgress}
            />
          ))}

        {!loaded && <div className="hero-loader" />}
      </div>
    </section>
  );
};

export default HeroScroll;