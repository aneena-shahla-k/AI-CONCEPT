// ConnectedEcosystem.jsx
import React from 'react';
import './ConnectedEcosystem.css';

const ecosystemNodes = [
  { id: 1, title: 'Web Platform', tag: 'Acquisition', pos: 'node-web' },
  { id: 2, title: 'E-Com & Booking', tag: 'Transactions', pos: 'node-ecom' },
  { id: 3, title: 'CRM & ERP Core', tag: 'Operations', pos: 'node-core', center: true },
  { id: 4, title: 'Mobile Apps', tag: 'Retention', pos: 'node-app' },
  { id: 5, title: 'AI Automation', tag: 'Intelligence', pos: 'node-ai' },
  { id: 6, title: 'Analytics & BI', tag: 'Scaling', pos: 'node-analytics' }
];

// const stats = [
//   { value: '100%', label: 'Data Sync', sub: 'Zero fragmentation' },
//   { value: '1', label: 'Architecture', sub: 'Single source of truth' },
//   { value: '5x', label: 'Faster Scale', sub: 'Unified digital stack' }
// ];

const ConnectedEcosystem = () => {
  return (
    <section className="eco-section-wrapper">
      <div className="eco-glow-bg" />

      <div className="eco-container">
        
        {/* Left Column: Narrative & Metrics */}
        <div className="eco-left-col">
          <div className="eco-badge">
            <span className="badge-dot" />
            <span>CONNECTED INFRASTRUCTURE</span>
          </div>

          <h2 className="eco-title">
            One Business.<br />
            One Ecosystem.<br />
            <span className="eco-gradient-text">Everything Connected.</span>
          </h2>

          <p className="eco-description">
            Never buy five disconnected systems from five separate vendors. We architect 
            your digital infrastructure as a unified pipeline where customer actions, back-office 
            data, and autonomous AI seamlessly fuel one another.
          </p>

          {/* <div className="eco-stats-grid">
            {stats.map((s, idx) => (
              <div key={idx} className="eco-stat-card">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
                <span className="stat-sub">{s.sub}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Right Column: Dynamic Connected Hub Map */}
        <div className="eco-right-col">
          <div className="eco-hub-stage">

            {/* SVG Connecting Synapses */}
            <svg className="eco-svg-network" viewBox="0 0 500 420">
              <defs>
                <linearGradient id="linePulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Central Ray Lines */}
              <line x1="250" y1="210" x2="80" y2="70" className="network-path" />
              <line x1="250" y1="210" x2="420" y2="70" className="network-path" />
              <line x1="250" y1="210" x2="60" y2="330" className="network-path" />
              <line x1="250" y1="210" x2="440" y2="330" className="network-path" />
              <line x1="250" y1="210" x2="250" y2="40" className="network-path" />
              
              {/* Outer Orbit Path */}
              <ellipse cx="250" cy="210" rx="190" ry="140" className="orbit-path" />
            </svg>

            {/* Node Items */}
            {ecosystemNodes.map((node) => (
              <div 
                key={node.id} 
                className={`hub-node-card ${node.pos} ${node.center ? 'center-hub' : ''}`}
              >
                <div className="node-beacon" />
                <div className="node-content">
                  <span className="node-tag">{node.tag}</span>
                  <span className="node-heading">{node.title}</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default ConnectedEcosystem;