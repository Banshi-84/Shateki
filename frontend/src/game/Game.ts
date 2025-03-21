import { Prize } from "./Prize";
import { Player } from "./Player";
import { Bullet } from "./Bullet";

// 🎮 Game class: Manages the game state
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private prizes: Prize[] = [];
  private bullets: Bullet[] = [];
  private player: Player;
  private background: HTMLImageElement;

  private score: number = 0;
  private scorePosition = { x: 600, y: 204 };

  private timeLimit: number = 60;
  private startTime: number = Date.now();
  private timerPosition = { x: 150, y: 204 };

  private isGameOver: boolean = false; // ✅ ゲーム終了フラグ
  private onGameEnd: (score: number) => void; // ✅ 終了時に通知するコールバック

  constructor(canvas: HTMLCanvasElement, onGameEnd: (score: number) => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.player = new Player(this);
    this.onGameEnd = onGameEnd; // ✅ コールバックをセット

    this.background = new Image();
    this.background.src = "/assets/background.jpg";
    this.background.onload = () => console.log("✅ Background loaded!");

    this.createPrizes();
    this.setupClickEvent();
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  private createPrizes() {
    const positions = [
      { x: 150, y: 230 }, { x: 225, y: 230 }, { x: 300, y: 230 },
      { x: 375, y: 230 }, { x: 450, y: 230 }, { x: 525, y: 230 },
      { x: 600, y: 230 },
      { x: 150, y: 300 }, { x: 225, y: 300 }, { x: 300, y: 300 },
      { x: 375, y: 300 }, { x: 450, y: 300 }, { x: 525, y: 300 },
      { x: 600, y: 300 },
      { x: 150, y: 370 }, { x: 225, y: 370 }, { x: 300, y: 370 },
      { x: 375, y: 370 }, { x: 450, y: 370 }, { x: 525, y: 370 },
      { x: 600, y: 370 }
    ];
    this.prizes = positions.map(pos => new Prize(pos.x, pos.y));
  }

  private setupClickEvent() {
    this.canvas.addEventListener("click", (event) => {
      if (this.isGameOver) return; // ✅ 終了後のクリック無効

      const rect = this.canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const targetPrize = this.getPrizeAt(clickX, clickY);

      if (targetPrize) {
        this.player.shoot(clickX, clickY, true);
      } else {
        this.player.shoot(clickX, clickY, false);
      }
    });
  }

  public getPrizeAt(x: number, y: number): Prize | null {
    return this.prizes.find(prize => prize.checkHit(x, y)) || null;
  }

  public removePrize(prize: Prize) {
    if (this.isGameOver) return; // ✅ 終了後は処理しない

    const x = prize.getX();
    const y = prize.getY();
    this.score += prize.getScore();

    this.prizes = this.prizes.filter(p => p !== prize);

    setTimeout(() => {
      const exists = this.prizes.some(p => p.getX() === x && p.getY() === y);
      if (!exists) {
        this.prizes.push(new Prize(x, y));
      }
    }, 1000);
  }

  public addBullet(bullet: Bullet) {
    if (!this.isGameOver) {
      this.bullets.push(bullet);
    }
  }

  public getScore(): number {
    return this.score;
  }

  private drawScore() {
    const { x, y } = this.scorePosition;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.fillRect(x - 10, y - 25, 120, 35);

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, x, y);
  }

  private drawTimer() {
    const { x, y } = this.timerPosition;
    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const timeLeft = Math.max(this.timeLimit - elapsed, 0);

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.fillRect(x - 10, y - 25, 120, 35);

    this.ctx.fillStyle = "yellow";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Time: ${timeLeft}s`, x, y);

    if (timeLeft <= 0 && !this.isGameOver) {
      this.endGame();
    }
  }

  public update() {
    if (this.isGameOver) return; // ✅ 終了後は描画しない

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

    this.prizes.forEach(prize => prize.draw(this.ctx));
    this.bullets.forEach(bullet => {
      bullet.update();
      bullet.draw();
    });

    this.bullets = this.bullets.filter(b => b.isAlive());

    this.player.draw(this.ctx);
    this.drawScore();
    this.drawTimer();
  }

  public endGame() {
    if (!this.isGameOver) {
      this.isGameOver = true;
      this.onGameEnd(this.score); // ✅ 記録画面へ通知
    }
  }
}
