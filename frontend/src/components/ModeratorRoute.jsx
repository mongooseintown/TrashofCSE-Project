import React from 'react';
import { Navigate } from 'react-router-dom';

const ModeratorRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = token && user && (user.email === 'khaledbinnasir1714412140@gmail.com' || user.isAdmin);
  const isModerator = token && user && (user.isModerator || isAdmin);

  if (!isModerator) {
    // If not logged in, redirect to login page
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    // If logged in but not admin/moderator, redirect to compiler locked page
    return <Navigate to="/compiler/locked" replace />;
  }

  return children;
};

export default ModeratorRoute;
