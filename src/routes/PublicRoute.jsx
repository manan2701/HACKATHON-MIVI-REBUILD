import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user);
  
  if (user) {
    // Redirect logged-in users to the homepage
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute; 