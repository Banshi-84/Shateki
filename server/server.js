const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup to allow requests from your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://shateki-front.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow credentials if needed (cookies, auth tokens)
}));

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define the schema for the Score model
const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
});

// Define the Score model
const Score = mongoose.model("Score", scoreSchema);

// Route to get the top 20 global scores
app.get("/api/global-top20", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(20);
    res.json(topScores);
  } catch (err) {
    console.error("Error fetching top scores:", err);  // Log the error
    res.status(500).json({ error: "Failed to fetch global scores" });
  }
});

// Route to add or update a score
app.post("/api/add-score", async (req, res) => {
  try {
    const { username, score } = req.body;
    
    // Log the received data for debugging
    console.log("Received username:", username);
    console.log("Received score:", score);

    // Validate input
    if (!username || score === undefined) {
      return res.status(400).json({ error: "Username and score are required" });
    }

    // Check if the user already has a score
    const existingScore = await Score.findOne({ username });

    // If the user already exists and the score is higher, update the score
    if (existingScore) {
      if (score > existingScore.score) {
        existingScore.score = score;
        await existingScore.save();
        return res.status(200).json({ message: "Score updated successfully" });
      } else {
        return res.status(400).json({ message: "New score is not higher", existingScore: existingScore.score });
      }
    } else {
      // If the user doesn't exist, create a new score
      const newScore = new Score({ username, score });
      await newScore.save();
      return res.status(201).json({ message: "Score saved successfully" });
    }
  } catch (err) {
    console.error("Error saving score:", err);  // Log the error
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Handle CORS preflight requests (OPTIONS)
app.options("*", cors()); // Allow all OPTIONS preflight requests

// Basic route to confirm server is running at /
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Export the app for Vercel serverless functions
module.exports = app;
