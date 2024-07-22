import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useStateContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
