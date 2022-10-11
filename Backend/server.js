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
let options = null;
// {
//   options: [91, 23, 66, 42],
//   answers: { 91: 23, 23: 42, 66: 10, 42: 100 },
//   totalAnswers: 155,
//   isFullyAnswered: false,
//   percentage: { 91: 14.8, 23: 27.1, 66: 6.5, 42: 64.5 },
//   totalVote: 0,
//   nextQuestionQuee: 0,
// };

let questionOption = null;

//  {
//     question: "How many movies Shah Rukh Khan featured in?",
//     options: [91, 23, 66, 42],
//   };

// On new client connection

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  console.log(options);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  io.emit("getPoll", options);
  io.emit("updateQuestion", questionOption);
  io.emit("voteCompleted", false);

  socket.on("updateQuestionsAndOption", (questionVal, optionVal) => {
    questionOption = questionVal;
    options = optionVal;
    console.log("here");
    console.log(options);
    io.emit("getPoll", options);
    io.emit("updateQuestion", questionOption);
  });

  // On new user
  socket.on("started", () => {
    io.emit("getPoll", options);
    io.emit("updateQuestion", questionOption);
  });
  // On new vote
  socket.on("updatePoll", (option) => {
    // Increase the vote at index
    options["answers"][option] += 1;

    options["totalVote"] += 1;
    options["totalAnswers"] += 1;
    // for (let i = 0; i < options.options.length; i++) {
    //   const val = options.options[i];
    //   options["percentage"][val] =
    //     (options.answers[val] / options.totalAnswers) * 100;
    // }

    console.log("/////////////////////////////////////////");
    console.log(options["totalVote"], io.engine.clientsCount - 1);

    if (options["totalVote"] === io.engine.clientsCount - 1) {
      // Emit voteComplete if all students voted

      questionOption = null;

      io.emit("voteCompleted", true);
      io.emit("updateQuestion", questionOption);
    }

    io.emit("getPoll", options);
  });

  socket.on("queeNext", () => {
    options.nextQuestionQuee += 1;
    if (options.nextQuestionQuee === io.engine.clientsCount - 1) {
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
