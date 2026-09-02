import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="hero-container">
      {/* Dynamic Background Route Line */}
      <div className="gps-line-bg"></div>

      {/* Countdown Timer Badge */}
      <div className="timer-badge">
        <span className="live-dot"></span>
        <span className="timer-label">Accelerated Sprint</span>
        <span className="timer-clock">
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <span className="sub-heading">Your Concept. Our Blueprint. Your Execution.</span>
        <h1 className="main-heading">
          Build Your Business. Follow the Route. Grow Faster.
        </h1>
        <p className="description">
          We sell a <strong>GPS route</strong>, not drive the car. We create ready-made Growth Plans, business systems, custom software, and AI platforms. You run the business.
        </p>

        {/* Action Buttons */}
        <div className="button-group">
          <button className="btn btn-primary">Explore Our Services</button>
          <button className="btn btn-secondary">Get Your Growth Plan</button>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;
