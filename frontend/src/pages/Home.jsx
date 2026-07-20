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
    text: 'Organized academic resources by subject, segment, topic, and previous question focus.',
  },
  {
    icon: <UploadCloud size={20} />,
    title: 'Student Contributions',
    text: 'Students can submit notes while moderators keep the published library clean and useful.',
  },
  {
    icon: <MessageSquareText size={20} />,
    title: 'Community Feed',
    text: 'A private student space for questions, suggestions, bugs, comments, and quick help.',
  },
];

const stats = [
  ['04', 'Core Courses'],
  ['05+', 'Academic Segments'],
  ['100+', 'Visual Resources'],
];

const Home = () => {
  return (
    <main className="landing-page">
      <section className="landing-hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles size={15} />
              IIUC CSE study command center
            </div>

            <h1>TrashofCSE</h1>
            <p className="hero-lead">
              A focused academic hub for CSE students to find notes, previous question solves,
              segment resources, and shared study material without digging through scattered files.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="primary-action">
                Enter Dashboard <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="secondary-action">
                Create Account
              </Link>
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
            <div className="mockup-shell">
              <div className="mockup-topbar">
                <span></span>
                <span></span>
                <span></span>
                <p>trashofcse.app</p>
              </div>
              <img src="/trashofcse-mockup.png" alt="TrashofCSE dashboard mockup" />
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Built for repeated study sessions</span>
          <div></div>
        </div>
      </section>

      <section className="landing-section course-section" id="features">
        <div className="section-heading">
          <span>Library</span>
          <h2>Everything arranged the way students actually search.</h2>
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

      <section className="landing-section split-section" id="achievements">
        <div className="panel-copy">
          <span className="section-eyebrow">Workflow</span>
          <h2>From exam panic to one clean route.</h2>
          <p>
            TrashofCSE keeps the important academic material close: official PDFs,
            handnotes, diagrams, solved questions, and class contributions under one login.
          </p>

          <ul className="check-list">
            <li><CheckCircle2 size={18} /> Private student dashboard</li>
            <li><CheckCircle2 size={18} /> Moderator-reviewed uploads</li>
            <li><CheckCircle2 size={18} /> Fast access to segment resources</li>
          </ul>
        </div>

        <div className="workflow-panel">
          <div className="workflow-item active">
            <Layers3 size={19} />
            <div>
              <strong>Select Course</strong>
              <span>Compiler, CA, EEE, SAD</span>
            </div>
          </div>
          <div className="workflow-item">
            <FileSearch size={19} />
            <div>
              <strong>Open Segment</strong>
              <span>Topic notes and visual explanations</span>
            </div>
          </div>
          <div className="workflow-item">
            <ShieldCheck size={19} />
            <div>
              <strong>Use Verified Uploads</strong>
              <span>Reviewed materials from students and moderators</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section feature-section">
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

      <section className="landing-section final-cta" id="pricing">
        <GraduationCap size={34} />
        <h2>Study smarter with your batch resources in one place.</h2>
        <p>No subscriptions. No marketing noise. Just a focused academic workspace for the courses you keep opening before exams.</p>
        <Link to="/register" className="primary-action">
          Start Using TrashofCSE <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
};

export default Home;
