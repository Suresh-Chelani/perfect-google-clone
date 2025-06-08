
import React, { useState, useRef } from 'react';
import SearchInput from './SearchInput';
import SearchSuggestions from './SearchSuggestions';
import VoiceSearchIndicator from './VoiceSearchIndicator';
import SearchButtons from './SearchButtons';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onLuckySearch: () => void;
}

const EnhancedSearchBar = ({ value, onChange, onSearch, onLuckySearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    suggestions,
    selectedSuggestion,
    showSuggestions,
    handleKeyNavigation,
    getSelectedSuggestion,
    hideSuggestions,
    setShowSuggestions
  } = useSearchSuggestions({ value });

  const { isListening, handleVoiceSearch } = useVoiceSearch({
    onChange,
    inputRef
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      hideSuggestions();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const wasHandled = handleKeyNavigation(e.key);
    
    if (wasHandled) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const selectedSuggestion = getSelectedSuggestion();
      if (selectedSuggestion) {
        onChange(selectedSuggestion);
        onSearch(selectedSuggestion);
      } else if (value.trim()) {
        onSearch(value.trim());
      }
      hideSuggestions();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (value.length > 0) setShowSuggestions(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => hideSuggestions(), 200);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSearch(suggestion);
    hideSuggestions();
  };

  const handleVoiceSearchClick = () => {
    hideSuggestions();
    handleVoiceSearch();
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8 relative">
      {/* Search Input Container */}
      <div className="relative w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <SearchInput
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={isFocused}
            isListening={isListening}
            onVoiceSearch={handleVoiceSearchClick}
            onClear={handleClear}
            inputRef={inputRef}
          />
        </form>

        <SearchSuggestions
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          showSuggestions={showSuggestions}
          isListening={isListening}
          onSuggestionClick={handleSuggestionClick}
        />

        <VoiceSearchIndicator isListening={isListening} />
      </div>
      
      {/* Action Buttons */}
      <SearchButtons
        value={value}
        onSearch={onSearch}
        onLuckySearch={onLuckySearch}
      />
    </div>
  );
};

export default EnhancedSearchBar;
