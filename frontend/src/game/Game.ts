import { Prize } from "./Prize";
import { Player } from "./Player";
import { Bullet } from "./Bullet";

// 🎮 Game class manages the game state
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private prizes: Prize[] = [];
  private bullets: Bullet[] = []; // 弾のリスト
  private player: Player;
  private background: HTMLImageElement;

  private prizePositions: { x: number; y: number }[] = [
    { x: 150, y: 200 }, { x: 200, y: 200 }, { x: 250, y: 200 }, { x: 400, y: 200 },
    { x: 450, y: 200 }, { x: 500, y: 200 }, { x: 550, y: 200 },
    { x: 150, y: 300 }, { x: 200, y: 300 }, { x: 250, y: 300 }, { x: 400, y: 300 },
    { x: 450, y: 300 }, { x: 500, y: 300 }, { x: 550, y: 300 },
    { x: 150, y: 400 }, { x: 200, y: 400 }, { x: 250, y: 400 }, { x: 400, y: 400 },
    { x: 450, y: 400 }, { x: 500, y: 400 }, { x: 550, y: 400 }
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.player = new Player(this);

    this.background = new Image();
    this.background.src = "/assets/background.jpg";
    this.background.onload = () => {
      console.log("✅ 背景画像ロード完了！");
    };

    this.createPrizes();
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  private createPrizes() {
    this.prizes = [];
    this.prizePositions.forEach(pos => {
      this.prizes.push(new Prize(pos.x, pos.y));
    });
  }

  public addBullet(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  private drawBullets() {
    this.bullets.forEach(bullet => bullet.draw());
  }

  private drawGuideBullet() {
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height - 50, 5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  public update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

    this.prizes.forEach(prize => prize.draw(this.ctx));

    this.bullets.forEach(bullet => bullet.update());
    this.bullets = this.bullets.filter(bullet => bullet.isAlive());
    this.drawBullets(); // 🔥 弾を描画する処理を追加

    this.player.update();
    this.drawGuideBullet();
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
