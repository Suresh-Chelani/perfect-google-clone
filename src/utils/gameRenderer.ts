import { Dino, Obstacle, GameState } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(): void {
    this.ctx.fillStyle = GAME_CONFIG.colors.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGround(): void {
    const groundHeight = 2;
    const groundY = this.canvas.height - groundHeight;
    
    this.ctx.fillStyle = GAME_CONFIG.colors.ground;
    this.ctx.fillRect(0, groundY, this.canvas.width, groundHeight);
    
    // Draw ground pattern
    this.ctx.strokeStyle = GAME_CONFIG.colors.ground;
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([5, 10]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, groundY - 5);
    this.ctx.lineTo(this.canvas.width, groundY - 5);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  drawDino(dino: Dino): void {
    this.ctx.fillStyle = GAME_CONFIG.colors.dino;
    
    // Draw dino body (simplified T-Rex shape)
    this.ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    
    // Draw eye
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(dino.x + 25, dino.y + 12, 3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.arc(dino.x + 25, dino.y + 12, 2, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw legs (simple animation based on ground contact)
    this.ctx.fillStyle = GAME_CONFIG.colors.dino;
    if (!dino.isJumping) {
      // Alternating leg positions for running effect
      const offset = Math.floor(Date.now() / 100) % 2 === 0 ? 2 : -2;
      this.ctx.fillRect(dino.x + 10 + offset, dino.y + dino.height - 8, 6, 8);
      this.ctx.fillRect(dino.x + 20 - offset, dino.y + dino.height - 8, 6, 8);
    } else {
      // Legs together when jumping
      this.ctx.fillRect(dino.x + 12, dino.y + dino.height - 8, 6, 8);
      this.ctx.fillRect(dino.x + 22, dino.y + dino.height - 8, 6, 8);
    }
  }

  drawObstacle(obstacle: Obstacle): void {
    this.ctx.fillStyle = GAME_CONFIG.colors.obstacle;
    
    if (obstacle.type === 'cactus') {
      // Draw cactus
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Add cactus arms
      this.ctx.fillRect(obstacle.x - 4, obstacle.y + 10, 8, 3);
      this.ctx.fillRect(obstacle.x + obstacle.width - 4, obstacle.y + 15, 8, 3);
    }
  }

  drawScore(score: number, highScore: number): void {
    this.ctx.fillStyle = GAME_CONFIG.colors.text;
    this.ctx.font = 'bold 16px monospace';
    this.ctx.textAlign = 'right';
    
    const scoreText = `HI ${highScore.toString().padStart(5, '0')} ${score.toString().padStart(5, '0')}`;
    this.ctx.fillText(scoreText, this.canvas.width - 20, 30);
  }

  drawGameOver(score: number, highScore: number): void {
    // Draw semi-transparent overlay
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = GAME_CONFIG.colors.text;
    this.ctx.font = 'bold 24px monospace';
    this.ctx.textAlign = 'center';
    
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
    
    this.ctx.font = '16px monospace';
    this.ctx.fillText(`Score: ${score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
    
    if (score === highScore && score > 0) {
      this.ctx.fillStyle = '#ff6b6b';
      this.ctx.fillText('NEW HIGH SCORE!', this.canvas.width / 2, this.canvas.height / 2 + 35);
    }
  }

  drawStartMessage(): void {
    this.ctx.fillStyle = GAME_CONFIG.colors.text;
    this.ctx.font = '18px monospace';
    this.ctx.textAlign = 'center';
    
    this.ctx.fillText('Press SPACE to start', this.canvas.width / 2, this.canvas.height / 2);
    
    this.ctx.font = '12px monospace';
    this.ctx.fillText('Use SPACE to jump', this.canvas.width / 2, this.canvas.height / 2 + 25);
  }
}