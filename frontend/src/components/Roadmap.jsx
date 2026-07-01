import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Code, Laptop, CheckCircle, Database } from 'lucide-react';
import './Roadmap.css';

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
  {
    id: 1,
    date: 'Q1 2026',
    title: 'Project Inception',
    description: 'Defining the core architecture and finalizing the tech stack. Initializing the MERN environment with robust configurations.',
    icon: <Rocket size={24} />,
    position: 'left'
  },
  {
    id: 2,
    date: 'Q2 2026',
    title: 'Database Design',
    description: 'Structuring MongoDB collections, defining Mongoose schemas, and establishing relationships for optimal querying performance.',
    icon: <Database size={24} />,
    position: 'right'
  },
  {
    id: 3,
    date: 'Q3 2026',
    title: 'API Development',
    description: 'Building secure and scalable RESTful APIs using Express.js. Implementing JWT authentication and role-based access control.',
    icon: <Code size={24} />,
    position: 'left'
  },
  {
    id: 4,
    date: 'Q4 2026',
    title: 'Frontend Integration',
    description: 'Developing responsive UI components with React and Vite. Integrating GSAP for smooth, high-performance animations.',
    icon: <Laptop size={24} />,
    position: 'right'
  },
  {
    id: 5,
    date: 'Q1 2027',
    title: 'Launch & QA',
    description: 'Rigorous testing, performance profiling, and final deployment to production. Monitoring system health post-launch.',
    icon: <CheckCircle size={24} />,
    position: 'left'
  }
];

const Roadmap = () => {
  const roadmapRef = useRef(null);
  const progressRef = useRef(null);
  const itemsRef = useRef([]);
  itemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate the progress line
    gsap.to(progressRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: roadmapRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    // Animate each timeline item
    itemsRef.current.forEach((item, index) => {
      const isLeft = item.classList.contains('left');
      
      gsap.fromTo(item, 
        { 
          opacity: 0, 
          x: isLeft ? -100 : 100,
          y: 50
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Icon pop animation
      const icon = item.querySelector('.timeline-icon');
      gsap.fromTo(icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="roadmap-container" ref={roadmapRef}>
      <div className="roadmap-header">
        <h2 className="roadmap-title">Project Roadmap</h2>
        <p className="roadmap-subtitle">
          Follow our journey as we build out this platform phase by phase. 
          Scroll down to see the timeline unfold.
        </p>
      </div>

      <div className="timeline">
        <div className="timeline-progress" ref={progressRef}></div>
        
        {roadmapData.map((item) => (
          <div 
            key={item.id} 
            className={`timeline-item ${item.position}`}
            ref={addToRefs}
          >
            <div className="timeline-icon">
              {item.icon}
            </div>
            <div className="timeline-content">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
