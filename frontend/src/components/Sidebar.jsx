import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Terminal, 
  PanelLeftClose, 
  PanelLeft, 
  Lock, 
  BookOpen,
  Layers,
  Cpu,
  Activity,
  Settings2
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setIsAdmin(!!parsed.isAdmin);
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

  // Flat menu items — each one is a simple row like the reference image
  const menuItems = [
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
  ];

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

      {/* Flat Menu Items */}
      <div className="sidebar-menu">
        {menuItems.map((item, idx) => (
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
        ))}
      </div>

      {/* Footer — TrashofCSE Logo */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <span className="sidebar-brand">TrashofCSE</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
