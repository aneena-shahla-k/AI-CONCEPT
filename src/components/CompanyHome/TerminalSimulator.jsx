import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle2, Sparkles, Cpu, ArrowUpRight } from "lucide-react";
import "./TerminalSimulator.css";

const COMMANDS = [
  {
    id: "speed",
    cmd: "npx aiconcept-engine deploy --tier=rapid",
    label: "24H Sprint Build",
    output: [
      "[INFO] Initializing Next.js 15 & Tailwind Architecture...",
      "[BUILD] Compiling 60fps Canvas Shader & WebGL Pipelines...",
      "[OPTIMIZE] Dynamic CDN routing & Image Edge Compression locked.",
      "[SUCCESS] Production Build live in 24.2 Hours // Score: 99/100 Core Web Vitals",
    ],
  },
  {
    id: "ai",
    cmd: "concept-ai vector:train --docs=./company_vault",
    label: "Private AI Agent",
    output: [
      "[INFO] Ingesting 450+ Private PDFs & Structured Data Sources...",
      "[EMBED] Creating High-Dimensional Pinecone Vector Embeddings...",
      "[WIRING] Deploying Realtime Retrieval-Augmented Generation (RAG)...",
      "[SUCCESS] Custom Knowledge Bot Active // Latency: 0.38ms",
    ],
  },
  {
    id: "perf",
    cmd: "lighthouse-audit https://client-release.app",
    label: "Audit Performance",
    output: [
      "[AUDIT] Running Mobile Viewport & Network Throttling Simulation...",
      "[METRIC] First Contentful Paint (FCP): 0.4s",
      "[METRIC] Largest Contentful Paint (LCP): 0.8s",
      "[METRIC] Cumulative Layout Shift (CLS): 0.00",
      "[SUCCESS] Grade: A+ // 100% SEO, 100% Accessibility, 100% Speed",
    ],
  },
];

export default function TerminalSimulator() {
  const [activeCmdIndex, setActiveCmdIndex] = useState(0);
  const [lines, setLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const activeCmd = COMMANDS[activeCmdIndex];

  useEffect(() => {
    setLines([]);
    setIsTyping(true);

    const currentOutput = COMMANDS[activeCmdIndex].output;
    let timeouts = [];

    currentOutput.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === currentOutput.length - 1) {
          setIsTyping(false);
        }
      }, (index + 1) * 350);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [activeCmdIndex]);

  return (
    <section className="ts-section" id="terminal">
      <div className="ts-container">
        {/* Header */}
        <div className="ts-header">
          <div className="ts-eyebrow">
            <span className="ts-dot" />
            <span>INTERACTIVE CLI SIMULATOR</span>
          </div>
          <h2 className="ts-title">
            PROMPT TO <span className="ts-title-outline">PRODUCTION</span>
          </h2>
          <p className="ts-subtitle">
            Experience our rapid engineering workflow. Click a command below to simulate 
            how our modules are compiled, audited, and deployed.
          </p>
        </div>

        {/* Command Control Chips */}
        <div className="ts-command-triggers">
          {COMMANDS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`ts-trigger-chip ${activeCmdIndex === i ? "is-active" : ""}`}
              onClick={() => setActiveCmdIndex(i)}
            >
              <Cpu size={13} />
              <span>{c.label}</span>
              {activeCmdIndex === i && <Sparkles size={12} className="ts-spark" />}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="ts-terminal-card">
          <div className="ts-terminal-header">
            <div className="ts-window-controls">
              <span className="ts-win-dot red" />
              <span className="ts-win-dot yellow" />
              <span className="ts-win-dot green" />
            </div>
            <div className="ts-window-title">
              <Terminal size={12} />
              <span>bash - aiconcept-cli v2.4</span>
            </div>
            <div className="ts-live-tag">LIVE RUNTIME</div>
          </div>

          <div className="ts-terminal-body">
            {/* Input Line */}
            <div className="ts-line ts-input-line">
              <span className="ts-prompt">~/aiconcept-studio $</span>
              <span className="ts-executed-cmd">{activeCmd.cmd}</span>
            </div>

            {/* Output Lines */}
            <div className="ts-output-log">
              {lines.map((line, idx) => {
                const isSuccess = line.includes("[SUCCESS]");
                return (
                  <div
                    key={idx}
                    className={`ts-line ts-output-line ${isSuccess ? "is-success" : ""}`}
                  >
                    {line}
                  </div>
                );
              })}

              {isTyping && (
                <div className="ts-line ts-typing-cursor">
                  <span className="ts-cursor" />
                </div>
              )}
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="ts-terminal-footer">
            <div className="ts-status">
              <CheckCircle2 size={13} />
              <span>{isTyping ? "PROCESSING SPRINT STREAMS..." : "SYSTEM READY // PIPELINE EXECUTED"}</span>
            </div>
            <button
              type="button"
              className="ts-launch-btn"
              onClick={() => document.querySelector("#scoper")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>LOCK THIS STACK</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
