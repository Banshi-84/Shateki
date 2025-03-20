import { useEffect, useRef, useState } from "react";
import { Game } from "./game/Game";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const newGame = new Game(canvasRef.current);
      setGame(newGame);

      const gameLoop = () => {
        newGame.update();
        requestAnimationFrame(gameLoop);
      };

      gameLoop();
    }
  }, []);

  return (
    <div>
      <h1>Shateki Game</h1>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
}

export default App;
