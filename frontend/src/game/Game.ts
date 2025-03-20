import { Prize } from "./Prize";
import { Player } from "./Player";

// 🎮 Game class manages the game state
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private prizes: Prize[] = [];
  private player: Player;
  private background: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.player = new Player(canvas, this);

    // 🎨 Load background image
    this.background = new Image();
    this.background.src = "/assets/background.jpg";
    this.background.onload = () => {
      console.log("✅ Background image loaded successfully!");
    };

    this.createPrizes(); // 🎯 Initialize targets
  }

  private createPrizes() {
    const cols = 7;
    const rows = 3;
    const startX = 50;
    const startY = 100;
    const spacingX = 100;
    const spacingY = 100;

    this.prizes = []; // Reset previous prizes

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = startX + col * spacingX;
        const y = startY + row * spacingY;
        this.prizes.push(new Prize(x, y));
      }
    }
  }

  public update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height); // Draw background

    this.prizes.forEach((prize) => {
      prize.draw(this.ctx);
    });

    this.player.update(); // Update player (including bullets)
  }

  public checkPrizeHit(bulletX: number, bulletY: number): number {
    for (let i = 0; i < this.prizes.length; i++) {
      if (this.prizes[i].checkHit(bulletX, bulletY)) {
        const score = this.prizes[i].getScore();
        console.log(`🎯 Hit: ${this.prizes[i].getType()} - Score: ${score}`);
        this.prizes.splice(i, 1);
        return score;
      }
    }
    return 0;
  }
}
