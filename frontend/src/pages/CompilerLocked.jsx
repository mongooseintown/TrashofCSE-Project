import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight, Zap, LayoutDashboard } from 'lucide-react';
import './CompilerLocked.css';

const CompilerLocked = () => {
  const navigate = useNavigate();

  return (
    <div className="compiler-locked-container">
      {/* Locked Alert Box */}
      <div className="compiler-locked-card">
        {/* Glow Ring behind lock */}
        <div className="glow-ring" />

        {/* Lock Icon Container */}
        <div className="lock-icon-container">
          <Lock size={36} />
        </div>

        <h1 className="compiler-locked-title">
          Portal Restricted
        </h1>

        <div className="badge-restricted">
          <ShieldAlert size={16} />
          ADMINISTRATOR ACCESS ONLY
        </div>

        <p className="compiler-locked-description">
          Access to the Compiler Portal is restricted to the administrator account. Regular student profiles are permitted to explore the EEE segment and dashboard resource guides.
        </p>

        {/* Action CTAs */}
        <div className="compiler-locked-actions">
          <button 
            onClick={() => navigate('/eee')}
            className="btn-explore-eee"
          >
            <Zap size={18} />
            Explore EEE Portal
            <ArrowRight size={16} />
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-return-dashboard"
          >
            <LayoutDashboard size={18} />
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompilerLocked;
