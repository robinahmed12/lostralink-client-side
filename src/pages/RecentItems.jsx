import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import Container from "../components/Container/Container";

const RecentItems = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch(
          "https://lostra-link-server.vercel.app/recentItems"
        );
        const data = await response.json();
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
      <Container className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute w-full h-full rounded-full border-4 border-t-[#F4A261] border-r-[#2A9D8F] border-b-[#E76F51] border-l-[#F0EAD6] animate-spin" />
          <div className="absolute inset-4 rounded-full bg-[#F4A261] opacity-20" />
        </div>
        <p className="mt-6 text-xl font-medium text-[#3E2F1C] animate-pulse">
          Gathering lost treasures...
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
        data-aos="fade-up"
      >
        <div className="w-16 h-16 rounded-full bg-[#E76F51] flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#3E2F1C] mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-[#9A8C7A] mb-6 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white font-medium py-2 px-8 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Try Again
        </button>
      </Container>
    );
  }

  if (recentItems.length === 0) {
    return (
      <Container
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
        data-aos="fade-up"
      >
        <div className="w-24 h-24 rounded-full bg-[#F0EAD6] flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#9A8C7A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#3E2F1C] mb-2">
          No items found yet
        </h2>
        <p className="text-[#9A8C7A] mb-6 max-w-md">
          Be the first to report a found or lost item in your community
        </p>
        <Link
          to="/report-found"
          className="inline-block bg-gradient-to-r from-[#2A9D8F] to-[#1E8C7F] text-white font-medium py-2 px-8 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Report an Item
        </Link>
      </Container>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-[#FFFAF0]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2F1C] mb-3">
            Recently <span className="text-[#F4A261]">Lost</span> &{" "}
            <span className="text-[#2A9D8F]">Found</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4A261] to-[#2A9D8F] mx-auto mb-4 rounded-full" />
          <p className="text-[#9A8C7A] max-w-2xl mx-auto">
            Items recently reported by our community members. Help reunite lost
            items with their owners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentItems.map((item, index) => (
            <div key={item._id} data-aos="fade-up" data-aos-delay={index * 100}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16" data-aos="fade-up">
          <Link
            to="/allItems"
            className="inline-block bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Browse All Items
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};

const ItemCard = ({ item }) => {
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
    <div
      className="h-full hover:-translate-y-1 transition-transform duration-300"

    >
      <div className="bg-[#F0EAD6] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-[#e2d9c0]">
        {/* Image with status ribbon */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={itemData.image}
            alt={itemData.itemName}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "/placeholder-item.jpg";
            }}
          />
          <div
            className={`absolute top-4 -right-10 px-8 py-1 transform rotate-45 ${
              itemData.status === "found" ? "bg-[#2A9D8F]" : "bg-[#E76F51]"
            } text-white text-xs font-bold shadow-sm`}
          >
            {itemData.status.toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-[#3E2F1C] mb-2 line-clamp-2">
              {itemData.itemName}
            </h3>
            <p className="text-[#9A8C7A] mb-4 line-clamp-3">
              {itemData.description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#e2d9c0]">
            <span className="text-sm text-[#3E2F1C] flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-[#9A8C7A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {itemData.date}
            </span>
            <Link
              to={`/details/${itemData._id}`}
              className="flex items-center text-sm font-semibold text-[#F4A261] hover:text-[#E76F51] transition-colors"
            >
              Details
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
      </div>
    </div>
  );
};

export default RecentItems;
