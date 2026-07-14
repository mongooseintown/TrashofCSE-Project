import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Check, ChevronDown, ChevronUp, Star,
  Layers, Activity, BookOpen, Layout, HelpCircle,
  Terminal, Cpu, Shield, User, Sparkles, FolderOpen,
  Plus, UploadCloud, Search, CheckCircle2, Moon, Sun
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
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

  return (
    <div className="lp-container">
      {/* Background Mesh Gradients (Monochrome) */}
      <div className="lp-mesh-container">
        <div className="lp-mesh-blob lp-blob-1"></div>
        <div className="lp-mesh-blob lp-blob-2"></div>
        <div className="lp-mesh-blob lp-blob-3"></div>
      </div>

      {/* ─── 1. HERO SECTION ─── */}
      <section className="lp-hero-section">
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
                <button className="lp-btn-primary" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard <ArrowRight size={16} />
                </button>
                <button className="lp-btn-secondary" onClick={() => navigate('/compiler')}>
                  Explore Portals
                </button>
              </>
            ) : (
              <>
                <button className="lp-btn-primary" onClick={() => navigate('/register')}>
                  Start Sharing <ArrowRight size={16} />
                </button>
                <button className="lp-btn-secondary" onClick={() => navigate('/login')}>
                  Log In
                </button>
              </>
            )}
          </div>
        </div>

        {/* Hero visual card - Detailed dashboard mockup from the image */}
        <div className="lp-hero-mockup-wrapper">
          <div className="lp-dashboard-mockup">
            <div className="lp-mock-sidebar">
              <div className="lp-mock-brand">
                <div className="lp-mock-logo-dot"></div>
                <span>TrashofCSE</span>
              </div>
              <div className="lp-mock-menu-item active">
                <Layout size={12} /> <span>Dashboard</span>
              </div>
              <div className="lp-mock-menu-item">
                <Activity size={12} /> <span>Feed</span>
              </div>
              <div className="lp-mock-menu-item">
                <User size={12} /> <span>Profile</span>
              </div>
            </div>
            
            <div className="lp-mock-main">
              <div className="lp-mock-main-header">
                <span className="lp-mock-user-name">Khaled Bin Nasir</span>
                <span className="lp-mock-badge">Moderator</span>
              </div>

              {/* Folder list matching the image */}
              <div className="lp-mock-folders">
                <div className="lp-mock-folder-card">
                  <div className="lp-mock-folder-icon">📂</div>
                  <h4>EEE Notes</h4>
                  <span>14 Files</span>
                </div>
                <div className="lp-mock-folder-card highlighted">
                  <div className="lp-mock-folder-icon">📂</div>
                  <h4>Compiler Solutions</h4>
                  <span>28 Files</span>
                </div>
                <div className="lp-mock-folder-card">
                  <div className="lp-mock-folder-icon">📂</div>
                  <h4>CA Handnotes</h4>
                  <span>18 Files</span>
                </div>
              </div>

              {/* Bottom activity stats */}
              <div className="lp-mock-activity">
                <div className="lp-mock-activity-header">
                  <span>Recent Approved Notes</span>
                  <span>View All</span>
                </div>
                <div className="lp-mock-activity-row">
                  <span className="lp-mock-activity-bullet"></span>
                  <span className="lp-mock-activity-text">CSE-3527 Segment 04 - LL(1) Parsing Table.pdf</span>
                  <span className="lp-mock-activity-time">2m ago</span>
                </div>
                <div className="lp-mock-activity-row">
                  <span className="lp-mock-activity-bullet"></span>
                  <span className="lp-mock-activity-text">EEE-2421 Segment 08 - RTD Math Solve.jpg</span>
                  <span className="lp-mock-activity-time">10m ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTNER LOGOS STRIP ─── */}
      <section className="lp-partners-strip">
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

      {/* ─── 2. FEATURES SECTION ─── */}
      <section id="features" className="lp-features-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">Features</span>
          <h2 className="lp-section-title">
            STRONG TOOLS,<br />
            <span>ENDLESS OPPORTUNITIES</span>
          </h2>
        </div>

        {/* Feature Grid with alternating detailed mockups */}
        <div className="lp-features-grid">
          
          {/* Feature 1 */}
          <div className="lp-feature-row">
            <div className="lp-feature-text-block">
              <h3>START YOUR OWN ASSET-SHARING PLATFORM</h3>
              <p>
                Build private study networks and tracking lists. Share homework assignments, class notes, and exam solves with other members of your study group.
              </p>
              <ul className="lp-feature-checklist">
                <li><Check size={14} /> Quick upload forms</li>
                <li><Check size={14} /> Moderation review queue</li>
                <li><Check size={14} /> Dynamic updates feed</li>
              </ul>
              <button className="lp-feature-btn" onClick={() => navigate('/register')}>Get Started</button>
            </div>
            
            <div className="lp-feature-visual-block">
              {/* Mockup of note upload form card */}
              <div className="lp-form-mockup">
                <div className="lp-form-mockup-header">
                  <UploadCloud size={18} />
                  <span>Submit Academic Note</span>
                </div>
                <div className="lp-form-mockup-body">
                  <div className="lp-form-mockup-field">
                    <label>Select Course</label>
                    <div className="lp-form-mockup-input select">Compiler Design (CSE-3527)</div>
                  </div>
                  <div className="lp-form-mockup-field">
                    <label>Document Title</label>
                    <div className="lp-form-mockup-input">LL(1) First & Follow calculation rules</div>
                  </div>
                  <div className="lp-form-mockup-upload-zone">
                    <Plus size={16} />
                    <span>Upload Images or PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="lp-feature-row lp-reverse">
            <div className="lp-feature-text-block">
              <h3>MAXIMIZE YOUR PRODUCTIVITY WITH INTEGRATED TOOLS</h3>
              <p>
                Access student contributions, handwritten diagrams, and syllabus checkpoints directly from within the interactive visual map layout.
              </p>
              <ul className="lp-feature-checklist">
                <li><Check size={14} /> Interactive ReactFlow canvas</li>
                <li><Check size={14} /> Direct popup notes view</li>
                <li><Check size={14} /> Checkpoint progress tracking</li>
              </ul>
              <button className="lp-feature-btn" onClick={() => navigate('/compiler')}>View Maps</button>
            </div>

            <div className="lp-feature-visual-block">
              {/* Mockup of circular wheel layout matching the reference image */}
              <div className="lp-wheel-mockup">
                <div className="lp-wheel-center">
                  <Sparkles size={20} />
                </div>
                <div className="lp-wheel-node n1"><Terminal size={14} /></div>
                <div className="lp-wheel-node n2"><Cpu size={14} /></div>
                <div className="lp-wheel-node n3"><Layers size={14} /></div>
                <div className="lp-wheel-node n4"><Layout size={14} /></div>
                <div className="lp-wheel-node n5"><BookOpen size={14} /></div>
                <div className="lp-wheel-node n6"><Shield size={14} /></div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="lp-feature-row">
            <div className="lp-feature-text-block">
              <h3>CUSTOMIZE YOUR PLATFORM WITH UNIQUE BRANDING</h3>
              <p>
                Filter shared resources by course, segment, and exam term. Locate high-quality notes compiled specifically for UIU and other major syllabus outlines.
              </p>
              <ul className="lp-feature-checklist">
                <li><Check size={14} /> Filter by course code</li>
                <li><Check size={14} /> Filter by segment number</li>
                <li><Check size={14} /> Search title & descriptions</li>
              </ul>
              <button className="lp-feature-btn" onClick={() => navigate('/dashboard')}>Go to Hub</button>
            </div>

            <div className="lp-feature-visual-block">
              {/* Mockup of filter control widgets */}
              <div className="lp-filter-mockup">
                <div className="lp-filter-mockup-search">
                  <Search size={14} />
                  <span>Search resources...</span>
                </div>
                <div className="lp-filter-mockup-row">
                  <div className="lp-filter-mockup-badge active">All Courses</div>
                  <div className="lp-filter-mockup-badge">EEE-2421</div>
                  <div className="lp-filter-mockup-badge">CSE-3527</div>
                </div>
                <div className="lp-filter-mockup-toggle-bar">
                  <span>Include Handwritten PDF</span>
                  <div className="lp-filter-mockup-toggle active"><div className="lp-toggle-circle"></div></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. TESTIMONIALS SECTION ─── */}
      <section className="lp-testimonials-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">Testimonials</span>
          <h2 className="lp-section-title">
            HEAR FROM<br />
            <span>OUR SATISFIED CLIENTS</span>
          </h2>
        </div>

        <div className="lp-testimonials-grid">
          <div className="lp-testimonial-card">
            <div className="lp-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="lp-star-filled" />)}
            </div>
            <p>
              "The handwritten notes inside Segment 04 saved me during midterms. The visual parsing tables made predictive LL(1) tables so easy to build."
            </p>
            <div className="lp-testimonial-user">
              <div className="lp-avatar">FA</div>
              <div>
                <h4>Fahim Ahmed</h4>
                <span>CSE Student, UIU</span>
              </div>
            </div>
          </div>

          <div className="lp-testimonial-card highlighted">
            <div className="lp-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="lp-star-filled" />)}
            </div>
            <p>
              "Code generation always felt like black magic until I saw the visual flow mapping stack allocation vs heap allocation. Absolutely recommended!"
            </p>
            <div className="lp-testimonial-user">
              <div className="lp-avatar">NJ</div>
              <div>
                <h4>Nusrat Jahan</h4>
                <span>SWE Major, NSU</span>
              </div>
            </div>
          </div>

          <div className="lp-testimonial-card">
            <div className="lp-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="lp-star-filled" />)}
            </div>
            <p>
              "Navigating the syllabus is extremely intuitive now. I can easily identify prerequisites and focus on topics that I'm weakest at."
            </p>
            <div className="lp-testimonial-user">
              <div className="lp-avatar">RI</div>
              <div>
                <h4>Raihan Islam</h4>
                <span>CSE Major, IIUC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. PRICING SECTION ─── */}
      <section id="pricing" className="lp-pricing-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">Pricing</span>
          <h2 className="lp-section-title">
            FLEXIBLE PLANS<br />
            <span>FOR EVERY SEMESTER</span>
          </h2>
        </div>

        <div className="lp-pricing-grid">
          {/* Card 1 */}
          <div className="lp-pricing-card">
            <div className="lp-price-header">
              <h3>Basic</h3>
              <p>For standard syllabus tracking</p>
            </div>
            <div className="lp-price-amount">
              <span className="num">$0</span>
              <span className="period">/semester</span>
            </div>
            <button className="lp-price-btn" onClick={() => navigate('/compiler')}>Start Free</button>
            <ul className="lp-price-features">
              <li><Check size={14} /> Access to segment roadmaps</li>
              <li><Check size={14} /> Status tracking checkpoints</li>
              <li><Check size={14} /> Desktop & Mobile layout flows</li>
              <li className="disabled"><Check size={14} /> Handwritten class note files</li>
              <li className="disabled"><Check size={14} /> Shared study group dashboards</li>
            </ul>
          </div>

          {/* Card 2 - Highlighted */}
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
            <ul className="lp-price-features">
              <li><Check size={14} /> Access to segment roadmaps</li>
              <li><Check size={14} /> Status tracking checkpoints</li>
              <li><Check size={14} /> Desktop & Mobile layout flows</li>
              <li><Check size={14} /> High-res handwritten class notes</li>
              <li><Check size={14} /> Error recovery details</li>
              <li className="disabled"><Check size={14} /> Shared study group dashboards</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="lp-pricing-card">
            <div className="lp-price-header">
              <h3>Study Group</h3>
              <p>For collaborating team projects</p>
            </div>
            <div className="lp-price-amount">
              <span className="num">$39</span>
              <span className="period">/semester</span>
            </div>
            <button className="lp-price-btn" onClick={() => navigate('/register')}>Get Group</button>
            <ul className="lp-price-features">
              <li><Check size={14} /> Access to segment roadmaps</li>
              <li><Check size={14} /> Status tracking checkpoints</li>
              <li><Check size={14} /> Desktop & Mobile layout flows</li>
              <li><Check size={14} /> High-res handwritten class notes</li>
              <li><Check size={14} /> Shared team study folders</li>
              <li><Check size={14} /> Custom checklist assignments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 5. FAQ SECTION ─── */}
      <section id="faq" className="lp-faq-section">
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

      {/* ─── 6. BOTTOM CALL TO ACTION ─── */}
      <section className="lp-cta-card-section">
        <div className="lp-cta-card">
          <div className="lp-cta-card-glow"></div>
          <h2>GET YOUR AUTHORITY</h2>
          <p>Create internal sharing networks for group studies. Access handwritten notes and trace parsing steps dynamically today.</p>
          <button className="lp-cta-card-btn" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}>
            Start Sharing <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ─── 7. FOOTER SECTION ─── */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <div className="lp-footer-logo-dot"></div>
              <span>TrashofCSE</span>
            </div>
            <p>Simplifying complex computer science topics through interactive roadmap visualizations and peer resources.</p>
          </div>
          <div className="lp-footer-links-grid">
            <div className="lp-footer-col">
              <h4>Portals</h4>
              <span onClick={() => navigate('/compiler')}>Compiler Study Portal</span>
              <span onClick={() => navigate('/eee')}>EEE Study Portal</span>
              <span onClick={() => navigate('/computer-architecture')}>Computer Architecture</span>
            </div>
            <div className="lp-footer-col">
              <h4>Resources</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing Plans</a>
              <a href="#faq">Frequently Asked</a>
            </div>
            <div className="lp-footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Disclaimer</a>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p className="lp-copyright">© 2026 TrashofCSE. All rights reserved.</p>
          <div className="lp-footer-wordmark">TrashofCSE</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
