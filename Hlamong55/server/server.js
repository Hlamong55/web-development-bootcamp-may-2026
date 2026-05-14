require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);




// socket
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});


const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("Online Users:", onlineUsers);
  });


  // PRIVATE MESSAGE
  socket.on("send_message", (messageData) => {
    console.log(messageData);


    const receiverSocketId =
      onlineUsers[messageData.receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "receive_message",
        messageData
      );
    }


    socket.emit(
      "receive_message",
      messageData
    );
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);


    for (const userId in onlineUsers) {

      if (
        onlineUsers[userId] === socket.id
      ) {

        delete onlineUsers[userId];
      }
    }
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});