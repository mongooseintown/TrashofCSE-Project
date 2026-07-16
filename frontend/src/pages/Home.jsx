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

    // WebGL Scene and Renderer (rendered behind the glass cards)
    const webglScene = new THREE.Scene();
    const webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    webglRenderer.domElement.style.position = 'absolute';
    webglRenderer.domElement.style.top = '0';
    webglRenderer.domElement.style.left = '0';
    webglRenderer.domElement.style.zIndex = '0';
    webglRenderer.domElement.style.pointerEvents = 'none';
    canvasRef.current.appendChild(webglRenderer.domElement);

    // CSS3D Renderer (foreground cards)
    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';
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

    // ─── PROCEDURAL 3D MESH/NETWORK GRAPH GENERATION ───
    const spherePositions = [];
    const gridPositions = [];
    const torusPositions = [];
    const helixPositions = [];
    const galaxyPositions = [];
    const pyramidPositions = [];
    const nodeCount = 150;

    for (let i = 0; i < nodeCount; i++) {
      // 1. Sphere shape (Hero)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 260;
      spherePositions.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi)
      });

      // 2. Planar/Roadmap grid shape (Features)
      gridPositions.push({
        x: ((i % 12) - 6) * 55,
        y: (Math.floor(i / 12) % 12 - 6) * 55,
        z: (Math.floor(i / 144) - 0.5) * 120
      });

      // 3. Torus shape (Testimonials)
      const torusTheta = (i / nodeCount) * Math.PI * 2;
      const torusPhi = Math.random() * Math.PI * 2;
      const torusR = 280;
      const torusr = 70;
      torusPositions.push({
        x: (torusR + torusr * Math.cos(torusPhi)) * Math.cos(torusTheta),
        y: (torusR + torusr * Math.cos(torusPhi)) * Math.sin(torusTheta),
        z: torusr * Math.sin(torusPhi)
      });

      // 4. Helix shape (Pricing)
      const helixAngle = 0.22 * i;
      helixPositions.push({
        x: 130 * Math.cos(helixAngle),
        y: 3.6 * i - 270,
        z: 130 * Math.sin(helixAngle)
      });

      // 5. Galaxy shape (FAQ)
      const galR = Math.random() * 450 + 60;
      const galTheta = Math.random() * Math.PI * 2;
      galaxyPositions.push({
        x: galR * Math.cos(galTheta),
        y: (Math.random() - 0.5) * 120,
        z: galR * Math.sin(galTheta)
      });

      // 6. Pyramidal node cluster (Footer)
      const level = Math.floor(i / 30);
      const levelHeight = (level - 2.5) * 100;
      const levelRadius = (5 - level) * 60;
      const pyrAngle = (i % 30) * (Math.PI * 2 / 30);
      pyramidPositions.push({
        x: levelRadius * Math.cos(pyrAngle),
        y: levelHeight,
        z: levelRadius * Math.sin(pyrAngle)
      });
    }

    const shapes = [
      spherePositions,
      gridPositions,
      torusPositions,
      helixPositions,
      galaxyPositions,
      pyramidPositions
    ];

    const currentPositions = [];
    for (let i = 0; i < nodeCount; i++) {
      currentPositions.push({
        x: spherePositions[i].x,
        y: spherePositions[i].y,
        z: spherePositions[i].z
      });
    }

    const pointsGeometry = new THREE.BufferGeometry();
    const positionsArray = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      positionsArray[i * 3] = currentPositions[i].x;
      positionsArray[i * 3 + 1] = currentPositions[i].y;
      positionsArray[i * 3 + 2] = currentPositions[i].z;
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 91, 34, 0.8)');
      grad.addColorStop(0.5, 'rgba(255, 91, 34, 0.15)');
      grad.addColorStop(1, 'rgba(255, 91, 34, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const pointsMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 16 : 24,
      map: createGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);

    const totalLines = nodeCount * 2;
    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = new Float32Array(totalLines * 2 * 3);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xff5b22,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);

    const webglGroup = new THREE.Group();
    webglGroup.add(pointsMesh);
    webglGroup.add(linesMesh);
    webglScene.add(webglGroup);

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

      // Animate WebGL Group slightly in space
      gsap.to(webglGroup.rotation, {
        y: index * 0.4,
        x: index * 0.2,
        duration: ANIM_SPEED + 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });

      // Morph 3D network shape to match current section theme
      const targetShape = shapes[currentIndex];
      currentPositions.forEach((pos, i) => {
        gsap.to(pos, {
          x: targetShape[i].x,
          y: targetShape[i].y,
          z: targetShape[i].z,
          duration: ANIM_SPEED + 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
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

      // WebGL Geometry Vertex Updates for points
      const posAttr = pointsGeometry.getAttribute('position');
      const posArray = posAttr.array;
      for (let i = 0; i < nodeCount; i++) {
        posArray[i * 3] = currentPositions[i].x;
        posArray[i * 3 + 1] = currentPositions[i].y;
        posArray[i * 3 + 2] = currentPositions[i].z;
      }
      posAttr.needsUpdate = true;

      // WebGL Geometry Vertex Updates for lines
      const linePosAttr = linesGeometry.getAttribute('position');
      const linePosArray = linePosAttr.array;
      let lineIdx = 0;
      for (let i = 0; i < nodeCount; i++) {
        const p1 = currentPositions[i];
        const p2 = currentPositions[(i + 1) % nodeCount];
        linePosArray[lineIdx++] = p1.x;
        linePosArray[lineIdx++] = p1.y;
        linePosArray[lineIdx++] = p1.z;
        linePosArray[lineIdx++] = p2.x;
        linePosArray[lineIdx++] = p2.y;
        linePosArray[lineIdx++] = p2.z;

        const p3 = currentPositions[(i + 3) % nodeCount];
        linePosArray[lineIdx++] = p1.x;
        linePosArray[lineIdx++] = p1.y;
        linePosArray[lineIdx++] = p1.z;
        linePosArray[lineIdx++] = p3.x;
        linePosArray[lineIdx++] = p3.y;
        linePosArray[lineIdx++] = p3.z;
      }
      linePosAttr.needsUpdate = true;

      // Slow continuous floating rotations
      webglGroup.rotation.y += 0.0015;
      webglGroup.rotation.x += 0.0007;

      renderer.render(scene, camera);
      webglRenderer.render(webglScene, camera);
    }
    animate();

    const handleResize = () => {
      let newFov = 2 * Math.atan((window.innerHeight / 2) / PERSPECTIVE_DEPTH) * (180 / Math.PI);
      camera.fov = newFov;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      webglRenderer.setSize(window.innerWidth, window.innerHeight);
      webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
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
      if (canvasRef.current) {
        if (canvasRef.current.contains(renderer.domElement)) {
          canvasRef.current.removeChild(renderer.domElement);
        }
        if (canvasRef.current.contains(webglRenderer.domElement)) {
          canvasRef.current.removeChild(webglRenderer.domElement);
        }
      }
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      webglRenderer.dispose();
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
