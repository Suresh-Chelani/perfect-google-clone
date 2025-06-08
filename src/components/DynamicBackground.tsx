
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState('day');
  const { theme } = useTheme();

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('day');
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('evening');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getGradientClass = () => {
    // Override with theme-specific backgrounds
    if (theme === 'dark') {
      return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
    }
    
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-purple-400 via-pink-400 to-red-400';
    }
    
    // Default theme with time-based gradients
    switch (timeOfDay) {
      case 'morning':
        return 'bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-100';
      case 'day':
        return 'bg-gradient-to-br from-blue-50 via-white to-indigo-50';
      case 'evening':
        return 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100';
      case 'night':
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900';
      default:
        return 'bg-gradient-to-br from-blue-50 via-white to-indigo-50';
    }
  };

  const showStars = theme === 'dark' || (theme === 'default' && timeOfDay === 'night');

  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${getGradientClass()}`}>
      {/* Floating particles for night mode or dark theme */}
      {showStars && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Colorful theme floating elements */}
      {theme === 'colorful' && (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][i % 5],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicBackground;
