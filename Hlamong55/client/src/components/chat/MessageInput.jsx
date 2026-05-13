import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSendMessage(message);
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
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="btn btn-primary rounded-xl px-8">Send</button>
    </form>
  );
};

export default MessageInput;
