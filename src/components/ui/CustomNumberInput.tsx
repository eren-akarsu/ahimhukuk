import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CustomNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number | string;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  value,
  onChange,
  label,
  min = 0,
  max,
  step = 1,
  className = '',
  ...props
}) => {
  const handleIncrement = () => {
    const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    const newValue = currentValue + step;
    if (max !== undefined && newValue > max) return;
    onChange(newValue);
  };

  const handleDecrement = () => {
    const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    const newValue = currentValue - step;
    if (min !== undefined && newValue < min) return;
    onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    } else {
      onChange(0);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors appearance-none m-0"
          {...props}
        />
        <div className="absolute right-2 flex flex-col items-center justify-center space-y-0.5">
          <button
            type="button"
            onClick={handleIncrement}
            className="text-gold/60 hover:text-gold transition-colors p-0.5 rounded cursor-pointer"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="text-gold/60 hover:text-gold transition-colors p-0.5 rounded cursor-pointer"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
