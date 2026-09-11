import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Bell, 
  Share2, 
  MoreVertical, 
  Eye, 
  Clock3, 
  CheckCircle2, 
  Circle,
  TrendingUp,
  Download,
  MoreHorizontal,
  CalendarDays,
  Pencil,
  Pin,
  Trash2,
  ArrowRight,
  LayoutGrid,
  List,
  ChevronDown
} from 'lucide-react';
import './Dashboard.css';

/* ──────────── STUDY GOALS (Month Goals) ──────────── */
const DEFAULT_GOALS = [
  { id: 'g1', text: 'Complete all mid-term revision notes', done: true },
  { id: 'g2', text: 'Practice 3 previous year papers', done: false },
  { id: 'g3', text: 'Finish assignment submissions', done: false },
  { id: 'g4', text: 'Read reference textbook chapters', done: false },
];

/* ──────────── WEEKLY DATA (line-chart simulation) ──────────── */
const WEEK_DATA = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  study:   [2, 3, 2, 4, 3, 5, 4],
  revision:[1, 2, 3, 2, 4, 3, 2],
};

/* ──────────── TASKS IN PROCESS ──────────── */
const DEFAULT_TASKS = [
  { id: 't1', title: 'Prepare for Midterm Exam', date: 'Today', icon: '📋' },
  { id: 't2', title: 'Submit Lab Assignment by Friday', date: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric' }), icon: '📤' },
];

/* ──────────── LAST PROJECTS / RECENT ACTIVITY ──────────── */
const RECENT_ITEMS = [
  { id: 'p1', title: 'Study Plan', status: 'In progress', desc: 'Done: Set weekly study timetable; Allocate revision slots; Buy …', color: '#1a1a1a' },
  { id: 'p2', title: 'Lab Report', status: 'Completed', desc: 'Done: Data collection; Analysis; Conclusion written; Submitted.', color: '#1a1a1a' },
  { id: 'p3', title: 'Group Project', status: 'In progress', desc: 'Done: Research phase complete; Starting prototype phase …', color: '#1a1a1a' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const canvasRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      navigate('/login');
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      setUser(null);
    }
  }, [navigate]);

  // Draw the weekly progress chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const maxVal = 6;
    const padL = 10, padR = 10, padT = 20, padB = 20;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const stepX = chartW / (WEEK_DATA.labels.length - 1);

    const drawLine = (data, color, fill) => {
      ctx.beginPath();
      data.forEach((val, i) => {
        const x = padL + i * stepX;
        const y = padT + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();

      if (fill) {
        ctx.lineTo(padL + (data.length - 1) * stepX, padT + chartH);
        ctx.lineTo(padL, padT + chartH);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        grad.addColorStop(0, fill);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw highlighted dot on the peak
      const peakIdx = data.indexOf(Math.max(...data));
      const px = padL + peakIdx * stepX;
      const py = padT + chartH - (data[peakIdx] / maxVal) * chartH;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // Label at peak
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(`+${data[peakIdx]}`, px, py - 10);
    };

    drawLine(WEEK_DATA.study, '#1a1a1a', 'rgba(26,26,26,0.06)');
    drawLine(WEEK_DATA.revision, '#b0b0b0', 'rgba(176,176,176,0.04)');
  }, []);

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const studentName = user?.fullName ? user.fullName.split(' ')[0] : 'Student';
  const completedGoals = goals.filter(g => g.done).length;

  // Compute stats
  const totalTopics = 19;
  const inProgress = 14;
  const completed = 11;
  const monthPct = 120;

  return (
    <div className="idraft-root">

      {/* ═══════ TOP BAR ═══════ */}
      <div className="idraft-topbar">
        <h1 className="idraft-greeting">Hi, {studentName}!</h1>
        <div className="idraft-topbar-actions">
          <button className="idraft-create-btn" onClick={() => navigate('/feed')}>
            <Plus size={16} /> Create
          </button>
          <button className="idraft-icon-btn"><Search size={18} /></button>
          <button className="idraft-icon-btn"><Bell size={18} /></button>
          <div className="idraft-avatar-sm">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
          </div>
        </div>
      </div>

      {/* ═══════ ROW 1: THREE INFO CARDS ═══════ */}
      <div className="idraft-row-3">

        {/* Card 1: Overall Information */}
        <div className="idraft-card overall-card">
          <div className="idraft-card-header">
            <h3>Overall Information</h3>
            <div className="idraft-card-actions">
              <Share2 size={15} />
              <MoreVertical size={15} />
            </div>
          </div>

          <div className="overall-big-stats">
            <div className="overall-big-num">
              <span className="big-number">43</span>
              <span className="big-label">Tasks done<br/>for all time</span>
            </div>
            <div className="overall-big-num">
              <span className="big-number accent">2</span>
              <span className="big-label">projects are<br/>stopped</span>
            </div>
          </div>

          <div className="overall-mini-stats">
            <div className="mini-stat-box">
              <Eye size={16} />
              <span className="mini-num">28</span>
              <span className="mini-label">Projects</span>
            </div>
            <div className="mini-stat-box">
              <Clock3 size={16} />
              <span className="mini-num">14</span>
              <span className="mini-label">In Progress</span>
            </div>
            <div className="mini-stat-box">
              <CheckCircle2 size={16} />
              <span className="mini-num">11</span>
              <span className="mini-label">Completed</span>
            </div>
          </div>
        </div>

        {/* Card 2: Weekly Progress */}
        <div className="idraft-card weekly-card">
          <div className="idraft-card-header">
            <h3>Weekly progress</h3>
            <button className="idraft-refresh-btn">↻</button>
          </div>

          <div className="weekly-legend">
            <span className="legend-dot dark"></span> <span>Sport</span>
            <span className="legend-dot light"></span> <span>Study</span>
          </div>

          <div className="weekly-chart-container">
            <canvas ref={canvasRef} width={320} height={140} className="weekly-canvas"></canvas>
          </div>

          <div className="weekly-days-row">
            {WEEK_DATA.labels.map((d, i) => (
              <span key={i} className={`weekly-day ${i >= 5 ? 'highlight' : ''}`}>{d}</span>
            ))}
          </div>
        </div>

        {/* Card 3: Month Progress */}
        <div className="idraft-card month-card">
          <div className="idraft-card-header">
            <h3>Month progress</h3>
            <TrendingUp size={16} />
          </div>

          <p className="month-compare">+20% compared to last month*</p>

          <div className="month-body">
            <div className="month-legend-list">
              <div className="month-leg-item"><span className="mleg-dot dark"></span> Sport</div>
              <div className="month-leg-item"><span className="mleg-dot gray"></span> Study</div>
              <div className="month-leg-item"><span className="mleg-dot light"></span> Project</div>
            </div>

            <div className="month-ring-container">
              <svg viewBox="0 0 100 100" className="month-ring-svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a1a" strokeWidth="8" 
                  strokeDasharray="251.3" strokeDashoffset="50" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#c0c0c0" strokeWidth="6" 
                  strokeDasharray="201" strokeDashoffset="80" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#e0e0e0" strokeWidth="4" 
                  strokeDasharray="157" strokeDashoffset="90" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
              </svg>
              <div className="month-ring-label">
                <span className="ring-pct">120%</span>
                <span className="ring-sub">complete</span>
              </div>
            </div>
          </div>

          <div className="month-bottom-row">
            <button className="month-share-btn"><Share2 size={14} /></button>
            <button className="month-download-btn">
              Download Report <Download size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 2: GOALS + TASKS ═══════ */}
      <div className="idraft-row-2">

        {/* Month Goals */}
        <div className="idraft-card goals-card">
          <div className="idraft-card-header">
            <h3>Month goals:</h3>
            <div className="idraft-card-actions">
              <Clock3 size={15} />
              <Pencil size={15} />
            </div>
          </div>

          <div className="goals-list">
            {goals.map((goal) => (
              <div key={goal.id} className="goal-row" onClick={() => toggleGoal(goal.id)}>
                <div className={`goal-checkbox ${goal.done ? 'checked' : ''}`}>
                  {goal.done && <CheckCircle2 size={18} />}
                  {!goal.done && <Circle size={18} />}
                </div>
                <span className={`goal-text ${goal.done ? 'done' : ''}`}>{goal.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks in Process */}
        <div className="idraft-card tasks-card">
          <div className="idraft-card-header">
            <h3>Task in process ({tasks.length})</h3>
            <span className="tasks-open-archive">Open archive <ArrowRight size={13} /></span>
          </div>

          <div className="tasks-grid">
            {tasks.map(task => (
              <div key={task.id} className="task-item-card">
                <div className="task-item-top">
                  <span className="task-emoji">{task.icon}</span>
                  <button className="task-more-btn"><MoreHorizontal size={16} /></button>
                </div>
                <h4 className="task-item-title">{task.title}</h4>
                <div className="task-item-footer">
                  <span className="task-date">{task.date}</span>
                  <span className="task-bell-icon"><Bell size={14} /></span>
                </div>
              </div>
            ))}

            {/* Add Task Card (Dashed) */}
            <div className="task-add-card">
              <Plus size={20} />
              <span>Add task</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 3: LAST PROJECTS ═══════ */}
      <div className="idraft-card projects-section">
        <div className="idraft-card-header projects-header">
          <h3>Last Projects</h3>
          <div className="projects-controls">
            <span className="projects-sort">Sort by <ChevronDown size={13} /></span>
            <button className="projects-view-btn active"><LayoutGrid size={15} /></button>
            <button className="projects-view-btn"><List size={15} /></button>
          </div>
        </div>

        <div className="projects-grid">
          {RECENT_ITEMS.map(item => (
            <div key={item.id} className="project-card-item">
              <div className="project-item-top">
                <h4>{item.title}</h4>
                <button className="project-time-btn"><Clock3 size={14} /></button>
              </div>
              <div className="project-status-row">
                <span className={`project-status-dot ${item.status === 'Completed' ? 'done' : 'progress'}`}></span>
                <span className="project-status-text">{item.status}</span>
              </div>
              <p className="project-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
