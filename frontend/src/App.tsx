import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import RecordScreen from "./screens/RecordScreen";
import RuleScreen from "./screens/RuleScreen";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/record" element={<RecordScreen />} />
        <Route path="/rule" element={<RuleScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
