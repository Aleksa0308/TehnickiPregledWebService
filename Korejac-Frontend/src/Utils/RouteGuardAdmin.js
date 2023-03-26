import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
const token = document.cookie;

const RouteGuardAdmin = ({ component: Component, ...rest }) => {
  const myDecodedToken = decodeToken(token);

  const hasJWT = () => {
    let flag = false;
    if (myDecodedToken.role === 'admin') {
      flag = true;
    }else{
      flag = false
    }
    return flag;
  };

  return hasJWT() ? <Outlet /> : <Navigate to='/'/>
};

export default RouteGuardAdmin;
