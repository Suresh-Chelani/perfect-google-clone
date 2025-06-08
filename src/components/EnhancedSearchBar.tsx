
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
    console.log('Voice search initiated');
    setIsListening(true);
    setShowSuggestions(false); // Hide suggestions during voice search
    
    // Simulate voice search with better feedback
    setTimeout(() => {
      const phrases = [
        'What is the weather like today?',
        'How to make chocolate cake',
        'Best programming languages 2024',
        'Funny cat videos',
        'React tutorial for beginners',
        'Latest tech news'
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      console.log('Voice search result:', randomPhrase);
      onChange(randomPhrase);
      setIsListening(false);
      // Auto-focus input after voice search
      inputRef.current?.focus();
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
      {/* Search Input Container */}
      <div className="relative w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className={`relative transition-all duration-200 ${
            isFocused ? 'shadow-lg scale-[1.02]' : 'shadow-md hover:shadow-lg'
          }`}>
            <div className="flex items-center bg-background rounded-full border border-border hover:border-ring transition-colors duration-200">
              <div className="flex items-center justify-center w-12 h-12 pl-4">
                <Search className="w-5 h-5 text-muted-foreground" />
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
                className="flex-1 h-12 bg-transparent outline-none text-foreground text-base placeholder:text-muted-foreground"
                autoComplete="off"
                spellCheck="false"
                aria-label="Search"
                placeholder="Search Google or type a URL"
                disabled={isListening}
              />
              
              {value && !isListening && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    inputRef.current?.focus();
                  }}
                  className="p-2 hover:bg-accent rounded-full transition-colors duration-150"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              
              <div className="flex items-center pr-3 space-x-2">
                <button 
                  type="button"
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                  className={`p-2 hover:bg-accent rounded-full transition-all duration-150 ${
                    isListening ? 'bg-destructive/10 animate-pulse' : ''
                  }`}
                  aria-label={isListening ? "Listening..." : "Search by voice"}
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'text-destructive' : 'text-muted-foreground'}`} />
                </button>
                <button 
                  type="button"
                  className="p-2 hover:bg-accent rounded-full transition-colors duration-150"
                  aria-label="Search by image"
                >
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Search Suggestions - Fixed positioning */}
        {showSuggestions && suggestions.length > 0 && !isListening && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg mt-1 z-50 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-150 flex items-center space-x-3 ${
                  selectedSuggestion === index ? 'bg-accent' : ''
                }`}
                onClick={() => {
                  onChange(suggestion);
                  onSearch(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">{suggestion}</span>
              </button>
            ))}
          </div>
        )}

        {/* Voice Search Indicator - Improved positioning */}
        {isListening && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg mt-1 p-4 text-center z-50">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-foreground font-medium">Listening...</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Speak now or wait for simulation</p>
          </div>
        )}
      </div>
      
      {/* Action Buttons - Better spacing */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center">
        <button
          type="button"
          onClick={() => onSearch(value)}
          className="px-6 py-3 bg-muted text-muted-foreground text-sm rounded-md border border-border hover:bg-accent hover:text-accent-foreground hover:shadow-md transition-all duration-150 transform hover:scale-[1.02] w-full sm:w-auto font-medium"
        >
          Google Search
        </button>
        <button
          type="button"
          onClick={onLuckySearch}
          className="px-6 py-3 bg-muted text-muted-foreground text-sm rounded-md border border-border hover:bg-accent hover:text-accent-foreground hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] min-w-[140px] w-full sm:w-auto font-medium"
        >
          <span className="transition-all duration-300">{luckyText}</span>
        </button>
      </div>
    </div>
  );
};

export default EnhancedSearchBar;
