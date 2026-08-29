import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Layers, 
  Smartphone, 
  BrainCircuit, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Send, 
  
} from "lucide-react";
import "./ProjectScoper.css";

// 1. Root Platforms
const platforms = [
  {
    id: "ecommerce",
    title: "E-COMMERCE STORE",
    desc: "Digital storefront & seamless checkout systems",
    icon: ShoppingBag,
    industries: [
      {
        id: "jewelry",
        name: "Jewelry & Luxury Goods",
        recommended: [
          "High-Precision Image Zoom & 360° View",
          "Live Gold / Metal Rate Dynamic Pricing",
          "Custom Engraving / Monogram Preview",
          "Insured Premium Delivery Workflow",
          "Multi-Currency & International Gateway"
        ]
      },
      {
        id: "fashion",
        name: "Clothing & Apparel",
        recommended: [
          "Interactive Size & Fit Guide Calculator",
          "Dynamic Color / Variant Switcher",
          "Lookbook & Complete Outfit Bundles",
          "Rapid One-Click Checkout (Apple Pay / UPI)",
          "Automated Inventory Return / Exchange Portal"
        ]
      },
      {
        id: "grocery",
        name: "Food, Grocery & Perishables",
        recommended: [
          "Hyperlocal Pincode Delivery Checker",
          "Scheduled Recurring Subscription Delivery",
          "Real-Time Delivery Slot Allocator",
          "WhatsApp Order Dispatch Notifications",
          "Weight & Unit Dynamic Price Adjustments"
        ]
      },
      {
        id: "cosmetics",
        name: "Beauty & Skincare",
        recommended: [
          "Skin Routine Recommendation Quiz Engine",
          "Shade Finder / Virtual Swatch Simulation",
          "Subscription Replenishment System",
          "Dermatologist / Ingredient Trust Badges",
          "Tiered VIP Customer Loyalty Club"
        ]
      }
    ]
  },
  {
    id: "erp",
    title: "BUSINESS ERP & CRM",
    desc: "Operational automation, staff portals & logistics",
    icon: Layers,
    industries: [
      {
        id: "retail_erp",
        name: "Retail & Multi-Branch POS",
        recommended: [
          "Multi-Store Real-time Stock Sync",
          "Cashier POS & Barcode Scanner Integration",
          "Supplier Purchase Order & Invoicing System",
          "Customer Purchase History & Credit Tracking",
          "Daily Cashflow & Profit Margin Analytics"
        ]
      },
      {
        id: "realestate_crm",
        name: "Real Estate & Contracting",
        recommended: [
          "Lead Pipeline & Automated Agent Assignment",
          "Property Inventory & Milestone Payment Tracker",
          "Client Agreement & Digital Signature Vault",
          "WhatsApp Auto-Trigger for Site Visit Booking",
          "Vendor & Subcontractor Payout Dashboard"
        ]
      },
      {
        id: "clinic_erp",
        name: "Healthcare & Clinic Management",
        recommended: [
          "Multi-Doctor Real-time Appointment Scheduler",
          "Digital Prescription & Patient History Vault",
          "Automated SMS / WhatsApp Appointment Reminders",
          "Pharmacy Billing & Medicine Inventory",
          "Doctor Commission & Referral Calculator"
        ]
      }
    ]
  },
  {
    id: "app",
    title: "CUSTOM MOBILE APP",
    desc: "Native-grade iOS & Android applications",
    icon: Smartphone,
    industries: [
      {
        id: "booking_app",
        name: "On-Demand Services / Booking",
        recommended: [
          "Live GPS Tracking & Provider Dispatch",
          "Real-Time In-App Chat & Calls",
          "Wallet & Instant In-App Payments",
          "Customer & Partner Rating/Review Logic",
          "Push Notifications for Step-by-Step Status"
        ]
      },
      {
        id: "community_app",
        name: "Membership & Social Community",
        recommended: [
          "User Profiles, Feeds & Media Uploads",
          "Direct & Group WebSocket Messaging",
          "Subscription Monetization & Paywalls",
          "Event Booking & QR Code Ticket Check-in",
          "Custom Moderation & Role Permission Tools"
        ]
      }
    ]
  },
  {
    id: "ai_product",
    title: "AI AGENT & CUSTOM SOFTWARE",
    desc: "Proprietary intelligent workflows & SaaS architectures",
    icon: BrainCircuit,
    industries: [
      {
        id: "custom_ai",
        name: "Enterprise Knowledge & AI Automation",
        recommended: [
          "Private Vector Database Trained on Company Docs",
          "Custom Multi-lingual Customer Service AI Bot",
          "Automated PDF / Invoice Data Extraction Engine",
          "Real-time Audio Voice Assistant Integration",
          "Autonomous Workflow Triggers via Webhooks"
        ]
      }
    ]
  }
];

export default function ProjectScoper() {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedIndustry, setSelectedIndustry] = useState(platforms[0].industries[0]);
  const [selectedFeatures, setSelectedFeatures] = useState(platforms[0].industries[0].recommended.slice(0, 3));
  
  const [clientData, setClientData] = useState({
    brandName: "",
    contactName: "",
    email: "",
    phone: "",
    budgetOrTimeline: "",
    customNotes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSelectPlatform = (plat) => {
    setSelectedPlatform(plat);
    setSelectedIndustry(plat.industries[0]);
    setSelectedFeatures(plat.industries[0].recommended.slice(0, 3));
  };

  const handleSelectIndustry = (ind) => {
    setSelectedIndustry(ind);
    setSelectedFeatures(ind.recommended.slice(0, 3));
  };

  const toggleFeature = (feat) => {
    setSelectedFeatures((prev) => 
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleClientDataChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Project Brief: ${clientData.brandName || "New Brand"} [${selectedPlatform.title}]`);
    const bodyContent = 
`--- AI CONCEPT LLC // CLIENT DISCOVERY BRIEF ---

BRAND / PROJECT: ${clientData.brandName}
CLIENT NAME: ${clientData.contactName}
EMAIL: ${clientData.email}
PHONE: ${clientData.phone}

TARGET ARCHITECTURE:
- Platform: ${selectedPlatform.title}
- Industry Niche: ${selectedIndustry.name}

CHOSEN CUSTOM FEATURES & AUTOMATIONS:
${selectedFeatures.map((f, i) => `${i + 1}. ${f}`).join("\n")}

TIMELINE / BUDGET NOTE:
${clientData.budgetOrTimeline || "Standard Sprint"}

ADDITIONAL NOTES:
${clientData.customNotes || "None"}

--- Generated via Discovery Studio Tool ---`;

    const mailtoLink = `mailto:info@aiconcept.in?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section className="scoper-section" id="scoper">
      <div className="scoper-container">

        {/* Section Header */}
        <div className="scoper-header">
          <div className="scoper-eyebrow">
            <span className="scoper-dot" />
            <span>DISCOVERY ENGINE &bull; STEP {step} OF 3</span>
          </div>

          <h2 className="scoper-title">
            BUILD YOUR <span className="scoper-title-outline">CONCEPT</span>
          </h2>
          <p className="scoper-subtitle">
            Configure your exact brand model, industry workflows, and custom automations. 
            We translate this brief into a locked development pipeline.
          </p>
        </div>

        {/* Multi-Step Workspace */}
        <div className="scoper-card">

          {/* Stepper Progress Tabs */}
          <div className="scoper-stepper">
            <div className={`scoper-step-tab ${step >= 1 ? "is-active" : ""}`}>
              <span>01</span> Core Platform
            </div>
            <div className={`scoper-step-tab ${step >= 2 ? "is-active" : ""}`}>
              <span>02</span> Niche & Features
            </div>
            <div className={`scoper-step-tab ${step >= 3 ? "is-active" : ""}`}>
              <span>03</span> Launch Details
            </div>
          </div>

          <div className="scoper-content">
            <AnimatePresence mode="wait">

              {/* STEP 1: SELECT PLATFORM */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="scoper-step-view"
                >
                  <span className="scoper-label">SELECT PRODUCT TYPE</span>
                  <div className="scoper-platform-grid">
                    {platforms.map((plat) => {
                      const Icon = plat.icon;
                      const isSelected = selectedPlatform.id === plat.id;
                      return (
                        <button
                          key={plat.id}
                          type="button"
                          className={`scoper-platform-btn ${isSelected ? "is-selected" : ""}`}
                          onClick={() => handleSelectPlatform(plat)}
                        >
                          <div className="scoper-plat-icon">
                            <Icon size={20} />
                          </div>
                          <strong>{plat.title}</strong>
                          <p>{plat.desc}</p>
                          <div className="scoper-plat-check">
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="scoper-actions">
                    <div />
                    <button 
                      type="button" 
                      className="scoper-next-btn"
                      onClick={() => setStep(2)}
                    >
                      <span>Configure Industry & Modules</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SELECT INDUSTRY & TAILORED MODULES */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="scoper-step-view"
                >
                  <span className="scoper-label">SELECT SPECIFIC NICHE</span>
                  <div className="scoper-industry-chips">
                    {selectedPlatform.industries.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        className={`scoper-ind-chip ${selectedIndustry.id === ind.id ? "is-active" : ""}`}
                        onClick={() => handleSelectIndustry(ind)}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </div>

                  <span className="scoper-label" style={{ marginTop: "24px" }}>
                    RECOMMENDED BRAND ARCHITECTURE FOR {selectedIndustry.name.toUpperCase()}
                  </span>
                  <div className="scoper-features-grid">
                    {selectedIndustry.recommended.map((feat) => {
                      const isChecked = selectedFeatures.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          className={`scoper-feat-card ${isChecked ? "is-checked" : ""}`}
                          onClick={() => toggleFeature(feat)}
                        >
                          <div className="scoper-feat-box">
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span>{feat}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="scoper-actions">
                    <button 
                      type="button" 
                      className="scoper-back-btn"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button 
                      type="button" 
                      className="scoper-next-btn"
                      onClick={() => setStep(3)}
                    >
                      <span>Proceed to Direct Intake</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: BRAND DETAILS & DIRECT DISCOVERY DISPATCH */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="scoper-step-view"
                >
                  {submitted ? (
                    <div className="scoper-success-view">
                      <div className="scoper-success-icon">
                        <Check size={32} strokeWidth={3} />
                      </div>
                      <h3>Discovery Brief Formatted</h3>
                      <p>Your email client has been triggered with the full architecture brief. We review all specifics and respond with a locked milestone plan within 24 hours.</p>
                      <button 
                        type="button" 
                        className="scoper-back-btn"
                        onClick={() => {
                          setSubmitted(false);
                          setStep(1);
                        }}
                      >
                        Build Another Brief
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="scoper-final-form">
                      {/* Live Scope Badge */}
                      <div className="scoper-summary-banner">
                        <div className="scoper-summary-left">
                          <div>
                            <strong>{selectedPlatform.title} &bull; {selectedIndustry.name}</strong>
                            <span>{selectedFeatures.length} Custom Features Selected</span>
                          </div>
                        </div>
                        <span className="scoper-direct-badge">DIRECT REVIEW</span>
                      </div>

                      <div className="scoper-form-row">
                        <div className="scoper-input-group">
                          <label>BRAND / PROJECT NAME *</label>
                          <input 
                            type="text" 
                            name="brandName"
                            required
                            placeholder="e.g. Aura Luxe, ZenMart"
                            value={clientData.brandName}
                            onChange={handleClientDataChange}
                          />
                        </div>
                        <div className="scoper-input-group">
                          <label>YOUR NAME *</label>
                          <input 
                            type="text" 
                            name="contactName"
                            required
                            placeholder="Full name"
                            value={clientData.contactName}
                            onChange={handleClientDataChange}
                          />
                        </div>
                      </div>

                      <div className="scoper-form-row">
                        <div className="scoper-input-group">
                          <label>WORK EMAIL *</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            placeholder="founder@yourbrand.com"
                            value={clientData.email}
                            onChange={handleClientDataChange}
                          />
                        </div>
                        <div className="scoper-input-group">
                          <label>PHONE / WHATSAPP</label>
                          <input 
                            type="text" 
                            name="phone"
                            placeholder="+91 00000 00000"
                            value={clientData.phone}
                            onChange={handleClientDataChange}
                          />
                        </div>
                      </div>

                      <div className="scoper-input-group">
                        <label>ADDITIONAL CUSTOM WORKFLOW NOTES</label>
                        <textarea 
                          rows="3"
                          name="customNotes"
                          placeholder="Tell us about specific third-party APIs, legacy databases, or references..."
                          value={clientData.customNotes}
                          onChange={handleClientDataChange}
                        />
                      </div>

                      <div className="scoper-actions">
                        <button 
                          type="button" 
                          className="scoper-back-btn"
                          onClick={() => setStep(2)}
                        >
                          <ArrowLeft size={16} />
                          <span>Modify Features</span>
                        </button>
                        <button 
                          type="submit" 
                          className="scoper-submit-btn"
                        >
                          <span>DISPATCH BRIEF TO STUDIO</span>
                          <Send size={15} />
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}