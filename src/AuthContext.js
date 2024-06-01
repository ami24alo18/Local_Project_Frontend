// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:1995/login', {
          userName: username,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          setIsAuthenticated(true);
          setUser({ username });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        return false;
      }            
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
