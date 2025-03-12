'use client';

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
  className?: string;
  variant?: 'inline' | 'section' | 'fullscreen';
}

export default function ErrorMessage({ 
  message = '出错了',
  retry,
  className = '',
  variant = 'inline'
}: ErrorMessageProps) {
  const variants = {
    inline: (
      <div className={`rounded-md bg-red-50 p-4 ${className}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{message}</p>
          </div>
          {retry && (
            <div className="ml-auto pl-3">
              <button
                onClick={retry}
                className="text-sm font-medium text-red-700 hover:text-red-600"
              >
                重试
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    section: (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-900">{message}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              点击重试
            </button>
          )}
        </div>
      </div>
    ),
    fullscreen: (
      <div className={`flex min-h-screen items-center justify-center ${className}`}>
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">出错了</h2>
          <p className="mt-2 text-gray-600">{message}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              重新加载
            </button>
          )}
        </div>
      </div>
    ),
  };

  return variants[variant];
}

export function ErrorScreen({ message, retry }: ErrorMessageProps) {
  return <ErrorMessage message={message} retry={retry} variant="fullscreen" />;
}

export function ErrorSection({ message, retry, className }: ErrorMessageProps) {
  return <ErrorMessage message={message} retry={retry} variant="section" className={className} />;
}
