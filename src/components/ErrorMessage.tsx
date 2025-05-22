import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-error-50 border border-error-200 rounded-lg shadow-sm my-4 max-w-md mx-auto animate-fade-in">
      <AlertCircle className="text-error-500 w-8 h-8 mb-2" />
      <h3 className="text-error-700 font-medium text-lg mb-1">Something went wrong</h3>
      <p className="text-error-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label="Try again"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;