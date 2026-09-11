import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Award, 
  Target, 
  ArrowRight, 
  Search, 
  Sparkles, 
  RotateCcw,
  Zap,
  Terminal,
  Cpu,
  LayoutGrid,
  Filter,
  BarChart3,
  CheckCheck
} from 'lucide-react';
import './Dashboard.css';

// Master syllabus topics for tracking
const SYLLABUS_TOPICS = [
  // Computer Architecture
  { id: 'ca-1', course: 'ca', courseCode: 'CSE-3523', title: 'Single-Cycle vs Multi-Cycle Datapath', path: '/computer-architecture/single-vs-multi-cycle', category: 'Datapath', difficulty: 'High' },
  { id: 'ca-2', course: 'ca', courseCode: 'CSE-3523', title: 'CA Previous Questions (Shafiul & Mahir)', path: '/computer-architecture/segment-06/previous-question-solve', category: 'Exam Solve', difficulty: 'Critical' },
  { id: 'ca-3', course: 'ca', courseCode: 'CSE-3523', title: 'Cache Memory & Cache Mapping Techniques', path: '/computer-architecture/segment-07/cache-mapping', category: 'Memory', difficulty: 'High' },
  { id: 'ca-4', course: 'ca', courseCode: 'CSE-3523', title: 'TLB & Page Fault Handling Mechanisms', path: '/computer-architecture/segment-07/tlb', category: 'Virtual Memory', difficulty: 'Medium' },
  { id: 'ca-5', course: 'ca', courseCode: 'CSE-3523', title: 'DMA & Handshaking Bus Arbitration', path: '/computer-architecture/segment-08/dma', category: 'I/O', difficulty: 'Medium' },
  { id: 'ca-6', course: 'ca', courseCode: 'CSE-3523', title: 'Shafiullah Sir Exam Suggestions', path: '/computer-architecture/shafiullah-suggestions', category: 'Guidelines', difficulty: 'Critical' },
  { id: 'ca-7', course: 'ca', courseCode: 'CSE-3523', title: 'Amanullah Sir Architecture Guidelines', path: '/computer-architecture/amanullah-guidelines', category: 'Guidelines', difficulty: 'High' },

  // Compiler Design
  { id: 'comp-1', course: 'compiler', courseCode: 'CSE-3527', title: 'Lexical Analysis & Symbol Tables (Seg 04)', path: '/compiler/segment-04', category: 'Lexical', difficulty: 'Medium' },
  { id: 'comp-2', course: 'compiler', courseCode: 'CSE-3527', title: 'Syntax Analysis & Top-Down LL(1) (Seg 06)', path: '/compiler/segment-06', category: 'Parsing', difficulty: 'High' },
  { id: 'comp-3', course: 'compiler', courseCode: 'CSE-3527', title: 'Bottom-Up Parsing & LR Parsers (Seg 07)', path: '/compiler/segment-07', category: 'Parsing', difficulty: 'High' },
  { id: 'comp-4', course: 'compiler', courseCode: 'CSE-3527', title: 'Code Generation & 3-Address Code (Seg 08)', path: '/compiler/segment-08', category: 'Back-End', difficulty: 'High' },

  // EEE & Instrumentation
  { id: 'eee-1', course: 'eee', courseCode: 'EEE-2421', title: 'Digital Frequency Meter (DFM) Exam Solve', path: '/eee/dfm-pq', category: 'Exam Solve', difficulty: 'Critical' },
  { id: 'eee-2', course: 'eee', courseCode: 'EEE-2421', title: 'Strain Gauge & Wheatstone Bridge Math', path: '/eee/strain-gauge', category: 'Transducers', difficulty: 'High' },
  { id: 'eee-3', course: 'eee', courseCode: 'EEE-2421', title: 'Strain Gauge Previous Year Question Solve', path: '/eee/strain-gauge-pq', category: 'Exam Solve', difficulty: 'Critical' },
  { id: 'eee-4', course: 'eee', courseCode: 'EEE-2421', title: 'Thermocouple & RTD Mathematical Solves', path: '/eee/thermocouple-math', category: 'Math Solve', difficulty: 'High' },
  { id: 'eee-5', course: 'eee', courseCode: 'EEE-2421', title: 'PV Cell Opto-Electronics & Fill Factor', path: '/eee/pv-cell', category: 'Opto', difficulty: 'Medium' },
  { id: 'eee-6', course: 'eee', courseCode: 'EEE-2421', title: 'PV Cell Previous Questions Solve', path: '/eee/pv-cell-pq', category: 'Exam Solve', difficulty: 'Critical' },
  { id: 'eee-7', course: 'eee', courseCode: 'EEE-2421', title: 'EEE Group A Comprehensive Solved Topics', path: '/eee/group-a', category: 'Exam Solve', difficulty: 'Critical' },

  // SAD
  { id: 'sad-1', course: 'sad', courseCode: 'CSE-3611', title: 'System Analysis & Design Methodologies (Seg 08)', path: '/system-analysis-design/segment-08', category: 'Systems', difficulty: 'Medium' }
];

const COURSE_METRICS = [
  { id: 'ca', name: 'Computer Architecture', code: 'CSE-3523', icon: Cpu, color: '#a855f7', total: 7 },
  { id: 'compiler', name: 'Compiler Design', code: 'CSE-3527', icon: Terminal, color: '#38bdf8', total: 4 },
  { id: 'eee', name: 'EEE & Instrumentation', code: 'EEE-2421', icon: Zap, color: '#f59e0b', total: 7 },
  { id: 'sad', name: 'System Analysis & Design', code: 'CSE-3611', icon: LayoutGrid, color: '#10b981', total: 1 }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [completedTopics, setCompletedTopics] = useState({});
  const [activityMap, setActivityMap] = useState({});
  const [streakDays, setStreakDays] = useState(4);
  const [filterCourse, setFilterCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredDate, setHoveredDate] = useState(null);
  const [targetExamDays, setTargetExamDays] = useState(18);

  // Load User and Student Progress from LocalStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      const userKey = parsedUser.email || 'guest';

      // Load completed topics
      const savedCompleted = localStorage.getItem(`cse_completed_${userKey}`);
      if (savedCompleted) {
        setCompletedTopics(JSON.parse(savedCompleted));
      } else {
        // Default initial completed set (realistic starting point)
        const initial = { 'ca-1': true, 'ca-2': true, 'comp-1': true, 'eee-1': true };
        setCompletedTopics(initial);
        localStorage.setItem(`cse_completed_${userKey}`, JSON.stringify(initial));
      }

      // Load Activity Heatmap history
      const savedActivity = localStorage.getItem(`cse_heatmap_${userKey}`);
      if (savedActivity) {
        setActivityMap(JSON.parse(savedActivity));
      } else {
        // Generate a vibrant realistic GitHub activity pattern for past 112 days (16 weeks)
        const sampleActivity = generateInitialHeatmap();
        setActivityMap(sampleActivity);
        localStorage.setItem(`cse_heatmap_${userKey}`, JSON.stringify(sampleActivity));
      }

    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  // Seed sample past activity so the graph isn't a blank void on first load
  const generateInitialHeatmap = () => {
    const map = {};
    const today = new Date();
    for (let i = 112; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      // Random study intensity: mostly active on weekdays, intense near exams
      const dayOfWeek = d.getDay();
      const rand = Math.random();
      if (i === 0) {
        map[dateStr] = 3; // Today active
      } else if (i < 14) {
        // Past 2 weeks very active
        map[dateStr] = rand > 0.3 ? Math.floor(rand * 4) + 1 : 0;
      } else {
        // General distribution
        if (dayOfWeek !== 5 && rand > 0.45) {
          map[dateStr] = Math.floor(rand * 3) + 1;
        } else {
          map[dateStr] = 0;
        }
      }
    }
    return map;
  };

  // Toggle topic completion
  const handleToggleTopic = (topicId) => {
    if (!user) return;
    const userKey = user.email || 'guest';
    const isNowDone = !completedTopics[topicId];
    const updated = { ...completedTopics, [topicId]: isNowDone };
    setCompletedTopics(updated);
    localStorage.setItem(`cse_completed_${userKey}`, JSON.stringify(updated));

    // Log study activity to today's date in GitHub heatmap
    const todayStr = new Date().toISOString().split('T')[0];
    const currentTodayVal = activityMap[todayStr] || 0;
    const updatedMap = {
      ...activityMap,
      [todayStr]: isNowDone ? currentTodayVal + 1 : Math.max(0, currentTodayVal - 1)
    };
    setActivityMap(updatedMap);
    localStorage.setItem(`cse_heatmap_${userKey}`, JSON.stringify(updatedMap));
  };

  // Compute 16-week (112 days) GitHub Calendar Grid
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    // End on upcoming Saturday to complete the week column if needed
    const currentDayOfWeek = today.getDay(); // 0 is Sun
    const totalDaysToDisplay = 119; // 17 weeks * 7 days

    for (let i = totalDaysToDisplay - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = activityMap[dateStr] || 0;

      let level = 0;
      if (count >= 4) level = 4;
      else if (count === 3) level = 3;
      else if (count === 2) level = 2;
      else if (count === 1) level = 1;

      days.push({
        date: dateStr,
        count: count,
        level: level,
        dayOfWeek: d.getDay(),
        formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    return days;
  }, [activityMap]);

  // Overall calculations
  const totalTopicsCount = SYLLABUS_TOPICS.length;
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const overallPercentage = Math.round((completedCount / totalTopicsCount) * 100);

  // Course-specific progress
  const courseStats = useMemo(() => {
    return COURSE_METRICS.map(c => {
      const courseTopics = SYLLABUS_TOPICS.filter(t => t.course === c.id);
      const done = courseTopics.filter(t => completedTopics[t.id]).length;
      const pct = Math.round((done / courseTopics.length) * 100) || 0;
      return { ...c, done, total: courseTopics.length, pct };
    });
  }, [completedTopics]);

  // Total active days in calendar
  const totalActiveDays = Object.values(activityMap).filter(v => v > 0).length;

  // Filter topics for checklist
  const visibleTopics = SYLLABUS_TOPICS.filter(t => {
    const matchCourse = filterCourse === 'all' || t.course === filterCourse;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCourse && matchSearch;
  });

  return (
    <div className="perf-dashboard-root">
      
      {/* 1. TOP PERFORMANCE HEADER */}
      <header className="perf-header-card">
        <div className="perf-header-info">
          <div className="perf-badge">
            <BarChart3 size={14} /> Student Performance Analytics
          </div>
          <h1 className="perf-student-name">
            {user ? user.fullName : 'Engineering Student'}
          </h1>
          <p className="perf-subtext">
            Personal study velocity, syllabus coverage, and GitHub-style daily revision tracker.
          </p>

          <div className="perf-stats-strip">
            <div className="perf-metric">
              <span className="perf-metric-val">{completedCount} / {totalTopicsCount}</span>
              <span className="perf-metric-lbl">Topics Mastered</span>
            </div>
            <div className="perf-metric-divider"></div>
            <div className="perf-metric">
              <span className="perf-metric-val">{overallPercentage}%</span>
              <span className="perf-metric-lbl">Exam Readiness</span>
            </div>
            <div className="perf-metric-divider"></div>
            <div className="perf-metric">
              <span className="perf-metric-val streak">
                <Flame size={18} className="flame-pulse" /> {streakDays} Days
              </span>
              <span className="perf-metric-lbl">Active Streak</span>
            </div>
            <div className="perf-metric-divider"></div>
            <div className="perf-metric">
              <span className="perf-metric-val countdown">
                <Clock size={16} /> {targetExamDays}d left
              </span>
              <span className="perf-metric-lbl">Semester Finals</span>
            </div>
          </div>
        </div>

        {/* Circular Overall Score Widget */}
        <div className="perf-radial-wrapper">
          <div className="perf-radial-circle" style={{ '--score-deg': `${(overallPercentage / 100) * 360}deg` }}>
            <div className="perf-radial-inner">
              <span className="perf-radial-num">{overallPercentage}%</span>
              <span className="perf-radial-tag">Ready</span>
            </div>
          </div>
          <span className="perf-radial-caption">
            {overallPercentage >= 75 ? '🔥 Exam Ready' : overallPercentage >= 50 ? '⚡ Good Progress' : '📖 Keep Studying'}
          </span>
        </div>
      </header>

      {/* 2. GITHUB-STYLE STUDY ACTIVITY HEATMAP */}
      <section className="perf-heatmap-card">
        <div className="perf-card-title-row">
          <div className="perf-title-group">
            <Calendar size={20} className="perf-card-icon" />
            <div>
              <h2 className="perf-card-title">Study Revision Graph</h2>
              <p className="perf-card-sub">Daily revision activity across the semester (GitHub Activity Heatmap)</p>
            </div>
          </div>

          <div className="perf-heatmap-summary-pills">
            <span className="perf-pill">
              <strong>{totalActiveDays}</strong> Active Study Days
            </span>
            <span className="perf-pill highlight">
              <Flame size={13} /> <strong>{streakDays} Day</strong> Current Streak
            </span>
          </div>
        </div>

        {/* Heatmap Grid Container */}
        <div className="gh-heatmap-wrapper">
          
          <div className="gh-days-legend">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className="gh-heatmap-scroll">
            <div className="gh-grid">
              {calendarDays.map((item, index) => (
                <div
                  key={index}
                  className={`gh-box level-${item.level}`}
                  onMouseEnter={() => setHoveredDate(item)}
                  onMouseLeave={() => setHoveredDate(null)}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Heatmap Footer Legend & Hover Tooltip */}
        <div className="gh-heatmap-footer">
          <div className="gh-tooltip-display">
            {hoveredDate ? (
              <span>
                <strong>{hoveredDate.count} study revisions</strong> on {hoveredDate.formatted}
              </span>
            ) : (
              <span className="gh-hint">Hover over a block to view study logs</span>
            )}
          </div>

          <div className="gh-legend">
            <span className="gh-legend-label">Less</span>
            <span className="gh-box level-0"></span>
            <span className="gh-box level-1"></span>
            <span className="gh-box level-2"></span>
            <span className="gh-box level-3"></span>
            <span className="gh-box level-4"></span>
            <span className="gh-legend-label">More</span>
          </div>
        </div>
      </section>

      {/* 3. COURSE MASTERY BARS (PROGRESS TRACKER) */}
      <section className="perf-courses-section">
        <div className="perf-card-title-row">
          <div className="perf-title-group">
            <Target size={20} className="perf-card-icon" />
            <div>
              <h2 className="perf-card-title">Course Mastery Breakdown</h2>
              <p className="perf-card-sub">Real-time completion percentage for every core engineering subject</p>
            </div>
          </div>
        </div>

        <div className="perf-course-grid">
          {courseStats.map((c) => {
            const Icon = c.icon;
            return (
              <div 
                key={c.id} 
                className="perf-course-card"
                style={{ '--course-color': c.color }}
                onClick={() => setFilterCourse(filterCourse === c.id ? 'all' : c.id)}
              >
                <div className="perf-course-top">
                  <div className="perf-course-icon-box">
                    <Icon size={20} color={c.color} />
                  </div>
                  <span className="perf-course-code">{c.code}</span>
                </div>

                <h3 className="perf-course-name">{c.name}</h3>

                <div className="perf-course-numbers">
                  <span>{c.done} of {c.total} topics mastered</span>
                  <span className="perf-course-pct">{c.pct}%</span>
                </div>

                <div className="perf-prog-track">
                  <div 
                    className="perf-prog-fill" 
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  ></div>
                </div>

                <div className="perf-course-action-hint">
                  <span>{filterCourse === c.id ? 'Viewing topics below' : 'Filter checklist'}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE SYLLABUS CHECKLIST & PRACTICE */}
      <section className="perf-checklist-card">
        <div className="perf-checklist-header">
          <div className="perf-title-group">
            <CheckCheck size={20} className="perf-card-icon" />
            <div>
              <h2 className="perf-card-title">Interactive Syllabus Checklist</h2>
              <p className="perf-card-sub">Mark topics completed to update your readiness score and GitHub graph</p>
            </div>
          </div>

          <div className="perf-checklist-controls">
            {/* Filter Pills */}
            <div className="perf-filter-pills">
              <button 
                className={`perf-filter-btn ${filterCourse === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCourse('all')}
              >
                All ({SYLLABUS_TOPICS.length})
              </button>
              <button 
                className={`perf-filter-btn ${filterCourse === 'ca' ? 'active' : ''}`}
                onClick={() => setFilterCourse('ca')}
              >
                CA
              </button>
              <button 
                className={`perf-filter-btn ${filterCourse === 'compiler' ? 'active' : ''}`}
                onClick={() => setFilterCourse('compiler')}
              >
                Compiler
              </button>
              <button 
                className={`perf-filter-btn ${filterCourse === 'eee' ? 'active' : ''}`}
                onClick={() => setFilterCourse('eee')}
              >
                EEE
              </button>
              <button 
                className={`perf-filter-btn ${filterCourse === 'sad' ? 'active' : ''}`}
                onClick={() => setFilterCourse('sad')}
              >
                SAD
              </button>
            </div>

            {/* Search Box */}
            <div className="perf-checklist-search">
              <Search size={15} className="perf-search-ico" />
              <input 
                type="text" 
                placeholder="Search checklist topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Checklist Rows */}
        <div className="perf-topic-rows">
          {visibleTopics.map((topic) => {
            const isDone = !!completedTopics[topic.id];
            return (
              <div 
                key={topic.id} 
                className={`perf-topic-row ${isDone ? 'completed' : ''}`}
              >
                <button 
                  className={`perf-checkbox-btn ${isDone ? 'checked' : ''}`}
                  onClick={() => handleToggleTopic(topic.id)}
                  title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>

                <div className="perf-row-main" onClick={() => navigate(topic.path)}>
                  <div className="perf-row-top">
                    <span className="perf-topic-course-badge">{topic.courseCode}</span>
                    <span className="perf-topic-cat">{topic.category}</span>
                    <span className={`perf-topic-diff ${topic.difficulty.toLowerCase()}`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <h4 className="perf-row-title">{topic.title}</h4>
                </div>

                <div className="perf-row-actions">
                  <button 
                    onClick={() => navigate(topic.path)} 
                    className="perf-open-btn"
                  >
                    Open Note <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
