import React, { useState } from "react";
import { 
  Globe, 
  Smartphone, 
  ShoppingBag, 
  Calendar, 
  Bot, 
  Cpu, 
  ArrowUpRight, 
  Check
} from "lucide-react";
import "./ServicesSection.css";

const services = [
  {
    id: "01",
    tag: "WEB // ARCHITECTURE",
    title: "WEB PLATFORMS",
    desc: "Modern, high-conversion web applications engineered for lightning speed and fluid animations.",
    icon: Globe,
    deliverables: ["Next.js / React", "Core Web Vitals", "Custom UI Motion"],
  },
  {
    id: "02",
    tag: "MOBILE // OS",
    title: "MOBILE APPS",
    desc: "Native-grade iOS & Android applications with seamless gesture navigation and offline sync.",
    icon: Smartphone,
    deliverables: ["Cross-Platform", "60 FPS Fluid", "Push Notifications"],
  },
  {
    id: "03",
    tag: "RETAIL // ENGINE",
    title: "E-COMMERCE",
    desc: "Bespoke digital storefronts with sub-second checkouts and automated inventory pipelines.",
    icon: ShoppingBag,
    deliverables: ["Custom Cart Flows", "Payment Gateway", "Auto Invoicing"],
  },
  {
    id: "04",
    tag: "TIME // MATRIX",
    title: "BOOKING PLATFORMS",
    desc: "Real-time reservation engines with conflict-free slot locking and automated WhatsApp/SMS alerts.",
    icon: Calendar,
    deliverables: ["Live Slot Locking", "Instant Sync", "Custom Admin"],
  },
  {
    id: "05",
    tag: "NEURAL // AGENTS",
    title: "AI SOLUTIONS",
    desc: "Custom AI agents and chatbots trained on private business data to automate daily workflows.",
    icon: Bot,
    deliverables: ["Custom LLM Setup", "Automated Task Bots", "Contextual Data"],
  },
  {
    id: "06",
    tag: "CORE // SAAS",
    title: "CUSTOM SOFTWARE",
    desc: "Tailored business logic backends, role-based dashboards, and dedicated API architectures.",
    icon: Cpu,
    deliverables: ["Multi-Tenant RBAC", "Scalable APIs", "Enterprise Security"],
  },
];

export default function ServicesSection() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="fc-services" id="services">
      <div className="fc-container">
        
        {/* Modern Hero-Matching Header */}
        <div className="fc-header">
          <div className="fc-eyebrow">
            <span className="fc-dot" />
            <span>WHAT WE BUILD // CAPABILITIES</span>
          </div>

          <div className="fc-header-split">
            <h2 className="fc-main-title">
              OUR <span className="fc-title-outline">SERVICES</span>
            </h2>

            <div className="fc-header-badge">
              <span>HIGH-PERFORMANCE ARCHITECTURE</span>
            </div>
          </div>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="fc-grid">
          {services.map((item, index) => {
            const Icon = item.icon;
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={item.id}
                className={`fc-card-container ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="fc-card-inner">
                  
                  {/* FRONT SIDE */}
                  <div className="fc-card-front">
                    <div className="fc-front-top">
                      <span className="fc-card-num">{item.id}</span>
                      <div className="fc-front-icon">
                        <Icon size={19} />
                      </div>
                    </div>

                    <div className="fc-front-center">
                      <span className="fc-card-tag">{item.tag}</span>
                      <h3 className="fc-big-title">{item.title}</h3>
                    </div>

                    <div className="fc-front-bottom">
                      <span className="fc-bottom-label">HOVER TO REVEAL SPEC</span>
                      <div className="fc-arrow-badge">
                        <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="fc-card-back">
                    <div className="fc-back-header">
                      <span className="fc-back-tag">{item.tag}</span>
                      <span className="fc-card-num-dim">{item.id}</span>
                    </div>

                    <p className="fc-back-desc">{item.desc}</p>

                    <div className="fc-deliverables">
                      {item.deliverables.map((del) => (
                        <div key={del} className="fc-deliv-item">
                          <Check size={12} />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>

                    <div className="fc-back-action">
                      <span>INITIALIZE SCOPE</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}