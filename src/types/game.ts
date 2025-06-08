export interface Dino {
    x: number;
    y: number;
    width: number;
    height: number;
    jumping: boolean;
    jumpForce: number;
    groundY: number;
  }
  
  export interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export interface GameState {
    dino: Dino;
    obstacles: Obstacle[];
    gameSpeed: number;
    lastObstacleTime: number;
    lastScoreUpdate: number;
    scoreInterval: number;
    isPlaying: boolean;
    isGameOver: boolean;
    score: number;
  }
  
  export interface GameConfig {
    canvas: {
      width: number;
      height: number;
    };
    dino: {
      width: number;
      height: number;
      jumpForce: number;
    };
    obstacle: {
      width: number;
      height: number;
      minSpawnDelay: number;
      maxSpawnDelay: number;
    };
    physics: {
      gravity: number;
      gameSpeed: number;
      speedIncrement: number;
    };
    colors: {
      ground: string;
      dino: string;
      obstacle: string;
      text: string;
      background: string;
    };
  }