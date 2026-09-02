import React from "react";
import {
  ShoppingBag,
  HeartPulse,
  Hotel,
  GraduationCap,
  Briefcase,
  Truck,
  Building2,
  Rocket,
  ArrowUpRight,
  Zap,
  Check
} from "lucide-react";
import "./IndustriesPage.css";

const industries = [
  {
    id: "retail",
    icon: <ShoppingBag size={22} />,
    title: "Retail & E-Commerce",
    highlight: "POS + Live Stock Sync",
    chips: ["Headless Storefront", "Smart POS", "WhatsApp CRM"],
    accent: "purple"
  },
  {
    id: "healthcare",
    icon: <HeartPulse size={22} />,
    title: "Healthcare & Clinics",
    highlight: "Zero-Queue Patient Desk",
    chips: ["Direct Triage", "EHR Portals", "Doctor Schedule"],
    accent: "blue"
  },
  {
    id: "hospitality",
    icon: <Hotel size={22} />,
    title: "Hospitality & Stays",
    highlight: "0% Commission Bookings",
    chips: ["Direct Booking Engine", "Guest App", "Dynamic Pricing"],
    accent: "emerald"
  },
  {
    id: "services",
    icon: <Briefcase size={22} />,
    title: "Professional Services",
    highlight: "Automated Intake & Invoicing",
    chips: ["Client Portal", "Auto-Billing", "Document Vault"],
    accent: "pink"
  },
  {
    id: "logistics",
    icon: <Truck size={22} />,
    title: "Logistics & Fleet",
    highlight: "Live Dispatch & Telematics",
    chips: ["Driver Apps", "Route Dispatch", "Digital Proof"],
    accent: "blue"
  },
  {
    id: "education",
    icon: <GraduationCap size={22} />,
    title: "Education & EdTech",
    highlight: "Digital Campus & LMS",
    chips: ["Interactive LMS", "Fee ERP", "Auto-Grading"],
    accent: "purple"
  },
  {
    id: "realestate",
    icon: <Building2 size={22} />,
    title: "Real Estate & PropTech",
    highlight: "Direct Lead Qualification",
    chips: ["Listing Portals", "Broker CRM", "Virtual Tour Tech"],
    accent: "emerald"
  },
  {
    id: "startups",
    icon: <Rocket size={22} />,
    title: "Startups & Scaleups",
    highlight: "Production-Ready MVPs",
    chips: ["SaaS Architecture", "Stripe Billing", "AI Agents"],
    accent: "pink"
  }
];

export default function IndustriesPage({ onOpenProject, onOpenBooking }) {
  return (
    <div className="ind-clean-page">
      <div className="ind-clean-glow" />

      <div className="ind-clean-container">
        {/* 1. Direct Hero */}
        <section className="ind-clean-hero">
          <span className="ind-clean-badge">
            <Zap size={12} />
            <span>INDUSTRY APPLICATIONS</span>
          </span>

          <h1 className="ind-clean-title">
            Where We Apply The Route. <br />
            <span className="ind-gradient-text">Built for Specific Workflows.</span>
          </h1>

          <p className="ind-clean-lead">
            We adapt connected web platforms, operational ERPs, and automated AI around your business model.
          </p>
        </section>

        {/* 2. Visual Bento Cards Grid */}
        <div className="ind-clean-grid">
          {industries.map((item) => (
            <div key={item.id} className={`ind-clean-card glow-${item.accent}`}>
              <div className="ind-card-head">
                <div className={`ind-icon-box icon-${item.accent}`}>
                  {item.icon}
                </div>
                <span className="ind-card-highlight">{item.highlight}</span>
              </div>

              <h3 className="ind-card-title">{item.title}</h3>

              <div className="ind-pills-row">
                {item.chips.map((chip, idx) => (
                  <span key={idx} className="ind-pill">
                    <Check size={11} className="ind-check" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Simple 3-Step Execution Strip */}
        <section className="ind-steps-strip">
          <div className="ind-step-col">
            <span className="ind-step-num">01</span>
            <h4>Audit Workflow</h4>
            <p>We map your current tools and bottlenecks.</p>
          </div>
          <div className="ind-step-divider" />
          <div className="ind-step-col">
            <span className="ind-step-num">02</span>
            <h4>Sprint Build</h4>
            <p>Rapid deployment of custom portals and integrations.</p>
          </div>
          <div className="ind-step-divider" />
          <div className="ind-step-col">
            <span className="ind-step-num">03</span>
            <h4>Autonomous Launch</h4>
            <p>Live DNS cutover with staff operating SOPs.</p>
          </div>
        </section>

        {/* 4. Single Bottom CTA */}
        <div className="ind-cta-box">
          <h3>Need a custom system built for your business?</h3>
          <button
            type="button"
            className="ind-btn-primary"
            onClick={() => {
              if (onOpenProject) onOpenProject();
            }}
          >
            <span>Start A Project</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}