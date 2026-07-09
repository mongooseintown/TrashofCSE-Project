import React, { useState, useEffect, useRef } from 'react';
import { Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import './ActiveUsersWidget.css';

const ActiveUsersWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeData, setActiveData] = useState({ count: 1, users: [] });
  const [user, setUser] = useState(null);
  const popoverRef = useRef(null);

  // Check login state
  const checkUser = () => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed) {
          parsed.token = token;
          setUser(parsed);
          return parsed;
        }
      } catch (err) {
        console.error('Error parsing user in ActiveUsersWidget:', err);
      }
    }
    setUser(null);
    return null;
  };

  // Fetch active users list and send heartbeat
  const fetchActiveUsers = async (currentUser) => {
    const usr = currentUser || user;
    if (!usr || !usr.token) return;

    try {
      const response = await fetch('/api/auth/active-users', {
        headers: {
          'Authorization': `Bearer ${usr.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setActiveData(data);
      }
    } catch (err) {
      console.error('Failed to fetch active users:', err);
    }
  };

  const sendHeartbeat = async (currentUser) => {
    const usr = currentUser || user;
    if (!usr || !usr.token) return;

    try {
      await fetch('/api/auth/heartbeat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${usr.token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error('Failed to send heartbeat:', err);
    }
  };

  useEffect(() => {
    const usr = checkUser();

    // Listen to profile updates (login, logout, edit profile)
    const handleProfileUpdate = () => {
      const updatedUsr = checkUser();
      if (updatedUsr) {
        sendHeartbeat(updatedUsr);
        fetchActiveUsers(updatedUsr);
      }
    };

    window.addEventListener('profile-update', handleProfileUpdate);

    // Initial triggers
    if (usr) {
      sendHeartbeat(usr);
      fetchActiveUsers(usr);
    }

    // Heartbeat interval (45 seconds)
    const heartbeatInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        sendHeartbeat();
      }
    }, 45000);

    // Active users fetch interval (30 seconds)
    const fetchInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchActiveUsers();
      }
    }, 30000);

    // Close popover when clicking outside
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(fetchInterval);
      window.removeEventListener('profile-update', handleProfileUpdate);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [user?.token]);

  // If user is not logged in, don't show the widget
  if (!user) return null;

  return (
    <div className="active-users-widget-container" ref={popoverRef}>
      {/* Floating Trigger Button */}
      <button 
        className={`active-users-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="View Online Users"
      >
        <div className="pulse-dot"></div>
        <Users size={18} />
        <span className="active-count-label">{activeData.count} online</span>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="active-users-popover glassmorphic-card">
          <div className="popover-header">
            <h4>Live Online Users</h4>
            <span className="online-badge">
              <span className="pulse-dot inline"></span> Live
            </span>
          </div>

          <div className="popover-body">
            {activeData.users.length === 0 ? (
              <div className="no-users-state">
                <CheckCircle2 size={24} className="success-icon" />
                <p>Only you are online right now.</p>
              </div>
            ) : (
              <div className="active-users-list">
                {activeData.users.map((activeUser) => {
                  const isSelf = activeUser.id === user._id;
                  return (
                    <div key={activeUser.id} className={`active-user-item ${isSelf ? 'is-self' : ''}`}>
                      <div className="user-avatar-indicator">
                        <div className="avatar-placeholder">
                          {activeUser.fullName.charAt(0).toUpperCase()}
                        </div>
                        <span className="status-dot-glowing"></span>
                      </div>
                      <div className="user-info-text">
                        <span className="user-name">
                          {activeUser.fullName} {isSelf && <span className="self-tag">(You)</span>}
                        </span>
                        <div className="user-meta-details">
                          {activeUser.semester ? (
                            <span className="user-sem-badge">{activeUser.semester} Sem</span>
                          ) : (
                            <span className="user-sem-badge none">Guest</span>
                          )}
                          {activeUser.department && (
                            <span className="user-dept-text">{activeUser.department}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUsersWidget;
