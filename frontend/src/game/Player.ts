import { Bullet } from "./Bullet";

// export makes this class usable in other files
export class Player {
    private x: number;
    private y: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private bullets: Bullet[] = [];

    // Constructor executes when a Player instance is created
    constructor(canvas: HTMLCanvasElement) {
        // The initial aim point is the center of the canvas
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.x = canvas.width / 2;
        this.y = canvas.height - 50;
        
        // Update aim position when the mouse moves
        canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

        // Click to shoot bullet
        canvas.addEventListener("click", this.shoot.bind(this));
    }

    private handleMouseMove(event: MouseEvent) { // event: MouseEvent gets the mouse position
        const rect = this.canvas.getBoundingClientRect(); // Get canvas location and size
        this.x = event.clientX - rect.left; // Convert to canvas-relative coordinates
        this.y = this.canvas.height - 50; // Keep the aiming position fixed
        console.log(`Aiming at: (${this.x}, ${this.y})`);
    }

    private shoot(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect(); // Get the location of the element in the browser in px
        const shotX = event.clientX - rect.left;
        const shotY = this.canvas.height - 50;
        this.bullets.push(new Bullet(this.canvas, shotX, shotY)); // Add a new bullet
        console.log(`Shot fired at: (${shotX}, ${shotY})`);
    }

    public update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the screen

        this.bullets.forEach((bullet, index) => { // ✅ 修正: bullet, index に変更
            bullet.update();
            bullet.draw();
            if (bullet.isOffScreen()) {
                this.bullets.splice(index, 1); // ✅ 修正: indexedDB → index に変更
            }
        });

        // Draw the aiming point
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    public getPosition() {
        return { x: this.x, y: this.y };
    }
}
