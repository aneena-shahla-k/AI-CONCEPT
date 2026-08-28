import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Globe, Smartphone, CalendarDays, ShoppingBag, BrainCircuit, LayoutDashboard } from "lucide-react";
import "./Packages.css";

const packages = [
  { name:"Launch", tag:"A focused digital presence", price:"₹19,999", time:"24H+", features:["Responsive website","Up to 5 pages","Enquiry / contact flow","Basic SEO setup","Mobile optimization"] },
  { name:"Business", tag:"For a growing business", price:"₹39,999", time:"24–42H", popular:true, features:["Everything in Launch","Advanced UI/UX","Admin dashboard","API integration","Payment integration","Analytics setup"] },
  { name:"Scale", tag:"For a complete product", price:"₹69,999+", time:"Custom", features:["Web / mobile product","Advanced backend","Booking or commerce","AI integrations","Priority development"] },
];

const addOns = [
  ["Website", 9999, Globe], ["Mobile App", 19999, Smartphone], ["Booking", 14999, CalendarDays],
  ["E-commerce", 17999, ShoppingBag], ["AI Features", 12999, BrainCircuit], ["Dashboard", 9999, LayoutDashboard],
];

export default function Packages() {
  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState([]);

  const total = useMemo(() => selected.reduce((sum, i) => sum + addOns[i][1], 0), [selected]);

  const toggle = (index) => setSelected((current) => current.includes(index) ? current.filter((i) => i !== index) : [...current, index]);

  return (
    <section className="packages-section">
      <div className="packages-section__inner">
        <div className="packages-section__head">
          <div className="section-kicker"><span /> PACKAGES</div>
          <div>
            <h2>A starting point,<br /><em>not a limitation.</em></h2>
            <p>Choose a package or build a custom scope around your actual requirements.</p>
          </div>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <motion.button
              key={pkg.name}
              className={`package-card ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              whileHover={{ y: -5 }}
            >
              {pkg.popular && <span className="package-card__badge">MOST POPULAR</span>}
              <div className="package-card__no">0{index + 1}</div>
              <h3>{pkg.name}</h3>
              <p>{pkg.tag}</p>
              <strong>{pkg.price}</strong>
              <span className="package-card__time">{pkg.time} DELIVERY</span>
              <div className="package-card__line" />
              {pkg.features.map((feature) => <span className="package-card__feature" key={feature}><Check size={13} />{feature}</span>)}
              <div className="package-card__select">{active === index ? "SELECTED" : "SELECT PACKAGE"} <ArrowUpRight size={14} /></div>
            </motion.button>
          ))}
        </div>

        <div className="custom-builder">
          <div className="custom-builder__head">
            <div>
              <div className="section-kicker"><span /> CUSTOM BUILD</div>
              <h3>Make it yours.</h3>
              <p>Select only the modules you need. The total below is an editable estimate.</p>
            </div>
            <div className="custom-builder__total"><small>ESTIMATED FROM</small><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          </div>

          <div className="custom-builder__options">
            {addOns.map(([title, price, Icon], index) => (
              <button key={title} className={`custom-option ${selected.includes(index) ? "is-selected" : ""}`} onClick={() => toggle(index)}>
                <span className="custom-option__icon"><Icon size={17} /></span>
                <span><strong>{title}</strong><small>+ ₹{price.toLocaleString("en-IN")}</small></span>
                <span className="custom-option__check">{selected.includes(index) ? "✓" : "+"}</span>
              </button>
            ))}
          </div>

          <div className="custom-builder__bottom">
            <span>{selected.length ? `${selected.length} module${selected.length > 1 ? "s" : ""} selected` : "Start selecting modules"}</span>
            <button onClick={() => document.querySelector(".start-project")?.scrollIntoView({ behavior: "smooth" })}>BUILD MY PACKAGE <ArrowUpRight size={16} /></button>
          </div>
        </div>

        <div className="packages-payment">
          <span>PROJECT CONFIRMATION</span>
          <strong>Advance payment → development starts</strong>
          <small>Final pricing depends on project scope.</small>
        </div>
      </div>
    </section>
  );
}
