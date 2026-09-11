import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Search, 
  BookOpen, 
  Plus, 
  Folder, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Zap, 
  LayoutGrid, 
  ArrowRight, 
  User, 
  ExternalLink,
  Layers,
  FileText,
  MessageSquare
} from 'lucide-react';
import './Dashboard.css';
import { getApiUrl } from '../config';
import DynamicNoteCard from '../components/DynamicNoteCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Dynamic uploads state
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const fetchApprovedUploads = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/materials?status=approved'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUploads(data);
      }
    } catch (err) {
      console.error('Error fetching approved materials on dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
      fetchApprovedUploads();
    }
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.error('Logout request failed:', err);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('profile-update'));
    navigate('/login');
  };

  // Filter uploads client-side
  const filteredUploads = uploads.filter((u) => {
    const matchesSearch = u.title.toLowerCase().includes(search.toLowerCase()) || 
      (u.description && u.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCourse = courseFilter === 'all' || u.course === courseFilter;
    const matchesSegment = segmentFilter === 'all' || u.segment === segmentFilter;
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
            Curated notes, exam solutions, and peer resources for your semester.
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
                <span className="dash-stat-num">{uploads.length}</span>
                <span className="dash-stat-label">Materials</span>
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

        {/* RIGHT COLUMN: Shared Resources Hub */}
        <main className="dash-right-col">
          <div className="dash-hub-card">
            
            {/* Hub Header */}
            <div className="dash-hub-header">
              <div>
                <h3 className="dash-hub-title">
                  <BookOpen size={20} className="dash-hub-icon" /> Shared Resources Hub
                </h3>
                <p className="dash-hub-subtitle">
                  Class notes, slides, and exam preparation guides curated for CSE.
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
                  placeholder="Search resources by title or keyword..."
                  className="dash-search-input"
                />
              </div>

              {/* Course & Segment Dropdowns */}
              <div className="dash-filter-pills">
                <div className="dash-select-wrap">
                  <BookOpen size={14} />
                  <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                    <option value="all">All Courses</option>
                    <option value="eee">EEE-2421</option>
                    <option value="ca">CSE-3523 (CA)</option>
                    <option value="compiler">CSE-3527 (Compiler)</option>
                    <option value="sad">CSE-3611 (SAD)</option>
                  </select>
                </div>

                <div className="dash-select-wrap">
                  <Folder size={14} />
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

            {/* Resources Content List */}
            {loading ? (
              <div className="dash-hub-loading">
                <div className="dash-spinner"></div>
                <p>Loading shared materials...</p>
              </div>
            ) : filteredUploads.length === 0 ? (
              <div className="dash-hub-empty">
                <div className="dash-empty-sparkle">
                  <Sparkles size={28} />
                </div>
                <h4>No materials found</h4>
                <p>Try adjusting your search query or filters to discover resources.</p>
              </div>
            ) : (
              <div className="dash-hub-grid">
                {filteredUploads.map((upload) => (
                  <DynamicNoteCard
                    key={upload._id}
                    upload={upload}
                    onClick={() => navigate(`/materials/view/${upload._id}`)}
                  />
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
