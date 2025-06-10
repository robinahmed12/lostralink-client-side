import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { users, signOutUser, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        console.log("signout successful");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-[#F4A261] py-2 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="text-[#3E2F1C] font-bold text-xl hover:text-[#2A9D8F] transition-colors duration-300"
              >
                LostraLink
              </NavLink>
            </div>
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

            <>
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
                Lost & Found Items
              </NavLink>
            </>
          </div>

          {/* Auth Section */}
          <div className="flex items-center">
            {!users ? (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-colors duration-300"
              >
                Login
              </NavLink>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative group">
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-[#3E2F1C] hover:border-[#2A9D8F] transition-all duration-300"
                      src={users?.photoURL || "https://via.placeholder.com/32"}
                      alt="Profile"
                    />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#3E2F1C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {users?.displayName || "User"}
                    </span>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#F0EAD6] rounded-md shadow-lg py-1 z-50 border border-[#9A8C7A]">
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
                      All Recovered Items
                    </NavLink>
                    <NavLink
                      to="/manage-items"
                      className="block px-4 py-2 text-sm text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Manage My Items
                    </NavLink>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-colors duration-300"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-[#3E2F1C] hover:text-[#2A9D8F] focus:outline-none">
              <svg
                className="h-6 w-6"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-[#F0EAD6]">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
          >
            Home
          </NavLink>

          {users && (
            <>
              <NavLink
                to="/add-item"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
              >
                Add Item
              </NavLink>
              <NavLink
                to="/recovered-items"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
              >
                Recovered Items
              </NavLink>
              <NavLink
                to="/manage-items"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#3E2F1C] hover:bg-[#2A9D8F] hover:text-white transition-colors duration-300"
              >
                Manage My Items
              </NavLink>
            </>
          )}

          {!users ? (
            <NavLink
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-[#3E2F1C] text-white hover:bg-[#2A9D8F] transition-colors duration-300"
            >
              Login
            </NavLink>
          ) : (
            <button
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#E76F51] hover:bg-[#E76F51] hover:text-white transition-colors duration-300"
              onClick={handleLogOut}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
