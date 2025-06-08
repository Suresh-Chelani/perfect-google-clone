
import React from 'react';

interface VoiceSearchIndicatorProps {
  isListening: boolean;
}

const VoiceSearchIndicator = ({ isListening }: VoiceSearchIndicatorProps) => {
  if (!isListening) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-google-border rounded-lg shadow-google mt-1 p-4 text-center z-50">
      <div className="flex items-center justify-center space-x-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-google-text font-medium">Listening...</span>
      </div>
      <p className="text-sm text-google-gray mt-2">Speak now or wait for simulation</p>
    </div>
  );
};

export default VoiceSearchIndicator;
