const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);


app.get("/api/global-top20", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(20);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch global scores" });
  }
});

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

app.get("/", (req, res) => {
  res.send("Backend is running...");
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
