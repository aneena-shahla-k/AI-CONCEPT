// src/components/Contact/ContactPage.jsx
import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
} from "lucide-react";
import "./ContactPage.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    projectType: "Complete Digital Ecosystem",
    budget: "$2.5k - $5k",
    timeline: "2-4 Weeks",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Intake: ${formData.brandName || formData.name} [${formData.projectType}]`);
    const bodyContent = 
`--- AI CONCEPT LLC // DIRECT INTAKE BRIEF ---

CLIENT DETAILS:
- Name: ${formData.name}
- Brand / Company: ${formData.brandName || "N/A"}
- Email: ${formData.email}
- Phone: ${formData.phone || "N/A"}

PROJECT PARAMETERS:
- System Type: ${formData.projectType}
- Target Budget: ${formData.budget}
- Expected Turnaround: ${formData.timeline}

PROJECT GOALS & REQUIREMENTS:
${formData.message || "None provided"}

--- Direct Intake Submission ---`;

    window.location.href = `mailto:info@aiconcept.in?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-ambient-glow" />

      <div className="contact-container">
        {/* Header */}
        <section className="contact-header">
          <div className="contact-badge">
            <span>DIRECT INTAKE & CONSULTATION</span>
          </div>

          <h1 className="contact-title">
            Let’s Build The Route. <br />
            <span className="contact-gradient-text">Connect Your Ecosystem.</span>
          </h1>

          
        </section>

        {/* 2-Column Split: Info Side vs. Intake Form */}
        <div className="contact-split-grid">
          {/* Left: Contact Channels & Guarantees */}
          <div className="contact-info-panel">
            <span className="contact-panel-label">COMMUNICATION CHANNELS</span>
            <h2>Direct Lines to Our Core Architecture Team</h2>

            <div className="contact-methods-list">
              <a href="mailto:info@aiconcept.in" className="contact-method-card">
                <div className="contact-method-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact-method-title">Direct Email</span>
                  <span className="contact-method-val">info@aiconcept.in</span>
                </div>
              </a>

              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="contact-method-card">
                <div className="contact-method-icon">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="contact-method-title">WhatsApp Priority Line</span>
                  <span className="contact-method-val">Start Instant Chat</span>
                </div>
              </a>

              <div className="contact-method-card non-link">
                <div className="contact-method-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="contact-method-title">Response Latency</span>
                  <span className="contact-method-val">&lt; 24 Hours Guaranteed</span>
                </div>
              </div>

              <div className="contact-method-card non-link">
                <div className="contact-method-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="contact-method-title">Headquarters</span>
                  <span className="contact-method-val">AI CONCEPT LLC // Global Remote Operations</span>
                </div>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="contact-guarantee-box">
              <div className="contact-guarantee-item">
                <CheckCircle2 size={15} className="contact-check" />
                <span>100% Code & Database Ownership</span>
              </div>
              <div className="contact-guarantee-item">
                <CheckCircle2 size={15} className="contact-check" />
                <span>Zero Retainer Lock-in</span>
              </div>
              <div className="contact-guarantee-item">
                <CheckCircle2 size={15} className="contact-check" />
                <span>Strict Non-Disclosure (NDA) Protected</span>
              </div>
            </div>
          </div>

          {/* Right: Functional Intake Form */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-form-success">
                <CheckCircle2 size={48} className="contact-success-icon" />
                <h3>Brief Prepared Successfully</h3>
                <p>
                  Your email client has been triggered with your pre-filled project specifications. 
                  Our team will review your data schemas and reply with an execution blueprint within 24 hours.
                </p>
                <button
                  type="button"
                  className="contact-btn-reset"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>YOUR NAME *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field">
                    <label>COMPANY / BRAND</label>
                    <input
                      type="text"
                      name="brandName"
                      placeholder="e.g. Acme Industries"
                      value={formData.brandName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>WORK EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field">
                    <label>PHONE / WHATSAPP</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>SYSTEM ARCHITECTURE</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="Complete Digital Ecosystem">Complete Connected Ecosystem</option>
                      <option value="Web & E-Commerce Storefront">High-Performance Web Platform</option>
                      <option value="Custom ERP & Back-Office">Custom ERP & Ops Management</option>
                      <option value="Custom AI Agents & Automations">AI Solutions & Neural Flows</option>
                      <option value="Growth Plan Strategy Route">Growth Plan Blueprint</option>
                    </select>
                  </div>
                  <div className="contact-field">
                    <label>ESTIMATED TIMELINE</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                    >
                      <option value="Rapid Sprint (24-48h)">Rapid Sprint (24-48h)</option>
                      <option value="2-4 Weeks">Standard Sprint (2-4 Weeks)</option>
                      <option value="Flexible / Q3 Rollout">Flexible / Q3 Rollout</option>
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <label>PROJECT GOALS, CHALLENGES & REQUIREMENTS</label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Tell us about the current bottlenecks, tools in use, or expected deliverables..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>DISPATCH PROJECT INTAKE</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}