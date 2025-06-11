const ItemCard = ({ item }) => {
  const { postType, title, category, location, date, contactName, _id } = item;

  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative h-full group">
      {/* Card Container */}
      <div className="bg-[#F0EAD6] rounded-xl shadow-sm overflow-hidden h-full flex flex-col border border-[#F0EAD6] hover:border-[#F4A261] transition-all duration-300">
        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium shadow-md z-10
          ${postType === "lost" ? "bg-[#E76F51]" : "bg-[#2A9D8F]"}`}
        >
          {postType === "lost" ? "Lost" : "Found"}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold text-[#3E2F1C] mb-3 line-clamp-2">
            {title}
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#9A8C7A]">
                Category
              </span>
              <p className="text-[#3E2F1C] font-medium">{category}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#9A8C7A]">
                Location
              </span>
              <p className="text-[#3E2F1C] font-medium">{location}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#9A8C7A]">
                {postType === "lost" ? "Lost Date" : "Found Date"}
              </span>
              <p className="text-[#3E2F1C] font-medium">{formattedDate}</p>
            </div>

            {contactName && (
              <div>
                <span className="text-xs uppercase tracking-wider text-[#9A8C7A]">
                  Posted By
                </span>
                <p className="text-[#3E2F1C] font-medium">{contactName}</p>
              </div>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="px-6 pb-6">
          <Link
            to={`/details/${_id}`}
            className="block w-full bg-[#F4A261] hover:bg-[#e69555] text-white text-center py-2 px-4 rounded-md transition-all duration-300 group-hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-[#F4A261] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ItemCard
