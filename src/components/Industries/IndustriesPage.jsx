import React from "react";
import {
  ShoppingBag,
  HeartPulse,
  Hotel,
  Briefcase,
  Truck,
  GraduationCap,
  Building2,
  Rocket,
  
} from "lucide-react";
import "./IndustriesPage.css";

const industries = [
  {
    id: "retail",
    icon: <ShoppingBag size={14} />,
    title: "Retail & E-Commerce",
    desc: "Real-time omnichannel sync with zero inventory delay.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "healthcare",
    icon: <HeartPulse size={14} />,
    title: "Healthcare & Clinics",
    desc: "Direct patient triage, EHR syncing, and schedule routing.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hospitality",
    icon: <Hotel size={14} />,
    title: "Hospitality & Stays",
    desc: "Direct booking engine with instant guest web app checkout.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "services",
    icon: <Briefcase size={14} />,
    title: "Professional Services",
    desc: "Automated onboarding, secure vault, and recurring billing.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "logistics",
    icon: <Truck size={14} />,
    title: "Logistics & Fleet",
    desc: "Turn-by-turn driver app integration and electronic POD.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "education",
    icon: <GraduationCap size={14} />,
    title: "Education & EdTech",
    desc: "Interactive curriculum, fee automation, and grading portal.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "realestate",
    icon: <Building2 size={14} />,
    title: "Real Estate & PropTech",
    desc: "Broker pipelines, automated tour leads, and listing index.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "startups",
    icon: <Rocket size={14} />,
    title: "Startups & Scaleups",
    desc: "Turnkey microservices, Stripe pipelines, and autonomous AI.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
  }
];

export default function IndustriesPage({ onOpenProject }) {
  return (
    <div className="ind-clean-page">
      <div className="ind-clean-container">
        
        {/* Header */}
        <section className="ind-clean-hero">
          <span className="ind-clean-badge">
            <span>INDUSTRY APPLICATIONS</span>
          </span>
          <h1 className="ind-clean-title">
            Where We Apply The Route. <br />
            <span className="ind-gradient-text">Built for Specific Workflows.</span>
          </h1>
          
        </section>

        {/* Minimal Pinterest-Style Card Grid */}
        <div className="ind-cards-grid">
          {industries.map((item) => (
            <div 
              key={item.id} 
              className="ind-mini-card"
              onClick={() => onOpenProject && onOpenProject()} data-aos="zoom-in"
            >
              {/* Clean Media Image with Single Top Badge */}
              <div className="ind-mini-media">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="ind-mini-tag">
                  {item.icon}
                  <span>{item.highlight}</span>
                </span>
              </div>

              {/* Minimal Text Body */}
              <div className="ind-mini-body">
                <div className="ind-mini-head">
                  <h3 className="ind-mini-title">{item.title}</h3>
                </div>
                <p className="ind-mini-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="ind-cta-box">
          <div>
            <h3>Need a custom system built for your business?</h3>
            <p>From initial design blueprint to live production deployment in dedicated sprint windows.</p>
          </div>
          <button
            type="button"
            className="ind-btn-primary"
            onClick={() => onOpenProject && onOpenProject()}
          >
            <span>Start A Project</span>
          </button>
        </div>

      </div>
    </div>
  );
}