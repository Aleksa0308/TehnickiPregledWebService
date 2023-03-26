import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
const SharedLayout = () => {
 
  return (
    <>
      <div className="flex flex-row ">
        <NavBar />
        <div className="ml-48">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SharedLayout;
