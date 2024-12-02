import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          {...props}
          className={clsx(
            'w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500',
            error ? 'border-red-300' : 'border-gray-300',
            className
          )}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);