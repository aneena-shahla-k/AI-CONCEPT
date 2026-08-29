import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Check, ArrowUpRight, MessageSquareCheck, Sparkles } from "lucide-react";
import "./ReviewSection.css";

export default function ReviewSection() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    review: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="rev-section" id="reviews">
      <div className="rev-container">
        
        {/* Left Narrative Column */}
        <motion.div
          className="rev-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rev-eyebrow">
            <span className="rev-dot" />
            <span>CLIENT FEEDBACK</span>
          </div>

          <h2 className="rev-title">
            SHARE YOUR <br />
            <span className="rev-title-outline">EXPERIENCE</span>
          </h2>

          <p className="rev-lead">
            Your feedback directly guides how we engineer and deploy digital products. 
            Tell us about your experience building and collaborating with AI Concept llc.
          </p>

          <div className="rev-meta-box">
            <div className="rev-meta-item">
              <Sparkles size={14} />
              <span>Verified feedback helps refine our sprint pipelines.</span>
            </div>
            <div className="rev-meta-item">
              <MessageSquareCheck size={14} />
              <span>Direct review submission without third-party friction.</span>
            </div>
          </div>
        </motion.div>

        {/* Right Form Card */}
        <motion.div
          className="rev-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {submitted ? (
            /* Success State */
            <div className="rev-success">
              <div className="rev-success-icon">
                <Check size={28} strokeWidth={3} />
              </div>
              <span className="rev-success-tag">FEEDBACK RECORDED</span>
              <h3>Thank you for your review.</h3>
              <p>Your perspective helps us maintain exceptional engineering standards.</p>
              <button
                type="button"
                className="rev-reset-btn"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", role: "", company: "", review: "" });
                  setRating(5);
                }}
              >
                SUBMIT ANOTHER NOTE
              </button>
            </div>
          ) : (
            /* Review Intake Form */
            <form onSubmit={handleSubmit} className="rev-form">
              <div className="rev-form-header">
                <span className="rev-form-label">PROJECT FEEDBACK</span>
                <span className="rev-status-pill">AUTHENTIC REVIEWS</span>
              </div>

              {/* Name & Role */}
              <div className="rev-row">
                <div className="rev-field">
                  <label>YOUR NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="rev-field">
                  <label>YOUR ROLE</label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g. Founder, Product Lead"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="rev-field">
                <label>COMPANY / ORGANIZATION</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                />
              </div>

              {/* Interactive Star Rating */}
              <div className="rev-rating-field">
                <label>RATING *</label>
                <div className="rev-stars">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        className={`rev-star-btn ${isFilled ? "is-filled" : ""}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} star`}
                      >
                        <Star size={18} fill={isFilled ? "#ffffff" : "transparent"} />
                      </button>
                    );
                  })}
                  <span className="rev-rating-value">{rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="rev-field">
                <label>YOUR REVIEW *</label>
                <textarea
                  name="review"
                  value={form.review}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your experience working with AI Concept llc..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="rev-submit-btn">
                <span>SUBMIT REVIEW</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}