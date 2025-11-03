const fs = require('fs');
const path = require('path');

const components = {
  'input.tsx': `
import React from 'react';

export const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={\`border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 \${className}\`}
  />
);
  `,
  'label.tsx': `
import React from 'react';

export const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={\`block text-sm font-medium text-gray-700 mb-1 \${className}\`}>
    {children}
  </label>
);
  `,
  'textarea.tsx': `
import React from 'react';

export const Textarea = ({ className = '', ...props }) => (
  <textarea
    {...props}
    className={\`border px-3 py-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 \${className}\`}
  />
);
  `,
  'form-field.tsx': `
import React from 'react';
import { Label } from './label';
import { Input } from './input';

export const FormField = ({ label, id, error, ...props }) => (
  <div className="mb-4">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
  `,
  'select.tsx': `
import React from 'react';

export const Select = ({ options = [], className = '', ...props }) => (
  <select
    {...props}
    className={\`border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 \${className}\`}
  >
    {options.map((opt, idx) => (
      <option key={idx} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
  `,
  'checkbox.tsx': `
import React from 'react';

export const Checkbox = ({ label, id, className = '', ...props }) => (
  <div className={\`flex items-center space-x-2 \${className}\`}>
    <input type="checkbox" id={id} {...props} className="h-4 w-4 text-blue-600" />
    <label htmlFor={id} className="text-sm text-gray-700">
      {label}
    </label>
  </div>
);
  `,
  'modal.tsx': `
import React from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        {children}
        <button onClick={onClose} className="mt-4 text-blue-600 hover:underline">
          Fermer
        </button>
      </div>
    </div>
  );
};
  `,
  'card.tsx': `
import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={\`bg-white shadow-md rounded p-4 \${className}\`}>
    {children}
  </div>
);
  `
};

const targetDir = path.join(__dirname, 'src', 'client', 'src', 'components', 'ui');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

Object.entries(components).forEach(([filename, content]) => {
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, content.trim());
  console.log(`✅ Fichier créé : ${filename}`);
});
