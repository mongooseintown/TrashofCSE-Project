import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  Layers3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import './Home.css';

const courses = [
  { code: 'CSE-3527', name: 'Compiler Design', detail: 'segments, parsers, CFG, code generation' },
  { code: 'CSE-3523', name: 'Computer Architecture', detail: 'cache, DMA, datapath, memory systems' },
  { code: 'EEE-2421', name: 'EEE Resources', detail: 'transducers, RTD, DVM, instrumentation' },
  { code: 'CSE-3611', name: 'System Analysis', detail: 'security, requirements, design notes' },
];

const features = [
  {
    icon: <FileSearch size={20} />,
    title: 'Segment-wise Notes',
    text: 'Organized academic resources by course, segment and past paper focus.',
  },
  {
    icon: <UploadCloud size={20} />,
    title: 'Verified Uploads',
    text: 'Student contributions are reviewed before they appear in the shared library.',
  },
  {
    icon: <MessageSquareText size={20} />,
    title: 'Community Feed',
    text: 'Ask questions, report bugs, and share study tips with your batchmates.',
  },
];

const stats = [
  ['04', 'Core subjects'],
  ['05+', 'Exam-ready segments'],
  ['100+', 'Study assets'],
];

const Home = () => {
  return (
    <main className="landing-page">
      <section className="landing-hero" id="top">
        <div className="hero-shell">
          <div className="hero-copy">
            <span className="hero-label">
              <Sparkles size={14} /> IIUC CSE private study hub
            </span>

            <h1>Study the right notes, faster.</h1>
            <p className="hero-text">
              TrashofCSE brings Compiler, CA, EEE and SAD material into a clean workspace with
              verified uploads, segment-focused notes, and a student-first dashboard.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="primary-action">
                Go to dashboard <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="secondary-action">
                Create account
              </Link>
            </div>

            <div className="hero-badges">
              <span>Moderated student uploads</span>
              <span>Course and segment filters</span>
              <span>Private batch access</span>
            </div>

            <div className="hero-stats" aria-label="Platform highlights">
              {stats.map(([value, label]) => (
                <div className="hero-stat" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="TrashofCSE dashboard preview">
            <div className="visual-card">
              <div className="visual-topbar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="visual-body">
                <div className="visual-sidebar">
                  <div className="visual-tag">Compiler</div>
                  <div className="visual-item">Segment 06</div>
                  <div className="visual-item">Segment 08</div>
                  <div className="visual-item active">Segment 05</div>
                  <div className="visual-item">Saved Notes</div>
                </div>
                <div className="visual-main">
                  <div className="visual-header">
                    <div>
                      <p>Approved uploads</p>
                      <strong>Books, slides, PQ solves</strong>
                    </div>
                    <span>Updated Today</span>
                  </div>
                  <div className="visual-grid">
                    <div className="visual-panel">
                      <h4>CA Segment 08</h4>
                      <p>DMA, handshaking, cache mapping.</p>
                    </div>
                    <div className="visual-panel">
                      <h4>EEE PQ Bank</h4>
                      <p>Thermocouple, RTD, DVM solved papers.</p>
                    </div>
                    <div className="visual-panel">
                      <h4>Compiler Notes</h4>
                      <p>Parser walkthroughs and code generation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section course-section" id="library">
        <div className="section-heading">
          <span>Library</span>
          <h2>Organized for fast exam prep.</h2>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.code}>
              <div className="course-card-top">
                <BookOpen size={20} />
                <span>{course.code}</span>
              </div>
              <h3>{course.name}</h3>
              <p>{course.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section workflow-section" id="workflow">
        <div className="workflow-copy">
          <span className="section-eyebrow">How it works</span>
          <h2>One study workflow for every course.</h2>
          <p>
            Pick your course, open the right segment, and stay in a curated space for verified notes
            and student contributions.
          </p>
        </div>

        <div className="workflow-cards">
          <div className="workflow-card active">
            <Layers3 size={20} />
            <div>
              <h3>Structured access</h3>
              <p>Course, segment, exam type and content filters make searching simple.</p>
            </div>
          </div>
          <div className="workflow-card">
            <FileSearch size={20} />
            <div>
              <h3>Clear content</h3>
              <p>Notes, slides and previous questions are grouped for each topic.</p>
            </div>
          </div>
          <div className="workflow-card">
            <ShieldCheck size={20} />
            <div>
              <h3>Verified uploads</h3>
              <p>Moderators review new material before it enters the library.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section feature-section" id="features">
        <div className="section-heading">
          <span>Features</span>
          <h2>Everything built for focused student study.</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section final-cta" id="start">
        <div className="cta-copy">
          <GraduationCap size={34} />
          <h2>Start studying from a smarter place.</h2>
          <p>No subscriptions, no noise — only the course material your batch actually needs.</p>
        </div>
        <Link to="/register" className="primary-action">
          Join TrashofCSE <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
};

export default Home;
