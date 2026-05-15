import { useState } from "react";
import { FiEdit } from "react-icons/fi";

import EditProfile from "./EditProfile";

const Sidebar = ({
  users,
  selectedUser,
  setSelectedUser,
  typingUser,
}) => {

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [isOpen, setIsOpen] =
    useState(false);


  return (
    <div className="w-80 bg-base-100 border-r border-base-300 hidden md:flex flex-col">

      <div className="p-5 border-b border-base-300">

        <h1 className="text-3xl font-bold">
          Chats
        </h1>

      </div>


      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto">

        {users.map((user) => (

          <button
            key={user._id}
            onClick={() =>
              setSelectedUser(user)
            }
            className={`w-full p-4 flex items-center gap-4 hover:bg-base-200 transition ${
              selectedUser?._id === user._id
                ? "bg-green-50"
                : ""
            }`}
          >

            <img
              src={
                user.avatar ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="user"
              className="w-14 h-14 rounded-full object-cover"
            />


            <div className="text-left">

              <h2 className="font-semibold text-lg">
                {user.name}
              </h2>


              <p
                className={`text-sm ${
                  typingUser === user.name
                    ? "text-primary"
                    : "text-gray-500"
                }`}
              >

                {typingUser === user.name
                  ? "Typing..."
                  : user.email}

              </p>

            </div>

          </button>
        ))}

      </div>


      {/* CURRENT USER PROFILE */}
      <div className="p-3.5 border-t-2 border-gray-400">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="avatar online">

              <div className="w-12 rounded-full">

                <img
                  src={
                    currentUser?.avatar ||
                    "https://i.pravatar.cc/100"
                  }
                  alt="profile"
                />

              </div>

            </div>


            <div>

              <h2 className="font-semibold text-lg">
                {currentUser?.name}
              </h2>


              <p className="text-sm text-green-500 font-medium">

                Active Now

              </p>

            </div>

          </div>


          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost btn-circle"
          >

            <FiEdit size={20} />

          </button>

        </div>

      </div>


      {/* EDIT PROFILE MODAL */}
      <EditProfile
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

    </div>
  );
};

export default Sidebar;