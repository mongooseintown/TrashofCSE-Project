import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Play, Check, Star, 
  Layers, Activity, BookOpen, ChevronDown, 
  ShieldAlert, Layout, HelpCircle, Sun, Moon 
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const partnerLogos = [
    { name: 'Vite', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'ReactFlow', icon: '🔗' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Framer', icon: '✨' },
    { name: 'GitHub', icon: '🐙' }
  ];

  const faqs = [
    {
      q: "What is TrashofCSE?",
      a: "TrashofCSE is a visual compilation design syllabus roadmap tracking tool created to simplify complex computer science concepts, specifically Compiler Design (Segments 04 & 08), through interactive flowcharts and custom handwritten diagrams."
    },
    {
      q: "How does the interactive roadmap help me?",
      a: "Instead of reading text-heavy compiler manuals, our roadmap structures topics like LL(1) Parsing and Code Generation in logical flows. You can view pre-requisite nodes, mark topics as completed, and click them to open contextual handwritten details."
    },
    {
      q: "Are the handwritten notes free?",
      a: "Yes, the basic study roadmaps and conceptual notes are completely free. We also outline semester and pro plans for detailed compiler assignments and group study configurations."
    },
    {
      q: "Is there support for other CSE subjects?",
      a: "Currently, TrashofCSE covers Compiler Design Segment 04 and Segment 08 in depth. We plan to expand to Operating Systems and Theory of Computation roadmaps in future releases."
    }
  ];

  return (
    <div className="landing-container">
      {/* 1. Header Navigation */}
      <header className="landing-header">
        <div className="header-logo" onClick={() => navigate('/')}>
          <div className="logo-sparkle">✦</div>
          <span>TrashofCSE</span>
        </div>
        <nav className="header-nav">
          <a href="#features">Features</a>
          <a href="#achievements">Benefits</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <button className="btn-theme-toggle" onClick={toggleTheme} title="Toggle Mode">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="btn-signin">Sign in</Link>
          <Link to="/compilersegment-04" className="btn-signup">Get Started</Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span>Compiler Visualization just arrived!</span>
          </div>
          
          <h1 className="hero-title">
            Boost your <br />
            compiler grades.
          </h1>
          
          <p className="hero-subtitle">
            Interactive syllabus tracking map for computer science students. Visualize parsing algorithms, target machine representations, and code generation steps effortlessly.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => navigate('/compilersegment-04')}>
              Explore Segment 04 <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/compilersegment-08')}>
              <Play size={16} fill="currentColor" />
              Watch Demo (Segment 08)
            </button>
          </div>

          <div className="hero-partners">
            <p className="partners-label">POWERED & TRUSTED BY</p>
            <div className="partners-list">
              {partnerLogos.map((logo, idx) => (
                <div key={idx} className="partner-item">
                  <span className="partner-icon">{logo.icon}</span>
                  <span className="partner-name">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-graphic-container">
          <div className="sparkle-canvas">
            {/* Sparkle shapes matching the SEO Talos image outline design */}
            <div className="star-large star-glow-animation">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C50 27.6142 38.8071 50 11.1929 50C38.8071 50 50 72.3858 50 100C50 72.3858 61.1929 50 88.8071 50C61.1929 50 50 27.6142 50 0Z" fill="white" />
              </svg>
            </div>
            <div className="star-medium star-glow-animation delay-1">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C50 27.6142 38.8071 50 11.1929 50C38.8071 50 50 72.3858 50 100C50 72.3858 61.1929 50 88.8071 50C61.1929 50 50 27.6142 50 0Z" fill="white" />
              </svg>
            </div>
            <div className="star-small star-glow-animation delay-2">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C50 27.6142 38.8071 50 11.1929 50C38.8071 50 50 72.3858 50 100C50 72.3858 61.1929 50 88.8071 50C61.1929 50 50 27.6142 50 0Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature Section 1 */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Syllabus Tool That Delivers Real Results</h2>
          <p className="section-subtitle">Our precise interactive maps allow you to track your syllabus dynamically and study through detailed handwritten lecture assets.</p>
        </div>

        <div className="features-grid">
          {/* Top Row */}
          <div className="grid-row-top">
            <div className="feature-card glass-card card-half">
              <div className="card-badge">Concept Flow Chart</div>
              <div className="card-flow-mockup">
                <div className="flow-node completed">
                  <Check size={14} />
                  <span>LL(1) parsing</span>
                </div>
                <div className="flow-line completed"></div>
                <div className="flow-node active">
                  <span className="active-dot"></span>
                  <span>Code Gen</span>
                </div>
                <div className="flow-line"></div>
                <div className="flow-node pending">
                  <span>Code Opt</span>
                </div>
              </div>
              <h3>Prerequisite Flow Tracking</h3>
              <p>Easily identify which parsing chapters are required before entering Code Generation blocks.</p>
            </div>

            <div className="feature-card glass-card card-half">
              <div className="card-badge">Progress Coverage</div>
              <div className="card-coverage-stats">
                <div className="coverage-circle">
                  <div className="circle-inner">92%</div>
                </div>
                <div className="coverage-details">
                  <div className="stat-row">
                    <span className="bullet green"></span>
                    <span>Done: 11 Topics</span>
                  </div>
                  <div className="stat-row">
                    <span className="bullet red"></span>
                    <span>Pending: 4 Topics</span>
                  </div>
                  <div className="stat-row">
                    <span className="bullet gray"></span>
                    <span>Unopened: 2 Topics</span>
                  </div>
                </div>
              </div>
              <h3>Syllabus Coverage Breakdown</h3>
              <p>Keep track of how much of the syllabus you have mastered with direct visual status reports.</p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid-row-bottom">
            <div className="feature-card glass-card card-two-thirds">
              <div className="card-badge">Roadmap Engine</div>
              <div className="roadmap-preview">
                <div className="roadmap-mock-node node-lr">
                  <Layout size={18} />
                  <span>ReactFlow Graph Engine</span>
                </div>
                <div className="roadmap-mock-connect"></div>
                <div className="roadmap-mock-node node-tb">
                  <Layers size={18} />
                  <span>Vertical Mobile Flow Rotation</span>
                </div>
              </div>
              <h3>Interactive ReactFlow Graph Visuals</h3>
              <p>Navigate complex compiler trees with responsive Left-to-Right layout on Desktop, and automated mathematical coordinate 90-degree rotations for Mobile.</p>
            </div>

            <div className="feature-card glass-card card-one-third">
              <div className="card-badge">Retention Metrics</div>
              <div className="retention-chart-container">
                <div className="retention-score">
                  <Activity size={24} className="score-icon" />
                  <span>+152%</span>
                </div>
                <svg className="retention-line-chart" viewBox="0 0 100 40">
                  <path d="M0,35 C20,32 30,10 50,15 C70,20 80,2 100,5" fill="none" stroke="#4ade80" strokeWidth="3" />
                  <path d="M0,35 C20,32 30,10 50,15 C70,20 80,2 100,5 L100,40 L0,40 Z" fill="url(#chart-glow)" opacity="0.15" />
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3>Topic Memory Retention</h3>
              <p>Visual mappings improve structure recognition, making parsing and assembly rules easier to recall during exams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Achievements Section */}
      <section id="achievements" className="achievements-section">
        <div className="achievements-content">
          <span className="section-tag">Our Achievements</span>
          <h2 className="section-title">Proven Study Mappings You Can Trust</h2>
          <p className="section-subtitle">
            TrashofCSE structures theoretical content into organized graphic nodes so you never get lost in long textbooks.
          </p>
        </div>

        <div className="achievements-cards-container">
          <div className="achievement-stack">
            <div className="achievement-card ac-1">
              <div className="ac-title">200%</div>
              <div className="ac-desc">Syllabus Coverage</div>
              <div className="ac-tag">Concept Clarity</div>
            </div>
            <div className="achievement-card ac-2">
              <div className="ac-title">50+</div>
              <div className="ac-desc">Concepts Mapped</div>
              <div className="ac-tag">Compiler Steps</div>
            </div>
            <div className="achievement-card ac-3">
              <div className="ac-title">100+</div>
              <div className="ac-desc">Handwritten Diagrams</div>
              <div className="ac-tag">Detailed Notes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <span className="section-tag">Pricing</span>
          <h2 className="section-title">Flexible Plans for Every Student</h2>
          <p className="section-subtitle">Choose the plan that suits your semester needs. Access roadmaps, hand notes, and shared class folders.</p>
        </div>

        <div className="pricing-grid">
          {/* Plan 1 */}
          <div className="pricing-card glass-card">
            <div className="plan-name">Basic</div>
            <div className="plan-price">
              <span className="price-num">$0</span>
              <span className="price-period">/semester</span>
            </div>
            <p className="plan-desc">Access basic parsing and code generation roadmap tracking.</p>
            <button className="btn-plan-cta" onClick={() => navigate('/compilersegment-04')}>Start Free Trial</button>
            <ul className="plan-features">
              <li><Check size={16} /> Access to segment roadmaps</li>
              <li><Check size={16} /> Status tracking checkpoints</li>
              <li><Check size={16} /> Desktop & Mobile layout flows</li>
              <li className="disabled"><Check size={16} /> Handwritten class note files</li>
              <li className="disabled"><Check size={16} /> Shared study group dashboards</li>
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="pricing-card glass-card premium-plan">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">
              <span className="price-num">$19</span>
              <span className="price-period">/semester</span>
            </div>
            <p className="plan-desc">Full access to handwritten notes, parsing tables, and assembly rules.</p>
            <button className="btn-plan-cta active" onClick={() => navigate('/compilersegment-08')}>Get Started Pro</button>
            <ul className="plan-features">
              <li><Check size={16} /> Access to segment roadmaps</li>
              <li><Check size={16} /> Status tracking checkpoints</li>
              <li><Check size={16} /> Desktop & Mobile layout flows</li>
              <li><Check size={16} /> High-res handwritten class notes</li>
              <li><Check size={16} /> Error recovery details</li>
              <li className="disabled"><Check size={16} /> Shared study group dashboards</li>
            </ul>
          </div>

          {/* Plan 3 */}
          <div className="pricing-card glass-card">
            <div className="plan-name">Study Group</div>
            <div className="plan-price">
              <span className="price-num">$39</span>
              <span className="price-period">/semester</span>
            </div>
            <p className="plan-desc">Optimized for study groups and team compiler projects.</p>
            <button className="btn-plan-cta" onClick={() => navigate('/login')}>Get Started Group</button>
            <ul className="plan-features">
              <li><Check size={16} /> Access to segment roadmaps</li>
              <li><Check size={16} /> Status tracking checkpoints</li>
              <li><Check size={16} /> Desktop & Mobile layout flows</li>
              <li><Check size={16} /> High-res handwritten class notes</li>
              <li><Check size={16} /> Shared team study folders</li>
              <li><Check size={16} /> Custom checklist assignments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Testimonial Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">What Students Say About Us</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card glass-card">
            <p className="testimonial-text">
              "The handwritten notes inside Segment 04 saved me during midterms. The visual parsing tables made predictive LL(1) tables so easy to build."
            </p>
            <div className="testimonial-user">
              <span className="user-avatar">🎓</span>
              <div>
                <h4>Fahim Ahmed</h4>
                <span>CSE Student, UIU</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-card">
            <p className="testimonial-text">
              "Code generation always felt like black magic until I saw the visual flow mapping stack allocation vs heap allocation. Absolutely recommended!"
            </p>
            <div className="testimonial-user">
              <span className="user-avatar">🎓</span>
              <div>
                <h4>Nusrat Jahan</h4>
                <span>SWE Major, NSU</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="section-header">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Your Questions Answered</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`} onClick={() => toggleFaq(idx)}>
              <div className="faq-question">
                <span>{faq.q}</span>
                <ChevronDown size={20} className="faq-arrow" />
              </div>
              {activeFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Footer Section */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="header-logo">
              <div className="logo-sparkle">✦</div>
              <span>TrashofCSE</span>
            </div>
            <p>Simplifying complex computer science topics through interactive roadmap visualization.</p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Pages</h4>
              <Link to="/compilersegment-04">Roadmap Segment 04</Link>
              <Link to="/compilersegment-08">Roadmap Segment 08</Link>
              <Link to="/login">Login Portal</Link>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing Plans</a>
              <a href="#faq">Frequently Asked</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Syllabus Disclaimer</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 TrashofCSE. All rights reserved.</p>
          <div className="footer-big-logo">TrashofCSE</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
