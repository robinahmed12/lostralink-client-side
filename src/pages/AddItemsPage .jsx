import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AddItemsPage = () => {
  const { users } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    postType: "lost", // Set default to "lost" instead of empty
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    date: new Date(),
    contactName: users?.displayName || "",
    contactEmail: users?.email || "",
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

  // Ensure user info stays updated
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      contactName: users?.displayName || "",
      contactEmail: users?.email || "",
    }));
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
      date: new Date(), // Reset date when changing type
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/items" , {
      formData
    }).then(data => {
      console.log(data);
      
    }).catch(error => {
      console.log(error);
      
    })


    // Validate required fields
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

    try {
      console.log("Submitting form data:", formData); // For debugging

      // Here you would add your actual submission logic
      // await addItemToDatabase(formData);

      toast.success("Item posted successfully!", {
        position: "top-center",
        className: "bg-[#2A9D8F] text-white",
      });

      // Reset form but keep user info and post type
      setFormData((prev) => ({
        postType: prev.postType,
        thumbnail: "",
        title: "",
        description: "",
        category: "",
        location: "",
        date: new Date(),
        contactName: users?.displayName || "",
        contactEmail: users.email || "",
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
            {/* Post Type - Now properly initialized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`relative rounded-md p-4 cursor-pointer transition-all duration-200 border-2 ${
                  formData.postType === "lost"
                    ? "bg-[#E76F51] text-white border-[#E76F51]"
                    : "bg-[#F0EAD6] border-[#9A8C7A] hover:border-[#E76F51]"
                }`}
                onClick={() => handlePostTypeChange("lost")}
              >
                <input
                  type="radio"
                  name="postType"
                  value="lost"
                  checked={formData.postType === "lost"}
                  onChange={() => {}}
                  className="absolute opacity-0"
                />
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="h-6 w-6"
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
                  <span className="text-lg font-medium">Lost Item</span>
                </div>
                {formData.postType === "lost" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#E76F51]"></div>
                )}
              </div>

              <div
                className={`relative rounded-md p-4 cursor-pointer transition-all duration-200 border-2 ${
                  formData.postType === "found"
                    ? "bg-[#2A9D8F] text-white border-[#2A9D8F]"
                    : "bg-[#F0EAD6] border-[#9A8C7A] hover:border-[#2A9D8F]"
                }`}
                onClick={() => handlePostTypeChange("found")}
              >
                <input
                  type="radio"
                  name="postType"
                  value="found"
                  checked={formData.postType === "found"}
                  onChange={() => {}}
                  className="absolute opacity-0"
                />
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="h-6 w-6"
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
                  <span className="text-lg font-medium">Found Item</span>
                </div>
                {formData.postType === "found" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#2A9D8F]"></div>
                )}
              </div>
            </div>

            {/* Rest of your form fields remain the same */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Post Type */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`relative rounded-md p-4 cursor-pointer transition-all duration-200 border-2 ${
                    formData.postType === "lost"
                      ? "bg-[#E76F51] text-white border-[#E76F51]"
                      : "bg-[#F0EAD6] border-[#9A8C7A] hover:border-[#E76F51] hover:bg-[#FFFAF0]"
                  }`}
                  onClick={() => handlePostTypeChange("lost")}
                >
                  <input
                    type="radio"
                    name="postType"
                    value="lost"
                    checked={formData.postType === "lost"}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                    <span className="text-lg font-medium">Lost Item</span>
                  </div>
                  {formData.postType === "lost" && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#E76F51] transition-all duration-300"></div>
                  )}
                </div>

                <div
                  className={`relative rounded-md p-4 cursor-pointer transition-all duration-200 border-2 ${
                    formData.postType === "found"
                      ? "bg-[#2A9D8F] text-white border-[#2A9D8F]"
                      : "bg-[#F0EAD6] border-[#9A8C7A] hover:border-[#2A9D8F] hover:bg-[#FFFAF0]"
                  }`}
                  onClick={() => handlePostTypeChange("found")}
                >
                  <input
                    type="radio"
                    name="postType"
                    value="found"
                    checked={formData.postType === "found"}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                    <span className="text-lg font-medium">Found Item</span>
                  </div>
                  {formData.postType === "found" && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#2A9D8F] transition-all duration-300"></div>
                  )}
                </div>
              </div> */}

              {/* Thumbnail */}
              <div className="space-y-2">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-[#3E2F1C]"
                >
                  Item Image URL
                </label>
                <input
                  type="url"
                  id="thumbnail"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 hover:border-[#F4A261]"
                />
                {formData.thumbnail && (
                  <div className="mt-2 animate-fadeIn">
                    <p className="text-sm text-[#9A8C7A] mb-1">
                      Image Preview:
                    </p>
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="h-32 object-contain rounded-md border border-[#9A8C7A] transition-all duration-300 hover:opacity-90 hover:shadow-md"
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
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#3E2F1C]"
                >
                  Item Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Black Wallet, iPhone 12, etc."
                  className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 hover:border-[#F4A261]"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[#3E2F1C]"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Provide detailed description including brand, color, distinguishing features, etc."
                  className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 hover:border-[#F4A261]"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-[#3E2F1C]"
                >
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 hover:border-[#F4A261] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5QThDN0EiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5rem]"
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
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-[#3E2F1C]"
                >
                  {formData.postType === "lost"
                    ? "Where was it lost?"
                    : "Where was it found?"}
                  *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Central Park, 5th Avenue, Building A Room 203, etc."
                  className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 hover:border-[#F4A261]"
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
                  className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 hover:border-[#F4A261]"
                  required
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select a date"
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-4 border-t border-[#9A8C7A]">
                <h3 className="text-lg font-medium text-[#3E2F1C]">
                  Contact Information
                </h3>

                <div className="space-y-2">
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium text-[#3E2F1C]"
                  >
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 bg-[#FFFAF0] hover:border-[#F4A261]"
                    disabled={!!users?.displayName}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-[#3E2F1C]"
                  >
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-[#9A8C7A] shadow-sm focus:border-[#F4A261] focus:ring focus:ring-[#F4A261] focus:ring-opacity-50 p-2 transition duration-200 bg-[#FFFAF0] hover:border-[#F4A261]"
                    disabled={!!users?.email}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                {/* <button
                  type="submit"
                  disabled={isSubmitting || !formData.postType}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                    formData.postType === "lost"
                      ? "bg-[#E76F51] hover:bg-[#D45F41]"
                      : formData.postType === "found"
                      ? "bg-[#2A9D8F] hover:bg-[#1A8D7F]"
                      : "bg-[#9A8C7A] cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
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
                      Posting...
                    </>
                  ) : formData.postType ? (
                    `Post ${
                      formData.postType === "lost" ? "Lost" : "Found"
                    } Item`
                  ) : (
                    "Select Lost or Found First"
                  )}
                </button> */}
              </div>
            </form>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md shadow-sm text-lg font-medium text-white ${
                  formData.postType === "lost"
                    ? "bg-[#E76F51] hover:bg-[#D45F41]"
                    : "bg-[#2A9D8F] hover:bg-[#1A8D7F]"
                } transition-all duration-300 flex justify-center items-center`}
              >
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
                    Posting...
                  </>
                ) : (
                  `Post ${formData.postType === "lost" ? "Lost" : "Found"} Item`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemsPage;
