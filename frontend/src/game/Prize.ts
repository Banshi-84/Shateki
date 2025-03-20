// 🎯 Prize class represents shooting targets
export class Prize {
    private x: number;
    private y: number;
    private width: number = 50;
    private height: number = 50;
    private type: string;
    private score: number;
    private image: HTMLImageElement;
  
    private static PRIZE_TYPES = [
      { name: "Bear Doll", score: 50, img: "/assets/3.png" },
      { name: "Yo-yo", score: 10, img: "/assets/4.png" },
      { name: "Candy", score: 5, img: "/assets/5.png" },
      { name: "Chips", score: 20, img: "/assets/6.png" },
      { name: "Mystery Box", score: Math.floor(Math.random() * 41), img: "/assets/7.png" },
      { name: "Coffee", score: 30, img: "/assets/8.png" }
    ];
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const randomPrize = Prize.PRIZE_TYPES[Math.floor(Math.random() * Prize.PRIZE_TYPES.length)];
      this.type = randomPrize.name;
      this.score = randomPrize.score;
      this.image = new Image();
      this.image.src = randomPrize.img;
    }
  
    public draw(ctx: CanvasRenderingContext2D) {
      if (!this.image.complete) return;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    public checkHit(bulletX: number, bulletY: number): boolean {
      return bulletX >= this.x && bulletX <= this.x + this.width &&
             bulletY >= this.y && bulletY <= this.y + this.height;
    }
  
    public getScore(): number {
      return this.score;
    }
  
    public getType(): string {
      return this.type;
    }
  }
  