// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const useAuth = () => {
  const { setIsLoggedIn, setUser } = useStateContext();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // Or, if using localStorage
    // const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
      // Optionally, set user details if those are stored or can be derived
      // For better security, consider validating the token with your backend here
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, setUser]);
}

