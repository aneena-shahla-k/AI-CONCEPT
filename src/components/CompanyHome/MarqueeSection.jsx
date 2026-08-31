import React from "react";
import { Zap, Sparkles, Code2, Globe, ShieldCheck, Cpu } from "lucide-react";
import "./MarqueeSection.css";

const primaryStatements = [
  { text: "24–48 HOUR SPRINT LAUNCH", icon: <Zap size={14} className="mq-accent-icon" /> },
  { text: "100% CUSTOM TAILORED ARCHITECTURE", icon: <Code2 size={14} className="mq-cyan-icon" /> },
  { text: "HIGH-CONVERSION SHOPIFY & E-COMMERCE", icon: <Globe size={14} className="mq-accent-icon" /> },
  { text: "99+ LIGHTHOUSE CORE WEB VITALS", icon: <ShieldCheck size={14} className="mq-cyan-icon" /> },
  { text: "FULL-STACK MERN & NEXT.JS PLATFORMS", icon: <Cpu size={14} className="mq-accent-icon" /> },
  { text: "ZERO TEMPLATES • PURE PERFORMANCE", icon: <Sparkles size={14} className="mq-cyan-icon" /> },
];

const techStack = [
  "NEXT.JS 15",
  "REACT 19",
  "TAILWIND CSS",
  "NODE / EXPRESS",
  "SHOPIFY HEADLESS",
  "POSTGRESQL",
  "MONGODB",
  "FRAMER MOTION",
  "DOCKER",
  "VERCEL EDGE",
];

export default function MarqueeSection() {
  return (
    <section className="mq-section">
      <div className="mq-glow-ambient" />

      {/* Top Track: Fast Left Scroll */}
      <div className="mq-track-wrap">
        <div className="mq-track mq-track-left">
          {[...primaryStatements, ...primaryStatements].map((item, idx) => (
            <div key={idx} className="mq-item">
              <span className="mq-icon-box">{item.icon}</span>
              <span className="mq-text">{item.text}</span>
              <span className="mq-divider">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track: Subtle Right Scroll for Tech Stacks */}
      <div className="mq-track-wrap mq-tech-wrap">
        <div className="mq-track mq-track-right">
          {[...techStack, ...techStack].map((tech, idx) => (
            <div key={idx} className="mq-tech-item">
              <span className="mq-tech-dot" />
              <span className="mq-tech-text">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}