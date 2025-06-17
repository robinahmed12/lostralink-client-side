import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AllItemsCard = ({ item }) => {
  const { postType, title, category, location, date, contactName, _id } = item;

  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  

  return (
    <motion.div
      className="w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-full">
        {/* Card Container */}
        <div className="bg-[#F0EAD6] rounded-xl shadow-sm overflow-hidden h-full flex flex-col border border-[#F0EAD6] hover:border-[#F4A261]/50 transition-all duration-300">
          {/* Status Ribbon */}
          <div
            className={`absolute top-0 left-0 w-full h-2 ${
              postType === "lost" ? "bg-[#E76F51]" : "bg-[#2A9D8F]"
            }`}
          ></div>

          {/* Card Content */}
          <div className="p-5 flex-grow">
            {/* Title with icon */}
            <div className="flex items-start mb-3">
              <div
                className={`p-2 rounded-lg mr-3 ${
                  postType === "lost"
                    ? "bg-[#E76F51]/10 text-[#E76F51]"
                    : "bg-[#2A9D8F]/10 text-[#2A9D8F]"
                }`}
              >
                {postType === "lost" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#3E2F1C] mt-1 line-clamp-2">
                {title}
              </h3>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs font-medium text-[#9A8C7A] uppercase tracking-wider">
                  Category
                </p>
                <p className="text-[#3E2F1C] font-medium">{category}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#9A8C7A] uppercase tracking-wider">
                  Location
                </p>
                <p className="text-[#3E2F1C] font-medium">{location}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#9A8C7A] uppercase tracking-wider">
                  {postType === "lost" ? "Lost Date" : "Found Date"}
                </p>
                <p className="text-[#3E2F1C] font-medium">{formattedDate}</p>
              </div>
              {contactName && (
                <div>
                  <p className="text-xs font-medium text-[#9A8C7A] uppercase tracking-wider">
                    Posted By
                  </p>
                  <p className="text-[#3E2F1C] font-medium">{contactName}</p>
                </div>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <div className="px-5 pb-5">
            <Link
              to={`/details/${_id}`}
              className={`block w-full text-center py-2.5 px-4 rounded-lg transition-all duration-300 font-medium
                ${
                  postType === "lost"
                    ? "bg-[#E76F51] hover:bg-[#d45f41] text-white"
                    : "bg-[#2A9D8F] hover:bg-[#1E7D71] text-white"
                } shadow-sm hover:shadow-md`}
              title="Click to see full information"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AllItemsCard;
