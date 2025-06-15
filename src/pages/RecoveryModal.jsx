import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecoveryModal = ({
  showModal,
  setShowModal,
  users,
  handleSubmitRecovery,
  isSubmitting,
  isRecovered,
  recoveredLocation,
  recoveredDate,
  handleInputChange,
  handleDateChange,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  if (!showModal && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop with subtle animation */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal container with bounce-in animation */}
      <div
        className={`relative transform transition-all duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        } w-full max-w-md`}
      >
        <div className="bg-[#F0EAD6] rounded-xl shadow-2xl overflow-hidden border border-[#3E2F1C]/10">
          {/* Modal header with decorative stripe */}
          <div className="bg-[#F4A261] h-2 w-full" />

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#3E2F1C]">
                Report Recovery
              </h2>
              <button
                onClick={handleClose}
                className="text-[#9A8C7A] hover:text-[#E76F51] transition-colors duration-200"
                aria-label="Close modal"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitRecovery(e);
              }}
            >
              <div className="space-y-4">
                {/* Location field */}
                <div className="group">
                  <label className="block text-[#3E2F1C] mb-1 font-medium group-hover:text-[#2A9D8F] transition-colors duration-200">
                    Recovered Location
                  </label>
                  <input
                    type="text"
                    name="recoveredLocation"
                    value={recoveredLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-[#9A8C7A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent transition-all duration-200 hover:border-[#9A8C7A]"
                    placeholder="Where was the item found?"
                  />
                </div>

                {/* Date field */}
                <div className="group">
                  <label className="block text-[#3E2F1C] mb-1 font-medium group-hover:text-[#2A9D8F] transition-colors duration-200">
                    Recovery Date
                  </label>
                  <DatePicker
                    selected={recoveredDate}
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border border-[#9A8C7A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent transition-all duration-200 hover:border-[#9A8C7A]"
                    required
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                {/* User info */}
                {users && (
                  <div className="bg-white p-3 rounded-lg border border-[#9A8C7A]/20 hover:shadow-sm transition-shadow duration-200">
                    <p className="text-[#3E2F1C] font-medium">
                      {users.displayName || "User"}
                    </p>
                    <p className="text-[#9A8C7A] text-sm">{users.email}</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-[#9A8C7A] text-[#3E2F1C] hover:bg-[#9A8C7A]/10 hover:border-[#3E2F1C] transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isRecovered}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                    isSubmitting || isRecovered
                      ? "bg-[#9A8C7A] cursor-not-allowed"
                      : "bg-[#F4A261] hover:bg-[#E76F51] hover:shadow-md transform hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
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
                      Submitting...
                    </span>
                  ) : isRecovered ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Already Recovered
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Submit Recovery
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryModal;
