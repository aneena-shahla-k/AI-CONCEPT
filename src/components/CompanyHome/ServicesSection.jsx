import React, { useState } from "react";
import { 
  Globe, 
  Smartphone, 
  ShoppingBag, 
  Calendar, 
  Bot, 
  Cpu, 
  ArrowUpRight, 
  Check,
  X,
  Zap,
  Send,
  CheckCircle2
} from "lucide-react";
import "./ServicesSection.css";

const services = [
  {
    id: "01",
    tag: "WEB / ARCHITECTURE",
    title: "WEB PLATFORMS",
    icon: Globe,
    deliverables: ["Next.js / React Setup", "Core Web Vitals 99+", "Custom UI Motion & Canvas"],
    tools: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel Edge"],
    selectableFeatures: [
      "Custom Landing Page & Visual Narrative",
      "Dynamic CMS & Blog Integration",
      "Interactive 3D / Canvas Scroll Motion",
      "High-Conversion Lead Capture Funnel",
      "Multi-Language & Global CDN Setup"
    ]
  },
  {
    id: "02",
    tag: "MOBILE / OS",
    title: "MOBILE APPS",
    icon: Smartphone,
    deliverables: ["Cross-Platform React Native", "60 FPS Fluid Motion", "Push Notification Architecture"],
    tools: ["React Native", "Expo", "Swift Bridge", "Firebase", "Redux Toolkit"],
    selectableFeatures: [
      "iOS & Android Dual Store Ready",
      "Push Notifications & In-App Alerts",
      "Real-time GPS / Provider Tracking",
      "Biometric Login (FaceID / Fingerprint)",
      "Offline Data Storage & Sync"
    ]
  },
  {
    id: "03",
    tag: "RETAIL / ENGINE",
    title: "E-COMMERCE",
    icon: ShoppingBag,
    deliverables: ["Custom Headless Cart Flows", "Multi-Gateway Instant Payments", "Automated Invoice & WhatsApp Alerts"],
    tools: ["Shopify Headless", "Stripe API", "Razorpay", "Twilio / WhatsApp API", "Medusa.js"],
    selectableFeatures: [
      "Sub-Second Headless Checkout",
      "Payment Gateways (Stripe, UPI, Cards)",
      "Automated WhatsApp Order Updates",
      "Inventory & Order Management Portal",
      "Discount Engine & VIP Customer Loyalty"
    ]
  },
  {
    id: "04",
    tag: "TIME / MATRIX",
    title: "BOOKING PLATFORMS",
    icon: Calendar,
    deliverables: ["Zero-Conflict Slot Locking", "Live Calendar & WhatsApp Sync", "Custom Doctor/Admin Management"],
    tools: ["Node.js", "WebSockets", "Google Calendar API", "PostgreSQL", "Twilio"],
    selectableFeatures: [
      "Real-Time Conflict-Free Slot Locking",
      "Google Calendar & WhatsApp Auto-Sync",
      "Advance Deposit / Full Payment Locking",
      "Staff & Practitioner Availability Board",
      "Automated SMS / Email Appointment Reminders"
    ]
  },
  {
    id: "05",
    tag: "NEURAL / AGENTS",
    title: "AI SOLUTIONS",
    icon: Bot,
    deliverables: ["Private Vector DB Training", "Automated Task Execution Bots", "Contextual PDF/Data Extractors"],
    tools: ["OpenAI API", "LangChain", "FastAPI", "Pinecone", "Python Core"],
    selectableFeatures: [
      "Custom AI Bot Trained on Company Docs",
      "24/7 Multi-Lingual Customer Support",
      "Automated PDF / Invoice Data Extraction",
      "Smart Lead Qualification & Scoring",
      "Voice & Audio AI Processing Pipeline"
    ]
  },
  {
    id: "06",
    tag: "CORE / SAAS",
    title: "CUSTOM SOFTWARE / ERP",
    icon: Cpu,
    deliverables: ["Multi-Tenant RBAC Security", "High-Concurrency REST/GraphQL APIs", "Custom Accounting & Inventory POS"],
    tools: ["PostgreSQL", "Docker", "Node / Express", "Redis Cache", "AWS Architecture"],
    selectableFeatures: [
      "Multi-Role Staff Access (RBAC)",
      "Multi-Branch Live Inventory & POS Sync",
      "Automated Billing, GST & Tax Reports",
      "Vendor & Subcontractor Payout Engine",
      "Secure Cloud Database & Auto-Backups"
    ]
  },
];

export default function ServicesSection() {
  const [selectedModalService, setSelectedModalService] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // User input states
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    notes: ""
  });

  const handleOpenModal = (service) => {
    setSelectedModalService(service);
    setSelectedFeatures(service.selectableFeatures.slice(0, 2)); // Pre-check first 2
    setSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedModalService(null);
    setSubmitted(false);
  };

  const toggleFeature = (feat) => {
    setSelectedFeatures((prev) => 
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleDirectConfirm = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Direct Service Intake: ${userInput.brandName || userInput.name} [${selectedModalService.title}]`);
    const bodyContent = 
`--- AI CONCEPT LLC // DIRECT SERVICE INTAKE ---

SERVICE CHOSEN: ${selectedModalService.title} (${selectedModalService.tag})

CLIENT DETAILS:
- Name: ${userInput.name}
- Brand / Project: ${userInput.brandName || "N/A"}
- Email: ${userInput.email}
- Phone: ${userInput.phone || "N/A"}

SELECTED MODULES & FEATURES:
${selectedFeatures.map((f, i) => `${i + 1}. ${f}`).join("\n")}

USER NOTES / REQUIREMENTS:
${userInput.notes || "None provided."}

--- Direct In-Modal Dispatch ---`;

    const mailtoLink = `mailto:info@aiconcept.in?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section className="fc-services" id="services">
      <div className="fc-container">
        
        {/* Header */}
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
              <span>CLICK TO CONFIGURE & DIRECT CONFIRM</span>
            </div>
          </div>
        </div>

        {/* 6-Card High-Performance Grid */}
        <div className="fc-grid">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="fc-service-card"
                onClick={() => handleOpenModal(item)}
              >
                <div className="fc-card-top">
                  <span className="fc-card-num">{item.id}</span>
                  <div className="fc-card-icon-wrap">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="fc-card-middle">
                  <span className="fc-card-tag">{item.tag}</span>
                  <h3 className="fc-card-title">{item.title}</h3>
                  <p className="fc-card-desc">{item.desc}</p>
                </div>

                <div className="fc-card-bottom">
                  <div className="fc-deliverable-pills">
                    {item.deliverables.slice(0, 2).map((del) => (
                      <span key={del} className="fc-mini-pill">{del}</span>
                    ))}
                  </div>

                  <div className="fc-inspect-trigger">
                    <span>Configure</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Direct In-Modal Configure & Instant Confirm Drawer/Modal */}
      {selectedModalService && (
        <div className="fc-modal-backdrop" onClick={handleCloseModal}>
          <div className="fc-modal-panel" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="fc-modal-header">
              <div className="fc-modal-brand">
                <span className="fc-modal-num">{selectedModalService.id}</span>
                <div>
                  <span className="fc-modal-tag">{selectedModalService.tag}</span>
                  <h3>{selectedModalService.title}</h3>
                </div>
              </div>
              <button 
                type="button" 
                className="fc-modal-close" 
                onClick={handleCloseModal}
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              /* Success View */
              <div className="fc-modal-success">
                <CheckCircle2 size={48} className="fc-success-icon" />
                <h3>Specification Confirmed</h3>
                <p>Your custom configuration has been formatted to our desk. We will review your selected modules and follow up within 24 hours.</p>
                <button 
                  type="button" 
                  className="fc-modal-done-btn"
                  onClick={handleCloseModal}
                >
                  DONE
                </button>
              </div>
            ) : (
              /* Direct Configure & Submit Form */
              <form onSubmit={handleDirectConfirm} className="fc-modal-form">
                
                {/* Tech Stack Strip */}
                <div className="fc-modal-techs">
                  {selectedModalService.tools.map((tool) => (
                    <span key={tool} className="fc-tech-pill">
                      <Zap size={10} /> {tool}
                    </span>
                  ))}
                </div>

                {/* Interactive Feature Checkboxes */}
                <div className="fc-modal-block">
                  <span className="fc-block-label">01 SELECT REQUIRED MODULES</span>
                  <div className="fc-modal-feature-list">
                    {selectedModalService.selectableFeatures.map((feat) => {
                      const isChecked = selectedFeatures.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          className={`fc-feat-pill-btn ${isChecked ? "is-active" : ""}`}
                          onClick={() => toggleFeature(feat)}
                        >
                          <div className="fc-feat-check">
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span>{feat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct User Contact Inputs */}
                <div className="fc-modal-block">
                  <span className="fc-block-label">02 YOUR PROJECT DETAILS</span>
                  <div className="fc-modal-inputs-grid">
                    <div className="fc-input-wrap">
                      <label>YOUR NAME *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Full name"
                        value={userInput.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fc-input-wrap">
                      <label>BRAND / PROJECT NAME</label>
                      <input 
                        type="text" 
                        name="brandName" 
                        placeholder="e.g. Acme Studio"
                        value={userInput.brandName}
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
                        value={userInput.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="fc-input-wrap">
                      <label>WHATSAPP / PHONE</label>
                      <input 
                        type="text" 
                        name="phone" 
                        placeholder="+91 00000 00000"
                        value={userInput.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="fc-input-wrap" style={{ marginTop: "12px" }}>
                    <label>SPECIFIC NOTES & WORKFLOW REQUIREMENTS</label>
                    <textarea 
                      name="notes" 
                      rows="2"
                      placeholder="Mention any custom APIs, third-party integrations, or target timelines..."
                      value={userInput.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Instant Direct Confirm Button */}
                <div className="fc-modal-footer">
                  <button type="submit" className="fc-direct-submit-btn">
                    <span>CONFIRM & LOCK THIS SPECIFICATION</span>
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
}