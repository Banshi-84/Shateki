export class Bullet {
    private x: number;
    private y: number;
    private speed: number = 5;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    public update() {
        this.y -= this.speed;
    }

    public draw() {
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    public isOffScreen(): boolean {
        return this.y < 0;
    }
}
