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
  Database,
  Check,
  RotateCcw
} from 'lucide-react';
import './Dashboard.css';

/* ──────────── CURATED CSE COURSES WITH REAL TOPICS ──────────── */
const CSE_COURSE_CATALOG = [
  {
    id: 'cse211',
    code: 'CSE-211',
    title: 'Data Structures & Algorithms',
    semester: '3rd',
    topics: [
      { id: 'cse211_t1', name: 'Asymptotic Complexity & Big-O' },
      { id: 'cse211_t2', name: 'Singly & Doubly Linked Lists' },
      { id: 'cse211_t3', name: 'Stack & Queue Applications' },
      { id: 'cse211_t4', name: 'Binary Search Trees & AVL Rotations' },
      { id: 'cse211_t5', name: 'Graph Traversals (BFS & DFS)' },
      { id: 'cse211_t6', name: 'Dijkstra Shortest Path & Prim MST' },
      { id: 'cse211_t7', name: 'Dynamic Programming (Knapsack & LCS)' },
      { id: 'cse211_t8', name: 'Heap Sort & Priority Queues' },
    ]
  },
  {
    id: 'cse311',
    code: 'CSE-311',
    title: 'Database Management Systems',
    semester: '5th',
    topics: [
      { id: 'cse311_t1', name: 'Relational Model & ER Modeling' },
      { id: 'cse311_t2', name: 'Relational Algebra & Tuple Calculus' },
      { id: 'cse311_t3', name: 'Advanced SQL Queries & Joins' },
      { id: 'cse311_t4', name: 'Functional Dependencies & Normalization (3NF/BCNF)' },
      { id: 'cse311_t5', name: 'Transaction Management & ACID' },
      { id: 'cse311_t6', name: 'Concurrency Control & 2PL' },
    ]
  },
  {
    id: 'cse313',
    code: 'CSE-313',
    title: 'Operating Systems & Architecture',
    semester: '5th',
    topics: [
      { id: 'cse313_t1', name: 'Process Lifecycle & PCB Context Switch' },
      { id: 'cse313_t2', name: 'Inter-Process Communication & POSIX Threads' },
      { id: 'cse313_t3', name: 'CPU Scheduling Algorithms' },
      { id: 'cse313_t4', name: 'Process Synchronization & Semaphores' },
      { id: 'cse313_t5', name: 'Deadlock Detection & Banker\'s Algorithm' },
      { id: 'cse313_t6', name: 'Virtual Memory & Page Replacement (LRU/FIFO)' },
    ]
  },
  {
    id: 'cse223',
    code: 'CSE-223',
    title: 'Object Oriented Programming (Java/C++)',
    semester: '4th',
    topics: [
      { id: 'cse223_t1', name: 'Classes, Objects & Encapsulation' },
      { id: 'cse223_t2', name: 'Inheritance & Abstract Classes' },
      { id: 'cse223_t3', name: 'Polymorphism & Interface Contracts' },
      { id: 'cse223_t4', name: 'Exception Handling & Custom Exceptions' },
      { id: 'cse223_t5', name: 'Java Collections Framework' },
      { id: 'cse223_t6', name: 'Multithreading & Concurrency' },
    ]
  }
];

/* ──────────── INITIAL ACADEMIC GOALS ──────────── */
const INITIAL_GOALS = [
  { id: 'g1', text: 'Master Binary Search Trees & Graph BFS/DFS traversal', done: false, tag: 'Algorithms' },
  { id: 'g2', text: 'Solve past 3 years Midterm Exam question papers', done: false, tag: 'Exam Solves' },
  { id: 'g3', text: 'Complete DBMS SQL Joins, Triggers & Normalization (3NF/BCNF)', done: false, tag: 'Database' },
  { id: 'g4', text: 'Revise Operating Systems CPU Scheduling & Banker\'s Algorithm', done: false, tag: 'OS' },
  { id: 'g5', text: 'Build OOP Java/C++ Design Patterns & Socket Programming demo', done: false, tag: 'OOP' },
];

/* ──────────── INITIAL TASKS ──────────── */
const INITIAL_TASKS = [
  { id: 't1', title: 'CSE-211: Implement AVL Tree Rotations & Heap Sort', date: 'Upcoming', iconType: 'code', dept: 'Lab Code' },
  { id: 't2', title: 'CSE-311: Normalize Library DB Schema to BCNF', date: 'Upcoming', iconType: 'database', dept: 'Theory' },
  { id: 't3', title: 'CSE-313: Simulate Multi-level Feedback Queue Scheduling', date: 'Upcoming', iconType: 'cpu', dept: 'System' },
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

  // Student's real tracked topics: Map of topicId => boolean
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('student_completed_topics');
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

  // Student's real study activity log: Map of dateStr "YYYY-MM-DD" => study sessions count
  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem('student_activity_log');
    if (saved) return JSON.parse(saved);
    // Initial activity log: mark today as 1 active session if they just logged in
    const todayStr = new Date().toISOString().split('T')[0];
    return { [todayStr]: 1 };
  });

  const [selectedSemester, setSelectedSemester] = useState('All');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeTab, setActiveTab] = useState('heatmap'); // 'heatmap' or 'checklist'
  const [expandedCourse, setExpandedCourse] = useState(null);

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

  // Persist student's real progress
  useEffect(() => {
    localStorage.setItem('student_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

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

  // Toggle a topic studied by the student
  const toggleTopic = (topicId) => {
    setCompletedTopics(prev => {
      const isNowCompleted = !prev[topicId];
      if (isNowCompleted) {
        recordStudyAction();
      }
      return { ...prev, [topicId]: isNowCompleted };
    });
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
      dept: 'Custom'
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

  // Compute real dynamic statistics
  const totalCatalogTopics = useMemo(() => {
    return CSE_COURSE_CATALOG.reduce((acc, c) => acc + c.topics.length, 0);
  }, []);

  const masteredTopicsCount = useMemo(() => {
    return Object.values(completedTopics).filter(Boolean).length;
  }, [completedTopics]);

  const realCoveragePercentage = totalCatalogTopics > 0 
    ? Math.round((masteredTopicsCount / totalCatalogTopics) * 100) 
    : 0;

  // Real ring stroke offset: 251.3 is circumference (2 * pi * 40)
  const ringOffset = 251.3 - (251.3 * realCoveragePercentage) / 100;

  // Build real 28-day GitHub heatmap from student's activity log
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
        // If today hasn't been logged yet, check yesterday
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

        {/* Card 1: CSE Overall Academic Progress (Attained through student check-offs) */}
        <div className="idraft-card overall-card">
          <div className="idraft-card-header">
            <h3>Student Academic Attainment</h3>
            <div className="idraft-card-actions">
              <span className="live-pulse-dot" title="Live Student Progress"></span>
            </div>
          </div>

          <div className="overall-big-stats">
            <div className="overall-big-num">
              <span className="big-number">{masteredTopicsCount}</span>
              <span className="big-label">Topics Mastered<br/>By Studying</span>
            </div>
            <div className="overall-big-num">
              <span className="big-number accent">{tasks.length}</span>
              <span className="big-label">Active Academic<br/>Deadlines</span>
            </div>
          </div>

          <div className="overall-mini-stats">
            <div className="mini-stat-box" title="Enrolled Core Courses">
              <BookOpen size={16} />
              <span className="mini-num">{CSE_COURSE_CATALOG.length}</span>
              <span className="mini-label">Core Courses</span>
            </div>
            <div className="mini-stat-box" title="Goals Attained">
              <CheckCircle2 size={16} />
              <span className="mini-num">{completedGoalsCount}</span>
              <span className="mini-label">Goals Done</span>
            </div>
            <div className="mini-stat-box" title="Total Topics In Curriculum">
              <Code2 size={16} />
              <span className="mini-num">{totalCatalogTopics}</span>
              <span className="mini-label">Total Topics</span>
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
              title="Click to record that you studied right now"
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

        {/* Card 3: Real Syllabus Coverage Ring (Dynamically computed from actual topics studied) */}
        <div className="idraft-card month-card">
          <div className="idraft-card-header">
            <h3>Curriculum Coverage</h3>
            <TrendingUp size={16} />
          </div>

          <p className="month-compare">
            {masteredTopicsCount === 0 
              ? 'Start studying topics below to increase coverage'
              : `${masteredTopicsCount} of ${totalCatalogTopics} topics mastered`}
          </p>

          <div className="month-body">
            <div className="month-legend-list">
              <div className="month-leg-item">
                <span className="mleg-dot dark"></span> Mastered ({masteredTopicsCount})
              </div>
              <div className="month-leg-item">
                <span className="mleg-dot gray"></span> Remaining ({totalCatalogTopics - masteredTopicsCount})
              </div>
              <div className="month-leg-item">
                <span className="mleg-dot light"></span> Total ({totalCatalogTopics})
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
                <span className="ring-sub">Attained</span>
              </div>
            </div>
          </div>

          <div className="month-bottom-row">
            <button className="month-share-btn" onClick={() => navigate('/feed')}>
              <Share2 size={14} /> Share Feed
            </button>
            <button 
              className="month-download-btn"
              onClick={() => alert(`Your study progress: ${realCoveragePercentage}% curriculum mastered across ${CSE_COURSE_CATALOG.length} courses.`)}
            >
              View Summary <Download size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 2: STUDY GOALS & ACTIVE TASKS ═══════ */}
      <div className="idraft-row-2">

        {/* Study Goals (Interactive Checklist) */}
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

      {/* ═══════ ROW 3: INTERACTIVE CSE COURSES (STUDENT CHECKS TOPICS AS THEY STUDY) ═══════ */}
      <div className="idraft-card projects-section">
        <div className="idraft-card-header projects-header">
          <div>
            <h3>Active CSE Courses & Syllabus Hub</h3>
            <p className="projects-subtitle">
              Mark topics as studied to build your genuine academic progress and light up your streak
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
            const courseMasteredCount = course.topics.filter(t => completedTopics[t.id]).length;
            const coursePercentage = course.topics.length > 0 
              ? Math.round((courseMasteredCount / course.topics.length) * 100) 
              : 0;
            const isExpanded = expandedCourse === course.id;

            return (
              <div key={course.id} className="project-card-item">
                <div className="project-item-top">
                  <div className="course-code-badge">{course.code}</div>
                  <span className="course-sem-badge">{course.semester} Semester</span>
                </div>
                
                <h4 className="course-card-title">{course.title}</h4>
                
                {/* Real dynamic progress based on student checkoffs */}
                <div className="course-progress-bar-wrap">
                  <div className="course-progress-label">
                    <span>{courseMasteredCount} of {course.topics.length} topics mastered</span>
                    <span>{coursePercentage}%</span>
                  </div>
                  <div className="course-progress-track">
                    <div 
                      className="course-progress-fill" 
                      style={{ width: `${coursePercentage}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Topics Checklist */}
                <div className="course-topics-checklist">
                  <div className="course-topics-list-head">
                    <span>Syllabus Topics:</span>
                    <button 
                      className="toggle-expand-btn"
                      onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                    >
                      {isExpanded ? 'Collapse Topics' : `View All (${course.topics.length})`}
                    </button>
                  </div>

                  <div className={`topics-items-container ${isExpanded ? 'expanded' : 'compact'}`}>
                    {(isExpanded ? course.topics : course.topics.slice(0, 3)).map(topic => {
                      const isDone = !!completedTopics[topic.id];
                      return (
                        <div 
                          key={topic.id} 
                          className={`topic-checkbox-row ${isDone ? 'done' : ''}`}
                          onClick={() => toggleTopic(topic.id)}
                        >
                          <div className={`topic-check-square ${isDone ? 'checked' : ''}`}>
                            {isDone && <Check size={12} />}
                          </div>
                          <span className="topic-name-text">{topic.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="course-card-footer">
                  <span className="course-solves-info">
                    <CheckCircle2 size={13} /> {coursePercentage === 100 ? 'Course Mastered' : `${coursePercentage}% Complete`}
                  </span>
                  <span className="course-topics-pill">{course.topics.length} Modules</span>
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
