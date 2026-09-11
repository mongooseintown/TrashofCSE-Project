import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Save, 
  Key, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Compass,
  MessageSquare,
  Lock,
  BadgeCheck,
  Check
} from 'lucide-react';
import { getApiUrl } from '../config';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    isAdmin: false,
    department: '',
    semester: '',
    createdAt: '',
  });

  // Form states
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  // Status states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('academic'); // 'academic' or 'security'

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(getApiUrl('/api/auth/profile'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch profile details');
      }

      setProfile(data);
      setFullName(data.fullName || '');
      setDepartment(data.department || '');
      setSemester(data.semester || '');
    } catch (err) {
      setError(err.message || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim()) {
      return setError('Full Name cannot be empty');
    }

    const updatePassword = currentPassword || newPassword || confirmPassword;
    if (updatePassword) {
      if (!currentPassword) {
        return setError('Please enter your current password to change it');
      }
      if (newPassword.length < 6) {
        return setError('New password must be at least 6 characters long');
      }
      if (newPassword !== confirmPassword) {
        return setError('New passwords do not match');
      }
    }

    setSaving(true);
    const token = localStorage.getItem('token');

    try {
      const updateData = {
        fullName,
        department,
        semester,
      };

      if (updatePassword) {
        updateData.currentPassword = currentPassword;
        updateData.password = newPassword;
      }

      const res = await fetch(getApiUrl('/api/auth/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      localStorage.setItem('user', JSON.stringify({ 
        fullName: data.fullName, 
        email: data.email, 
        semester: data.semester || '', 
        department: data.department || '', 
        isAdmin: data.isAdmin || false 
      }));
      
      setProfile({
        ...profile,
        fullName: data.fullName,
        department: data.department,
        semester: data.semester,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);

      setSuccess('Profile and settings updated successfully!');
      window.dispatchEvent(new Event('profile-update'));
    } catch (err) {
      setError(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Active Student';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="prof-root">
      
      {/* Navigation Header */}
      <div className="prof-nav-header">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="prof-back-btn"
          title="Back to Dashboard"
        >
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </button>

        <div className="prof-header-title-group">
          <h1 className="prof-page-title">Student Profile & Settings</h1>
          <p className="prof-page-subtitle">Configure your academic track, semester calibrations, and credentials</p>
        </div>
      </div>

      {loading ? (
        <div className="prof-loading-state">
          <div className="prof-loader"></div>
          <p>Loading academic profile...</p>
        </div>
      ) : (
        <div className="prof-grid-container">
          
          {/* LEFT COLUMN: Student ID Badge */}
          <aside className="prof-id-card">
            <div className="prof-id-top-bar">
              <div className="prof-id-inst-group">
                <span className="prof-id-inst">TRASH OF CSE • STUDENT PASSPORT</span>
              </div>
              <span className="prof-id-dot" title="Active Account"></span>
            </div>

            <div className="prof-avatar-outer">
              <div className="prof-avatar-circle">
                {getInitials(profile.fullName)}
              </div>
              <span className="prof-status-tag">
                <span className="prof-beacon"></span> Active Scholar
              </span>
            </div>

            <div className="prof-name-group">
              <h2 className="prof-card-name">{profile.fullName || 'Student'}</h2>
              <BadgeCheck size={18} className="prof-verified-badge" />
            </div>

            <p className="prof-card-email">
              <Mail size={14} />
              <span>{profile.email}</span>
            </p>

            <div className="prof-chips-wrapper">
              <span className="prof-chip sem">
                <GraduationCap size={13} /> {profile.semester ? `${profile.semester} Semester` : 'Semester Unset'}
              </span>
              <span className="prof-chip dept">
                <Building size={13} /> {profile.department || 'CSE Dept'}
              </span>
              {profile.isAdmin && (
                <span className="prof-chip admin">
                  <Shield size={13} /> Administrator
                </span>
              )}
            </div>

            <div className="prof-divider"></div>

            <div className="prof-meta-list">
              <div className="prof-meta-item">
                <div className="prof-meta-icon">
                  <Shield size={15} />
                </div>
                <div className="prof-meta-text">
                  <span className="prof-meta-label">Access Level</span>
                  <span className="prof-meta-val">{profile.isAdmin ? 'Admin / Moderator' : 'Verified CSE Student'}</span>
                </div>
              </div>

              <div className="prof-meta-item">
                <div className="prof-meta-icon">
                  <Calendar size={15} />
                </div>
                <div className="prof-meta-text">
                  <span className="prof-meta-label">Enrolled Since</span>
                  <span className="prof-meta-val">{formatDate(profile.createdAt)}</span>
                </div>
              </div>

              <div className="prof-meta-item">
                <div className="prof-meta-icon">
                  <GraduationCap size={15} />
                </div>
                <div className="prof-meta-text">
                  <span className="prof-meta-label">Academic Program</span>
                  <span className="prof-meta-val">B.Sc. in Engineering</span>
                </div>
              </div>
            </div>

            <div className="prof-quick-actions">
              <button onClick={() => navigate('/dashboard')} className="prof-id-action-btn">
                <Compass size={15} /> Dashboard
              </button>
              <button onClick={() => navigate('/feed')} className="prof-id-action-btn">
                <MessageSquare size={15} /> Feed
              </button>
            </div>
          </aside>

          {/* RIGHT COLUMN: Settings Panel */}
          <main className="prof-settings-panel">
            
            {/* Tabs Header */}
            <div className="prof-tabs-header">
              <button 
                className={`prof-tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
                onClick={() => setActiveTab('academic')}
              >
                <User size={16} />
                <span>Academic & Personal</span>
              </button>
              <button 
                className={`prof-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Lock size={16} />
                <span>Security & Password</span>
              </button>
            </div>

            {/* Notification Alerts */}
            {error && (
              <div className="prof-alert error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="prof-alert success">
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="prof-form">
              
              {activeTab === 'academic' && (
                <div className="prof-form-section">
                  <div className="prof-section-info">
                    <h3>Personal & Department Details</h3>
                    <p>Update your full name, department, and semester to calibrate your dashboard</p>
                  </div>

                  <div className="prof-field-group">
                    <label htmlFor="fullName">Full Legal Name</label>
                    <div className="prof-input-wrap">
                      <User size={18} className="prof-input-ico" />
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Farhan Ahmed"
                        required
                      />
                    </div>
                  </div>

                  <div className="prof-field-row">
                    <div className="prof-field-group">
                      <label htmlFor="department">Engineering Department</label>
                      <div className="prof-input-wrap">
                        <Building size={18} className="prof-input-ico" />
                        <select
                          id="department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        >
                          <option value="">Select Department</option>
                          <option value="CSE">Computer Science & Engineering (CSE)</option>
                          <option value="EEE">Electrical & Electronic Engineering (EEE)</option>
                          <option value="CCE">Computer & Communication Engineering (CCE)</option>
                          <option value="ME">Mechanical Engineering (ME)</option>
                          <option value="Civil">Civil Engineering</option>
                          <option value="Pharmacy">Pharmacy</option>
                          <option value="BBA">Business Administration</option>
                        </select>
                      </div>
                    </div>

                    <div className="prof-field-group">
                      <label htmlFor="semester">Current Academic Semester</label>
                      <div className="prof-input-wrap">
                        <GraduationCap size={18} className="prof-input-ico" />
                        <select
                          id="semester"
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                        >
                          <option value="">Select Semester</option>
                          <option value="1st">1st Semester</option>
                          <option value="2nd">2nd Semester</option>
                          <option value="3rd">3rd Semester</option>
                          <option value="4th">4th Semester</option>
                          <option value="5th">5th Semester</option>
                          <option value="6th">6th Semester</option>
                          <option value="7th">7th Semester</option>
                          <option value="8th">8th Semester</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="prof-field-group">
                    <label>Registered Account Email</label>
                    <div className="prof-input-wrap disabled">
                      <Mail size={18} className="prof-input-ico" />
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        readOnly
                      />
                      <span className="prof-input-tag">Verified</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="prof-form-section">
                  <div className="prof-section-info">
                    <h3>Account Security</h3>
                    <p>Manage your account password and security authentications</p>
                  </div>

                  <div className="prof-pw-box">
                    <div className="prof-pw-box-header">
                      <div>
                        <h4>Password Protection</h4>
                        <p>Change your password if you signed in with credentials</p>
                      </div>
                      <button
                        type="button"
                        className="prof-pw-toggle-btn"
                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                      >
                        {showPasswordSection ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>

                    {showPasswordSection ? (
                      <div className="prof-pw-fields">
                        <div className="prof-field-group">
                          <label htmlFor="currentPassword">Current Password</label>
                          <div className="prof-input-wrap">
                            <Key size={18} className="prof-input-ico" />
                            <input
                              type={showPass.current ? 'text' : 'password'}
                              id="currentPassword"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="Enter your current password"
                              required={showPasswordSection}
                            />
                            <button
                              type="button"
                              className="prof-eye-btn"
                              onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
                            >
                              {showPass.current ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <div className="prof-field-row">
                          <div className="prof-field-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="prof-input-wrap">
                              <Key size={18} className="prof-input-ico" />
                              <input
                                type={showPass.new ? 'text' : 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                required={showPasswordSection}
                              />
                              <button
                                type="button"
                                className="prof-eye-btn"
                                onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
                              >
                                {showPass.new ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>

                          <div className="prof-field-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <div className="prof-input-wrap">
                              <Key size={18} className="prof-input-ico" />
                              <input
                                type={showPass.confirm ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-type new password"
                                required={showPasswordSection}
                              />
                              <button
                                type="button"
                                className="prof-eye-btn"
                                onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
                              >
                                {showPass.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="prof-pw-status-badge">
                        <Check size={14} /> Password is encrypted and active
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Action */}
              <div className="prof-submit-row">
                <button
                  type="submit"
                  className="prof-submit-btn"
                  disabled={saving}
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
                </button>
              </div>

            </form>

          </main>

        </div>
      )}

    </div>
  );
};

export default Profile;
