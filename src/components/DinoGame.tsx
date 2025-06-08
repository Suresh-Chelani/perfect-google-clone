import React, { useState, useCallback, useEffect } from 'react';
import { GameCanvas } from './GameCanvas';
import { GameControls } from './GameControls';
import { useGameState } from '../hooks/useGameState';
import { useGameLoop } from '../hooks/useGameLoop';

export const DinoGame: React.FC = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const {
    gameState,
    highScore,
    jump,
    startGame,
    updateGame,
    animationRef,
    lastFrameTime,
  } = useGameState(canvasWidth, canvasHeight);

  // Set up game loop
  useGameLoop({
    canvas,
    gameState,
    highScore,
    updateGame,
    animationRef,
    lastFrameTime,
  });

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        
        if (!gameState.isPlaying && !gameState.isGameOver) {
          startGame();
        } else if (gameState.isPlaying) {
          jump();
        } else if (gameState.isGameOver) {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying, gameState.isGameOver, startGame, jump]);

  const handleCanvasReady = useCallback((canvasElement: HTMLCanvasElement) => {
    setCanvas(canvasElement);
    setCanvasWidth(canvasElement.width);
    setCanvasHeight(canvasElement.height);
  }, []);

  const handleStart = useCallback(() => {
    startGame();
  }, [startGame]);

  const handleRestart = useCallback(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Chrome Dino Game</h1>
          <p className="text-gray-600">Classic endless runner game</p>
        </div>

        <GameCanvas onCanvasReady={handleCanvasReady} />

        <GameControls
          isPlaying={gameState.isPlaying}
          isGameOver={gameState.isGameOver}
          score={gameState.score}
          highScore={highScore}
          onStart={handleStart}
          onRestart={handleRestart}
        />

        {gameState.isPlaying && (
          <div className="mt-4 text-xs text-gray-500">
            <p>Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">SPACE</kbd> to jump</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinoGame;