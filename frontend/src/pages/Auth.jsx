import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sparkles } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { getApiUrl } from '../config';
import './Auth.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isProcessingRef = useRef(false);

  const handleBackendAuth = async (firebaseUser) => {
    if (!firebaseUser || !firebaseUser.email || isProcessingRef.current) return;
    isProcessingRef.current = true;
    setLoading(true);
    setError('');

    try {
      const userEmail = firebaseUser.email.trim().toLowerCase();
      const name = firebaseUser.displayName || userEmail.split('@')[0];

      const response = await fetch(getApiUrl('/api/auth/social'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          fullName: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed. Please verify server connection.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        semester: data.semester || '',
        department: data.department || '',
        isAdmin: data.isAdmin || false,
      }));

      window.dispatchEvent(new Event('profile-update'));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || 'Social authentication error');
      isProcessingRef.current = false;
      setLoading(false);
      setIsRedirecting(false);
    }
  };

  useEffect(() => {
    fetch(getApiUrl('/api/health'), { keepalive: true }).catch(() => {});

    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Check if returning from a mobile redirect flow
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          handleBackendAuth(result.user);
        }
      })
      .catch((err) => {
        console.error("Redirect auth error:", err);
        setError(err.message);
      });
  }, [navigate]);

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleProvider);
      await handleBackendAuth(result.user);
    } catch (err) {
      console.warn("Popup error:", err);
      if (
        err.code === 'auth/popup-blocked' ||
        err.code === 'auth/operation-not-supported-in-this-environment' ||
        /Android|iPhone|iPad/i.test(navigator.userAgent)
      ) {
        setIsRedirecting(true);
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          setError(redirectErr.message);
          setLoading(false);
          setIsRedirecting(false);
          return;
        }
      }
      if (err.code === 'auth/popup-closed-by-user') {
        setLoading(false);
        return;
      }
      setError(err.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  return (
    <div className="idraft-auth-page">
      <div className="idraft-auth-card">
        <div className="auth-brand">
          <div className="auth-logo-badge">
            <Sparkles size={20} />
          </div>
          <h1>Trash of CSE</h1>
          <p>Academic & Learning Command Center</p>
        </div>

        {error && <div className="auth-error-box">{error}</div>}

        <div className="auth-action-box">
          <button 
            className="google-signin-btn"
            disabled={loading}
            onClick={handleGoogleLogin}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>{loading || isRedirecting ? 'Authenticating...' : 'Continue with Google'}</span>
          </button>
        </div>

        <div className="auth-footer-note">
          Instant student access. No password required.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
