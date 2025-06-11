import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#3E2F1C]">
            Your Recovered Items
          </h2>
          <p className="text-[#9A8C7A]">
            Items you've successfully recovered through our platform
          </p>
        </div>

        {/* Mobile Cards (for small screens) */}
        <div className="md:hidden space-y-4">
          {items.map((item) => (
            <MobileRecoverCard key={item._id} item={item} />
          ))}
        </div>

        {/* Tablet/Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm">
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

// Component for mobile cards
const MobileRecoverCard = ({ item }) => {
  const { title, recoveredLocation, recoveredDate, itemImage, status } = item;

  const formattedDate = new Date(recoveredDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-[#F0EAD6] rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start space-x-4">
        {itemImage && (
          <div className="flex-shrink-0 h-16 w-16">
            <img
              className="h-16 w-16 rounded-md object-cover"
              src={itemImage}
              alt={title}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-[#3E2F1C] truncate">
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
          <div className="mt-1 text-xs text-[#3E2F1C]">
            <p>Location: {recoveredLocation}</p>
            <p>Date: {formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverItem;
