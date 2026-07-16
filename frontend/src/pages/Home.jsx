import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Check, ChevronDown, ChevronUp, Star,
  Layers, Activity, BookOpen, Layout, HelpCircle,
  Terminal, Cpu, Shield, User, Sparkles, FolderOpen,
  Plus, UploadCloud, Search, CheckCircle2, Moon, Sun
} from 'lucide-react';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import './Home.css';

gsap.registerPlugin(Observer);

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 3D Wheel state to hold target DOM nodes for portals
  const [sectionNodes, setSectionNodes] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);

    // Add class to body to enforce non-scrolling
    document.body.classList.add('home-active');
    return () => {
      document.body.classList.remove('home-active');
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const partnerLogos = [
    { name: 'Vite', icon: <Terminal size={14} /> },
    { name: 'React', icon: <Cpu size={14} /> },
    { name: 'ReactFlow', icon: <Layers size={14} /> },
    { name: 'Tailwind', icon: <Layout size={14} /> },
    { name: 'Framer', icon: <Sparkles size={14} /> },
    { name: 'GitHub', icon: <Shield size={14} /> }
  ];

  const faqs = [
    {
      q: "What is TrashofCSE?",
      a: "TrashofCSE is an interactive syllabus tracking and resource sharing hub designed specifically for Computer Science students to organize notes, roadmaps, and previous semester solutions."
    },
    {
      q: "How does the interactive roadmap help me?",
      a: "Instead of browsing through unorganized drives, the roadmap structures topics logically. You can trace prerequisite chains, click nodes to view specific notes, and mark topics completed as you study."
    },
    {
      q: "Are the handwritten notes free?",
      a: "Yes, the core syllabus roadmaps and student-contributed notes are completely free to access. We also support semester plans for study groups to collaborate and share private resources."
    },
    {
      q: "Can I contribute notes?",
      a: "Absolutely! Registered students can upload notes or PDFs directly from their dashboard. Once verified by a moderator, your notes will be published in the Shared Resources Hub for everyone."
    }
  ];

  // ─── 3D ENGINE SETUP ───
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // We have 6 logical sections
    const TOTAL_SECTIONS = 6;
    const ANIM_SPEED = 0.8;
    const PERSPECTIVE_DEPTH = 1200;
    
    // Setup empty div nodes for portals
    const nodes = Array.from({ length: TOTAL_SECTIONS }).map(() => {
      const div = document.createElement('div');
      div.className = 'lp-wheel-section';
      return div;
    });
    setSectionNodes(nodes);

    const scene = new THREE.Scene();
    
    let fov = 2 * Math.atan((window.innerHeight / 2) / PERSPECTIVE_DEPTH) * (180 / Math.PI);
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = PERSPECTIVE_DEPTH;

    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    canvasRef.current.appendChild(renderer.domElement);

    const wheelGroup = new THREE.Group();
    scene.add(wheelGroup);

    const angleStep = (Math.PI * 2) / TOTAL_SECTIONS;
    let radius = (window.innerHeight / 2) / Math.tan(angleStep / 2);
    wheelGroup.position.z = -radius;

    nodes.forEach((node, i) => {
      const pivot = new THREE.Group();
      const object = new CSS3DObject(node);
      object.position.z = radius;
      pivot.add(object);
      pivot.rotation.x = -i * angleStep; 
      wheelGroup.add(pivot);

      if(i === 0) {
        gsap.set(node, { opacity: 1 });
        object.scale.set(1, 1, 1);
        node.style.pointerEvents = "auto";
      } else {
        gsap.set(node, { opacity: 0 });
        const scale = window.innerWidth < 768 ? 0.95 : 0.85;
        object.scale.set(scale, scale, scale);
        node.style.pointerEvents = "none";
      }
    });

    let currentIndex = 0;
    let isAnimating = false;

    function gotoSection(index) {
      if(isAnimating) return;
      if(index < 0 || index >= TOTAL_SECTIONS) return;
      
      isAnimating = true;
      currentIndex = index;
      
      const targetAngle = currentIndex * angleStep;
      
      gsap.to(wheelGroup.rotation, {
        x: targetAngle,
        duration: ANIM_SPEED,
        ease: "power2.inOut",
        onComplete: () => isAnimating = false
      });
      
      nodes.forEach((node, i) => {
        const object = wheelGroup.children[i].children[0];
        if(i === currentIndex) {
          node.style.pointerEvents = "auto";
          gsap.to(node, { opacity: 1, duration: ANIM_SPEED, ease: "power2.inOut" });
          gsap.to(object.scale, { x: 1, y: 1, z: 1, duration: ANIM_SPEED, ease: "power2.inOut" });
        } else {
          node.style.pointerEvents = "none";
          gsap.to(node, { opacity: 0, duration: ANIM_SPEED, ease: "power2.inOut" });
          const targetScale = window.innerWidth < 768 ? 0.95 : 0.85;
          gsap.to(object.scale, { x: targetScale, y: targetScale, z: targetScale, duration: ANIM_SPEED, ease: "power2.inOut" });
        }
      });
    }

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onDown: () => gotoSection(currentIndex + 1),
      onUp: () => gotoSection(currentIndex - 1),
      tolerance: 20,
      preventDefault: true
    });

    const handleKeydown = (e) => {
      if(e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        gotoSection(currentIndex + 1);
      }
      if(e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        gotoSection(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeydown);

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      let newFov = 2 * Math.atan((window.innerHeight / 2) / PERSPECTIVE_DEPTH) * (180 / Math.PI);
      camera.fov = newFov;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      radius = (window.innerHeight / 2) / Math.tan(angleStep / 2);
      wheelGroup.position.z = -radius;
      nodes.forEach((_, i) => {
        wheelGroup.children[i].children[0].position.z = radius; 
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.kill();
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ─── SECTIONS CONTENT ───
  
  const Section1 = (
    <>
      <section className="lp-hero-section" style={{ padding: '0', maxWidth: '1280px', margin: '0 auto', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="lp-hero-content">
          <div className="lp-badge">
            <Sparkles size={13} className="lp-sparkle-icon" />
            <span>Interactive syllabus tracking & note sharing hub</span>
          </div>
          <h1 className="lp-hero-title">
            YOUR NOTES,<br />
            <span>YOUR AUTHORITY.</span>
          </h1>
          <p className="lp-hero-subtitle">
            Create internal sharing networks for group studies. Manage your notes, previous year question solves, and interactive roadmaps, your way.
          </p>
          <div className="lp-hero-ctas">
            {isLoggedIn ? (
              <>
                <button className="lp-btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard <ArrowRight size={16} /></button>
                <button className="lp-btn-secondary" onClick={() => navigate('/compiler')}>Explore Portals</button>
              </>
            ) : (
              <>
                <button className="lp-btn-primary" onClick={() => navigate('/register')}>Start Sharing <ArrowRight size={16} /></button>
                <button className="lp-btn-secondary" onClick={() => navigate('/login')}>Log In</button>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="lp-partners-strip" style={{ marginTop: 'auto', marginBottom: '2rem' }}>
        <div className="lp-partners-label">POWERING YOUR SEMESTER RESOURCES WITH</div>
        <div className="lp-partners-list">
          {partnerLogos.map((logo, idx) => (
            <div key={idx} className="lp-partner-item">
              <span className="lp-partner-icon">{logo.icon}</span>
              <span className="lp-partner-name">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const Section2 = (
    <section id="features" className="lp-features-section" style={{ padding: '2rem' }}>
      <div className="lp-section-header">
        <span className="lp-section-tag">Features</span>
        <h2 className="lp-section-title">
          STRONG TOOLS,<br />
          <span>ENDLESS OPPORTUNITIES</span>
        </h2>
      </div>
      <div className="lp-features-grid">
        <div className="lp-feature-row">
          <div className="lp-feature-text-block">
            <h3>START YOUR OWN ASSET-SHARING PLATFORM</h3>
            <p>Build private study networks and tracking lists. Share homework assignments, class notes, and exam solves with other members of your study group.</p>
            <ul className="lp-feature-checklist">
              <li><Check size={14} /> Quick upload forms</li>
              <li><Check size={14} /> Moderation review queue</li>
            </ul>
          </div>
          <div className="lp-feature-visual-block">
             <div className="lp-form-mockup">
                <div className="lp-form-mockup-header"><UploadCloud size={18} /><span>Submit Note</span></div>
                <div className="lp-form-mockup-body">
                  <div className="lp-form-mockup-upload-zone"><Plus size={16} /><span>Upload Image</span></div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Section3 = (
    <section className="lp-testimonials-section" style={{ padding: '2rem' }}>
      <div className="lp-section-header">
        <span className="lp-section-tag">Testimonials</span>
        <h2 className="lp-section-title">
          HEAR FROM<br />
          <span>OUR SATISFIED CLIENTS</span>
        </h2>
      </div>
      <div className="lp-testimonials-grid">
        <div className="lp-testimonial-card highlighted">
          <div className="lp-stars">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="lp-star-filled" />)}
          </div>
          <p>"The handwritten notes inside Segment 04 saved me during midterms. Highly recommended!"</p>
          <div className="lp-testimonial-user">
            <div className="lp-avatar">FA</div>
            <div><h4>Fahim Ahmed</h4><span>CSE Student, UIU</span></div>
          </div>
        </div>
      </div>
    </section>
  );

  const Section4 = (
    <section id="pricing" className="lp-pricing-section" style={{ padding: '2rem' }}>
      <div className="lp-section-header">
        <span className="lp-section-tag">Pricing</span>
        <h2 className="lp-section-title">
          FLEXIBLE PLANS<br />
          <span>FOR EVERY SEMESTER</span>
        </h2>
      </div>
      <div className="lp-pricing-grid">
        <div className="lp-pricing-card highlighted">
          <div className="lp-price-badge">Most Popular</div>
          <div className="lp-price-header">
            <h3>Pro</h3>
            <p>For comprehensive exam prep</p>
          </div>
          <div className="lp-price-amount">
            <span className="num">$19</span>
            <span className="period">/semester</span>
          </div>
          <button className="lp-price-btn highlighted" onClick={() => navigate('/register')}>Get Pro</button>
        </div>
      </div>
    </section>
  );

  const Section5 = (
    <section id="faq" className="lp-faq-section" style={{ padding: '2rem', width: '100%', maxWidth: '800px' }}>
      <div className="lp-section-header">
        <span className="lp-section-tag">FAQ</span>
        <h2 className="lp-section-title">
          GET ANSWERS<br />
          <span>TO YOUR TOP QUESTIONS</span>
        </h2>
      </div>
      <div className="lp-faq-list">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`lp-faq-item ${activeFaq === idx ? 'active' : ''}`} onClick={() => toggleFaq(idx)}>
            <div className="lp-faq-question">
              <span>{faq.q}</span>
              {activeFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {activeFaq === idx && (
              <div className="lp-faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const Section6 = (
    <>
      <section className="lp-cta-card-section" style={{ padding: '2rem', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div className="lp-cta-card">
          <div className="lp-cta-card-glow"></div>
          <h2>GET YOUR AUTHORITY</h2>
          <p>Create internal sharing networks for group studies. Access handwritten notes and trace parsing steps dynamically today.</p>
          <button className="lp-cta-card-btn" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}>
            Start Sharing <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <footer className="lp-footer" style={{ marginTop: 'auto', width: '100%' }}>
        <div className="lp-footer-bottom">
          <p className="lp-copyright">© 2026 TrashofCSE. All rights reserved.</p>
          <div className="lp-footer-wordmark">TrashofCSE</div>
        </div>
      </footer>
    </>
  );

  const sectionsToRender = [Section1, Section2, Section3, Section4, Section5, Section6];

  return (
    <div className="lp-container">
      {/* Background Mesh Gradients remain under the CSS3DRenderer */}
      <div className="lp-mesh-container">
        <div className="lp-mesh-blob lp-blob-1"></div>
        <div className="lp-mesh-blob lp-blob-2"></div>
        <div className="lp-mesh-blob lp-blob-3"></div>
      </div>

      {/* 3D Wheel Container */}
      <div id="canvas-container" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10 }}></div>

      {/* Portals to inject React components into Three.js CSS3DObjects */}
      {sectionNodes.length === 6 && sectionsToRender.map((content, idx) => 
        createPortal(content, sectionNodes[idx])
      )}
    </div>
  );
};

export default Home;
