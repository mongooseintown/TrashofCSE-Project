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
  ChevronDown,
  BookOpen,
  Code2,
  GraduationCap,
  Sparkles,
  Flame,
  FileText,
  X,
  Terminal,
  Cpu,
  Database
} from 'lucide-react';
import './Dashboard.css';

/* ──────────── CSE STUDY GOALS ──────────── */
const DEFAULT_CSE_GOALS = [
  { id: 'g1', text: 'Master Binary Search Trees & Graph BFS/DFS traversal', done: true, tag: 'Algorithms' },
  { id: 'g2', text: 'Solve past 3 years Midterm Exam question papers', done: true, tag: 'Exam Solves' },
  { id: 'g3', text: 'Complete DBMS SQL Joins, Triggers & Normalization (3NF/BCNF)', done: false, tag: 'Database' },
  { id: 'g4', text: 'Revise Operating Systems CPU Scheduling & Banker\'s Algorithm', done: false, tag: 'OS' },
  { id: 'g5', text: 'Build OOP Java/C++ Design Patterns & Socket Programming demo', done: false, tag: 'OOP' },
];

/* ──────────── WEEKLY CSE STUDY & LAB HOURS ──────────── */
const WEEK_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  coding: [3.5, 4.0, 2.5, 5.0, 4.5, 6.0, 4.0], // Coding / Lab hours
  theory: [2.0, 3.0, 3.5, 2.5, 4.0, 3.5, 2.5], // Theory revision hours
};

/* ──────────── GITHUB-STYLE REVISION HEATMAP MATRIX (Last 28 Days) ──────────── */
const GENERATE_HEATMAP = () => {
  const levels = [0, 1, 2, 3, 4, 1, 3, 2, 4, 3, 4, 2, 1, 4, 3, 2, 4, 4, 3, 2, 4, 1, 2, 3, 4, 3, 4, 4];
  const today = new Date();
  return levels.map((level, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (27 - i));
    const count = level === 0 ? 0 : level * 2 + 1;
    return {
      day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      level,
      count,
    };
  });
};

/* ──────────── CSE ACADEMIC TASKS IN PROCESS ──────────── */
const DEFAULT_TASKS = [
  { id: 't1', title: 'CSE-211: Implement AVL Tree Rotations & Heap Sort', date: 'Due Tomorrow', iconType: 'code', dept: 'Lab Code' },
  { id: 't2', title: 'CSE-311: Normalize Library DB Schema to BCNF', date: 'Due Friday', iconType: 'database', dept: 'Theory' },
  { id: 't3', title: 'CSE-313: Simulate Multi-level Feedback Queue Scheduling', date: 'Oct 15', iconType: 'cpu', dept: 'System' },
];

const renderTaskIcon = (type) => {
  switch (type) {
    case 'code':
    case 'lab':
      return <Code2 size={18} />;
    case 'db':
    case 'database':
      return <Database size={18} />;
    case 'system':
    case 'cpu':
      return <Cpu size={18} />;
    default:
      return <Terminal size={18} />;
  }
};

/* ──────────── CORE CSE COURSES & SYLLABUS HUB ──────────── */
const CSE_COURSES = [
  {
    id: 'c1',
    code: 'CSE-211',
    title: 'Data Structures & Algorithms',
    semester: '3rd',
    status: 'In progress',
    progress: 78,
    desc: 'Covered: Asymptotic Analysis, Linked Lists, Trees, Graphs, Dijkstra, Dynamic Programming, Heap.',
    topicsCount: '24 Topics',
    solves: '18 Lab Solves • 4 Mid Solves'
  },
  {
    id: 'c2',
    code: 'CSE-311',
    title: 'Database Management Systems',
    semester: '5th',
    status: 'In progress',
    progress: 65,
    desc: 'Covered: Relational Algebra, SQL DDL/DML, 1NF/2NF/3NF/BCNF, Concurrency, ACID Properties.',
    topicsCount: '19 Topics',
    solves: '14 Lab Solves • 3 Final Solves'
  },
  {
    id: 'c3',
    code: 'CSE-313',
    title: 'Operating Systems & Architecture',
    semester: '5th',
    status: 'In progress',
    progress: 52,
    desc: 'Covered: Process Lifecycle, IPC, POSIX Threads, Deadlock Avoidance, Page Replacement Algorithms.',
    topicsCount: '16 Topics',
    solves: '10 Lab Solves • 2 Mid Solves'
  },
  {
    id: 'c4',
    code: 'CSE-223',
    title: 'Object Oriented Programming (Java/C++)',
    semester: '4th',
    status: 'Completed',
    progress: 100,
    desc: 'Covered: Encapsulation, Polymorphism, Abstract Classes, Generics, Collections Framework, GUI.',
    topicsCount: '22 Topics',
    solves: '28 Lab Solves • 6 Exam Solves'
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('cse_goals');
    return saved ? JSON.parse(saved) : DEFAULT_CSE_GOALS;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('cse_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeTab, setActiveTab] = useState('heatmap'); // 'heatmap' or 'chart'

  const canvasRef = useRef(null);
  const heatmapData = useMemo(() => GENERATE_HEATMAP(), []);

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

  useEffect(() => {
    localStorage.setItem('cse_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('cse_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Draw weekly chart when chart tab active
  useEffect(() => {
    if (activeTab !== 'chart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const maxVal = 7;
    const padL = 15, padR = 15, padT = 20, padB = 25;
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

      // Peak point
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

      ctx.font = '600 10px Inter, sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(`${data[peakIdx]}h`, px, py - 8);
    };

    drawLine(WEEK_DATA.coding, '#111111', 'rgba(17,17,17,0.06)');
    drawLine(WEEK_DATA.theory, '#9ca3af', 'rgba(156,163,175,0.04)');
  }, [activeTab]);

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 't_' + Date.now(),
      title: newTaskTitle.trim(),
      date: 'Today',
      iconType: 'terminal',
      dept: 'Custom'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const removeTask = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
  };

  const studentName = user?.fullName ? user.fullName.split(' ')[0] : 'Engineer';
  const filteredCourses = selectedSemester === 'All' 
    ? CSE_COURSES 
    : CSE_COURSES.filter(c => c.semester === selectedSemester);

  const completedGoalsCount = goals.filter(g => g.done).length;

  return (
    <div className="idraft-root">

      {/* ═══════ TOP BAR ═══════ */}
      <div className="idraft-topbar">
        <div className="idraft-greeting-group">
          <h1 className="idraft-greeting">Hi, {studentName}!</h1>
          <div className="idraft-sub-badge">
            <GraduationCap size={14} />
            <span>Trash of CSE • {user?.department || 'CSE'} Dept ({user?.semester ? `${user.semester} Sem` : 'Academic Track'})</span>
          </div>
        </div>

        <div className="idraft-topbar-actions">
          <button className="idraft-create-btn" onClick={() => navigate('/feed')}>
            <Plus size={16} /> Community Post
          </button>
          <button className="idraft-icon-btn" onClick={() => navigate('/profile')} title="Settings & Profile">
            <Pencil size={16} />
          </button>
          <div className="idraft-avatar-sm" onClick={() => navigate('/profile')}>
            {studentName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* ═══════ ROW 1: THREE ACADEMIC STAT CARDS ═══════ */}
      <div className="idraft-row-3">

        {/* Card 1: CSE Overall Academic Progress */}
        <div className="idraft-card overall-card">
          <div className="idraft-card-header">
            <h3>CSE Academic Progress</h3>
            <div className="idraft-card-actions">
              <span className="live-pulse-dot" title="Real-time Tracking"></span>
            </div>
          </div>

          <div className="overall-big-stats">
            <div className="overall-big-num">
              <span className="big-number">48</span>
              <span className="big-label">Topics Mastered<br/>Across Syllabus</span>
            </div>
            <div className="overall-big-num">
              <span className="big-number accent">2</span>
              <span className="big-label">Pending Lab<br/>Solves</span>
            </div>
          </div>

          <div className="overall-mini-stats">
            <div className="mini-stat-box" title="Core Engineering Courses">
              <BookOpen size={16} />
              <span className="mini-num">8</span>
              <span className="mini-label">Core Courses</span>
            </div>
            <div className="mini-stat-box" title="Lab Code Submissions">
              <Code2 size={16} />
              <span className="mini-num">24</span>
              <span className="mini-label">Lab Solves</span>
            </div>
            <div className="mini-stat-box" title="Midterm & Final Exam Solves">
              <CheckCircle2 size={16} />
              <span className="mini-num">12</span>
              <span className="mini-label">Exam Solves</span>
            </div>
          </div>
        </div>

        {/* Card 2: Revision Activity & GitHub Heatmap */}
        <div className="idraft-card weekly-card">
          <div className="idraft-card-header">
            <h3>Revision Activity</h3>
            <div className="view-switch-btns">
              <button 
                className={`switch-btn ${activeTab === 'heatmap' ? 'active' : ''}`}
                onClick={() => setActiveTab('heatmap')}
                title="GitHub-style Activity Matrix"
              >
                Streak
              </button>
              <button 
                className={`switch-btn ${activeTab === 'chart' ? 'active' : ''}`}
                onClick={() => setActiveTab('chart')}
                title="Weekly Study Hours"
              >
                Hours
              </button>
            </div>
          </div>

          {activeTab === 'heatmap' ? (
            <div className="heatmap-container">
              <div className="heatmap-subhead">
                <span className="streak-badge"><Flame size={13} color="#f97316" /> 14 Day Study Streak</span>
                <span className="heatmap-note">GitHub Style Revision Matrix</span>
              </div>
              <div className="github-heatmap-grid">
                {heatmapData.map((slot, idx) => (
                  <div 
                    key={idx} 
                    className={`heatmap-box level-${slot.level}`}
                    title={`${slot.day}: ${slot.count} revision sessions & code commits`}
                  />
                ))}
              </div>
              <div className="heatmap-footer">
                <span>Less</span>
                <div className="heatmap-legend-boxes">
                  <span className="heatmap-box level-0"></span>
                  <span className="heatmap-box level-1"></span>
                  <span className="heatmap-box level-2"></span>
                  <span className="heatmap-box level-3"></span>
                  <span className="heatmap-box level-4"></span>
                </div>
                <span>More Activity</span>
              </div>
            </div>
          ) : (
            <>
              <div className="weekly-legend">
                <span className="legend-dot dark"></span> <span>Lab / Code</span>
                <span className="legend-dot light"></span> <span>Theory Revision</span>
              </div>
              <div className="weekly-chart-container">
                <canvas ref={canvasRef} width={320} height={130} className="weekly-canvas"></canvas>
              </div>
              <div className="weekly-days-row">
                {WEEK_DATA.labels.map((d, i) => (
                  <span key={i} className={`weekly-day ${i >= 5 ? 'highlight' : ''}`}>{d}</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card 3: Semester Syllabus Progress Ring */}
        <div className="idraft-card month-card">
          <div className="idraft-card-header">
            <h3>Syllabus Coverage</h3>
            <TrendingUp size={16} />
          </div>

          <p className="month-compare">84% On-Track For Midterm Exams</p>

          <div className="month-body">
            <div className="month-legend-list">
              <div className="month-leg-item"><span className="mleg-dot dark"></span> Core Theory</div>
              <div className="month-leg-item"><span className="mleg-dot gray"></span> Lab Problem Sets</div>
              <div className="month-leg-item"><span className="mleg-dot light"></span> Previous Solves</div>
            </div>

            <div className="month-ring-container">
              <svg viewBox="0 0 100 100" className="month-ring-svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#111111" strokeWidth="8" 
                  strokeDasharray="251.3" strokeDashoffset="55" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#9ca3af" strokeWidth="6" 
                  strokeDasharray="201" strokeDashoffset="70" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="#e5e7eb" strokeWidth="5" 
                  strokeDasharray="150" strokeDashoffset="60" strokeLinecap="round"
                  transform="rotate(-90 50 50)" />
              </svg>
              <div className="month-ring-label">
                <span className="ring-pct">78%</span>
                <span className="ring-sub">completed</span>
              </div>
            </div>
          </div>

          <div className="month-bottom-row">
            <button className="month-share-btn" onClick={() => navigate('/feed')}>
              <Share2 size={14} /> Discuss in Feed
            </button>
            <button 
              className="month-download-btn"
              onClick={() => alert("Syllabus & solved papers outline synced.")}
            >
              Routine / Syllabus <Download size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 2: STUDY GOALS & ACTIVE TASKS ═══════ */}
      <div className="idraft-row-2">

        {/* Month Goals */}
        <div className="idraft-card goals-card">
          <div className="idraft-card-header">
            <h3>CSE Academic Target Goals ({completedGoalsCount}/{goals.length})</h3>
            <div className="idraft-card-actions">
              <Clock3 size={15} />
            </div>
          </div>

          <div className="goals-list">
            {goals.map((goal) => (
              <div key={goal.id} className="goal-row" onClick={() => toggleGoal(goal.id)}>
                <div className={`goal-checkbox ${goal.done ? 'checked' : ''}`}>
                  {goal.done && <CheckCircle2 size={18} />}
                  {!goal.done && <Circle size={18} />}
                </div>
                <div className="goal-content-wrap">
                  <span className={`goal-text ${goal.done ? 'done' : ''}`}>{goal.text}</span>
                  {goal.tag && <span className="goal-tag">{goal.tag}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks in Process */}
        <div className="idraft-card tasks-card">
          <div className="idraft-card-header">
            <h3>Academic Deadlines & Labs ({tasks.length})</h3>
            <span className="tasks-open-archive" onClick={() => setShowAddTask(true)}>
              + Quick Add
            </span>
          </div>

          {showAddTask && (
            <form onSubmit={handleAddTask} className="task-add-inline-form">
              <input
                type="text"
                placeholder="e.g. CSE-311: Submit Normalization ER Diagram..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              <div className="task-add-inline-btns">
                <button type="submit" className="task-btn-submit">Add</button>
                <button type="button" className="task-btn-cancel" onClick={() => setShowAddTask(false)}>
                  <X size={14} />
                </button>
              </div>
            </form>
          )}

          <div className="tasks-grid">
            {tasks.map(task => (
              <div key={task.id} className="task-item-card">
                <div className="task-item-top">
                  <div className="task-icon-badge">
                    {renderTaskIcon(task.iconType || task.icon)}
                  </div>
                  <button className="task-del-btn" onClick={(e) => removeTask(task.id, e)} title="Remove Task">
                    <Trash2 size={13} />
                  </button>
                </div>
                <h4 className="task-item-title">{task.title}</h4>
                <div className="task-item-footer">
                  <span className="task-date">{task.date}</span>
                  <span className="task-dept-tag">{task.dept}</span>
                </div>
              </div>
            ))}

            <div className="task-add-card" onClick={() => setShowAddTask(true)}>
              <Plus size={20} />
              <span>Add Study Task</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 3: CURATED CSE COURSES & SYLLABUS FAST-TRACKS ═══════ */}
      <div className="idraft-card projects-section">
        <div className="idraft-card-header projects-header">
          <div>
            <h3>Active CSE Courses & Syllabus Hub</h3>
            <p className="projects-subtitle">Curated theory topics, lab problem sets, and past year question solves</p>
          </div>
          <div className="projects-controls">
            <span className="sem-filter-label">Filter:</span>
            {['All', '3rd', '4th', '5th'].map(sem => (
              <button 
                key={sem}
                className={`sem-filter-btn ${selectedSemester === sem ? 'active' : ''}`}
                onClick={() => setSelectedSemester(sem)}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="project-card-item">
              <div className="project-item-top">
                <div className="course-code-badge">{course.code}</div>
                <span className="course-sem-badge">{course.semester} Semester</span>
              </div>
              <h4 className="course-card-title">{course.title}</h4>
              
              <div className="course-progress-bar-wrap">
                <div className="course-progress-label">
                  <span>Coverage</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="course-progress-track">
                  <div 
                    className="course-progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <p className="project-desc">{course.desc}</p>
              
              <div className="course-card-footer">
                <span className="course-solves-info">
                  <FileText size={13} /> {course.solves}
                </span>
                <span className="course-topics-pill">{course.topicsCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
