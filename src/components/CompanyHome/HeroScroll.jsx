import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import "./HeroScroll.css";

/* =========================================================
   CONFIG
========================================================= */

const DESKTOP_FRAMES = 80;
const MOBILE_FRAMES = 72;

const DESKTOP_PATH = (index) =>
  `/global-desk/ezgif-frame-${String(
    index + 1
  ).padStart(3, "0")}.webp`;

const MOBILE_PATH = (index) =>
  `/global-phone/ezgif-frame-${String(
    index + 1
  ).padStart(3, "0")}.webp`;

/* =========================================================
   COMPONENT
========================================================= */

const HeroScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  /*
    Stores loaded Image objects.
  */
  const imagesRef = useRef([]);

  /*
    Keeps track of images currently being loaded.
  */
  const loadingRef = useRef(new Set());

  /*
    Currently displayed frame.
  */
  const currentFrameRef = useRef(0);

  /*
    requestAnimationFrame reference.
  */
  const animationFrameRef = useRef(null);

  /*
    Prevents unnecessary canvas resizing.
  */
  const canvasSizeRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
  });

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.innerWidth <= 768
  );

  const [loaded, setLoaded] = useState(false);

  /* =========================================================
     SCROLL
  ========================================================= */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* =========================================================
     DEVICE DETECTION
  ========================================================= */

  useEffect(() => {
    const checkDevice = () => {
      const mobile =
        window.innerWidth <= 768;

      setIsMobile((previous) => {
        if (previous === mobile) {
          return previous;
        }

        return mobile;
      });
    };

    checkDevice();

    window.addEventListener(
      "resize",
      checkDevice
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkDevice
      );
    };
  }, []);

  /* =========================================================
     FRAME CONFIG
  ========================================================= */

  const totalFrames = isMobile
    ? MOBILE_FRAMES
    : DESKTOP_FRAMES;

  const getFramePath = useCallback(
    (index) => {
      return isMobile
        ? MOBILE_PATH(index)
        : DESKTOP_PATH(index);
    },
    [isMobile]
  );

  /* =========================================================
     RESIZE CANVAS
  ========================================================= */

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
      Limit DPR to 2 for better performance.
    */
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const previous =
      canvasSizeRef.current;

    /*
      Do not resize if dimensions
      haven't changed.
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

      /* -----------------------------------------------------
         COVER IMAGE
      ----------------------------------------------------- */

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
        /*
          Image is wider.
        */
        drawHeight = height;
        drawWidth =
          height * imageRatio;
      } else {
        /*
          Image is taller.
        */
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
        index >= totalFrames
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
          If the frame that just loaded
          is currently needed, draw it.
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
      };

      image.src =
        getFramePath(index);
    },
    [
      getFramePath,
      totalFrames,
      drawFrame,
    ]
  );

  /* =========================================================
     PRELOAD RANGE
  ========================================================= */

  const preloadFrames = useCallback(
    (start, count = 8) => {
      const safeStart =
        Math.max(0, start);

      const end = Math.min(
        safeStart + count,
        totalFrames
      );

      for (
        let i = safeStart;
        i < end;
        i++
      ) {
        preloadFrame(i);
      }
    },
    [
      preloadFrame,
      totalFrames,
    ]
  );

  /* =========================================================
     INITIAL FRAME LOADING
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    /*
      Reset previous frame data.
    */
    imagesRef.current = [];

    loadingRef.current.clear();

    currentFrameRef.current = 0;

    /*
      Reset canvas size cache.
    */
    canvasSizeRef.current = {
      width: 0,
      height: 0,
      dpr: 1,
    };

    setLoaded(false);

    const firstImage =
      new Image();

    firstImage.decoding = "async";

    firstImage.onload = () => {
      if (cancelled) {
        return;
      }

      imagesRef.current[0] =
        firstImage;

      /*
        Prepare canvas.
      */
      resizeCanvas();

      /*
        Draw first frame immediately.
      */
      drawFrame(0);

      setLoaded(true);

      /*
        Start progressive loading.
      */
      preloadFrames(1, 8);
    };

    firstImage.onerror = () => {
      if (cancelled) {
        return;
      }

      setLoaded(false);

      console.error(
        "Failed to load hero frame:",
        getFramePath(0)
      );
    };

    firstImage.src =
      getFramePath(0);

    return () => {
      cancelled = true;

      firstImage.onload = null;
      firstImage.onerror = null;
    };
  }, [
    getFramePath,
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
        Clamp scroll progress.
      */
      const clampedProgress =
        Math.max(
          0,
          Math.min(1, progress)
        );

      /*
        Convert scroll progress
        to frame number.
      */
      const frame = Math.min(
        totalFrames - 1,
        Math.floor(
          clampedProgress *
            (totalFrames - 1)
        )
      );

      /*
        Avoid drawing the same frame.
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
        Load frames slightly ahead.
      */
      preloadFrames(frame, 8);

      /*
        Cancel previous RAF.
      */
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      /*
        Draw through RAF.
      */
      animationFrameRef.current =
        requestAnimationFrame(() => {
          drawFrame(frame);
        });
    }
  );

  /* =========================================================
     RESIZE
  ========================================================= */

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

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    /*
      Store the current Set reference so
      ESLint doesn't complain about the
      ref changing during cleanup.
    */
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

  /* =========================================================
     RENDER
  ========================================================= */

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

        {!loaded && (
          <div className="hero-loader" />
        )}

      </div>
    </section>
  );
};

export default HeroScroll;