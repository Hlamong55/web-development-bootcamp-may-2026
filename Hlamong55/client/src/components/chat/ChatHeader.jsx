const ChatHeader = () => {
  return (
    <div className="h-20 bg-base-100 border-b border-base-300 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-circle md:hidden">☰</button>

        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://i.pravatar.cc/100?img=2" />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Alex Johnson</h2>

          <p className="text-sm text-success">Online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
