import React, { useEffect, useState } from "react";
import AllItemsCard from "./AllItemsCard";
import {
  FiSearch,
  FiX,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import Container from "../components/Container/Container";

const LostFoundItem = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { loading } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    location: "",
    date: "",
  });
  const [sortOption, setSortOption] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories and locations for filter options
  const categories = [...new Set(items.map((item) => item.category))];
  const allLocations = [...new Set(items.map((item) => item.location))];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://lostra-link-server.vercel.app/allItems"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
        // Don't set filteredItems here - let the effect below handle it
      } catch (err) {
        setError(err.message);
      }
    };

    document.title = "Lost and Found Items";
    fetchItems();
  }, []);

  // Main filtering and sorting effect
  useEffect(() => {
    let result = [...items];

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }
    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }
    if (filters.location) {
      result = result.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.date) {
      const filterDate = new Date(filters.date);
      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === filterDate.toDateString();
      });
    }

    // Apply sorting
    if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredItems(result);
  }, [searchTerm, items, filters, sortOption]); // Proper dependencies

  const clearSearch = () => {
    setSearchTerm("");
    setFilters({
      category: "",
      status: "",
      location: "",
      date: "",
    });
    setSortOption("newest");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex justify-center items-center">
        <div className="text-[#E76F51] text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pb-20 bg-[#FFFAF0] pt-32 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="">
          {/* Header Section */}
          <div className="mb-5 text-center">
            <h1 className="text-3xl font-bold text-[#3E2F1C] mb-2">
              Lost & Found Items
            </h1>
            <p className="text-[#9A8C7A] max-w-2xl mx-auto">
              Browse through lost and found items in your community. Help
              reunite people with their belongings.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8  flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="w-full md:w-2/3 relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search by title, location, or category..."
                  className="w-full py-3 px-4 pr-10 rounded-lg border border-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent bg-[#F0EAD6] text-[#3E2F1C] placeholder-[#9A8C7A] transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm ? (
                  <button
                    onClick={clearSearch}
                    className="absolute right-10 text-[#9A8C7A] hover:text-[#E76F51] transition-colors duration-200"
                  >
                    <FiX size={20} />
                  </button>
                ) : null}
                <div className="absolute right-3 text-[#9A8C7A]">
                  <FiSearch size={20} />
                </div>
              </div>
              {isSearching && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F4A261] animate-pulse"></div>
              )}
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-[#F4A261] text-white rounded-lg hover:bg-[#E76F51] transition-colors duration-200"
            >
              <FiFilter />
              <span>Filters</span>
              {isFilterOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>

          {/* Filter Dropdown (Mobile) */}
          {isFilterOpen && (
            <div className="md:hidden mb-6 bg-[#F0EAD6] p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261]"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261]"
                  >
                    <option value="">All Statuses</option>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261]"
                  >
                    <option value="">All Locations</option>
                    {allLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-[#F0EAD6] p-4 rounded-lg shadow-md h-fit sticky top-4">
              <h3 className="text-lg font-semibold text-[#3E2F1C] mb-4 flex items-center gap-2">
                <FiFilter /> Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261] hover:border-[#F4A261] transition-colors"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261] hover:border-[#F4A261] transition-colors"
                  >
                    <option value="">All Statuses</option>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261] hover:border-[#F4A261] transition-colors"
                  >
                    <option value="">All Locations</option>
                    {allLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261] hover:border-[#F4A261] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2F1C] mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full p-2 border border-[#9A8C7A] rounded bg-white text-[#3E2F1C] focus:ring-[#F4A261] focus:border-[#F4A261] hover:border-[#F4A261] transition-colors"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                  </select>
                </div>

                {(filters.category ||
                  filters.status ||
                  filters.location ||
                  filters.date ||
                  sortOption !== "newest") && (
                  <button
                    onClick={clearSearch}
                    className="w-full mt-2 py-2 px-4 bg-[#E76F51] text-white rounded hover:bg-[#D45F41] transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Items Section */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-[#9A8C7A] text-sm">
                  Showing {filteredItems.length}{" "}
                  {filteredItems.length === 1 ? "item" : "items"}
                </div>
                {filteredItems.length > 0 && (
                  <div className="text-sm text-[#9A8C7A]">
                    Sorted by:{" "}
                    {sortOption === "newest"
                      ? "Newest"
                      : sortOption === "oldest"
                      ? "Oldest"
                      : sortOption === "title-asc"
                      ? "Title (A-Z)"
                      : "Title (Z-A)"}
                  </div>
                )}
              </div>

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="text-center text-[#9A8C7A] py-12 bg-[#F0EAD6] rounded-lg">
                  <p className="text-xl mb-2">
                    {searchTerm ||
                    filters.category ||
                    filters.status ||
                    filters.location ||
                    filters.date
                      ? "No items match your filters."
                      : "No items found."}
                  </p>
                  <button
                    onClick={clearSearch}
                    className="mt-4 py-2 px-6 bg-[#2A9D8F] text-white rounded-lg hover:bg-[#1E7D71] transition-colors duration-200"
                  >
                    {searchTerm ||
                    filters.category ||
                    filters.status ||
                    filters.location ||
                    filters.date
                      ? "Clear filters"
                      : "Refresh"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <AllItemsCard key={item._id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LostFoundItem;
