import React from "react";

interface FileInputFieldProps {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  accept?: string;
  placeholder?: string;
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  onChange,
  onBlur,
  error,
  accept,
  placeholder = 'Choose a file',
}) => {
  const inputId = label ? `file-input-${label.replace(/\s+/g, "-").toLowerCase()}` : "file-input";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative mt-2">
        <input
          id={inputId}
          type="file"
          onChange={handleFileChange}
          onBlur={onBlur}
          accept={accept}
          placeholder={placeholder}
          className={`block w-full text-sm text-gray-900 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileInputField;
