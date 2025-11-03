import React from 'react';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      {...props}
      className={`border px-3 py-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  )
);

Textarea.displayName = 'Textarea';
