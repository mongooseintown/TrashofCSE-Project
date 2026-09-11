import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CommunityFeed from './pages/CommunityFeed';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const isLoggedIn = !!(token && storedUser);
  const isAuthPage = ['/login', '/signup', '/auth'].includes(location.pathname);

  return (
    <div className="app-shell">
      {!isAuthPage && <Navbar />}

      <div className={`app-body ${isLoggedIn && !isAuthPage ? 'with-sidebar' : ''}`}>
        {isLoggedIn && !isAuthPage && <Sidebar />}

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/feed" element={<PrivateRoute><CommunityFeed /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
