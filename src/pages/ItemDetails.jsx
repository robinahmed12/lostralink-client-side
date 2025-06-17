import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../components/Loader";
import useRecoversApi from "../Api/useRecoversApi";
import RecoveryModal from "./RecoveryModal";
import { toast } from "react-toastify";

//  color theme variables
const colors = {
  primary: "#F4A261", // Deep Mustard
  accent: "#2A9D8F", // Forest Green
  alert: "#E76F51", // Burnt Red
  background: "#FFFAF0", // Cream White
  cardBg: "#F0EAD6", // Light Sand
  textPrimary: "#3E2F1C", // Cocoa Brown
  textMuted: "#9A8C7A", // Warm Taupe
};

const ItemDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { recoversItemApi } = useRecoversApi();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [recoveryData, setRecoveryData] = useState({
    recoveredLocation: "",
    recoveredDate: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecovered, setIsRecovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { recoveredLocation, recoveredDate } = recoveryData;
  const { users } = useContext(AuthContext);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axiosSecure.get(
          `/allItems/${id}?email=${users?.email}`
        );
        setItem(res.data);

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
    document.title = "Item Details | Lost & Found";
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
      const response = await axiosSecure.post(
        `/recoversItems?email=${users?.email}`,
        recoverData
      );

      if (response.status === 200 || response.status === 201) {
        setIsRecovered(true);
        setItem((prev) => ({ ...prev, status: "recovered" }));
        setShowModal(false);
        toast.success("Recovery reported successfully!");
      }
    } catch (error) {
      toast.error("Recovery submission failed. Please try again.");
      console.error("Recovery submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <Loader />
      </div>
    );
  }

  if (!item) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center text-center"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="p-8 rounded-xl shadow-md max-w-md mx-4"
          style={{ backgroundColor: colors.cardBg }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Item Not Found
          </h2>
          <p style={{ color: colors.textMuted }}>
            The item you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a
                href="/"
                className="transition-colors hover:text-primary"
                style={{ color: colors.accent }}
              >
                Home
              </a>
            </li>
            <li style={{ color: colors.textMuted }}>/</li>
            <li>
              <a
                href={`/${postType}-items`}
                className="transition-colors hover:text-primary capitalize"
                style={{ color: colors.accent }}
              >
                {postType} Items
              </a>
            </li>
            <li style={{ color: colors.textMuted }}>/</li>
            <li
              className="font-medium truncate max-w-xs"
              style={{ color: colors.textPrimary }}
            >
              {title}
            </li>
          </ol>
        </nav>

        <div
          className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          style={{ backgroundColor: colors.cardBg }}
        >
          {/* Image Gallery Section */}
          <div className="relative aspect-video overflow-hidden">
            {!imageLoaded && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: colors.cardBg }}
              >
                <Loader size="md" />
              </div>
            )}
            <motion.img
              src={
                thumbnail || "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
            />

            {isRecovered && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-4 right-4 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center"
                style={{ backgroundColor: colors.accent }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Recovered
              </motion.div>
            )}

            <div className="absolute bottom-4 left-4">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-2 rounded-lg text-white font-semibold shadow-md"
                style={{
                  backgroundColor:
                    postType === "lost" ? colors.alert : colors.accent,
                }}
              >
                {postType === "lost" ? "Lost Item" : "Found Item"}
              </motion.span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 lg:flex lg:gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: colors.textPrimary }}
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-lg leading-relaxed"
                style={{ color: colors.textPrimary }}
              >
                {description}
              </motion.p>

              {/* Action Button */}
              {!isRecovered && users && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="px-8 py-3 rounded-xl font-semibold text-white text-lg shadow-lg transition-all"
                    style={{
                      backgroundColor:
                        postType === "lost" ? colors.accent : colors.primary,
                      hover: {
                        backgroundColor:
                          postType === "lost" ? "#22867a" : "#e6914f",
                      },
                    }}
                  >
                    {postType === "lost" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Found This Item?
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        This is Mine!
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Details Sidebar */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:w-1/3 mt-8 lg:mt-0"
            >
              <div
                className="rounded-xl shadow-sm p-6 space-y-6"
                style={{ backgroundColor: colors.background }}
              >
                <h3
                  className="text-xl font-bold border-b pb-2"
                  style={{
                    color: colors.textPrimary,
                    borderColor: colors.cardBg,
                  }}
                >
                  Item Details
                </h3>

                <div className="space-y-4">
                  <DetailItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    title="Category"
                    value={category}
                    colors={colors}
                  />

                  <DetailItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    title="Location"
                    value={location}
                    colors={colors}
                  />

                  <DetailItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    title="Date"
                    value={new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    colors={colors}
                  />

                  <DetailItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    }
                    title="Contact"
                    value={
                      contactEmail ? (
                        <a
                          href={`mailto:${contactEmail}`}
                          className="underline transition-colors"
                          style={{
                            color: colors.accent,
                            hover: { color: colors.primary },
                          }}
                        >
                          {contactName || contactEmail}
                        </a>
                      ) : (
                        contactName || "Not provided"
                      )
                    }
                    isLast
                    colors={colors}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
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
            postType={postType}
            colors={colors}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DetailItem = ({ icon, title, value, isLast = false, colors }) => (
  <div
    className={`pb-4 ${!isLast ? "border-b" : ""}`}
    style={{ borderColor: colors.cardBg }}
  >
    <div className="flex items-center mb-1">
      <span className="mr-2" style={{ color: colors.textMuted }}>
        {icon}
      </span>
      <span
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: colors.textMuted }}
      >
        {title}
      </span>
    </div>
    <p className="font-medium pl-7" style={{ color: colors.textPrimary }}>
      {value}
    </p>
  </div>
);

export default ItemDetails;
