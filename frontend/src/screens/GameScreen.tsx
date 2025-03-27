import React, { useEffect, useRef, useState } from "react";
import { Game } from "../game/Game";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";


type ScoreResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

const GameScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [username, setUsername] = useState(""); 
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const navigate = useNavigate(); 
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
      setError("")
    }
    else{
      setError("Enter a valid username")
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let gameTimeout: NodeJS.Timeout;

    if (canvasRef.current && !game && isUsernameSet) {
      const newGame = new Game(canvasRef.current, handleGameEnd);
      setGame(newGame);

  
      const loop = () => {
        newGame.update();
        requestAnimationFrame(loop);
      };
      loop();

     
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      gameTimeout = setTimeout(() => {
        newGame.endGame();
      }, 60000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(gameTimeout);
    }; 
  }, [game, isUsernameSet]);

  const handleGameEnd = (score: number) => {
    saveScore(score); 
    updateGlobalRanking(username, score); 
    navigate("/record", { state: { score } }); 
  };

 
  const saveScore = (score: number) => {
    let scores = JSON.parse(localStorage.getItem("myScores") || "[]");

    if (!Array.isArray(scores)) {
      scores = [];
    }

    scores.unshift(score);
    scores = scores.slice(0, 20); 
    localStorage.setItem("myScores", JSON.stringify(scores));
  };

  const updateGlobalRanking = async (username: string, score: number) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/add-score`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Add any required headers for your backend
        },
        body: JSON.stringify({ username, score }),
        credentials: "include", // Only if you need to send cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ScoreResponse = await response.json();
      console.log("Global ranking updated:", data);
    } catch (err) {
      console.error("Error updating global ranking:", err);
      // Optionally show error to user or retry logic
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isUsernameSet) {
    return (
      
      <div style={{ textAlign: "center" }}>
        <h2 style={{fontSize:40}}><Typewriter words={["Enter Your Username"]} typeSpeed={100} /></h2>
        <input
          type="text"
          placeholder="Enter a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <br />
        <button onClick={handleUsernameSubmit} style={{ marginTop: "20px" }}>
          Start Game
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>} 
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.7)"}}>
            <Typewriter
                words={["Shateki Game"]}
                typeSpeed={100}
                cursor
              />
            </h1>
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
