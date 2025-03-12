'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
};

const colorClasses = {
  primary: 'border-blue-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-600 border-t-transparent',
};

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = ''
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          animate-spin rounded-full
          ${sizeClasses[size]}
          ${colorClasses[color]}
          ${className}
        `}
      />
    </div>
  );
}

export function LoadingScreen({ message = '加载中...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function LoadingSection({ message = '加载中...', className = '' }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function LoadingButton({
  loading,
  children,
  className = '',
  disabled = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      disabled={loading || disabled}
      className={`
        relative flex items-center justify-center
        ${loading ? 'text-transparent' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <div className="absolute">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      {children}
    </button>
  );
}
