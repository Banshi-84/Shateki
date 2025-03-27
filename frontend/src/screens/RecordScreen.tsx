import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ScoreEntry = {
  username: string;
  score: number;
};

const RecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [globalScores, setGlobalScores] = useState<ScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Safely get and parse myScores from localStorage
  const getMyScores = (): number[] => {
    try {
      const scores = localStorage.getItem("myScores");
      return scores ? JSON.parse(scores) : [];
    } catch (err) {
      console.error("Error parsing myScores:", err);
      return [];
    }
  };

  const myScores = getMyScores();
  const topMyScores = [...myScores].sort((a, b) => b - a).slice(0, 20);

  useEffect(() => {
    const fetchGlobalScores = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/global-top20`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any required headers for CORS
            },
            // credentials: "include" // Uncomment if you need to send cookies
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ScoreEntry[] = await response.json();

        // Process scores to get unique usernames with their highest scores
        const uniqueScores = new Map<string, number>();
        data.forEach((entry) => {
          const currentScore = uniqueScores.get(entry.username) || 0;
          if (entry.score > currentScore) {
            uniqueScores.set(entry.username, entry.score);
          }
        });

        const uniqueGlobalScores = Array.from(uniqueScores, ([username, score]) => ({
          username,
          score,
        })).sort((a, b) => b.score - a.score);

        setGlobalScores(uniqueGlobalScores);
      } catch (err) {
        console.error("Error fetching global scores:", err);
        setError("Failed to load global scores. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobalScores();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px", padding: "20px" }}>
      <h2>📋 Score Record</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ minWidth: "250px" }}>
          <h3>🕓 Recent 20</h3>
          {myScores.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {myScores.map((score, index) => (
                <li key={index} style={{ margin: "8px 0" }}>
                  #{index + 1} - {score} pts
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent scores found</p>
          )}
        </div>

        <div style={{ minWidth: "250px" }}>
          <h3>🏆 My Top 20</h3>
          {topMyScores.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {topMyScores.map((score, index) => (
                <li key={index} style={{ margin: "8px 0" }}>
                  #{index + 1} - {score} pts
                </li>
              ))}
            </ul>
          ) : (
            <p>No top scores found</p>
          )}
        </div>

        <div style={{ minWidth: "250px" }}>
          <h3>🌐 Global Top 20</h3>
          {isLoading ? (
            <p>Loading global scores...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : globalScores.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {globalScores.slice(0, 20).map((entry, index) => (
                <li key={index} style={{ margin: "8px 0" }}>
                  #{index + 1} - {entry.username}: {entry.score} pts
                </li>
              ))}
            </ul>
          ) : (
            <p>No global scores available</p>
          )}
        </div>
      </div>

      <br />
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default RecordScreen;