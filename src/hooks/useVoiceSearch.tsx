
import { useState } from 'react';

interface UseVoiceSearchProps {
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const useVoiceSearch = ({ onChange, inputRef }: UseVoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    console.log('Voice search initiated');
    setIsListening(true);
    
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

  return {
    isListening,
    handleVoiceSearch
  };
};
