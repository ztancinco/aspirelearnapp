'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Option {
  id: string | number;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  placeholder?: string;
  onSelect: (selectedId: string | number) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, placeholder = 'Select an option', onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search input
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle selection of an option
  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.id); // Return only the ID
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Selected item / input field */}
      <div
        className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer w-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <input
          type="text"
          className="outline-none w-full text-gray-800 bg-transparent"
          placeholder={selectedOption ? selectedOption.label : placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        />
        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10 w-full">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
