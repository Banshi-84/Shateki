import { Player } from "./Player";

// export makes this class usable in other files
export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private player: Player;
    private background: HTMLImageElement;
    private isZooming: boolean = true;
    private scale: number = 1.5;
    private zoomSpeed: number = 0.02;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.player = new Player(this.canvas);

        this.background = new Image();
        this.background.src = "/assets/background.jpg"; // 背景画像のパス

        this.background.onload = () => {
            this.startZoomIn();
        };

        this.gameLoop();
    }

    private startZoomIn() {
        const zoomAnimation = () => {
            if (this.scale > 1) {
                this.scale -= this.zoomSpeed;
                requestAnimationFrame(zoomAnimation);
            } else {
                this.isZooming = false;
            }
        };
        zoomAnimation();
    }

    private gameLoop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 画面クリア

        // 背景をズームしながら描画
        const bgWidth = this.canvas.width * this.scale;
        const bgHeight = this.canvas.height * this.scale;
        const bgX = (this.canvas.width - bgWidth) / 2;
        const bgY = (this.canvas.height - bgHeight) / 2;
        this.ctx.drawImage(this.background, bgX, bgY, bgWidth, bgHeight);

        if (!this.isZooming) {
            this.player.update(); // プレイヤーと弾の更新
        }

        requestAnimationFrame(this.gameLoop);
    };
}
