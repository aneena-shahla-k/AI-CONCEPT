import React, { useState } from "react";
import { 
  Compass, 
  ArrowUpRight, 
  Check, 
  FileText, 
  Layers, 
  Cpu, 
  Calendar,
  Clock,
} from "lucide-react";
import "./GrowthPlansPage.css";

const pillars = [
  {
    num: "01",
    title: "Business Idea & Niche",
    question: "What should the business sell?",
    desc: "Market viability analysis, competitive gap audit, and high-margin product/service positioning.",
    category: "Foundation",
  },
  {
    num: "02",
    title: "Monetization Model",
    question: "How will it generate revenue?",
    desc: "Pricing tier design, recurring subscription logic, unit economics, and margin forecasting.",
    category: "Foundation",
  },
  {
    num: "03",
    title: "Target Market & ICP",
    question: "Who are the high-value buyers?",
    desc: "Ideal Customer Profiles, buyer persona motivations, and direct acquisition channels.",
    category: "Strategy",
  },
  {
    num: "04",
    title: "Product / Service Packaging",
    question: "How should offers be structured?",
    desc: "Core offerings vs. add-on structuring, deliverable scopes, and clear value-tier packaging.",
    category: "Strategy",
  },
  {
    num: "05",
    title: "Brand Presentation",
    question: "How should authority be established?",
    desc: "Digital authority blueprints, conversion-led storytelling, and trust-building signals.",
    category: "Go-to-Market",
  },
  {
    num: "06",
    title: "Acquisition Engine",
    question: "How will leads convert predictably?",
    desc: "Inbound pipelines, paid acquisition routes, funnel architectures, and automated retargeting.",
    category: "Go-to-Market",
  },
  {
    num: "07",
    title: "Technology Architecture",
    question: "What digital stack is required?",
    desc: "End-to-end stack blueprint: Web platforms, Mobile Apps, CRM, ERP, and custom AI automations.",
    category: "Infrastructure",
  },
  {
    num: "08",
    title: "Succession & Scaling Plan",
    question: "How does the business run autonomously?",
    desc: "Standard operating procedures (SOPs), delegation workflows, and system handoff protocols.",
    category: "Infrastructure",
  },
];

const tiers = [
  {
    badge: "EARLY STAGE",
    name: "Starter Route",
    desc: "Designed for entrepreneurs validating a new concept or launching a lean MVP with zero technical debt.",
    timeline: "2-Week Turnaround",
    features: [
      "Market Viability & ICP Analysis",
      "Core Monetization Architecture",
      "MVP Web / App Tech Specifications",
      "30-Day Go-to-Market Action Plan",
      "Master Route Blueprint (20+ Pages)",
    ],
    popular: false,
  },
  {
    badge: "RECOMMENDED",
    name: "Scale Blueprint",
    desc: "For established businesses looking to connect fragmented operations into a unified digital ecosystem.",
    timeline: "3-Week Turnaround",
    features: [
      "Complete 8-Pillar Strategic Roadmap",
      "Full Tech Stack Spec (Web, App, CRM)",
      "E-Commerce / Booking Funnel Architecture",
      "AI Automation & Workflow Pipelines",
      "60-Day Turn-by-Turn Execution Roadmap",
      "Interactive Architecture Diagram (Figma)",
    ],
    popular: true,
  },
  {
    badge: "ENTERPRISE",
    name: "Custom Infrastructure",
    desc: "For complex multi-branch brands requiring proprietary software, custom ERPs, and organizational succession.",
    timeline: "4-Week Turnaround",
    features: [
      "Full Enterprise Ecosystem Design",
      "Custom ERP & Back-Office Architecture",
      "Proprietary AI Assistant & Agent Modeling",
      "Operational SOPs & Succession Playbook",
      "90-Day Guided Execution Milestones",
      "Direct Strategy Hand-off Sessions",
    ],
    popular: false,
  },
];

const deliverables = [
  {
    icon: <FileText size={20} />,
    title: "The Master Route Document",
    desc: "A comprehensive 40+ page strategic and technical blueprint covering all 8 pillars of your business.",
  },
  {
    icon: <Layers size={20} />,
    title: "Interactive System Map",
    desc: "Interactive visual architectural flowcharts showing how Web, Apps, CRM, and AI sync in real time.",
  },
  {
    icon: <Cpu size={20} />,
    title: "Tech Stack Specification",
    desc: "Exact database models, API endpoint structures, frontend stacks, and hosting environments required.",
  },
  {
    icon: <Calendar size={20} />,
    title: "30 / 60 / 90-Day Roadmap",
    desc: "Clear, turn-by-turn weekly operational and development milestones to guide your execution team.",
  },
];

const faqs = [
  {
    q: "How is a Growth Plan different from standard software development?",
    a: "Traditional agencies start writing code immediately without validating business mechanics. A Growth Plan designs your monetization, ICP, conversion funnels, and operating systems first, so every line of code directly drives revenue.",
  },
  {
    q: "Can you build the software after delivering the Growth Plan?",
    a: "Yes. Once the blueprint is handed over, you have two choices: deploy our engineering team to build the entire connected ecosystem in rapid sprints, or hand the blueprint to your internal team to execute independently.",
  },
  {
    q: "Who is this suitable for?",
    a: "Founders launching a new venture who need an end-to-end blueprint, as well as operational businesses held back by disconnected tools, spreadsheets, and manual friction.",
  },
];

const serviceOptions = [
  { id: "web", name: "Website Platform" },
  { id: "ecom", name: "E-Commerce Storefront" },
  { id: "app", name: "Mobile App (iOS/Android)" },
  { id: "booking", name: "Booking Platform" },
  { id: "erp", name: "ERP & Back-Office" },
  { id: "custom", name: "Custom Software" },
  { id: "ai_dev", name: "AI Agent Development" },
  { id: "ai_auto", name: "AI Automation Flow" },
  { id: "integrations", name: "System Integration" },
];

const urgencyRates = {
  normal: { label: "Normal (Standard Sprint)", rate: 55 },
  priority: { label: "Priority (+25% Faster Allocation)", rate: 65 },
  express: { label: "Express 24/48H Pod (Urgent Deployment)", rate: 80 },
};

export default function GrowthPlansPage({ onOpenBooking, onOpenProject }) {
  const [activePillar, setActivePillar] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Calculator State
  const [selectedServices, setSelectedServices] = useState(["web"]);
  const [hoursSprint, setHoursSprint] = useState(48);
  const [urgency, setUrgency] = useState("normal");

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const ratePerHour = urgencyRates[urgency].rate;
  const estimatedCost = hoursSprint * ratePerHour;

  return (
    <div className="gp-page">
      {/* 1. Hero Section */}
      <section className="gp-hero">
        <div className="gp-hero-glow" />
        <div className="gp-container">
          <div className="gp-eyebrow">
            <Compass size={13} className="gp-accent-icon" />
            <span>THE STRATEGIC BLUEPRINT</span>
          </div>

          <h1 className="gp-hero-title">
            Don’t start with software. <br />
            <span className="gp-gradient-text">Start with the route.</span>
          </h1>

          <p className="gp-hero-sub">
            We don’t just write code—we architect complete business ecosystems. 
            From market positioning and revenue mechanics to full-stack technology and succession planning.
          </p>

          <div className="gp-hero-actions">
            <button
              type="button"
              className="gp-btn-primary"
              onClick={() => {
                document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Explore Blueprints</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              type="button"
              className="gp-btn-secondary"
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
            >
              <Calendar size={14} />
              <span>Book Strategy Session</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. The 8-Pillar Framework */}
      <section className="gp-pillars-section" id="pillars">
        <div className="gp-container">
          <div className="gp-section-header">
            <span className="gp-section-tag">COMPREHENSIVE ARCHITECTURE</span>
            <h2 className="gp-section-title">The 8 Pillars of Every Growth Plan</h2>
            <p className="gp-section-desc">
              Every blueprint is built on a battle-tested framework covering commercial, operational, and technical dimensions.
            </p>
          </div>

          <div className="gp-pillars-grid">
            {pillars.map((item, idx) => (
              <div 
                key={item.num}
                className={`gp-pillar-card ${activePillar === idx ? "is-active" : ""}`}
                onMouseEnter={() => setActivePillar(idx)}
              >
                <div className="gp-pillar-top">
                  <span className="gp-pillar-num">{item.num}</span>
                  <span className="gp-pillar-cat">{item.category}</span>
                </div>
                <h3 className="gp-pillar-title">{item.title}</h3>
                <p className="gp-pillar-q">{item.question}</p>
                <p className="gp-pillar-desc">{item.desc}</p>
                <div className="gp-pillar-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deliverables Section */}
      <section className="gp-deliverables-section">
        <div className="gp-container">
          <div className="gp-section-header">
            <span className="gp-section-tag">TANGIBLE ASSETS</span>
            <h2 className="gp-section-title">What You Receive in Hand</h2>
            <p className="gp-section-desc">
              Zero ambiguity. You receive production-ready documentation and architectural roadmaps.
            </p>
          </div>

          <div className="gp-deliverables-grid">
            {deliverables.map((item, idx) => (
              <div key={idx} className="gp-deliverable-card">
                <div className="gp-deliverable-icon">{item.icon}</div>
                <h3 className="gp-deliverable-title">{item.title}</h3>
                <p className="gp-deliverable-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Service Calculator Section */}
      <section className="gp-calculator-section" id="calculator">
        <div className="gp-container">
          <div className="gp-section-header">
            <span className="gp-section-tag">DYNAMIC SPRINT ESTIMATOR</span>
            <h2 className="gp-section-title">Configure Your Solution Route</h2>
            <p className="gp-section-desc">
              Select module integrations, allocation hours, and sprint velocity to estimate your project deployment.
            </p>
          </div>

          <div className="gp-calc-card">
            {/* Step 1: Services */}
            <div className="gp-calc-step">
              <span className="gp-calc-step-label">1. SELECT REQUIRED MODULES</span>
              <div className="gp-calc-chips">
                {serviceOptions.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      className={`gp-calc-chip ${isSelected ? "is-selected" : ""}`}
                      onClick={() => toggleService(service.id)}
                    >
                      <span className="gp-calc-dot" />
                      <span>{service.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Hours Sprint */}
            <div className="gp-calc-step">
              <span className="gp-calc-step-label">2. CHOOSE DEVELOPMENT HOURS SPRINT</span>
              <div className="gp-calc-hours-strip">
                {[12, 24, 48, 72, 100].map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`gp-calc-hour-btn ${hoursSprint === h ? "is-active" : ""}`}
                    onClick={() => setHoursSprint(h)}
                  >
                    <Clock size={13} />
                    <span>{h === 100 ? "100+ HRS" : `${h} HRS`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div className="gp-calc-step">
              <span className="gp-calc-step-label">3. SPRINT ALLOCATION URGENCY</span>
              <div className="gp-calc-urgency-grid">
                {Object.keys(urgencyRates).map((key) => {
                  const u = urgencyRates[key];
                  const isCurrent = urgency === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`gp-calc-urgency-btn ${isCurrent ? "is-active" : ""}`}
                      onClick={() => setUrgency(key)}
                    >
                      <span className="gp-calc-urgency-title">{key.toUpperCase()}</span>
                      <span className="gp-calc-urgency-sub">{u.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Result / Action */}
            <div className="gp-calc-summary">
              <div className="gp-calc-summary-left">
                <span className="gp-calc-summary-tag">ESTIMATED SPRINT SPECIFICATION:</span>
                <div className="gp-calc-summary-meta">
                  <span>{hoursSprint} Development Hours</span>
                  <span>•</span>
                  <span>{selectedServices.length} Modules</span>
                  <span>•</span>
                  <span>${ratePerHour}/hr Allocation</span>
                </div>
              </div>

              <div className="gp-calc-summary-right">
                <span className="gp-calc-total-val">${estimatedCost.toLocaleString()}</span>
                <button
                  type="button"
                  className="gp-calc-submit-btn"
                  onClick={() => {
                    if (onOpenProject) onOpenProject();
                  }}
                >
                  <span>Lock In Project Brief</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tiered Packages Section */}
      <section className="gp-packages-section" id="packages">
        <div className="gp-container">
          <div className="gp-section-header">
            <span className="gp-section-tag">BLUEPRINT TIERS</span>
            <h2 className="gp-section-title">Select Your Strategic Route</h2>
            <p className="gp-section-desc">
              Fixed-scope, fixed-turnaround blueprints calibrated to your organization’s stage of growth.
            </p>
          </div>

          <div className="gp-packages-grid">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`gp-package-card ${tier.popular ? "is-popular" : ""}`}>
                {tier.popular && <span className="gp-popular-badge">RECOMMENDED ROUTE</span>}
                <div className="gp-package-header">
                  <span className="gp-package-badge">{tier.badge}</span>
                  <h3 className="gp-package-name">{tier.name}</h3>
                  <p className="gp-package-desc">{tier.desc}</p>
                  <span className="gp-package-time">{tier.timeline}</span>
                </div>

                <hr className="gp-package-divider" />

                <ul className="gp-package-features">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <Check size={14} className="gp-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`gp-package-btn ${tier.popular ? "btn-highlight" : "btn-subtle"}`}
                  onClick={() => {
                    if (onOpenProject) onOpenProject();
                  }}
                >
                  <span>Request This Blueprint</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Philosophy Comparison Bar */}
      <section className="gp-phil-banner">
        <div className="gp-container">
          <div className="gp-phil-box">
            <div className="gp-phil-tag">THE GPS PHILOSOPHY</div>
            <h2 className="gp-phil-title">We Sell the GPS. You Drive.</h2>
            <p className="gp-phil-desc">
              Traditional agencies lock you into perpetual retainers and opaque workflows. 
              We build your complete operational route, configure your digital engine, and hand you the steering wheel with 100% code and system ownership.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="gp-faq-section">
        <div className="gp-container">
          <div className="gp-section-header">
            <span className="gp-section-tag">CLARITY</span>
            <h2 className="gp-section-title">Frequently Asked Questions</h2>
          </div>

          <div className="gp-faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`gp-faq-item ${openFaq === idx ? "is-open" : ""}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="gp-faq-q">
                  <span>{faq.q}</span>
                  <span className="gp-faq-toggle">{openFaq === idx ? "−" : "+"}</span>
                </div>
                {openFaq === idx && <p className="gp-faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}