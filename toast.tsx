import React, { useEffect, useState } from 'react';

export const Toast = ({ message, type = 'info', duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const colors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500 text-black'
  };

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 text-white rounded shadow-lg ${colors[type]}`}>
      {message}
    </div>
  );
};
