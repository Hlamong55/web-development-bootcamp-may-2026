import { RiLogoutCircleRLine } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className="h-18 bg-base-100 border-b border-base-300 px-5 flex items-center justify-between">
      <div className="flex items-center">
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

      <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
          }}
          className="btn btn-sm bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition rounded-lg"
        >
          Logout <RiLogoutCircleRLine size={18} />
        </button>
    </div>
  );
};

export default ChatHeader;
