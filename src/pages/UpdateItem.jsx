import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

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

  // Fetch item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axiosSecure.get(
          `/allItems/${id}?email=${users?.email}`
        );
        setItemData(response.data);
      } catch (error) {
        toast.error("Failed to fetch item data");
        console.error("Fetch error:", error);
      }
    };

    if (users?.email) {
      fetchItemData();
    }
    document.title = "Update-Items";
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
      // console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !itemData) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#F0EAD6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-[#F4A261] p-6">
            <h2 className="text-2xl font-bold text-[#3E2F1C]">
              Update {formData.postType === "lost" ? "Lost" : "Found"} Item
            </h2>
            <p className="text-[#3E2F1C] opacity-90 mt-1">
              Update the details of your {formData.postType} item below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Thumbnail with hover effect */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                Item Image URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-[#F4A261] p-2 transition-all duration-200 hover:border-[#F4A261] hover:shadow-md"
              />
              {formData.thumbnail && (
                <div className="mt-2 transition-all duration-300 hover:scale-[1.02]">
                  <p className="text-sm text-[#9A8C7A] mb-1">Image Preview:</p>
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="h-32 w-full object-contain rounded-md border border-[#9A8C7A] hover:border-[#F4A261] transition-all duration-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Image+Not+Found";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title with focus effect */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                Item Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Black Wallet, iPhone 12"
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2 transition-all duration-200 hover:border-[#F4A261]"
              />
            </div>

            {/* Description with smooth transition */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                Description*
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Provide details like brand, color, etc."
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2 transition-all duration-200 hover:border-[#F4A261]"
              />
            </div>

            {/* Category dropdown with hover */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2 transition-all duration-200 hover:border-[#F4A261] cursor-pointer"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                {formData.postType === "lost"
                  ? "Where was it lost?"
                  : "Where was it found?"}
                *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. Central Park, Building A Room 203"
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2 transition-all duration-200 hover:border-[#F4A261]"
              />
            </div>

            {/* Date picker with custom styling */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                {formData.postType === "lost" ? "Date Lost" : "Date Found"}*
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/50 p-2 transition-all duration-200 hover:border-[#F4A261] cursor-pointer"
                required
                showYearDropdown
                dropdownMode="select"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {/* Contact Info - Read Only */}
            <div className="space-y-4 pt-4 border-t border-[#9A8C7A]">
              <h3 className="text-lg font-medium text-[#3E2F1C]">
                Contact Information
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  Your Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={users?.displayName || ""}
                  readOnly
                  className="block w-full rounded-md border-[#9A8C7A] bg-[#F0EAD6] p-2 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={users?.email || ""}
                  readOnly
                  className="block w-full rounded-md border-[#9A8C7A] bg-[#F0EAD6] p-2 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Action Buttons with hover animations */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2A9D8F] text-white py-3 px-6 rounded-md hover:bg-[#1f7a6f] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg flex-1 flex items-center justify-center"
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
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center">
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
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-[#E76F51] text-white py-3 px-6 rounded-md hover:bg-[#d45a3d] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg flex-1 flex items-center justify-center"
              >
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
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
