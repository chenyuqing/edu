'use client';

import { LoadingSection } from './LoadingSpinner';
import { ErrorSection } from './ErrorMessage';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  retry?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export default function Card({
  title,
  description,
  children,
  loading,
  error,
  retry,
  action,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}: CardProps) {
  if (loading) {
    return (
      <div className={`rounded-lg bg-white shadow ${className}`}>
        <LoadingSection />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-lg bg-white shadow ${className}`}>
        <ErrorSection message={error} retry={retry} />
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-white shadow ${className}`}>
      {(title || description || action) && (
        <div className={`border-b border-gray-200 px-6 py-5 ${headerClassName}`}>
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-xl font-medium text-gray-900">{title}</h3>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            {action && (
              <button
                onClick={action.onClick}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {action.label}
              </button>
            )}
          </div>
        </div>
      )}
      <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 2 | 4 | 6 | 8;
  className?: string;
}

export function CardGrid({
  children,
  columns = 3,
  gap = 6,
  className = '',
}: CardGridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const gapClass = `gap-${gap}`;

  return (
    <div className={`grid ${colsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}

interface CardStatProps {
  label: string;
  value: string | number;
  change?: number;
  loading?: boolean;
  className?: string;
}

export function CardStat({
  label,
  value,
  change,
  loading,
  className = '',
}: CardStatProps) {
  if (loading) {
    return (
      <div className={`rounded-lg bg-white p-5 shadow ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="mt-4 h-8 w-32 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-white p-5 shadow ${className}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 flex items-baseline">
        <span className="text-3xl font-semibold text-gray-900">{value}</span>
        {change !== undefined && (
          <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </p>
    </div>
  );
}
