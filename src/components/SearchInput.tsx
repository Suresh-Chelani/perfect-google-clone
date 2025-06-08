
import React from 'react';
import { Search, Mic, Camera, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  isListening: boolean;
  onVoiceSearch: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  isFocused,
  isListening,
  onVoiceSearch,
  onClear,
  inputRef
}: SearchInputProps) => {
  return (
    <div className={`relative transition-all duration-200 ${
      isFocused ? 'shadow-google-focused' : 'shadow-google hover:shadow-google-hover'
    }`}>
      <div className="flex items-center bg-white rounded-full border border-google-border hover:border-google-border-hover transition-colors duration-200">
        <div className="flex items-center justify-center w-12 h-12 pl-4">
          <Search className="w-5 h-5 text-google-gray" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="flex-1 h-12 bg-transparent outline-none text-google-text text-base placeholder:text-google-gray"
          autoComplete="off"
          spellCheck="false"
          aria-label="Search"
          placeholder="Search Google or type a URL"
          disabled={isListening}
        />
        
        {value && !isListening && (
          <button
            type="button"
            onClick={onClear}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-google-gray" />
          </button>
        )}
        
        <div className="flex items-center pr-3 space-x-2">
          <button 
            type="button"
            onClick={onVoiceSearch}
            disabled={isListening}
            className={`p-2 hover:bg-gray-100 rounded-full transition-all duration-150 ${
              isListening ? 'bg-red-50 animate-pulse' : ''
            }`}
            aria-label={isListening ? "Listening..." : "Search by voice"}
          >
            <Mic className={`w-5 h-5 ${isListening ? 'text-red-500' : 'text-google-blue'}`} />
          </button>
          <button 
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
            aria-label="Search by image"
          >
            <Camera className="w-5 h-5 text-google-blue" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
