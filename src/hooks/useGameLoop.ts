import { useEffect } from 'react';
import { GameState } from '../types/game';

interface UseGameLoopProps {
  canvas: HTMLCanvasElement | null;
  gameState: GameState;
  highScore: number;
  updateGame: (deltaTime: number) => void;
  animationRef: React.MutableRefObject<number>;
  lastFrameTime: React.MutableRefObject<number>;
  dinoImg: HTMLImageElement | null;
  cactusImg: HTMLImageElement | null;
  isLoading: boolean;
  loadError: boolean;
  loadingProgress: number;
}

export const useGameLoop = ({
  canvas,
  gameState,
  highScore,
  updateGame,
  animationRef,
  lastFrameTime,
  dinoImg,
  cactusImg,
  isLoading,
  loadError,
  loadingProgress,
}: UseGameLoopProps) => {
  useEffect(() => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log('useGameLoop - isPlaying:', gameState.isPlaying);
    console.log('useGameLoop - isGameOver:', gameState.isGameOver);
    console.log('useGameLoop - isLoading:', isLoading);
    console.log('useGameLoop - loadError:', loadError);
    console.log('useGameLoop - loadingProgress:', loadingProgress);
    console.log('useGameLoop - dinoImg loaded:', !!dinoImg);
    console.log('useGameLoop - cactusImg loaded:', !!cactusImg);

    // Handle loading state display
    if (isLoading) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#535353';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Loading game assets... ${loadingProgress}%`, canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 10, 200 * (loadingProgress / 100), 10);
      ctx.strokeStyle = '#535353';
      ctx.strokeRect(canvas.width / 2 - 100, canvas.height / 2 + 10, 200, 10);
      return;
    }

    if (loadError) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#535353';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Failed to load assets. Using fallback graphics.', canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText('Press Space to start', canvas.width / 2, canvas.height / 2 + 10);
      return;
    }

    // Only proceed with game drawing if not loading and no load error
    if (!gameState.isPlaying && !gameState.isGameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#535353';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Press Space to start', canvas.width / 2, canvas.height / 2);
      ctx.font = '14px Arial';
      ctx.fillText('Use Space to jump over obstacles', canvas.width / 2, canvas.height / 2 + 25);
      return;
    }

    if (!gameState.isPlaying && gameState.isGameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#535353';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Game Over! Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 10);
      ctx.font = '20px Arial';
      ctx.fillText('Press Space to Play Again', canvas.width / 2, canvas.height / 2 + 50);
      return;
    }

    const drawGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.fillStyle = '#535353';
      ctx.fillRect(0, canvas.height - 16, canvas.width, 16);

      // Draw dino
      console.log('Dino:', gameState.dino.x, gameState.dino.y, gameState.dino.width, gameState.dino.height, 'groundY:', gameState.dino.groundY);
      if (dinoImg) {
        ctx.drawImage(
          dinoImg,
          gameState.dino.x,
          gameState.dino.y,
          gameState.dino.width,
          gameState.dino.height
        );
      } else {
        ctx.fillStyle = '#535353';
        ctx.fillRect(
          gameState.dino.x,
          gameState.dino.y,
          gameState.dino.width,
          gameState.dino.height
        );
      }

      // Draw obstacles
      gameState.obstacles.forEach(obstacle => {
        console.log('Obstacle:', obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        if (cactusImg) {
          ctx.drawImage(
            cactusImg,
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
          );
        } else {
          ctx.fillStyle = '#535353';
          ctx.fillRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
          );
        }
      });

      // Draw score
      ctx.fillStyle = '#535353';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left'; // Reset text alignment
      ctx.fillText(`Score: ${gameState.score}`, 20, 30);
      ctx.fillText(`High Score: ${highScore}`, 20, 60);
    };

    const gameLoop = (timestamp: number) => {
      if (!lastFrameTime.current) {
        lastFrameTime.current = timestamp;
      }

      const deltaTime = timestamp - lastFrameTime.current;
      lastFrameTime.current = timestamp;

      updateGame(deltaTime);
      drawGame();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvas, gameState, highScore, updateGame, animationRef, lastFrameTime, dinoImg, cactusImg, isLoading, loadError, loadingProgress]);
};