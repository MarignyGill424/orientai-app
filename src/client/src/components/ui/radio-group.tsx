import * as React from "react";

type RadioGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} role="radiogroup" className={className}>
      {children}
    </div>
  )
);

RadioGroup.displayName = "RadioGroup";

type RadioGroupItemProps = {
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ label, value, name, checked, onChange }, ref) => (
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
);

RadioGroupItem.displayName = "RadioGroupItem";
