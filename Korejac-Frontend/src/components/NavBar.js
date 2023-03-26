import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiCollection,
  HiChartBar,
  HiUser,
  HiLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { decodeToken } from "react-jwt";
import Logo from "../Assets/Logo-25cm.svg"
const token = document.cookie;

const NavBar = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const myDecodedToken = decodeToken(token);

  const getUser = () => {
    setRole(myDecodedToken.role);
    setUsername(myDecodedToken.user);
  };

  useEffect(() => {
    getUser();
  },);

  const logout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.replace("/login");
  };

  return (
    <nav className="p-8 bg-white w-60 h-screen fixed top-0 left-0">
      <div className="flex flex-col items-center">
        <a href="/" className="hover:cursor-pointer mb-2">
         <img src={Logo} alt="Logo" className="w-28" />
        </a>
        <h1 className="text-blue-700 font-bold text-3xl self-center">
          PREGLED+
        </h1>
        <ul className="py-6">
          <li>
            <NavLink
              to="/evidencija"
              className={({ isActive }) =>
                isActive ? "text-blue-700" : undefined
              }
            >
              <div className="inline-flex items-center py-2 hover:text-blue-700">
                <HiCollection size={20} />
                <h2 className="px-3 text-md">Evidencija</h2>
              </div>
            </NavLink>
          </li>
          <li>
            {role === "admin" ? (
              <NavLink
                to="/statistika"
                className={({ isActive }) =>
                  isActive ? "text-blue-700" : undefined
                }
              >
                <div className="inline-flex items-center py-2 hover:text-blue-700">
                  <HiChartBar size={20} />
                  <h2 className="px-3 text-md">Statistika</h2>
                </div>
              </NavLink>
            ) : null}
          </li>
          <li>
            {role === "admin" ? (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "text-blue-700" : undefined
                }
              >
                <div className="inline-flex items-center py-2 hover:text-blue-700">
                  <HiUser size={20} />
                  <h2 className="px-3 text-md">Admin</h2>
                </div>
              </NavLink>
            ) : null}
          </li>
          <li>
            <div className="inline-flex items-center w-fit p-2 px-10 left-6 absolute inset-x-0 bottom-14">
              <HiOutlineUserCircle size={20} />
              <h1 className="pl-2">{username}</h1>
            </div>
            <div
              onClick={logout}
              className="inline-flex items-center px-16 py-6 absolute inset-x-0 bottom-0 hover:cursor-pointer hover:text-blue-700"
            >
              <HiLogout size={20} />
              <h2 className="px-3 text-md">Log Out</h2>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
