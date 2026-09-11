import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Award, 
  Target, 
  Sparkles, 
  BarChart3,
  Layers,
  PlusCircle,
  FolderPlus,
  Compass,
  CheckCircle2
} from 'lucide-react';
import './Dashboard.css';

// Master syllabus topics array - starts completely fresh (empty) for user to add
const SYLLABUS_TOPICS = [];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [completedTopics, setCompletedTopics] = useState({});
  const [activityMap, setActivityMap] = useState({});
  const [streakDays, setStreakDays] = useState(1);
  const [hoveredDate, setHoveredDate] = useState(null);

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

      // Load activity heatmap
      const savedActivity = localStorage.getItem(`cse_heatmap_${userKey}`);
      if (savedActivity) {
        setActivityMap(JSON.parse(savedActivity));
      } else {
        const todayStr = new Date().toISOString().split('T')[0];
        const initialMap = { [todayStr]: 1 };
        setActivityMap(initialMap);
        localStorage.setItem(`cse_heatmap_${userKey}`, JSON.stringify(initialMap));
      }

    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  // Compute 17-week GitHub Calendar Grid
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
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

  const totalActiveDays = Object.values(activityMap).filter(v => v > 0).length;
  const studentFirstName = user?.fullName ? user.fullName.split(' ')[0] : 'Engineer';

  return (
    <div className="perf-dashboard-root">
      
      {/* 1. TOP PERFORMANCE HEADER */}
      <header className="perf-header-card">
        <div className="perf-header-info">
          <div className="perf-badge">
            <BarChart3 size={14} /> Clean Canvas Workspace
          </div>
          <h1 className="perf-student-name">
            Welcome, <span className="dash-glow-text">{studentFirstName}</span>
          </h1>
          <p className="perf-subtext">
            All legacy notes have been cleared. Performance analytics and GitHub-style revision tracker are active.
          </p>

          <div className="perf-stats-strip">
            <div className="perf-metric">
              <span className="perf-metric-val">0 Courses</span>
              <span className="perf-metric-lbl">Curriculum</span>
            </div>
            <div className="perf-metric-divider"></div>
            <div className="perf-metric">
              <span className="perf-metric-val">0 / 0</span>
              <span className="perf-metric-lbl">Topics Logged</span>
            </div>
            <div className="perf-metric-divider"></div>
            <div className="perf-metric">
              <span className="perf-metric-val streak">
                <Flame size={18} className="flame-pulse" /> {streakDays} Day
              </span>
              <span className="perf-metric-lbl">Active Streak</span>
            </div>
            <div className="perf-metric-divider"></div>
            <div className="perf-metric">
              <span className="perf-metric-val countdown">
                <Sparkles size={16} /> Ready
              </span>
              <span className="perf-metric-lbl">Clean Start</span>
            </div>
          </div>
        </div>

        {/* Circular Overall Score Widget */}
        <div className="perf-radial-wrapper">
          <div className="perf-radial-circle" style={{ '--score-deg': '0deg' }}>
            <div className="perf-radial-inner">
              <span className="perf-radial-num">100%</span>
              <span className="perf-radial-tag">Fresh</span>
            </div>
          </div>
          <span className="perf-radial-caption">⚡ Clean Slate</span>
        </div>
      </header>

      {/* 2. GITHUB-STYLE STUDY ACTIVITY HEATMAP */}
      <section className="perf-heatmap-card">
        <div className="perf-card-title-row">
          <div className="perf-title-group">
            <Calendar size={20} className="perf-card-icon" />
            <div>
              <h2 className="perf-card-title">Study Revision Graph</h2>
              <p className="perf-card-sub">GitHub-style activity tracker (Records every time you study and revise)</p>
            </div>
          </div>

          <div className="perf-heatmap-summary-pills">
            <span className="perf-pill">
              <strong>{totalActiveDays}</strong> Active Days
            </span>
            <span className="perf-pill highlight">
              <Flame size={13} /> <strong>{streakDays} Day</strong> Streak
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
                <strong>{hoveredDate.count} revisions</strong> on {hoveredDate.formatted}
              </span>
            ) : (
              <span className="gh-hint">Hover over a date block to inspect activity logs</span>
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

      {/* 3. FRESH WORKSPACE NOTICE & GUIDE */}
      <section className="perf-checklist-card">
        <div className="fresh-canvas-hero">
          <div className="fresh-canvas-icon">
            <FolderPlus size={36} />
          </div>
          <h2 className="fresh-canvas-title">Ready for Your New Content</h2>
          <p className="fresh-canvas-desc">
            All previous lecture notes, slides, and exam solves have been completely purged. You now have full manual control to code your new courses, syllabus topics, and notes directly into the system.
          </p>

          <div className="fresh-canvas-features">
            <div className="fresh-feat-item">
              <CheckCircle2 size={16} color="#39d353" />
              <span>Full owner control & zero third-party uploads</span>
            </div>
            <div className="fresh-feat-item">
              <CheckCircle2 size={16} color="#39d353" />
              <span>GitHub heatmap ready to track revision habits</span>
            </div>
            <div className="fresh-feat-item">
              <CheckCircle2 size={16} color="#39d353" />
              <span>Performance and syllabus checklist ready for new subjects</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
