
import { useState, useEffect } from 'react';

interface UseSearchSuggestionsProps {
  value: string;
}

export const useSearchSuggestions = ({ value }: UseSearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleKeyNavigation = (key: string) => {
    if (!showSuggestions) return false;

    switch (key) {
      case 'ArrowDown':
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        return true;
      case 'ArrowUp':
        setSelectedSuggestion(prev => prev > -1 ? prev - 1 : prev);
        return true;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        return true;
      default:
        return false;
    }
  };

  const getSelectedSuggestion = () => {
    return selectedSuggestion >= 0 ? suggestions[selectedSuggestion] : null;
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
  };

  return {
    suggestions,
    selectedSuggestion,
    showSuggestions,
    handleKeyNavigation,
    getSelectedSuggestion,
    hideSuggestions,
    setShowSuggestions
  };
};
