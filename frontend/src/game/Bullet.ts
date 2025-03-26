import { Game } from "./Game";

// 🎯 Bullet class: Manages bullet movement
export class Bullet {
  private x: number;
  private y: number;
  private speed: number = 10;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private directionX: number;
  private directionY: number;
  private game: Game;
  private active: boolean = true;
  private hitTarget: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    game: Game,
    hitTarget: boolean
  ) {
    this.canvas = canvas;
    this.x = startX;
    this.y = startY;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.game = game;
    this.hitTarget = hitTarget;

    // Calculate Direction
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    this.directionX = dx / distance;
    this.directionY = dy / distance;

    // If clicked off-target, target will be extended off-screen.
    if (!hitTarget) {
      const farDistance = Math.max(canvas.width, canvas.height) * 1.5;
      targetX = startX + this.directionX * farDistance;
      targetY = startY + this.directionY * farDistance;
    }

    this.targetX = targetX;
    this.targetY = targetY;
  }

  // Update bullet position
  public update() {
    if (!this.active) return;

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // When it hits the target, it stops with a snap.
    if (this.hitTarget && distance < this.speed) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.hitPrize();
      return;
    }

    // If there is no target, skip off screen.
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    if (!this.hitTarget && this.isOffScreen()) {
      this.active = false;
    }
  }

  // Draw the bullet
  public draw() {
    if (!this.active) return;

    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  // If you hit the target, delete the Prize.
  private hitPrize() {
    this.active = false;
    const targetPrize = this.game.getPrizeAt(this.x, this.y);
    if (targetPrize) {
      this.game.removePrize(targetPrize);
    }
  }

  // Check if it went off screen.
  public isOffScreen(): boolean {
    return (
      this.x < 0 || this.x > this.canvas.width ||
      this.y < 0 || this.y > this.canvas.height
    );
  }

  // Is target still in the screen?
  public isAlive(): boolean {
    return this.active;
  }
}
