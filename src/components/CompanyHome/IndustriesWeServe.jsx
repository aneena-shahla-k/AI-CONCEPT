import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './IndustriesWeServe.css';

const industriesData = [
  {
    id: 'retail',
    title: 'Retail & Commerce',
    subtitle: 'Omnichannel & POS Sync',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Patient Portals & EHR',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    subtitle: 'Direct Booking Engines',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'services',
    title: 'Professional Services',
    subtitle: 'Client Intake & Billing',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    subtitle: 'Fleet & Dispatch Telematics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    subtitle: 'Listing Portals & CRM',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
  }
];

export default function IndustriesWeServe({ onNavigate }) {
  return (
    <section className="ind-tile-section">
      <div className="ind-container">
        
        {/* Header */}
        <div className="ind-header" data-aos="fade-up">
          <h2 className="ind-title">Tailored for Your Industry's Realities</h2>
          
        </div>

        {/* Minimal Full-Bleed Image Tile Strip */}
        <div className="ind-tile-grid">
          {industriesData.map((item) => (
            <div 
              key={item.id} 
              className="ind-tile-card"
              onClick={() => onNavigate && onNavigate("industry-detail", item.id)}
            >
              {/* Background Image */}
              <img src={item.image} alt={item.title} className="ind-tile-img" loading="lazy" />
              
              {/* Glassmorphism Frosted Overlay on Hover */}
              <div className="ind-tile-overlay" />

              {/* Minimal Text Content */}
              <div className="ind-tile-content">
                <div>
                  <h3 className="ind-tile-title">{item.title}</h3>
                  <span className="ind-tile-sub">{item.subtitle}</span>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Bottom See More Button */}
        <div className="ind-action-row">
          <button 
            type="button" 
            className="ind-see-more-btn"
            onClick={() => onNavigate && onNavigate("industries")}
          >
            <span>Explore All Industries</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
