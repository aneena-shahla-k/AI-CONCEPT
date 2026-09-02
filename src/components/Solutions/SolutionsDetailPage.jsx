import React from "react";
import { ArrowUpRight, CheckCircle2,Clock, ShieldCheck, ArrowLeft } from "lucide-react";
import "./SolutionsDetailPage.css";

export const solutionsData = {
  "website-development": {
    title: "Websites & Digital Platforms",
    badge: "FRONTEND & WEB SYSTEMS",
    tagline: "Ultra-Fast, Canvas-Driven Web Experiences for High Conversion",
    lead: "We build decoupled, headless web applications and corporate hubs with modern frameworks, sub-second load times, and custom back-office CMS architectures.",
    timeline: "24h - 48h Sprint Available",
    deliverables: [
      "Custom React / Next.js Headless Architecture",
      "Interactive 3D / GSAP Canvas Micro-Interactions",
      "Dynamic Headless CMS & Self-Serve Admin Portal",
      "Complete Mobile PWA & Lighthouse 95+ Performance",
      "SEO Structured Schemas & Edge CDN Deployment"
    ],
    stack: ["React.js", "Next.js", "Tailwind CSS", "GSAP", "Node.js", "Vercel Edge"],
  },
  "e-commerce": {
    title: "E-Commerce Solutions",
    badge: "COMMERCE & D2C ENGINE",
    tagline: "Headless Storefronts Synced Directly with Inventory & Multi-Gateway Rails",
    lead: "Moving away from slow, bloated templates to lightning-fast custom storefronts equipped with 1-click checkouts, personalized bundle engines, and live stock webhooks.",
    timeline: "48h - 72h Sprint Available",
    deliverables: [
      "Custom High-Speed Storefront (PWA Ready)",
      "Multi-Currency Payment Rails (Razorpay, Stripe, Apple Pay)",
      "Real-Time Warehouse & POS Stock Synchronization",
      "Automated Order Tracking via WhatsApp / SMS Rails",
      "Cart Abandonment Re-engagement Sequences"
    ],
    stack: ["Shopify Headless", "Next.js Commerce", "Node.js", "Redis", "Razorpay Rails"],
  },
  "app-development": {
    title: "Mobile App Development",
    badge: "IOS & ANDROID ECOSYSTEM",
    tagline: "Native-Speed Cross-Platform Mobile Applications Built for Continuous Scale",
    lead: "We develop responsive, cross-platform apps with offline database sync, push notification triggers, and encrypted client data storage.",
    timeline: "72h+ Modular Sprint",
    deliverables: [
      "Unified iOS and Android Codebase",
      "Offline-First Local Storage & Database Sync",
      "Custom Push Notification & Retargeting Engine",
      "Biometric Authentication & Tokenized User Sessions",
      "Full App Store & Google Play Console Live Deployment"
    ],
    stack: ["React Native", "Flutter", "Firebase", "PostgreSQL", "Expo EAS"],
  },
  "booking-platforms": {
    title: "Booking & Reservation Systems",
    badge: "REAL-TIME SCHEDULING",
    tagline: "Zero-Friction Reservation Portals for Appointments, Hotels, and Events",
    lead: "Automate appointment booking, staff slot allocation, automated calendar syncing, and instant upfront deposit processing.",
    timeline: "30h - 48h Sprint",
    deliverables: [
      "Interactive Dynamic Slot Calendar Matrix",
      "Multi-Staff & Resource Allocation Engine",
      "Automated WhatsApp & Google Calendar Two-Way Sync",
      "Upfront Split-Payment & Deposit Gateways",
      "Client Self-Cancellation & Reschedule Desk"
    ],
    stack: ["React", "Express.js", "PostgreSQL", "Twilio WhatsApp API", "Stripe Connect"],
  },
  "erp-solutions": {
    title: "ERP & Business Operations",
    badge: "OPERATIONAL NERVOUS SYSTEM",
    tagline: "Custom Internal Back-Offices Replacing Messy WhatsApp Threads & Sheets",
    lead: "Centralize your company's CRM, invoice generation, staff payroll, and warehouse dispatches into a unified web console.",
    timeline: "48h - 72h Core Sprint",
    deliverables: [
      "Role-Based Access Control (Admin, Staff, Client, Auditor)",
      "Real-Time Inventory & Multi-Warehouse Tracking",
      "Automated PDF Invoicing & Accounting Journal Ledger",
      "Staff Attendance, Commission & Payroll Modules",
      "Exportable Financial & Operational BI Analytics"
    ],
    stack: ["Node.js / Express", "React Dashboard", "MongoDB / PostgreSQL", "AWS S3"],
  },
  "custom-software": {
    title: "Custom Software & Cloud Systems",
    badge: "PROPRIETARY ARCHITECTURE",
    tagline: "Bespoke SaaS Platforms and High-Throughput API Infrastructure",
    lead: "Engineered specifically around your non-standard business logic, proprietary data pipelines, and third-party enterprise integrations.",
    timeline: "Custom Milestone Allocation",
    deliverables: [
      "Custom REST / GraphQL API Infrastructure",
      "Multi-Tenant SaaS Licensing & Subscription Billing",
      "Encrypted Microservices & Cloud Containerization",
      "Legacy Database Migration & Data Cleansing",
      "100% Full Code Repository & Server Ownership Handoff"
    ],
    stack: ["TypeScript", "Node.js", "Docker", "PostgreSQL", "AWS / DigitalOcean"],
  },
  "ai-solutions": {
    title: "AI Solutions & Neural Automation",
    badge: "AUTONOMOUS OPERATIONS",
    tagline: "Custom AI Agents, Document OCR, and RAG Pipelines Trained on Business Data",
    lead: "Embed private conversational assistants and automated operational bots directly into your customer desk and company database.",
    timeline: "24h - 48h Sprint",
    deliverables: [
      "Domain-Trained Autonomous Customer Triage Bot",
      "Internal Document / Invoice OCR Parsing Pipeline",
      "RAG Vector Database Connected to Company Knowledge",
      "Automated Lead Scoring & CRM Enrichment Agents",
      "Zero Data Leakage Local LLM / Cloud Privacy Gateways"
    ],
    stack: ["Python", "FastAPI", "OpenAI / Claude API", "LangChain", "Pinecone / pgvector"],
  }
};

export default function SolutionsDetailPage({ solutionKey = "website-development", onBack, onOpenProject }) {
  const data = solutionsData[solutionKey] || solutionsData["website-development"];

  return (
    <div className="sol-detail-page">
      <div className="sol-detail-glow" />

      <div className="sol-detail-container">
        {/* Back Button */}
        <button type="button" className="sol-back-btn" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Solutions Overview</span>
        </button>

        {/* Hero */}
        <div className="sol-hero">
          <span className="sol-badge">{data.badge}</span>
          <h1 className="sol-title">{data.title}</h1>
          <p className="sol-tagline">{data.tagline}</p>
          <p className="sol-lead">{data.lead}</p>

          <div className="sol-meta-strip">
            <div className="sol-meta-item">
              <Clock size={15} className="sol-meta-icon" />
              <span>{data.timeline}</span>
            </div>
            <div className="sol-meta-item">
              <ShieldCheck size={15} className="sol-meta-icon" />
              <span>100% Code & Database Ownership</span>
            </div>
          </div>
        </div>

        {/* Deliverables Grid */}
        <div className="sol-content-grid">
          <div className="sol-left-box">
            <h3>PRODUCTION DELIVERABLES IN THIS ROUTE</h3>
            <ul className="sol-deliv-list">
              {data.deliverables.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="sol-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sol-right-box">
            <h3>DEPLOYED TECH STACK</h3>
            <div className="sol-tech-chips">
              {data.stack.map((tech, idx) => (
                <span key={idx} className="sol-tech-chip">
                  <span className="sol-chip-dot" />
                  {tech}
                </span>
              ))}
            </div>

            <div className="sol-cta-card">
              <h4>Ready to build this system?</h4>
              <p>Lock your dedicated sprint window and get a fixed-turnaround production deployment.</p>
              <button
                type="button"
                className="sol-action-btn"
                onClick={onOpenProject}
              >
                <span>Start This Project</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}