
import React from 'react';
import { Search } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: string[];
  selectedSuggestion: number;
  showSuggestions: boolean;
  isListening: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions = ({
  suggestions,
  selectedSuggestion,
  showSuggestions,
  isListening,
  onSuggestionClick
}: SearchSuggestionsProps) => {
  if (!showSuggestions || suggestions.length === 0 || isListening) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-google-border rounded-lg shadow-google mt-1 z-50 overflow-hidden">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          type="button"
          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3 ${
            selectedSuggestion === index ? 'bg-gray-50' : ''
          }`}
          onClick={() => onSuggestionClick(suggestion)}
        >
          <Search className="w-4 h-4 text-google-gray flex-shrink-0" />
          <span className="text-google-text">{suggestion}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions;
