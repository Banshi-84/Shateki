export class Prize {
    private x: number;
    private y: number;
    private width: number = 50;  // 的の幅
    private height: number = 50; // 的の高さ
    private type: string;
    private score: number;
  
    constructor(x: number, y: number, type: string = "default") {
      this.x = x;
      this.y = y;
      this.type = type;
  
      // 🎯 的のポイントを設定
      const scores: { [key: string]: number } = {
        "Bear Doll": 50,
        "Yo-yo": 10,
        "Candy": 5,
        "Chips": 20,
        "Mystery Box": Math.floor(Math.random() * 41), // 0~40のランダム
        "Coffee": 30
      };
      this.score = scores[this.type] || 10;
    }
  
    // 🎯 的を描画する
    public draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "red"; // 的の色（仮）
      ctx.fillRect(this.x, this.y, this.width, this.height); // 当たり判定を四角形で描画（デバッグ用）
      
      ctx.fillStyle = "black"; // 的の種類を表示
      ctx.fillText(this.type, this.x + 5, this.y + 25);
    }
  
    // 🎯 当たり判定チェック
    public checkHit(bulletX: number, bulletY: number): boolean {
      return (
        bulletX >= this.x &&
        bulletX <= this.x + this.width &&
        bulletY >= this.y &&
        bulletY <= this.y + this.height
      );
    }
  
    // 🔢 スコアを取得
    public getScore(): number {
      return this.score;
    }
  
    // 🎯 的の種類を取得
    public getType(): string {
      return this.type;
    }
  }
  