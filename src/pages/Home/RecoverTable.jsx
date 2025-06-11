import React from "react";

const RecoverTable = ({ item }) => {
  const { title, recoveredLocation, recoveredDate, itemImage, status } = item;

  // Format date to be more readable
  const formattedDate = new Date(recoveredDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#F0EAD6] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {itemImage && (
              <div className="w-full md:w-1/4 h-48 bg-[#FFFAF0] rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={itemImage}
                  alt={title}
                  className="object-cover h-full w-full"
                />
              </div>
            )}

            <div className={`flex-1 ${itemImage ? "md:w-3/4" : "w-full"}`}>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-[#3E2F1C]">
                    {title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      status === "claimed"
                        ? "bg-[#2A9D8F] text-white"
                        : "bg-[#F4A261] text-[#3E2F1C]"
                    }`}
                  >
                    {status === "claimed" ? "Claimed" : "Unclaimed"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#9A8C7A]">
                      Recovered Location
                    </p>
                    <p className="text-[#3E2F1C]">{recoveredLocation}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#9A8C7A]">
                      Recovered Date
                    </p>
                    <p className="text-[#3E2F1C]">{formattedDate}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-[#F4A261] text-[#3E2F1C] rounded-md hover:bg-[#E76F51] hover:text-white transition-colors duration-200">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-[#3E2F1C] text-[#3E2F1C] rounded-md hover:bg-[#3E2F1C] hover:text-[#FFFAF0] transition-colors duration-200">
                    Contact Finder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverTable;
