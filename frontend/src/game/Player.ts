import { Bullet } from "./Bullet";
import { Game } from "./Game";

// 🎯 Player class manages aiming and shooting
export class Player {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bullets: Bullet[] = [];
  private game: Game;
  private x: number;
  private y: number;

  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.game = game;
    this.x = canvas.width / 2;
    this.y = canvas.height - 50;

    canvas.addEventListener("click", this.shoot.bind(this));
  }

  private shoot(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const targetX = event.clientX - rect.left;
    const targetY = event.clientY - rect.top;

    console.log(`🎯 Shot fired at (${targetX}, ${targetY})`);
    this.bullets.push(new Bullet(this.canvas, this.x, this.y, targetX, targetY));
  }

  public update() {
    this.bullets.forEach((bullet, index) => {
      bullet.update();
      bullet.draw();
      if (bullet.isOffScreen()) {
        this.bullets.splice(index, 1);
      }
    });
  }
}
