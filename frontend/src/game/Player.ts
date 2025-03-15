import { Bullet } from "./Bullet";

// export makes this class usable in other files
export class Player {
    private x: number;
    private y: number;
    private ctx: CanvasRenderingContext2D;
    private bullets: Bullet[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.x = canvas.width / 2;
        this.y = canvas.height - 50;
        
        canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        canvas.addEventListener("click", this.shoot.bind(this));
    }

    private handleMouseMove(event: MouseEvent) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        this.x = event.clientX - rect.left;
        this.y = this.ctx.canvas.height - 50;
    }

    private shoot(event: MouseEvent) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const shotX = event.clientX - rect.left;
        const shotY = this.ctx.canvas.height - 50;
        this.bullets.push(new Bullet(this.ctx, shotX, shotY));
    }

    public update() {
        this.bullets.forEach((bullet, index) => {
            bullet.update();
            bullet.draw();
            if (bullet.isOffScreen()) {
                this.bullets.splice(index, 1);
            }
        });

        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
