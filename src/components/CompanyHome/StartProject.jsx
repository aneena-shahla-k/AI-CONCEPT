import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Check,
  Globe,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import "./StartProject.css";

const types = [
  ["website", "Website", "Business / marketing site", Globe],
  ["app", "Mobile App", "iOS / Android product", Smartphone],
  ["booking", "Booking Platform", "Scheduling / appointments", CalendarDays],
  ["ai", "AI Product", "AI-powered experience", BrainCircuit],
];

export default function StartProject({ initialSpec }) {
  const [type, setType] = useState("website");
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Auto-fill form when user clicks "Lock this specification" from the Estimator
  useEffect(() => {
    if (initialSpec) {
      if (initialSpec.formType) {
        setType(initialSpec.formType);
      }
      
      const formattedNote = 
`[LOCKED ESTIMATOR SPECIFICATION]
• Platform: ${initialSpec.platformName}
• Delivery Window: ${initialSpec.deliveryWindow} (${initialSpec.tierName})
• Modules Required:
  - ${initialSpec.modules.join("\n  - ")}

• Additional Notes: `;

      setForm((prev) => ({
        ...prev,
        message: formattedNote,
      }));
    }
  }, [initialSpec]);

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="sp-contact" id="contact">
      <div className="sp-contact__container">
        {/* Left Narrative Panel */}
        <motion.div
          className="sp-contact__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sp-contact__eyebrow">
            <span className="sp-contact__dot" />
            <span>START A PROJECT // INTAKE</span>
          </div>

          <h2 className="sp-contact__title">
            TELL US WHAT <br />
            <span className="sp-contact__title-outline">YOU'RE BUILDING</span>
          </h2>

          <p className="sp-contact__lead">
            Give us the project essentials. We review your requirements and outline
            the exact scope, features, and deployment roadmap.
          </p>

          {/* Value Highlights */}
          <div className="sp-contact__facts">
            <div className="sp-fact-item">
              <span className="sp-fact-label">24–42H</span>
              <span className="sp-fact-desc">Focused rapid sprint window on scoped projects</span>
            </div>
            <div className="sp-fact-item">
              <span className="sp-fact-label">CUSTOM</span>
              <span className="sp-fact-desc">Feature architecture tailored to your workflows</span>
            </div>
            <div className="sp-fact-item">
              <span className="sp-fact-label">ADVANCE</span>
              <span className="sp-fact-desc">Milestone payment initiates live development</span>
            </div>
          </div>
        </motion.div>

        {/* Right Interactive Form Panel */}
        <motion.div
          className="sp-contact__panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {sent ? (
            /* Success State */
            <div className="sp-contact__success">
              <div className="sp-success-icon">
                <Check size={28} strokeWidth={3} />
              </div>
              <span className="sp-success-tag">ENQUIRY RECEIVED</span>
              <h3>Requirement submitted.</h3>
              <p>We'll review your project details and follow up within 24 hours.</p>
              <button
                type="button"
                className="sp-success-btn"
                onClick={() => setSent(false)}
              >
                SUBMIT ANOTHER BRIEF
              </button>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={submit} className="sp-form">
              <div className="sp-form-header">
                <span className="sp-form-label">01 // SELECT PROJECT TYPE</span>
                <span className="sp-security-tag">
                  <ShieldCheck size={13} /> DIRECT CHANNEL
                </span>
              </div>

              {/* Type Select Cards */}
              <div className="sp-types-grid">
                {types.map(([id, title, desc, Icon]) => {
                  const isActive = type === id;
                  return (
                    <button
                      type="button"
                      key={id}
                      className={`sp-type-card ${isActive ? "is-active" : ""}`}
                      onClick={() => setType(id)}
                    >
                      <div className="sp-type-card__icon">
                        <Icon size={17} />
                      </div>
                      <div className="sp-type-card__text">
                        <strong>{title}</strong>
                        <small>{desc}</small>
                      </div>
                      <div className="sp-type-card__indicator">
                        {isActive && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Input Fields */}
              <div className="sp-form-fields">
                <div className="sp-form-row">
                  <div className="sp-field">
                    <label>NAME *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={update}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="sp-field">
                    <label>EMAIL *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="sp-field">
                  <label>PHONE / WHATSAPP</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className="sp-field">
                  <label>PROJECT NOTE & REQUIRED FEATURES *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    rows="5"
                    placeholder="Describe what we should build..."
                    required
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button className="sp-submit-btn" type="submit">
                <span>SEND PROJECT ENQUIRY</span>
                <ArrowUpRight size={16} />
              </button>

              <small className="sp-form-note">
                Final scope proposal is shared after review. Advance payment confirms kickoff.
              </small>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}