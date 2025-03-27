const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://shateki-front.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow credentials if needed (cookies, auth tokens)
}));

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define the schema and model
const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);

// Route to get the top 20 global scores
app.get("/api/global-top20", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(20);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch global scores" });
  }
});

// Route to add a score
app.post("/api/add-score", async (req, res) => {
  try {
    const { username, score } = req.body;

    if (!username || score === undefined) {
      return res.status(400).json({ error: "Username and score are required" });
    }

    const existingScore = await Score.findOne({ username });

    if (existingScore) {
      if (score > existingScore.score) {
        existingScore.score = score;
        await existingScore.save();
        return res.status(200).json({ message: "Score updated successfully" });
      } else {
        return res.status(400).json({ message: "New score is not higher" });
      }
    } else {
      const newScore = new Score({ username, score });
      await newScore.save();
      return res.status(201).json({ message: "Score saved successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Respond to preflight requests (OPTIONS)
app.options("*", cors()); // Allow all OPTIONS preflight requests

// Simple route to check server is running
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
