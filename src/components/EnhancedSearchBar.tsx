
import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Camera, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onLuckySearch: () => void;
}

const EnhancedSearchBar = ({ value, onChange, onSearch, onLuckySearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search suggestions
  const mockSuggestions = [
    'how to learn react',
    'weather today',
    'best restaurants near me',
    'javascript tutorials',
    'healthy recipes',
    'movie recommendations',
    'travel destinations 2024',
    'coding interview questions'
  ];

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestion(-1);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          onChange(suggestions[selectedSuggestion]);
          onSearch(suggestions[selectedSuggestion]);
        } else if (value.trim()) {
          onSearch(value.trim());
        }
        setShowSuggestions(false);
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice search
    setTimeout(() => {
      const phrases = [
        'What is the weather like today?',
        'How to make chocolate cake',
        'Best programming languages 2024',
        'Funny cat videos'
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      onChange(randomPhrase);
      setIsListening(false);
    }, 2000);
  };

  const luckyAlternatives = [
    "I'm Feeling Lucky",
    "I'm Feeling Curious",
    "I'm Feeling Artistic",
    "I'm Feeling Hungry",
    "I'm Feeling Adventurous"
  ];

  const [luckyText, setLuckyText] = useState(luckyAlternatives[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLuckyText(prev => {
        const currentIndex = luckyAlternatives.indexOf(prev);
        return luckyAlternatives[(currentIndex + 1) % luckyAlternatives.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-8 relative">
      {/* Search Input */}
      <div className="relative w-full max-w-xl">
        <div className={`relative transition-all duration-200 ${
          isFocused ? 'shadow-google-focused scale-105' : 'shadow-google hover:shadow-google-hover'
        }`}>
          <div className="flex items-center bg-white rounded-full border border-google-border">
            <div className="flex items-center justify-center w-12 h-12 pl-4">
              <Search className="w-5 h-5 text-google-gray" />
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                if (value.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 h-12 bg-transparent outline-none text-google-text text-base"
              autoComplete="off"
              spellCheck="false"
              aria-label="Search"
              placeholder="Search Google or type a URL"
            />
            
            {value && (
              <button
                onClick={() => {
                  onChange('');
                  inputRef.current?.focus();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-google-gray" />
              </button>
            )}
            
            <div className="flex items-center pr-4 space-x-3">
              <button 
                type="button"
                onClick={handleVoiceSearch}
                className={`p-2 hover:bg-gray-100 rounded-full transition-all duration-150 ${
                  isListening ? 'bg-red-100 animate-pulse' : ''
                }`}
                aria-label="Search by voice"
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-red-500' : 'text-google-gray'}`} />
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

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-google-border rounded-lg shadow-lg mt-1 z-50 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3 ${
                  selectedSuggestion === index ? 'bg-gray-50' : ''
                }`}
                onClick={() => {
                  onChange(suggestion);
                  onSearch(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <Search className="w-4 h-4 text-google-gray" />
                <span className="text-google-text">{suggestion}</span>
              </button>
            ))}
          </div>
        )}

        {/* Voice Search Indicator */}
        {isListening && (
          <div className="absolute top-full left-0 right-0 bg-white border border-google-border rounded-lg shadow-lg mt-1 p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Mic className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-google-text">Listening...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => onSearch(value)}
          className="px-6 py-3 bg-google-button text-google-button-text text-sm rounded border border-google-button-border hover:shadow-google-button-hover hover:border-google-button-border-hover transition-all duration-100 transform hover:scale-105"
        >
          Google Search
        </button>
        <button
          onClick={onLuckySearch}
          className="px-6 py-3 bg-google-button text-google-button-text text-sm rounded border border-google-button-border hover:shadow-google-button-hover hover:border-google-button-border-hover transition-all duration-300 transform hover:scale-105 min-w-[140px]"
        >
          <span className="transition-all duration-300">{luckyText}</span>
        </button>
      </div>
    </div>
  );
};

export default EnhancedSearchBar;
