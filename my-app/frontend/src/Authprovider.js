import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (gmail, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { gmail, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : 'Login failed. Please check your credentials.');
    }
  };

  const register = async (name, gmail, password, role = 'user') => {
    try {
      const response = await axios.post('http://localhost:3000/api/register', { name, gmail, password, role });
      if (response.status === 201) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
      }
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
