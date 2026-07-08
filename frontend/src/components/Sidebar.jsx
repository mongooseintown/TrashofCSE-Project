import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Zap, 
  Terminal, 
  User, 
  PanelLeftClose, 
  PanelLeft, 
  Lock, 
  ChevronDown, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Expanded state for nested course menus
  const [eeeExpanded, setEeeExpanded] = useState(true);
  const [compilerExpanded, setCompilerExpanded] = useState(true);

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
    // Dispatch custom event to notify parent containers of sidebar size change
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

  // Helper to determine active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`glass-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && <span className="sidebar-title">Portal Navigator</span>}
        <button 
          className="sidebar-toggle-btn" 
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="sidebar-menu">
        
        {/* Item 1: EEE 101 */}
        <div className="menu-group">
          <div 
            className={`menu-item has-sub ${isActive('/eee') ? 'active' : ''}`}
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
                setEeeExpanded(true);
              } else {
                setEeeExpanded(!eeeExpanded);
              }
            }}
          >
            <div className="menu-icon-wrapper blue-bg" onClick={(e) => {
              if (isCollapsed) return;
              e.stopPropagation();
              handleNav('/eee');
            }}>
              <Zap size={18} />
            </div>
            {!isCollapsed && (
              <>
                <span className="menu-label" onClick={(e) => {
                  e.stopPropagation();
                  handleNav('/eee');
                }}>EEE 101 (Zap)</span>
                <span className="menu-chevron">
                  {eeeExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </>
            )}
          </div>

          {/* EEE Submenu */}
          {!isCollapsed && eeeExpanded && (
            <div className="submenu">
              <div 
                className={`submenu-item ${isActive('/eee/segment-06') ? 'active' : ''}`}
                onClick={() => handleNav('/eee/segment-06')}
              >
                <span>Segment 06 (Intro)</span>
              </div>
              <div 
                className={`submenu-item ${isActive('/eee/segment-07') ? 'active' : ''}`}
                onClick={() => handleNav('/eee/segment-07')}
              >
                <span>Segment 07 (AC & Displays)</span>
              </div>
              <div 
                className={`submenu-item ${isActive('/eee/segment-08') ? 'active' : ''}`}
                onClick={() => handleNav('/eee/segment-08')}
              >
                <span>Segment 08 (Sensors)</span>
              </div>
              <div 
                className={`submenu-item ${isActive('/eee/group-a') ? 'active' : ''}`}
                onClick={() => handleNav('/eee/group-a')}
              >
                <span>Group A (Machines)</span>
              </div>
            </div>
          )}
        </div>

        {/* Item 2: Compiler Design */}
        <div className="menu-group">
          <div 
            className={`menu-item has-sub ${isActive('/compiler') ? 'active' : ''}`}
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
                setCompilerExpanded(true);
              } else {
                setCompilerExpanded(!compilerExpanded);
              }
            }}
          >
            <div className="menu-icon-wrapper teal-bg" onClick={(e) => {
              if (isCollapsed) return;
              e.stopPropagation();
              handleNav('/compiler', true);
            }}>
              <Terminal size={18} />
            </div>
            {!isCollapsed && (
              <>
                <span className="menu-label" onClick={(e) => {
                  e.stopPropagation();
                  handleNav('/compiler', true);
                }}>
                  Compiler Design
                  {!isAdmin && <Lock size={12} className="lock-indicator-badge" />}
                </span>
                <span className="menu-chevron">
                  {compilerExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </>
            )}
          </div>

          {/* Compiler Submenu */}
          {!isCollapsed && compilerExpanded && (
            <div className="submenu">
              <div 
                className={`submenu-item ${isActive('/compiler/segment-04') ? 'active' : ''}`}
                onClick={() => handleNav('/compiler/segment-04', true)}
              >
                <span>Segment 04 (Parser)</span>
              </div>
              <div 
                className={`submenu-item ${isActive('/compiler/segment-06') ? 'active' : ''}`}
                onClick={() => handleNav('/compiler/segment-06', true)}
              >
                <span>Segment 06 (SDT)</span>
              </div>
              <div 
                className={`submenu-item ${isActive('/compiler/segment-07') ? 'active' : ''}`}
                onClick={() => handleNav('/compiler/segment-07', true)}
              >
                <span>Segment 07 (Run-time)</span>
              </div>
              <div 
                className={`submenu-item ${isActive('/compiler/segment-08') ? 'active' : ''}`}
                onClick={() => handleNav('/compiler/segment-08', true)}
              >
                <span>Segment 08 (CodeGen)</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer Branding */}
      {!isCollapsed && (
        <div className="sidebar-footer-brand">
          <div className="footer-brand">TrashofCSE</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
