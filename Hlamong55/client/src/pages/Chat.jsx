import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

const Chat = () => {
  return (
    <div className="h-screen bg-base-200 flex overflow-hidden">
      
      <Sidebar />

      {/* chatting part */}
      <div className="flex-1 flex flex-col">

        <ChatHeader />

        <MessageList />

        <MessageInput />

      </div>
    </div>
  );
};

export default Chat;