import React, { useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext.jsx';

// Auth Provider Component - ONLY export this component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user exists in database
  const checkUserInDatabase = async (email) => {
    try {
      const response = await fetch(`/api/users/check?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check user');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error checking user:', err);
      throw err;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      
      const userExists = await checkUserInDatabase(email);
      
      if (userExists && userExists.user) {
        setUser(userExists.user);
        if (userData.token) {
          localStorage.setItem('authToken', userData.token);
        }
        return { success: true, user: userExists.user };
      } else {
        throw new Error('User not found in database');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  // Register function
  const register = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const userData = await response.json();
      setUser(userData.user);
      
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
      }
      
      return { success: true, user: userData.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('authToken');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    checkUserInDatabase,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};