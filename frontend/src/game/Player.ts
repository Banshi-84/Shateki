import { Game } from "./Game";
import { Bullet } from "./Bullet";

// 🎯 Player class: Controls shooting
export class Player {
  private game: Game;
  private x: number;
  private y: number;

  constructor(game: Game) {
    this.game = game;
    this.x = game.getCanvas().width / 2;
    this.y = game.getCanvas().height - 50;
  }

  // Bullet
  public shoot(targetX: number, targetY: number, hitTarget: boolean) {
    console.log("🔫 Shooting at", targetX, targetY, hitTarget);
    const bullet = new Bullet(this.game.getCanvas(), this.x, this.y, targetX, targetY, this.game, hitTarget);
    this.game.addBullet(bullet);
  }

  // position for bule 
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}
