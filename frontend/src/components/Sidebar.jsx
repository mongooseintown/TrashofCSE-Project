import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Terminal, 
  Cpu,
  PanelLeftClose, 
  PanelLeft, 
  Lock,
  GraduationCap
} from 'lucide-react';
import './Sidebar.css';

// Semester-to-courses mapping based on IIUC CSE syllabus
const SEMESTER_COURSES = {
  '5th': [
    { 
      label: 'EEE-2421', 
      path: '/eee', 
      icon: <Zap size={18} />, 
      colorClass: 'icon-blue' 
    },
    { 
      label: 'CSE-3527', 
      path: '/compiler', 
      icon: <Terminal size={18} />, 
      colorClass: 'icon-teal',
      requiresAdmin: true
    },
    { 
      label: 'CSE-3523', 
      path: '/computer-architecture', 
      icon: <Cpu size={18} />, 
      colorClass: 'icon-purple'
    },
  ],
  // Future semesters can be added here
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [semester, setSemester] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setIsAdmin(!!parsed.isAdmin);
        setSemester(parsed.semester || '');
      } catch (err) {
        console.error('Error parsing user in Sidebar:', err);
      }
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  const handleNav = (path, requiresAdmin = false) => {
    if (requiresAdmin && !isAdmin) {
      navigate('/compiler/locked');
    } else {
      navigate(path);
    }
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  // Get courses for current semester
  const courses = SEMESTER_COURSES[semester] || [];

  return (
    <div className={`glass-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!isCollapsed && <span className="sidebar-title">Portal Navigator</span>}
        <button 
          className="sidebar-toggle-btn" 
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        {courses.length > 0 ? (
          // Render semester courses
          courses.map((item, idx) => (
            <div 
              key={idx}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNav(item.path, item.requiresAdmin)}
            >
              <div className={`sidebar-icon ${item.colorClass}`}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="sidebar-label">
                  {item.label}
                  {item.requiresAdmin && !isAdmin && (
                    <Lock size={11} className="sidebar-lock-icon" />
                  )}
                </span>
              )}
            </div>
          ))
        ) : (
          // No semester selected — show prompt
          !isCollapsed && (
            <div className="sidebar-no-semester">
              <div className="no-sem-icon">
                <GraduationCap size={32} />
              </div>
              <h3>Select Your Semester</h3>
              <p>
                Head over to your profile and choose your current semester to unlock semester-wise course navigation.
              </p>
              <button 
                className="no-sem-btn"
                onClick={() => navigate('/profile')}
              >
                Go to Profile
              </button>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <span className="sidebar-brand">TrashofCSE</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
