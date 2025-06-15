import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../components/Loader";

const ItemDetails = () => {
  // const { users } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [recoveryData, setRecoveryData] = useState({
    recoveredLocation: "",
    recoveredDate: new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecovered, setIsRecovered] = useState(false);

  const { recoveredLocation, recoveredDate } = recoveryData;
  const { users } = useContext(AuthContext);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axiosSecure.get(
          `/allItems/${id}?email= ${users?.email}`
        );
        setItem(res.data);
        setIsRecovered(res.data.status === "recovered");
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setUnauthorized(true);
        } else {
          console.error(err);
          setError("Failed to fetch item data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, axiosSecure, users?.email, loading]);

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
    if (!item) return;

    setIsSubmitting(true);

    const recoverData = {
      recoveredLocation,
      recoveredDate,
      title: item.title,
      itemId: item._id,
      userEmail: users?.email,
      status: "recovered",
    };

    try {
      await axios.post(
        "https://lostra-link-server.vercel.app/recoversItems",
        recoverData
      );
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

  if (unauthorized || error || !item) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
        <div className="text-center p-6 bg-[#F0EAD6] rounded-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#3E2F1C] mb-4">Error</h2>
          <p className="text-[#E76F51] mb-4">
            {unauthorized
              ? "You are not authorized to view this item."
              : error || "Item not found."}
          </p>
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
  } = item;



  return (
    <div className="min-h-screen bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#F0EAD6] rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-[600px] overflow-hidden">
          <img
            src={
              thumbnail || "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={title}
            className="w-full h-full object-cover"
          />
          {isRecovered && (
            <div className="absolute top-4 right-4 bg-[#2A9D8F] text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              Recovered
            </div>
          )}
        </div>

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

          <p className="text-[#3E2F1C] mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoCard title="Category" value={category} />
            <InfoCard title="Location" value={location} />
            <InfoCard
              title="Date"
              value={new Date(date).toLocaleDateString()}
            />
            <InfoCard
              title="Contact"
              value={`${contactName || "Not provided"}\n${contactEmail || ""}`}
            />
          </div>

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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#F0EAD6] rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-[#3E2F1C] mb-4">
              Report Recovery
            </h2>
            <form onSubmit={handleSubmitRecovery}>
              <label className="block text-[#3E2F1C] mb-2 font-medium">
                Recovered Location
              </label>
              <input
                type="text"
                name="recoveredLocation"
                value={recoveredLocation}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-[#9A8C7A] rounded-lg mb-4"
              />
              <label className="block text-[#3E2F1C] mb-2 font-medium">
                Recovery Date
              </label>
              <DatePicker
                selected={recoveredDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-[#9A8C7A] rounded-lg mb-4"
                required
              />

              {users && (
                <div className="mb-4 bg-white p-3 rounded-lg">
                  <p className="text-[#3E2F1C] font-medium">
                    {users.displayName || "User"}
                  </p>
                  <p className="text-[#9A8C7A] text-sm">{users.email}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-[#3E2F1C]"
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
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Recovery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-[#9A8C7A] text-sm font-semibold uppercase mb-1">
      {title}
    </h3>
    <p className="text-[#3E2F1C] font-medium whitespace-pre-line">{value}</p>
  </div>
);

export default ItemDetails;
