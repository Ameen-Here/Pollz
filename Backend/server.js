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
const defaultOption = {
  options: [],
  answers: {},
  totalAnswers: 0,
  percentage: {},
  totalVote: 0,
  nextQuestionQuee: 0,
};
let options = {
  options: [91, 23, 66, 42],
  answers: { 91: 23, 23: 42, 66: 10, 42: 100 },
  totalAnswers: 155,
  isFullyAnswered: false,
  percentage: { 91: 14.8, 23: 27.1, 66: 6.5, 42: 64.5 },
  totalVote: 0,
  nextQuestionQuee: 0,
};

let questionOption = {
  question: "How many movies Shah Rukh Khan featured in?",
  options: [91, 23, 66, 42],
};

//  {
//     question: "How many movies Shah Rukh Khan featured in?",
//     options: [91, 23, 66, 42],
//   };

// On new client connection

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  io.emit("getPoll", options);
  io.emit("updateQuestion", questionOption);
  io.emit("voteCompleted", false);

  // On new user
  socket.on("name", (name) => {
    options["name"] = name;
  });
  socket.on("started", () => {
    io.emit("getPoll", options);
    io.emit("updateQuestion", questionOption);
  });
  // On new vote
  socket.on("updatePoll", (option) => {
    // Increase the vote at index
    console.log(option);
    console.log(options["answers"][option]);
    if (options["answers"][option]) {
      options["answers"][option] += 1;
    }
    options["totalVote"] += 1;
    options["totalAnswers"] += 1;
    options["percentage"][option] =
      (options.answers[option] / options.totalAnswers) * 100;

    console.log("////////");
    console.log(options["totalVote"], io.engine.clientsCount);
    if (options["totalVote"] === io.engine.clientsCount) {
      // Emit voteComplete if all students voted
      console.log("here");
      questionOption = null;

      io.emit("voteCompleted", true);
      io.emit("updateQuestion", questionOption);
    }

    io.emit("getPoll", options);
  });
  socket.on("queeNext", () => {
    options.nextQuestionQuee += 1;
    if (options.nextQuestionQuee === io.engine.clientsCount) {
      options = defaultOption;
      io.emit("getPoll", options);
    }
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
