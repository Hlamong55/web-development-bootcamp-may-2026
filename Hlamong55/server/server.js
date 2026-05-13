require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io")

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);


// Socket
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("send_message", (messageData) => {
    console.log(messageData);

    io.emit("receive_message", messageData);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});