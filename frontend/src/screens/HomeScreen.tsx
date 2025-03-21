import React from "react";
import { useNavigate } from "react-router-dom";

// 🏠 ホーム画面（メニュー画面）
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Shateki Game</h1>
      <button onClick={() => navigate("/game")} style={{ margin: "10px" }}>Play</button>
      <button onClick={() => navigate("/record")} style={{ margin: "10px" }}>Record</button>
      <button onClick={() => navigate("/rule")} style={{ margin: "10px" }}>Rule</button>
    </div>
  );
};

export default HomeScreen;
