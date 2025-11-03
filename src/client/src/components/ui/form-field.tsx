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