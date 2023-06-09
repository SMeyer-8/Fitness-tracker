require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const PORT = 3000;

const client = require("./db/client");
client.connect();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client")));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/api", require("./routes"));

const { authRequired } = require("./routes/utils");
app.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized!");
});

app.use((err, req, res, next) => {
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

// Serve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});