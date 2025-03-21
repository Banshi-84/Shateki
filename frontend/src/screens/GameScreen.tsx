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
    let gameTimeout: NodeJS.Timeout;

    if (canvasRef.current && !game) {
      const newGame = new Game(canvasRef.current, handleGameEnd);
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
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // ⏳ 60秒後にゲームを強制終了
      gameTimeout = setTimeout(() => {
        newGame.endGame();
      }, 60000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(gameTimeout);
    }; // クリーンアップ
  }, [game]);

  // ✅ ゲーム終了時の処理
  const handleGameEnd = (score: number) => {
    saveScore(score); // 自分のスコアを保存
    updateGlobalRanking(score); // 世界ランキング更新
    navigate("/record", { state: { score } }); // 記録画面へ遷移
  };

  // 💾 自分のスコアを保存 (直近20件)
  const saveScore = (score: number) => {
    let scores = JSON.parse(localStorage.getItem("myScores") || "[]");

    if (!Array.isArray(scores)) {
      scores = [];
    }

    scores.unshift(score);
    scores = scores.slice(0, 20); // 直近20件のみ保持

    localStorage.setItem("myScores", JSON.stringify(scores));
  };

  // 🌍 世界ランキングを更新 (トップ20)
  const updateGlobalRanking = (score: number) => {
    let globalScores = JSON.parse(localStorage.getItem("globalScores") || "[]");

    if (!Array.isArray(globalScores)) {
      globalScores = [];
    }

    globalScores.push(score);
    globalScores.sort((a: number, b: number) => b - a); // 高得点順にソート
    globalScores = globalScores.slice(0, 20); // トップ20のみ保持

    localStorage.setItem("globalScores", JSON.stringify(globalScores)); // 保存
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
