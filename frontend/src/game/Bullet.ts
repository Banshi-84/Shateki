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

    // 📐 方向を計算
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    this.directionX = dx / distance;
    this.directionY = dy / distance;

    // 🚀 的以外クリックなら、ターゲットを画面外へ拡張
    if (!hitTarget) {
      const farDistance = Math.max(canvas.width, canvas.height) * 1.5;
      targetX = startX + this.directionX * farDistance;
      targetY = startY + this.directionY * farDistance;
    }

    this.targetX = targetX;
    this.targetY = targetY;
  }

  // 🔄 Update bullet position
  public update() {
    if (!this.active) return;

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 🎯 的に命中したらピタッと止める
    if (this.hitTarget && distance < this.speed) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.hitPrize();
      return;
    }

    // 🚀 的がないなら、画面外に飛ばす
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    if (!this.hitTarget && this.isOffScreen()) {
      this.active = false;
    }
  }

  // 🔴 弾を描画
  public draw() {
    if (!this.active) return;

    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  // 💥 的に命中したら Prize を消す
  private hitPrize() {
    this.active = false;
    const targetPrize = this.game.getPrizeAt(this.x, this.y);
    if (targetPrize) {
      this.game.removePrize(targetPrize);
    }
  }

  // 🛑 画面外に出たかチェック
  public isOffScreen(): boolean {
    return (
      this.x < 0 || this.x > this.canvas.width ||
      this.y < 0 || this.y > this.canvas.height
    );
  }

  // 🎯 まだ画面内に残っているか
  public isAlive(): boolean {
    return this.active;
  }
}
