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

// Other middlewares
app.use(express.static(path.join(__dirname + "/public"))); // To join react app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = require("socket.io")(
  server,

  {
    cors: {
      origin: ["http://localhost:3000"],
    },
  }
);

// Initialize options

let options = null;

let questionOption = null;

// On new client connection

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  socket.on("updateQuestionsAndOption", (questionVal, optionVal) => {
    questionOption = questionVal;
    options = optionVal;
    io.emit("getPoll", options);
    io.emit("updateQuestion", questionOption);
  });

  // On new user
  socket.on("started", () => {
    io.emit("getPoll", options);
    io.emit("updateQuestion", questionOption);
    io.emit("voteCompleted", false);
  });

  // On new vote
  socket.on("updatePoll", (option) => {
    // Increase the vote at index
    options["answers"][option] += 1;

    options["totalVote"] += 1;
    options["totalAnswers"] += 1;

    // Updating percentage value
    for (let i = 0; i < options.options.length; i++) {
      const val = options.options[i];
      options["percentage"][val] =
        (options.answers[val] / options.totalAnswers) * 100;
    }

    if (options["totalVote"] >= io.engine.clientsCount - 1) {
      // Emit voteComplete if all students voted
      questionOption = null;
      io.emit("updateQuestion", questionOption);

      io.emit("voteCompleted", true);
      io.emit("queeCompleted", false);
    }

    io.emit("getPoll", options);
  });

  socket.on("queeNext", () => {
    options.nextQuestionQuee += 1;
    if (options.nextQuestionQuee === options.totalAnswers) {
      io.emit("queeCompleted", true);

      options = null;

      io.emit("getPoll", options);
      io.emit("voteCompleted", false);
    }
  });
});

// Routing

app.get("/connected", (req, res) => {
  res.send({ status: "Successful" });
});
