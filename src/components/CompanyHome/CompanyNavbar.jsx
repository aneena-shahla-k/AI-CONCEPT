import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, Send, CheckCircle2 } from "lucide-react";
import "./CompanyNavbar.css";

const links = [
  ["#services", "Services"],
  ["#speed", "Speed"],
  ["#scoper", "Scope Builder"],
  ["#work", "Work"],
];

export default function CompanyNavbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const handleOpenProjectModal = () => {
    setIsModalOpen(true);
    setOpen(false);
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
      `New Project Inquiry: ${formData.brandName || formData.name} [${formData.projectType}]`
    );
    const bodyContent = 
`--- AI CONCEPT LLC // NEW PROJECT BRIEF ---

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
      <header className={`ac-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="ac-nav__bar">
          {/* Brand Logo */}
          <button
            type="button"
            className="ac-nav__brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="ac-nav__brand-name">AI CONCEPT</span>
          </button>

          {/* Center Nav Links */}
          <nav className="ac-nav__links">
            {links.map(([selector, label]) => (
              <button
                type="button"
                key={label}
                onClick={() => go(selector)}
                className="ac-nav__link-btn"
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenBooking}
              className="ac-nav__link-btn ac-nav__link-highlight"
            >
              Book 1:1 Meet
            </button>
          </nav>

          {/* Single Right Action */}
          <div className="ac-nav__right">
            <button
              type="button"
              className="ac-nav__cta"
              onClick={handleOpenProjectModal}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={14} />
            </button>

            <button
              type="button"
              className="ac-nav__menu"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`ac-nav__mobile ${open ? "is-open" : ""}`}>
          <div className="ac-nav__mobile-inner">
            {links.map(([selector, label], index) => (
              <button
                type="button"
                key={label}
                onClick={() => go(selector)}
                className="ac-nav__mobile-link"
              >
                <span className="ac-nav__mobile-num">0{index + 1}</span>
                <span className="ac-nav__mobile-text">{label}</span>
              </button>
            ))}

            <button
              type="button"
              className="ac-nav__mobile-link"
              onClick={() => {
                setOpen(false);
                onOpenBooking();
              }}
            >
              <span className="ac-nav__mobile-num">06</span>
              <span className="ac-nav__mobile-text">Book 1:1 Meeting</span>
            </button>

            <button
              type="button"
              className="ac-nav__mobile-cta"
              onClick={handleOpenProjectModal}
            >
              <span>Start a project</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Start A Project Modal */}
      {isModalOpen && (
        <div className="ac-modal-backdrop" onClick={handleCloseModal}>
          <div className="ac-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="ac-modal-header">
              <div>
                <span className="ac-modal-eyebrow">DIRECT INTAKE</span>
                <h3 className="ac-modal-title">START A PROJECT</h3>
              </div>
              <button
                type="button"
                className="ac-modal-close"
                onClick={handleCloseModal}
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="ac-modal-success">
                <CheckCircle2 size={44} className="ac-modal-success-icon" />
                <h4>Inquiry Prepared</h4>
                <p>
                  Your email client has been opened with your project details. We will review and respond within 24 hours.
                </p>
                <button
                  type="button"
                  className="ac-modal-submit-btn"
                  onClick={handleCloseModal}
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ac-modal-form">
                <div className="ac-modal-row">
                  <div className="ac-modal-field">
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
                  <div className="ac-modal-field">
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

                <div className="ac-modal-row">
                  <div className="ac-modal-field">
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
                  <div className="ac-modal-field">
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

                <div className="ac-modal-field">
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

                <div className="ac-modal-field">
                  <label>PROJECT REQUIREMENTS & TARGET GOALS</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Describe your design inspirations, key features, or expected timelines..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="ac-modal-submit-btn">
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