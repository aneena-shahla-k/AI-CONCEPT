import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Eye, Lightbulb, Rocket, SlidersHorizontal } from "lucide-react";
import "./Process.css";

const steps = [
  ["01", "DISCOVER", "Tell us what you're solving.", Lightbulb],
  ["02", "PLAN", "Define scope, features and timeline.", SlidersHorizontal],
  ["03", "BUILD", "Design and development move together.", Code2],
  ["04", "REVIEW", "Test, refine and prepare the handoff.", Eye],
  ["05", "LAUNCH", "Go live with a product ready to use.", Rocket],
];

export default function Process() {
  return (
    <section className="process-section">
      <div className="process-section__inner">
        <div className="process-section__head">
          <div className="section-kicker"><span /> HOW IT WORKS</div>
          <div>
            <h2>Simple enough<br /><em>to move fast.</em></h2>
            <p>A focused process keeps decisions clear and development moving.</p>
          </div>
        </div>

        <div className="process-track">
          {steps.map(([no, label, desc, Icon], index) => (
            <motion.article
              className="process-step"
              key={no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ duration: .55, delay: index * .06 }}
            >
              <div className="process-step__top">
                <span>{no}</span>
                <Icon size={19} />
              </div>
              <strong>{label}</strong>
              <p>{desc}</p>
              <div className="process-step__bottom"><Check size={12} /> STEP {no}</div>
              {index < steps.length - 1 && <ArrowRight className="process-step__arrow" size={16} />}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
