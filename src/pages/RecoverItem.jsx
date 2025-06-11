import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import RecoverTable from './Home/RecoverTable';

const RecoverItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { users } = useContext(AuthContext);

  useEffect(() => {
    if (users?.email) {
      setLoading(true);
      fetch(`http://localhost:3000/my-recoversItems?email=${users.email}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [users?.email]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-[#F4A261] rounded-full mb-4"></div>
          <p className="text-[#3E2F1C]">Loading your recovered items...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <svg className="w-20 h-20 mx-auto text-[#9A8C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-4 text-xl font-medium text-[#3E2F1C]">No Recovered Items Found</h3>
          <p className="mt-2 text-[#9A8C7A]">
            You haven't recovered any items yet. When you do, they'll appear here.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#F4A261] text-[#3E2F1C] rounded-md hover:bg-[#E76F51] hover:text-white transition-colors duration-200">
            Browse Found Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#3E2F1C] mb-2">Your Recovered Items</h2>
        <p className="text-[#9A8C7A]">Items you've successfully recovered through our platform</p>
      </div>
      
      <div className="space-y-6">
        {items.map((item) => (
          <RecoverTable key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecoverItem;