// 🎯 Prize class: Represents a target
export class Prize {
    private x: number;
    private y: number;
    private width: number = 60;
    private height: number = 60;
    private type: string;
    private score: number;
    private image: HTMLImageElement;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  
      const types = [
        { type: "Bear Doll", image: "3.png", score: 50 },
        { type: "Yo-yo", image: "4.png", score: 10 },
        { type: "Candy", image: "5.png", score: 5 },
        { type: "Chips", image: "6.png", score: 20 },
        { type: "Mystery Box", image: "7.png", score: Math.floor(Math.random() * 41) },
        { type: "Coffee", image: "8.png", score: 30 }
      ];
  
      const selected = types[Math.floor(Math.random() * types.length)];
      this.type = selected.type;
      this.score = selected.score;
      this.image = new Image();
      this.image.src = `/assets/${selected.image}`;
    }
  
    // 🖼 Draw the prize image
    public draw(ctx: CanvasRenderingContext2D) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    // 🎯 Check if a point hits this prize
    public checkHit(px: number, py: number): boolean {
      return (
        px >= this.x &&
        px <= this.x + this.width &&
        py >= this.y &&
        py <= this.y + this.height
      );
    }
  
    public getType(): string {
      return this.type;
    }
  
    public getScore(): number {
      return this.score;
    }
  
    public getX(): number {
      return this.x;
    }
  
    public getY(): number {
      return this.y;
    }
  }
  