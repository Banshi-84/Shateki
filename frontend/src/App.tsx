
import { useEffect, useRef } from "react"; // UseEffect is to execute component's lifecycle
import { Player } from "./game/Player";
import "./App.css";// App's appearance changed by css

function App() {
  // it is a variable to access <canvas> by useRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  let player: Player | null = null;

  // contain of useEffect is executed onlly one time when it is showed 
  useEffect(() => {
    if (canvasRef.current) {
      player = new Player (canvasRef.current);

      // animetion loop
      const gameLoop = () => {
        if (player) {
          player.update(); // show bullet moving and drawing
        }
        requestAnimationFrame(gameLoop);
      };

      gameLoop();
    }
  }, []);// [] means only one time

  return (
    <div>
      <h1>Shateki Game</h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid black"}} />
    </div>
  );
}

export default App;// it makes other file can use this file