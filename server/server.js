const express = require("express");
const cors = require("cors");

const gameRoutes = require("./routes/gameRoutes");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const PORT = 3000;

app.use(cors());
app.use(express.json());



app.use("/api", gameRoutes);

io.on("connection", (socket) => {
  console.log("A player connected: " + socket.id);

  socket.on("shoot", (data) => {
    io.emit("update", data); 
  });

  socket.on("disconnect", () => {
    console.log("A player disconnected: " + socket.id);
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
