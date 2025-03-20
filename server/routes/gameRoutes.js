const express = require("express");
const router = express.Router();

let leaderboard = [];

// A route to test the API or get a message
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Shateki Game API!" });
});

// Route to add a player's score
router.post("/add-score", (req, res) => {
  const { username, score } = req.body;
  leaderboard.push({ username, score });
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json({ message: "Score added!", leaderboard });
});

// Route to get the leaderboard
router.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

module.exports = router;
