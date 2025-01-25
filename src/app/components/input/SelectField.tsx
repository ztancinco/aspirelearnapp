import React from "react";

interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void; // Pass only the selected value
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
  placeholder?: string; // Optional placeholder
}

const SelectField: React.FC<SelectFieldProps> = ({
  label = "",
  value,
  onChange,
  onBlur,
  options,
  error,
  placeholder = `Select ${label}`, // Default placeholder
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)} // Pass only the value
      onBlur={onBlur}
      className={`mt-2 block w-full px-4 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
    >
      {/* Placeholder Option */}
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default SelectField;
