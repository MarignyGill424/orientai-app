import React from 'react';

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, id, className = '', ...props }, ref) => (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        ref={ref}
        {...props}
        className="h-4 w-4 text-blue-600"
      />
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  )
);

Checkbox.displayName = 'Checkbox';
