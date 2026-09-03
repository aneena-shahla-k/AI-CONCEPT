import React from "react";
import { Navigation, ShieldCheck, Cpu, KeyRound } from "lucide-react";
import "./PhilosophyBannerSection.css";
import worldMapImg from "../../images/map.avif"; 

export default function PhilosophyBannerSection() {
  return (
    <section className="gp-phil-world-section">
      {/* 1. Full-Bleed World Map Image as Direct Background */}
      <div 
        className="gp-phil-map-bg" 
        style={{ backgroundImage: `url(${worldMapImg})` }} data-aos="fade-up"
     data-aos-anchor-placement="center-center"
      />

      {/* 2. Focused Clean Content Directly Over Map */}
      <div className="gp-phil-content-wrap">
        
        <div className="gp-phil-badge">
          <Navigation size={13} className="gp-nav-icon" />
          <span>THE GPS PHILOSOPHY</span>
        </div>

        <h2 className="gp-phil-headline">
          We Sell the GPS. <br />
          <span className="gp-blue-accent">You Drive.</span>
        </h2>

        <p className="gp-phil-text">
          Traditional agencies lock you into perpetual retainers and opaque workflows. 
          We build your complete operational route, configure your digital engine, and hand you the steering wheel with 100% code and system ownership.
        </p>

        {/* 3 Minimal Glass Badges */}
        <div className="gp-phil-badges-row">
          <div className="gp-feature-pill">
            <ShieldCheck size={15} />
            <span>100% Code Ownership</span>
          </div>
          <div className="gp-feature-pill">
            <Cpu size={15} />
            <span>Custom Architecture</span>
          </div>
          <div className="gp-feature-pill">
            <KeyRound size={15} />
            <span>Turnkey Autonomy</span>
          </div>
        </div>

      </div>
    </section>
  );
}