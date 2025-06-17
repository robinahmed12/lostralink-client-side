import React, { useCallback } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const useMyItemApi = () => {
   const axiosSecure = useAxiosSecure();

  const myItemsApi = useCallback(
    async (email) => {
      try {
        const res = await axiosSecure.get(`/my-Items?email=${email}`);
        return res.data;
      } catch (error) {
        console.error("Error in recoversItemApi:", error);
        throw error; 
      }
    },
    [axiosSecure]
  );

  return {
    myItemsApi
  };
};

export default useMyItemApi;