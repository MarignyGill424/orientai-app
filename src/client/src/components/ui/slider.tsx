import * as React from "react";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number];
  onValueChange: (value: [number]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 1,
  max = 10,
  step = 1,
  value,
  onValueChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onValueChange([newValue]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  );
};
