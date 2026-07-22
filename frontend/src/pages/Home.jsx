import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Cpu,
  Database,
  FileCode2,
  Globe,
  GraduationCap,
  Layers,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Terminal,
  UploadCloud,
  Zap,
} from 'lucide-react';
import './Home.css';

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const semesterRoadmap = [
  {
    year: '1st Year',
    semesters: 'Semesters 1 & 2',
    icon: <BookOpen size={22} color="#FF4500" />,
    title: 'Foundational Engineering',
    courses: 'Structured C Programming, Basic EEE, Engineering Physics, Differential Calculus, Discrete Mathematics.',
    status: 'Indexed & Ready',
  },
  {
    year: '2nd Year',
    semesters: 'Semesters 3 & 4',
    icon: <FileCode2 size={22} color="#FF4500" />,
    title: 'Data & System Core',
    courses: 'Data Structures, Algorithms, Object-Oriented Programming, Digital Logic Design, Microprocessors.',
    status: 'Verified Solutions',
  },
  {
    year: '3rd Year',
    semesters: 'Semesters 5 & 6',
    icon: <Cpu size={22} color="#FF4500" />,
    title: 'Advanced Architecture & Compilers',
    courses: 'Computer Architecture (CSE-3523), Compiler Design (CSE-3527), System Analysis (SAD), EEE Transducers.',
    status: 'Complete Exam Bank',
  },
  {
    year: '4th Year',
    semesters: 'Semesters 7 & 8',
    icon: <GraduationCap size={22} color="#FF4500" />,
    title: 'Specialized Electives & Thesis',
    courses: 'Artificial Intelligence, Machine Learning, Computer Networks, Database Systems, Thesis Guidance & Defense.',
    status: 'Active Contributions',
  },
];

const faqs = [
  {
    q: 'Is TrashofCSE specifically designed for IIUC CSE students?',
    a: 'Yes! TrashofCSE is tailored specifically to the syllabus, course codes, and exam formats of the Department of Computer Science & Engineering at International Islamic University Chittagong (IIUC).',
  },
  {
    q: 'Does it cover all 8 semesters of the CSE degree?',
    a: 'Absolutely. We cover all academic years from 1st Semester (Freshman Fundamentals) to 8th Semester (Senior Thesis & Advanced Electives), categorized by subject and segment.',
  },
  {
    q: 'How do I create an account on TrashofCSE?',
    a: 'Registration is restricted to IIUC student domains (cXXXXXX@ugrad.iiuc.ac.bd). Simply sign up with your university email to get instant access to all course segments.',
  },
  {
    q: 'Are the study notes and PQ solves verified?',
    a: 'Yes. All student contributions pass through a dedicated moderator shield before being published to the main course library to ensure accuracy and quality.',
  },
  {
    q: 'How does the Realtime Active Users widget work?',
    a: 'Our platform uses WebSocket presence tracking to show online batchmates in real-time, making it easy to coordinate group study sessions during exam week.',
  },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="tech-landing-container">
      {/* Background Tech Grid Lines & Ambient Light */}
      <div className="tech-grid-overlay" />
      <div className="ambient-orange-glow top-glow" />
      <div className="ambient-orange-glow mid-glow" />

      {/* Hero Section */}
      <motion.section 
        className="tech-hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="tech-hero-shell">
          <motion.div className="tech-hero-left" variants={fadeInUp}>
            <div className="tech-badge">
              <span className="badge-dot" />
              <span>IIUC CSE // SEMESTER 1 TO 8 ACADEMIC VAULT</span>
            </div>

            <h1 className="tech-title">
              The Complete Academic Engine For <span className="highlight-orange">IIUC CSE Students</span>
            </h1>

            <p className="tech-subtitle">
              Covering all 8 Semesters — from 1st Year Fundamentals to 4th Year Advanced Systems & Thesis.
              Unified segment notes, verified previous question solves, real-time batch presence, and structured exam preparation.
            </p>

            <div className="tech-cta-group">
              <Link to="/login" className="tech-btn-primary">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="tech-btn-secondary">
                Create IIUC Account
              </Link>
            </div>

            <div className="tech-hero-tags">
              <span><Check size={14} color="#FF4500" /> Sem 1 to 8 Covered</span>
              <span><Check size={14} color="#FF4500" /> IIUC Exam Pattern Aligned</span>
              <span><Check size={14} color="#FF4500" /> Moderator Verification</span>
            </div>
          </motion.div>

          {/* Hero Visual: Technical Tree / Node Diagram */}
          <motion.div className="tech-hero-right" variants={fadeInUp}>
            <div className="tech-visual-box">
              <div className="visual-header-strip">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="strip-title">iiuc-cse // semester-pipeline.v8</span>
              </div>
              <div className="visual-tree-content">
                <div className="tree-node root-node">
                  <Cpu size={22} className="node-icon-orange" />
                  <div>
                    <strong>IIUC CSE Academic Vault</strong>
                    <span>Semesters 1 - 8 // 100% Indexed</span>
                  </div>
                </div>

                <div className="tree-connector-lines">
                  <div className="line line-1" />
                  <div className="line line-2" />
                  <div className="line line-3" />
                </div>

                <div className="tree-branches">
                  <div className="branch-card">
                    <Terminal size={18} />
                    <div>
                      <strong>Sem 1 & 2 Foundations</strong>
                      <span>C Prog, Physics, Math, Basic EEE</span>
                    </div>
                    <span className="badge-gray">Complete</span>
                  </div>

                  <div className="branch-card active-branch">
                    <Layers size={18} />
                    <div>
                      <strong>Sem 3, 4, 5 & 6 Core Systems</strong>
                      <span>Compiler, CA, Algo, SAD, DLD</span>
                    </div>
                    <span className="badge-orange">Verified</span>
                  </div>

                  <div className="branch-card">
                    <GraduationCap size={18} />
                    <div>
                      <strong>Sem 7 & 8 Senior Electives</strong>
                      <span>AI, ML, Networks & Thesis</span>
                    </div>
                    <span className="badge-green">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Metrics Bar */}
      <motion.section 
        className="tech-metrics-bar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
      >
        <div className="metrics-grid">
          <motion.div className="metric-box" variants={fadeInUp}>
            <strong className="metric-value highlight-orange">Sem 1-8</strong>
            <span className="metric-label">Full Academic Syllabus Covered</span>
          </motion.div>
          <motion.div className="metric-box" variants={fadeInUp}>
            <strong className="metric-value">100%</strong>
            <span className="metric-label">IIUC Exam Pattern Aligned</span>
          </motion.div>
          <motion.div className="metric-box" variants={fadeInUp}>
            <strong className="metric-value">0.2s</strong>
            <span className="metric-label">Instant Search Latency</span>
          </motion.div>
          <motion.div className="metric-box" variants={fadeInUp}>
            <strong className="metric-value">500+</strong>
            <span className="metric-label">Active IIUC CSE Batchmates</span>
          </motion.div>
        </div>
      </motion.section>

      {/* NEW SECTION: Semester 1 to 8 Academic Roadmap */}
      <motion.section 
        className="tech-section roadmap-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="section-header center" variants={fadeInUp}>
          <span className="tech-sub-tag">SEMESTER COVERAGE</span>
          <h2>All 8 Semesters Structured In One Place</h2>
          <p>Whether you are a 1st-year freshman or a 4th-year senior preparing for graduation, TrashofCSE has you covered.</p>
        </motion.div>

        <div className="roadmap-grid">
          {semesterRoadmap.map((item, index) => (
            <motion.div className="roadmap-card" key={index} variants={fadeInUp}>
              <div className="roadmap-top">
                <div className="roadmap-icon">{item.icon}</div>
                <div>
                  <span className="roadmap-year">{item.year}</span>
                  <h4 className="roadmap-sem">{item.semesters}</h4>
                </div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.courses}</p>
              <div className="roadmap-footer">
                <span className="roadmap-status">{item.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Comparison Section (Without vs With) */}
      <motion.section 
        className="tech-section comparison-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="section-header center" variants={fadeInUp}>
          <span className="tech-sub-tag">SYSTEM COMPARISON</span>
          <h2>Simplicity and Speed for Your IIUC Academic Workflow</h2>
          <p>Ditch scattered messenger files and unverified drives for a unified academic portal.</p>
        </motion.div>

        <div className="comparison-grid">
          {/* Without TrashofCSE */}
          <motion.div className="comparison-card bad" variants={fadeInUp}>
            <div className="card-tag bad-tag">TRADITIONAL DRIVE / MESSENGER</div>
            <h3>Scattered, Unverified Study Material</h3>
            <p>Moving between 10+ Facebook groups and Google Drive links leads to missing topics and exam panic.</p>
            <ul className="comp-list">
              <li><span className="cross">✕</span> Unorganized PDF files with no semester tagging</li>
              <li><span className="cross">✕</span> Unverified previous question answers</li>
              <li><span className="cross">✕</span> Slow manual scrolling to find exam topics</li>
              <li><span className="cross">✕</span> No real-time peer coordination</li>
            </ul>
          </motion.div>

          {/* With TrashofCSE */}
          <motion.div className="comparison-card good" variants={fadeInUp}>
            <div className="card-tag good-tag">TRASHOFCSE ENGINE</div>
            <h3>Structured, Verified Knowledge Pipeline</h3>
            <p>Every slide, note, and question solve is indexed by semester, course, and exam importance.</p>
            <ul className="comp-list">
              <li><span className="check">✓</span> Sem 1-8 indexed course architecture</li>
              <li><span className="check">✓</span> Moderator-approved student note uploads</li>
              <li><span className="check">✓</span> Instant search & high-res note viewer</li>
              <li><span className="check">✓</span> Live active presence widget for batchmates</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Bento Feature Showcase */}
      <motion.section 
        className="tech-section bento-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <span className="tech-sub-tag">CORE CAPABILITIES</span>
          <h2>Everything You Need To Master CSE Courses</h2>
        </motion.div>

        <div className="bento-grid">
          {/* Bento Card 1: Large Featured */}
          <motion.div className="bento-card bento-large" variants={fadeInUp}>
            <div className="bento-badge">COMPILER DESIGN (CSE-3527)</div>
            <h3>Syntax Trees, Parsers & Code Gen</h3>
            <p>Comprehensive breakdown of Segment 04, 06, 07 & 08 with detailed CFG diagrams and code generation algorithms.</p>
            <div className="bento-graphic-box">
              <div className="graphic-bar-label">
                <span>Parser State Accuracy</span>
                <strong>84% Completed</strong>
              </div>
              <div className="graphic-progress-bar">
                <div className="progress-fill" style={{ width: '84%' }} />
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Computer Architecture */}
          <motion.div className="bento-card" variants={fadeInUp}>
            <div className="bento-icon-wrapper"><Cpu size={24} color="#FF4500" /></div>
            <h3>Computer Architecture</h3>
            <p>Cache mapping, DMA, multicycle datapath, and handshaking protocols with Shafiullah Sir & Amanullah Sir exam guides.</p>
          </motion.div>

          {/* Bento Card 3: EEE & Transducers */}
          <motion.div className="bento-card" variants={fadeInUp}>
            <div className="bento-icon-wrapper"><Zap size={24} color="#FF4500" /></div>
            <h3>EEE & Transducer Bank</h3>
            <p>Solved Question banks for RTD, Thermocouple, DVM, Strain Gauges, and Stepper Motors.</p>
          </motion.div>

          {/* Bento Card 4: Community Feed */}
          <motion.div className="bento-card bento-medium" variants={fadeInUp}>
            <div className="bento-icon-wrapper"><MessageSquareText size={24} color="#FF4500" /></div>
            <h3>Realtime Community Feed</h3>
            <p>Ask questions, post code snippets, share exam tips, and reply in threaded peer discussions across all semesters.</p>
          </motion.div>

          {/* Bento Card 5: Realtime Presence */}
          <motion.div className="bento-card" variants={fadeInUp}>
            <div className="bento-icon-wrapper"><Globe size={24} color="#FF4500" /></div>
            <h3>Live Active Presence</h3>
            <p>Instant WebSocket tracking shows online batchmates for effortless revision sessions.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Technical Benchmark Table */}
      <motion.section 
        className="tech-section table-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <span className="tech-sub-tag">BENCHMARKS</span>
          <h2>State Of The Art On Academic Portals</h2>
        </motion.div>

        <motion.div className="table-wrapper" variants={fadeInUp}>
          <table className="tech-benchmark-table">
            <thead>
              <tr>
                <th>Feature Matrix</th>
                <th>Drive Folders</th>
                <th>Messenger Groups</th>
                <th className="highlight-col">TrashofCSE Engine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sem 1 - 8 Academic Coverage</td>
                <td>✕ Partial</td>
                <td>✕ No</td>
                <td className="highlight-col text-orange">✓ Sem 1 to 8 Covered</td>
              </tr>
              <tr>
                <td>Segment-wise Indexing</td>
                <td>✕ No</td>
                <td>✕ No</td>
                <td className="highlight-col text-orange">✓ 100% Segmented</td>
              </tr>
              <tr>
                <td>Moderation & Verification</td>
                <td>Unverified</td>
                <td>Spam Prone</td>
                <td className="highlight-col text-orange">✓ Moderator Shield</td>
              </tr>
              <tr>
                <td>Search Latency</td>
                <td>Slow Manual</td>
                <td>Unindexed</td>
                <td className="highlight-col text-orange">✓ 0.2 Seconds</td>
              </tr>
              <tr>
                <td>Real-time Batch Presence</td>
                <td>✕ None</td>
                <td>Basic Chat</td>
                <td className="highlight-col text-orange">✓ WebSocket Widget</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </motion.section>

      {/* Access Plans / Tier Cards */}
      <motion.section 
        className="tech-section tiers-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="section-header center" variants={fadeInUp}>
          <span className="tech-sub-tag">PLATFORM ACCESS</span>
          <h2>Access Plans For Every IIUC Student</h2>
        </motion.div>

        <div className="tiers-grid">
          {/* Tier 1: Student */}
          <motion.div className="tier-card" variants={fadeInUp}>
            <div className="tier-badge">STUDENT ACCESS</div>
            <h3>Free Account</h3>
            <p className="tier-price">0 BDT <span>/ forever</span></p>
            <ul className="tier-features">
              <li><Check size={16} color="#FF4500" /> Sem 1 to 8 notes & slides access</li>
              <li><Check size={16} color="#FF4500" /> High-res note & slide viewer</li>
              <li><Check size={16} color="#FF4500" /> Live active presence widget</li>
              <li><Check size={16} color="#FF4500" /> Community feed discussion</li>
            </ul>
            <Link to="/register" className="tier-btn-outline">Sign Up Now</Link>
          </motion.div>

          {/* Tier 2: Contributor (Highlighted) */}
          <motion.div className="tier-card tier-featured" variants={fadeInUp}>
            <div className="tier-badge orange-badge">CONTRIBUTOR</div>
            <h3>Verified Student</h3>
            <p className="tier-price">Active <span>/ IIUC Domain</span></p>
            <ul className="tier-features">
              <li><Check size={16} color="#FF4500" /> Everything in Student Tier</li>
              <li><Check size={16} color="#FF4500" /> Upload handnotes & question solves</li>
              <li><Check size={16} color="#FF4500" /> Contributor badge on profile</li>
              <li><Check size={16} color="#FF4500" /> Fast-track moderation queue</li>
            </ul>
            <Link to="/register" className="tier-btn-solid">Get Started</Link>
          </motion.div>

          {/* Tier 3: Admin / Moderator */}
          <motion.div className="tier-card" variants={fadeInUp}>
            <div className="tier-badge">MODERATION</div>
            <h3>Admin & Moderator</h3>
            <p className="tier-price">Restricted <span>/ Staff</span></p>
            <ul className="tier-features">
              <li><Check size={16} color="#FF4500" /> Moderator Dashboard access</li>
              <li><Check size={16} color="#FF4500" /> Verify student note uploads</li>
              <li><Check size={16} color="#FF4500" /> Manage user accounts & bans</li>
              <li><Check size={16} color="#FF4500" /> Course lock & security controls</li>
            </ul>
            <Link to="/login" className="tier-btn-outline">Moderator Login</Link>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Accordion Section */}
      <motion.section 
        className="tech-section faq-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="section-header center" variants={fadeInUp}>
          <span className="tech-sub-tag">HELP & SUPPORT</span>
          <h2>Frequently Asked Questions</h2>
        </motion.div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <motion.div 
              className={`faq-item ${openFaq === index ? 'active' : ''}`}
              key={index}
              variants={fadeInUp}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.q}</span>
                <ChevronDown className={`faq-chevron ${openFaq === index ? 'rotate' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div 
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Banner */}
      <motion.section 
        className="tech-section final-banner-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeInUp}
      >
        <div className="final-banner">
          <div className="banner-glow" />
          <h2>Built For IIUC CSE Students Across Semesters 1 to 8</h2>
          <p>Join hundreds of IIUC batchmates studying smarter with verified course notes and solved question banks.</p>
          <div className="banner-btn-group">
            <Link to="/register" className="tech-btn-primary">
              Join TrashofCSE Engine <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Minimal Technical Footer */}
      <footer className="tech-footer">
        <div className="footer-shell">
          <div className="footer-brand">
            <strong className="brand-title">TRASHOFCSE // IIUC CSE PORTAL</strong>
            <p>The All-in-One Academic Knowledge Engine for IIUC CSE Students (Semesters 1 - 8). Designed for speed, verification, and exam mastery.</p>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <strong>Navigation</strong>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="link-col">
              <strong>Courses</strong>
              <Link to="/compiler">Compiler Design</Link>
              <Link to="/computer-architecture">Computer Architecture</Link>
              <Link to="/eee">EEE Resources</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TrashofCSE (IIUC CSE Dept). All Rights Reserved.</span>
          <span className="status-online"><span className="pulse-dot" /> System Status: Operational</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
