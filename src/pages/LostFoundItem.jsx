import React, { useEffect, useState } from "react";
import AllItemsCard from "./AllItemsCard";
import { FiSearch, FiX } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const LostFoundItem = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://lostra-link-server.vercel.app/allItems"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    document.title = "Lost and Found Items";

    fetchItems();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(items);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, items]);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredItems(items);
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex justify-center items-center">
        <div className="text-[#E76F51] text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3E2F1C] mb-6 text-center">
          Lost & Found Items
        </h1>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by title, location, or category..."
              className="w-full py-3 px-4 pr-10 rounded-lg border border-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent bg-[#F0EAD6] text-[#3E2F1C] placeholder-[#9A8C7A] transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <button
                onClick={clearSearch}
                className="absolute right-10 text-[#9A8C7A] hover:text-[#E76F51] transition-colors duration-200"
              >
                <FiX size={20} />
              </button>
            ) : null}
            <div className="absolute right-3 text-[#9A8C7A]">
              <FiSearch size={20} />
            </div>
          </div>
          {isSearching && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F4A261] animate-pulse"></div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-[#9A8C7A] text-sm">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}{" "}
          found
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center text-[#9A8C7A] py-12">
            <p className="text-xl">
              {searchTerm ? "No items match your search." : "No items found."}
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="mt-4 text-[#2A9D8F] hover:text-[#1E7D71] transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <AllItemsCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostFoundItem;
