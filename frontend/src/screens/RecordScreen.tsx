import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [globalScores, setGlobalScores] = useState<{ username: string, score: number }[]>([]);

  const myScores: number[] = JSON.parse(localStorage.getItem("myScores") || "[]");

  const topMyScores = [...myScores].sort((a, b) => b - a).slice(0, 20);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/global-top20`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueScores = new Map<string, number>();

        data.forEach((entry: { username: string, score: number }) => {
          if (uniqueScores.has(entry.username)) {

            uniqueScores.set(entry.username, Math.max(uniqueScores.get(entry.username)!, entry.score));
          } else {
            uniqueScores.set(entry.username, entry.score);
          }
        });

        const uniqueGlobalScores = Array.from(uniqueScores, ([username, score]) => ({ username, score }));

        setGlobalScores(uniqueGlobalScores.sort((a, b) => b.score - a.score));
      })
      .catch((err) => console.error("Error fetching global scores:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>📋 Score Record</h2>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        
        <div>
          <h3>🕓 Recent 20</h3>
          <ul>
            {myScores.map((score, index) => (
              <li key={index}>#{index + 1} - {score} pts</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>🏆 My Top 20</h3>
          <ul>
            {topMyScores.map((score, index) => (
              <li key={index}>#{index + 1} - {score} pts</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>🌐 Global Top 20</h3>
          <ul>
            {globalScores.map((entry, index) => (
              <li key={index}>
                #{index + 1} - {entry.username}: {entry.score} pts
              </li>
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
