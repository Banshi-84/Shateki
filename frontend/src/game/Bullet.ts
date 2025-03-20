// 🎯 Bullet class manages bullet movement
export class Bullet {
    private x: number;
    private y: number;
    private speed: number = 5;
    private targetX: number;
    private targetY: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private directionX: number;
    private directionY: number;
  
    constructor(canvas: HTMLCanvasElement, startX: number, startY: number, targetX: number, targetY: number) {
      this.canvas = canvas;
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  
      const dx = targetX - startX;
      const dy = targetY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      this.directionX = dx / distance;
      this.directionY = dy / distance;
    }
  
    public update() {
      this.x += this.directionX * this.speed;
      this.y += this.directionY * this.speed;
    }
  
    public draw() {
      this.ctx.fillStyle = "red";
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  
    public isOffScreen(): boolean {
      return this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height;
    }
  }
  