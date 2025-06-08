
import React from 'react';

const AnimatedGoogleLogo = () => {
  const letters = [
    { letter: 'G', color: 'text-google-blue' },
    { letter: 'o', color: 'text-google-red' },
    { letter: 'o', color: 'text-google-yellow' },
    { letter: 'g', color: 'text-google-blue' },
    { letter: 'l', color: 'text-google-green' },
    { letter: 'e', color: 'text-google-red' },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      <h1 className="text-8xl sm:text-9xl font-normal tracking-tight select-none animate-fade-in">
        {letters.map((item, index) => (
          <span
            key={index}
            className={`${item.color} inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: `bounce-in 0.6s ease-out ${index * 100}ms both`
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
