import React, { useState, useMemo, useCallback } from 'react';

interface InputSearchFieldProps {
    suggestions: string[];
    placeHolder?: string;
    onSelect: (value: string) => void;
}

const InputSearchField: React.FC<InputSearchFieldProps> = ({ suggestions, placeHolder = 'Search', onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredSuggestions = useMemo(() => {
        if (!inputValue.trim()) return [];
        return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()));
    }, [inputValue, suggestions]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownOpen(true);
    }, []);

    const handleSelect = useCallback((value: string) => {
        setInputValue(value);
        setIsDropdownOpen(false);
        onSelect(value);
    }, [onSelect]);

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="w-full min-w-0 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder={placeHolder}
            />
            {isDropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                onClick={() => handleSelect(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">No suggestions found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default InputSearchField;
