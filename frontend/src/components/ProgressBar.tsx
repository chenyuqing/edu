'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
  barClassName?: string;
  animated?: boolean;
  striped?: boolean;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
};

const valueTextClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const variantClasses = {
  primary: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  danger: 'bg-red-600',
};

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showValue = false,
  formatValue = (v: number) => `${Math.round(v)}%`,
  className = '',
  barClassName = '',
  animated = false,
  striped = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {showValue && (
          <div className={`mr-2 ${valueTextClasses[size]}`}>
            {formatValue(percentage)}
          </div>
        )}
        <div className={`flex-grow overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`}>
          <div
            className={`
              rounded-full transition-all duration-300 ease-out
              ${variantClasses[variant]}
              ${animated ? 'animate-progress' : ''}
              ${striped ? 'bg-striped' : ''}
              ${barClassName}
            `}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}

interface ProgressStepsProps {
  steps: {
    label: string;
    completed: boolean;
    current?: boolean;
  }[];
  className?: string;
}

export function ProgressSteps({ steps, className = '' }: ProgressStepsProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li key={step.label} className={index === 0 ? 'flex-none' : 'flex-auto'}>
            <div className="flex items-center">
              <div
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full
                  ${
                    step.completed
                      ? 'bg-blue-600 text-white'
                      : step.current
                      ? 'border-2 border-blue-600 bg-white text-blue-600'
                      : 'border-2 border-gray-300 bg-white text-gray-500'
                  }
                `}
              >
                {step.completed ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-auto ${
                    step.completed ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <div className="mt-2 text-center text-sm font-medium text-gray-500">
              {step.label}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
