const Sidebar = () => {
  return (
    <div className="w-80 bg-base-100 border-r border-base-300 hidden md:flex flex-col">
      
      <div className="p-5 border-b border-base-300">
        <h1 className="text-2xl font-bold">
          Chats
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">

        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-base-200 cursor-pointer transition">
          
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://i.pravatar.cc/100?img=1" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold">
              Alex Johnson
            </h3>

            <p className="text-sm text-base-content/60">
              Hey! How are you?
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;