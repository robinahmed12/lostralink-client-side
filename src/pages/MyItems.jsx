import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ItemsTable from './ItemsTable';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { users } = useContext(AuthContext);

  useEffect(() => {
    if (users?.email) {
      fetch(`http://localhost:3000/my-Items?email=${users.email}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [users?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4A261]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#3E2F1C] mb-8">My Posted Items</h1>
      
      {items.length === 0 ? (
        <div className="bg-[#F0EAD6] rounded-lg p-8 text-center">
          <p className="text-xl text-[#3E2F1C]">You haven't posted any items yet.</p>
          <p className="text-[#9A8C7A] mt-2">When you post lost or found items, they will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#F0EAD6] rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-[#9A8C7A]/20">
            <thead className="bg-[#F4A261]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#F0EAD6] divide-y divide-[#9A8C7A]/20">
              {items.map((item) => (
                <ItemsTable key={item._id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyItems;