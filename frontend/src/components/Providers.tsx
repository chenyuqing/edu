'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from './Toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ToastProvider>
  );
}

// Example hook for using multiple contexts together
export function useApp() {
  // Add more context hooks as needed
  // const auth = useAuth();
  // const toast = useToast();
  
  return {
    // ...auth,
    // ...toast,
  };
}
