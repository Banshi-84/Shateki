import React, { useEffect, useRef, useState } from "react";
import { Game } from "../game/Game";
import { useNavigate } from "react-router-dom";

// 🎮 ゲーム画面
const GameScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // ⏱ 残り時間（秒）
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (canvasRef.current && !game) {
      const newGame = new Game(canvasRef.current);
      setGame(newGame);

      // 🎮 ゲームループ
      const loop = () => {
        newGame.update();
        requestAnimationFrame(loop);
      };
      loop();

      // ⏱ 1秒ごとにカウントダウン
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);

            newGame.endGame(); // ✅ ゲームを強制終了

            const score = newGame.getScore(); // ✅ スコア取得
            saveScore(score); // ✅ スコア保存

            // 記録画面へ遷移し、スコアを渡す
            navigate("/record", { state: { score } }); // ✅ 自動遷移
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // クリーンアップ
  }, [game, navigate]);

  // 💾 スコアを localStorage に保存
  const saveScore = (score: number) => {
    const scores = JSON.parse(localStorage.getItem("myScores") || "[]");
    scores.unshift(score);
    const trimmed = scores.slice(0, 20); // 直近20件まで
    localStorage.setItem("myScores", JSON.stringify(trimmed));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Shateki Game</h2>
      <p>⏱ Time Left: {timeLeft}s</p>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
      />
      <br />
      <button onClick={() => navigate("/")}>← Back to Home</button>
    </div>
  );
};

export default GameScreen;
