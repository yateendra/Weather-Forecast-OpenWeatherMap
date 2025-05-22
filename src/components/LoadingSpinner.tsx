import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  message = 'Loading...'
}) => {
  // Determine size class
  const sizeClass = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClass} rounded-full border-b-transparent border-primary-500 animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;