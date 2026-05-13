import { useEffect, useState } from "react";

import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

import socket from "../socket/socket";

const Chat = () => {

  const [messages, setMessages] = useState([]);


  // RECEIVE MESSAGE
  useEffect(() => {

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);
    });


    return () => {
      socket.off("receive_message");
    };

  }, []);


  // SEND MESSAGE
  const handleSendMessage = (messageText) => {

    if (!messageText.trim()) return;


    const user = JSON.parse(
      localStorage.getItem("user")
    );


    const messageData = {
      text: messageText,
      senderId: user?.id,
      senderName: user?.name,
      senderEmail: user?.email,
      time: new Date().toLocaleTimeString(),
    };


    socket.emit("send_message", messageData);
  };


  return (
    <div className="h-screen bg-base-200 flex overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />


      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        <ChatHeader />


        {/* MESSAGE LIST */}
        <MessageList messages={messages} />


        {/* MESSAGE INPUT */}
        <MessageInput
          onSendMessage={handleSendMessage}
        />

      </div>

    </div>
  );
};

export default Chat;