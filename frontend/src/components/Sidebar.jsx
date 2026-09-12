import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Settings, 
  PanelLeftClose, 
  PanelLeft,
  BarChart3,
  LogOut
} from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getApiUrl } from '../config';
import './Sidebar.css';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'feed', label: 'Community Feed', icon: MessageSquare, path: '/feed' },
  { id: 'profile', label: 'My Profile', icon: User, path: '/profile' },
  { id: 'stats', label: 'Statistics', icon: BarChart3, path: '/dashboard' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside className={`idraft-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Brand */}
        <div className="ids-brand">
          {!isCollapsed && (
            <div className="ids-brand-info">
              <img src="/logo.png" alt="Logo" className="ids-brand-logo" />
              <span className="ids-brand-name">TrashofCSE</span>
            </div>
          )}
          <button className="ids-collapse-btn" onClick={toggleSidebar}>
            {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="ids-nav">
          {MENU_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`ids-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
                title={item.label}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="ids-footer">
          <button className="ids-nav-item" onClick={() => navigate('/profile')} title="Settings">
            <Settings size={18} />
            {!isCollapsed && <span>Settings</span>}
          </button>
          <button 
            className="ids-nav-item logout" 
            onClick={async () => {
              const token = localStorage.getItem('token');
              if (token) {
                try {
                  await fetch(getApiUrl('/api/auth/logout'), {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                  });
                } catch (e) {}
              }
              try {
                await signOut(auth);
              } catch (e) {}
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.dispatchEvent(new Event('profile-update'));
              navigate('/login', { replace: true });
            }}
            title="Log Out"
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {isCollapsed && (
        <button className="ids-mobile-expand" onClick={toggleSidebar}>
          <PanelLeft size={18} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
