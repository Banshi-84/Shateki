import { useEffect, useRef, useState } from "react";
import { Game } from "./game/Game";
import axios from "axios";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      new Game(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/leaderboard")
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div>
      <h1>Shateki Game </h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid black" }} />
      <h2> Leaderboard</h2>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={index}>{player.username}: {player.score} pts</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
