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
import { ReactLenis } from 'lenis/react';

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const isLoggedIn = !!(token && storedUser);
  const showSidebar = isLoggedIn;

  return (
    <div className="App">
      <Navbar />

      <div className="app-layout">
        {showSidebar && <Sidebar />}

        <main className={`main-content ${showSidebar ? 'with-sidebar' : ''}`}>
          <Routes>
            {/* Landing & Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Core App Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/feed"
              element={
                <PrivateRoute>
                  <CommunityFeed />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
