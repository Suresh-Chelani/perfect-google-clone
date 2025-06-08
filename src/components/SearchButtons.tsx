
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
  );
};

export default SearchButtons;
