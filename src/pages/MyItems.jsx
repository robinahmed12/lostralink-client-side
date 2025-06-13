import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ItemsTable from './ItemsTable';
import useMyItemApi from '../Api/useMyItemApi';
import Loader from '../components/Loader';
import { Link } from 'react-router';


const MyItems = () => {
  const [items, setItems] = useState([]);
  const { users , loading } = useContext(AuthContext);
  const {myItemsApi} = useMyItemApi()



 useEffect(() => {
     if (users?.email) {
       myItemsApi(users?.email)
         .then((data) => {
           setItems(data || []);
         })
         .catch((error) => {
           console.error("Error fetching items:", error);
           setItems([]);
         });
     }
   }, [myItemsApi, users?.email]);

    if(loading) {
    return <Loader/>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#3E2F1C] mb-8">My Posted Items</h1>
      
      {items.length === 0 ? (
        <div className="bg-[#F0EAD6] rounded-lg p-8 text-center">
          <p className="text-xl text-[#3E2F1C]">You haven't posted any items yet.</p>
          <p className="text-[#9A8C7A] mt-2">When you post lost or found items, they will appear here.</p>
         <button  className='mt-3 bg-teal-500 hover:bg-[#E76F51] text-gray-900 font-semibold rounded-2xl px-6 py-2'>
           <Link to={"/add-item"}>Post Your Items</Link>
         </button>
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
                <ItemsTable key={item._id} item={item} setItems={setItems}  />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyItems;