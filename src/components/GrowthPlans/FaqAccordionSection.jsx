import React, { useState } from "react";
import "./FaqAccordionSection.css";

const faqs = [
  {
    q: "How is a Growth Plan different from standard software development?",
    a: "Traditional agencies start writing code immediately without validating business mechanics. A Growth Plan designs your monetization, ICP, conversion funnels, and operating systems first, so every line of code directly drives revenue.",
  },
  {
    q: "Can you build the software after delivering the Growth Plan?",
    a: "Yes. Once the blueprint is handed over, you have two choices: deploy our engineering team to build the entire connected ecosystem in rapid sprints, or hand the blueprint to your internal team to execute independently.",
  },
  {
    q: "Who is this suitable for?",
    a: "Founders launching a new venture who need an end-to-end blueprint, as well as operational businesses held back by disconnected tools, spreadsheets, and manual friction.",
  },
];

export default function FaqAccordionSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="gp-faq-section">
      <div className="gp-container">
        
        <div className="gp-section-header" data-aos="fade-up"
     data-aos-anchor-placement="center-center">
          <h2 className="gp-section-title">Frequently Asked Questions</h2>
        </div>

        <div className="gp-faq-list">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`gp-faq-item ${openFaq === idx ? "is-open" : ""}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="gp-faq-q">
                <span>{faq.q}</span>
                <span className="gp-faq-toggle">{openFaq === idx ? "−" : "+"}</span>
              </div>
              {openFaq === idx && <p className="gp-faq-a">{faq.a}</p>}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}