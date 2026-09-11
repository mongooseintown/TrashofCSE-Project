import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Zap, 
  LayoutGrid, 
  ArrowRight, 
  User, 
  Layers, 
  FileText, 
  MessageSquare,
  BookmarkCheck,
  Compass,
  CheckCircle2,
  Award,
  GraduationCap,
  Flame,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import './Dashboard.css';

// All verified curated topics directly mapped to coded static notes
const ALL_TOPICS = [
  // Computer Architecture
  {
    id: 'ca-single-multi',
    title: 'Single-Cycle vs Multi-Cycle Datapath',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '05',
    category: 'Architecture',
    type: 'core',
    path: '/computer-architecture/single-vs-multi-cycle',
    desc: 'Clock cycles, CPI, execution equations, and hardware comparison for MIPS datapath.'
  },
  {
    id: 'ca-pq-solve',
    title: 'CA Previous Question Solve (Mahir & Shafiul)',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '06',
    category: 'Exam Solve',
    type: 'pq',
    path: '/computer-architecture/segment-06/previous-question-solve',
    desc: 'Complete detailed step-by-step solutions for semester final exam questions.'
  },
  {
    id: 'ca-cache-mapping',
    title: 'Cache Memory & Mapping Techniques',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '07',
    category: 'Memory Hierarchy',
    type: 'core',
    path: '/computer-architecture/segment-07/cache-mapping',
    desc: 'Direct, Associative, and Set-Associative mapping calculations and tag formats.'
  },
  {
    id: 'ca-tlb-pagefault',
    title: 'TLB & Page Fault Handling Mechanisms',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '07',
    category: 'Virtual Memory',
    type: 'core',
    path: '/computer-architecture/segment-07/tlb',
    desc: 'Translation Lookaside Buffer flow, page tables, and page fault resolution.'
  },
  {
    id: 'ca-dma-handshake',
    title: 'DMA & Handshaking Protocol',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '08',
    category: 'I/O Interface',
    type: 'core',
    path: '/computer-architecture/segment-08/dma',
    desc: 'Direct Memory Access cycles, bus arbitration, and asynchronous handshaking.'
  },
  {
    id: 'ca-shafiullah-sugg',
    title: 'Shafiullah Sir Suggestions & Guidelines',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: 'Final',
    category: 'Faculty Guidelines',
    type: 'suggestion',
    path: '/computer-architecture/shafiullah-suggestions',
    desc: 'High-priority syllabus points and question hints directly from course faculty.'
  },
  {
    id: 'ca-amanullah-sugg',
    title: 'Amanullah Sir Architecture Guidelines',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: 'Final',
    category: 'Faculty Guidelines',
    type: 'suggestion',
    path: '/computer-architecture/amanullah-guidelines',
    desc: 'Curated topics, exam checklist, and datapath problem set guidelines.'
  },

  // Compiler Design
  {
    id: 'compiler-seg04',
    title: 'Lexical Analysis & Symbol Tables',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '04',
    category: 'Front-End',
    type: 'core',
    path: '/compiler/segment-04',
    desc: 'Tokenization, regular expressions, transition diagrams, and symbol tables.'
  },
  {
    id: 'compiler-seg06',
    title: 'Syntax Analysis & Top-Down Parsing',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '06',
    category: 'Parsing',
    type: 'core',
    path: '/compiler/segment-06',
    desc: 'LL(1) parsing tables, FIRST and FOLLOW set computations and ambiguity.'
  },
  {
    id: 'compiler-seg07',
    title: 'Bottom-Up Parsing & LR Parsers',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '07',
    category: 'Parsing',
    type: 'core',
    path: '/compiler/segment-07',
    desc: 'Shift-reduce parsing, LR(0), SLR(1), and LALR parser construction.'
  },
  {
    id: 'compiler-seg08',
    title: 'Code Generation & Optimization',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '08',
    category: 'Back-End',
    type: 'core',
    path: '/compiler/segment-08',
    desc: 'Three-address code, intermediate representations, and register allocation.'
  },

  // EEE & Instrumentation
  {
    id: 'eee-dfm-pq',
    title: 'Digital Frequency Meter (DFM) Exam Solve',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: '08',
    category: 'Exam Solve',
    type: 'pq',
    path: '/eee/dfm-pq',
    desc: 'Previous exam question solutions, time base circuitry, and counter mechanics.'
  },
  {
    id: 'eee-strain-gauge',
    title: 'Strain Gauge & Wheatstone Bridge Circuits',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: '05',
    category: 'Transducers',
    type: 'core',
    path: '/eee/strain-gauge',
    desc: 'Gauge factor calculations, quarter/half/full bridge circuit derivations.'
  },
  {
    id: 'eee-strain-gauge-pq',
    title: 'Strain Gauge Previous Question Solve',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: '05',
    category: 'Exam Solve',
    type: 'pq',
    path: '/eee/strain-gauge-pq',
    desc: 'Worked numerical problems on bridge balance and resistance deflection.'
  },
  {
    id: 'eee-thermocouple-math',
    title: 'Thermocouple & RTD Mathematical Solves',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: '06',
    category: 'Math & Circuit',
    type: 'core',
    path: '/eee/thermocouple-math',
    desc: 'Seebeck effect equations, temperature coefficient of resistance formulas.'
  },
  {
    id: 'eee-pv-cell',
    title: 'Photovoltaic (PV) Cells & Opto-Electronics',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: '07',
    category: 'Opto-Electronics',
    type: 'core',
    path: '/eee/pv-cell',
    desc: 'Solar cell I-V characteristics, fill factor calculations, and efficiencies.'
  },
  {
    id: 'eee-pv-cell-pq',
    title: 'PV Cell Previous Questions Solve',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: '07',
    category: 'Exam Solve',
    type: 'pq',
    path: '/eee/pv-cell-pq',
    desc: 'Complete numerical solves on maximum power point and solar efficiency.'
  },
  {
    id: 'eee-group-a',
    title: 'EEE Group A Comprehensive Solved Topics',
    course: 'eee',
    courseName: 'EEE-2421 (EEE)',
    segment: 'Final',
    category: 'Exam Solve',
    type: 'pq',
    path: '/eee/group-a',
    desc: 'Consolidated Group A answers covering generalized instrumentation & errors.'
  },

  // System Analysis & Design
  {
    id: 'sad-seg08',
    title: 'System Analysis & Design Methodologies',
    course: 'sad',
    courseName: 'CSE-3611 (SAD)',
    segment: '08',
    category: 'Systems',
    type: 'core',
    path: '/system-analysis-design/segment-08',
    desc: 'Data Flow Diagrams (DFD), system requirements, and architectural modeling.'
  }
];

// High-Yield Exam Solves for quick access
const HIGH_YIELD_SOLVES = [
  {
    id: 'hy-1',
    title: 'CA Previous Questions (Shafiul & Mahir)',
    tag: 'Final Exam Solve',
    badge: 'CSE-3523',
    color: '#a855f7',
    path: '/computer-architecture/segment-06/previous-question-solve',
    desc: 'Complete step-by-step solved questions with diagrams and architectural formulas.'
  },
  {
    id: 'hy-2',
    title: 'Digital Frequency Meter (DFM) Numerical Solve',
    tag: 'Must Prepare',
    badge: 'EEE-2421',
    color: '#f59e0b',
    path: '/eee/dfm-pq',
    desc: 'Time base calculation, gating circuits, and frequency measurement questions.'
  },
  {
    id: 'hy-3',
    title: 'Single-Cycle vs Multi-Cycle Datapath Breakdown',
    tag: 'Core Comparison',
    badge: 'CSE-3523',
    color: '#38bdf8',
    path: '/computer-architecture/single-vs-multi-cycle',
    desc: 'Clock cycle time, CPI variations, execution times, and multiplexer routing.'
  },
  {
    id: 'hy-4',
    title: 'Strain Gauge & Wheatstone Bridge Math',
    tag: 'Math Solve',
    badge: 'EEE-2421',
    color: '#10b981',
    path: '/eee/strain-gauge',
    desc: 'Detailed calculations for strain sensitivity, bridge sensitivity, and calibration.'
  }
];

const CORE_COURSES = [
  {
    id: 'ca',
    code: 'CSE-3523',
    title: 'Computer Architecture',
    desc: 'MIPS datapath, multi-cycle, cache mapping, virtual memory & DMA protocols.',
    icon: Cpu,
    color: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    path: '/computer-architecture',
    segments: ['Seg 05', 'Seg 06', 'Seg 07', 'Seg 08'],
    stats: '15+ Solved Notes'
  },
  {
    id: 'compiler',
    code: 'CSE-3527',
    title: 'Compiler Design',
    desc: 'Lexical analysis, symbol tables, LL(1) parsing, LR parsers & code generation.',
    icon: Terminal,
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    path: '/compiler',
    segments: ['Seg 04', 'Seg 06', 'Seg 07', 'Seg 08'],
    stats: 'Full Pipeline'
  },
  {
    id: 'eee',
    code: 'EEE-2421',
    title: 'EEE & Instrumentation',
    desc: 'Transducers, Strain Gauges, RTD, PV Cells, DFM & previous question solutions.',
    icon: Zap,
    color: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    path: '/eee',
    segments: ['All Segments', 'Group A', 'Math Solves'],
    stats: '18+ Solves & Notes'
  },
  {
    id: 'sad',
    code: 'CSE-3611',
    title: 'System Analysis & Design',
    desc: 'Software development lifecycles, structured DFDs & system design paradigms.',
    icon: LayoutGrid,
    color: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    path: '/system-analysis-design',
    segments: ['Seg 08', 'DFD Systems'],
    stats: 'Core Syllabus'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all | pq | ca | compiler | eee | sad

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, [navigate]);

  // Filter topics based on active tab and search input
  const filteredTopics = ALL_TOPICS.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.desc.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.courseName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'pq') return t.type === 'pq';
    return t.course === activeTab;
  });

  const studentFirstName = user?.fullName ? user.fullName.split(' ')[0] : 'Engineer';

  return (
    <div className="dash-container">
      
      {/* 1. COMMAND HEADER */}
      <header className="dash-hero-banner">
        <div className="dash-hero-content">
          <div className="dash-status-pill">
            <span className="dash-live-dot"></span>
            <span>CSE Academic Hub • Live Syllabus</span>
          </div>

          <h1 className="dash-hero-heading">
            Welcome back, <span className="dash-glow-text">{studentFirstName}</span>
          </h1>
          <p className="dash-hero-desc">
            Direct access to coded engineering lecture notes, solved previous exam questions, and instructor guidelines.
          </p>

          <div className="dash-hero-quicklinks">
            <button onClick={() => navigate('/feed')} className="dash-hero-btn primary">
              <MessageSquare size={16} /> Community Feed
            </button>
            <button onClick={() => navigate('/profile')} className="dash-hero-btn secondary">
              <User size={16} /> Student Profile
            </button>
            <button onClick={() => navigate('/computer-architecture/shafiullah-suggestions')} className="dash-hero-btn ghost">
              <GraduationCap size={16} /> Faculty Guidelines
            </button>
          </div>
        </div>

        <div className="dash-hero-stats-panel">
          <div className="dash-hud-stat">
            <div className="dash-hud-number">4</div>
            <div className="dash-hud-label">Major Courses</div>
          </div>
          <div className="dash-hud-stat">
            <div className="dash-hud-number">{ALL_TOPICS.length}+</div>
            <div className="dash-hud-label">Coded Topics</div>
          </div>
          <div className="dash-hud-stat">
            <div className="dash-hud-number">100%</div>
            <div className="dash-hud-label">Coded In-App</div>
          </div>
          <div className="dash-hud-stat">
            <div className="dash-hud-number">Free</div>
            <div className="dash-hud-label">Student Access</div>
          </div>
        </div>
      </header>

      {/* 2. CORE COURSES COMMAND GRID */}
      <section className="dash-section-wrap">
        <div className="dash-section-title-row">
          <div>
            <h2 className="dash-sec-title">
              <BookOpen size={20} className="dash-sec-icon" /> Core Academic Stations
            </h2>
            <p className="dash-sec-subtitle">Comprehensive subject notes, slides, and syllabus breakdowns</p>
          </div>
        </div>

        <div className="dash-stations-grid">
          {CORE_COURSES.map((course) => {
            const Icon = course.icon;
            return (
              <div 
                key={course.id}
                className="dash-station-card"
                style={{
                  '--accent': course.color,
                  '--accent-bg': course.accentBg,
                  '--border-color': course.borderColor
                }}
                onClick={() => navigate(course.path)}
              >
                <div className="dash-station-top">
                  <div className="dash-station-icon-wrap">
                    <Icon size={24} color={course.color} />
                  </div>
                  <span className="dash-station-code">{course.code}</span>
                </div>

                <h3 className="dash-station-title">{course.title}</h3>
                <p className="dash-station-desc">{course.desc}</p>

                <div className="dash-station-segments">
                  {course.segments.map((seg, idx) => (
                    <span key={idx} className="dash-station-seg-chip">{seg}</span>
                  ))}
                </div>

                <div className="dash-station-footer">
                  <span className="dash-station-stats">{course.stats}</span>
                  <span className="dash-station-action">
                    Launch Hub <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HIGH-YIELD EXAM SOLVES (CRUNCH PREP) */}
      <section className="dash-section-wrap">
        <div className="dash-section-title-row">
          <div>
            <h2 className="dash-sec-title">
              <Flame size={20} className="dash-sec-icon flame" /> High-Yield Exam Solves
            </h2>
            <p className="dash-sec-subtitle">Most frequently referenced exam questions and numerical derivations</p>
          </div>
        </div>

        <div className="dash-solves-grid">
          {HIGH_YIELD_SOLVES.map((item) => (
            <div 
              key={item.id}
              className="dash-solve-card"
              onClick={() => navigate(item.path)}
            >
              <div className="dash-solve-header">
                <span className="dash-solve-tag" style={{ borderColor: item.color, color: item.color }}>
                  {item.tag}
                </span>
                <span className="dash-solve-badge">{item.badge}</span>
              </div>
              <h4 className="dash-solve-title">{item.title}</h4>
              <p className="dash-solve-desc">{item.desc}</p>
              <div className="dash-solve-cta" style={{ color: item.color }}>
                <span>Open Complete Solution</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE TOPIC EXPLORER & SEARCH */}
      <section className="dash-section-wrap">
        <div className="dash-section-title-row">
          <div>
            <h2 className="dash-sec-title">
              <Compass size={20} className="dash-sec-icon" /> Curriculum & Notes Explorer
            </h2>
            <p className="dash-sec-subtitle">Filter by subject or search across all verified study notes</p>
          </div>
        </div>

        {/* Filter Navigation Tabs + Search Bar */}
        <div className="dash-explorer-toolbar">
          
          <div className="dash-filter-tabs">
            <button 
              className={`dash-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Topics ({ALL_TOPICS.length})
            </button>
            <button 
              className={`dash-tab-btn ${activeTab === 'pq' ? 'active' : ''}`}
              onClick={() => setActiveTab('pq')}
            >
              <Flame size={14} /> Exam Solves
            </button>
            <button 
              className={`dash-tab-btn ${activeTab === 'ca' ? 'active' : ''}`}
              onClick={() => setActiveTab('ca')}
            >
              Architecture
            </button>
            <button 
              className={`dash-tab-btn ${activeTab === 'compiler' ? 'active' : ''}`}
              onClick={() => setActiveTab('compiler')}
            >
              Compiler
            </button>
            <button 
              className={`dash-tab-btn ${activeTab === 'eee' ? 'active' : ''}`}
              onClick={() => setActiveTab('eee')}
            >
              EEE
            </button>
            <button 
              className={`dash-tab-btn ${activeTab === 'sad' ? 'active' : ''}`}
              onClick={() => setActiveTab('sad')}
            >
              SAD
            </button>
          </div>

          <div className="dash-search-container">
            <Search size={16} className="dash-search-icon-inside" />
            <input 
              type="text" 
              placeholder="Search concepts, datapath, math solve, formulas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dash-search-input-field"
            />
            {search && (
              <button onClick={() => setSearch('')} className="dash-search-clear">
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Topic Grid */}
        {filteredTopics.length === 0 ? (
          <div className="dash-empty-state">
            <HelpCircle size={40} className="dash-empty-icon" />
            <h3>No topics match your search</h3>
            <p>Try searching for terms like "MIPS", "Cache", "Parsing", "RTD", or "Bridge".</p>
            <button onClick={() => { setSearch(''); setActiveTab('all'); }} className="dash-reset-btn">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="dash-notes-matrix">
            {filteredTopics.map((topic) => (
              <div 
                key={topic.id}
                className="dash-note-matrix-card"
                onClick={() => navigate(topic.path)}
              >
                <div className="dash-matrix-header">
                  <span className="dash-matrix-cat">{topic.category}</span>
                  <span className="dash-matrix-seg">{topic.segment}</span>
                </div>

                <h4 className="dash-matrix-title">{topic.title}</h4>
                <p className="dash-matrix-desc">{topic.desc}</p>

                <div className="dash-matrix-footer">
                  <span className="dash-matrix-course-label">{topic.courseName}</span>
                  <span className="dash-matrix-link">
                    Read Note <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* 5. FACULTY SUGGESTIONS & ACADEMIC SUPPORT */}
      <footer className="dash-faculty-spotlight">
        <div className="dash-faculty-card">
          <div className="dash-faculty-info">
            <span className="dash-faculty-tag">Faculty Exam Suggestions</span>
            <h3>Exam Preparation Checklists & Guidelines</h3>
            <p>Direct exam suggestions for Computer Architecture provided by Shafiullah Sir and Amanullah Sir.</p>
          </div>
          <div className="dash-faculty-actions">
            <button 
              onClick={() => navigate('/computer-architecture/shafiullah-suggestions')} 
              className="dash-faculty-btn"
            >
              Shafiullah Sir Guidelines <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => navigate('/computer-architecture/amanullah-guidelines')} 
              className="dash-faculty-btn"
            >
              Amanullah Sir Checklist <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;
