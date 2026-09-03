// src/components/AISolutions/components/AICapabilitiesConsole.jsx
import React, { useState } from "react";
import {
  Cpu,
  Bot,
  Sparkles,
  Workflow,
  FileText,
  LineChart,
  Network,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import "./AICapabilitiesConsole.css";

const aiCapabilities = [
  {
    id: "software",
    icon: <Cpu size={16} />,
    title: "AI-Powered Business Software",
    category: "Core Systems",
    tagline: "Autonomous operational systems embedded directly into your database.",
    deliverables: [
      "Custom REST / GraphQL neural middleware",
      "Deterministic business rule execution",
      "Real-time decision tree processing",
    ],
    metric: "< 120ms Inference Latency",
  },
  {
    id: "agents",
    icon: <Bot size={16} />,
    title: "Autonomous AI Agents",
    category: "Autonomous Ops",
    tagline: "Goal-oriented agents executing complex multi-step routines independently.",
    deliverables: [
      "Multi-tool function calling pipelines",
      "Self-correcting data validation loops",
      "Bidirectional CRM & ERP event triggers",
    ],
    metric: "100% Deterministic Guardrails",
  },
  {
    id: "chatbots",
    icon: <Sparkles size={16} />,
    title: "Intelligent Triage & Assistants",
    category: "Conversational",
    tagline: "Context-aware conversational engines trained privately on internal data.",
    deliverables: [
      "Zero-hallucination document embeddings",
      "Automated lead qualification & booking",
      "Multi-channel WhatsApp & Web gateway",
    ],
    metric: "24/7 Zero Queues",
  },
  {
    id: "workflows",
    icon: <Workflow size={16} />,
    title: "AI Workflow Automation",
    category: "Efficiency",
    tagline: "End-to-end automation connecting databases, billing, and third-party tools.",
    deliverables: [
      "Asynchronous webhook dispatch queues",
      "Autonomous error fallback protocols",
      "Human-in-the-loop review desks",
    ],
    metric: "80% Reduction in Manual Ops",
  },
  {
    id: "ocr",
    icon: <FileText size={16} />,
    title: "Document Intelligence & OCR",
    category: "Data Ingestion",
    tagline: "Automated extraction and classification of complex invoices and contracts.",
    deliverables: [
      "Multi-page tabular data structuring",
      "Instant schema validation & JSON export",
      "Secure encrypted vault storage",
    ],
    metric: "99.4% Parsing Accuracy",
  },
  {
    id: "analytics",
    icon: <LineChart size={16} />,
    title: "Predictive Analytics & ML",
    category: "Data Intelligence",
    tagline: "Machine learning models predicting demand shifts and customer churn.",
    deliverables: [
      "Time-series trend forecasting",
      "Custom churn prevention alerts",
      "Automated inventory restock signals",
    ],
    metric: "Proactive Data Signals",
  },
  {
    id: "apis",
    icon: <Network size={16} />,
    title: "Custom AI Platforms & APIs",
    category: "Infrastructure",
    tagline: "Production-ready endpoints interfacing private data directly with LLMs.",
    deliverables: [
      "Isolated VPC model hosting",
      "Vector search indexing (pgvector)",
      "Zero public model retention policies",
    ],
    metric: "Enterprise SLA Grade",
  },
  {
    id: "recommendations",
    icon: <Zap size={16} />,
    title: "Smart Recommendation Engines",
    category: "Conversion",
    tagline: "High-conversion product and booking suggestions tailored to intent.",
    deliverables: [
      "Collaborative filtering pipelines",
      "Dynamic in-cart personalized add-ons",
      "Real-time user behavior tracking",
    ],
    metric: "+24% Lift in Order Value",
  },
];

export default function AICapabilitiesConsole({ onOpenProject }) {
  const [activeCap, setActiveCap] = useState(0);
  const selected = aiCapabilities[activeCap];

  return (
    <section className="ai-console-section">
      <div className="ai-section-header">
        <span className="ai-section-tag">CAPABILITIES & DELIVERABLES</span>
        <h2 className="ai-section-title">Production AI Capabilities</h2>
        <p className="ai-section-desc">
          Select a capability module to inspect architectural deliverables and latency specifications.
        </p>
      </div>

      <div className="ai-console-card">
        {/* Left Nav Tabs */}
        <div className="ai-console-sidebar">
          <span className="ai-sidebar-label">AVAILABLE MODULES</span>
          <div className="ai-sidebar-list">
            {aiCapabilities.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`ai-sidebar-btn ${activeCap === idx ? "is-active" : ""}`}
                onClick={() => setActiveCap(idx)}
              >
                <div className="ai-btn-icon-wrap">{item.icon}</div>
                <div className="ai-btn-text-wrap">
                  <span className="ai-btn-title">{item.title}</span>
                  <span className="ai-btn-cat">{item.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Display Panel */}
        <div className="ai-console-display">
          <div className="ai-display-card">
            <div className="ai-display-header">
              <span className="ai-display-cat-tag">{selected.category}</span>
              <span className="ai-display-metric">
                <ShieldCheck size={13} />
                {selected.metric}
              </span>
            </div>

            <h3 className="ai-display-title">{selected.title}</h3>
            <p className="ai-display-tagline">{selected.tagline}</p>

            <div className="ai-outputs-box">
              <span className="ai-outputs-label">CORE SYSTEM DELIVERABLES</span>
              <div className="ai-outputs-list">
                {selected.deliverables.map((deliv, i) => (
                  <div key={i} className="ai-output-row">
                    <CheckCircle2 size={15} className="ai-check-icon" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-display-footer">
              <span className="ai-footer-note">Enterprise-grade private VPC deployment</span>
              <button
                type="button"
                className="ai-display-cta"
                onClick={() => onOpenProject && onOpenProject()}
              >
                <span>Deploy This Module</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}