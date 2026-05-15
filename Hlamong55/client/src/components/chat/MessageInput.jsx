import { useState } from "react";
import socket from "../../socket/socket";

const MessageInput = ({ onSendMessage, selectedUser }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSendMessage(message);
    socket.emit("stop_typing", {
      receiverId: selectedUser?._id,
    });
    setMessage("");
  };


  
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-base-300 bg-base-100 flex gap-3"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="input input-bordered flex-1 rounded-xl"
        value={message}
        onChange={(e) => {
          const value = e.target.value;

          setMessage(value);

          const currentUser = JSON.parse(localStorage.getItem("user"));

          if (value.trim()) {
            socket.emit("typing", {
              receiverId: selectedUser?._id,
              senderName: currentUser.name,
            });
          } else {
            socket.emit("stop_typing", {
              receiverId: selectedUser?._id,
            });
          }
        }}
      />

      <button className="btn btn-primary rounded-xl px-8">Send</button>
    </form>
  );
};

export default MessageInput;
