const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Mongoose Schema & Model for Scores
const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);

// API Route to Get Global Top 20 Scores
app.get("/api/global-top20", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(20);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch global scores" });
  }
});

// API Route to Save or Update User Score
app.post("/api/add-score", async (req, res) => {
  try {
    const { username, score } = req.body;

    // Validate the input
    if (!username || score === undefined) {
      return res.status(400).json({ error: "Username and score are required" });
    }

    // Check if the user already exists
    const existingScore = await Score.findOne({ username });

    if (existingScore) {
      // If user exists, only update the score if the new score is higher
      if (score > existingScore.score) {
        existingScore.score = score;
        await existingScore.save();
        return res.status(200).json({ message: "Score updated successfully" });
      } else {
        return res.status(400).json({ message: "New score is not higher" });
      }
    } else {
      // If the user doesn't exist, create a new score record
      const newScore = new Score({ username, score });
      await newScore.save();
      return res.status(201).json({ message: "Score saved successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
