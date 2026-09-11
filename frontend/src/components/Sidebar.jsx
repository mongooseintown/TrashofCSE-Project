import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  PanelLeftClose, 
  PanelLeft, 
  GraduationCap,
  MessageSquare,
  User,
  Sparkles
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  const updateSidebarUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing user in Sidebar:', err);
      }
    }
  };

  useEffect(() => {
    updateSidebarUser();
    window.addEventListener('profile-update', updateSidebarUser);
    return () => {
      window.removeEventListener('profile-update', updateSidebarUser);
    };
  }, [location]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`glass-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          {!isCollapsed && <span className="sidebar-title">Student Portal</span>}
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
          {/* Dashboard */}
          <div 
            className={`sidebar-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            <div className="sidebar-icon icon-teal">
              <LayoutDashboard size={18} />
            </div>
            {!isCollapsed && (
              <span className="sidebar-label">Dashboard</span>
            )}
          </div>

          {/* Community Feed */}
          <div 
            className={`sidebar-item ${isActive('/feed') ? 'active' : ''}`}
            onClick={() => navigate('/feed')}
          >
            <div className="sidebar-icon icon-pink">
              <MessageSquare size={18} />
            </div>
            {!isCollapsed && (
              <span className="sidebar-label">Community Feed</span>
            )}
          </div>

          {/* Student Profile */}
          <div 
            className={`sidebar-item ${isActive('/profile') ? 'active' : ''}`}
            onClick={() => navigate('/profile')}
          >
            <div className="sidebar-icon icon-purple">
              <User size={18} />
            </div>
            {!isCollapsed && (
              <span className="sidebar-label">Student Profile</span>
            )}
          </div>

          <div className="sidebar-divider"></div>

          {/* Fresh Workspace State */}
          {!isCollapsed && (
            <div className="sidebar-no-semester">
              <div className="no-sem-icon">
                <Sparkles size={26} />
              </div>
              <h3>Fresh Workspace</h3>
              <p>
                All old syllabus content has been cleared. When you're ready, manually code your courses and lecture notes.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <span className="sidebar-brand">TrashofCSE</span>
          </div>
        )}
      </div>

      {/* Mobile Drawer Trigger */}
      {isCollapsed && (
        <button 
          className="sidebar-mobile-expand-btn"
          onClick={toggleSidebar}
          title="Expand Sidebar"
        >
          <PanelLeft size={18} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
