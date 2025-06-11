import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";

const LatestItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("http://localhost:3000/allItems");
      const data = await response.json();
      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  console.log(items);
  

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4A261] mx-auto mb-4"></div>
          <p className="text-[#3E2F1C]">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#FFFAF0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#3E2F1C] mb-4"
          >
            Latest Lost & Found Items
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-[#9A8C7A] max-w-2xl mx-auto"
          >
            Recently reported items in our community. Check if your lost item
            has been found or help return found items.
          </motion.p>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {items.slice(0, 6).map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover="hover"
                className="h-full"
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-lg text-[#9A8C7A]">
              No items found yet. Check back later!
            </p>
          </motion.div>
        )}

        {/* See All Button */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              to="/items"
              className="inline-block bg-[#F4A261] hover:bg-[#e69555] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              See All Items
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestItems;
