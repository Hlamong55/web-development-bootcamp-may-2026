import { useEffect, useState } from "react";

import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

import socket from "../socket/socket";
import axiosInstance from "../lib/axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/users");

        const currentUser = JSON.parse(localStorage.getItem("user"));

        const filteredUsers = response.data.users.filter(
          (user) => user._id !== currentUser.id,
        );

        setUsers(filteredUsers);

        if (filteredUsers.length > 0) {
          setSelectedUser(filteredUsers[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);



  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser?.id) {
      socket.emit("join", currentUser.id);
    }
  }, []);



  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const messageData = {
      text: messageText,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: selectedUser?._id,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", messageData);
  };


  
  return (
    <div className="h-screen bg-base-200 flex overflow-hidden">
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader selectedUser={selectedUser} />

        <MessageList
          messages={messages.filter(
            (msg) =>
              msg.senderId === selectedUser?._id ||
              msg.receiverId === selectedUser?._id,
          )}
        />

        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
