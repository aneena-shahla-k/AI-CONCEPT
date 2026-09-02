import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import vid from "../../videos/hero-video-2.mp4";

const HeroSection = ({ onNavigate, onOpenProject }) => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting && !hasPlayed) {
          video.play().catch(error => {
            console.log("Autoplay was prevented, requires user interaction.", error);
            setShowContent(true);
          });
          setHasPlayed(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasPlayed]);

  // വീഡിയോ തീരാൻ 0.5 സെക്കൻഡ് ബാക്കിയുള്ളപ്പോൾ തന്നെ സ്മൂത്തായി ട്രാൻസിഷൻ തുടങ്ങും
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      if (video.duration - video.currentTime <= 0.5 && !showContent) {
        setShowContent(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setShowContent(true);
  };

  return (
    <section ref={sectionRef} className="hero-container">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        loop={false}
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
      >
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className={`hero-video-overlay ${showContent ? 'is-dimmed' : ''}`} />

      {/* Ultra Smooth Staggered Content Reveal */}
      <div className={`hero-content-reveal ${showContent ? 'is-visible' : ''}`}>
        <span className="hero-eyebrow hero-anim-item delay-1">
          Selling a GPS route, not driving the car
        </span>

        <h1 className="hero-heading hero-anim-item delay-2">
          Build Your Business. <br />
          <span className="hero-gradient-text">Follow the Route. Grow Faster.</span>
        </h1>

        <p className="hero-description hero-anim-item delay-3">
          We create ready-made Growth Plans, business systems, software, AI solutions, and digital platforms that show you where to go and how to get there. You run the business. We build the roadmap and technology.
        </p>

        <div className="hero-button-group hero-anim-item delay-4">
          <button
            type="button"
            className="hero-btn hero-btn-primary"
            onClick={() => {
              if (onNavigate) onNavigate("growth-plans");
            }}
          >
            <span>Explore Our Services</span>
          </button>

          <button
            type="button"
            className="hero-btn hero-btn-secondary"
            onClick={() => {
              if (onNavigate) onNavigate("growth-plans");
            }}
          >
            <span>Get Your Growth Plan</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;