import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication function to get token and role
const getAuthenticatedUser = () => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  return { token, isAdmin };
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, isAdmin } = getAuthenticatedUser();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !JSON.parse(isAdmin)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
