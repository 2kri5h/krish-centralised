import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Retrieved user from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    // Store token as string, not object
    const accessToken = tokenData.access;
    
    // Log the user data we're storing
    console.log("Storing user data in login:", userData);
    
    // Make sure we're storing the complete user object
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', tokenData.refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setToken(accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Add a function to update user data
  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 