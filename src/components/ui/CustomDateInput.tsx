import React, { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { tr } from 'date-fns/locale/tr';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('tr', tr);

interface CustomDateInputProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  className?: string;
}

// Custom Input Component to apply styling matching our custom number input
const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick, onChange, onFocus, onBlur, placeholder, ...props }, ref) => (
  <div className="relative flex items-center" onClick={onClick}>
    <input
      {...props}
      ref={ref}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder || 'gg.aa.yyyy'}
      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
    />
    <div className="absolute right-3 pointer-events-none text-gold/80">
      <Calendar size={16} />
    </div>
  </div>
));

CustomInput.displayName = 'CustomInput';

export const CustomDateInput: React.FC<CustomDateInputProps> = ({ value, onChange, label, className = '' }) => {
  const selectedDate = value ? new Date(value) : null;

  const handleChange = (date: Date | null) => {
    if (date && !isNaN(date.getTime())) {
      // Format as YYYY-MM-DD to keep compatibility with existing string state
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      onChange(`${yyyy}-${mm}-${dd}`);
    } else {
      onChange('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        locale="tr"
        dateFormat="dd.MM.yyyy"
        customInput={<CustomInput />}
        showPopperArrow={false}
        calendarClassName="custom-calendar-theme"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        isClearable={false}
        strictParsing
      />
    </div>
  );
};
