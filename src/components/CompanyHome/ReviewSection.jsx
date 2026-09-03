import React, { useState } from "react";
import { Star, Check, ArrowUpRight } from "lucide-react";
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
        
        {/* Top Header Block */}
        <div className="rev-header">
          <h2 className="rev-title">
            Share Your <span className="rev-title-gradient">Experience</span>
          </h2>
        </div>

        {/* Centered Form Card Below Header */}
        <div className="rev-panel">
          {submitted ? (
            <div className="rev-success">
              <div className="rev-success-icon">
                <Check size={24} strokeWidth={3} />
              </div>
              <span className="rev-success-tag">FEEDBACK RECORDED</span>
              <h3>Thank you for your review.</h3>
              <p>Your perspective helps us maintain exceptional engineering standards and refine deployment sprints.</p>
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
            <form onSubmit={handleSubmit} className="rev-form">
              <div className="rev-form-top">
                <span className="rev-form-label">FEEDBACK FORM</span>
                <span className="rev-status-pill">AUTHENTIC REVIEWS</span>
              </div>

              {/* Name & Role Row */}
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

              {/* Rating */}
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
                        <Star size={16} fill={isFilled ? "#f59e0b" : "transparent"} stroke={isFilled ? "#f59e0b" : "#64748b"} />
                      </button>
                    );
                  })}
                  <span className="rev-rating-value">{rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Review Message */}
              <div className="rev-field">
                <label>YOUR REVIEW *</label>
                <textarea
                  name="review"
                  value={form.review}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your experience working with AI Concept LLC..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="rev-submit-btn">
                <span>SUBMIT REVIEW</span>
                <ArrowUpRight size={15} />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}