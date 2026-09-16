import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Building2,
  ChevronDown,
  Clock3,
  Code2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  X,
} from "lucide-react";

import "./Contact.css";

// =========================================================
// CONTACT IMAGES
// =========================================================

import contactHeroImg from "../assets/images/contact/contact-hero.png";
import contactGlobeImg from "../assets/images/contact/contact-globe.png";
import contactOfficeImg from "../assets/images/contact/contact-office.png";


export default function Contact({ onOpenBooking }) {
  return (
    <main className="contact-page">

      {/* =====================================================
          01 — HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-bg" />

        <div className="contact-container contact-hero-grid">

          {/* HERO CONTENT */}
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="section-eyebrow">
              <span />
              CONTACT US
              <span />
            </div>

            <h1>
              Let's Build
              <br />
              <strong>What's Next.</strong>
            </h1>

            <p>
              Have an idea, challenge, or transformation in mind?
              Let's turn it into something real.
            </p>

            <div className="hero-trust-row">

              <div className="hero-trust-item">
                <div className="trust-icon">
                  <Zap size={18} />
                </div>

                <span>
                  Innovative
                  <br />
                  Solutions
                </span>
              </div>


              <div className="hero-trust-item">
                <div className="trust-icon">
                  <ShieldCheck size={18} />
                </div>

                <span>
                  Trusted
                  <br />
                  Partner
                </span>
              </div>


              <div className="hero-trust-item">
                <div className="trust-icon">
                  <Users size={18} />
                </div>

                <span>
                  Long-Term
                  <br />
                  Support
                </span>
              </div>

            </div>

          </motion.div>


          {/* =================================================
              HERO IMAGE
              ================================================= */}

          <motion.div
            className="contact-hero-visual"
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <img
              src={contactHeroImg}
              alt="AI robotic hand interacting with a digital globe"
              className="contact-hero-image"
            />

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          02 — START A CONVERSATION
      ===================================================== */}

      <section className="conversation-section">

        <div className="contact-container conversation-grid">

          {/* FORM */}
          <motion.div
            className="conversation-form-card"
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <div className="step-number">
              01
            </div>

            <h2>
              Start a Conversation
            </h2>

            <p className="conversation-subtitle">
              Tell us about your project, and we'll get back to you
              within 24 hours.
            </p>


            <form
              onSubmit={(e) => e.preventDefault()}
            >

              <div className="form-row">

                <div className="form-field">

                  <label>
                    Your Name *
                  </label>

                  <div className="input-wrapper">

                    <Users size={17} />

                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                    />

                  </div>

                </div>


                <div className="form-field">

                  <label>
                    Work Email *
                  </label>

                  <div className="input-wrapper">

                    <Mail size={17} />

                    <input
                      type="email"
                      placeholder="Work Email"
                      required
                    />

                  </div>

                </div>

              </div>


              <div className="form-field">

                <label>
                  Company Name
                </label>

                <div className="input-wrapper">

                  <Building2 size={17} />

                  <input
                    type="text"
                    placeholder="Company Name"
                  />

                </div>

              </div>


              <div className="form-field">

                <label>
                  What can we help with? *
                </label>

                <div className="input-wrapper select-wrapper">

                  <Settings2 size={17} />

                  <select
                    defaultValue=""
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select a service
                    </option>

                    <option>
                      AI Solutions
                    </option>

                    <option>
                      Digital Transformation
                    </option>

                    <option>
                      Automation
                    </option>

                    <option>
                      Custom Software
                    </option>

                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              <div className="form-field">

                <label>
                  Your Message
                </label>

                <div className="textarea-wrapper">

                  <MessageSquare size={17} />

                  <textarea
                    placeholder="Tell us about your project..."
                    rows="5"
                  />

                </div>

              </div>


              <div className="form-submit-row">

                <button
                  type="submit"
                  className="primary-button"
                >
                  Send Inquiry
                  <ArrowRight size={18} />
                </button>

                <span className="response-note">

                  <Clock3 size={14} />

                  We'll get back to you shortly

                </span>

              </div>

            </form>

          </motion.div>


          {/* =================================================
              SECOND IMAGE
              ================================================= */}

          <motion.div
            className="conversation-visual"
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <img
              src={contactGlobeImg}
              alt="Digital global network"
              className="conversation-image"
            />

            <div className="visual-overlay">

              <h3>
                Your Vision.
                <br />
                <strong>Our Technology.</strong>
              </h3>

              <p>
                From strategy to implementation, we're here to help
                you create real impact with AI and digital innovation.
              </p>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          03 — SPECIFIC NEED
      ===================================================== */}

      <section className="specific-section">

        <div className="contact-container">

          <motion.div
            className="center-section-heading"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <h2>
              Have a specific need?
            </h2>

            <p>
              Choose what you're interested in, and our team will
              help you get started.
            </p>

          </motion.div>


          <div className="service-cards">

            <ServiceCard
              icon={<Brain />}
              title="AI Solutions"
              description="Intelligent systems for a smarter tomorrow."
            />

            <ServiceCard
              icon={<Sparkles />}
              title="Digital Transformation"
              description="Modernize. Optimize. Grow faster."
            />

            <ServiceCard
              icon={<Settings2 />}
              title="Automation"
              description="Save time. Reduce costs. Increase efficiency."
            />

            <ServiceCard
              icon={<Code2 />}
              title="Custom Software"
              description="Built around your goals. Not templates."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          04 — GET IN TOUCH
      ===================================================== */}

      <section className="get-touch-section">

        <div className="contact-container get-touch-grid">

          {/* CONTENT */}

          <motion.div
            className="get-touch-content"
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <div className="section-eyebrow left">

              <span />

              GET IN TOUCH

            </div>


            <h2>
              We'd love to hear
              <br />
              from you.
            </h2>


            <p>
              Reach out to us through any of the channels below.
              We're here to help.
            </p>


            <div className="contact-details">

              {/* PHONE */}

              <div className="contact-detail">

                <div className="detail-icon">
                  <Phone size={18} />
                </div>

                <div>

                  <strong>
                    +91 98765 43210
                  </strong>

                  <small>
                    Mon – Sat, 10AM – 6PM
                  </small>

                </div>

              </div>


              {/* EMAIL */}

              <div className="contact-detail">

                <div className="detail-icon">
                  <Mail size={18} />
                </div>

                <div>

                  <strong>
                    hello@nextgenai.com
                  </strong>

                  <small>
                    We'll reply within 24 hrs
                  </small>

                </div>

              </div>


              {/* LOCATION */}

              <div className="contact-detail">

                <div className="detail-icon">
                  <MapPin size={18} />
                </div>

                <div>

                  <strong>
                    Calicut, Kerala, India
                  </strong>

                  <small>
                    On-site & Remote Support
                  </small>

                </div>

              </div>

            </div>

          </motion.div>


          {/* =================================================
              OFFICE IMAGE
              ================================================= */}

          <motion.div
            className="office-area"
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <div className="map-image-wrapper">

              <img
                src={contactOfficeImg}
                alt="Isometric city view"
                className="office-map-image"
              />

            </div>


            <div className="office-card">

              <div className="office-title">

                <MapPin size={18} />

                <strong>
                  Our Office
                </strong>

              </div>


              <p>
                AI Concept llc
                <br />
                Hilite Business park, Calicut
                <br />
                Kerala - 682042, India
              </p>


              <div className="office-divider" />


              <strong className="follow-title">
                Follow Us
              </strong>


              <div className="social-links">

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  in
                </a>


                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <X size={15} />
                </a>


                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  ◎
                </a>


                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  ▶
                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          05 — FINAL CTA
      ===================================================== */}

      <section className="contact-final-cta">

        <div className="contact-container">

          <motion.div
            className="final-cta-box"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <div>

              <div className="cta-eyebrow">
                LET'S CONNECT
              </div>

              <h2>
                Your next breakthrough
                <br />
                could start with one conversation.
              </h2>

            </div>


            <button
              type="button"
              className="primary-button cta-button"
              onClick={onOpenBooking}
            >

              Book a Call

              <ArrowUpRight size={18} />

            </button>

          </motion.div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   SERVICE CARD
   ========================================================= */

function ServiceCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      className="service-card"
      whileHover={{
        y: -7,
      }}
      transition={{
        duration: 0.25,
      }}
    >

      <div className="service-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <button
        type="button"
        className="service-arrow"
        aria-label={`Learn more about ${title}`}
      >
        <ArrowRight size={17} />
      </button>

    </motion.div>
  );
}