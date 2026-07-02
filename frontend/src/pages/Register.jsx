import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Login.css'; // Reusing identical auth layouts and base variables

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Create account</h1>
          <p>Sign up to get started</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-row">
              <input type="email" placeholder="example@mail.com" required />
              <button type="submit" className="submit-btn" aria-label="Submit">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="divider">OR</div>

          <button type="button" className="social-btn">
            <div className="social-content">
              <span className="social-icon">
                <svg width="22" height="22" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              </span>
              <span>Continue with Google</span>
            </div>
            <ArrowRight size={18} className="arrow-icon" />
          </button>

          <button type="button" className="social-btn">
            <div className="social-content">
              <span className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="#ffffff"/>
                </svg>
              </span>
              <span>Continue with X</span>
            </div>
            <ArrowRight size={18} className="arrow-icon" />
          </button>
        </form>

        <div className="login-footer">
          Already have an account? <span className="auth-link-text" onClick={() => navigate('/login')}>Sign in</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
