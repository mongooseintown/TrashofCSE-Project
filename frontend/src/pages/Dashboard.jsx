import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, ShieldAlert, Search, Filter, BookOpen, Plus, Folder, Sparkles } from 'lucide-react';
import './Dashboard.css';
import { getApiUrl } from '../config';
import DynamicNoteCard from '../components/DynamicNoteCard';
import StudentContributionModal from '../components/StudentContributionModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Dynamic uploads state
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApprovedUploads = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/materials?status=approved'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUploads(data);
      }
    } catch (err) {
      console.error('Error fetching approved materials on dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
      fetchApprovedUploads();
    }
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.error('Logout request failed:', err);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('profile-update'));
    navigate('/');
  };

  // Filter uploads client-side
  const filteredUploads = uploads.filter((u) => {
    const matchesSearch = u.title.toLowerCase().includes(search.toLowerCase()) || 
      (u.description && u.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCourse = courseFilter === 'all' || u.course === courseFilter;
    const matchesSegment = segmentFilter === 'all' || u.segment === segmentFilter;
    return matchesSearch && matchesCourse && matchesSegment;
  });

  return (
    <div className="dashboard-container">
      
      {/* Upper Welcome Banner */}
      <div className="dashboard-banner">
        <h1 className="welcome-title">
          Welcome back, {user ? user.fullName.split(' ')[0] : 'Student'}!
        </h1>
        <p className="welcome-subtitle">
          Manage your account profile, access course resources, and contribute class assets.
        </p>
      </div>

      <div className="dashboard-grid-layout">
        
        {/* LEFT COLUMN: User details & Settings */}
        <div className="dashboard-sidebar-column">
          <div className="dashboard-card">
            <div className="gear-icon-container">
              <Settings 
                size={32} 
                className="spinning-gear-animation"
                style={{ animation: 'spin 6s linear infinite' }}
              />
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>

            <h2 className="workspace-title">Workspace status</h2>

            <div className="dev-mode-badge">
              <ShieldAlert size={15} />
              DEVELOPMENT ACTIVE
            </div>

            <p className="dashboard-description">
              Our CSE analytics tools, performance metrics, and study tracking logs are currently undergoing optimization.
            </p>

            <div className="dashboard-actions">
              {user && (
                <span className="signed-in-text">
                  Signed in as: <strong>{user.fullName}</strong>
                </span>
              )}
              
              <button onClick={handleLogout} className="btn-logout">
                <LogOut size={15} />
                Log Out Account
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dynamic Shared Resource Hub */}
        <div className="dashboard-content-column">
          <div className="shared-hub-card">
            
            {/* Hub Header */}
            <div className="hub-header">
              <div className="hub-title-block">
                <h3>
                  <BookOpen size={20} className="hub-header-icon" />
                  Shared resources hub
                </h3>
                <p>Access notes, slides, and previous year question solutions shared by classmates.</p>
              </div>
              
              <button onClick={() => setIsModalOpen(true)} className="hub-contribute-btn">
                <Plus size={16} /> Contribute notes
              </button>
            </div>

            {/* Filter controls row */}
            <div className="hub-filters-row">
              <div className="search-box-wrapper">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search resources by title or context..."
                  className="search-input"
                />
              </div>

              <div className="dropdowns-group">
                <div className="filter-select-wrapper">
                  <BookOpen size={14} className="filter-icon" />
                  <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                    <option value="all">All Courses</option>
                    <option value="eee">EEE-2421</option>
                    <option value="ca">CSE-3523 (CA)</option>
                    <option value="compiler">CSE-3527 (Compiler)</option>
                    <option value="sad">CSE-3611 (SAD)</option>
                  </select>
                </div>

                <div className="filter-select-wrapper">
                  <Folder size={14} className="filter-icon" />
                  <select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)}>
                    <option value="all">All Segments</option>
                    <option value="04">Segment 04</option>
                    <option value="05">Segment 05</option>
                    <option value="06">Segment 06</option>
                    <option value="07">Segment 07</option>
                    <option value="08">Segment 08</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Feed */}
            {loading ? (
              <div className="hub-state-message">Loading shared files...</div>
            ) : filteredUploads.length === 0 ? (
              <div className="hub-empty-state">
                <Sparkles size={32} className="empty-sparkle-icon" />
                <p>No shared materials match your filter requirements.</p>
                <span>Be the first to share notes for this course/segment!</span>
              </div>
            ) : (
              <div className="hub-products-grid">
                {filteredUploads.map((upload) => (
                  <DynamicNoteCard
                    key={upload._id}
                    upload={upload}
                    onClick={() => navigate(`/materials/view/${upload._id}`)}
                  />
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Global Contribution Modal */}
      <StudentContributionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchApprovedUploads();
        }}
      />

    </div>
  );
};

export default Dashboard;
