import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecentItems = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/recentItems");

        // First check if response is OK
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        // Then verify the content type
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response was not JSON");
        }

        const data = await response.json();
        console.log("Received data:", data); // Debugging log

        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error("Expected array but got different data type");
        }

        setRecentItems(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentItems();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F4A261]"></div>
        <p className="mt-3 text-lg text-[#3E2F1C]">Loading recent items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-[#E76F51]">
        <p className="text-xl font-bold mb-2">Failed to load items</p>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#F4A261] hover:bg-[#E76F51] text-white font-medium py-2 px-6 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (recentItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-[#3E2F1C] mb-4">No recent items found</p>
        <Link
          to="/report-found"
          className="inline-block bg-[#2A9D8F] hover:bg-[#1E8C7F] text-white font-medium py-2 px-6 rounded-lg"
        >
          Report a Found Item
        </Link>
      </div>
    );
  }

  return (
    <section className="pt-28 max-w-6xl mx-auto bg-[#FFFAF0]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#3E2F1C] mb-2 text-center">
          Latest Find & Lost Items
        </h2>
        <p className="text-[#9A8C7A] text-center mb-8">
          Recently reported items in our community
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/allItems"
            className="inline-block bg-[#F4A261] hover:bg-[#E76F51] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
          >
            See All Items
          </Link>
        </div>
      </div>
    </section>
  );
};

const ItemCard = ({ item }) => {
  // Fallback values for all possible missing data
  const itemData = {
    _id: item._id || "no-id",
    itemName: item.title || "Unnamed Item",
    description: item.description || "No description available",
    status: item.status?.toLowerCase() === "found" ? "found" : "lost",
    date: item.date
      ? new Date(item.date).toLocaleDateString()
      : "Date not available",
    image: item.thumbnail || "/placeholder-item.jpg",
    userEmail: item.userEmail || "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="bg-[#F0EAD6] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-[#e2d9c0]"
    >
      {/* Image Section */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={itemData.image}
          alt={itemData.itemName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder-item.jpg";
          }}
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${
            itemData.status === "found" ? "bg-[#2A9D8F]" : "bg-[#E76F51]"
          } text-white shadow-sm`}
        >
          {itemData.status === "found" ? "FOUND" : "LOST"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#3E2F1C] mb-2">
          {itemData.itemName}
        </h3>
        <p className="text-[#9A8C7A] mb-4 flex-grow">
          {itemData.description.substring(0, 120)}
          {itemData.description.length > 120 ? "..." : ""}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-[#3E2F1C]">{itemData.date}</span>
          <Link
            to={`/details/${itemData._id}`}
            className="text-[#F4A261] hover:text-[#E76F51] font-semibold transition-colors duration-200 flex items-center"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentItems;
