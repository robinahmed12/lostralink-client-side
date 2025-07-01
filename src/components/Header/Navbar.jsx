import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LostraLinkLogo from "../LostraLinkLogo";
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiCheckCircle,
  FiSettings,
  FiInfo,
  FiMail,
  FiLogIn,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiX,
  FiMenu,
  FiSearch,
  FiPackage,
} from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { users, signOutUser, setUser } = useContext(AuthContext);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  // Common nav link style function
  const getNavLinkStyle = (isActive) => `
    px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 flex items-center
    ${
      isActive
        ? "bg-[#2A9D8F] text-white shadow-md"
        : "text-[#3E2F1C] hover:bg-[#F0EAD6]/90 hover:text-[#3E2F1C]"
    }
  `;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-[#F4A261]/95 to-[#E76F51]/95 shadow-md py-1 backdrop-blur-sm"
          : "bg-gradient-to-r from-[#F4A261] to-[#E76F51] py-2"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with subtle animation */}
          <div className="flex items-center flex-shrink-0">
            <NavLink
              to="/"
              className="text-[#3E2F1C] font-bold text-xl hover:text-[#2A9D8F] transition-colors duration-300 flex items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <div className="group-hover:rotate-12 transition-transform duration-300">
                  <LostraLinkLogo size={scrolled ? 40 : 50} />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-[#3E2F1C] group-hover:text-[#2A9D8F] transition-colors duration-300 hidden sm:block">
                  LostraLink
                </h1>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) => getNavLinkStyle(isActive)}
            >
              <FiHome className="mr-2" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/allItems"
              className={({ isActive }) => getNavLinkStyle(isActive)}
            >
              <FiSearch className="mr-2" />
              <span>Lost & Found</span>
            </NavLink>

            {users && (
              <>
                <NavLink
                  to="/add-item"
                  className={({ isActive }) => getNavLinkStyle(isActive)}
                >
                  <FiPlusSquare className="mr-2" />
                  <span>Add Item</span>
                </NavLink>

                <NavLink
                  to="/recovered-items"
                  className={({ isActive }) => getNavLinkStyle(isActive)}
                >
                  <FiCheckCircle className="mr-2" />
                  <span>Recovered</span>
                </NavLink>

                <NavLink
                  to="/manage-items"
                  className={({ isActive }) => getNavLinkStyle(isActive)}
                >
                  <FiSettings className="mr-2" />
                  <span>Manage</span>
                </NavLink>
              </>
            )}

            <NavLink
              to="/about"
              className={({ isActive }) => getNavLinkStyle(isActive)}
            >
              <FiInfo className="mr-2" />
              <span>About</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => getNavLinkStyle(isActive)}
            >
              <FiMail className="mr-2" />
              <span>Contact</span>
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) => getNavLinkStyle(isActive)}
            >
              <FiBookOpen className="mr-2" />
              <span>Blog</span>
            </NavLink>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {!users ? (
              <NavLink
                to="/login"
                className="px-4 hidden md:flex items-center py-2 rounded-lg text-sm lg:text-base font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <FiLogIn className="mr-2" />
                <span>Login</span>
              </NavLink>
            ) : (
              <>
                <button
                  onClick={handleLogOut}
                  className="hidden md:flex items-center px-4 py-2 rounded-lg text-sm lg:text-base font-medium bg-[#E76F51] text-white hover:bg-[#d45a3d] transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <FiLogOut className="mr-2" />
                  <span>Logout</span>
                </button>

                <div className="relative">
                  <div
                    className="group"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <button
                      className="flex items-center space-x-1 focus:outline-none"
                      aria-label="User menu"
                      aria-expanded={isProfileOpen}
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-[#2A9D8F] rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <img
                          className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full object-cover border-2 border-[#3E2F1C] hover:border-[#2A9D8F] transition-all duration-300 relative z-10 ${
                            scrolled ? "h-8 w-8" : "h-8 w-8"
                          }`}
                          src={
                            users?.photoURL || "https://via.placeholder.com/40"
                          }
                          alt="Profile"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/40";
                          }}
                        />
                        {/* Online status indicator */}
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-[#F0EAD6]"></div>
                      </div>

                      {/* Dropdown arrow indicator */}
                      <FiChevronDown
                        className={`w-4 h-4 text-[#3E2F1C] transition-transform duration-200 hidden md:block ${
                          isProfileOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right bg-[#F0EAD6] rounded-lg shadow-xl py-1 z-50 border border-[#9A8C7A] divide-y divide-[#9A8C7A]/30 transition-all duration-300">
                        <div className="px-4 py-3">
                          <p className="text-sm font-medium text-[#3E2F1C] truncate">
                            {users?.displayName || "User"}
                          </p>
                          <p className="text-xs text-[#9A8C7A] truncate">
                            {users?.email || "user@example.com"}
                          </p>
                        </div>

                        <div className="py-1">
                          <NavLink
                            to="/profile"
                            className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-200 flex items-center"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FiUser className="mr-2" />
                            My Profile
                          </NavLink>
                        </div>

                        <div className="py-1">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-all duration-200 flex items-center"
                            onClick={handleLogOut}
                          >
                            <FiLogOut className="mr-2" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#3E2F1C] hover:text-[#2A9D8F] focus:outline-none p-2 rounded-lg hover:bg-[#F0EAD6]/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-[#F0EAD6] px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
          <NavLink
            to="/"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiHome className="mr-3" />
            Home
          </NavLink>

          <NavLink
            to="/allItems"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiSearch className="mr-3" />
            Lost & Found
          </NavLink>

          {users && (
            <>
              <NavLink
                to="/add-item"
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiPlusSquare className="mr-3" />
                Add Item
              </NavLink>

              <NavLink
                to="/recovered-items"
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiCheckCircle className="mr-3" />
                Recovered Items
              </NavLink>

              <NavLink
                to="/manage-items"
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiSettings className="mr-3" />
                Manage Items
              </NavLink>
            </>
          )}

          <NavLink
            to="/about"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiInfo className="mr-3" />
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className="block px-4 py-3 rounded-lg text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-all duration-300 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiMail className="mr-3" />
            Contact Us
          </NavLink>

          {!users ? (
            <NavLink
              to="/login"
              className="flex items-center justify-center px-4 py-3 rounded-lg text-base font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-all duration-300 mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiLogIn className="mr-2" />
              Login / Register
            </NavLink>
          ) : (
            <button
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-all duration-300 mt-2"
              onClick={handleLogOut}
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
