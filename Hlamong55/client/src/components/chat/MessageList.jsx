import { useEffect, useRef } from "react";

const MessageList = ({ messages, typingUser }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingUser]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, index) => {
        const senderId = msg.senderId?._id || msg.senderId;

        const isMyMessage = senderId === (currentUser?._id || currentUser?.id);

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

              {/* SEEN STATUS */}
              {isMyMessage && msg.seen && (
                <p className="text-[11px] text-green-200 mt-1 text-right">
                  Seen
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* TYPING INDICATOR */}
      {typingUser && (
        <div className="chat chat-start">
          <div className="chat-bubble bg-base-300">
            <span className="loading loading-dots loading-sm"></span>
          </div>
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default MessageList;
