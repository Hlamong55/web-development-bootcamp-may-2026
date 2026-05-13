const MessageList = ({ messages }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, index) => {
        const isMyMessage = msg.senderId === currentUser?.id;

        return (
          <div
            key={index}
            className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble ${
                isMyMessage ? "chat-bubble-primary" : ""
              }`}
            >
              <p>{msg.text}</p>

              <span className="text-[10px] opacity-70 block mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
