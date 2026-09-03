import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Zap, 
  Check, 
  Clock, 
  ShieldCheck 
} from "lucide-react";
import "./SolutionsDetailPage.css";

export const solutionsData = {
  "website-development": {
    title: "Websites & Digital Platforms",
    badge: "FRONTEND & WEB SYSTEMS",
    tagline: "Sub-second canvas-driven web experiences.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "Architecture", value: "Headless Decoupled Next.js" },
      { label: "Performance", value: "Lighthouse 98+ PWA" },
      { label: "Animation", value: "Scroll-driven GSAP / Canvas" },
      { label: "Deployment", value: "Vercel Edge Network" }
    ],
    stack: ["React.js", "Next.js", "Tailwind CSS", "GSAP", "Vercel Edge"],
    turnaround: "24h - 48h Sprint",
    ownership: "100% Code & Repo Transfer"
  },
  "e-commerce": {
    title: "E-Commerce Solutions",
    badge: "COMMERCE & D2C ENGINE",
    tagline: "Headless storefronts with direct inventory webhooks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "Architecture", value: "Shopify / Medusa Headless" },
      { label: "Payment Rails", value: "Razorpay, Stripe & Apple Pay" },
      { label: "Sync Latency", value: "Instant POS Webhooks" },
      { label: "Checkout", value: "1-Click Accelerated Flow" }
    ],
    stack: ["Next.js Commerce", "Node.js", "Redis", "Razorpay Rails"],
    turnaround: "48h - 72h Sprint",
    ownership: "100% Store & Database Access"
  },
  "app-development": {
    title: "Mobile App Development",
    badge: "IOS & ANDROID ECOSYSTEM",
    tagline: "Native-speed cross-platform mobile pipelines.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "Codebase", value: "Single Unified React Native" },
      { label: "Offline Storage", value: "Local SQLite / WatermelonDB" },
      { label: "Security", value: "Biometric Session Tokens" },
      { label: "Distribution", value: "Direct App Store / Play Store" }
    ],
    stack: ["React Native", "Expo EAS", "Firebase", "PostgreSQL"],
    turnaround: "72h+ Modular Sprint",
    ownership: "Full Source & Console Ownership"
  },
  "booking-platforms": {
    title: "Booking & Scheduling",
    badge: "REAL-TIME RESERVATION",
    tagline: "Zero-friction appointment and staff slot allocation.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "Calendar Sync", value: "Two-way Google & Apple Sync" },
      { label: "Payment Gate", value: "Upfront Split-Deposit" },
      { label: "Channels", value: "WhatsApp Automated Alerts" },
      { label: "Self-Serve", value: "Client Reschedule Desk" }
    ],
    stack: ["React", "Express.js", "PostgreSQL", "Twilio WhatsApp"],
    turnaround: "30h - 48h Sprint",
    ownership: "Direct API & Booking Ownership"
  },
  "erp-solutions": {
    title: "ERP & Operations",
    badge: "OPERATIONAL NERVOUS SYSTEM",
    tagline: "Custom web console replacing spreadsheets & chats.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "Access Control", value: "Multi-Role RBAC (4 Levels)" },
      { label: "Ledger", value: "Auto Invoicing & Journal Export" },
      { label: "Inventory", value: "Multi-Warehouse Real-Time Sync" },
      { label: "Staff Desk", value: "Attendance, Commission & Pay" }
    ],
    stack: ["React Dashboard", "Node.js", "MongoDB", "AWS S3"],
    turnaround: "48h - 72h Sprint",
    ownership: "100% Internal System Ownership"
  },
  "custom-software": {
    title: "Custom Cloud Software",
    badge: "PROPRIETARY ARCHITECTURE",
    tagline: "Bespoke SaaS platforms and high-throughput pipelines.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "API Framework", value: "REST / GraphQL Microservices" },
      { label: "Container", value: "Dockerized Cloud Instances" },
      { label: "Tenancy", value: "Multi-Tenant SaaS Licensing" },
      { label: "Migration", value: "Zero-Loss Database Port" }
    ],
    stack: ["TypeScript", "Docker", "PostgreSQL", "DigitalOcean"],
    turnaround: "Custom Sprint Allocation",
    ownership: "Complete IP & Repository Transfer"
  },
  "ai-solutions": {
    title: "AI Solutions & Neural Bots",
    badge: "AUTONOMOUS AGENTS",
    tagline: "Domain-trained AI bots and private OCR pipelines.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    specs: [
      { label: "LLM Pipeline", value: "RAG Vector Store (Pinecone)" },
      { label: "Data Parsing", value: "Automated Invoice / Doc OCR" },
      { label: "Privacy Gate", value: "Zero Data Leakage Local API" },
      { label: "Trigger Agent", value: "Autonomous Event-Driven CRM" }
    ],
    stack: ["Python", "FastAPI", "OpenAI / Claude API", "LangChain"],
    turnaround: "24h - 48h Sprint",
    ownership: "Model Embeddings & Data Ownership"
  }
};

export default function SolutionsDetailPage({ solutionKey = "website-development", onBack, onOpenProject }) {
  const [activeKey, setActiveKey] = useState(solutionKey);
  const [activeTab, setActiveTab] = useState("specs");

  const current = solutionsData[activeKey] || solutionsData["website-development"];

  return (
    <div className="sol-studio-page">
      <div className="sol-studio-container">
        
        {/* Top Control Bar */}
        <div className="sol-control-bar">
          <button type="button" className="sol-back-pill" onClick={onBack}>
            <ArrowLeft size={13} />
            <span>Overview</span>
          </button>

          {/* Quick Filter Pills */}
          <div className="sol-pills-scroller">
            {Object.keys(solutionsData).map((key) => (
              <button
                key={key}
                type="button"
                className={`sol-filter-pill ${activeKey === key ? "is-selected" : ""}`}
                onClick={() => setActiveKey(key)}
              >
                {solutionsData[key].title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Master Console Grid */}
        <div className="sol-studio-console">
          
          {/* Left Hero Text Block */}
          <div className="sol-hero-panel" data-aos="flip-up">
            <span className="sol-tag-badge">{current.badge}</span>
            <h1 className="sol-studio-title">{current.title}</h1>
            <p className="sol-studio-tagline">{current.tagline}</p>

            <div className="sol-guarantees">
              <div className="sol-guarantee-row">
                <Clock size={15} className="sol-icon-blue" />
                <span>{current.turnaround}</span>
              </div>
              <div className="sol-guarantee-row">
                <ShieldCheck size={15} className="sol-icon-green" />
                <span>{current.ownership}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="sol-deploy-btn"
              onClick={onOpenProject}
            >
              <span>Lock Sprint Window</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Right Visual Frame & Spec Console */}
          <div className="sol-spec-panel">
            
            {/* Dynamic Visual Banner */}
            <div className="sol-visual-frame">
              <img 
                src={current.image} 
                alt={current.title} 
                className="sol-frame-img" 
                key={activeKey} 
              />
              <div className="sol-frame-scrim" />
              <span className="sol-frame-badge">
                <Zap size={11} />
                <span>LIVE ARCHITECTURE PREVIEW</span>
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="sol-tab-header">
              <button
                type="button"
                className={`sol-tab-btn ${activeTab === "specs" ? "is-active" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                <Layers size={13} />
                <span>Core Specs</span>
              </button>

              <button
                type="button"
                className={`sol-tab-btn ${activeTab === "stack" ? "is-active" : ""}`}
                onClick={() => setActiveTab("stack")}
              >
                <Cpu size={13} />
                <span>Tech Stack</span>
              </button>
            </div>

            {/* Tab 1: Specs View */}
            {activeTab === "specs" && (
              <div className="sol-specs-grid" >
                {current.specs.map((item, idx) => (
                  <div key={idx} className="sol-spec-item" data-aos="flip-up">
                    <span className="sol-spec-label">{item.label}</span>
                    <strong className="sol-spec-value">
                      <Check size={13} className="sol-check" />
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Tech Stack View */}
            {activeTab === "stack" && (
              <div className="sol-stack-view" >
                <span className="sol-stack-hint">Engineered with modern frameworks:</span>
                <div className="sol-stack-pills" data-aos="flip-up"> 
                  {current.stack.map((tool, idx) => (
                    <div key={idx} className="sol-tech-pill">
                      <Zap size={12} />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}