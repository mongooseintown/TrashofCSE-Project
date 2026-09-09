import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, ChevronDown, Clock3, Layers3, Menu, Sparkles, Star, Target, Users } from 'lucide-react';
import './Home.css';

const subjects = [
  { name: 'Compiler Design', code: 'CSE 401', accent: 'coral', detail: 'Parsing, grammars & optimization' },
  { name: 'Computer Architecture', code: 'CSE 305', accent: 'blue', detail: 'Pipelines, memory & datapaths' },
  { name: 'Data Structures', code: 'CSE 203', accent: 'yellow', detail: 'Trees, graphs & algorithms' },
  { name: 'System Analysis', code: 'CSE 309', accent: 'violet', detail: 'DFD, ERD & software design' },
];

const faqs = [
  ['Is TrashOfCSE free?', 'Yes. Every note, solved question, and roadmap is available for free to engineering students.'],
  ['Do I need an account?', 'Create an account to save your progress and keep your study roadmap in one place.'],
  ['Who reviews the notes?', 'Senior students and contributors review materials before they reach the library.'],
];

const reveal = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ delay }}>{children}</motion.div>;
}

export default function Home() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);
  const { scrollY } = useScroll();
  const heroDrift = useTransform(scrollY, [0, 700], [0, 150]);
  const orbDrift = useTransform(scrollY, [0, 700], [0, -90]);

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="hero-grid" aria-hidden="true" />
        <motion.div className="hero-orb orb-one" style={{ y: orbDrift }} aria-hidden="true" />
        <motion.div className="hero-orb orb-two" style={{ y: heroDrift }} aria-hidden="true" />
        <div className="hero-copy">
          <motion.div initial="hidden" animate="visible" variants={reveal} className="eyebrow"><span className="eyebrow-dot" /> THE STUDY SPACE FOR CSE</motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="hero-title">Your syllabus,<br /><span>finally sorted.</span></motion.h1>
          <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.16 }} className="hero-description">Notes that make sense. Previous questions with real solutions. A calmer way to prepare for your next exam.</motion.p>
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }} className="hero-actions">
            <button className="button button-primary" onClick={() => navigate('/login')}>Start learning <ArrowRight size={17} /></button>
            <a className="text-link" href="#library">Explore the library <span>↓</span></a>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.32 }} className="hero-proof"><div className="proof-avatars"><i /><i /><i /><i /></div><span><strong>15,000+</strong> students study smarter here</span></motion.div>
        </div>
        <motion.div className="hero-dashboard" style={{ y: heroDrift }} initial={{ opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: .25, ease: 'easeOut' }}>
          <div className="dashboard-top"><div className="window-dots"><i /><i /><i /></div><span>trashofcse / dashboard</span><div className="live-pill"><span /> LIVE</div></div>
          <div className="dashboard-body"><aside><div className="mini-logo">T<span>O</span>C</div><div className="side-item active"><Layers3 size={15} /> Overview</div><div className="side-item"><BookOpen size={15} /> My library</div><div className="side-item"><Target size={15} /> Progress</div><div className="side-item"><Users size={15} /> Community</div></aside><div className="dash-main"><div className="dash-greeting"><div><small>MONDAY, 07 APRIL</small><h3>Good evening, Rafi.</h3></div><div className="dash-avatar">R</div></div><div className="progress-card"><div><span className="card-label">YOUR PROGRESS</span><strong>Keep the streak alive.</strong><p>3 chapters completed this week</p></div><div className="progress-ring"><span>68<small>%</small></span></div></div><div className="dash-heading"><span>Continue learning</span><a href="#library">View all <ArrowRight size={12} /></a></div><div className="dash-courses"><div className="course course-coral"><span>CD</span><div><b>Compiler Design</b><small>Chapter 04 · 72% done</small></div><ArrowRight size={14} /></div><div className="course course-blue"><span>CA</span><div><b>Computer Architecture</b><small>Chapter 02 · 34% done</small></div><ArrowRight size={14} /></div></div></div></div>
        </motion.div>
        <div className="hero-scroll">SCROLL TO EXPLORE <span /></div>
      </section>

      <section className="marquee" aria-label="Available subjects"><div className="marquee-track"><span>Compiler Design</span><b>✦</b><span>Data Structures</span><b>✦</b><span>Computer Architecture</span><b>✦</b><span>System Analysis</span><b>✦</b><span>EEE</span><b>✦</b><span>Compiler Design</span><b>✦</b><span>Data Structures</span></div></section>

      <section className="section library-section" id="library"><Reveal className="section-heading"><span className="section-kicker">ONE PLACE. ZERO CHAOS.</span><h2>Everything you need<br /><em>to get it.</em></h2><p>We turn scattered PDFs and impossible-to-follow lectures into a focused study flow.</p></Reveal><div className="feature-grid"><Reveal className="feature-card feature-large"><div className="feature-icon coral-icon"><BookOpen size={20} /></div><span className="feature-number">01</span><h3>Notes that respect<br />your time.</h3><p>Clear, concise and built around what actually appears in your exam. No filler, no wandering.</p><a href="#subjects" className="feature-link">Browse notes <ArrowRight size={15} /></a><div className="paper-stack" aria-hidden="true"><div /><div /><div /></div></Reveal><Reveal className="feature-card feature-dark" delay={.1}><div className="feature-icon cream-icon"><Clock3 size={20} /></div><span className="feature-number">02</span><h3>Past papers,<br />solved properly.</h3><p>See the thinking behind every answer and walk into your exam knowing what to expect.</p><a href="#subjects" className="feature-link">See solutions <ArrowRight size={15} /></a><div className="mini-chart" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div></Reveal><Reveal className="feature-card feature-wide" delay={.15}><div><div className="feature-icon yellow-icon"><Target size={20} /></div><span className="feature-number">03</span><h3>A roadmap that<br />keeps you moving.</h3><p>Choose a subject, track your chapters, and know exactly what to study next.</p><a href="#roadmap" className="feature-link">Build your roadmap <ArrowRight size={15} /></a></div><div className="roadmap-lines" aria-hidden="true"><div><span className="done">✓</span><b>Lexical analysis</b><small>Completed</small></div><div><span className="done">✓</span><b>Syntax analysis</b><small>Completed</small></div><div><span className="current">3</span><b>Intermediate code</b><small>Up next</small></div></div></Reveal></div></section>

      <section className="section subjects-section" id="subjects"><Reveal className="section-heading split-heading"><div><span className="section-kicker">THE LIBRARY</span><h2>Pick a topic.<br /><em>Make it yours.</em></h2></div><p>From first lecture to final revision, study material that speaks your language.</p></Reveal><div className="subject-list">{subjects.map((subject, index) => <Reveal key={subject.name} delay={index * .06}><a href="/login" className={`subject-row subject-${subject.accent}`}><span className="subject-index">0{index + 1}</span><div className="subject-symbol">{subject.name.slice(0, 1)}</div><div className="subject-info"><small>{subject.code}</small><h3>{subject.name}</h3><p>{subject.detail}</p></div><ArrowRight className="subject-arrow" size={21} /></a></Reveal>)}</div></section>

      <section className="statement-section" id="roadmap"><motion.div style={{ y: useTransform(scrollY, [1000, 1800], [50, -40]) }} className="statement-card"><Sparkles size={18} /><p>Good grades are not<br /><em>a personality trait.</em></p><span>— they are a system.</span></motion.div></section>

      <section className="section results-section" id="achievements"><Reveal className="section-heading center-heading"><span className="section-kicker">BUILT FOR THE BUSY ONES</span><h2>More clarity.<br /><em>Less cramming.</em></h2></Reveal><div className="stats-row"><div><strong>15k<span>+</span></strong><small>students learning</small></div><div><strong>150<span>+</span></strong><small>topics covered</small></div><div><strong>100<span>%</span></strong><small>free to access</small></div></div></section>

      <section className="section faq-section" id="faq"><Reveal className="faq-intro"><span className="section-kicker">GOOD TO KNOW</span><h2>Questions,<br /><em>answered.</em></h2><p>Still curious? We like that. Here are the basics.</p></Reveal><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? 'is-open' : ''}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{activeFaq === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{answer}</motion.p>}</div>)}</div></section>

      <section className="final-cta"><div className="cta-grid" aria-hidden="true" /><Reveal className="cta-content"><span className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</span><h2>Study less lost.<br /><em>Learn more.</em></h2><button className="button button-primary" onClick={() => navigate('/login')}>Enter the library <ArrowRight size={17} /></button></Reveal></section>
      <footer className="landing-footer"><div><div className="footer-mark">T<span>O</span>C</div><p>Make the syllabus make sense.</p></div><div className="footer-links"><a href="#library">Library</a><a href="#subjects">Subjects</a><a href="#faq">FAQ</a><a href="/login">Sign in</a></div><small>© 2026 TrashOfCSE</small></footer>
    </main>
  );
}
