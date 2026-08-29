import React, { useState } from "react";
import { 
  Layers, 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";
import "./ArchitectureSection.css";

const NODES = [
  {
    id: "ui",
    number: "01",
    label: "UI & Canvas Shader",
    icon: Layers,
    badge: "FRONTEND LAYER",
    summary: "60 FPS Visual Canvas & Component Tree",
    latency: "0.02ms Frame Time",
    specs: [
      "Next.js 15 & React 19 Core Engine",
      "WebGL / Three.js Shader Pre-compilation",
      "Sub-pixel fluid CSS & Tailwind design tokens",
      "Automatic dynamic bundle code-splitting"
    ],
    tech: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "edge",
    number: "02",
    label: "Edge Compute Runtime",
    icon: Cpu,
    badge: "SERVERLESS ENGINE",
    summary: "Zero Cold-Start Middleware & Dynamic Cache",
    latency: "< 5ms TTFB (Global)",
    specs: [
      "Vercel / Cloudflare Global Edge Network",
      "Dynamic Route Prefetching & ISR revalidation",
      "Instant JWT Auth validation at DNS level",
      "Multi-region failover architecture"
    ],
    tech: ["Edge Middleware", "Vercel Edge", "Cloudflare Workers"]
  },
  {
    id: "api",
    number: "03",
    label: "High-Concurrency API",
    icon: Zap,
    badge: "MICROSERVICES & GATEWAY",
    summary: "Lock-Free Asynchronous REST & GraphQL",
    latency: "12ms Processing Window",
    specs: [
      "Node.js / Go high-throughput backplane",
      "Strict Role-Based Access Control (RBAC)",
      "Automated Webhook & WhatsApp dispatch queues",
      "End-to-End SSL/TLS 1.3 Payload Encryption"
    ],
    tech: ["Node.js", "GraphQL", "Redis Caching", "Stripe API"]
  },
  {
    id: "db",
    number: "04",
    label: "Vector DB & Cloud Storage",
    icon: Database,
    badge: "INTELLIGENT PERSISTENCE",
    summary: "ACID Compliant DB & High-Dimensional Vectors",
    latency: "0.38ms Embedding Retrieval",
    specs: [
      "PostgreSQL relational data with auto-backups",
      "Pinecone / Supabase Vector embeddings for RAG",
      "Encrypted file vault for client assets & invoices",
      "Real-time WebSocket database subscriptions"
    ],
    tech: ["PostgreSQL", "Supabase", "Pinecone DB", "AWS S3"]
  },
  {
    id: "cdn",
    number: "05",
    label: "Global Production CDN",
    icon: Globe,
    badge: "DELIVERY & SECURITY",
    summary: "Distributed Anycast Routing & 99+ Vitals",
    latency: "99.99% Uptime SLA",
    specs: [
      "Global WebP / AVIF image edge optimization",
      "Enterprise DDoS protection & WAF shielding",
      "Sub-second DNS propagation & SSL provisioning",
      "Automated Lighthouse 99+ Core Web Vitals audit"
    ],
    tech: ["Global Anycast", "Brotli Comp", "Let's Encrypt", "Core Vitals 99"]
  }
];

export default function ArchitectureSection() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  const activeNode = NODES[activeNodeIndex];
  const Icon = activeNode.icon;

  return (
    <section className="ar-section" id="process">
      <div className="ar-container">
        
        {/* Header */}
        <div className="ar-header">
          <div className="ar-eyebrow">
            <span className="ar-dot" />
            <span>FULL-STACK SYSTEM TOPOLOGY</span>
          </div>
          <h2 className="ar-title">
            HOW WE <span className="ar-title-outline">ENGINEER</span>
          </h2>
          <p className="ar-subtitle">
            Explore the multi-tier pipeline behind our rapid 24–42H modules. 
            Click any architecture node to inspect its security, latency, and technology stack.
          </p>
        </div>

        {/* Interactive Node Flow Bar */}
        <div className="ar-flowbar">
          {NODES.map((node, index) => {
            const NodeIcon = node.icon;
            const isSelected = activeNodeIndex === index;
            const isPassed = activeNodeIndex >= index;

            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  className={`ar-node-btn ${isSelected ? "is-selected" : ""} ${isPassed ? "is-passed" : ""}`}
                  onClick={() => setActiveNodeIndex(index)}
                >
                  <div className="ar-node-icon-box">
                    <NodeIcon size={16} />
                  </div>
                  <span className="ar-node-num">{node.number}</span>
                  <span className="ar-node-label">{node.label}</span>
                </button>

                {index < NODES.length - 1 && (
                  <div className={`ar-flow-line ${isPassed ? "is-active" : ""}`}>
                    <span className="ar-line-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Node Detail Inspector Box */}
        <div className="ar-inspector-card">
          
          <div className="ar-inspector-left">
            <div className="ar-badge-row">
              <span className="ar-spec-badge">
                <Sparkles size={11} /> {activeNode.badge}
              </span>
              <span className="ar-latency-pill">
                <Zap size={11} /> {activeNode.latency}
              </span>
            </div>

            <div className="ar-inspector-title-row">
              <div className="ar-giant-icon">
                <Icon size={24} />
              </div>
              <div>
                <span className="ar-step-num">PHASE {activeNode.number} ARCHITECTURE</span>
                <h3>{activeNode.label}</h3>
              </div>
            </div>

            <p className="ar-summary">{activeNode.summary}</p>

            <div className="ar-tech-strip">
              <span className="ar-tech-header">DEPLOYED TOKENS:</span>
              <div className="ar-tech-pills">
                {activeNode.tech.map((t) => (
                  <span key={t} className="ar-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="ar-inspector-right">
            <span className="ar-specs-header">
              <ShieldCheck size={14} /> PRODUCTION SPECIFICATIONS
            </span>
            
            <div className="ar-specs-list">
              {activeNode.specs.map((spec, i) => (
                <div key={i} className="ar-spec-item">
                  <CheckCircle2 size={14} className="ar-spec-check" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="ar-next-node-btn"
              onClick={() => setActiveNodeIndex((activeNodeIndex + 1) % NODES.length)}
            >
              <span>{activeNodeIndex === NODES.length - 1 ? "RESTART TOPOLOGY" : "INSPECT NEXT NODE"}</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}