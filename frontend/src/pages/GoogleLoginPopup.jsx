import React, { useState } from 'react';

const GoogleLoginPopup = () => {
  const [emailInput, setEmailInput] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const adminEmail = 'khaledbinnasir1714412140@gmail.com';
  const adminName = 'Khaled Bin Nasir';

  const iiucEmailRegex = /^c\d+@ugrad\.iiuc\.ac\.bd$/i;

  const handleSelectAccount = (email, name) => {
    setLoading(true);
    setError('');

    // Simulate small latency
    setTimeout(() => {
      if (window.opener) {
        window.opener.postMessage({
          type: 'GOOGLE_AUTH_SUCCESS',
          email,
          name
        }, '*');
        window.close();
      } else {
        setError('Connection to main window lost.');
        setLoading(false);
      }
    }, 1200);
  };

  const handleCustomEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmed = emailInput.trim();
    if (!trimmed) {
      return setError('Enter an email or phone number');
    }

    if (trimmed.toLowerCase() !== adminEmail && !iiucEmailRegex.test(trimmed)) {
      return setError('Only IIUC student email addresses (cXXXXXX@ugrad.iiuc.ac.bd) are allowed');
    }

    const name = trimmed.split('@')[0].toUpperCase();
    handleSelectAccount(trimmed, name);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#202124',
      fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        border: '1px solid #dadce0',
        borderRadius: '8px',
        padding: '2.5rem 2.5rem 3rem 2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        {/* Google Logo */}
        <div style={{ marginBottom: '1.5rem', alignSelf: 'center' }}>
          <svg width="74" height="24" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.24 17.92c-4.94 0-8.96-4.08-8.96-9.12S4.3 0 9.24 0c2.72 0 4.64 1.06 6.14 2.48l-1.74 1.74c-1.06-1-2.46-1.64-4.4-1.64-3.56 0-6.42 2.92-6.42 6.5s2.86 6.5 6.42 6.5c2.44 0 3.82-.98 4.7-1.88.74-.74 1.18-1.78 1.32-3.18H9.24v-2.38h10.98c.1.52.16 1.12.16 1.78 0 2.12-.58 4.24-2.02 5.68-1.4 1.48-3.26 2.34-5.96 2.34z" fill="#4285F4"/>
            <path d="M28.02 12.06c0 3.16-2.36 5.46-5.26 5.46s-5.26-2.3-5.26-5.46 2.36-5.46 5.26-5.46 5.26 2.3 5.26 5.46zm-2.42 0c0-1.92-1.32-3.26-2.84-3.26s-2.84 1.34-2.84 3.26 1.32 3.26 2.84 3.26 2.84-1.34 2.84-3.26z" fill="#EA4335"/>
            <path d="M39.54 12.06c0 3.16-2.36 5.46-5.26 5.46s-5.26-2.3-5.26-5.46 2.36-5.46 5.26-5.46 5.26 2.3 5.26 5.46zm-2.42 0c0-1.92-1.32-3.26-2.84-3.26s-2.84 1.34-2.84 3.26 1.32 3.26 2.84 3.26 2.84-1.34 2.84-3.26z" fill="#FBBC05"/>
            <path d="M50.46 7.02v10.3c0 4.24-2.5 5.98-5.44 5.98-2.78 0-4.44-1.86-5.08-3.42l2.12-.88c.38.9.1.3 1.3 1.98.8.54 1.4 1.18 2.38 1.18 1.84 0 2.98-1.14 2.98-3.28V16.8h-.08c-.58.72-1.7 1.38-3.1 1.38-2.92 0-5.56-2.54-5.56-6.06s2.64-6.12 5.56-6.12c1.4 0 2.52.66 3.1 1.36h.08V7.02h2.24zm-2.32 5.08c0-1.9-1.3-3.28-2.8-3.28s-2.84 1.38-2.84 3.28 1.34 3.24 2.84 3.24 2.8-1.34 2.8-3.24z" fill="#4285F4"/>
            <path d="M54.82.6v16.7h-2.38V.6h2.38z" fill="#34A853"/>
            <path d="M64.68 14.18l1.9 1.26c-.62.92-2.12 2.48-4.94 2.48-3.36 0-5.88-2.6-5.88-6.06 0-3.6 2.54-6.06 5.58-6.06 3.08 0 4.54 2.5 5.04 3.86l.26.66-7.8 3.22c.6.18 1.54 1.18 2.68 1.18 1.14 0 1.94-.56 2.48-1.34v.02zm-5.74-2.28l5.22-2.16c-.28-.72-1.14-1.24-2.14-1.24-1.36 0-2.92 1.2-3.08 3.4z" fill="#EA4335"/>
          </svg>
        </div>

        {loading ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #1a73e8',
              borderRadius: '50%',
              animation: 'popup-spin 1s linear infinite'
            }} />
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#5f6368' }}>Connecting with Google...</p>
            <style>{`
              @keyframes popup-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : !showEmailInput ? (
          <div style={{ width: '100%' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 400, margin: '0 0 0.5rem 0', color: '#202124', textAlign: 'left' }}>
              Choose an account
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#5f6368', margin: '0 0 1.5rem 0' }}>
              to continue to Trash of CSE
            </p>

            {error && (
              <div style={{ color: '#d93025', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* List accounts */}
            <div style={{ borderTop: '1px solid #dadce0', width: '100%' }}>
              {/* Admin Account Option */}
              <div 
                onClick={() => handleSelectAccount(adminEmail, adminName)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid #dadce0',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#1a73e8',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  marginRight: '0.8rem'
                }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#3c4043' }}>{adminName}</span>
                  <span style={{ fontSize: '0.8rem', color: '#5f6368' }}>{adminEmail}</span>
                </div>
              </div>

              {/* Use Another Account Option */}
              <div 
                onClick={() => setShowEmailInput(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #dadce0',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px dashed #dadce0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.8rem',
                  color: '#1a73e8'
                }}>
                  👤
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1a73e8' }}>
                  Use another account
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 400, margin: '0 0 0.5rem 0', color: '#202124' }}>
              Sign in
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#5f6368', margin: '0 0 1.5rem 0' }}>
              Use your Google Account (IIUC student email)
            </p>

            <form onSubmit={handleCustomEmailSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1.5rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type="email"
                  placeholder="Email or phone"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: error ? '1px solid #d93025' : '1px solid #dadce0',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => {
                    if (!error) e.target.style.borderColor = '#1a73e8';
                  }}
                  onBlur={(e) => {
                    if (!error) e.target.style.borderColor = '#dadce0';
                  }}
                />
                {error && (
                  <div style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>⚠️</span> {error}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => {
                    setShowEmailInput(false);
                    setError('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a73e8',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button 
                  type="submit"
                  style={{
                    background: '#1a73e8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.6rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginPopup;
