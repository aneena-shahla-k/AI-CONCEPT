import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, ArrowUp, X, Send, CheckCircle2 } from "lucide-react";
import "./FinalCTA.css";

export default function FinalCTA({ onOpenBooking }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    email: "",
    phone: "",
    projectType: "Web Platform",
    notes: "",
  });

  const go = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitted(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Footer Project Intake: ${formData.brandName || formData.name} [${formData.projectType}]`
    );
    const bodyContent = 
`--- AI CONCEPT LLC // DIRECT FOOTER INTAKE ---

CLIENT DETAILS:
- Name: ${formData.name}
- Brand / Company: ${formData.brandName || "N/A"}
- Email: ${formData.email}
- Phone: ${formData.phone || "N/A"}

PROJECT DETAILS:
- Architecture Type: ${formData.projectType}
- Scope & Requirements:
${formData.notes || "None provided"}

--- Direct Intake Submission ---`;

    const mailtoLink = `mailto:info@aiconcept.in?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <>
      <footer className="fn-footer">
        {/* Upper High-Impact Conversion Hub */}
        <section className="fn-cta">
          <div className="fn-cta__glow" />

          <motion.div
            className="fn-cta__content"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="fn-eyebrow">
              <span className="fn-dot" />
              <span>AI CONCEPT LLC // KICKOFF</span>
            </div>

            <h2 className="fn-cta__title">
              HAVE AN IDEA? <br />
              <span className="fn-cta__title-outline">LET'S MAKE IT REAL</span>
            </h2>

            <p className="fn-cta__lead">
              Engineering high-performance digital products & platforms from Calicut, India.
            </p>

            <button type="button" className="fn-btn-primary" onClick={handleOpenModal}>
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </section>

        {/* Main Footer Links Matrix */}
        <div className="fn-footer__container">
          <div className="fn-footer__main">
            {/* Brand Identity */}
            <div className="fn-footer__brand">
              <button
                type="button"
                className="fn-brand-logo"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span>AI CONCEPT</span>
                <small className="fn-logo-sub">LLC</small>
              </button>

              <p className="fn-brand-desc">
                Building Digital Experiences. <br />
                Software Company · AI Solutions · Custom Platforms
              </p>

              <div className="fn-location-badge">
                <MapPin size={12} />
                <span>Calicut, Kerala, India</span>
              </div>
            </div>

            {/* Nav & Info Columns */}
            <div className="fn-footer__columns">
              <div className="fn-col">
                <span className="fn-col-label">EXPLORE</span>
                <button type="button" onClick={() => go("#services")}>Services</button>
                <button type="button" onClick={() => go("#speed")}>24H / 42H Sprint</button>
                <button type="button" onClick={() => go("#scoper")}>Scope Builder</button>
                <button type="button" onClick={handleOpenModal}>Start Project</button>
                {onOpenBooking && (
                  <button type="button" onClick={onOpenBooking}>Book 1:1 Meet</button>
                )}
              </div>

              <div className="fn-col">
                <span className="fn-col-label">CAPABILITIES</span>
                <span>Web Platforms</span>
                <span>Mobile Apps</span>
                <span>E-Commerce</span>
                <span>Booking Engines</span>
                <span>AI Solutions</span>
              </div>

              <div className="fn-col">
                <span className="fn-col-label">DIRECT INTAKE</span>
                <a href="mailto:info@aiconcept.in">
                  <Mail size={13} />
                  <span>info@aiconcept.in</span>
                </a>
                <button type="button" onClick={handleOpenModal}>
                  <Phone size={13} />
                  <span>Project Desk</span>
                </button>
                <span className="fn-base-pill">
                  <span className="fn-green-dot" />
                  <span>Calicut Core Studio</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fn-footer__bottom">
            <span>&copy; {new Date().getFullYear()} AI CONCEPT LLC. ALL RIGHTS RESERVED.</span>
            <span className="fn-bottom-tag">BUILDING DIGITAL EXPERIENCES</span>
            <button
              type="button"
              className="fn-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </footer>

      {/* Start Project Direct Intake Modal */}
      {isModalOpen && (
        <div className="fn-modal-backdrop" onClick={handleCloseModal}>
          <div className="fn-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="fn-modal-header">
              <div>
                <span className="fn-modal-eyebrow">DIRECT INTAKE</span>
                <h3 className="fn-modal-title">START A PROJECT</h3>
              </div>
              <button
                type="button"
                className="fn-modal-close"
                onClick={handleCloseModal}
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="fn-modal-success">
                <CheckCircle2 size={44} className="fn-modal-success-icon" />
                <h4>Inquiry Prepared</h4>
                <p>
                  Your email client has been opened with your project brief. We will review and respond within 24 hours.
                </p>
                <button
                  type="button"
                  className="fn-modal-submit-btn"
                  onClick={handleCloseModal}
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="fn-modal-form">
                <div className="fn-modal-row">
                  <div className="fn-modal-field">
                    <label>YOUR NAME *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fn-modal-field">
                    <label>BRAND / COMPANY</label>
                    <input
                      type="text"
                      name="brandName"
                      placeholder="e.g. Acme Studio"
                      value={formData.brandName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="fn-modal-row">
                  <div className="fn-modal-field">
                    <label>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fn-modal-field">
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

                <div className="fn-modal-field">
                  <label>PROJECT TYPE</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="Web Platform">Web Platform / Modern Website</option>
                    <option value="Mobile App">Mobile App (iOS & Android)</option>
                    <option value="E-Commerce">E-Commerce Storefront</option>
                    <option value="Custom Software / ERP">Custom Software / ERP</option>
                    <option value="AI Integration">AI Integration & Automation</option>
                  </select>
                </div>

                <div className="fn-modal-field">
                  <label>PROJECT REQUIREMENTS & TARGET GOALS</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Describe your design inspirations, key features, or expected timelines..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="fn-modal-submit-btn">
                  <span>DISPATCH BRIEF</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}