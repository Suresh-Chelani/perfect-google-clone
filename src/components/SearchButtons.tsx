
import React, { useState, useEffect } from 'react';

interface SearchButtonsProps {
  value: string;
  onSearch: (query: string) => void;
  onLuckySearch: () => void;
}

const SearchButtons = ({ value, onSearch, onLuckySearch }: SearchButtonsProps) => {
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
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center">
      <button
        type="button"
        onClick={() => onSearch(value)}
        className="px-4 py-3 bg-google-button text-google-button-text text-sm rounded border border-google-button-border hover:bg-white hover:border-google-button-border-hover hover:shadow-google-button-hover transition-all duration-150 w-full sm:w-auto min-w-[140px]"
      >
        Google Search
      </button>
      <button
        type="button"
        onClick={onLuckySearch}
        className="px-4 py-3 bg-google-button text-google-button-text text-sm rounded border border-google-button-border hover:bg-white hover:border-google-button-border-hover hover:shadow-google-button-hover transition-all duration-300 min-w-[140px] w-full sm:w-auto"
      >
        <span className="transition-all duration-300">{luckyText}</span>
      </button>
    </div>
  );
};

export default SearchButtons;
