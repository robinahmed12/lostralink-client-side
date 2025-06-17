import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../components/Loader";
import useRecoversApi from "../Api/useRecoversApi";
import RecoveryModal from "./RecoveryModal";
import { toast } from "react-toastify";

const ItemDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { recoversItemApi } = useRecoversApi();

  const [item, setItem] = useState(null);
  console.log(item);

  const [loading, setLoading] = useState(true);
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
          `/allItems/${id}?email=${users?.email}`
        );
        setItem(res.data);

        // Check if this item exists in recovered items
        const recoveredItems = await recoversItemApi(users?.email);
        const isItemRecovered = recoveredItems.some(
          (recoveredItem) => recoveredItem.itemId === res.data._id
        );

        setIsRecovered(isItemRecovered || res.data.status === "recovered");
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
    document.title = "Items-Details";
  }, [id, axiosSecure, users?.email, recoversItemApi]);

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
    if (!item || isRecovered) return;

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
      // 1. Save recovery record
      const response = await axiosSecure.post(
        `/recoversItems?email=${users?.email}`,
        recoverData
      );

      if (response.status === 200 || response.status === 201) {
        // 2. Update local state
        setIsRecovered(true);
        setItem((prev) => ({ ...prev, status: "recovered" }));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Recovery submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0]">
        <Loader />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 font-semibold">
        Item not found.
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

      <RecoveryModal
        showModal={showModal}
        setShowModal={setShowModal}
        users={users}
        handleSubmitRecovery={handleSubmitRecovery}
        isSubmitting={isSubmitting}
        isRecovered={isRecovered}
        recoveredLocation={recoveredLocation}
        recoveredDate={recoveredDate}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
      />
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
