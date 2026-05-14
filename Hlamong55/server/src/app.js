const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const messageRoutes = require("./routes/messageRoutes");

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

module.exports = app;