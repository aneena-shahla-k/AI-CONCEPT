import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Database, LayoutDashboard, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import "./Features.css";

const features = [
  ["Payments", CreditCard, "Checkout, subscriptions and payment flows."],
  ["Dashboards", LayoutDashboard, "Clear admin control for your product."],
  ["Authentication", ShieldCheck, "Secure login, roles and user access."],
  ["AI", Sparkles, "AI assistants, recommendations and automation."],
  ["Maps", MapPin, "Location, delivery and service discovery."],
  ["Search", Search, "Fast search and smart filtering."],
  ["Database", Database, "Structured data and scalable backend logic."],
];

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section className="features-section">
      <div className="features-section__inner">
        <div className="features-section__head">
          <div className="section-kicker"><span /> PRODUCT CAPABILITIES</div>
          <h2>Pick the pieces<br /><em>your product needs.</em></h2>
        </div>

        <div className="features-builder">
          <div className="features-builder__list">
            {features.map(([title, Icon, desc], index) => (
              <button
                key={title}
                className={`feature-choice ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                <span className="feature-choice__number">0{index + 1}</span>
                <span className="feature-choice__icon"><Icon size={16} /></span>
                <strong>{title}</strong>
                {active === index && <Check size={15} />}
              </button>
            ))}
          </div>

          <div className="features-builder__visual">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }}
              className="feature-product"
            >
              <div className="feature-product__top">
                <span>AI CONCEPT / PRODUCT BUILDER</span>
                <span>LIVE PREVIEW</span>
              </div>
              <div className="feature-product__screen">
                <div className="feature-product__sidebar">
                  <span /><span /><span /><span />
                </div>
                <div className="feature-product__main">
                  <small>ACTIVE MODULE</small>
                  <strong>{features[active][0]}</strong>
                  <p>{features[active][2]}</p>
                  <div className="feature-product__stats">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
              <div className="feature-product__bottom">
                <span>FEATURE ADDED</span>
                <b>+ 01</b>
              </div>
            </motion.div>
          </div>
        </div>

        <p className="features-section__foot">Add only what creates value. We can shape the rest around your workflow.</p>
      </div>
    </section>
  );
}
