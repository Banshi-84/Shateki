import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserExists, createUser } from "../services/userService";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [showUsernameInput, setShowUsernameInput] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setShowUsernameInput(false);
    }
  }, []);

  const handleUsernameSubmit = async () => {
    if (!username.trim()) return;
    
    try {
      const exists = await checkUserExists(username.trim());
      if (!exists) {
        await createUser(username.trim());
      }
      localStorage.setItem("username", username.trim());
      setShowUsernameInput(false);
      setError("");
    } catch (err) {
      setError("Error checking username. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Shateki Game</h1>
      {showUsernameInput ? (
        <div style={{ margin: "20px" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button
            onClick={handleUsernameSubmit}
            style={{ padding: "5px 10px" }}
          >
            Save Username
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/game")} style={{ margin: "10px" }}>Play</button>
          <button onClick={() => navigate("/record")} style={{ margin: "10px" }}>Record</button>
          <button onClick={() => navigate("/rule")} style={{ margin: "10px" }}>Rule</button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
