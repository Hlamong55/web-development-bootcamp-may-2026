const Sidebar = ({
  users,
  selectedUser,
  setSelectedUser,
  typingUser,
}) => {
  return (
    <div className="w-80 bg-base-100 border-r border-base-300 hidden md:flex flex-col">
      <div className="p-5 border-b border-base-300">
        <h1 className="text-3xl font-bold">Chats</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-4 flex items-center gap-4 hover:bg-base-200 transition ${
              selectedUser?._id === user._id ? "bg-base-200" : ""
            }`}
          >
            <img
              src={user.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="user"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="text-left">
              <h2 className="font-semibold text-lg">{user.name}</h2>

              <p
                className={`text-sm ${
                  typingUser === user.name ? "text-primary" : "text-gray-500"
                }`}
              >
                {typingUser === user.name ? "Typing..." : user.email}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
