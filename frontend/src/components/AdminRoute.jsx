import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = token && user && user.email === 'khaledbinnasir1714412140@gmail.com';

  if (!isAdmin) {
    // If not logged in at all, redirect to login
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    // If logged in but not admin, redirect to locked screen
    return <Navigate to="/compiler/locked" replace />;
  }

  return children;
};

export default AdminRoute;
