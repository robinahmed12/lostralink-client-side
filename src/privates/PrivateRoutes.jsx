import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const PrivateRoutes = ({ children }) => {
  const {users , loading} = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loader/>
    }


    if (!users) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }


  return children;
};

export default PrivateRoutes;
