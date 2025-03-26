import React, { useEffect, useRef, useState } from "react";
import { Game } from "../game/Game";
import { useNavigate } from "react-router-dom";

// Game screen
const GameScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // left time
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let gameTimeout: NodeJS.Timeout;

    if (canvasRef.current && !game) {
      const newGame = new Game(canvasRef.current, handleGameEnd);
      setGame(newGame);

      // game loop
      const loop = () => {
        newGame.update();
        requestAnimationFrame(loop);
      };
      loop();

      // count down
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // complete game
      gameTimeout = setTimeout(() => {
        newGame.endGame();
      }, 60000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(gameTimeout);
    }; // cleanup
  }, [game]);

  const handleGameEnd = (score: number) => {
    saveScore(score); // myscore
    updateGlobalRanking(score); // ranking foor world
    navigate("/record", { state: { score } }); // move screen
  };

  // my screen latest 20
  const saveScore = (score: number) => {
    let scores = JSON.parse(localStorage.getItem("myScores") || "[]");

    if (!Array.isArray(scores)) {
      scores = [];
    }

    scores.unshift(score);
    scores = scores.slice(0, 20); // latest 20

    localStorage.setItem("myScores", JSON.stringify(scores));
  };

  // world ranking
  const updateGlobalRanking = (score: number) => {
    let globalScores = JSON.parse(localStorage.getItem("globalScores") || "[]");

    if (!Array.isArray(globalScores)) {
      globalScores = [];
    }

    globalScores.push(score);
    globalScores.sort((a: number, b: number) => b - a);
    globalScores = globalScores.slice(0, 20); // top20

    localStorage.setItem("globalScores", JSON.stringify(globalScores));
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
