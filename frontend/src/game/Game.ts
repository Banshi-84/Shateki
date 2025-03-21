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

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.player = new Player(this);

    // 🎨 Load background image
    this.background = new Image();
    this.background.src = "/assets/background.jpg";
    this.background.onload = () => console.log("✅ Background loaded!");

    this.createPrizes(); // 🎯 Initialize targets
    this.setupClickEvent(); // 🖱 Setup click event for shooting
  }

  // 🎯 Get canvas reference
  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  // 🎯 Create targets at specific positions
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

  // 🖱 Handle click events for shooting
  private setupClickEvent() {
    this.canvas.addEventListener("click", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const targetPrize = this.getPrizeAt(clickX, clickY);

      if (targetPrize) {
        this.player.shoot(clickX, clickY, true); // 🎯 Shoot at target
      } else {
        this.player.shoot(clickX, clickY, false); // 🚀 Shoot into the background
      }
    });
  }

  // 🎯 Check if the click hit a target
  public getPrizeAt(x: number, y: number): Prize | null {
    return this.prizes.find(prize => prize.checkHit(x, y)) || null;
  }

  // 💥 Remove target when hit and respawn after 1 second
  public removePrize(prize: Prize) {
    const x = prize.getX();
    const y = prize.getY();

    // Remove current prize
    this.prizes = this.prizes.filter(p => p !== prize);

    // Respawn after 1 second
    setTimeout(() => {
      const alreadyExists = this.prizes.some(p => p.getX() === x && p.getY() === y);
      if (!alreadyExists) {
        const newPrize = new Prize(x, y);
        this.prizes.push(newPrize);
      }
    }, 1000);
  }

  // 🔫 Add bullet to the game
  public addBullet(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  // 🖼 Update game visuals
  public update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

    this.prizes.forEach(prize => prize.draw(this.ctx));

    this.bullets.forEach(bullet => {
      bullet.update();
      bullet.draw();
    });

    this.bullets = this.bullets.filter(bullet => bullet.isAlive());

    this.player.draw(this.ctx); // 🎯 Draw player
  }
}
