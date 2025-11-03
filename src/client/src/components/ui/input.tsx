import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={`border px-3 py-2 rounded w-full ${className}`}
    />
  )
);

Input.displayName = 'Input';
