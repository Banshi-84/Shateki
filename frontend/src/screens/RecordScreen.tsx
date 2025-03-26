import React from "react";
import { useNavigate } from "react-router-dom";


const RecordScreen: React.FC = () => {
  const navigate = useNavigate();

  const myScores: number[] = JSON.parse(localStorage.getItem("myScores") || "[]");

  const topMyScores = [...myScores].sort((a, b) => b - a).slice(0, 20);

  const otherScores = Array.from({ length: 20 }, () => Math.floor(Math.random() * 201)).sort((a, b) => b - a);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>📋 Score Record</h2>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        {/* Recent Scores */}
        <div>
          <h3>🕓 Recent 20</h3>
          <ul>
            {myScores.map((score, index) => (
              <li key={index}>#{index + 1} - {score} pts</li>
            ))}
          </ul>
        </div>

        {/* My Top 20 */}
        <div>
          <h3>🏆 My Top 20</h3>
          <ul>
            {topMyScores.map((score, index) => (
              <li key={index}>#{index + 1} - {score} pts</li>
            ))}
          </ul>
        </div>

        {/* Other Players */}
        <div>
          <h3>🌐 Global Top 20</h3>
          <ul>
            {otherScores.map((score, index) => (
              <li key={index}>#{index + 1} - {score} pts</li>
            ))}
          </ul>
        </div>
      </div>

      <br />
      <button onClick={() => navigate("/")}>← Back to Home</button>
    </div>
  );
};

export default RecordScreen;
