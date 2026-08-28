import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./Projects.css";

const projects = [
  { type:"E-COMMERCE", title:"Product-led storefront", className:"project-visual project-visual--shop" },
  { type:"BUSINESS", title:"Modern brand website", className:"project-visual project-visual--brand" },
  { type:"BOOKING", title:"Service booking flow", className:"project-visual project-visual--booking" },
];

export default function Projects() {
  return (
    <section className="projects-section">
      <div className="projects-section__inner">
        <div className="projects-section__head">
          <div className="section-kicker"><span /> SELECTED WORK / DEMOS</div>
          <div>
            <h2>Digital products<br /><em>made to move.</em></h2>
            <p>Use this area for the company's real projects as they become available. Until then, these visual concepts show the kinds of experiences we build.</p>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article key={project.title} className={`project-card project-card--${index + 1}`} initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.2 }} transition={{ duration:.55, delay:index*.08 }}>
              <div className={project.className}>
                <div className="project-window">
                  <div className="project-window__bar"><span /><span /><span /></div>
                  <div className="project-window__content">
                    {index === 0 && <><b>SHOP<br />BETTER.</b><i /><div className="project-products"><span /><span /><span /></div></>}
                    {index === 1 && <><small>AI CONCEPT</small><b>MAKE YOUR<br />BUSINESS<br />VISIBLE.</b><div className="project-brand-dot" /></>}
                    {index === 2 && <><small>BOOK A SLOT</small><b>Tuesday<br />18 June</b><div className="project-calendar"><span /><span /><span /><span /></div></>}
                  </div>
                </div>
              </div>
              <div className="project-card__meta"><span>{project.type}</span><strong>{project.title}</strong><ArrowUpRight size={16} /></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
