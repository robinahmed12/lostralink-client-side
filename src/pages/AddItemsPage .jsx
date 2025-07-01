import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Container from "../components/Container/Container";

const AddItemsPage = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    postType: "lost",
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    date: new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      contactName: users?.displayName || "",
      contactEmail: users?.email || "",
    }));

    document.title = "Add-Items";
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handlePostTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      postType: type,
      date: new Date(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location
    ) {
      toast.error("Please fill in all required fields", {
        position: "top-center",
        className: "bg-[#E76F51] text-white",
      });
      return;
    }

    setIsSubmitting(true);

    const itemData = {
      ...formData,
      userEmail: users?.email || "",
    };

    try {
      const response = await axiosSecure.post(
        `/items?email=${users?.email}`,
        itemData
      );
      if (response.status === 200) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Item posted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setFormData((prev) => ({
        postType: prev.postType,
        thumbnail: "",
        title: "",
        description: "",
        category: "",
        location: "",
        date: new Date(),
        contactName: users?.displayName || "",
        contactEmail: users?.email || "",
      }));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error posting item. Please try again.", {
        position: "top-center",
        className: "bg-[#E76F51] text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8"
    >
      <Container>
        <div className="max-w-3xl mt-20 mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#F0EAD6] rounded-xl shadow-lg overflow-hidden border border-[#3E2F1C]/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] p-6 text-center">
              <motion.h2
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-[#3E2F1C] drop-shadow-sm"
              >
                Report Lost or Found Item
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#3E2F1C] opacity-90 mt-2"
              >
                Help reunite people with their belongings by providing detailed
                information.
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Post Type Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["lost", "found"].map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 ${
                      formData.postType === type
                        ? type === "lost"
                          ? "bg-[#E76F51] text-white border-[#E76F51] shadow-lg"
                          : "bg-[#2A9D8F] text-white border-[#2A9D8F] shadow-lg"
                        : "bg-[#F0EAD6] border-[#9A8C7A]/50 hover:border-[#F4A261]"
                    }`}
                    onClick={() => handlePostTypeChange(type)}
                  >
                    <input
                      type="radio"
                      name="postType"
                      value={type}
                      checked={formData.postType === type}
                      onChange={handleChange}
                      className="absolute opacity-0"
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <motion.span
                        className="text-lg font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {type === "lost" ? "Lost Item" : "Found Item"}
                      </motion.span>
                    </div>
                    {formData.postType === type && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${
                          type === "lost"
                            ? "border-t-[#E76F51]"
                            : "border-t-[#2A9D8F]"
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Form Sections */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Thumbnail */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#3E2F1C]">
                    Item Image URL
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1 block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                    />
                  </motion.div>
                  {formData.thumbnail && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <p className="text-sm text-[#9A8C7A] mb-1">
                        Image Preview:
                      </p>
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="h-32 w-full object-contain rounded-lg border border-[#9A8C7A]/30 shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150?text=Image+Not+Found";
                        }}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#3E2F1C]">
                    Item Title*
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Black Wallet, iPhone 12"
                      className="mt-1 block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                    />
                  </motion.div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#3E2F1C]">
                    Description*
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Provide details like brand, color, etc."
                      className="mt-1 block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                    />
                  </motion.div>
                </div>

                {/* Category and Location Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#3E2F1C]">
                      Category*
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#3E2F1C]">
                      {formData.postType === "lost"
                        ? "Where was it lost?"
                        : "Where was it found?"}
                      *
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Central Park, Building A Room 203"
                        className="mt-1 block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#3E2F1C]">
                    {formData.postType === "lost" ? "Date Lost" : "Date Found"}*
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      className="mt-1 block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                      required
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="MMMM d, yyyy"
                    />
                  </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 pt-6 border-t border-[#9A8C7A]/20"
                >
                  <h3 className="text-lg font-medium text-[#3E2F1C]">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#3E2F1C]">
                        Your Name*
                      </label>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#3E2F1C]">
                        Email*
                      </label>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border border-[#9A8C7A]/50 bg-white/80 shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2.5 transition-all duration-200"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(244, 162, 97, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting
                      ? "bg-[#9A8C7A] cursor-not-allowed"
                      : "bg-gradient-to-r from-[#264653] to-[#2A9D8F] hover:from-[#2A9D8F] hover:to-[#264653] text-white shadow-md"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
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
                      Processing...
                    </span>
                  ) : (
                    "Post Item"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default AddItemsPage;
