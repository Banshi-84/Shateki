import { useEffect, useRef } from "react";
import { Game } from "./game/Game";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Game(canvasRef.current);
    }
  }, []);

  return (
    <div>
      <h1>Shateki Game</h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid black" }} />
    </div>
  );
}

export default App;
