'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiClient } from '../utils/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  walletAddress: string | null;
  login: (walletAddress: string, signature?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  walletAddress: null,
  login: async () => ({ success: false }),
  logout: () => {},
  register: async () => ({ success: false }),
});

// Storage keys
const STORAGE_KEYS = {
  WALLET_ADDRESS: 'walletAddress',
  IS_AUTHENTICATED: 'isAuthenticated',
  TOKEN: 'token',
};

// Storage utilities
const storage = {
  get: (key: string) => {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  remove: (key: string) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  clear: () => {
    try {
      if (typeof window === 'undefined') return;
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize states from storage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    const authState = storage.get(STORAGE_KEYS.IS_AUTHENTICATED);
    return Boolean(token && authState === 'true');
  });

  const [user, setUser] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(() => 
    storage.get(STORAGE_KEYS.WALLET_ADDRESS)
  );

  // Check authentication on mount and token change
  useEffect(() => {
    const token = ApiClient.getToken();
    if (token) {
      checkAuth();
    } else {
      // Clear auth state if no token
      handleLogout();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await ApiClient.getCurrentUser();
      if (response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        storage.set(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      handleLogout();
    }
  };

  const handleLogin = async (address: string, signature?: string) => {
    try {
      console.log('Attempting login with wallet:', address);
      const response = await ApiClient.login({ walletAddress: address, signature });
      
      if (response.data?.token) {
        // Set auth state
        setWalletAddress(address);
        setIsAuthenticated(true);
        
        // Save to storage
        storage.set(STORAGE_KEYS.WALLET_ADDRESS, address);
        storage.set(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
        
        // Fetch user data
        await checkAuth();
        
        console.log('Login successful');
        return { success: true };
      }
      
      console.error('Login failed:', response.error);
      return { success: false, error: response.error };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "登录失败" };
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    ApiClient.clearToken();
    setUser(null);
    setWalletAddress(null);
    setIsAuthenticated(false);
    storage.clear();
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await ApiClient.register({ username, email, password });
      if (response.data) {
        return handleLogin(username, password);
      }
      return { success: false, error: response.error };
    } catch (error: any) {
      console.error("Registration error:", error);
      return { success: false, error: error.message || "注册失败" };
    }
  };

  const value = {
    isAuthenticated,
    user,
    walletAddress,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuth();
    
    if (typeof window !== 'undefined' && !isAuthenticated) {
      window.location.href = '/connect2wallet';
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
