import React, { useState } from "react";
import { HiOutlineTrash, HiDocument, HiOutlinePencil } from "react-icons/hi";

const SingleUser = ({ user, deleteUser, updateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role);

  return (
    <div className="my-4 border p-4">
      <form className="flex flex-col">
        <label>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-100 rounded p-1"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100  rounded p-1"
        />
        <label>Role:</label>
        <input
          type="text"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-100  rounded p-1"
        />
      </form>
      <div className="px-14 mt-5">
        <button
          onClick={() => {
            deleteUser(user.id, user.username);
          }}
          className=" xl:py-2 xl:px-3 lg:py-2 lg:px-4 mr-2 bg-pink-600 hover:bg-pink-500 text-white rounded"
        >
          <HiOutlineTrash />
        </button>
        <button
          onClick={() => {
            updateUser(user.id, username, password, role);
          }}
          className="xl:py-2 xl:px-3 lg:py-2 lg:px-4 bg-blue-300 hover:bg-blue-200 text-white rounded"
        >
          <HiOutlinePencil />
        </button>
      </div>
    </div>
  );
};

export default SingleUser;
