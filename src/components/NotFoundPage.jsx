import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);

  // Mock data for suggested items
  useEffect(() => {
    const mockItems = [
      { id: 1, title: "Lost Backpack", type: "bag", date: "2 days ago" },
      {
        id: 2,
        title: "Found Smartphone",
        type: "electronics",
        date: "1 week ago",
      },
      { id: 3, title: "Missing Wallet", type: "personal", date: "3 days ago" },
      { id: 4, title: "Found Keys", type: "personal", date: "yesterday" },
    ];
    setItems(mockItems);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-[#F0EAD6] rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#F4A261] p-6 text-center">
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-5xl font-bold text-[#3E2F1C]"
          >
            404 - Page Not Found
          </motion.h1>
          <p className="text-[#3E2F1C] mt-2">
            Oops! The item you're looking for seems to be lost...
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Illustration and message */}
            <div className="flex-1 flex flex-col items-center">
              <motion.div
                whileHover={{ rotate: 5 }}
                className="mb-6 w-40 h-40 md:w-48 md:h-48"
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#F4A261"
                    d="M40,-68.3C52.2,-61.3,62.5,-51.3,69.3,-38.8C76.1,-26.3,79.5,-11.1,77.7,2.9C75.9,17,68.9,29.8,58.2,39.6C47.5,49.4,33.1,56.1,17.9,62.9C2.7,69.7,-13.3,76.6,-26.9,73.4C-40.5,70.2,-51.7,56.9,-61.1,42.9C-70.5,28.9,-78,14.5,-79.2,-0.6C-80.4,-15.7,-75.2,-31.4,-65.2,-43.9C-55.2,-56.4,-40.3,-65.7,-26.7,-72.2C-13.1,-78.7,-0.7,-82.4,12.2,-78.3C25.1,-74.2,27.9,-75.3,40,-68.3Z"
                    transform="translate(100 100)"
                  />
                  <path
                    fill="#E76F51"
                    d="M30,-50.1C38.6,-44.7,45.2,-37.1,50.8,-28.3C56.4,-19.5,61.1,-9.7,60.9,-0.1C60.7,9.5,55.6,19.1,48.8,28.5C42,37.9,33.5,47.2,22.8,52.8C12.1,58.4,-0.8,60.4,-12.3,56.8C-23.8,53.3,-33.9,44.3,-42.7,34.2C-51.5,24.1,-59,12.9,-60.8,0.4C-62.6,-12.2,-58.7,-24.3,-51.1,-34.1C-43.5,-43.9,-32.2,-51.3,-21.3,-55.9C-10.4,-60.5,0.1,-62.3,10.8,-59.8C21.5,-57.3,21.4,-55.5,30,-50.1Z"
                    transform="translate(100 100)"
                  />
                  <path
                    fill="#2A9D8F"
                    d="M20,-33.4C26.7,-29.8,33.4,-24.7,37.8,-18.2C42.2,-11.7,44.4,-3.8,42.5,3.1C40.6,10.1,34.7,15.9,28.5,22.3C22.3,28.6,15.9,35.4,7.2,40.7C-1.5,46,-12.5,49.8,-21.2,45.9C-29.9,41.9,-36.3,30.1,-42.5,18.7C-48.7,7.3,-54.7,-3.6,-53.4,-13.3C-52.1,-23,-43.5,-31.4,-33.6,-34.5C-23.7,-37.6,-12.4,-35.3,-2.2,-32.3C8,-29.3,13.3,-37,20,-33.4Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </motion.div>

              <p className="text-[#3E2F1C] text-center mb-6">
                The page you're looking for doesn't exist or has been moved. But
                don't worry! You can search our lost and found items below or
                return to safety.
              </p>

              <Link
                to="/"
                className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isHovered
                    ? "bg-[#3E2F1C] text-[#FFFAF0]"
                    : "bg-[#2A9D8F] text-white"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.span
                  animate={isHovered ? { x: [0, -2, 2, -2, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {isHovered ? "🚀 Take Me Home!" : "Return to Homepage"}
                </motion.span>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-2 -right-2 text-xs bg-[#E76F51] text-white px-2 py-1 rounded-full"
                  >
                    Safe!
                  </motion.span>
                )}
              </Link>
            </div>

            {/* Right side - Search and suggestions */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-[#3E2F1C] font-semibold mb-3">
                  Search Lost & Found Items
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full p-3 pr-12 rounded-lg border border-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#F4A261] p-2 rounded-lg hover:bg-[#E76F51] transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#3E2F1C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-[#3E2F1C] font-semibold mb-3">
                  Recently Reported Items
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 5 }}
                      className="p-3 bg-white rounded-lg border border-[#9A8C7A]/30 hover:border-[#F4A261] cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-[#3E2F1C] font-medium">
                          {item.title}
                        </h4>
                        <span className="text-xs bg-[#2A9D8F]/20 text-[#2A9D8F] px-2 py-1 rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[#9A8C7A] text-sm mt-1">{item.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#3E2F1C]/10 p-4 text-center text-[#9A8C7A] text-sm">
          Need help?{" "}
          <Link to="/contact" className="text-[#2A9D8F] hover:underline">
            Contact our support team
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
