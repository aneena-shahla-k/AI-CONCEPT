import React, { useState, useRef } from 'react';
import { ArrowUpRight, Navigation } from 'lucide-react';
import './GrowthPlan.css';

const planPhases = [
  {
    step: "01",
    phase: "Concept & Foundation",
    title: "Business Idea",
    question: "What should the business sell?",
    desc: "Market viability analysis, value proposition refinement, and defining your high-margin offerings.",
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "02",
    phase: "Monetization",
    title: "Business Model",
    question: "How will it make money?",
    desc: "Revenue streams, pricing mechanics, unit economics, and recurring cash-flow architecture.",
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "03",
    phase: "Targeting",
    title: "Market Strategy",
    question: "Who are the customers?",
    desc: "Ideal Customer Profile (ICP), competitive positioning, and market penetration routes.",
    category: "Go-to-Market",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "04",
    phase: "Packaging",
    title: "Product / Service Structure",
    question: "What exactly should be offered?",
    desc: "Tiered service packages, deliverable scopes, catalog structuring, and SLA framework.",
    category: "Go-to-Market",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "05",
    phase: "Brand Presentation",
    title: "Exhibition Strategy",
    question: "How should the business present itself?",
    desc: "Digital authority, brand narrative, showcase funnels, and enterprise pitch positioning.",
    category: "Brand & Sales",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "06",
    phase: "Acquisition Engine",
    title: "Marketing Plan",
    question: "How will customers be acquired?",
    desc: "Multi-channel funnel, paid acquisition, organic reach, and automated conversion pipelines.",
    category: "Brand & Sales",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "07",
    phase: "Digital Infrastructure",
    title: "Technology Plan",
    question: "What systems are required?",
    desc: "Target architecture across Web, Mobile Apps, CRM, ERP, E-Commerce, and integrated AI automation.",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    step: "08",
    phase: "Scale & Longevity",
    title: "Succession & Scaling Plan",
    question: "How does the business run without you?",
    desc: "Standard operating procedures (SOPs), delegation frameworks, and autonomous operating models.",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  }
];

export default function GrowthPlan({ onOpenProject }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef(null);

  // Sync active card when user scrolls/swipes
  const handleNativeScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 320;

      const index = Math.min(
        Math.round(scrollLeft / cardWidth),
        planPhases.length - 1
      );

      if (index !== activeIdx && index >= 0) {
        setActiveIdx(index);
      }
    }
  };

  // Scroll to selected card
  const handleCardClick = (index) => {
    setActiveIdx(index);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * 320,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="growth-scale-section">
      <div className="growth-scale-container">

        {/* Left Column */}
        <div className="growth-left-col">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-center"
          >
            <h2 className="growth-left-title">
              Don’t start with software. <br />
              <span className="blue-highlight">
                Start with the route.
              </span>
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="growth-right-col">

          {/* Horizontal Cards */}
          <div
            className="growth-cards-carousel"
            ref={scrollRef}
            onScroll={handleNativeScroll}
          >
            {planPhases.map((item, index) => (
              <div
                key={item.step}
                className={`scale-img-card ${
                  index === activeIdx ? 'is-active' : ''
                }`}
                onClick={() => handleCardClick(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="scale-card-bg"
                  loading="lazy"
                />

                <div className="scale-card-scrim" />

                {/* Top Glass Category Badge */}
                <div className="scale-card-badge">
                  <span className="step-num-pill">
                    {item.step}
                  </span>

                  <span>{item.category}</span>
                </div>

                {/* Bottom Text Content */}
                <div className="scale-card-body">
                  <span className="scale-card-question">
                    {item.question}
                  </span>

                  <h3 className="scale-card-title">
                    {item.title}
                  </h3>

                  <p className="scale-card-desc">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* GPS Hand-off Banner */}
      <div className="gps-handoff-banner">

        <div className="gps-banner-content">

          <div className="gps-icon-wrapper">
            <Navigation size={22} />
          </div>

          <div>
            <h3 className="gps-banner-title">
              We hand you the roadmap. You drive.
            </h3>
          </div>

        </div>

        <button
          type="button"
          className="gps-cta-button"
          onClick={onOpenProject}
        >
          <span>Request Growth Blueprint</span>
          <ArrowUpRight size={15} />
        </button>

      </div>
    </section>
  );
}