import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ItemDetails = () => {
  const { users } = useContext(AuthContext);
  const loadedData = useLoaderData();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [recoveryData, setRecoveryData] = useState({
    recoveredLocation: "",
    recoveredDate: new Date(),
  });
  const { recoveredLocation, recoveredDate } = recoveryData;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecovered, setIsRecovered] = useState(false);

  useEffect(() => {
    if (loadedData) {
      setData(loadedData);
      setIsRecovered(loadedData.status === "recovered");
      setLoading(false);
    } else {
      setError("Item data not found");
      setLoading(false);
    }
  }, [loadedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecoveryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setRecoveryData((prev) => ({
      ...prev,
      recoveredDate: date,
    }));
  };

  const handleSubmitRecovery = async (e) => {
    e.preventDefault();
    if (!data) return;

    setIsSubmitting(true);

    const recoverData = {
      recoveredLocation,
      recoveredDate,
      title: data.title,
      itemId: data._id,
      userEmail: users?.email,
       status: "recovered",
      // recoveredBy: users.uid,
    };

    try {
      await axios.post("http://localhost:3000/recoversItems", recoverData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsRecovered(true);
      setShowModal(false);
    } catch (error) {
      console.error("Recovery submission failed:", error);
      setError("Failed to submit recovery");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4A261] mx-auto mb-4"></div>
          <p className="text-[#3E2F1C]">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
        <div className="text-center p-6 bg-[#F0EAD6] rounded-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#3E2F1C] mb-4">Error</h2>
          <p className="text-[#E76F51] mb-4">{error || "Item not found"}</p>
          <Link
            to="/"
            className="inline-block bg-[#F4A261] hover:bg-[#e69555] text-white font-medium py-2 px-4 rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    postType,
    title,
    category,
    location,
    date,
    thumbnail,
    description,
    contactName,
    contactEmail,
  } = data;

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto bg-[#F0EAD6] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Item Image */}
        <div className="relative h-64 sm:h-80 md:h-[600px] object-cover overflow-hidden">
          <img
            src={
              thumbnail || "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {isRecovered && (
            <div className="absolute top-4 right-4 bg-[#2A9D8F] text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              Recovered
            </div>
          )}
        </div>

        {/* Rest of your component remains the same */}
        {/* ... */}

        {/* Item Details */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3E2F1C] mb-2 sm:mb-0">
              {title}
            </h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                postType === "lost"
                  ? "bg-[#E76F51] text-white"
                  : "bg-[#2A9D8F] text-white"
              }`}
            >
              {postType === "lost" ? "Lost Item" : "Found Item"}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-[#3E2F1C]">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-[#9A8C7A] text-sm font-semibold uppercase mb-1">
                Category
              </h3>
              <p className="text-[#3E2F1C] font-medium">{category}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-[#9A8C7A] text-sm font-semibold uppercase mb-1">
                Location
              </h3>
              <p className="text-[#3E2F1C] font-medium">{location}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-[#9A8C7A] text-sm font-semibold uppercase mb-1">
                Date
              </h3>
              <p className="text-[#3E2F1C] font-medium">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-[#9A8C7A] text-sm font-semibold uppercase mb-1">
                Contact
              </h3>
              <p className="text-[#3E2F1C] font-medium">
                {contactName || "Not provided"}
              </p>
              {contactEmail && <p className="text-[#3E2F1C]">{contactEmail}</p>}
            </div>
          </div>

          {/* Recovery Button */}
          {!isRecovered && users && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowModal(true)}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  postType === "lost"
                    ? "bg-[#2A9D8F] hover:bg-[#22867a]"
                    : "bg-[#F4A261] hover:bg-[#e6914f]"
                }`}
              >
                {postType === "lost" ? "Found This!" : "This is Mine!"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recovery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#F0EAD6] rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 animate-slideUp">
            <h2 className="text-2xl font-bold text-[#3E2F1C] mb-4">
              Report Recovery
            </h2>

            <form onSubmit={handleSubmitRecovery}>
              <div className="mb-4">
                <label className="block text-[#3E2F1C] mb-2 font-medium">
                  Recovered Location
                </label>
                <input
                  type="text"
                  name="recoveredLocation"
                  value={recoveryData.recoveredLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#9A8C7A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#3E2F1C] mb-2 font-medium">
                  Recovery Date
                </label>
                <DatePicker
                  selected={recoveryData.recoveredDate}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 border border-[#9A8C7A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                  required
                />
              </div>

              {users && (
                <div className="mb-4 bg-white p-3 rounded-lg">
                  <label className="block text-[#9A8C7A] mb-1 text-sm font-medium">
                    Recovered By
                  </label>
                  <div className="flex items-center">
                    {users.photoURL && (
                      <img
                        src={users.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="text-[#3E2F1C] font-medium">
                        {users.displayName || "User"}
                      </p>
                      <p className="text-[#9A8C7A] text-sm">{users.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[#3E2F1C] hover:text-[#E76F51] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isSubmitting
                      ? "bg-[#9A8C7A]"
                      : "bg-[#F4A261] hover:bg-[#e6914f]"
                  } transition-colors flex items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    </>
                  ) : (
                    "Submit Recovery"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
