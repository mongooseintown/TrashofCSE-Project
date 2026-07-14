import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Check, ChevronDown, ChevronUp,
  Layers, Activity, BookOpen, Layout,
  Terminal, Cpu, Shield, User, Sparkles,
  GitBranch, FileCode, BarChart2, Zap, Star
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const techStack = [
    { name: 'Vite', icon: <Zap size={15} /> },
    { name: 'React', icon: <Cpu size={15} /> },
    { name: 'ReactFlow', icon: <Layers size={15} /> },
    { name: 'Node.js', icon: <Terminal size={15} /> },
    { name: 'MongoDB', icon: <Shield size={15} /> },
    { name: 'GitHub', icon: <GitBranch size={15} /> },
  ];

  const features = [
    {
      tag: 'Interactive Roadmap',
      headline: 'START YOUR OWN\nSTUDY ROADMAP',
      desc: 'Visualize your entire compiler design syllabus as an interactive node graph. Track completed topics, identify prerequisite chains, and never lose your place mid-semester.',
      icon: <Layout size={22} />,
      mockup: (
        <div className="feat-mockup roadmap-mock">
          <div className="rm-node rm-done"><Check size={12}/> Lexical Analysis</div>
          <div className="rm-line done"></div>
          <div className="rm-node rm-active"><span className="rm-dot"></span> Syntax Analysis</div>
          <div className="rm-line"></div>
          <div className="rm-node rm-pending">Semantic Analysis</div>
          <div className="rm-line"></div>
          <div className="rm-node rm-pending">Code Generation</div>
        </div>
      ),
    },
    {
      tag: 'Productivity Tools',
      headline: 'MAXIMIZE YOUR\nPRODUCTIVITY WITH\nINTEGRATED TOOLS',
      desc: 'Access handwritten diagrams, parsing tables, and LL(1)/LR(1) cheat sheets from directly within your study session. No more switching between tabs.',
      icon: <BarChart2 size={22} />,
      mockup: (
        <div className="feat-mockup tools-mock">
          <div className="tm-row"><FileCode size={14}/><span>LL(1) Parsing Table</span><span className="tm-badge">PDF</span></div>
          <div className="tm-row"><BookOpen size={14}/><span>Hand-drawn CFG Notes</span><span className="tm-badge">IMG</span></div>
          <div className="tm-row"><Activity size={14}/><span>Syntax Tree Diagram</span><span className="tm-badge">IMG</span></div>
          <div className="tm-row"><Layers size={14}/><span>Code Gen Cheat Sheet</span><span className="tm-badge">PDF</span></div>
        </div>
      ),
    },
    {
      tag: 'Progress Tracking',
      headline: 'CUSTOMIZE YOUR\nLEARNING WITH\nUNIQUE TRACKING',
      desc: 'Each topic node tracks your state — pending, in-progress, or completed. Visual coverage breakdowns show you exactly how exam-ready you are at any given time.',
      icon: <BarChart2 size={22} />,
      mockup: (
        <div className="feat-mockup progress-mock">
          <div className="pm-stat"><span className="pm-num">92%</span><span>Syllabus Coverage</span></div>
          <div className="pm-bars">
            <div className="pm-bar-row"><span>Parsing</span><div className="pm-bar"><div className="pm-fill" style={{width:'95%'}}></div></div><span>95%</span></div>
            <div className="pm-bar-row"><span>Code Gen</span><div className="pm-bar"><div className="pm-fill" style={{width:'80%'}}></div></div><span>80%</span></div>
            <div className="pm-bar-row"><span>Optimization</span><div className="pm-bar"><div className="pm-fill" style={{width:'60%'}}></div></div><span>60%</span></div>
          </div>
        </div>
      ),
    },
  ];

  const testimonials = [
    {
      text: '"The handwritten notes inside Segment 04 saved me during midterms. The visual parsing tables made predictive LL(1) tables so easy to build."',
      name: 'Fahim Ahmed',
      role: 'CSE Student, UIU',
      stars: 5,
    },
    {
      text: '"Code generation always felt like black magic until I saw the visual flow mapping stack allocation vs heap allocation. Absolutely recommended!"',
      name: 'Nusrat Jahan',
      role: 'SWE Major, NSU',
      stars: 5,
    },
    {
      text: '"TrashofCSE gave me a clear picture of the entire compiler pipeline. I went from confused to confident in just two weeks of using the roadmap."',
      name: 'Raihan Islam',
      role: 'CSE Student, IIUC',
      stars: 5,
    },
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$0',
      period: '/semester',
      desc: 'Access basic parsing and code generation roadmap tracking.',
      cta: 'Get Started Free',
      ctaAction: () => navigate('/register'),
      highlight: false,
      features: [
        { text: 'Access to segment roadmaps', ok: true },
        { text: 'Status tracking checkpoints', ok: true },
        { text: 'Desktop & Mobile flows', ok: true },
        { text: 'Handwritten class notes', ok: false },
        { text: 'Shared study dashboards', ok: false },
      ],
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/semester',
      desc: 'Full access to handwritten notes, parsing tables, and assembly rules.',
      cta: 'Get Started Pro',
      ctaAction: () => navigate('/register'),
      highlight: true,
      badge: 'Most Popular',
      features: [
        { text: 'Access to segment roadmaps', ok: true },
        { text: 'Status tracking checkpoints', ok: true },
        { text: 'Desktop & Mobile flows', ok: true },
        { text: 'High-res handwritten notes', ok: true },
        { text: 'Error recovery details', ok: true },
        { text: 'Shared study dashboards', ok: false },
      ],
    },
    {
      name: 'Study Group',
      price: '$39',
      period: '/semester',
      desc: 'Optimized for study groups and team compiler projects.',
      cta: 'Get Started Group',
      ctaAction: () => navigate('/register'),
      highlight: false,
      features: [
        { text: 'Access to segment roadmaps', ok: true },
        { text: 'Status tracking checkpoints', ok: true },
        { text: 'Desktop & Mobile flows', ok: true },
        { text: 'High-res handwritten notes', ok: true },
        { text: 'Shared team study folders', ok: true },
        { text: 'Custom checklist assignments', ok: true },
      ],
    },
  ];

  const faqs = [
    { q: 'What is TrashofCSE?', a: 'TrashofCSE is a visual compiler design syllabus roadmap tracking tool created to simplify complex computer science concepts through interactive flowcharts and handwritten diagrams.' },
    { q: 'How does the interactive roadmap help me?', a: 'Instead of reading text-heavy manuals, our roadmap structures topics like LL(1) Parsing and Code Generation in logical flows. You can view prerequisite nodes, mark topics completed, and click to open contextual handwritten details.' },
    { q: 'Are the handwritten notes free?', a: 'Yes — basic study roadmaps and conceptual notes are completely free. Pro and Study Group plans unlock detailed handwritten files and group study configurations.' },
    { q: 'Is there support for other CSE subjects?', a: 'Currently TrashofCSE covers Compiler Design, Computer Architecture, EEE, and System Analysis & Design. More subjects are planned for future releases.' },
  ];

  return (
    <div className="lp-root">

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero-glow glow-1"></div>
        <div className="lp-hero-glow glow-2"></div>

        <div className="lp-hero-inner">
          <div className="lp-hero-text">
            <div className="lp-badge">
              <Sparkles size={13} />
              <span>Interactive CSE Study Platform</span>
            </div>
            <h1 className="lp-hero-h1">
              <span className="lp-h1-line1">YOUR NOTES,</span>
              <span className="lp-h1-line2">YOUR EDGE.</span>
            </h1>
            <p className="lp-hero-sub">
              Visualize complex compiler design and computer science syllabi as interactive node graphs. Track, explore, and master — all in one place.
            </p>
            <div className="lp-hero-ctas">
              {isLoggedIn ? (
                <>
                  <button className="lp-btn-primary" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard <ArrowRight size={17} />
                  </button>
                  <button className="lp-btn-ghost" onClick={() => navigate('/compiler')}>
                    Explore Portal
                  </button>
                </>
              ) : (
                <>
                  <button className="lp-btn-primary" onClick={() => navigate('/register')}>
                    Get Started Free <ArrowRight size={17} />
                  </button>
                  <button className="lp-btn-ghost" onClick={() => navigate('/login')}>
                    Sign In
                  </button>
                </>
              )}
            </div>

            {/* Tech strip */}
            <div className="lp-tech-strip">
              <span className="lp-tech-label">BUILT WITH</span>
              {techStack.map((t, i) => (
                <div key={i} className="lp-tech-item">
                  {t.icon}
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — floating dashboard card */}
          <div className="lp-hero-visual">
            <div className="lp-hero-card">
              <div className="lhc-header">
                <div className="lhc-dots"><span></span><span></span><span></span></div>
                <span className="lhc-title">Compiler Roadmap — Segment 04</span>
              </div>
              <div className="lhc-body">
                <div className="lhc-node lhc-done"><Check size={11}/> Lexical Analysis</div>
                <div className="lhc-arrow">↓</div>
                <div className="lhc-node lhc-active"><span className="lhc-dot"></span> Syntax Analysis (Current)</div>
                <div className="lhc-arrow">↓</div>
                <div className="lhc-node lhc-lock">Semantic Analysis</div>
                <div className="lhc-arrow">↓</div>
                <div className="lhc-node lhc-lock">Intermediate Code Gen</div>
              </div>
              <div className="lhc-footer">
                <span className="lhc-progress-label">Progress</span>
                <div className="lhc-progress-bar"><div className="lhc-progress-fill" style={{width:'45%'}}></div></div>
                <span className="lhc-pct">45%</span>
              </div>
            </div>
            {/* Floating stat bubbles */}
            <div className="lp-bubble b1"><BarChart2 size={14}/><span>92% Coverage</span></div>
            <div className="lp-bubble b2"><Star size={14}/><span>Top Rated</span></div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER HEADING ──────────────────────────── */}
      <div className="lp-section-divider">
        <span className="lp-divider-label">Features</span>
        <h2 className="lp-divider-h2">
          <em>POWERFUL TOOLS.</em><br />ENDLESS POSSIBILITIES.
        </h2>
      </div>

      {/* ─── FEATURES — alternating rows ─────────────── */}
      <section id="features" className="lp-features">
        {features.map((feat, i) => (
          <div key={i} className={`lp-feat-row ${i % 2 === 1 ? 'lp-feat-row--reverse' : ''}`}>
            <div className="lp-feat-text">
              <span className="lp-feat-tag">{feat.tag}</span>
              <h3 className="lp-feat-h3">{feat.headline.split('\n').map((line, li) => <span key={li}>{line}<br/></span>)}</h3>
              <p className="lp-feat-desc">{feat.desc}</p>
            </div>
            <div className="lp-feat-visual">
              {feat.mockup}
            </div>
          </div>
        ))}
      </section>

      {/* ─── STATS BAND ───────────────────────────────── */}
      <div className="lp-stats-band">
        <div className="lp-stat"><span className="lp-stat-num">200%</span><span className="lp-stat-lbl">Syllabus Coverage</span></div>
        <div className="lp-stat-divider"></div>
        <div className="lp-stat"><span className="lp-stat-num">50+</span><span className="lp-stat-lbl">Concepts Mapped</span></div>
        <div className="lp-stat-divider"></div>
        <div className="lp-stat"><span className="lp-stat-num">100+</span><span className="lp-stat-lbl">Handwritten Diagrams</span></div>
        <div className="lp-stat-divider"></div>
        <div className="lp-stat"><span className="lp-stat-num">4</span><span className="lp-stat-lbl">CSE Courses</span></div>
      </div>

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="lp-testimonials">
        <div className="lp-section-divider" style={{paddingTop:0}}>
          <span className="lp-divider-label">Testimonials</span>
          <h2 className="lp-divider-h2">
            HEAR FROM<br /><em>OUR SATISFIED STUDENTS</em>
          </h2>
        </div>
        <div className="lp-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="lp-tcard">
              <div className="lp-tcard-stars">
                {Array.from({length: t.stars}).map((_, s) => <Star key={s} size={13} fill="white" stroke="white"/>)}
              </div>
              <p className="lp-tcard-text">{t.text}</p>
              <div className="lp-tcard-user">
                <div className="lp-tcard-avatar"><User size={16}/></div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────── */}
      <section id="pricing" className="lp-pricing">
        <div className="lp-section-divider" style={{paddingTop:0}}>
          <span className="lp-divider-label">Pricing</span>
          <h2 className="lp-divider-h2">FLEXIBLE PLANS<br /><em>FOR EVERY STUDENT</em></h2>
          <p className="lp-divider-sub">Choose the plan that suits your semester needs.</p>
        </div>
        <div className="lp-pricing-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`lp-pcard ${plan.highlight ? 'lp-pcard--highlight' : ''}`}>
              {plan.badge && <div className="lp-pcard-badge">{plan.badge}</div>}
              <div className="lp-pcard-name">{plan.name}</div>
              <div className="lp-pcard-price">
                <span className="lp-pcard-num">{plan.price}</span>
                <span className="lp-pcard-period">{plan.period}</span>
              </div>
              <p className="lp-pcard-desc">{plan.desc}</p>
              <button
                className={`lp-pcard-btn ${plan.highlight ? 'lp-pcard-btn--fill' : ''}`}
                onClick={plan.ctaAction}
              >
                {plan.cta}
              </button>
              <ul className="lp-pcard-features">
                {plan.features.map((f, fi) => (
                  <li key={fi} className={f.ok ? '' : 'lp-feat-disabled'}>
                    <Check size={14} /> {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section id="faq" className="lp-faq">
        <div className="lp-section-divider" style={{paddingTop:0}}>
          <span className="lp-divider-label">FAQ</span>
          <h2 className="lp-divider-h2">GET ANSWERS<br /><em>TO YOUR TOP QUESTIONS</em></h2>
        </div>
        <div className="lp-faq-list">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`lp-faq-item ${activeFaq === idx ? 'lp-faq-item--open' : ''}`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="lp-faq-q">
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
              </div>
              {activeFaq === idx && (
                <div className="lp-faq-a"><p>{faq.a}</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA BANNER ─────────────────────────── */}
      <section className="lp-cta-banner">
        <div className="lp-cta-glow"></div>
        <span className="lp-divider-label" style={{marginBottom:'1.2rem'}}>Start Today</span>
        <h2 className="lp-cta-h2">
          MASTER YOUR<br /><em>CSE SYLLABUS.</em>
        </h2>
        <p className="lp-cta-sub">Join students who use TrashofCSE to navigate complex topics with clarity and confidence.</p>
        <button className="lp-btn-primary lp-btn-lg" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}>
          {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'} <ArrowRight size={18} />
        </button>
      </section>

      {/* ─── FOOTER ───────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <Sparkles size={16} />
              <span>TrashofCSE</span>
            </div>
            <p>Simplifying complex computer science topics through interactive roadmap visualization.</p>
          </div>
          <div className="lp-footer-links">
            <div className="lp-footer-col">
              <h4>Pages</h4>
              <Link to="/compiler">Compiler Portal</Link>
              <Link to="/eee">EEE Portal</Link>
              <Link to="/login">Login</Link>
            </div>
            <div className="lp-footer-col">
              <h4>Resources</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="lp-footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Syllabus Disclaimer</a>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 TrashofCSE. All rights reserved.</span>
          <span className="lp-footer-wordmark">TrashofCSE</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
