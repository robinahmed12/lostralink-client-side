import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAxiosSecure = () => {
  const { users } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${users?.accessToken}`;

    return config
  });
  return axiosInstance;
};

export default useAxiosSecure;
