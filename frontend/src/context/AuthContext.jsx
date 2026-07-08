import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('pragati_token');
      if (token) {
        try {
          const res = await api.get('/api/auth/me');
          if (res.success) {
            setUser(res.data);
          } else {
            localStorage.removeItem('pragati_token');
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('pragati_token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await api.post('/api/auth/login', credentials);
      if (res.success) {
        localStorage.setItem('pragati_token', res.token);
        // Wait until we fetch user details
        const meRes = await api.get('/api/auth/me');
        setUser(meRes.data);
        return meRes.data;
      }
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };
  
  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData);
      if (res.success) {
        localStorage.setItem('pragati_token', res.token);
        const meRes = await api.get('/api/auth/me');
        setUser(meRes.data);
        return meRes.data;
      }
    } catch (err) {
      console.error('Register failed:', err);
      throw err;
    }
  };

  const updateProfile = async (userData) => {
    try {
      const res = await api.put('/api/auth/profile', userData);
      if (res.success) {
        setUser(res.data);
        return res.data;
      }
    } catch (err) {
      console.error('Update profile failed:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pragati_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
