import { Game } from "./Game";
import { Bullet } from "./Bullet"; // Bullet を追加

export class Player {
  private game: Game;
  private x: number;
  private y: number;

  constructor(game: Game) {
    this.game = game;
    this.x = game.getCanvas().width / 2;
    this.y = game.getCanvas().height - 50;

    game.getCanvas().addEventListener("click", this.shoot.bind(this));
  }

  private shoot(event: MouseEvent) {
    const canvas = this.game.getCanvas();
    const rect = canvas.getBoundingClientRect();
    const shotX = event.clientX - rect.left;
    const shotY = event.clientY - rect.top;

    console.log("🔫 Shooting bullet!");
    
    // `addBullet` を正しく使用
    const bullet = new Bullet(canvas, this.x, this.y, shotX, shotY, this.game);
    this.game.addBullet(bullet);
  }

  public update() {
    // 特に動かす処理はなし
  }
}
