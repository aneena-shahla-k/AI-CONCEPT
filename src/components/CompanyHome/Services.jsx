import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BrainCircuit, CalendarDays, Globe, LayoutDashboard, Smartphone, ShoppingBag } from "lucide-react";
import "./Services.css";

const services = [
  { id: "web", no: "01", title: "Websites", text: "High-converting websites built around your brand and business goals.", icon: Globe, color: "#dbe2ff", screen: "MARKETING / BUSINESS" },
  { id: "app", no: "02", title: "Mobile Apps", text: "Focused mobile experiences for customers, teams and communities.", icon: Smartphone, color: "#ffe1d5", screen: "MOBILE PRODUCT" },
  { id: "booking", no: "03", title: "Booking Platforms", text: "Scheduling, availability, payments and customer management in one flow.", icon: CalendarDays, color: "#e9f5b9", screen: "BOOKING / SCHEDULE" },
  { id: "commerce", no: "04", title: "E-commerce", text: "Product-led stores with checkout, orders, payments and admin control.", icon: ShoppingBag, color: "#e3d8ff", screen: "STORE / COMMERCE" },
  { id: "ai", no: "05", title: "AI Solutions", text: "Practical AI features that improve how customers and teams work.", icon: BrainCircuit, color: "#cfeee8", screen: "AI / AUTOMATION" },
  { id: "custom", no: "06", title: "Custom Software", text: "Dashboards, internal tools, APIs and systems shaped around your workflow.", icon: LayoutDashboard, color: "#f5dfaa", screen: "CUSTOM / SYSTEM" },
];

export default function Services() {
  const [active, setActive] = useState(services[0]);

  return (
    <section className="services-section">
      <div className="services-section__inner">
        <div className="services-section__intro">
          <div className="section-kicker"><span /> WHAT WE BUILD</div>
          <h2>One team.<br /><em>many possibilities.</em></h2>
          <p>From a focused website to a complete digital platform, we build the product around what your business actually needs.</p>
        </div>

        <div className="services-explorer">
          <div className="services-list">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  className={`service-row ${active.id === service.id ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(service)}
                  onFocus={() => setActive(service)}
                  onClick={() => setActive(service)}
                >
                  <span className="service-row__no">{service.no}</span>
                  <span className="service-row__icon"><Icon size={18} /></span>
                  <strong>{service.title}</strong>
                  <ArrowUpRight size={16} className="service-row__arrow" />
                </button>
              );
            })}
          </div>

          <div className="services-preview">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="services-preview__content"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: .28 }}
              >
                <div className="services-preview__label">{active.screen}</div>
                <div className="services-mock" style={{ "--service-accent": active.color }}>
                  <div className="services-mock__top"><span /><span /><span /></div>
                  <div className="services-mock__hero">
                    <small>AI CONCEPT / DIGITAL PRODUCT</small>
                    <strong>{active.title}</strong>
                    <div className="services-mock__button">EXPLORE →</div>
                  </div>
                  <div className="services-mock__blocks"><span /><span /><span /></div>
                </div>
                <p>{active.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
