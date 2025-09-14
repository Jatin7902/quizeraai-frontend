
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dynamic API base URL for development and production
const getApiBaseUrl = () => {
  // Check for environment variable first
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  
  console.log('Current hostname:', hostname);
  console.log('Is localhost:', isLocalhost);
  
  if (isLocalhost) {
    return 'http://localhost:5000/api';
  } else if (hostname.includes('onrender.com')) {
    // For Render production deployment
    const apiUrl = 'https://quizera-ai-backend.onrender.com/api';
    console.log('Using production API URL:', apiUrl);
    return apiUrl;
  } else if (hostname.includes('vercel.app')) {
    // For Vercel production deployment
    const apiUrl = 'https://quizera-ai-backend.vercel.app/api';
    console.log('Using Vercel API URL:', apiUrl);
    console.log('Backend connection test:', apiUrl + '/test');
    return apiUrl;
  } else {
    // For mobile access, use the computer's IP address
    return 'http://192.168.31.5:5000/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

// Test backend connection
const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    const data = await response.json();
    console.log('Backend connection test result:', data);
    return data.success;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test backend connection on app load
    testBackendConnection();
    
    const token = localStorage.getItem('quizera_token');
    const storedUser = localStorage.getItem('quizera_user');
    
    if (token && storedUser) {
      // Verify token with backend
      fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('quizera_token');
          localStorage.removeItem('quizera_user');
        }
      })
      .catch(() => {
        // Network error, clear storage
        localStorage.removeItem('quizera_token');
        localStorage.removeItem('quizera_user');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('quizera_token', data.token);
        localStorage.setItem('quizera_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const sendOTP = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('quizera_token', data.token);
        localStorage.setItem('quizera_user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (name, email, password, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('quizera_token', data.token);
        localStorage.setItem('quizera_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizera_token');
    localStorage.removeItem('quizera_user');
  };
  
  const updateUser = async (updatedData) => {
    try {
      const token = localStorage.getItem('quizera_token');
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('quizera_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem('quizera_token');
      const response = await fetch(`${API_BASE_URL}/auth/account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (data.success) {
        logout();
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const updateCredits = async (newCredits) => {
    try {
      const token = localStorage.getItem('quizera_token');
      const response = await fetch(`${API_BASE_URL}/auth/credits`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ credits: newCredits }),
      });

      const data = await response.json();

      if (data.success) {
        const updatedUser = { ...user, credits: data.credits };
        setUser(updatedUser);
        localStorage.setItem('quizera_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  };

  const value = {
    user,
    login,
    signup,
    sendOTP,
    verifyOTP,
    logout,
    updateUser,
    deleteAccount,
    updateCredits,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};