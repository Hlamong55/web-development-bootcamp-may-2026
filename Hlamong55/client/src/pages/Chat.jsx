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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (!selectedUser) return;

        const response = await axiosInstance.get(
          `/messages?senderId=${currentUser.id}&receiverId=${selectedUser._id}`,
        );

        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online_users");
    };
  }, []);

  useEffect(() => {
  socket.on("typing", (userName) => {
    setTypingUser(userName);
  });

  socket.on("stop_typing", () => {
    setTypingUser(null);
  });

  return () => {
    socket.off("typing");
    socket.off("stop_typing");
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
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        typingUser={typingUser}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          selectedUser={selectedUser}
          onlineUsers={onlineUsers}
        />

        <MessageList
          messages={messages.filter((msg) => {
            const senderId = msg.senderId?._id || msg.senderId;

            const receiverId = msg.receiverId?._id || msg.receiverId;

            return (
              senderId === selectedUser?._id || receiverId === selectedUser?._id
            );
          })}
          typingUser={typingUser}
        />

        <MessageInput
          onSendMessage={handleSendMessage}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default Chat;
