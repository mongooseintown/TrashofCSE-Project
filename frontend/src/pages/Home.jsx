import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, BookOpen, GraduationCap, CheckCircle, ChevronDown, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="elegant-home">
      
      {/* 1. HERO SECTION */}
      <section className="elegant-hero">
        <div className="elegant-hero-left">
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp}
            className="elegant-hero-title"
          >
            Students are <em className="accent-italic">lazy</em> <br />
            at studying.
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}
            className="elegant-hero-subtitle"
          >
            TrashOfCSE does the heavy lifting for you. We curate the best notes, solve previous questions, and organize everything into an intuitive platform so you can just focus on learning.
          </motion.p>
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
            className="elegant-hero-actions"
          >
            <button className="elegant-btn-primary" onClick={() => navigate('/login')}>Start studying</button>
            <button className="elegant-btn-outline" onClick={() => navigate('/login')}>Browse topics</button>
          </motion.div>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}
            className="elegant-hero-note"
          >
            Join thousands of engineering students mastering their syllabus today.
          </motion.p>
        </div>
        
        <div className="elegant-hero-right">
           <motion.div 
             className="elegant-mock-card mock-before"
             initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
           >
              <div className="mock-header">
                <span className="mock-dot red"></span>
                <span className="mock-title">Without TrashOfCSE</span>
              </div>
              <ul className="mock-list error">
                <li><span>✖</span> Endlessly searching for notes</li>
                <li><span>✖</span> Unsolved previous questions</li>
                <li><span>✖</span> Messy drive links</li>
              </ul>
           </motion.div>

           <motion.div 
             className="elegant-mock-card mock-after"
             initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
           >
              <div className="mock-header">
                <span className="mock-dot green"></span>
                <span className="mock-title">With TrashOfCSE</span>
              </div>
              <ul className="mock-list success">
                <li><CheckCircle size={14}/> Structured semester topics</li>
                <li><CheckCircle size={14}/> Solved previous questions</li>
                <li><CheckCircle size={14}/> Intuitive reading interface</li>
                <li><CheckCircle size={14}/> High average grades</li>
              </ul>
           </motion.div>
        </div>
      </section>

      {/* 2. TICKER */}
      <div className="elegant-ticker">
        <div className="ticker-track">
           <span>Compiler Design</span> <span className="ticker-dot">•</span>
           <span>Computer Architecture</span> <span className="ticker-dot">•</span>
           <span>EEE</span> <span className="ticker-dot">•</span>
           <span>System Analysis</span> <span className="ticker-dot">•</span>
           <span>Data Structures</span> <span className="ticker-dot">•</span>
           <span>Compiler Design</span> <span className="ticker-dot">•</span>
           <span>Computer Architecture</span>
        </div>
      </div>

      {/* 3. FEATURE CARDS (2-Column) */}
      <section className="elegant-section">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header center">
            <span className="elegant-eyebrow">EFFICIENCY</span>
            <h2>Study minus the stress,<br/>minus the hassle.</h2>
            <p>Our platform aggregates all the fragmented materials into one cohesive flow.</p>
         </motion.div>

         <div className="elegant-feature-split">
            <motion.div className="elegant-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <span className="elegant-tag">Curated Notes</span>
               <h3>Deep Coverage</h3>
               <p>Access notes that have been vetted by top scorers and professors. No more relying on incomplete handouts.</p>
               <span className="elegant-link">Explore notes <ArrowRight size={14}/></span>
            </motion.div>
            <motion.div className="elegant-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
               <span className="elegant-tag">Solutions</span>
               <h3>Previous Questions</h3>
               <p>We provide detailed, step-by-step solutions to past exams so you know exactly what to expect.</p>
               <span className="elegant-link">View solutions <ArrowRight size={14}/></span>
            </motion.div>
         </div>
      </section>

      {/* 4. CAPABILITIES (Bento Grid) */}
      <section className="elegant-section">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header">
            <span className="elegant-eyebrow">QUALITY MATTERS</span>
            <h2>Human readable<br/>and exam oriented.</h2>
         </motion.div>

         <div className="elegant-bento-grid">
            <motion.div className="elegant-card bento-wide" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <span className="elegant-tag">Accuracy</span>
               <h3>Verified by Seniors</h3>
               <p>Content is rigorously reviewed by top graduates to ensure accuracy and relevance to your current syllabus.</p>
            </motion.div>
            <motion.div className="elegant-card bento-wide" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
               <span className="elegant-tag">Speed</span>
               <h3>Faster Preparation</h3>
               <p>Cut your exam prep time in half by studying exactly what matters.</p>
            </motion.div>
            <motion.div className="elegant-card bento-full code-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
               <div className="code-header">
                 <Terminal size={14}/> TrashOfCSE Logic
               </div>
               <pre>
<code>{`// A typical study session
const session = new StudySession({
  subject: "Computer Architecture",
  focus: "Pipelining",
  mode: "Intense"
});

await session.loadTrashOfCSENotes();
session.execute(); // Results: A+ Guaranteed`}</code>
               </pre>
            </motion.div>
         </div>
      </section>

      {/* 5. USE CASES GRID (3x2) */}
      <section className="elegant-section">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header">
            <span className="elegant-eyebrow">SUBJECTS</span>
            <h2>Master the topics you need to pass, fast.</h2>
            <p>We continually update our repository for the hardest engineering subjects.</p>
         </motion.div>

         <div className="elegant-usecases-grid">
            {[
              { title: "Compiler Design", desc: "Lexical analysis, parsing, and optimization techniques simplified." },
              { title: "Computer Architecture", desc: "Datapaths, pipelining, and memory hierarchy breakdowns." },
              { title: "Electrical Engineering", desc: "Circuits, electronics, and digital logic made intuitive." },
              { title: "System Analysis", desc: "DFDs, ERDs, and software engineering principles." },
              { title: "Data Structures", desc: "Trees, graphs, and algorithmic problem solving." },
              { title: "Mathematics", desc: "Calculus and linear algebra notes for engineers." }
            ].map((uc, i) => (
              <motion.div key={i} className="elegant-card subtle-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                 <h3>{uc.title}</h3>
                 <p>{uc.desc}</p>
                 <span className="elegant-link small">Read more <ArrowRight size={12}/></span>
              </motion.div>
            ))}
         </div>
         <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <button className="elegant-btn-outline">View all subjects <ArrowRight size={16}/></button>
         </div>
      </section>

      {/* 6. STATS / ROI */}
      <section className="elegant-section elegant-stats-section">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header center">
            <span className="elegant-eyebrow">IMPACT</span>
            <h2>Study exactly what you need.</h2>
            <p>Our students consistently outperform the curve using our targeted materials.</p>
         </motion.div>

         <div className="elegant-stats-row">
            <div className="elegant-stat">
               <h4>15K+</h4>
               <p>Active Students</p>
            </div>
            <div className="elegant-stat">
               <h4>150+</h4>
               <p>Topics Covered</p>
            </div>
            <div className="elegant-stat">
               <h4>A+</h4>
               <p>Average Grade</p>
            </div>
            <div className="elegant-stat">
               <h4>100%</h4>
               <p>Free Access</p>
            </div>
         </div>
         
         <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <button className="elegant-btn-primary">Get started</button>
         </div>
      </section>

      {/* 7. BIG VISUAL */}
      <section className="elegant-section center-visual">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header center">
            <span className="elegant-eyebrow">INTERFACE</span>
            <h2>Build your roadmap</h2>
            <p>Select your subjects and we will generate the perfect study path for you.</p>
         </motion.div>

         <motion.div className="elegant-big-mockup" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="big-mock-header">
               <span></span><span></span><span></span>
            </div>
            <div className="big-mock-body">
               <div className="mock-sidebar">
                  <div className="mock-line"></div>
                  <div className="mock-line"></div>
                  <div className="mock-line"></div>
               </div>
               <div className="mock-main">
                  <div className="mock-title-bar">
                     <h2>Compiler Design: Chapter 4</h2>
                     <div className="mock-badge">Verified</div>
                  </div>
                  <div className="mock-content-area">
                     <div className="mock-para"></div>
                     <div className="mock-para short"></div>
                     <div className="mock-box"></div>
                  </div>
               </div>
            </div>
         </motion.div>
      </section>

      {/* 8. COMMUNITY REVIEWS */}
      <section className="elegant-section">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header center">
            <span className="elegant-eyebrow">TESTIMONIALS</span>
            <h2>Join the community</h2>
            <p>Hear from students who have transformed their grades.</p>
         </motion.div>

         <div className="elegant-reviews-grid">
            {[1,2,3,4].map((r) => (
              <motion.div key={r} className="elegant-card review-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: r * 0.1 }}>
                 <div className="review-author">
                    <div className="avatar"></div>
                    <div>
                      <strong>Student 0{r}</strong>
                      <span>CSE Dept.</span>
                    </div>
                 </div>
                 <p>"This platform completely changed how I prepare for exams. The notes are concise and the PQ solutions are lifesavers."</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 9. FAQ */}
      <section className="elegant-section elegant-faq-section">
         <div className="elegant-faq-left">
            <span className="elegant-eyebrow">SUPPORT</span>
            <h2>Frequently asked questions.</h2>
            <p>Everything you need to know about the product and how it works. Can't find the answer? Contact us.</p>
         </div>
         <div className="elegant-faq-right">
            {[
              "Is this platform completely free?",
              "Do I need to create an account?",
              "Are the notes updated regularly?",
              "How are the previous questions solved?"
            ].map((q, i) => (
              <div key={i} className={`elegant-faq-item ${activeFaq === i ? 'active' : ''}`} onClick={() => toggleFaq(i)}>
                 <div className="elegant-faq-q">
                    {q}
                    <span className="elegant-faq-icon"><ChevronDown size={18}/></span>
                 </div>
                 {activeFaq === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="elegant-faq-a">
                       Yes, the platform is free. You just need to authenticate with Google to access all the study materials and features.
                    </motion.div>
                 )}
              </div>
            ))}
         </div>
      </section>

      {/* 10. FOOTER CTA */}
      <section className="elegant-footer-cta">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="elegant-section-header center">
            <span className="elegant-eyebrow" style={{ color: '#e57e6c' }}>GET STARTED</span>
            <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Stop stressing.<br/>Start studying.</h2>
            <button className="elegant-btn-primary">Start studying</button>
         </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="elegant-footer">
         <div className="elegant-footer-content">
            <div className="footer-brand">
               <h3>TrashOfCSE</h3>
               <p>The ultimate hub for engineering students.</p>
            </div>
            <div className="footer-links">
               <div>
                  <h4>Product</h4>
                  <span>Subjects</span>
                  <span>PQ Solutions</span>
                  <span>Pricing</span>
               </div>
               <div>
                  <h4>Company</h4>
                  <span>About</span>
                  <span>Blog</span>
                  <span>Contact</span>
               </div>
               <div>
                  <h4>Legal</h4>
                  <span>Terms</span>
                  <span>Privacy</span>
               </div>
            </div>
         </div>
         <div className="footer-bottom">
            <span>© 2026 TrashOfCSE. All rights reserved.</span>
            <div className="social-links">
               <span>Twitter</span> • <span>Discord</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;
