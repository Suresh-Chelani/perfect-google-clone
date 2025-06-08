
import React from 'react';

interface VoiceSearchIndicatorProps {
  isListening: boolean;
}

const VoiceSearchIndicator = ({ isListening }: VoiceSearchIndicatorProps) => {
  if (!isListening) {
    return null;
  }

  return (
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
  );
};

export default VoiceSearchIndicator;
