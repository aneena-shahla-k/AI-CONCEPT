import React, {useCallback,useEffect,useRef,useState} from "react";
import {motion,useMotionValueEvent,useScroll,useTransform} from "framer-motion";
import "./HeroScroll.css";

const SCROLL_STEPS = [
  {
    id: 1,
    start: 0.0,
    end: 0.25,
    // title: "Next-Gen AI Experience",
    // desc: "Seamless visual motion crafted for the modern web.",
    // btnText: "Explore More",
  },

  {
    id: 3,
    start: 0.85,
    end: 1.0,
    // title: "Built For Conversions",
    // desc: "Engage your audience with immersive interactive storytelling.",
    // btnText: "Start Project",
  },
];

/* =========================================================
   CONFIG
========================================================= */

const TOTAL_FRAMES = 88;

const FRAME_PATH = (index) =>
  `/global-desk/ezgif-frame-${String(
    index + 1
  ).padStart(3, "0")}.webp`;

/* =========================================================
   TEXT STEP COMPONENT
========================================================= */

const StepItem = ({ step, progress }) => {
  const start = Math.min(step.start, step.end);
  const end = Math.max(step.start, step.end);

  const mid = (start + end) / 2;

  const fadeStart = Math.min(
    start + 0.05,
    end
  );

  const fadeEnd = Math.max(
    end - 0.05,
    start
  );

  const opacity = useTransform(
    progress,
    [start, fadeStart, fadeEnd, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, mid, end],
    [30, 0, -30]
  );

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

      {step.desc && (
        <p>{step.desc}</p>
      )}

      {step.btnText && (
        <button type="button">
          {step.btnText}
        </button>
      )}
    </motion.div>
  );
};

const HeroScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const loadingRef = useRef(new Set());
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef(null);
  const canvasSizeRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
  });
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const rect =
      canvas.getBoundingClientRect();
    const width = Math.max(
      1,
      Math.round(rect.width)
    );
    const height = Math.max(
      1,
      Math.round(rect.height)
    );
    /*
      Maximum DPR = 2.
      Prevents unnecessary high-resolution
      canvas memory usage.
    */
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const previous =
      canvasSizeRef.current;

    /*
      Don't resize when nothing changed.
    */
    if (
      previous.width === width &&
      previous.height === height &&
      previous.dpr === dpr
    ) {
      return;
    }

    canvas.width =
      width * dpr;

    canvas.height =
      height * dpr;

    canvasSizeRef.current = {
      width,
      height,
      dpr,
    };
  }, []);

  /* =========================================================
     DRAW FRAME
  ========================================================= */

  const drawFrame = useCallback(
    (index) => {
      const canvas =
        canvasRef.current;

      const image =
        imagesRef.current[index];

      if (!canvas || !image) {
        return;
      }

      /*
        Don't draw incomplete images.
      */
      if (
        !image.complete ||
        image.naturalWidth === 0
      ) {
        return;
      }

      resizeCanvas();

      const ctx =
        canvas.getContext("2d", {
          alpha: true,
        });

      if (!ctx) {
        return;
      }

      const {
        width,
        height,
        dpr,
      } = canvasSizeRef.current;

      /*
        Reset transform.
      */
      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      /*
        Clear previous frame.
      */
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /* =====================================================
         COVER IMAGE
      ===================================================== */

      const imageRatio =
        image.naturalWidth /
        image.naturalHeight;

      const canvasRatio =
        width / height;

      let drawWidth;
      let drawHeight;

      if (
        imageRatio > canvasRatio
      ) {
        drawHeight = height;

        drawWidth =
          height * imageRatio;
      } else {
        drawWidth = width;

        drawHeight =
          width / imageRatio;
      }

      const x =
        (width - drawWidth) / 2;

      const y =
        (height - drawHeight) / 2;

      ctx.drawImage(
        image,
        x,
        y,
        drawWidth,
        drawHeight
      );
    },
    [resizeCanvas]
  );

  /* =========================================================
     PRELOAD ONE FRAME
  ========================================================= */

  const preloadFrame = useCallback(
    (index) => {
      if (
        index < 0 ||
        index >= TOTAL_FRAMES
      ) {
        return;
      }

      /*
        Already loaded.
      */
      if (imagesRef.current[index]) {
        return;
      }

      /*
        Already loading.
      */
      if (
        loadingRef.current.has(index)
      ) {
        return;
      }

      loadingRef.current.add(index);

      const image = new Image();

      image.decoding = "async";

      image.onload = () => {
        imagesRef.current[index] =
          image;

        loadingRef.current.delete(
          index
        );

        /*
          If this is the frame currently
          required, draw it immediately.
        */
        if (
          index ===
          currentFrameRef.current
        ) {
          drawFrame(index);
        }
      };

      image.onerror = () => {
        loadingRef.current.delete(
          index
        );

        console.warn(
          "Failed to load frame:",
          FRAME_PATH(index)
        );
      };

      image.src =
        FRAME_PATH(index);
    },
    [drawFrame]
  );

  /* =========================================================
     PRELOAD FRAME RANGE
  ========================================================= */

  const preloadFrames = useCallback(
    (start, count = 8) => {
      const safeStart =
        Math.max(0, start);

      const end = Math.min(
        safeStart + count,
        TOTAL_FRAMES
      );

      for (
        let i = safeStart;
        i < end;
        i++
      ) {
        preloadFrame(i);
      }
    },
    [preloadFrame]
  );

  /* =========================================================
     INITIAL FRAME
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    /*
      Reset image state.
    */
    imagesRef.current = [];

    loadingRef.current.clear();

    currentFrameRef.current = 0;

    canvasSizeRef.current = {
      width: 0,
      height: 0,
      dpr: 1,
    };

    setLoaded(false);

    /*
      Load only first frame initially.
    */
    const firstImage =
      new Image();

    firstImage.decoding = "async";

    firstImage.onload = () => {
      if (cancelled) {
        return;
      }

      imagesRef.current[0] =
        firstImage;

      resizeCanvas();

      drawFrame(0);

      setLoaded(true);

      /*
        Start progressive loading
        after first frame appears.
      */
      preloadFrames(1, 8);
    };

    firstImage.onerror = () => {
      if (cancelled) {
        return;
      }

      setLoaded(false);

      console.error(
        "Failed to load first hero frame:",
        FRAME_PATH(0)
      );
    };

    firstImage.src =
      FRAME_PATH(0);

    return () => {
      cancelled = true;

      firstImage.onload = null;
      firstImage.onerror = null;
    };
  }, [
    resizeCanvas,
    drawFrame,
    preloadFrames,
  ]);

  /* =========================================================
     SCROLL → FRAME
  ========================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      if (!loaded) {
        return;
      }

      /*
        Keep progress between 0 and 1.
      */
      const clampedProgress =
        Math.max(
          0,
          Math.min(1, progress)
        );

      /*
        Convert scroll progress
        into frame number.
      */
      const frame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(
          clampedProgress *
            (TOTAL_FRAMES - 1)
        )
      );

      /*
        Same frame → no work.
      */
      if (
        frame ===
        currentFrameRef.current
      ) {
        return;
      }

      currentFrameRef.current =
        frame;

      /*
        Load upcoming frames.
      */
      preloadFrames(frame, 8);

      /*
        Cancel previous draw request.
      */
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      /*
        Draw next frame on the next
        animation frame.
      */
      animationFrameRef.current =
        requestAnimationFrame(() => {
          drawFrame(frame);
        });
    }
  );

  useEffect(() => {
    const handleResize = () => {
      resizeCanvas();

      drawFrame(
        currentFrameRef.current
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    resizeCanvas,
    drawFrame,
  ]);

  useEffect(() => {
    const loadingSet =
      loadingRef.current;

    return () => {
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      imagesRef.current = [];

      loadingSet.clear();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-scroll"
    >
      <div className="hero-sticky">
        <canvas
          ref={canvasRef}
          className={`hero-canvas ${
            loaded
              ? "is-loaded"
              : ""
          }`}
        />

        {loaded &&
          SCROLL_STEPS.map(
            (step) => (
              <StepItem
                key={step.id}
                step={step}
                progress={
                  scrollYProgress
                }
              />
            )
          )}
        {!loaded && (
          <div className="hero-loader" />
        )}

      </div>
    </section>
  );
};

export default HeroScroll;