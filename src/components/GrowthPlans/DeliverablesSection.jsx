import React from "react";
import { FileText, Layers, Cpu, Calendar } from "lucide-react";
import "./DeliverablesSection.css";

const deliverables = [
  {
    id: "route-doc",
    icon: <FileText size={18} />,
    title: "Master Route Document",
    desc: "A complete strategic & technical blueprint covering all 8 pillars of your business.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "system-map",
    icon: <Layers size={18} />,
    title: "Interactive System Map",
    desc: "Visual architecture diagram mapping how Web, Mobile Apps, CRM & AI pipelines interconnect.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tech-spec",
    icon: <Cpu size={18} />,
    title: "Tech Stack Specification",
    desc: "Database schemas, API endpoints, microservice routing, and serverless hosting architecture.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "roadmap",
    icon: <Calendar size={18} />,
    title: "30 / 60 / 90-Day Roadmap",
    desc: "Turn-by-turn weekly operational sprints and deployment milestones for your engineering team.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

export default function DeliverablesSection() {
  return (
    <section className="gp-deliverables-section">
      <div className="gp-container">
        
        <div className="gp-section-header" data-aos="zoom-in-down">
          <h2 className="gp-section-title">
            What You Receive <span className="gp-gradient-text">in Hand</span>
          </h2>
         
        </div>

        <div className="gp-deliverables-grid">
          {deliverables.map((item) => (
            <div key={item.id} className="gp-deliv-tile">
              <img 
                src={item.image} 
                alt={item.title} 
                className="gp-deliv-img" 
                loading="lazy" 
              />
              <div className="gp-deliv-scrim" />

              <div className="gp-deliv-top-tag">
                {item.icon}
                <span>{item.tag}</span>
              </div>

              <div className="gp-deliv-glass-card">
                <div className="gp-deliv-card-header" data-aos="zoom-out">
                  <h3 className="gp-deliv-title">{item.title}</h3>          
                </div>

               <div data-aos="zoom-out"> <p className="gp-deliv-desc">{item.desc}</p></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}