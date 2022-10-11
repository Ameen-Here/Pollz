// For Env Variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");

// Import HTTP and CORS to allow data transfer
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// Initialize options
const options = {};

// On new client connextion
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  io.emit("update", options);
  io.emit("voteCompleted", false);

  // On new vote
  socket.on("vote", (index) => {
    // Increase the vote at index
    if (candidate[index]) {
      candidate[index].vote += 1;
    }
    if (candidate[totalVote] === io.engine.clientsCount - 1) {
      // Emit voteComplete if all students voted
      io.emit("voteCompleted", true);
    }
    io.emit("update", options);
  });
});

// Other middlewares
app.use(express.static(path.join(__dirname + "/public"))); // To join react app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing

app.get("/connected", (req, res) => {
  res.send({ status: "Successful" });
});
