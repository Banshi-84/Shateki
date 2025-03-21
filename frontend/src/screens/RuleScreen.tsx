import React from "react";
import { useNavigate } from "react-router-dom";

// 📖 ルール画面
const RuleScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>📖 Game Rules</h2>
      <p>1. Aim to targets</p>
      <p>2. Each target has a point</p>
      <p>3. Click to shoot</p>
      <p>4. Score as many points as you can in 1 minute!</p>

      <h3>🎯 Target Points:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🐻 Bear Doll - 50 pts</li>
        <li>🎈 Yo-yo - 10 pts</li>
        <li>🍬 Candy - 5 pts</li>
        <li>🍟 Chips - 20 pts</li>
        <li>❓ Mystery Box - 0~40 pts</li>
        <li>☕ Coffee - 30 pts</li>
      </ul>

      <button onClick={() => navigate("/")}>← Back to Home</button>
    </div>
  );
};

export default RuleScreen;
