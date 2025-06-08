import { Dino, Obstacle } from '../types/game';

export const checkCollision = (dino: Dino, obstacle: Obstacle): boolean => {
  const buffer = 4; // Small buffer for more forgiving collision
  
  return (
    dino.x + buffer < obstacle.x + obstacle.width - buffer &&
    dino.x + dino.width - buffer > obstacle.x + buffer &&
    dino.y + buffer < obstacle.y + obstacle.height - buffer &&
    dino.y + dino.height - buffer > obstacle.y + buffer
  );
};

export const getRandomSpawnDelay = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};