
import React from 'react';
import { Grid3X3, User } from 'lucide-react';

const NavigationButtons = () => {
  return (
    <nav className="flex justify-end items-center p-4 space-x-4">
      <a 
        href="#" 
        className="text-sm text-google-text hover:underline"
      >
        Gmail
      </a>
      <a 
        href="#" 
        className="text-sm text-google-text hover:underline"
      >
        Images
      </a>
      <button 
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
        aria-label="Google apps"
      >
        <Grid3X3 className="w-5 h-5 text-google-gray" />
      </button>
      <button 
        className="w-8 h-8 bg-google-blue rounded-full flex items-center justify-center hover:shadow-md transition-shadow duration-150"
        aria-label="Google Account"
      >
        <User className="w-5 h-5 text-white" />
      </button>
    </nav>
  );
};

export default NavigationButtons;
