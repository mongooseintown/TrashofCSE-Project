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
  FileText, 
  X, 
  Terminal, 
  Cpu, 
  Database, 
  Check, 
  Layers
} from 'lucide-react';
import './Dashboard.css';

/* ──────────── CURATED CSE COURSES DIVIDED BY MID & FINAL ──────────── */
const CSE_COURSE_CATALOG = [
  {
    id: 'cse211',
    code: 'CSE-211',
    title: 'Data Structures & Algorithms',
    semester: '3rd',
    mid: {
      scope: 'Asymptotic Complexity, Linked Lists, Stacks, Queues, Recursion',
      solves: '4 Midterm Question Solves'
    },
    final: {
      scope: 'Trees, BST, AVL, Graphs (BFS/DFS), Dijkstra, DP, Hashing',
      solves: '6 Final Question Solves'
    }
  },
  {
    id: 'cse311',
    code: 'CSE-311',
    title: 'Database Management Systems',
    semester: '5th',
    mid: {
      scope: 'Relational Model, ER Diagrams, Relational Algebra, Basic SQL',
      solves: '3 Midterm Question Solves'
    },
    final: {
      scope: 'Normalization (3NF/BCNF), Transactions, ACID, Concurrency Control',
      solves: '5 Final Question Solves'
    }
  },
  {
    id: 'cse313',
    code: 'CSE-313',
    title: 'Operating Systems & Architecture',
    semester: '5th',
    mid: {
      scope: 'Process Lifecycle, PCB Context Switching, IPC, CPU Scheduling',
      solves: '3 Midterm Question Solves'
    },
    final: {
      scope: 'Deadlock Banker\'s Algo, Virtual Memory, Paging, Page Replacement',
      solves: '5 Final Question Solves'
    }
  },
  {
    id: 'cse223',
    code: 'CSE-223',
    title: 'Object Oriented Programming (Java/C++)',
    semester: '4th',
    mid: {
      scope: 'OOP Paradigm, Classes, Encapsulation, Inheritance, Polymorphism',
      solves: '4 Midterm Question Solves'
    },
    final: {
      scope: 'Interfaces, Abstract Classes, Collections Framework, Multithreading',
      solves: '6 Final Question Solves'
    }
  }
];

/* ──────────── INITIAL ACADEMIC TARGET GOALS ──────────── */
const INITIAL_GOALS = [
  { id: 'g1', text: 'Complete Midterm syllabus & past question solves', done: false, tag: 'Midterm' },
  { id: 'g2', text: 'Solve past 3 years Final Exam question papers', done: false, tag: 'Final Solves' },
  { id: 'g3', text: 'Complete DBMS Midterm SQL & ER modeling questions', done: false, tag: 'Midterm' },
  { id: 'g4', text: 'Revise Operating Systems Final Memory Paging & Deadlocks', done: false, tag: 'Final' },
  { id: 'g5', text: 'Practice OOP Java/C++ Midterm & Final viva questions', done: false, tag: 'Viva/Lab' },
];

/* ──────────── INITIAL TASKS ──────────── */
const INITIAL_TASKS = [
  { id: 't1', title: 'CSE-211: Midterm Question Paper Solve (2023)', date: 'Upcoming', iconType: 'code', dept: 'Midterm' },
  { id: 't2', title: 'CSE-311: Midterm Schema Design & Query Solve', date: 'Upcoming', iconType: 'database', dept: 'Midterm' },
  { id: 't3', title: 'CSE-313: Final Exam Banker\'s Algorithm Drill', date: 'Upcoming', iconType: 'cpu', dept: 'Final' },
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

  // Student's real exam prep progress: { "cse211_mid": true, "cse211_final": false, ... }
  const [examProgress, setExamProgress] = useState(() => {
    const saved = localStorage.getItem('student_exam_progress');
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
    localStorage.setItem('student_exam_progress', JSON.stringify(examProgress));
  }, [examProgress]);

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

  // Toggle Mid or Final completion for a course
  const toggleExamScope = (courseId, type) => {
    const key = `${courseId}_${type}`;
    setExamProgress(prev => {
      const isNowCompleted = !prev[key];
      if (isNowCompleted) {
        recordStudyAction();
      }
      return { ...prev, [key]: isNowCompleted };
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
      dept: 'Exam Prep'
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

  // Dynamic calculations for Mid & Final
  const totalCourses = CSE_COURSE_CATALOG.length;
  const totalExamMilestones = totalCourses * 2; // Mid + Final for each

  const midReadyCount = useMemo(() => {
    return CSE_COURSE_CATALOG.filter(c => examProgress[`${c.id}_mid`]).length;
  }, [examProgress]);

  const finalReadyCount = useMemo(() => {
    return CSE_COURSE_CATALOG.filter(c => examProgress[`${c.id}_final`]).length;
  }, [examProgress]);

  const totalCompletedMilestones = midReadyCount + finalReadyCount;

  const realCoveragePercentage = totalExamMilestones > 0 
    ? Math.round((totalCompletedMilestones / totalExamMilestones) * 100) 
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

        {/* Card 1: CSE Overall Academic Progress (Mid & Final Attainment) */}
        <div className="idraft-card overall-card">
          <div className="idraft-card-header">
            <h3>Exam Preparation Attainment</h3>
            <div className="idraft-card-actions">
              <span className="live-pulse-dot" title="Live Academic Progress"></span>
            </div>
          </div>

          <div className="overall-big-stats">
            <div className="overall-big-num">
              <span className="big-number">{midReadyCount}</span>
              <span className="big-label">Midterm Ready<br/>Courses</span>
            </div>
            <div className="overall-big-num">
              <span className="big-number accent">{finalReadyCount}</span>
              <span className="big-label">Final Ready<br/>Courses</span>
            </div>
          </div>

          <div className="overall-mini-stats">
            <div className="mini-stat-box" title="Enrolled Core Courses">
              <BookOpen size={16} />
              <span className="mini-num">{totalCourses}</span>
              <span className="mini-label">Core Courses</span>
            </div>
            <div className="mini-stat-box" title="Goals Attained">
              <CheckCircle2 size={16} />
              <span className="mini-num">{completedGoalsCount}</span>
              <span className="mini-label">Goals Done</span>
            </div>
            <div className="mini-stat-box" title="Active Deadlines">
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

        {/* Card 3: Semester Exam Readiness Ring */}
        <div className="idraft-card month-card">
          <div className="idraft-card-header">
            <h3>Semester Exam Readiness</h3>
            <TrendingUp size={16} />
          </div>

          <p className="month-compare">
            {totalCompletedMilestones === 0 
              ? 'Mark your Mid & Final course preparation below'
              : `${totalCompletedMilestones} of ${totalExamMilestones} exam phases prepared`}
          </p>

          <div className="month-body">
            <div className="month-legend-list">
              <div className="month-leg-item">
                <span className="mleg-dot dark"></span> Mid Ready ({midReadyCount}/{totalCourses})
              </div>
              <div className="month-leg-item">
                <span className="mleg-dot gray"></span> Final Ready ({finalReadyCount}/{totalCourses})
              </div>
              <div className="month-leg-item">
                <span className="mleg-dot light"></span> Total ({totalCourses} Courses)
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
                <span className="ring-sub">Prepared</span>
              </div>
            </div>
          </div>

          <div className="month-bottom-row">
            <button className="month-share-btn" onClick={() => navigate('/feed')}>
              <Share2 size={14} /> Share Feed
            </button>
            <button 
              className="month-download-btn"
              onClick={() => alert(`Exam readiness: ${realCoveragePercentage}% prepared across Midterm and Final examinations.`)}
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
            <h3>Exam Preparation Target Goals ({completedGoalsCount}/{goals.length})</h3>
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
                placeholder="e.g. CSE-311: Midterm Question Solve 2023..."
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

      {/* ═══════ ROW 3: COURSES STRUCTURED BY MIDTERM & FINAL ═══════ */}
      <div className="idraft-card projects-section">
        <div className="idraft-card-header projects-header">
          <div>
            <h3>Active CSE Courses (Midterm & Final Tracks)</h3>
            <p className="projects-subtitle">
              Mark your Midterm and Final exam preparations as you complete past solves and revisions
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
            const isMidDone = !!examProgress[`${course.id}_mid`];
            const isFinalDone = !!examProgress[`${course.id}_final`];
            const coursePercent = (isMidDone ? 50 : 0) + (isFinalDone ? 50 : 0);

            return (
              <div key={course.id} className="project-card-item">
                <div className="project-item-top">
                  <div className="course-code-badge">{course.code}</div>
                  <span className="course-sem-badge">{course.semester} Semester</span>
                </div>
                
                <h4 className="course-card-title">{course.title}</h4>
                
                {/* Real dynamic progress based on Mid & Final */}
                <div className="course-progress-bar-wrap">
                  <div className="course-progress-label">
                    <span>
                      {coursePercent === 100 
                        ? 'Mid & Final Ready' 
                        : isMidDone 
                          ? 'Midterm Ready • Final Pending' 
                          : isFinalDone 
                            ? 'Final Ready • Midterm Pending' 
                            : 'Not Started'}
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

                {/* Divided strictly into Midterm & Final cards */}
                <div className="course-exam-splits">
                  
                  {/* Midterm Split */}
                  <div 
                    className={`exam-split-card ${isMidDone ? 'completed' : ''}`}
                    onClick={() => toggleExamScope(course.id, 'mid')}
                  >
                    <div className="exam-split-header">
                      <div className="exam-split-title-wrap">
                        <span className="exam-tag mid">Midterm Scope</span>
                        <span className="exam-solves-sub">{course.mid.solves}</span>
                      </div>
                      <div className={`exam-check-box ${isMidDone ? 'checked' : ''}`}>
                        {isMidDone ? <Check size={13} /> : null}
                      </div>
                    </div>
                    <p className="exam-scope-desc">{course.mid.scope}</p>
                    <div className="exam-action-hint">
                      {isMidDone ? '✓ Prepared for Midterm' : 'Click to mark Midterm prepared'}
                    </div>
                  </div>

                  {/* Final Split */}
                  <div 
                    className={`exam-split-card ${isFinalDone ? 'completed' : ''}`}
                    onClick={() => toggleExamScope(course.id, 'final')}
                  >
                    <div className="exam-split-header">
                      <div className="exam-split-title-wrap">
                        <span className="exam-tag final">Final Scope</span>
                        <span className="exam-solves-sub">{course.final.solves}</span>
                      </div>
                      <div className={`exam-check-box ${isFinalDone ? 'checked' : ''}`}>
                        {isFinalDone ? <Check size={13} /> : null}
                      </div>
                    </div>
                    <p className="exam-scope-desc">{course.final.scope}</p>
                    <div className="exam-action-hint">
                      {isFinalDone ? '✓ Prepared for Final Exam' : 'Click to mark Final prepared'}
                    </div>
                  </div>

                </div>

                <div className="course-card-footer">
                  <span className="course-solves-info">
                    <CheckCircle2 size={13} /> {coursePercent === 100 ? 'Course Fully Prepared' : `${coursePercent}% Completed`}
                  </span>
                  <span className="course-topics-pill">2 Examination Phases</span>
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
