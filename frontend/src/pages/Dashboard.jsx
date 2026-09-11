import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
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
  Compass
} from 'lucide-react';
import './Dashboard.css';

const CURATED_TOPICS = [
  // Computer Architecture
  {
    id: 'ca-single-multi',
    title: 'Single-Cycle vs Multi-Cycle Datapath',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '05',
    category: 'Architecture',
    path: '/computer-architecture/single-vs-multi-cycle',
    desc: 'Core comparison of clock cycles, CPI, execution equations and hardware differences'
  },
  {
    id: 'ca-pq-solve',
    title: 'Previous Question Solve (Mahir & Shafiul)',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '06',
    category: 'Exam Solve',
    path: '/computer-architecture/segment-06/previous-question-solve',
    desc: 'Complete detailed step-by-step solutions for segment 06 exam questions'
  },
  {
    id: 'ca-cache-mapping',
    title: 'Cache Memory & Cache Mapping Techniques',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '07',
    category: 'Memory Hierarchy',
    path: '/computer-architecture/segment-07/cache-mapping',
    desc: 'Direct, Associative, and Set-Associative mapping calculations & tag formats'
  },
  {
    id: 'ca-tlb-pagefault',
    title: 'TLB & Page Fault Handling Mechanisms',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '07',
    category: 'Virtual Memory',
    path: '/computer-architecture/segment-07/tlb',
    desc: 'Translation Lookaside Buffer flow, page tables, and page fault resolution'
  },
  {
    id: 'ca-dma-handshake',
    title: 'DMA & Handshaking Protocol',
    course: 'ca',
    courseName: 'CSE-3523 (CA)',
    segment: '08',
    category: 'I/O Interface',
    path: '/computer-architecture/segment-08/dma',
    desc: 'Direct Memory Access cycles, bus arbitration, and asynchronous handshaking'
  },
  // Compiler Design
  {
    id: 'compiler-seg04',
    title: 'Lexical Analysis & Symbol Tables',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '04',
    category: 'Front-End',
    path: '/compiler/segment-04',
    desc: 'Tokenization, regular expressions, transition diagrams and symbol tables'
  },
  {
    id: 'compiler-seg06',
    title: 'Syntax Analysis & Top-Down Parsing',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '06',
    category: 'Parsing',
    path: '/compiler/segment-06',
    desc: 'LL(1) parsing tables, FIRST and FOLLOW set computations'
  },
  {
    id: 'compiler-seg07',
    title: 'Bottom-Up Parsing & LR Parsers',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '07',
    category: 'Parsing',
    path: '/compiler/segment-07',
    desc: 'Shift-reduce parsing, LR(0), SLR(1), and LALR parser construction'
  },
  {
    id: 'compiler-seg08',
    title: 'Code Generation & Optimization',
    course: 'compiler',
    courseName: 'CSE-3527 (Compiler)',
    segment: '08',
    category: 'Back-End',
    path: '/compiler/segment-08',
    desc: 'Three-address code, intermediate representations, and register allocation'
  },
  // EEE & Instrumentation
  {
    id: 'eee-dfm-pq',
    title: 'Digital Frequency Meter (DFM) Exam Solve',
    course: 'eee',
    courseName: 'EEE-2421',
    segment: '08',
    category: 'Exam Solve',
    path: '/eee/dfm-pq',
    desc: 'Previous exam questions, time base circuitry, and counter mechanics'
  },
  {
    id: 'eee-strain-gauge',
    title: 'Strain Gauge & Wheatstone Bridge Circuits',
    course: 'eee',
    courseName: 'EEE-2421',
    segment: '05',
    category: 'Transducers',
    path: '/eee/strain-gauge',
    desc: 'Gauge factor calculations, quarter/half/full bridge circuit analysis'
  },
  {
    id: 'eee-thermocouple-math',
    title: 'Thermocouple & RTD Mathematical Solves',
    course: 'eee',
    courseName: 'EEE-2421',
    segment: '06',
    category: 'Math & Circuit',
    path: '/eee/thermocouple-math',
    desc: 'Seebeck effect equations, temperature coefficient of resistance & formulas'
  },
  {
    id: 'eee-pv-cell',
    title: 'Photovoltaic (PV) Cells & Opto-Electronics',
    course: 'eee',
    courseName: 'EEE-2421',
    segment: '07',
    category: 'Opto-Electronics',
    path: '/eee/pv-cell',
    desc: 'Solar cell I-V characteristics, fill factor calculations, and efficiencies'
  },
  // SAD
  {
    id: 'sad-seg08',
    title: 'System Analysis & Design Methodologies',
    course: 'sad',
    courseName: 'CSE-3611 (SAD)',
    segment: '08',
    category: 'Systems',
    path: '/system-analysis-design/segment-08',
    desc: 'Data Flow Diagrams (DFD), system requirements, and architectural modeling'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('profile-update'));
    navigate('/login');
  };

  // Filter curated topics in real-time
  const filteredTopics = CURATED_TOPICS.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.desc.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = courseFilter === 'all' || t.course === courseFilter;
    const matchesSegment = segmentFilter === 'all' || t.segment === segmentFilter;
    return matchesSearch && matchesCourse && matchesSegment;
  });

  const courses = [
    {
      id: 'compiler',
      name: 'Compiler Design',
      code: 'CSE-3527',
      path: '/compiler',
      desc: 'Lexical analysis, parsing, syntax trees & code gen',
      icon: Terminal,
      color: '#38bdf8',
      gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.02))',
      border: 'rgba(56, 189, 248, 0.25)',
      badge: 'Segments 04, 06, 07, 08'
    },
    {
      id: 'ca',
      name: 'Computer Architecture',
      code: 'CSE-3523',
      path: '/computer-architecture',
      desc: 'MIPS datapath, multi-cycle, cache, TLB & DMA',
      icon: Cpu,
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.02))',
      border: 'rgba(168, 85, 247, 0.25)',
      badge: 'Segments 05, 06, 07, 08'
    },
    {
      id: 'eee',
      name: 'EEE & Instrumentation',
      code: 'EEE-2421',
      path: '/eee',
      desc: 'Transducers, PV cell, RTD, Strain gauge & math',
      icon: Zap,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.02))',
      border: 'rgba(245, 158, 11, 0.25)',
      badge: 'All Segments + PQs'
    },
    {
      id: 'sad',
      name: 'System Analysis & Design',
      code: 'CSE-3611',
      path: '/system-analysis-design',
      desc: 'SDLC methodologies, DFDs & systems engineering',
      icon: LayoutGrid,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.02))',
      border: 'rgba(16, 185, 129, 0.25)',
      badge: 'Segment 08'
    }
  ];

  return (
    <div className="dash-root">
      
      {/* 1. HERO GREETING BANNER */}
      <section className="dash-hero">
        <div className="dash-hero-info">
          <div className="dash-hero-badge">
            <Sparkles size={14} /> Student Workspace
          </div>
          <h1 className="dash-hero-title">
            Welcome back, <span className="dash-hero-name">{user ? user.fullName.split(' ')[0] : 'Student'}</span>
          </h1>
          <p className="dash-hero-subtitle">
            Curated engineering notes, solved exam questions, and syllabus guides.
          </p>
        </div>

        <div className="dash-hero-actions">
          <button onClick={() => navigate('/feed')} className="dash-btn-cta primary">
            <MessageSquare size={16} /> Community Feed
          </button>
          <button onClick={() => navigate('/profile')} className="dash-btn-cta secondary">
            <User size={16} /> Profile
          </button>
        </div>
      </section>

      {/* 2. CORE COURSES QUICK-ACCESS */}
      <section className="dash-section">
        <div className="dash-section-header">
          <div>
            <h2 className="dash-section-title">Core Courses</h2>
            <p className="dash-section-sub">Direct access to curriculum notes, slides, and syllabus segments</p>
          </div>
        </div>

        <div className="dash-courses-grid">
          {courses.map((c) => {
            const IconComponent = c.icon;
            return (
              <div 
                key={c.id}
                className="dash-course-card"
                style={{
                  '--accent': c.color,
                  '--card-gradient': c.gradient,
                  '--card-border': c.border
                }}
                onClick={() => navigate(c.path)}
              >
                <div className="dash-course-top">
                  <div className="dash-course-icon-wrap">
                    <IconComponent size={24} color={c.color} />
                  </div>
                  <span className="dash-course-badge">{c.badge}</span>
                </div>

                <div className="dash-course-body">
                  <span className="dash-course-code">{c.code}</span>
                  <h3 className="dash-course-name">{c.name}</h3>
                  <p className="dash-course-desc">{c.desc}</p>
                </div>

                <div className="dash-course-footer">
                  <span>Explore Syllabus</span>
                  <ArrowRight size={16} className="dash-course-arrow" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MAIN WORKSPACE GRID */}
      <div className="dash-main-grid">
        
        {/* LEFT COLUMN: Student Profile & Quick Shortcuts */}
        <aside className="dash-left-col">
          
          {/* User Profile Card */}
          <div className="dash-profile-card">
            <div className="dash-avatar-wrapper">
              <div className="dash-avatar">
                {user && user.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="dash-online-status" title="Active"></div>
            </div>

            <h3 className="dash-profile-name">{user ? user.fullName : 'Engineering Student'}</h3>
            <p className="dash-profile-email">{user ? user.email : ''}</p>

            <div className="dash-profile-tags">
              <span className="dash-tag dept">
                {user && user.department ? user.department : 'Dept of CSE'}
              </span>
              <span className="dash-tag sem">
                {user && user.semester ? `Semester ${user.semester}` : 'Semester 5'}
              </span>
              {user && user.isAdmin && (
                <span className="dash-tag admin">Admin</span>
              )}
            </div>

            <div className="dash-profile-stats">
              <div className="dash-stat-box">
                <span className="dash-stat-num">{CURATED_TOPICS.length}</span>
                <span className="dash-stat-label">Topics</span>
              </div>
              <div className="dash-stat-box">
                <span className="dash-stat-num">4</span>
                <span className="dash-stat-label">Courses</span>
              </div>
            </div>

            <button onClick={handleLogout} className="dash-btn-logout">
              <LogOut size={15} /> Log Out
            </button>
          </div>

          {/* Quick Study Shortcuts */}
          <div className="dash-shortcuts-card">
            <h4 className="dash-shortcuts-title">
              <Layers size={16} /> Quick Shortcuts
            </h4>
            
            <div className="dash-shortcut-items">
              <div 
                className="dash-shortcut-item"
                onClick={() => navigate('/computer-architecture/segment-06/previous-question-solve')}
              >
                <FileText size={15} className="shortcut-icon" />
                <div className="shortcut-text">
                  <span>CA Prev Question Solve</span>
                  <small>Segment 06 Solutions</small>
                </div>
                <ArrowRight size={14} className="shortcut-arrow" />
              </div>

              <div 
                className="dash-shortcut-item"
                onClick={() => navigate('/computer-architecture/single-vs-multi-cycle')}
              >
                <Cpu size={15} className="shortcut-icon" />
                <div className="shortcut-text">
                  <span>Single vs Multi-Cycle</span>
                  <small>Architecture Note</small>
                </div>
                <ArrowRight size={14} className="shortcut-arrow" />
              </div>

              <div 
                className="dash-shortcut-item"
                onClick={() => navigate('/eee/dfm-pq')}
              >
                <Zap size={15} className="shortcut-icon" />
                <div className="shortcut-text">
                  <span>DFM Previous Questions</span>
                  <small>EEE Exam Prep</small>
                </div>
                <ArrowRight size={14} className="shortcut-arrow" />
              </div>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Curated Topic Directory (100% Coded Notes) */}
        <main className="dash-right-col">
          <div className="dash-hub-card">
            
            {/* Hub Header */}
            <div className="dash-hub-header">
              <div>
                <h3 className="dash-hub-title">
                  <Compass size={20} className="dash-hub-icon" /> Syllabus & Topic Directory
                </h3>
                <p className="dash-hub-subtitle">
                  Browse and instantly open lecture notes, solved past papers, and diagrams.
                </p>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="dash-hub-controls">
              
              {/* Search Bar */}
              <div className="dash-search-box">
                <Search size={16} className="dash-search-icon" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by topic title, concept or exam solve..."
                  className="dash-search-input"
                />
              </div>

              {/* Course & Segment Dropdowns */}
              <div className="dash-filter-pills">
                <div className="dash-select-wrap">
                  <BookOpen size={14} />
                  <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                    <option value="all">All Courses</option>
                    <option value="compiler">CSE-3527 (Compiler)</option>
                    <option value="ca">CSE-3523 (CA)</option>
                    <option value="eee">EEE-2421</option>
                    <option value="sad">CSE-3611 (SAD)</option>
                  </select>
                </div>

                <div className="dash-select-wrap">
                  <BookmarkCheck size={14} />
                  <select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)}>
                    <option value="all">All Segments</option>
                    <option value="04">Segment 04</option>
                    <option value="05">Segment 05</option>
                    <option value="06">Segment 06</option>
                    <option value="07">Segment 07</option>
                    <option value="08">Segment 08</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Topic Directory List */}
            {filteredTopics.length === 0 ? (
              <div className="dash-hub-empty">
                <div className="dash-empty-sparkle">
                  <Sparkles size={28} />
                </div>
                <h4>No topics found</h4>
                <p>Try searching for a different keyword like "MIPS", "TLB", "Parsing", or "RTD".</p>
              </div>
            ) : (
              <div className="dash-hub-grid">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="dash-topic-card"
                    onClick={() => navigate(topic.path)}
                  >
                    <div className="dash-topic-top">
                      <span className="dash-topic-tag">{topic.category}</span>
                      <span className="dash-topic-seg">Seg {topic.segment}</span>
                    </div>

                    <h4 className="dash-topic-title">{topic.title}</h4>
                    <p className="dash-topic-desc">{topic.desc}</p>

                    <div className="dash-topic-footer">
                      <span className="dash-topic-course">{topic.courseName}</span>
                      <span className="dash-topic-link">
                        Read Note <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>

      </div>

    </div>
  );
};

export default Dashboard;
