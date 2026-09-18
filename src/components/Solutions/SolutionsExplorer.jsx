import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Brain,
  ShoppingCart,
  CalendarDays,
  Database,
  Code2,
  Check,
  ArrowRight,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import "./SolutionsExplorer.css";

import previewMockup from "../assets/images/web2.png";
import ecommerceImg from "../assets/images/e-com1.png";
import mobileImg from "../assets/images/app1.png";
import bookingImg from "../assets/images/booking1.png";
import erpImg from "../assets/images/erp1.png";
import aiImg from "../assets/images/robo-ai.png";

const solutionData = [
  {
    id: "01",
    slug: "website-development",
    tag: "WEB",
    shortTitle: "Web",
    title: "Websites & Scalable Digital Platforms",
    subtitle:
      "Enterprise-grade digital frontends engineered for ultra-fast load times and global reach.",
    icon: Globe,
    image: previewMockup,

    metrics: [
      { value: "< 0.8s", label: "Core Web Vitals", icon: Zap },
      { value: "99.9%", label: "Uptime SLA", icon: ShieldCheck },
      { value: "100%", label: "Responsive Parity", icon: Smartphone },
    ],

    architecture:
      "Edge-cached serverless rendering with headless CMS decoupled architecture.",

    modules: [
      "Custom Enterprise Corporate Portals",
      "High-Conversion SaaS Landing Engines",
      "Interactive Client Dashboards & Portals",
      "Dynamic Headless Content Management",
    ],

    techStack: [
      "React / Next.js",
      "Tailwind CSS",
      "Node.js",
      "Edge CDN",
      "GraphQL",
    ],
  },

  {
    id: "02",
    slug: "app-development",
    tag: "MOBILE",
    shortTitle: "Mobile",
    title: "Native & Hybrid Mobile Applications",
    subtitle:
      "Fluid 60 FPS user experiences engineered for cross-device consistency and native performance.",
    icon: Smartphone,
    image: mobileImg,

    metrics: [
      { value: "60 FPS", label: "Render Target", icon: Zap },
      { value: "Offline", label: "Sync First", icon: Database },
      { value: "Multi-OS", label: "iOS & Android", icon: Smartphone },
    ],

    architecture:
      "Unified single codebase with bi-directional native bridge adapters and background sync.",

    modules: [
      "Cross-Platform iOS & Android Deployments",
      "Local Encrypted SQLite Cache Sync",
      "Biometric Authentication & Hardware APIs",
      "Real-time Geofencing & Push Broadcasts",
    ],

    techStack: [
      "React Native",
      "Flutter",
      "Firebase",
      "WebSockets",
      "Fastlane",
    ],
  },

  {
    id: "03",
    slug: "ai-solutions",
    tag: "AI",
    shortTitle: "AI",
    title: "Custom AI Engines & Agentic Automation",
    subtitle:
      "Automating mission-critical bottlenecks through specialized models, autonomous agents, and RAG pipelines.",
    icon: Brain,
    image: aiImg,

    metrics: [
      { value: "10×", label: "Operational Lift", icon: Zap },
      { value: "94%+", label: "Accuracy Rate", icon: Brain },
      { value: "< 400ms", label: "Inference Latency", icon: Cpu },
    ],

    architecture:
      "Vector embeddings combined with custom guardrails and autonomous task routing.",

    modules: [
      "Domain-Trained Autonomous AI Agents",
      "Proprietary RAG & Vector Knowledge Repos",
      "Intelligent Automated Document Ingestion",
      "Self-Tuning Support & Triage Chatbots",
    ],

    techStack: [
      "LangChain",
      "OpenAI / Claude APIs",
      "Pinecone",
      "Python",
      "FastAPI",
    ],
  },

  {
    id: "04",
    slug: "e-commerce",
    tag: "COMMERCE",
    shortTitle: "Commerce",
    title: "High-Volume E-Commerce Systems",
    subtitle:
      "Resilient digital storefronts structured to handle flash sale concurrency and friction-free checkout.",
    icon: ShoppingCart,
    image: ecommerceImg,

    metrics: [
      { value: "40%", label: "Conversion Lift", icon: Zap },
      { value: "Multi", label: "Global Currency", icon: Globe },
      { value: "Instant", label: "Inventory Sync", icon: Database },
    ],

    architecture:
      "Decoupled cart microservices with distributed database caching and automated webhooks.",

    modules: [
      "Headless Storefronts with Instant Search",
      "Unified Multi-Payment Gateway Routing",
      "Real-Time Warehouse & Stock Balancing",
      "Automated Order Lifecycle & Notifications",
    ],

    techStack: [
      "Shopify Plus / Medusa",
      "Stripe API",
      "Redis",
      "PostgreSQL",
      "Next.js",
    ],
  },

  {
    id: "05",
    slug: "booking-platforms",
    tag: "BOOKING",
    shortTitle: "Booking",
    title: "Intelligent Booking & Scheduling Engines",
    subtitle:
      "Zero-conflict calendar reservation pipelines with localized dynamic slot distribution.",
    icon: CalendarDays,
    image: bookingImg,

    metrics: [
      { value: "0", label: "Double Bookings", icon: Check },
      { value: "24/7", label: "Unattended Flow", icon: CalendarDays },
      { value: "-70%", label: "No-Show Rate", icon: Zap },
    ],

    architecture:
      "Distributed transactional locks to eliminate double-booking race conditions completely.",

    modules: [
      "Real-time Slot Locking & Buffer Rules",
      "Multi-Staff & Multi-Location Syncing",
      "Deposit Pre-authorization & Invoicing",
      "Automated WhatsApp & Email Alert Triggers",
    ],

    techStack: [
      "Node.js",
      "FullCalendar",
      "Stripe Connect",
      "Twilio",
      "PostgreSQL",
    ],
  },

  {
    id: "06",
    slug: "erp-solutions",
    tag: "ERP",
    shortTitle: "ERP",
    title: "Custom ERP & Operational Business Cores",
    subtitle:
      "Consolidating finance, workforce operations, logistics, and data governance into one source of truth.",
    icon: Database,
    image: erpImg,

    metrics: [
      { value: "100%", label: "Data Ownership", icon: ShieldCheck },
      { value: "Zero", label: "SaaS Bloat", icon: Layers },
      { value: "Live", label: "Analytics Stream", icon: Zap },
    ],

    architecture:
      "Event-driven architecture with granular RBAC permissions and real-time audit trails.",

    modules: [
      "End-to-End Inventory & Supply Chain Flow",
      "Custom Financial Ledger & Invoicing",
      "Role-Based Access Control (RBAC)",
      "Executive KPI Visualizer & Reports",
    ],

    techStack: [
      "React",
      "Express / NestJS",
      "MongoDB / Postgres",
      "Docker",
      "AWS",
    ],
  },
];

export default function SolutionsExplorer({ onOpenProject }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIdx, setActiveIdx] = useState(0);
  const detailRef = useRef(null);
  const visualRef = useRef(null);

  // Handle URL Query Params (e.g., /solutions?tab=app-development)
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const foundIndex = solutionData.findIndex((s) => s.slug === tabParam);
      if (foundIndex !== -1) {
        setActiveIdx(foundIndex);
        setTimeout(() => {
          const section = document.querySelector(".sol-explorer-container");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const active = solutionData[activeIdx];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (!detailRef.current) return;

    gsap.killTweensOf(detailRef.current);

    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [activeIdx]);

  useEffect(() => {
    if (!visualRef.current) return;

    gsap.killTweensOf(visualRef.current);

    gsap.fromTo(
      visualRef.current,
      { opacity: 0, scale: 0.96, x: 20 },
      { opacity: 1, scale: 1, x: 0, duration: 0.55, ease: "power3.out" }
    );
  }, [activeIdx]);

  const handleSolutionChange = (index) => {
    if (index === activeIdx) return;
    setActiveIdx(index);
    setSearchParams({ tab: solutionData[index].slug }, { replace: true });
  };

  return (
    <section className="sol-explorer-container">
      <div className="sol-background-glow sol-glow-one" />
      <div className="sol-background-glow sol-glow-two" />
      <div className="sol-background-grid" />

      <div className="sol-header">
        <div className="sol-eyebrow">
          <span className="sol-eyebrow-line" />
          <span>OUR SOLUTIONS</span>
          <span className="sol-eyebrow-line sol-eyebrow-line-small" />
        </div>

        <h1 className="sol-title">
          Build Smarter. Grow <em>Faster.</em>
        </h1>

        <p className="sol-lead">
          From web and mobile apps to AI-driven automation, we craft digital
          solutions that solve real business challenges and create lasting
          impact.
        </p>
      </div>

      <div className="sol-header-stat">
        <span className="sol-stat-dot" />
        <div>
          <strong>6 Powerful Solution Systems</strong>
          <span>Modern technology. Real business results.</span>
        </div>
      </div>

      <div className="sol-workbench">
        <aside className="sol-floating-nav">
          <div className="sol-nav-track" />

          {solutionData.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === activeIdx;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Select ${item.title}`}
                className={`sol-float-item ${isActive ? "is-active" : ""}`}
                onClick={() => handleSolutionChange(idx)}
              >
                <span className="sol-float-icon">
                  <Icon size={17} strokeWidth={1.8} />
                </span>

                <span className="sol-float-info">
                  <small>{item.id}</small>
                  <strong>{item.shortTitle}</strong>
                </span>

                <span className="sol-float-arrow">
                  <ArrowRight size={12} />
                </span>
              </button>
            );
          })}
        </aside>

        <main className="sol-detail-stage" ref={detailRef}>
          <div className="sol-detail-meta">
            <div className="sol-meta-label">
              <span className="sol-meta-icon">
                <ActiveIcon size={15} />
              </span>
              <span>{active.id}</span>
              <span className="sol-meta-divider" />
              <span>{active.tag}</span>
            </div>

            <div className="sol-production-status">
              <span className="sol-status-pulse" />
              PRODUCTION READY
            </div>
          </div>

          <div className="sol-main-content">
            <div className="sol-copy-area">
              <h2 className="sol-detail-title">{active.title}</h2>
              <p className="sol-detail-sub">{active.subtitle}</p>

              <div className="sol-metrics-grid">
                {active.metrics.map((metric, i) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div className="sol-metric-box" key={i}>
                      <span className="sol-metric-icon">
                        <MetricIcon size={16} strokeWidth={1.8} />
                      </span>
                      <div className="sol-metric-content">
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="sol-arch-callout">
                <div className="sol-arch-icon">
                  <Layers size={17} />
                </div>
                <div>
                  <div className="sol-arch-label">ARCHITECTURE</div>
                  <p>{active.architecture}</p>
                </div>
              </div>
            </div>

            <div className="sol-visual-area" ref={visualRef}>
              <div className="sol-orbit sol-orbit-one" />
              <div className="sol-orbit sol-orbit-two" />

              <div className="sol-visual-badge">
                <Zap size={13} fill="currentColor" />
                <span>Fast</span>
                <i />
                <span>Secure</span>
                <i />
                <span>Scalable</span>
              </div>

              <div className="sol-image-glow" />

              <img
                className="sol-main-image"
                src={active.image || previewMockup}
                alt={active.title}
              />

              <div className="sol-image-shadow" />
            </div>
          </div>

          <div className="sol-lower-grid">
            <div className="sol-modules-block">
              <div className="sol-block-head">
                <span className="sol-block-icon">
                  <Layers size={14} />
                </span>
                <span>KEY MODULES</span>
              </div>

              <div className="sol-module-list">
                {active.modules.map((mod, i) => (
                  <div className="sol-mod-item" key={i}>
                    <span className="sol-mod-check">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sol-tech-block">
              <div className="sol-block-head">
                <span className="sol-block-icon">
                  <Code2 size={14} />
                </span>
                <span>TECH STACK</span>
              </div>

              <div className="sol-stack-pills">
                {active.techStack.map((tech, i) => (
                  <span className="sol-tech-pill" key={i}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="sol-action-area">
              <div className="sol-actions">
                <button
                  type="button"
                  className="sol-cta-action"
                  onClick={onOpenProject}
                >
                  <span>Get Started</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}