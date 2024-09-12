import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { username, password }
      });
      const userData = response.data[0];
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate(userData.role === 'admin' ? '/admin' : '/');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
