// For Env Variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");

// Other middlewares
app.use(express.static(path.join(__dirname + "/public"))); // To join react app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing

app.get("/connected", (req, res) => {
  res.send({ status: "Successful" });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
