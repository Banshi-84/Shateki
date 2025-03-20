const db = require("../config/database");

// Simulates shooting a prize and returns a score
const shootPrize = async (req, res) => {
  const { playerId, username } = req.body;
  
  if (!playerId || !username) {
    return res.status(400).json({ error: "Player ID and username are required." });
  }

  // Simulate scoring (random value between 10-50)
  const score = Math.floor(Math.random() * 41) + 10;

  const playerRef = db.ref("players/" + playerId);
  const snapshot = await playerRef.get();

  if (snapshot.exists()) {
    const playerData = snapshot.val();
    await playerRef.update({ score: playerData.score + score });
  } else {
    await playerRef.set({ username, score });
  }

  return res.json({ message: "Shot registered!", playerId, username, score });
};

// Get top players for the leaderboard
const getLeaderboard = async (req, res) => {
  const leaderboardRef = db.ref("players").orderByChild("score").limitToLast(10);
  const snapshot = await leaderboardRef.get();

  if (!snapshot.exists()) {
    return res.json({ leaderboard: [] });
  }

  const leaderboard = [];
  snapshot.forEach((childSnapshot) => {
    leaderboard.push({ playerId: childSnapshot.key, ...childSnapshot.val() });
  });

  leaderboard.sort((a, b) => b.score - a.score); // Sort in descending order

  return res.json({ leaderboard });
};

module.exports = { shootPrize, getLeaderboard };
