import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Shield, Save, Key, Eye, EyeOff } from 'lucide-react';
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

    // Password validation if password section is open and fields have values
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ fullName: data.fullName, email: data.email }));
      
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

      setSuccess('Profile updated successfully');
      
      // Dispatch event to update Navbar immediately
      window.dispatchEvent(new Event('theme-change'));
    } catch (err) {
      setError(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="profile-container">
      {/* Header with Back Button */}
      <div className="profile-header">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="profile-back-btn"
          title="Back to Dashboard"
        >
          <ArrowLeft size={20} />
          <span>Dashboard</span>
        </button>
        <h1>My Profile</h1>
      </div>

      {loading ? (
        <div className="profile-loading">
          <div className="profile-spinner"></div>
          <p>Loading profile details...</p>
        </div>
      ) : (
        <div className="profile-layout">
          {/* Left Column: User Card */}
          <div className="profile-sidebar-card">
            <div className="profile-avatar-gradient">
              {getInitials(profile.fullName)}
            </div>
            <h2>{profile.fullName}</h2>
            <p className="profile-email-badge">
              <Mail size={14} />
              <span>{profile.email}</span>
            </p>

            <div className="profile-meta-info">
              <div className="profile-meta-row">
                <Shield size={16} />
                <div>
                  <span className="meta-label">Role</span>
                  <span className="meta-value">{profile.isAdmin ? 'Admin / Moderator' : 'IIUC Student'}</span>
                </div>
              </div>
              <div className="profile-meta-row">
                <Calendar size={16} />
                <div>
                  <span className="meta-label">Member Since</span>
                  <span className="meta-value">{formatDate(profile.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Form */}
          <div className="profile-settings-card">
            <h2>Account Settings</h2>
            <p className="settings-desc">Update your personal information and profile configurations.</p>

            {error && <div className="profile-alert profile-alert-danger">{error}</div>}
            {success && <div className="profile-alert profile-alert-success">{success}</div>}

            <form onSubmit={handleUpdateProfile} className="profile-form">
              {/* Form Row: Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Form Row: Department and Semester */}
              <div className="form-row-grid">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
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

                <div className="form-group">
                  <label htmlFor="semester">Current Semester</label>
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

              {/* Toggleable Password Section */}
              <div className="password-section-toggle">
                <button
                  type="button"
                  className="btn-link-toggle"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                >
                  <Key size={16} />
                  <span>{showPasswordSection ? 'Cancel Password Change' : 'Change Password'}</span>
                </button>
              </div>

              {showPasswordSection && (
                <div className="password-fields-container">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="input-with-icon">
                      <Key size={18} />
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
                        className="toggle-pw-btn"
                        onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
                      >
                        {showPass.current ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <div className="input-with-icon">
                        <Key size={18} />
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
                          className="toggle-pw-btn"
                          onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
                        >
                          {showPass.new ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <div className="input-with-icon">
                        <Key size={18} />
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
                          className="toggle-pw-btn"
                          onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
                        >
                          {showPass.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-profile-submit"
                disabled={saving}
              >
                <Save size={18} />
                <span>{saving ? 'Saving changes...' : 'Save Settings'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
