
import React, { useState, useEffect } from 'react';

const AnimatedGoogleLogo = () => {
  const [bounceIndex, setBounceIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);

  useEffect(() => {
    // Continuous bouncing animation
    const bounceInterval = setInterval(() => {
      setBounceIndex(prev => (prev + 1) % 6);
    }, 600);

    // Wave animation for floating effect
    const waveInterval = setInterval(() => {
      setWavePhase(prev => (prev + 1) % 360);
    }, 50);

    return () => {
      clearInterval(bounceInterval);
      clearInterval(waveInterval);
    };
  }, []);

  const letters = [
    { letter: 'G', color: 'text-google-blue' },
    { letter: 'o', color: 'text-google-red' },
    { letter: 'o', color: 'text-google-yellow' },
    { letter: 'g', color: 'text-google-blue' },
    { letter: 'l', color: 'text-google-green' },
    { letter: 'e', color: 'text-google-red' },
  ];

  const getLetterTransform = (index: number) => {
    const wave = Math.sin((wavePhase + index * 60) * (Math.PI / 180)) * 3;
    return `translateY(${wave}px)`;
  };

  const getLetterScale = (index: number) => {
    if (bounceIndex === index) return 'scale(1.2)';
    if (isHovered) return 'scale(1.1)';
    return 'scale(1)';
  };

  return (
    <div 
      className="flex items-center justify-center mb-8 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 className="text-8xl sm:text-9xl font-normal tracking-tight select-none">
        {letters.map((item, index) => (
          <span
            key={index}
            className={`
              ${item.color} 
              relative inline-block
              transition-all duration-300 ease-out
              hover:animate-pulse
              ${bounceIndex === index ? 'animate-bounce' : ''}
              ${isHovered ? 'animate-pulse' : ''}
            `}
            style={{
              transform: `${getLetterTransform(index)} ${getLetterScale(index)}`,
              animationDelay: `${index * 0.1}s`,
              filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none',
              textShadow: bounceIndex === index ? '0 0 20px currentColor' : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `${getLetterTransform(index)} scale(1.3) rotate(${Math.random() * 10 - 5}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `${getLetterTransform(index)} ${getLetterScale(index)}`;
            }}
          >
            {item.letter}
            
            {/* Sparkle effect on hover */}
            {isHovered && (
              <>
                <span 
                  className="absolute -top-2 -right-1 w-1 h-1 bg-current rounded-full animate-ping"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
                <span 
                  className="absolute -bottom-1 -left-1 w-1 h-1 bg-current rounded-full animate-ping"
                  style={{ animationDelay: `${index * 0.3}s` }}
                />
              </>
            )}
          </span>
        ))}
      </h1>
      
      {/* Rainbow glow effect on group hover */}
      <div 
        className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 
          transition-opacity duration-500
          bg-gradient-to-r from-google-blue via-google-red via-google-yellow via-google-green to-google-red
          blur-xl -z-10
        `}
      />
    </div>
  );
};

export default AnimatedGoogleLogo;
