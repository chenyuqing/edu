'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiClient } from '../utils/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => ({ success: false }),
  logout: () => {},
  register: async () => ({ success: false }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = ApiClient.getToken();
    if (token) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    const response = await ApiClient.getCurrentUser();
    if (response.data) {
      setUser(response.data);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      ApiClient.clearToken();
    }
  };

  const login = async (username: string, password: string) => {
    const response = await ApiClient.login({ username, password });
    if (response.data) {
      await checkAuth();
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const logout = () => {
    ApiClient.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await ApiClient.register({ username, email, password });
    if (response.data) {
      // Auto login after successful registration
      return login(username, password);
    }
    return { success: false, error: response.error };
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
      // Redirect to login if user is not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
