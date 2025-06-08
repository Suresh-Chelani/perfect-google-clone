
import React, { useState, useEffect } from 'react';

const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState('day');

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

  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${getGradientClass()}`}>
      {/* Floating particles for night mode */}
      {timeOfDay === 'night' && (
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
    </div>
  );
};

export default DynamicBackground;
