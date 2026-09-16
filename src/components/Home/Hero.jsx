import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // -----------------------------------------
    // VIDEO SETTINGS
    // -----------------------------------------

    video.loop = false;
    video.autoplay = false;
    video.muted = false;
    video.volume = 1;

    // -----------------------------------------
    // PLAY VIDEO
    // -----------------------------------------

    const playVideo = () => {
      try {
        video.currentTime = 0;
      } catch (error) {
        // Ignore currentTime errors
      }

      video.loop = false;
      video.muted = false;
      video.volume = 1;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser blocked autoplay with sound.
          // First user interaction will try again.
        });
      }
    };

    // -----------------------------------------
    // STOP VIDEO
    // -----------------------------------------

    const stopVideo = () => {
      video.pause();

      try {
        video.currentTime = 0;
      } catch (error) {
        // Ignore currentTime errors
      }
    };

    // -----------------------------------------
    // WHEN VIDEO ENDS
    // -----------------------------------------

    const handleVideoEnded = () => {
      video.pause();

      try {
        video.currentTime = video.duration;
      } catch (error) {
        // Ignore duration errors
      }
    };

    video.addEventListener("ended", handleVideoEnded);

    // -----------------------------------------
    // HERO SCROLLTRIGGER
    // -----------------------------------------

    const heroTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",

      onEnter: () => {
        playVideo();
      },

      onEnterBack: () => {
        playVideo();
      },

      onLeave: () => {
        stopVideo();
      },

      onLeaveBack: () => {
        stopVideo();
      },
    });

    // -----------------------------------------
    // INITIAL PLAY
    // -----------------------------------------

    // Try to start video with sound on page load.
    // Browser autoplay policy may block this.
    playVideo();

    // -----------------------------------------
    // FIRST USER INTERACTION
    // -----------------------------------------

    const enableSoundOnFirstInteraction = () => {
      video.muted = false;
      video.volume = 1;

      if (video.paused) {
        video.play().catch(() => {});
      }

      // Remove listeners after first interaction
      window.removeEventListener(
        "pointerdown",
        enableSoundOnFirstInteraction
      );

      window.removeEventListener(
        "touchstart",
        enableSoundOnFirstInteraction
      );

      window.removeEventListener(
        "keydown",
        enableSoundOnFirstInteraction
      );
    };

    window.addEventListener(
      "pointerdown",
      enableSoundOnFirstInteraction
    );

    window.addEventListener(
      "touchstart",
      enableSoundOnFirstInteraction
    );

    window.addEventListener(
      "keydown",
      enableSoundOnFirstInteraction
    );

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      heroTrigger.kill();

      video.pause();

      video.removeEventListener(
        "ended",
        handleVideoEnded
      );

      window.removeEventListener(
        "pointerdown",
        enableSoundOnFirstInteraction
      );

      window.removeEventListener(
        "touchstart",
        enableSoundOnFirstInteraction
      );

      window.removeEventListener(
        "keydown",
        enableSoundOnFirstInteraction
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
    >
      <div className="hero-video-wrap">

        <video
          ref={videoRef}
          className="hero-video"
          src="https://res.cloudinary.com/zu7jndeq/video/upload/f_auto,q_auto/v1789555634/hero-video_xxcumg.mp4"
          playsInline
          preload="metadata"
          loop={false}
        />

        <div className="hero-overlay" />

      </div>
    </section>
  );
}