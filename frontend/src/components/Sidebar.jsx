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
      label: 'Segment 06', 
      path: '/eee/segment-06', 
      icon: <BookOpen size={18} />, 
      colorClass: 'icon-cyan' 
    },
    { 
      label: 'Segment 07', 
      path: '/eee/segment-07', 
      icon: <Layers size={18} />, 
      colorClass: 'icon-green' 
    },
    { 
      label: 'Segment 08', 
      path: '/eee/segment-08', 
      icon: <Activity size={18} />, 
      colorClass: 'icon-pink' 
    },
    { 
      label: 'Group A', 
      path: '/eee/group-a', 
      icon: <Settings2 size={18} />, 
      colorClass: 'icon-amber' 
    },
    { 
      label: 'CSE-3527', 
      path: '/compiler', 
      icon: <Terminal size={18} />, 
      colorClass: 'icon-teal',
      requiresAdmin: true
    },
    { 
      label: 'Segment 04', 
      path: '/compiler/segment-04', 
      icon: <Cpu size={18} />, 
      colorClass: 'icon-purple',
      requiresAdmin: true
    },
    { 
      label: 'Segment 06', 
      path: '/compiler/segment-06', 
      icon: <BookOpen size={18} />, 
      colorClass: 'icon-indigo',
      requiresAdmin: true
    },
    { 
      label: 'Segment 07', 
      path: '/compiler/segment-07', 
      icon: <Layers size={18} />, 
      colorClass: 'icon-blue',
      requiresAdmin: true
    },
    { 
      label: 'Segment 08', 
      path: '/compiler/segment-08', 
      icon: <Activity size={18} />, 
      colorClass: 'icon-orange',
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
