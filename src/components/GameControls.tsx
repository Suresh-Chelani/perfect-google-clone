import React from 'react';

interface GameControlsProps {
  isPlaying: boolean;
  isGameOver: boolean;
  score: number;
  highScore: number;
  onStart: () => void;
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  isGameOver,
  score,
  highScore,
  onStart,
  onRestart,
}) => {
  if (isGameOver) {
    return (
      <div className="mt-4">
        <p className="text-red-500 mb-2">Game Over! Score: {score}</p>
        <p className="text-gray-600 mb-2">High Score: {highScore}</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Play Again
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="mt-4">
        <p className="text-gray-600">Press Space to start</p>
        <p className="text-gray-500 text-sm">Use Space to jump over obstacles</p>
      </div>
    );
  }

  return null;
};