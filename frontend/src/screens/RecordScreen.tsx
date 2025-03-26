import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface UserData {
  username: string;
  highScore: number;
}

const RecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [globalScores, setGlobalScores] = useState<UserData[]>([]);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("highScore", "desc"), limit(20));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scores: UserData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        scores.push({
          username: doc.id,
          highScore: data.highScore
        });
      });
      setGlobalScores(scores);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>📋 Global Leaderboard</h2>

      <div style={{ maxWidth: "600px", margin: "30px auto" }}>
        <div>
          <h3>🌐 Top 20 Players</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {globalScores.map((userData, index) => (
              <li key={index} style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor: index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : index === 2 ? "#cd7f32" : "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                #{index + 1} - {userData.username} - {userData.highScore} pts
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button 
        onClick={() => navigate("/")} 
        style={{ 
          padding: "8px 16px", 
          borderRadius: "4px", 
          cursor: "pointer",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          fontSize: "16px"
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default RecordScreen;
