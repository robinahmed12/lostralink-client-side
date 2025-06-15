import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://lostra-link-server.vercel.app",
});

const useAxiosSecure = () => {
  const { users } = useAuth();

  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${users?.accessToken}`;
    return config;
  });

  return axiosInstance;
};

export default useAxiosSecure;
