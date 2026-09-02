import React, { useEffect, useRef, useState } from 'react';
import './CoreConcept.css';

const CoreConcept = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "We Build\nthe Route",
      type: "start",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Strategy",
      type: "node",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Systems",
      type: "node",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Technology",
      type: "node",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Growth\nBlueprint",
      type: "node",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "You Drive\nthe Business",
      type: "end",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H7.5a1 1 0 0 0-.8.4L4 11l-5.16.86A1 1 0 0 0 2 12.85V16h3"/>
          <circle cx="6.5" cy="16.5" r="2.5"/>
          <circle cx="16.5" cy="16.5" r="2.5"/>
        </svg>
      )
    }
  ];

  return (
    <section className="core-concept-wrapper" ref={sectionRef}>
      <div className={`concept-card-container ${isVisible ? 'animated' : ''}`}>
        
        {/* Left Section Text */}
        <div className="concept-header">
          <span className="concept-tag">OUR CORE CONCEPT</span>
          <h2 className="concept-title">
            Your Concept
            Our Blueprint,<br />
            <span className="highlight-text">Your Execution.</span>
          </h2>
        </div>

        {/* Right Section Flow */}
        <div className="concept-flow">
          
          {/* Curved Connector SVG Path */}
          <svg className="connector-line" viewBox="0 0 600 100" preserveAspectRatio="none">
            <path 
              className="dash-path"
              d="M 40,50 Q 150,20 250,50 T 450,50 Q 520,70 560,50" 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6" 
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Moving Light Pulse Animation */}
          {/* {isVisible && <div className="moving-pulse-car"></div>} */}

          {/* Nodes List */}
          <div className="nodes-wrapper">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`node-item ${step.type}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="icon-ring">
                  <div className="icon-inner">
                    {step.icon}
                  </div>
                </div>
                <span className="node-label">
                  {step.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoreConcept;