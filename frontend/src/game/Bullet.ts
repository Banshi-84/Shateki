export class Bullet {
    private x: number;
    private y: number;
    private speed: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, x: number, y: number) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.speed = 5; // bullet speed
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public update() {
        this.y -= this.speed;// bullet go upside
    }

    public draw() {
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI *2);
        this.ctx.fill();
    }
    public isOffScreen(): boolean {
        return this.y <0;// out of screen is true
    }
}