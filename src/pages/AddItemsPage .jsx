import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
    // contactName: "",
    // contactEmail: "",
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
    <div className="min-h-screen bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#F0EAD6] rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#F4A261] p-6">
            <h2 className="text-2xl font-bold text-[#3E2F1C]">
              Report Lost or Found Item
            </h2>
            <p className="text-[#3E2F1C] opacity-90 mt-1">
              Help reunite people with their belongings by providing detailed
              information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Post Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["lost", "found"].map((type) => (
                <div
                  key={type}
                  className={`relative rounded-md p-4 cursor-pointer transition-all duration-200 border-2 ${
                    formData.postType === type
                      ? type === "lost"
                        ? "bg-[#E76F51] text-white border-[#E76F51]"
                        : "bg-[#2A9D8F] text-white border-[#2A9D8F]"
                      : "bg-[#F0EAD6] border-[#9A8C7A] hover:border-[#F4A261]"
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
                    <span className="text-lg font-medium">
                      {type === "lost" ? "Lost Item" : "Found Item"}
                    </span>
                  </div>
                  {formData.postType === type && (
                    <div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${
                        type === "lost"
                          ? "border-t-[#E76F51]"
                          : "border-t-[#2A9D8F]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Thumbnail */}
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
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-[#F4A261] p-2"
              />
              {formData.thumbnail && (
                <div className="mt-2">
                  <p className="text-sm text-[#9A8C7A] mb-1">Image Preview:</p>
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="h-32 object-contain rounded-md border border-[#9A8C7A]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Image+Not+Found";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
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
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-[#F4A261] p-2"
              />
            </div>

            {/* Description */}
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
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-[#F4A261] p-2"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-[#F4A261] p-2"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
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
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring-[#F4A261] p-2"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#3E2F1C]">
                {formData.postType === "lost" ? "Date Lost" : "Date Found"}*
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] p-2"
                required
                showYearDropdown
                dropdownMode="select"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4 border-t border-[#9A8C7A]">
              <h3 className="text-lg font-medium text-[#3E2F1C]">
                Contact Information
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  Your Name*
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3E2F1C]">
                  Email*
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] p-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#264653] text-white py-2 lg:px-80 px-24  rounded-md hover:bg-[#1f3c3b] transition-all"
            >
              {isSubmitting ? "Submitting..." : "Post Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemsPage;
