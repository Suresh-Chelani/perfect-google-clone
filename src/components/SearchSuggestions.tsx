
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
    <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg mt-1 z-50 overflow-hidden">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          type="button"
          className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-150 flex items-center space-x-3 ${
            selectedSuggestion === index ? 'bg-accent' : ''
          }`}
          onClick={() => onSuggestionClick(suggestion)}
        >
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-foreground">{suggestion}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions;
