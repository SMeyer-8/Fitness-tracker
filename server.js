require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const server = express();

const PORT = 3000;

const app = express();

const client = require("./db/client");
client.connect();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

server.use(express.static(path.join(__dirname, "./client")));
// Routes
app.use("/api", require("./routes"));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});