const MessageInput = () => {
  return (
    <div className="p-4 bg-base-100 border-t border-base-300">
      
      <form className="flex items-center gap-3">
        
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 rounded-xl"
        />

        <button className="btn btn-primary rounded-xl">
          Send
        </button>

      </form>

    </div>
  );
};

export default MessageInput;