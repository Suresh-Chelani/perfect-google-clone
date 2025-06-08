import { useState, useRef, useCallback, useEffect } from 'react';

interface Dino {
  x: number;
  y: number;
  width: number;
  height: number;
  jumping: boolean;
  jumpForce: number;
  groundY: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GameState {
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

const DINO_WIDTH = 44;
const DINO_HEIGHT = 47;
const CACTUS_WIDTH = 17;
const CACTUS_HEIGHT = 35;
const GROUND_HEIGHT = 16;
const JUMP_FORCE = -15;
const GRAVITY = 0.6;

const INITIAL_GAME_STATE_BASE: Omit<GameState, 'dino'> = {
  obstacles: [],
  gameSpeed: 6,
  lastObstacleTime: 0,
  lastScoreUpdate: 0,
  scoreInterval: 100,
  isPlaying: false,
  isGameOver: false,
  score: 0,
};

export const useGameState = (canvasWidth: number, canvasHeight: number) => {
  const [gameState, setGameState] = useState<GameState>({
    ...INITIAL_GAME_STATE_BASE,
    dino: {
      x: 50,
      y: 0,
      width: DINO_WIDTH,
      height: DINO_HEIGHT,
      jumping: false,
      jumpForce: 0,
      groundY: 0,
    },
  });
  const [highScore, setHighScore] = useState(0);
  const animationRef = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const [dinoImg, setDinoImg] = useState<HTMLImageElement | null>(null);
  const [cactusImg, setCactusImg] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadingProgress(prev => prev + 50); // Each image is 50% of loading
        resolve(img);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (canvasHeight === 0) return;

    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        setLoadError(true);
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    Promise.all([
      loadImage('./dino.png').catch(() => null),
      loadImage('./cactus.png').catch(() => null)
    ]).then(([dino, cactus]) => {
      clearTimeout(loadingTimeout);
      setDinoImg(dino);
      setCactusImg(cactus);
      setIsLoading(false);
    }).catch(() => {
      clearTimeout(loadingTimeout);
      setLoadError(true);
      setIsLoading(false);
    });

    setGameState(prev => ({
      ...prev,
      dino: {
        ...prev.dino,
        y: canvasHeight - DINO_HEIGHT - GROUND_HEIGHT,
        groundY: canvasHeight - DINO_HEIGHT - GROUND_HEIGHT,
      },
    }));

    return () => clearTimeout(loadingTimeout);
  }, [canvasHeight, loadImage, isLoading]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...INITIAL_GAME_STATE_BASE,
      dino: {
        x: 50,
        y: prev.dino.groundY,
        width: DINO_WIDTH,
        height: DINO_HEIGHT,
        jumping: false,
        jumpForce: 0,
        groundY: prev.dino.groundY,
      },
      isPlaying: true,
    }));
  }, []);

  const jump = useCallback(() => {
    if (!gameState.dino.jumping) {
      setGameState(prev => ({
        ...prev,
        dino: {
          ...prev.dino,
          jumping: true,
          jumpForce: JUMP_FORCE,
        },
      }));
    }
  }, [gameState.dino.jumping]);

  const setGameOver = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isGameOver: true,
    }));
    setHighScore(prev => Math.max(prev, gameState.score));
  }, [gameState.score]);

  const updateGame = useCallback((deltaTime: number) => {
    setGameState(prev => {
      const newState = { ...prev };

      if (newState.dino.jumping) {
        newState.dino.y += newState.dino.jumpForce * (deltaTime / 16.66);
        newState.dino.jumpForce += GRAVITY * (deltaTime / 16.66);

        if (newState.dino.y >= newState.dino.groundY) {
          newState.dino.y = newState.dino.groundY;
          newState.dino.jumping = false;
        }
      } else if (newState.dino.y < newState.dino.groundY) {
        newState.dino.y += GRAVITY * (deltaTime / 16.66);
        if (newState.dino.y >= newState.dino.groundY) {
          newState.dino.y = newState.dino.groundY;
        }
      }

      newState.obstacles = newState.obstacles
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x - newState.gameSpeed * (deltaTime / 16.66),
        }))
        .filter(obstacle => obstacle.x > -obstacle.width);

      for (const obstacle of newState.obstacles) {
        if (checkCollision(newState.dino, obstacle)) {
          setGameOver();
          return prev;
        }
      }

      const now = Date.now();
      if (now - newState.lastObstacleTime > 1500) {
        newState.obstacles.push({
          x: canvasWidth,
          y: canvasHeight - CACTUS_HEIGHT - GROUND_HEIGHT,
          width: CACTUS_WIDTH,
          height: CACTUS_HEIGHT,
        });
        newState.lastObstacleTime = now;
      }

      if (now - newState.lastScoreUpdate > newState.scoreInterval) {
        newState.score += 1;
        newState.lastScoreUpdate = now;
      }

      return newState;
    });
  }, [canvasWidth, canvasHeight, setGameOver]);

  const checkCollision = (dino: Dino, obstacle: Obstacle) => {
    const buffer = 5; // Small buffer for more forgiving collisions
    return (
      dino.x + buffer < obstacle.x + obstacle.width - buffer &&
      dino.x + dino.width - buffer > obstacle.x + buffer &&
      dino.y + buffer < obstacle.y + obstacle.height - buffer &&
      dino.y + dino.height - buffer > obstacle.y + buffer
    );
  };

  return {
    gameState,
    highScore,
    jump,
    startGame,
    updateGame,
    setGameOver,
    animationRef,
    lastFrameTime,
    dinoImg,
    cactusImg,
    isLoading,
    loadError,
    loadingProgress,
  };
};