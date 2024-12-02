import React from 'react';
import { clsx } from 'clsx';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <div className={clsx('bg-white rounded-lg shadow-sm p-6 mb-6', className)}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
};