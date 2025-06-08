import { GameConfig } from '../types/game';

export const GAME_CONFIG: GameConfig = {
  canvas: {
    width: 800,
    height: 200,
  },
  dino: {
    width: 40,
    height: 43,
    jumpForce: -12,
  },
  obstacle: {
    width: 20,
    height: 40,
    minSpawnDelay: 1200,
    maxSpawnDelay: 2000,
  },
  physics: {
    gravity: 0.5,
    gameSpeed: 4,
    speedIncrement: 0.005,
  },
  colors: {
    ground: '#535353',
    dino: '#535353',
    obstacle: '#535353',
    text: '#535353',
    background: '#f7f7f7',
  },
};