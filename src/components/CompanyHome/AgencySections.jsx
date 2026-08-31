import React, { useState } from "react";
import { X, Send, CheckCircle2, Zap, ArrowUpRight, Calendar } from "lucide-react";
import "./AgencySections.css";

export const ServiceSection = () => {
  const services = [
    {
      tag: "Conversion Focused",
      title: "E-Commerce & Shopify Architecture",
      desc: "Lightning-fast custom storefronts, streamlined checkout funnels, and high-conversion architectures built for scale.",
      features: ["Custom Shopify Liquid", "Headless Next.js/React", "Stripe & Gateway Setup"],
    },
    {
      tag: "Interactive Storytelling",
      title: "High-End Portfolio & Creator Sites",
      desc: "Frame-by-frame scroll animations, Bento Grid aesthetics, and distinct personal brand experiences that stand out.",
      features: ["Canvas Scroll Effects", "Modern Bento Layouts", "SEO Optimized"],
    },
    {
      tag: "Full-Stack Robustness",
      title: "Custom Web Applications & SaaS",
      desc: "Scalable MERN-stack portals, custom client dashboards, and secure role-based access management systems.",
      features: ["Secure JWT Auth", "Custom API Integrations", "Database Architecture"],
    }
  ];

  return (
    <section id="services-overview" className="sec-wrap">
      <div className="sec-container">
        <div className="sec-header-center">
          <div className="pill-badge">OUR EXPERTISE</div>
          <h2 className="sec-heading">Engineered for Brands That Refuse to Blend In.</h2>
          <p className="sec-subtext">Every solution is custom coded for maximum performance, clean design, and rapid execution.</p>
        </div>

        <div className="services-grid">
          {services.map((item, idx) => (
            <div key={idx} className="service-card">
              <div className="card-top">
                <span className="service-icon">{item.icon}</span>
                <span className="service-tag">{item.tag}</span>
              </div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-desc">{item.desc}</p>
              
              <ul className="service-features">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <span className="check-bullet">✓</span> {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SpeedTiersSection = ({ onOpenBooking }) => {
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    notes: ""
  });

  const tiers = [
    {
      timeline: "24 HOURS",
      badge: "Rapid Launch",
      title: "One-Page Web",
      desc: "Perfect for high-impact landing pages, waitlists, single product launches, and personal creator portfolios.",
      features: [
        "1 Fully Animated Landing Page",
        "Mobile-First Responsive Layout",
        "Lead Capture / Contact Form",
        "Domain & DNS Setup",
        "SEO Meta & Speed Optimization"
      ],
      popular: false
    },
    {
      timeline: "48 HOURS",
      badge: "Most Popular",
      title: "Growth Storefront / Multi-Page",
      desc: "Designed for scaling brands requiring multi-page websites or fully functional e-commerce stores.",
      features: [
        "3 to 5 Custom-Coded Pages",
        "Shopify / E-Commerce Integration",
        "Interactive Scroll & Motion Effects",
        "Payment Gateway & Analytics Setup",
        "14-Day Post-Launch Support"
      ],
      popular: true
    },
    {
      timeline: "CUSTOM SCOPE",
      badge: "Enterprise",
      title: "Full-Stack Web App",
      desc: "For complex web applications, client dashboards, custom APIs, and backend database integrations.",
      features: [
        "Role-Based Access Control",
        "Custom MongoDB/SQL Database",
        "Third-Party API Integrations",
        "Complete Architecture Design",
        "Dedicated Sprint Channel"
      ],
      popular: false
    }
  ];

  const handleOpenSprintModal = (tier) => {
    setSelectedSprint(tier);
    setSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedSprint(null);
    setSubmitted(false);
  };

  const handleInputChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleDispatchSprint = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Sprint Reservation: ${selectedSprint.title} [${selectedSprint.timeline}] - ${clientData.brandName || clientData.name}`
    );

    const bodyContent = 
`--- AI CONCEPT // SPRINT RESERVATION ---

SPRINT SELECTED: ${selectedSprint.title} (${selectedSprint.timeline})
PACKAGE TYPE: ${selectedSprint.badge}

CLIENT INFO:
- Name: ${clientData.name}
- Brand / Project: ${clientData.brandName || "N/A"}
- Email: ${clientData.email}
- WhatsApp / Phone: ${clientData.phone || "N/A"}

ADDITIONAL NOTES:
${clientData.notes || "None provided."}

--- Direct Sprint Dispatch ---`;

    window.location.href = `mailto:info@aiconcept.in?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    setSubmitted(true);
  };

  return (
    <>
      <section id="sprint-tiers" className="sec-wrap bg-darker">
        <div className="sec-container">
          <div className="sec-header-center">
            <div className="pill-badge">DELIVERY TIMELINES</div>
            <h2 className="sec-heading">Select Your Duration.</h2>
            <p className="sec-subtext">Clear, transparent delivery windows. From project kickoff to live production.</p>
          </div>

          <div className="tiers-grid">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`tier-card ${tier.popular ? 'tier-highlighted' : ''}`}>
                {tier.popular && <div className="popular-badge">RECOMMENDED SPRINT</div>}
                <div className="tier-header">
                  <span className="tier-time">{tier.timeline}</span>
                  <span className="tier-badge-label">{tier.badge}</span>
                </div>
                <h3 className="tier-title">{tier.title}</h3>
                <p className="tier-desc">{tier.desc}</p>
                
                <hr className="tier-divider" />

                <ul className="tier-list">
                  {tier.features.map((item, fIdx) => (
                    <li key={fIdx}>
                      <span className="tier-check">✦</span> {item}
                    </li>
                  ))}
                </ul>

                {/* DUAL ACTION BUTTONS */}
                <div className="tier-actions-group">
                  <button 
                    type="button"
                    className={`tier-btn ${tier.popular ? 'tier-btn-primary' : 'tier-btn-secondary'}`}
                    onClick={() => handleOpenSprintModal(tier)}
                  >
                    <span>Book This Sprint</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button 
                    type="button"
                    className="tier-btn-outline"
                    onClick={() => {
                      if (onOpenBooking) onOpenBooking();
                    }}
                  >
                    <Calendar size={13} />
                    <span>Discuss Scope 1:1</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPRINT INTAKE MODAL */}
      {selectedSprint && (
        <div className="fc-modal-backdrop" onClick={handleCloseModal}>
          <div className="fc-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="fc-modal-header">
              <div className="fc-modal-brand">
                <span className="fc-modal-num">{selectedSprint.timeline}</span>
                <div>
                  <span className="fc-modal-tag">{selectedSprint.badge}</span>
                  <h3>{selectedSprint.title}</h3>
                </div>
              </div>
              <button type="button" className="fc-modal-close" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="fc-modal-success">
                <CheckCircle2 size={44} className="fc-success-icon" />
                <h3>Sprint Reserved</h3>
                <p>Your sprint brief has been generated. Our lead engineer will connect with you within 2 hours to initiate asset collection.</p>
                <button type="button" className="fc-modal-done-btn" onClick={handleCloseModal}>
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleDispatchSprint} className="fc-modal-form">
                <div className="fc-modal-techs">
                  <span className="fc-tech-pill">
                    <Zap size={10} /> Fast-track kickoff enabled
                  </span>
                  <span className="fc-tech-pill">
                    Direct developer access
                  </span>
                </div>

                <div className="fc-modal-inputs-grid">
                  <div className="fc-input-wrap">
                    <label>YOUR NAME *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="Full name" 
                      value={clientData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="fc-input-wrap">
                    <label>BRAND / PROJECT NAME</label>
                    <input 
                      type="text" 
                      name="brandName" 
                      placeholder="e.g. Studio Vertex" 
                      value={clientData.brandName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="fc-input-wrap">
                    <label>EMAIL ADDRESS *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="you@company.com" 
                      value={clientData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="fc-input-wrap">
                    <label>WHATSAPP / PHONE</label>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="+91 00000 00000" 
                      value={clientData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="fc-input-wrap" style={{ marginTop: "12px" }}>
                  <label>BRIEF PROJECT OUTLINE</label>
                  <textarea 
                    name="notes" 
                    rows="2" 
                    placeholder="Provide reference sites, target launch date, or key features..." 
                    value={clientData.notes} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="fc-modal-footer">
                  <button type="submit" className="fc-direct-submit-btn">
                    <span>LOCK IN {selectedSprint.timeline} SPRINT</span>
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const ProcessSection = () => {
  const steps = [
    { num: "01", time: "Hour 0–2", title: "Strategy & Asset Handover", desc: "Briefing call, wireframe breakdown, and collection of your brand assets." },
    { num: "02", time: "Hour 2–10", title: "Architecture & Interactive UI", desc: "Rapid component assembly, typography lock, and layout structure." },
    { num: "03", time: "Hour 10–36", title: "Custom Code & Motion Design", desc: "Clean development, scroll triggers, mobile responsiveness, and integration." },
    { num: "04", time: "Hour 36–48", title: "Testing, QA & Live Launch", desc: "99+ Lighthouse speed check, SEO tags, DNS connect, and global deployment." }
  ];

  return (
    <section className="sec-wrap">
      <div className="sec-container">
        <div className="sec-header-center">
          <div className="pill-badge">THE WORKFLOW</div>
          <h2 className="sec-heading">How We Execute in Record Time.</h2>
          <p className="sec-subtext">No redundant layers or endless revisions. A streamlined sprint protocol.</p>
        </div>

        <div className="process-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="process-card">
              <div className="process-top">
                <span className="process-num">{step.num}</span>
                <span className="process-time">{step.time}</span>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CtaBanner = ({ onOpenBooking, onOpenProject }) => {
  return (
    <section className="sec-wrap cta-section">
      <div className="sec-container">
        <div className="cta-box">
          <div className="cta-glow" />
          <div className="cta-content">
            <h2 className="cta-heading">Ready to Launch Your Project in 24 to 48 Hours?</h2>
            <p className="cta-desc">Skip the agency back-and-forth. Talk directly with our lead developer and lock in your sprint window today.</p>
            
            <div className="cta-buttons">
              <button 
                type="button" 
                className="cta-primary-btn"
                onClick={() => {
                  if (onOpenProject) {
                    onOpenProject();
                  } else {
                    document.querySelector("#sprint-tiers")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span>Start A Project</span> ↗
              </button>
              <button 
                type="button" 
                className="cta-secondary-btn"
                onClick={() => {
                  if (onOpenBooking) onOpenBooking();
                }}
              >
                Book 1:1 Meet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};