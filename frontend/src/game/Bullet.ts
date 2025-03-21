import { Game } from "./Game"; // Game クラスをインポート

export class Bullet {
    private x: number;
    private y: number;
    private speed: number = 5;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private directionX: number;
    private directionY: number;
    private game: Game;
    private active: boolean = true; // 弾の生存管理

    constructor(canvas: HTMLCanvasElement, startX: number, startY: number, targetX: number, targetY: number, game: Game) {
        this.canvas = canvas;
        this.x = startX;
        this.y = startY;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.game = game;

        // 方向を計算
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.directionX = dx / distance;
        this.directionY = dy / distance;
    }

    public update() {
        if (!this.active) return;

        // 弾の移動
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;

        // 🎯 的に当たったかチェック
        const score = this.game.checkPrizeHit(this.x, this.y);
        if (score > 0) {
            console.log(`🏆 Scored: ${score} points!`);
            this.active = false;
            return;
        }

        // 画面外に出たら削除
        if (this.isOffScreen()) {
            this.active = false;
        }
    }

    public draw() {
        if (!this.active) return;

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    public isOffScreen(): boolean {
        return this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height;
    }

    public isAlive(): boolean {
        return this.active;
    }
}
