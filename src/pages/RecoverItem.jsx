import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const RecoverItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("card"); // 'card' or 'table'
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

  const toggleLayout = () => {
    setLayout(layout === "card" ? "table" : "card");
  };

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
          <svg
            className="w-20 h-20 mx-auto text-[#9A8C7A]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mt-4 text-xl font-medium text-[#3E2F1C]">
            No Recovered Items Found
          </h3>
          <p className="mt-2 text-[#9A8C7A]">
            You haven't recovered any items yet. When you do, they'll appear
            here.
          </p>
          <Link
            to="/found-items"
            className="mt-6 inline-block px-6 py-2 bg-[#F4A261] text-[#3E2F1C] rounded-md hover:bg-[#E76F51] hover:text-white transition-colors duration-200"
          >
            Browse Found Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#3E2F1C]">
              Your Recovered Items
            </h2>
            <p className="text-[#9A8C7A]">
              Items you've successfully recovered through our platform
            </p>
          </div>
          
          <button
            onClick={toggleLayout}
            className="flex items-center gap-2 px-4 py-2 bg-[#F0EAD6] hover:bg-[#F4A261] text-[#3E2F1C] rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {layout === "card" ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>Table View</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Card View</span>
              </>
            )}
          </button>
        </div>

        {/* Card Layout */}
        {layout === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <CardItem key={item._id} item={item} />
            ))}
          </div>
        ) : (
          /* Table Layout */
          <div className="overflow-x-auto rounded-lg shadow-sm transition-all duration-300">
            <table className="min-w-full divide-y divide-[#9A8C7A]/20">
              <thead className="bg-[#F0EAD6]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#3E2F1C] uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#FFFAF0] divide-y divide-[#9A8C7A]/10">
                {items.map((item) => (
                  <TableRow key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Card Component for Card Layout
const CardItem = ({ item }) => {
  const { title, recoveredLocation, recoveredDate, itemImage, status } = item;

  const formattedDate = new Date(recoveredDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-[#F0EAD6] rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="flex flex-col h-full">
        {itemImage && (
          <div className="h-40 w-full mb-4 overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              src={itemImage}
              alt={title}
            />
          </div>
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-[#3E2F1C] line-clamp-2">
              {title}
            </h3>
            <span
              className={`ml-2 px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                status === "claimed"
                  ? "bg-[#2A9D8F] text-white"
                  : "bg-[#F4A261] text-[#3E2F1C]"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="space-y-1 text-sm text-[#3E2F1C]">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-[#9A8C7A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{recoveredLocation}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-[#9A8C7A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for table rows (desktop/tablet)
const TableRow = ({ item }) => {
  const { title, recoveredLocation, recoveredDate, itemImage, status } = item;

  const formattedDate = new Date(recoveredDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr className="hover:bg-[#F0EAD6]/50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {itemImage && (
            <div className="flex-shrink-0 h-10 w-10 mr-4">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={itemImage}
                alt={title}
              />
            </div>
          )}
          <div className="text-sm font-medium text-[#3E2F1C]">{title}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#3E2F1C]">{recoveredLocation}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#3E2F1C]">{formattedDate}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            status === "claimed"
              ? "bg-[#2A9D8F] text-white"
              : "bg-[#F4A261] text-[#3E2F1C]"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default RecoverItem;