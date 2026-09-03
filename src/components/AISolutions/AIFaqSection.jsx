// src/components/AISolutions/components/AIFaqSection.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./AIFaqSection.css";

const aiFaqs = [
  {
    q: "How is custom AI development different from using ChatGPT wrappers?",
    a: "We do not build generic API skins. We engineer custom architectures configured around your proprietary data, private server environments, and database schemas with strict security boundaries.",
  },
  {
    q: "Is our business data secure when building custom AI systems?",
    a: "Yes. Models can be hosted within private VPCs or dedicated micro-instances with zero data retention for public model retraining, ensuring enterprise-grade compliance.",
  },
  {
    q: "Can custom AI integrate into our existing CRM and ERP?",
    a: "Yes. Every AI model and agent we build is packaged with custom webhook endpoints and APIs configured to communicate bidirectionally with existing systems.",
  },
];

export default function AIFaqSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="ai-faq-section">
      <div className="ai-section-header">
        <span className="ai-section-tag">TECHNICAL CLARITY</span>
        <h2 className="ai-section-title">Frequently Asked Questions</h2>
      </div>

      <div className="ai-faq-list">
        {aiFaqs.map((faq, idx) => (
          <div
            key={idx}
            className={`ai-faq-item ${openFaq === idx ? "is-open" : ""}`}
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
          >
            <div className="ai-faq-q">
              <span>{faq.q}</span>
              <ChevronDown
                size={16}
                className={`ai-faq-icon ${openFaq === idx ? "is-rotated" : ""}`}
              />
            </div>
            {openFaq === idx && <p className="ai-faq-a">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}