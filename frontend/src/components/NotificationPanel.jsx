import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, CheckCheck, Upload, Megaphone, Settings, Info, Trash2 } from 'lucide-react';
import { getApiUrl } from '../config';
import './NotificationPanel.css';

const typeIcons = {
  upload: <Upload size={18} />,
  update: <Settings size={18} />,
  announcement: <Megaphone size={18} />,
  system: <Info size={18} />,
};

const typeColors = {
  upload: '#3b82f6',
  update: '#f59e0b',
  announcement: '#8b5cf6',
  system: '#6b7280',
};

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // Fetch unread count periodically
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(getApiUrl('/api/notifications/unread-count'), { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.count);
      }
    } catch (err) {
      // silent fail
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/notifications'), { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
    setLoading(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) fetchNotifications();
  };

  const markAsRead = async (id) => {
    try {
      await fetch(getApiUrl(`/api/notifications/${id}/read`), { method: 'PUT', headers: getHeaders() });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(getApiUrl('/api/notifications/read-all'), { method: 'PUT', headers: getHeaders() });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="notif-wrapper" ref={panelRef}>
      {/* Bell Button */}
      <button className="notif-bell-btn" onClick={handleOpen} title="Notifications">
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {/* Panel Dropdown */}
      {isOpen && (
        <div className="notif-panel">
          {/* Panel Header */}
          <div className="notif-panel-header">
            <h3>Notifications</h3>
            <div className="notif-header-actions">
              {unreadCount > 0 && (
                <button className="notif-mark-all-btn" onClick={markAllAsRead} title="Mark all as read">
                  <CheckCheck size={15} /> Mark all read
                </button>
              )}
              <button className="notif-close-btn" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Panel Body */}
          <div className="notif-panel-body">
            {loading ? (
              <div className="notif-empty">
                <div className="notif-loader"></div>
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="notif-empty">
                <Bell size={32} strokeWidth={1.2} />
                <p>No notifications yet</p>
                <span>You're all caught up!</span>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`notif-item ${notif.isRead ? 'read' : 'unread'}`}
                  onClick={() => !notif.isRead && markAsRead(notif._id)}
                >
                  {/* Icon */}
                  <div className="notif-icon" style={{ background: `${typeColors[notif.type]}15`, color: typeColors[notif.type] }}>
                    {typeIcons[notif.type] || <Bell size={18} />}
                  </div>

                  {/* Content */}
                  <div className="notif-content">
                    <div className="notif-content-top">
                      <span className="notif-category" style={{ color: typeColors[notif.type] }}>
                        {notif.category?.toUpperCase()}
                      </span>
                      {!notif.isRead && <span className="notif-unread-dot"></span>}
                    </div>
                    <p className="notif-title">{notif.title}</p>
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">{formatTime(notif.createdAt)}</span>
                  </div>

                  {/* Read indicator */}
                  {!notif.isRead && (
                    <button className="notif-read-btn" onClick={(e) => { e.stopPropagation(); markAsRead(notif._id); }} title="Mark as read">
                      <Check size={14} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
