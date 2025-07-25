import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from '../components/ui/CustomToast.jsx';

const ProtectedRoute = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      toast.info("Need to login first");
      setRedirect(true);
    }
  }, [user]);

  if (redirect) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
