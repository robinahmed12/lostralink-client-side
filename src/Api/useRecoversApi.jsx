import React, { useCallback } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useRecoversApi = () => {
  const axiosSecure = useAxiosSecure();

  const recoversItemApi = useCallback(
    async (email) => {
      try {
        const res = await axiosSecure.get(`/my-recoversItems?email=${email}`);
        return res.data;
      } catch (error) {
        console.error("Error in recoversItemApi:", error);
        throw error; // Re-throw the error for the component to handle
      }
    },
    [axiosSecure]
  );

  return {
    recoversItemApi,
  };
};

export default useRecoversApi;
