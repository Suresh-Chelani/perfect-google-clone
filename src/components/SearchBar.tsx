
import React, { useState } from 'react';
import { Search, Mic, Camera } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onLuckySearch: () => void;
}

const SearchBar = ({ value, onChange, onSearch, onLuckySearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8">
      {/* Search Input */}
      <div className={`relative w-full max-w-xl transition-all duration-200 ${
        isFocused ? 'shadow-google-focused' : 'shadow-google'
      }`}>
        <div className="flex items-center bg-white rounded-full border border-google-border hover:shadow-google-hover transition-shadow duration-200">
          <div className="flex items-center justify-center w-12 h-12 pl-4">
            <Search className="w-5 h-5 text-google-gray" />
          </div>
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-12 bg-transparent outline-none text-google-text text-base"
            autoComplete="off"
            spellCheck="false"
            aria-label="Search"
          />
          
          <div className="flex items-center pr-4 space-x-3">
            <button 
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
              aria-label="Search by voice"
            >
              <Mic className="w-5 h-5 text-google-gray" />
            </button>
            <button 
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
              aria-label="Search by image"
            >
              <Camera className="w-5 h-5 text-google-gray" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => onSearch(value)}
          className="px-6 py-3 bg-google-button text-google-button-text text-sm rounded border border-google-button-border hover:shadow-google-button-hover hover:border-google-button-border-hover transition-all duration-100"
        >
          Google Search
        </button>
        <button
          onClick={onLuckySearch}
          className="px-6 py-3 bg-google-button text-google-button-text text-sm rounded border border-google-button-border hover:shadow-google-button-hover hover:border-google-button-border-hover transition-all duration-100"
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
