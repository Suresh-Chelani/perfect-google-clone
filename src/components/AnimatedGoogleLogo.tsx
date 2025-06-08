
import React, { useState, useEffect } from 'react';

const AnimatedGoogleLogo = () => {
  const [bounceIndex, setBounceIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounceIndex(prev => (prev + 1) % 6);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const letters = [
    { letter: 'G', color: 'text-google-blue' },
    { letter: 'o', color: 'text-google-red' },
    { letter: 'o', color: 'text-google-yellow' },
    { letter: 'g', color: 'text-google-blue' },
    { letter: 'l', color: 'text-google-green' },
    { letter: 'e', color: 'text-google-red' },
  ];

  return (
    <div className="flex items-center justify-center mb-8 group">
      <h1 className="text-8xl sm:text-9xl font-normal tracking-tight select-none cursor-pointer">
        {letters.map((item, index) => (
          <span
            key={index}
            className={`${item.color} transition-all duration-300 inline-block hover:scale-110 ${
              bounceIndex === index ? 'animate-bounce' : ''
            } group-hover:animate-pulse`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {item.letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedGoogleLogo;
