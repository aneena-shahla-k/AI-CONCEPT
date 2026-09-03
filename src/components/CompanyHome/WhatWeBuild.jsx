import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatWeBuild.css';
import img1 from "../../images/ecom.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    slug: "website-development",
    title: "Websites & Digital Platforms",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", // Web Mockup
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    items: [
      "Corporate Websites",
      "Landing Pages",
      "Web Applications",
      "Dashboards",
      "Membership Platforms"
    ]
  },
  {
    id: 2,
    slug: "e-commerce",
    title: "E-Commerce Solutions",
    image: img1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    items: [
      "Online Stores",
      "Marketplaces",
      "Inventory Systems",
      "Payment Systems",
      "Order Management"
    ]
  },
  {
    id: 3,
    slug: "app-development",
    title: "Mobile App Development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80", // Mobile UI
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    items: [
      "iOS Apps",
      "Android Apps",
      "Cross-platform Apps",
      "Customer Apps",
      "Business Apps"
    ]
  },
  {
    id: 4,
    slug: "booking-platforms",
    title: "Booking & Reservation Systems",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80", // Booking Calendar
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    items: [
      "Appointment Booking",
      "Hotel / Resort Booking",
      "Event Booking",
      "Scheduling",
      "Online Payments"
    ]
  },
  {
    id: 5,
    slug: "erp-solutions",
    title: "ERP & Business Management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", // ERP Dashboard
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      </svg>
    ),
    items: [
      "CRM",
      "HR & Payroll",
      "Inventory",
      "Accounting",
      "Reporting & BI"
    ]
  },
  {
    id: 6,
    slug: "custom-software",
    title: "Custom Software & Systems",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80", // Code / SaaS
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    items: [
      "Workflow Automation",
      "API Integrations",
      "Cloud Systems",
      "SaaS Platforms",
      "Enterprise Solutions"
    ]
  },
  {
    id: 7,
    slug: "ai-solutions",
    title: "AI Solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80", // AI Visualization
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4M8 15h.01M16 15h.01" />
      </svg>
    ),
    items: [
      "AI Chatbots",
      "AI Automation",
      "AI Agents",
      "AI Analytics",
      "AI Integrations"
    ]
  }
];

const WhatWeBuild = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const spotlight = card.querySelector('.build-card-spotlight');
    if (spotlight) {
      gsap.to(spotlight, {
        opacity: 1,
        x: x - 120,
        y: y - 120,
        duration: 0.15,
        ease: "power2.out"
      });
    }

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.3,
      ease: "power1.out"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const spotlight = card.querySelector('.build-card-spotlight');
    if (spotlight) {
      gsap.to(spotlight, {
        opacity: 0,
        duration: 0.3
      });
    }

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} className="build-section-wrapper">
      <div className="build-container">
        
        {/* Section Header */}
        <div className="build-header" data-aos="zoom-in-left">
          <h2 className="build-title">
            Complete Business Solutions.<br/> <span className="highlight-connected">All Connected.</span>
          </h2>
        </div>

        {/* Horizontal Cards Scroller */}
        <div className="build-cards-wrapper">
          <div className="build-cards-scroll">
            {services.map((service, idx) => (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="build-card"
              >
                {/* Soft Sky Blue Spotlight */}
                <div className="build-card-spotlight" data-aos="fade-up" />

                {/* Top Image Preview */}
                <div className="card-image-box">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="card-icon-overlay">
                    {service.icon}
                  </div>
                </div>

                <div className="card-inner" data-aos="fade-up">
                  <h3 className="card-title">{service.title}</h3>

                  <ul className="card-list">
                    {service.items.map((item, index) => (
                      <li key={index}>
                        <span className="bullet-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="card-link"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate("solution-detail", service.slug);
                      }
                    }}
                  >
                    Explore <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeBuild;