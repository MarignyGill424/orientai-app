import React, { useState } from 'react';

export const Select = ({ options = [], onChange, className = '' }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
    onChange?.(value);
  };

  return (
    <div className={`relative ${className}`}>
      <SelectTrigger onClick={() => setOpen(!open)}>
        <SelectValue value={selected} />
      </SelectTrigger>
      {open && (
        <SelectContent>
          {options.map((opt, idx) => (
            <SelectItem key={idx} value={opt.value} onSelect={handleSelect}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full border px-3 py-2 rounded bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </button>
);

export const SelectContent = ({ children }) => (
  <div className="absolute z-10 mt-1 w-full border rounded bg-white shadow-lg">
    {children}
  </div>
);

export const SelectItem = ({ value, children, onSelect }) => (
  <div
    onClick={() => onSelect(value)}
    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
  >
    {children}
  </div>
);

export const SelectValue = ({ value }) => (
  <span className="text-gray-700">
    {value || 'Sélectionner...'}
  </span>
);


