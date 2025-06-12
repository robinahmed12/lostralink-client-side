import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
    <nav className="bg-[#F4A261] py-2 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-[#3E2F1C] font-bold text-xl hover:text-[#2A9D8F] transition-colors duration-300 flex items-center"
            >
              <span className="mr-1">🔗</span>
              <span className="hidden sm:inline">LostraLink</span>
              <span className="sm:hidden">LL</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-[#2A9D8F] text-white"
                    : "text-[#3E2F1C] hover:bg-[#F0EAD6] hover:text-[#3E2F1C]"
                } transition-all duration-300`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/allItems"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-[#2A9D8F] text-white"
                    : "text-[#3E2F1C] hover:bg-[#F0EAD6] hover:text-[#3E2F1C]"
                } transition-all duration-300`
              }
            >
              Lost & Found
            </NavLink>

            {users && (
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-[#2A9D8F] text-white"
                      : "text-[#3E2F1C] hover:bg-[#F0EAD6] hover:text-[#3E2F1C]"
                  } transition-all duration-300`
                }
              >
                About Us
              </NavLink>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!users ? (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-colors duration-300"
              >
                Login
              </NavLink>
            ) : (
              <>
                <button
                  onClick={handleLogOut}
                  className="hidden md:block px-4 py-2 rounded-md text-sm font-medium bg-[#E76F51] text-white hover:bg-[#d45a3d] transition-colors duration-300"
                >
                  Logout
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none group"
                    aria-label="User menu"
                    aria-expanded={isProfileOpen}
                  >
                    <div className="relative">
                      <img
                        className="h-8 w-8 rounded-full object-cover border-2 border-[#3E2F1C] hover:border-[#2A9D8F] transition-all duration-300"
                        src={
                          users?.photoURL || "https://via.placeholder.com/32"
                        }
                        alt="Profile"
                      />
                      {/* Dropdown indicator */}
                      <svg
                        className={`w-4 h-4 absolute -bottom-1 -right-1 text-[#3E2F1C] transition-transform duration-300 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#F0EAD6] rounded-md shadow-lg py-1 z-50 border border-[#9A8C7A] animate-fadeIn">
                      <div className="px-4 py-2 border-b border-[#9A8C7A]">
                        <p className="text-sm font-medium text-[#3E2F1C]">
                          {users?.displayName || "User"}
                        </p>
                        <p className="text-xs text-[#9A8C7A]">{users?.email}</p>
                      </div>
                      <NavLink
                        to="/add-item"
                        className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Add Lost & Found Item
                      </NavLink>
                      <NavLink
                        to="/recovered-items"
                        className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Recovered Items
                      </NavLink>
                      <NavLink
                        to="/manage-items"
                        className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Manage My Items
                      </NavLink>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-colors duration-300 md:hidden"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#3E2F1C] hover:text-[#2A9D8F] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F0EAD6] animate-slideDown">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/allItems"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Lost & Found Items
            </NavLink>

            {users ? (
              <>
                <NavLink
                  to="/add-item"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Item
                </NavLink>
                <NavLink
                  to="/recovered-items"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Recovered Items
                </NavLink>
                <NavLink
                  to="/manage-items"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Manage My Items
                </NavLink>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-colors duration-300"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
