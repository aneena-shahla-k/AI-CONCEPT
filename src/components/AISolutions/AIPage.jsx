// src/components/AISolutions/AIPage.jsx
import React, { useState } from "react";
import {
  Cpu,
  Bot,
  Sparkles,
  Workflow,
  FileText,
  LineChart,
  Network,
  ArrowUpRight,
  ChevronDown,
  Zap,
  Terminal,
} from "lucide-react";
import "./AIPage.css";

const aiOfferings = [
  {
    icon: <Cpu size={22} />,
    title: "AI-Powered Business Software",
    desc: "Custom platforms with embedded neural models that automate core enterprise decisions in real time.",
    tag: "Core Systems",
  },
  {
    icon: <Bot size={22} />,
    title: "Autonomous AI Agents",
    desc: "Self-governing agents capable of executing complex multistep tasks across internal databases and tools.",
    tag: "Autonomous Ops",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Intelligent Chatbots & Assistants",
    desc: "Context-aware conversational engines built on company documents for 24/7 client support and sales intake.",
    tag: "Conversational",
  },
  {
    icon: <Workflow size={22} />,
    title: "AI Workflow Automation",
    desc: "End-to-end pipeline automation connecting back-office CRMs, payment gateways, and third-party software.",
    tag: "Efficiency",
  },
  {
    icon: <FileText size={22} />,
    title: "Intelligent Document Processing",
    desc: "Automated extraction, classification, and validation of complex invoices, contracts, and internal records.",
    tag: "Data Ingestion",
  },
  {
    icon: <LineChart size={22} />,
    title: "Predictive Analytics & ML",
    desc: "Proprietary machine learning models trained on your business data to anticipate demand and churn.",
    tag: "Data Intelligence",
  },
  {
    icon: <Network size={22} />,
    title: "Custom AI Platforms & APIs",
    desc: "Production-ready REST and GraphQL endpoints interfacing your internal data directly with LLMs.",
    tag: "Infrastructure",
  },
  {
    icon: <Zap size={22} />,
    title: "Smart Recommendation Engines",
    desc: "High-conversion product and booking suggestion algorithms tailored to historical customer patterns.",
    tag: "Conversion",
  },
];

const technicalSteps = [
  {
    step: "01",
    name: "Data Ingestion & Cleaning",
    detail: "Structuring private enterprise documents, SQL/NoSQL records, and vector embeddings.",
  },
  {
    step: "02",
    name: "Model Architecture & Tuning",
    detail: "Fine-tuning open-source LLMs and configuring deterministic function-calling pipelines.",
  },
  {
    step: "03",
    name: "Production Integration",
    detail: "Integrating AI layers directly into your active Web apps, Mobile software, and ERP core.",
  },
  {
    step: "04",
    name: "Autonomous Execution & Guardrails",
    detail: "Implementing strict output validation, data privacy boundaries, and latency budgets.",
  },
];

const aiFaqs = [
  {
    q: "How is custom AI development different from using ChatGPT wrappers?",
    a: "We do not build generic API skins. We engineer custom architectures configured around your proprietary data, private server environments, and database schemas with strict security boundaries.",
  },
  {
    q: "Is our business data secure when building custom AI systems?",
    a: "Yes. Models can be hosted within private VPCs or dedicated micro-instances with zero data retention for public model retraining, ensuring enterprise-grade compliance.",
  },
  {
    q: "Can custom AI integrate into our existing CRM and ERP?",
    a: "Yes. Every AI model and agent we build is packaged with custom webhook endpoints and APIs configured to communicate bidirectionally with existing systems.",
  },
];

export default function AIPage({ onOpenBooking, onOpenProject }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="ai-page">
      {/* 1. Hero Section */}
      <section className="ai-hero">
        <div className="ai-hero-glow" />
        <div className="ai-container">
          <div className="ai-eyebrow">
            <Bot size={13} className="ai-accent-icon" />
            <span>AI SOLUTIONS & ARCHITECTURE</span>
          </div>

          <h1 className="ai-hero-title">
            We don’t just add AI. <br />
            <span className="ai-gradient-text">We build AI into the business.</span>
          </h1>

          <p className="ai-hero-sub">
            Custom AI systems engineered around your business data, workflows, customers,
            and operations. Moving beyond generic chatbots into production-grade autonomy.
          </p>

          <div className="ai-hero-actions">
            <button
              type="button"
              className="ai-btn-primary"
              onClick={() => {
                if (onOpenProject) onOpenProject();
              }}
            >
              <span>Build Custom AI System</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              type="button"
              className="ai-btn-secondary"
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
            >
              <Terminal size={14} />
              <span>Discuss Technical Specs</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Technical Philosophy Banner */}
      <section className="ai-tech-definition">
        <div className="ai-container">
          <div className="ai-definition-box">
            <span className="ai-def-label">ENGINEERING PHILOSOPHY</span>
            <p className="ai-def-quote">
              "AI shouldn't be an isolated experiment. It must function as the primary
              nervous system connecting your website, booking engines, operational ERP, and analytics."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="ai-services-section">
        <div className="ai-container">
          <div className="ai-section-header">
            <span className="ai-section-tag">CAPABILITIES & DELIVERABLES</span>
            <h2 className="ai-section-title">Production AI Capabilities</h2>
            <p className="ai-section-desc">
              From customer-facing interaction to autonomous operational workflows.
            </p>
          </div>

          <div className="ai-services-grid">
            {aiOfferings.map((item, idx) => (
              <div key={idx} className="ai-service-card">
                <div className="ai-card-top">
                  <div className="ai-service-icon-box">{item.icon}</div>
                  <span className="ai-card-tag">{item.tag}</span>
                </div>
                <h3 className="ai-card-title">{item.title}</h3>
                <p className="ai-card-desc">{item.desc}</p>
                <div className="ai-card-bottom-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technical Architecture Pipeline */}
      <section className="ai-pipeline-section">
        <div className="ai-container">
          <div className="ai-section-header">
            <span className="ai-section-tag">THE IMPLEMENTATION STACK</span>
            <h2 className="ai-section-title">How We Engineer Custom AI</h2>
            <p className="ai-section-desc">
              A robust four-stage architecture ensuring high precision and minimal hallucination.
            </p>
          </div>

          <div className="ai-pipeline-grid">
            {technicalSteps.map((s, idx) => (
              <div key={idx} className="ai-pipeline-card">
                <div className="ai-step-badge">{s.step}</div>
                <h3 className="ai-step-title">{s.name}</h3>
                <p className="ai-step-detail">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="ai-faq-section">
        <div className="ai-container">
          <div className="ai-section-header">
            <span className="ai-section-tag">TECHNICAL CLARITY</span>
            <h2 className="ai-section-title">Frequently Asked Questions</h2>
          </div>

          <div className="ai-faq-list">
            {aiFaqs.map((faq, idx) => (
              <div
                key={idx}
                className={`ai-faq-item ${openFaq === idx ? "is-open" : ""}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="ai-faq-q">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`ai-faq-icon ${openFaq === idx ? "is-rotated" : ""}`}
                  />
                </div>
                {openFaq === idx && <p className="ai-faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}