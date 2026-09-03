// src/components/AISolutions/components/AIPipelineSection.jsx
import React from "react";
import "./AIPipelineSection.css";

const technicalSteps = [
  {
    step: "01",
    name: "Data Ingestion",
    detail: "Structuring private enterprise records and vector embeddings.",
  },
  {
    step: "02",
    name: "Model Tuning",
    detail: "Configuring deterministic function-calling pipelines.",
  },
  {
    step: "03",
    name: "System Wiring",
    detail: "Integrating AI layers directly into your active Web & ERP stack.",
  },
  {
    step: "04",
    name: "Autonomous Ops",
    detail: "Enforcing strict privacy boundaries and zero data leakage.",
  },
];

export default function AIPipelineSection() {
  return (
    <section className="ai-pipeline-section">
      <div className="ai-section-header">
        <span className="ai-section-tag">IMPLEMENTATION STACK</span>
        <h2 className="ai-section-title">How We Build Custom AI</h2>
        <p className="ai-section-desc">
          Four-stage deterministic engineering pipeline from raw data to autonomous execution.
        </p>
      </div>

      <div className="ai-pipeline-track">
        {technicalSteps.map((s, idx) => (
          <div key={idx} className="ai-pipe-step">
            <div className="ai-pipe-num">{s.step}</div>
            <h4 className="ai-pipe-title">{s.name}</h4>
            <p className="ai-pipe-desc">{s.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}