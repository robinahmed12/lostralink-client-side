import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { users } = useContext(AuthContext);
  console.log(users);
  if(!users) {
    return <Navigate to={'/login'}></Navigate>
  }

  return children;
};

export default PrivateRoutes;
