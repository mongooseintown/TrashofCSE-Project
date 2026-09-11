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
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Hash,
  Compass,
  MessageSquare
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

      // Update local storage and profile state
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

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);

      setSuccess('Profile and settings updated successfully!');
      
      // Dispatch events to update UI immediately
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
      
      {/* Top Header Bar */}
      <div className="prof-nav-header">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="prof-back-btn"
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
          <span>Dashboard</span>
        </button>

        <div className="prof-header-title-group">
          <div className="prof-badge-pill">
            <Sparkles size={13} /> Student Identity System
          </div>
          <h1 className="prof-page-title">Profile & Academic Settings</h1>
        </div>
      </div>

      {loading ? (
        <div className="prof-loading-state">
          <div className="prof-loader"></div>
          <p>Decrypting student profile credentials...</p>
        </div>
      ) : (
        <div className="prof-grid-container">
          
          {/* LEFT COLUMN: Cyber Student ID Badge */}
          <aside className="prof-id-card">
            
            {/* Top Accent Strip */}
            <div className="prof-id-top-bar">
              <span className="prof-id-inst">INTERNATIONAL ISLAMIC UNIVERSITY CHITTAGONG</span>
              <span className="prof-id-dot"></span>
            </div>

            {/* Avatar Section */}
            <div className="prof-avatar-outer">
              <div className="prof-avatar-glow">
                <div className="prof-avatar-circle">
                  {getInitials(profile.fullName)}
                </div>
              </div>
              <span className="prof-status-tag" title="Connected to Academic Gateway">
                <span className="prof-beacon"></span> Active Scholar
              </span>
            </div>

            {/* Name & Academic Rank */}
            <h2 className="prof-card-name">{profile.fullName || 'Student'}</h2>
            <p className="prof-card-email">
              <Mail size={14} />
              <span>{profile.email}</span>
            </p>

            {/* Chips & Tags */}
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

            {/* Academic Credential Details */}
            <div className="prof-meta-list">
              <div className="prof-meta-item">
                <div className="prof-meta-icon">
                  <Shield size={15} />
                </div>
                <div className="prof-meta-text">
                  <span className="prof-meta-label">Access Tier</span>
                  <span className="prof-meta-val">{profile.isAdmin ? 'Admin / Moderator Access' : 'Verified CSE Student'}</span>
                </div>
              </div>

              <div className="prof-meta-item">
                <div className="prof-meta-icon">
                  <Calendar size={15} />
                </div>
                <div className="prof-meta-text">
                  <span className="prof-meta-label">Registration Date</span>
                  <span className="prof-meta-val">{formatDate(profile.createdAt)}</span>
                </div>
              </div>

              <div className="prof-meta-item">
                <div className="prof-meta-icon">
                  <Compass size={15} />
                </div>
                <div className="prof-meta-text">
                  <span className="prof-meta-label">Portal Status</span>
                  <span className="prof-meta-val highlight">Encrypted • 100% Coded</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="prof-quick-actions">
              <button onClick={() => navigate('/feed')} className="prof-id-action-btn">
                <MessageSquare size={15} /> Open Feed
              </button>
              <button onClick={() => navigate('/dashboard')} className="prof-id-action-btn">
                <Compass size={15} /> Open Dashboard
              </button>
            </div>

          </aside>

          {/* RIGHT COLUMN: Settings Form */}
          <main className="prof-settings-panel">
            
            <div className="prof-settings-header">
              <h2>Account & Academic Configurations</h2>
              <p>Update your academic semester and credentials to calibrate the system.</p>
            </div>

            {/* Alerts */}
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
              
              {/* SECTION 1: Personal Info */}
              <div className="prof-form-section">
                <h3 className="prof-section-heading">
                  <User size={16} /> Personal Information
                </h3>

                <div className="prof-field-group">
                  <label htmlFor="fullName">Full Legal Name</label>
                  <div className="prof-input-wrap">
                    <User size={18} className="prof-input-ico" />
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Khaled Bin Nasir"
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
              </div>

              {/* SECTION 2: Security & Password */}
              <div className="prof-form-section">
                <div className="prof-pw-header">
                  <h3 className="prof-section-heading">
                    <Key size={16} /> Security & Authentication
                  </h3>
                  <button
                    type="button"
                    className="prof-pw-toggle-btn"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                  >
                    {showPasswordSection ? 'Keep Existing Password' : 'Change Password'}
                  </button>
                </div>

                {showPasswordSection ? (
                  <div className="prof-pw-expandable">
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
                            placeholder="At least 6 characters"
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
                            placeholder="Re-enter new password"
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
                  <p className="prof-pw-status-note">
                    Your password was last encrypted and verified. Click above to update credentials.
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="prof-submit-row">
                <button
                  type="submit"
                  className="prof-submit-btn"
                  disabled={saving}
                >
                  <Save size={18} />
                  <span>{saving ? 'Saving Configurations...' : 'Save Profile Changes'}</span>
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
