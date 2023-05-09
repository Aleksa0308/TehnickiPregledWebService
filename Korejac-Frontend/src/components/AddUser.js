import React, { useEffect, useState } from "react";
import SingleUser from "./SingleUser";
import  Adresa  from "../ipadresa"

const AddUser = () => {
  const token = document.cookie;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const dodajUser = async () => {
    if (username !== "" && password !== "" && role !== "") {
      fetch(Adresa.adresa +  ":8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
          role: `${role}`,
        }),
      });
    }
  };

  const getUsers = async () => {
    const response = await fetch(
      Adresa.adresa + ":8080/api/user",
      requestOptions
    );
    const data = await response.json();
    const users = data.map((user) => {
      const { id, username, role } = user;
      return { id: id, username: username, role: role };
    });
    setUsers(users);
  };
  const deleteUser = (id, name) => {
    let ans = window.confirm(
      `Da li ste sigurni da zelite da obrisete ${name}?`
    );
    if (ans) {
      fetch( Adresa.adresa + `:8080/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        window.location.reload();
      });
    }
  };
  const updateUser = (id, username, password, role) => {
    if(username!== '' && role !== ''){
    fetch(Adresa.adresa + `:8080/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
        role: `${role}`
      }),
    }).then(() => {
      window.location.reload();
    });
  }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-4 bg-white rounded h-fit">
      <h1 className="font-bold text-xl">Dodaj Korisnika:</h1>
      <form onSubmit={dodajUser}>
        <div className="flex flex-col">
          <div className="flex flex-col my-5">
            <label>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 rounded p-2 focus:outline-none text-gray-600"
            />
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 rounded p-2 focus:outline-none text-gray-600"
            />
            <label>Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-100 rounded p-2 focus:outline-none text-gray-600"
            />
          </div>
          <div className="grid place-items-center ">
            <input
              type="submit"
              className=" cursor-pointer bg-blue-700 rounded text-white text-sm px-16 py-2 hover:bg-blue-600"
              value="+ Dodaj"
            />
          </div>
        </div>
      </form>
      <div className="mt-6">
        <h1 className="text-gray-500">Svi korisnici</h1>
        {users.map((user) => {
          return (
            <SingleUser
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              updateUser={updateUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddUser;
