import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LostraLinkLogo from "../LostraLinkLogo";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { users, signOutUser, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        console.log("signout successful");
        setUser(null);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] py-2 shadow-lg sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo with subtle animation */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-[#3E2F1C] font-bold text-xl hover:text-[#2A9D8F] transition-colors duration-300 flex items-center group"
            >
              <header className="flex items-center p-4">
                <div className="group-hover:rotate-12 transition-transform duration-300">
                  <LostraLinkLogo size={55} />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-[#3E2F1C] group-hover:text-[#2A9D8F] transition-colors duration-300">
                  LostraLink
                </h1>
              </header>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full lg:text-lg font-medium relative overflow-hidden ${
                  isActive
                    ? "bg-[#2A9D8F] text-white"
                    : "text-[#3E2F1C] hover:bg-[#F0EAD6]/80 hover:text-[#3E2F1C]"
                } transition-all duration-300 group`
              }
            >
              <span className="relative z-10">Home</span>
              {({ isActive }) =>
                !isActive && (
                  <span className="absolute inset-0 bg-[#F4A261] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                )
              }
            </NavLink>

            <NavLink
              to="/allItems"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full lg:text-lg font-medium relative overflow-hidden ${
                  isActive
                    ? "bg-[#2A9D8F] text-white"
                    : "text-[#3E2F1C] hover:bg-[#F0EAD6]/80 hover:text-[#3E2F1C]"
                } transition-all duration-300 group`
              }
            >
              <span className="relative z-10">Lost & Found</span>
              {({ isActive }) =>
                !isActive && (
                  <span className="absolute inset-0 bg-[#F4A261] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                )
              }
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-lg font-medium relative overflow-hidden ${
                  isActive
                    ? "bg-[#2A9D8F] text-white"
                    : "text-[#3E2F1C] hover:bg-[#F0EAD6]/80 hover:text-[#3E2F1C]"
                } transition-all duration-300 group`
              }
            >
              <span className="relative z-10">About Us</span>
              {({ isActive }) =>
                !isActive && (
                  <span className="absolute inset-0 bg-[#F4A261] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                )
              }
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full lg:text-lg font-medium relative overflow-hidden ${
                  isActive
                    ? "bg-[#2A9D8F] text-white"
                    : "text-[#3E2F1C] hover:bg-[#F0EAD6]/80 hover:text-[#3E2F1C]"
                } transition-all duration-300 group`
              }
            >
              <span className="relative z-10">Contact Us</span>
              {({ isActive }) =>
                !isActive && (
                  <span className="absolute inset-0 bg-[#F4A261] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                )
              }
            </NavLink>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!users ? (
              <div className="relative group">
                <NavLink
                  to="/login"
                  className="px-8 hidden md:inline-block  py-2 rounded-lg text-lg font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Login
                </NavLink>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#3E2F1C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Access your account
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogOut}
                  className="hidden md:block px-4 py-2 rounded-full text-lg font-medium bg-[#E76F51] text-white hover:bg-[#d45a3d] transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Logout
                </button>

                <div className="relative">
                  <div
                    className="group"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <button
                      className="flex items-center space-x-2 focus:outline-none"
                      aria-label="User menu"
                      aria-expanded={isProfileOpen}
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-[#2A9D8F] rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <img
                          className="h-11 w-11 rounded-full object-cover border-2 border-[#3E2F1C] hover:border-[#2A9D8F] transition-all duration-300 relative z-10"
                          src={
                            users?.photoURL || "https://via.placeholder.com/32"
                          }
                          alt="Profile"
                        />
                        {/* Animated online status indicator */}
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#F0EAD6] animate-pulse"></div>
                      </div>

                      {/* Display name tooltip on hover */}
                      <div className="absolute  top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#3E2F1C] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        {users?.displayName || "User"}
                      </div>

                      {/* Dropdown arrow indicator */}
                      <svg
                        className={`w-4 h-4 text-[#3E2F1C] transition-transform duration-200 ${
                          isProfileOpen ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Enhanced Profile Dropdown with animation */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right bg-[#F0EAD6] rounded-lg shadow-xl py-1 z-50 border border-[#9A8C7A] ring-1 ring-black ring-opacity-5 transition-all duration-300">
                        <div className="px-4 py-3 border-b border-[#9A8C7A]/30">
                          <p className="text-sm font-medium text-[#3E2F1C]">
                            {users?.displayName || "User"}
                          </p>
                          <p className="text-xs text-[#9A8C7A] truncate">
                            {users?.email || "user@example.com"}
                          </p>
                        </div>

                        <NavLink
                          to="/add-item"
                          className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-200 flex items-center"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Add Lost & Found Item
                        </NavLink>

                        <NavLink
                          to="/recovered-items"
                          className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-200 flex items-center"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          All Recovered Items
                        </NavLink>

                        <NavLink
                          to="/manage-items"
                          className=" block flex px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-200 items-center"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                          </svg>
                          Manage My Items
                        </NavLink>

                        <div className="border-t border-[#9A8C7A]/30 my-1"></div>

                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-all duration-200 flex items-center md:hidden"
                          onClick={handleLogOut}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden  flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#3E2F1C] hover:text-[#2A9D8F] focus:outline-none p-2 rounded-full hover:bg-[#F0EAD6]/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6 transform rotate-90 transition-transform duration-300"
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
              ) : (
                <svg
                  className="h-8 w-8 transform hover:rotate-180 transition-transform duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation with slide animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-[#F0EAD6] px-2 pt-2 pb-4 space-y-2 sm:px-3 shadow-inner">
          <NavLink
            to="/"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavLink>

          <NavLink
            to="/allItems"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Lost & Found
          </NavLink>

          {users && (
            <>
              <NavLink
                to="/add-item"
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Lost & Found Item
              </NavLink>

              <NavLink
                to="/recovered-items"
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                All Recovered Items
              </NavLink>

              <NavLink
                to="/manage-items"
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Manage My Items
              </NavLink>
            </>
          )}

          <NavLink
            to="/about"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            About Us
          </NavLink>

          {!users ? (
            <NavLink
              to="/login"
              className="block px-4 py-3 rounded-lg text-base font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-all duration-300 flex items-center justify-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login / Register
            </NavLink>
          ) : (
            <button
              className="block w-full px-4 py-3 rounded-lg text-base font-medium text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-all duration-300 flex items-center justify-center mt-2"
              onClick={handleLogOut}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
