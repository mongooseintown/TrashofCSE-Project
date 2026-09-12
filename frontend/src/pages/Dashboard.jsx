import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Bell, 
  Share2, 
  Clock3, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Download, 
  Pencil, 
  Trash2, 
  BookOpen, 
  Code2, 
  GraduationCap, 
  Flame, 
  X, 
  Terminal, 
  Cpu, 
  Database, 
  Check, 
  Award,
  Sparkles
} from 'lucide-react';
import './Dashboard.css';

/* ──────────── ACTIVE CSE COURSES DIVIDED INTO 3 MID SEGMENTS ──────────── */
const CSE_COURSE_CATALOG = [
  {
    id: 'cse211',
    code: 'CSE-211',
    title: 'Data Structures & Algorithms',
    semester: '3rd',
    segments: [
      { id: 1, label: 'Seg 1', desc: 'Asymptotic Complexity, Big-O, Array & Linked Lists' },
      { id: 2, label: 'Seg 2', desc: 'Stack Operations, Queue Applications & Recursion' },
      { id: 3, label: 'Seg 3', desc: 'Binary Trees, BST Rotations & Mid Exam Solves' }
    ]
  },
  {
    id: 'cse311',
    code: 'CSE-311',
    title: 'Database Management Systems',
    semester: '5th',
    segments: [
      { id: 1, label: 'Seg 1', desc: 'Relational Model, ER Diagrams & Schema Mapping' },
      { id: 2, label: 'Seg 2', desc: 'Relational Algebra Operations, Tuple Calculus' },
      { id: 3, label: 'Seg 3', desc: 'SQL DDL/DML, Nested Queries & Mid Exam Solves' }
    ]
  },
  {
    id: 'cse313',
    code: 'CSE-313',
    title: 'Operating Systems & Architecture',
    semester: '5th',
    segments: [
      { id: 1, label: 'Seg 1', desc: 'OS Structure, System Calls, Process Lifecycle & PCB' },
      { id: 2, label: 'Seg 2', desc: 'Inter-Process Communication (IPC), POSIX Threads' },
      { id: 3, label: 'Seg 3', desc: 'CPU Scheduling Algorithms & Mid Exam Solves' }
    ]
  },
  {
    id: 'cse223',
    code: 'CSE-223',
    title: 'Object Oriented Programming (Java/C++)',
    semester: '4th',
    segments: [
      { id: 1, label: 'Seg 1', desc: 'OOP Paradigm, Classes, Objects & Access Modifiers' },
      { id: 2, label: 'Seg 2', desc: 'Encapsulation, Constructor Overloading, Static' },
      { id: 3, label: 'Seg 3', desc: 'Inheritance, Polymorphism & Mid Exam Solves' }
    ]
  }
];

/* ──────────── INITIAL ACADEMIC TARGET GOALS ──────────── */
const INITIAL_GOALS = [
  { id: 'g1', text: 'Complete Midterm Seg 1 & Seg 2 for all enrolled courses', done: false, tag: 'Midterm' },
  { id: 'g2', text: 'Solve past 3 years Midterm question papers for Seg 3', done: false, tag: 'Mid Solves' },
  { id: 'g3', text: 'Complete DBMS Midterm SQL queries & schema design drill', done: false, tag: 'Database' },
  { id: 'g4', text: 'Revise Operating Systems CPU Scheduling formulas & charts', done: false, tag: 'OS' },
  { id: 'g5', text: 'Practice OOP Java/C++ Midterm viva & code questions', done: false, tag: 'OOP/Viva' },
];

/* ──────────── INITIAL TASKS ──────────── */
const INITIAL_TASKS = [
  { id: 't1', title: 'CSE-211: Complete Seg 1 & 2 Revision Sheets', date: 'Upcoming', iconType: 'code', dept: 'Seg 1-2' },
  { id: 't2', title: 'CSE-311: Midterm Seg 3 Query Practice (Past Solves)', date: 'Upcoming', iconType: 'database', dept: 'Seg 3' },
  { id: 't3', title: 'CSE-313: CPU Scheduling Gantt Chart Problems', date: 'Upcoming', iconType: 'cpu', dept: 'Seg 3' },
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Student's real tracked Mid segments: { "cse211_seg1": true, "cse211_seg2": false, ... }
  const [segmentProgress, setSegmentProgress] = useState(() => {
    const saved = localStorage.getItem('student_mid_segments');
    return saved ? JSON.parse(saved) : {};
  });

  // Student's real target goals
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('student_study_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  // Student's real tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('student_academic_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Student's real study activity log
  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem('student_activity_log');
    if (saved) return JSON.parse(saved);
    const todayStr = new Date().toISOString().split('T')[0];
    return { [todayStr]: 1 };
  });

  const [selectedSemester, setSelectedSemester] = useState('All');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

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

  // Persist progress
  useEffect(() => {
    localStorage.setItem('student_mid_segments', JSON.stringify(segmentProgress));
  }, [segmentProgress]);

  useEffect(() => {
    localStorage.setItem('student_study_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('student_academic_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('student_activity_log', JSON.stringify(activityLog));
  }, [activityLog]);

  // Record an actual study action for today
  const recordStudyAction = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setActivityLog(prev => ({
      ...prev,
      [todayStr]: (prev[todayStr] || 0) + 1
    }));
  };

  // Toggle individual segment (Seg 1, Seg 2, Seg 3)
  const toggleSegment = (courseId, segId) => {
    const key = `${courseId}_seg${segId}`;
    setSegmentProgress(prev => {
      const isNowCompleted = !prev[key];
      if (isNowCompleted) {
        recordStudyAction();
      }
      return { ...prev, [key]: isNowCompleted };
    });
  };

  // Declare 100% Complete for all 3 segments in a course
  const declare100Percent = (courseId) => {
    const s1 = `${courseId}_seg1`;
    const s2 = `${courseId}_seg2`;
    const s3 = `${courseId}_seg3`;
    const allDone = segmentProgress[s1] && segmentProgress[s2] && segmentProgress[s3];

    setSegmentProgress(prev => ({
      ...prev,
      [s1]: !allDone,
      [s2]: !allDone,
      [s3]: !allDone,
    }));
    recordStudyAction();
  };

  // Toggle a target goal
  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const isNowDone = !g.done;
        if (isNowDone) recordStudyAction();
        return { ...g, done: isNowDone };
      }
      return g;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 't_' + Date.now(),
      title: newTaskTitle.trim(),
      date: 'Today',
      iconType: 'terminal',
      dept: 'Mid Prep'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddTask(false);
    recordStudyAction();
  };

  const removeTask = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Dynamic calculations for Mid Segments
  const totalCourses = CSE_COURSE_CATALOG.length;
  const totalSegmentsCount = totalCourses * 3; // 3 segments per course

  const completedSegmentsCount = useMemo(() => {
    return Object.values(segmentProgress).filter(Boolean).length;
  }, [segmentProgress]);

  const fullyReadyCoursesCount = useMemo(() => {
    return CSE_COURSE_CATALOG.filter(c => 
      segmentProgress[`${c.id}_seg1`] && 
      segmentProgress[`${c.id}_seg2`] && 
      segmentProgress[`${c.id}_seg3`]
    ).length;
  }, [segmentProgress]);

  const realCoveragePercentage = totalSegmentsCount > 0 
    ? Math.round((completedSegmentsCount / totalSegmentsCount) * 100) 
    : 0;

  // Ring stroke offset
  const ringOffset = 251.3 - (251.3 * realCoveragePercentage) / 100;

  // Build real 28-day GitHub heatmap
  const heatmapData = useMemo(() => {
    const today = new Date();
    const result = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = activityLog[dateStr] || 0;
      let level = 0;
      if (count >= 4) level = 4;
      else if (count === 3) level = 3;
      else if (count === 2) level = 2;
      else if (count === 1) level = 1;

      result.push({
        day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dateStr,
        level,
        count
      });
    }
    return result;
  }, [activityLog]);

  // Compute real study streak
  const currentStreak = useMemo(() => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (activityLog[dateStr] && activityLog[dateStr] > 0) {
        streak++;
      } else if (i === 0) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  }, [activityLog]);

  const studentName = user?.fullName ? user.fullName.split(' ')[0] : 'Engineer';
  const completedGoalsCount = goals.filter(g => g.done).length;

  const filteredCourses = selectedSemester === 'All' 
    ? CSE_COURSE_CATALOG 
    : CSE_COURSE_CATALOG.filter(c => c.semester === selectedSemester);

  return (
    <div className="idraft-root">

      {/* ═══════ TOP BAR ═══════ */}
      <div className="idraft-topbar">
        <div className="idraft-greeting-group">
          <h1 className="idraft-greeting">Hi, {studentName}!</h1>
          <div className="idraft-sub-badge">
            <GraduationCap size={14} />
            <span>Trash of CSE • {user?.department || 'CSE'} Dept ({user?.semester ? `${user.semester} Sem` : 'Active Track'})</span>
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

      {/* ═══════ ROW 1: THREE REAL ACADEMIC STAT CARDS ═══════ */}
      <div className="idraft-row-3">

        {/* Card 1: Midterm Segments Progress */}
        <div className="idraft-card overall-card">
          <div className="idraft-card-header">
            <h3>Midterm Segment Attainment</h3>
            <div className="idraft-card-actions">
              <span className="live-pulse-dot" title="Live Academic Progress"></span>
            </div>
          </div>

          <div className="overall-big-stats">
            <div className="overall-big-num">
              <span className="big-number">{completedSegmentsCount}</span>
              <span className="big-label">Segments Done<br/>Across Courses</span>
            </div>
            <div className="overall-big-num">
              <span className="big-number accent">{fullyReadyCoursesCount}</span>
              <span className="big-label">Courses 100%<br/>Mid Ready</span>
            </div>
          </div>

          <div className="overall-mini-stats">
            <div className="mini-stat-box" title="Enrolled Courses">
              <BookOpen size={16} />
              <span className="mini-num">{totalCourses}</span>
              <span className="mini-label">Active Courses</span>
            </div>
            <div className="mini-stat-box" title="Total Mid Segments">
              <Code2 size={16} />
              <span className="mini-num">{totalSegmentsCount}</span>
              <span className="mini-label">Total Segments</span>
            </div>
            <div className="mini-stat-box" title="Deadlines">
              <Clock3 size={16} />
              <span className="mini-num">{tasks.length}</span>
              <span className="mini-label">Deadlines</span>
            </div>
          </div>
        </div>

        {/* Card 2: Real Study Activity & GitHub Heatmap */}
        <div className="idraft-card weekly-card">
          <div className="idraft-card-header">
            <h3>Revision Activity Matrix</h3>
            <button 
              className="quick-log-btn"
              onClick={recordStudyAction}
              title="Click to record study action"
            >
              <Check size={13} /> Log Session
            </button>
          </div>

          <div className="heatmap-container">
            <div className="heatmap-subhead">
              <span className="streak-badge">
                <Flame size={13} color="#f97316" /> {currentStreak} Day Study Streak
              </span>
              <span className="heatmap-note">GitHub Style Activity Matrix</span>
            </div>
            
            <div className="github-heatmap-grid">
              {heatmapData.map((slot, idx) => (
                <div 
                  key={idx} 
                  className={`heatmap-box level-${slot.level}`}
                  title={`${slot.day}: ${slot.count} study & revision sessions completed`}
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
              <span>More Active</span>
            </div>
          </div>
        </div>

        {/* Card 3: Semester Midterm Readiness Ring */}
        <div className="idraft-card month-card">
          <div className="idraft-card-header">
            <h3>Midterm Exam Readiness</h3>
            <TrendingUp size={16} />
          </div>

          <p className="month-compare">
            {completedSegmentsCount === 0 
              ? 'Click your completed segments below'
              : `${completedSegmentsCount} of ${totalSegmentsCount} segments prepared`}
          </p>

          <div className="month-body">
            <div className="month-legend-list">
              <div className="month-leg-item">
                <span className="mleg-dot dark"></span> Completed ({completedSegmentsCount})
              </div>
              <div className="month-leg-item">
                <span className="mleg-dot gray"></span> Pending ({totalSegmentsCount - completedSegmentsCount})
              </div>
              <div className="month-leg-item">
                <span className="mleg-dot light"></span> 100% Ready ({fullyReadyCoursesCount} Courses)
              </div>
            </div>

            <div className="month-ring-container">
              <svg viewBox="0 0 100 100" className="month-ring-svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#111111" 
                  strokeWidth="8" 
                  strokeDasharray="251.3" 
                  strokeDashoffset={ringOffset} 
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)" 
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <div className="month-ring-label">
                <span className="ring-pct">{realCoveragePercentage}%</span>
                <span className="ring-sub">Mid Ready</span>
              </div>
            </div>
          </div>

          <div className="month-bottom-row">
            <button className="month-share-btn" onClick={() => navigate('/feed')}>
              <Share2 size={14} /> Share Feed
            </button>
            <button 
              className="month-download-btn"
              onClick={() => alert(`Midterm status: ${completedSegmentsCount} of ${totalSegmentsCount} segments prepared across ${totalCourses} courses.`)}
            >
              View Routine <Download size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 2: STUDY GOALS & ACTIVE TASKS ═══════ */}
      <div className="idraft-row-2">

        {/* Study Goals */}
        <div className="idraft-card goals-card">
          <div className="idraft-card-header">
            <h3>Midterm Target Goals ({completedGoalsCount}/{goals.length})</h3>
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
            <h3>Academic Deadlines ({tasks.length})</h3>
            <span className="tasks-open-archive" onClick={() => setShowAddTask(true)}>
              + Quick Add
            </span>
          </div>

          {showAddTask && (
            <form onSubmit={handleAddTask} className="task-add-inline-form">
              <input
                type="text"
                placeholder="e.g. CSE-311: Solve Seg 2 Relational Algebra..."
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
              <span>Add Deadline</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 3: COURSES DIVIDED INTO 3 MID SEGMENTS ═══════ */}
      <div className="idraft-card projects-section">
        <div className="idraft-card-header projects-header">
          <div>
            <h3>Active CSE Courses (MID Segments)</h3>
            <p className="projects-subtitle">
              Midterm is divided into 3 Segments (Seg 1, Seg 2, Seg 3). Click any segment to mark completed or declare 100% complete.
            </p>
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
          {filteredCourses.map(course => {
            const isSeg1Done = !!segmentProgress[`${course.id}_seg1`];
            const isSeg2Done = !!segmentProgress[`${course.id}_seg2`];
            const isSeg3Done = !!segmentProgress[`${course.id}_seg3`];
            
            const completedCount = [isSeg1Done, isSeg2Done, isSeg3Done].filter(Boolean).length;
            const coursePercent = Math.round((completedCount / 3) * 100);
            const is100Percent = completedCount === 3;

            return (
              <div key={course.id} className="project-card-item">
                <div className="project-item-top">
                  <div className="course-code-badge">{course.code}</div>
                  <div className="course-item-top-right">
                    <span className="course-sem-badge">{course.semester} Semester</span>
                    <button 
                      className={`declare-100-btn ${is100Percent ? 'done' : ''}`}
                      onClick={() => declare100Percent(course.id)}
                      title={is100Percent ? 'Click to reset segments' : 'Click to declare all 3 segments complete'}
                    >
                      {is100Percent ? <Award size={13} /> : <CheckCircle2 size={13} />}
                      <span>{is100Percent ? '100% Ready' : 'Declare 100%'}</span>
                    </button>
                  </div>
                </div>
                
                <h4 className="course-card-title">{course.title}</h4>
                
                {/* Real dynamic progress based on Seg 1, 2, 3 */}
                <div className="course-progress-bar-wrap">
                  <div className="course-progress-label">
                    <span>
                      {is100Percent 
                        ? 'All 3 Segments Done (100%)' 
                        : `${completedCount} of 3 Segments Complete`}
                    </span>
                    <span>{coursePercent}%</span>
                  </div>
                  <div className="course-progress-track">
                    <div 
                      className="course-progress-fill" 
                      style={{ width: `${coursePercent}%` }}
                    />
                  </div>
                </div>

                {/* 3 MID SEGMENTS (Seg 1, Seg 2, Seg 3) */}
                <div className="course-mid-segments-row">
                  {course.segments.map(seg => {
                    const isDone = !!segmentProgress[`${course.id}_seg${seg.id}`];
                    return (
                      <div 
                        key={seg.id}
                        className={`mid-seg-card ${isDone ? 'completed' : ''}`}
                        onClick={() => toggleSegment(course.id, seg.id)}
                      >
                        <div className="mid-seg-top">
                          <span className="mid-seg-badge">{seg.label}</span>
                          <div className={`mid-seg-check ${isDone ? 'checked' : ''}`}>
                            {isDone && <Check size={12} />}
                          </div>
                        </div>
                        <p className="mid-seg-desc">{seg.desc}</p>
                        <div className="mid-seg-status">
                          {isDone ? '✓ Completed' : 'Click to finish'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="course-card-footer">
                  <span className="course-solves-info">
                    <CheckCircle2 size={13} /> {is100Percent ? 'Course 100% Midterm Ready' : `${completedCount}/3 Segments Completed`}
                  </span>
                  <span className="course-topics-pill">MID Exam</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
