import React from "react";

const ItemsTable = ({ item }) => {
  const { postType, title, category, description, _id } = item;

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Delete item with id:", _id);
  };

  const handleUpdate = () => {
    // Implement update functionality
    console.log("Update item with id:", _id);
  };

  return (
    <tr className="hover:bg-[#F4A261]/10 transition-all duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${
            postType === "lost"
              ? "bg-[#E76F51] text-white"
              : "bg-[#2A9D8F] text-white"
          }`}
        >
          {postType}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3E2F1C] font-medium">
        {title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3E2F1C]">
        {category}
      </td>
      <td className="px-6 py-4 text-sm text-[#3E2F1C]">
        <div className="line-clamp-2">{description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={handleUpdate}
            className="text-[#3E2F1C] hover:text-[#F4A261] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="text-[#E76F51] hover:text-[#E76F51]/70 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemsTable;
