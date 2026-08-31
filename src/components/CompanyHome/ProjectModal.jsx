import React, { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

export default function ProjectModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    email: "",
    phone: "",
    projectType: "Web Platform",
    notes: "",
  });

  if (!isOpen) return null;

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

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="ac-modal-backdrop" onClick={handleClose}>
      <div className="ac-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ac-modal-header">
          <div>
            <span className="ac-modal-eyebrow">DIRECT INTAKE</span>
            <h3 className="ac-modal-title">START A PROJECT</h3>
          </div>
          <button type="button" className="ac-modal-close" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="ac-modal-success">
            <CheckCircle2 size={44} className="ac-modal-success-icon" />
            <h4>Inquiry Prepared</h4>
            <p>Your email client has been opened with your project details. We will review and respond within 24 hours.</p>
            <button type="button" className="ac-modal-submit-btn" onClick={handleClose}>
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
              <select name="projectType" value={formData.projectType} onChange={handleChange}>
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
  );
}