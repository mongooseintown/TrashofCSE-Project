import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { getApiUrl } from '../config';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const openSocialModal = async (platform) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const provider = platform === 'Google' ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email;
      const name = user.displayName || userEmail.split('@')[0];

      if (!userEmail) {
        throw new Error('No email address associated with this social account.');
      }

      const normalizedEmail = userEmail.trim().toLowerCase();
      const isAdminEmail = normalizedEmail === 'khaledbinnasir1714412140@gmail.com';
      const iiucEmailRegex = /^c\d+@ugrad\.iiuc\.ac\.bd$/i;

      if (!isAdminEmail && !iiucEmailRegex.test(normalizedEmail)) {
        await auth.signOut();
        throw new Error('Only IIUC student emails (cXXXXXX@ugrad.iiuc.ac.bd) are allowed');
      }

      // Call backend social route
      const response = await fetch(getApiUrl('/api/auth/social'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          fullName: name
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ fullName: data.fullName, email: data.email }));
      navigate('/dashboard');
    } catch (err) {
      // Firebase standard error parsing / styling
      let errMsg = err.message || 'Social authentication error';
      if (err.code === 'auth/popup-closed-by-user') {
        errMsg = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errMsg = 'Sign-in request was cancelled.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ fullName: data.fullName, email: data.email }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        
        {/* Left Side: Spotlight Banner */}
        <div className="register-banner">
          <img 
            src="/registration-spotlight.png" 
            alt="Spotlight banner background" 
            className="banner-spotlight-img"
          />
          <div className="banner-content">
            <h2>Where Ideas Take Off</h2>
            <p>We're waiting for your breakthroughs.</p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="register-form-area">
          <div className="back-btn-row">
            <button className="back-link-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="register-title-section">
            <h3>Create your account</h3>
            <p>Enter your personal data to create account.</p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              padding: '0.8rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              fontWeight: 500
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              padding: '0.8rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              fontWeight: 500
            }}>
              {success}
            </div>
          )}

          <form className="reg-form" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="reg-input-group">
              <label>Full name *</label>
              <div className="input-container">
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Maxim Anisimov" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="reg-input-group">
              <label>Email *</label>
              <div className="input-container">
                <input 
                  type="email" 
                  name="email"
                  placeholder="nezh.projects@gmail.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="reg-input-group">
              <label>Password</label>
              <div className="input-container">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  placeholder="••••••••••••••" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="reg-input-group">
              <label>Confirm password</label>
              <div className="input-container">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  name="confirmPassword"
                  placeholder="••••••••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Solid Orange Submit Button */}
            <button type="submit" className="reg-submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Social login option separator */}
          <div className="social-divider">
            <span>· Or continue with ·</span>
          </div>

          {/* Social buttons: Google */}
          <div className="social-row" style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="social-btn-item" aria-label="Google" onClick={() => openSocialModal('Google')}>
              <svg width="22" height="22" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            </button>
          </div>

          {/* Sign in redirect footer */}
          <div className="reg-footer-row">
            Already have an account? 
            <span className="reg-link-txt" onClick={() => navigate('/login')}>Log in</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
