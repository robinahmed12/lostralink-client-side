import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [itemData, setItemData] = useState(null);
  const [formData, setFormData] = useState({
    postType: "lost",
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    date: new Date(),
    contactName: "",
    contactEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("lost");

  const categories = [
    "Pets",
    "Documents",
    "Electronics",
    "Jewelry",
    "Clothing",
    "Bags",
    "Keys",
    "Other",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Fetch item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axiosSecure.get(
          `/allItems/${id}?email=${users?.email}`
        );
        setItemData(response.data);
        setActiveTab(response.data.postType || "lost");
      } catch (error) {
        toast.error("Failed to fetch item data");
        console.error("Fetch error:", error);
      }
    };

    if (users?.email) {
      fetchItemData();
    }
    document.title = "Update Item";
  }, [id, users?.email, axiosSecure]);

  // Initialize form with loaded data
  useEffect(() => {
    if (itemData) {
      setFormData({
        postType: itemData.postType || "lost",
        thumbnail: itemData.thumbnail || "",
        title: itemData.title || "",
        description: itemData.description || "",
        category: itemData.category || "",
        location: itemData.location || "",
        date: itemData.date ? new Date(itemData.date) : new Date(),
        contactName: users?.displayName || "",
        contactEmail: users?.email || "",
      });
    }
  }, [itemData, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData((prev) => ({ ...prev, postType: tab }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosSecure.put(
        `/update/${id}?email=${users?.email}`,
        formData
      );

      if (response.status === 200 || response.status === 204) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Item Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(-1);
      } else {
        throw new Error("Update failed - no changes made");
      }
    } catch (error) {
      toast.error(
        "Update error: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !itemData) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen mt-20 bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
          {/* Header with animated gradient */}
          <div className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Update {formData.postType === "lost" ? "Lost" : "Found"} Item
              </h2>
              <p className="text-white/90 mt-2">
                Help reunite items with their owners by updating accurate
                details.
              </p>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex border-b border-[#F0EAD6]">
            <button
              type="button"
              onClick={() => handleTabChange("lost")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === "lost"
                  ? "text-[#3E2F1C] border-b-2 border-[#F4A261] bg-[#F0EAD6]/30"
                  : "text-[#9A8C7A] hover:text-[#3E2F1C] hover:bg-[#F0EAD6]/10"
              }`}
            >
              Lost Item
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("found")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === "found"
                  ? "text-[#3E2F1C] border-b-2 border-[#2A9D8F] bg-[#F0EAD6]/30"
                  : "text-[#9A8C7A] hover:text-[#3E2F1C] hover:bg-[#F0EAD6]/10"
              }`}
            >
              Found Item
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Image upload section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <label className="block text-sm font-medium text-[#3E2F1C] mb-2">
                Item Image
              </label>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative group">
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-lg border-2 border-[#F0EAD6] bg-white p-3 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30 transition-all duration-300 hover:border-[#F4A261]/70"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                      <svg
                        className="h-5 w-5 text-[#9A8C7A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-[#9A8C7A]">
                    Paste a URL of your item's image
                  </p>
                </div>
                {formData.thumbnail && (
                  <div className="flex-1">
                    <div className="h-full rounded-lg overflow-hidden border-2 border-[#F0EAD6] transition-all duration-300 hover:border-[#F4A261] hover:shadow-md">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/300?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Title and Category */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  Item Title*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Black Wallet, iPhone 12"
                    className="w-full rounded-lg border-2 border-[#F0EAD6] bg-white p-3 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30 transition-all duration-300 hover:border-[#F4A261]/70"
                  />
                  <div className="absolute right-3 top-3 text-[#9A8C7A]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  Category*
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-2 border-[#F0EAD6] bg-white p-3 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30 transition-all duration-300 hover:border-[#F4A261]/70 appearance-none cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none text-[#9A8C7A]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                Detailed Description*
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Provide detailed information about the item (color, brand, unique features, etc.)"
                  className="w-full rounded-lg border-2 border-[#F0EAD6] bg-white p-3 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30 transition-all duration-300 hover:border-[#F4A261]/70"
                />
                <div className="absolute right-3 top-3 text-[#9A8C7A]">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Location and Date */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  {formData.postType === "lost"
                    ? "Where was it lost?"
                    : "Where was it found?"}
                  *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Central Park, Building A Room 203"
                    className="w-full rounded-lg border-2 border-[#F0EAD6] bg-white p-3 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30 transition-all duration-300 hover:border-[#F4A261]/70"
                  />
                  <div className="absolute right-3 top-3 text-[#9A8C7A]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  {formData.postType === "lost" ? "Date Lost" : "Date Found"}*
                </label>
                <div className="relative">
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    className="w-full rounded-lg border-2 border-[#F0EAD6] bg-white p-3 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30 transition-all duration-300 hover:border-[#F4A261]/70 cursor-pointer"
                    required
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="MMMM d, yyyy"
                  />
                  <div className="absolute right-3 top-3 pointer-events-none text-[#9A8C7A]">
                    <svg
                      className="h-5 w-5"
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
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 pt-6 border-t border-[#F0EAD6]"
            >
              <h3 className="text-lg font-medium text-[#3E2F1C] flex items-center">
                <svg
                  className="h-5 w-5 mr-2 text-[#2A9D8F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#3E2F1C]">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contactName"
                      value={users?.displayName || ""}
                      readOnly
                      className="w-full rounded-lg border-2 border-[#F0EAD6] bg-[#F0EAD6]/30 p-3 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-3 text-[#9A8C7A]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#3E2F1C]">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="contactEmail"
                      value={users?.email || ""}
                      readOnly
                      className="w-full rounded-lg border-2 border-[#F0EAD6] bg-[#F0EAD6]/30 p-3 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-3 text-[#9A8C7A]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative flex-1 bg-gradient-to-r from-[#2A9D8F] to-[#1D7870] text-white py-4 px-6 rounded-xl hover:from-[#1D7870] hover:to-[#13645D] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A9D8F] to-[#1D7870] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Update Item
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="relative flex-1 bg-gradient-to-r from-[#E76F51] to-[#D45A3D] text-white py-4 px-6 rounded-xl hover:from-[#D45A3D] hover:to-[#C04A2D] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#E76F51] to-[#D45A3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancel
                </div>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UpdateItem;
