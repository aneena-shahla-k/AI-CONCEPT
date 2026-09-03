import React, { useEffect, useRef } from 'react';
import './HeroSection.css';
import vid from "../../videos/hero-video-2.mp4";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Autoplay was prevented by browser policy:", error);
      });
    }
  }, []);

  return (
    <section className="hero-container">
      <video
        ref={videoRef}
        className="hero-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}