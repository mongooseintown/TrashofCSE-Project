import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn, KeyRound } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { getApiUrl } from '../config';
import './Auth.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // 1. Check if already logged in via our token
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
      return;
    }

    // 2. Check if returning from Google Redirect
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setLoading(true);
          const user = result.user;
          const userEmail = user.email;
          const name = user.displayName || userEmail.split('@')[0];

          if (!userEmail) {
            throw new Error('No email address associated with this social account.');
          }

          const normalizedEmail = userEmail.trim().toLowerCase();

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
          localStorage.setItem('user', JSON.stringify({ 
            fullName: data.fullName, 
            email: data.email, 
            semester: data.semester || '', 
            department: data.department || '', 
            isAdmin: data.isAdmin || false 
          }));
          navigate('/dashboard');
        }
      } catch (err) {
        let errMsg = err.message || 'Social authentication error';
        // Handle specific redirect errors if necessary
        setError(errMsg);
      } finally {
        // Only set loading false if we didn't navigate away
        if (!localStorage.getItem('token')) {
          setLoading(false);
        }
      }
    };

    checkRedirectResult();
  }, [navigate]);

  const handleGoogleLogin = () => {
    setError('');
    setIsRedirecting(true);
    setTimeout(() => {
      signInWithRedirect(auth, googleProvider);
    }, 600);
  };

  return (
    <div className="login-page-wrapper">
      
      {/* Redirection Overlay */}
      {(isRedirecting || loading) && (
        <div className="auth-redirect-overlay">
          <div className="auth-overlay-content">
            <div className="auth-spinner"></div>
            <p>{isRedirecting ? 'Redirecting to Google...' : 'Authenticating...'}</p>
          </div>
        </div>
      )}

      {/* Background Layer with glow and text */}
      <div className="login-bg-glow"></div>
      <div className="login-bg-text">AUTH</div>

      {/* Decorative Circuitry Lines */}
      <svg className="login-circuitry top-left" viewBox="0 0 200 200">
        <path d="M0,50 L100,150 L200,150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="100" cy="150" r="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <circle cx="200" cy="150" r="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>
      <svg className="login-circuitry top-right" viewBox="0 0 200 200">
        <path d="M200,50 L100,150 L0,150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="100" cy="150" r="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <circle cx="0" cy="150" r="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>

      <div className="login-content-container">
        
        {/* Left Side: Info & Links */}
        <div className="login-left-panel">
          <div className="login-badge">
            <LogIn size={16} /> Authenticate
          </div>
          <h1 className="login-hero-title">Get Started</h1>
          <p className="login-hero-desc">
            Use your Google account for instant access to the platform. No passwords required.
          </p>

          <div className="login-action-cards">
            {/* Need Help Card */}
            <div className="login-action-card">
              <div className="login-action-icon">
                <KeyRound size={24} color="#fff" />
              </div>
              <div className="login-action-text">
                <h3>Need Help?</h3>
                <p>Contact Support</p>
              </div>
              <div className="login-action-arrow">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphism Form replaced by Google Auth */}
        <div className="login-right-panel">
          <div className="login-glass-form" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem' }}>Instant Access</h2>
            <p style={{ color: '#888', marginBottom: '3rem' }}>Use your Google account to log in instantly without passwords.</p>

            {error && <div className="login-alert error" style={{ width: '100%', marginBottom: '2rem' }}>{error}</div>}
            {success && <div className="login-alert success" style={{ width: '100%', marginBottom: '2rem' }}>{success}</div>}

            <button 
              className="login-submit-btn" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '1rem',
                padding: '1.5rem',
                fontSize: '1.1rem'
              }}
              disabled={loading}
              onClick={handleGoogleLogin}
            >
              {!loading && (
                <svg width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              )}
              {loading ? 'Authenticating...' : 'Continue with Google'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
