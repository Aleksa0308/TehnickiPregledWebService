import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
const token = document.cookie;

const RouteGuard = ({ component: Component, ...rest }) => {
  const hasJWT = () => {
    let flag = false;
    if (token) {
      flag = true;
    }else{
      flag = false
    }
    return flag;
  };

  return hasJWT() ? <Outlet /> : <Navigate to='/login'/>
};

export default RouteGuard;
