import React, { useState } from 'react';
import './IndustriesWeServe.css';

const industriesData = [
  {
    id: 'retail',
    title: 'Retail & Commerce',
    headline: 'Unified Omnichannel Commerce & Inventory',
    desc: 'Eliminating silos between in-store point-of-sale systems, online multi-vendor storefronts, and automated warehouse fulfillment.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '+140%', label: 'Order Processing Speed' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    solutions: ['E-Commerce Engines', 'Real-Time Inventory', 'Smart POS Systems', 'Customer CRM', 'Loyalty Automations']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    headline: 'Intelligent Patient Portals & Clinical Operations',
    desc: 'Connecting patient scheduling, secure health records, and AI-assisted triage workflows into a HIPAA-conscious ecosystem.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '99.9%', label: 'Uptime & Data Security' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    solutions: ['Appointment Booking', 'Patient Portals', 'Clinical EHR/CRM', 'AI Health Assistants', 'Telehealth Systems']
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Travel',
    headline: 'Direct Booking Engines & Guest Experience Hubs',
    desc: 'Empowering resorts, hotels, and dining chains to take back control from aggregator fees with custom direct-booking pipelines.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '0%', label: 'Aggregator Commission' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4" />
        <line x1="5" y1="21" x2="5" y2="10.85" />
        <line x1="19" y1="21" x2="19" y2="10.85" />
      </svg>
    ),
    solutions: ['Reservation Systems', 'Brand Portals & Apps', 'Guest Loyalty CRM', 'Staff Operations ERP', 'Dynamic Pricing AI']
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    headline: 'Scalable Learning Platforms & Campus ERP',
    desc: 'Modernizing student lifecycles from admissions and LMS digital delivery to institutional resource management.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '50k+', label: 'Concurrent Learners' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    solutions: ['Interactive LMS', 'Student Information ERP', 'Course Marketplaces', 'Automated Grading AI', 'Community Portals']
  },
  {
    id: 'services',
    title: 'Professional Services',
    headline: 'Automated Client Pipelines & Billing Infrastructure',
    desc: 'Building bespoke operations for legal, finance, and agency teams with turnkey appointment, billing, and document systems.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '3.5x', label: 'Billing Efficiency' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    solutions: ['Self-Serve Booking', 'Client Portal Dashboards', 'Automated Invoicing', 'Workflow Automation', 'Document Processing']
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    headline: 'Real-Time Dispatch & Telematics Engines',
    desc: 'End-to-end operational visibility connecting fleet mobile applications, dispatch hubs, and automated invoice clearance.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: 'Live', label: 'Fleet Telematics' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    solutions: ['Live Route Tracking', 'Fleet Dispatch Systems', 'Driver Mobile Apps', 'Warehouse Logistics', 'Supply Chain Analytics']
  },
  {
    id: 'realestate',
    title: 'Real Estate & PropTech',
    headline: 'High-Converting Property Engines & Lead Management',
    desc: 'Transforming property listings into direct transactional pipelines with CRM routing, virtual tour tech, and automated contracts.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '+65%', label: 'Lead-to-Tour Rate' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    solutions: ['Custom Listing Portals', 'Brokerage CRM Hubs', 'Tour Booking Engines', 'Contract Automation', 'Lead Routing AI']
  },
  {
    id: 'startups',
    title: 'Startups & Scaleups',
    headline: 'Rapid MVP Architecture & SaaS Infrastructure',
    desc: 'Engineering production-ready web and mobile products built to scale from Day 1 without accumulating crippling tech debt.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    metricBadge: { value: '4 Weeks', label: 'MVP Build Cycle' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    solutions: ['Full-Stack MVPs', 'Scalable SaaS Platforms', 'Native Mobile Apps', 'AI-First Architectures', 'Growth Dashboards']
  }
];

const IndustriesWeServe = () => {
  const [activeTab, setActiveTab] = useState(industriesData[0]);

  return (
    <section className="ind-section">
      <div className="ind-glow-bg" />

      <div className="ind-container">
        
        {/* Header Block */}
        <div className="ind-header">
          <div className="ind-tag-badge">
            <span className="ind-beacon" />
            <span>INDUSTRY APPLICATIONS</span>
          </div>

          <h2 className="ind-title">
            Where We Apply The Route.<br />
            <span className="ind-gradient-text">Built for Your Industry's Realities.</span>
          </h2>

          <p className="ind-lead">
            We don't build generic software. We engineer tailored operational pipelines 
            designed around the exact customer journey and revenue mechanics of your sector.
          </p>
        </div>

        {/* Master Content Layout */}
        <div className="ind-interactive-layout">
          
          {/* Left: Interactive Sector Selector */}
          <div className="ind-selector-col">
            {industriesData.map((ind) => (
              <button
                key={ind.id}
                className={`ind-tab-btn ${activeTab.id === ind.id ? 'active' : ''}`}
                onClick={() => setActiveTab(ind)}
              >
                <div className="tab-icon-box">{ind.icon}</div>
                <span className="tab-title">{ind.title}</span>
                <span className="tab-arrow">→</span>
              </button>
            ))}
          </div>

          {/* Right: Dynamic Showcase Spotlight Card with Image */}
          <div className="ind-display-col">
            <div className="ind-spotlight-card">
              
              {/* Media Preview Box with Floating Metric Badge */}
              <div className="spotlight-media-container">
                <img 
                  key={activeTab.id} 
                  src={activeTab.image} 
                  alt={activeTab.title} 
                  className="spotlight-preview-img" 
                />
                <div className="spotlight-img-overlay" />
                
                {/* Floating Metric Badge */}
                <div className="spotlight-floating-badge">
                  <span className="badge-metric-value">{activeTab.metricBadge.value}</span>
                  <span className="badge-metric-label">{activeTab.metricBadge.label}</span>
                </div>
              </div>

              {/* Card Meta & Header */}
              <div className="spotlight-body">
                <div className="spotlight-top">
                  <div className="spotlight-icon-ring">{activeTab.icon}</div>
                  <div>
                    <span className="spotlight-tag">{activeTab.title}</span>
                    <h3 className="spotlight-headline">{activeTab.headline}</h3>
                  </div>
                </div>

                <p className="spotlight-desc">{activeTab.desc}</p>

                <div className="spotlight-divider" />

                {/* Modules Grid */}
                <div className="spotlight-solutions-wrapper">
                  <span className="solutions-label">Connected Modules:</span>
                  <div className="solutions-chip-grid">
                    {activeTab.solutions.map((item, idx) => (
                      <div key={idx} className="solution-chip">
                        <span className="chip-dot" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="spotlight-footer">
                  <span className="spotlight-footer-note">Custom architecture configured around your workflow</span>
                  <a href="#contact" className="spotlight-cta">
                    Request Route <span>→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustriesWeServe;