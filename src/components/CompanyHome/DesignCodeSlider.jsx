import React, { useState, useRef, useCallback } from "react";
import { Sparkles, Code2, Layers, Cpu, ArrowLeftRight } from "lucide-react";
import "./DesignCodeSlider.css";

export default function DesignCodeSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="dc-section" id="comparison">
      <div className="dc-container">
        {/* Header */}
        <div className="dc-header">
          <div className="dc-eyebrow">
            <span className="dc-dot" />
            <span>PRECISION ENGINEERING</span>
          </div>
          <h2 className="dc-title">
            DESIGN <span className="dc-title-outline">VS CODE</span>
          </h2>
          <p className="dc-subtitle">
            Drag the interactive slider to see how pixel-perfect Figma prototypes
            are translated into high-performance, 60fps production React code.
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div
          ref={containerRef}
          className="dc-stage"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Left Layer: Code (Base) */}
          <div className="dc-layer dc-code-layer">
            <div className="dc-badge dc-badge-right">
              <Code2 size={13} />
              <span>PRODUCTION REACT CODE</span>
            </div>
            
            <div className="dc-code-mockup">
              <div className="dc-terminal-bar">
                <span className="dc-term-dot red" />
                <span className="dc-term-dot yellow" />
                <span className="dc-term-dot green" />
                <span className="dc-term-file">CoreArchitecture.tsx</span>
              </div>
              <pre className="dc-code-text">
                <code>
{`import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";

export const NeuralSystem = ({ nodes, speed = 60 }) => {
  const pipeline = useMemo(() => {
    return initClusterEngine({ nodes, latency: "0.4ms" });
  }, [nodes]);

  return (
    <div className="relative w-full h-[640px] bg-[#0b0f19]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5] }}>
        <ParticleField payload={pipeline} />
      </Canvas>
    </div>
  );
};`}
                </code>
              </pre>
            </div>
          </div>

          {/* Right Layer: Visual Design (Clipped) */}
          <div
            className="dc-layer dc-design-layer"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="dc-badge dc-badge-left">
              <Layers size={13} />
              <span>FIGMA PIXEL-PERFECT UI</span>
            </div>

            <div className="dc-design-mockup">
              <div className="dc-design-card">
                <div className="dc-design-chip">
                  <Sparkles size={12} />
                  <span>AI CORE ENGINE ACTIVE</span>
                </div>
                <h3>Enterprise AI Vector Cluster</h3>
                <p>
                  Zero-latency contextual retrieval network processing queries at 0.4ms.
                </p>
                <div className="dc-design-stats">
                  <div className="dc-stat-box">
                    <strong>99.9%</strong>
                    <span>Uptime SLA</span>
                  </div>
                  <div className="dc-stat-box">
                    <strong>0.4ms</strong>
                    <span>Response</span>
                  </div>
                </div>
                <button type="button" className="dc-design-btn">
                  <span>DEPLOY CLUSTER</span>
                  <Cpu size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="dc-handle"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="dc-handle-line" />
            <div className="dc-handle-button">
              <ArrowLeftRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}