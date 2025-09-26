import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../Contexts/UserContext";
import { longOut } from "../LoginLogic/logOut";

const Navbar = () => {
  const { userData } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const linkClasses =
    "relative transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full";
  const activeClasses = "text-[#2F4F1F] after:w-full font-bold";

  const menuVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.28,
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.18 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/product-list", label: "Marketplace" },
    { path: "/blogs", label: "Blogs" },
    { path: "/calculator", label: "Farm Calculator" },
    { path: "/add", label: "Add Goods" },
  ];

  const getInitials = () => {
    if (userData?.displayName) {
      return userData?.displayName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }
    return "US";
  };

  return (
    <div className="bg-[#8FA31E] w-full h-[80px] lg:h-[100px] mx-auto flex items-center px-4 shadow-lg shadow-[#556B2F]/50 sticky top-0 z-[100]">
      {/* Logo + Title */}
      <NavLink to="/" onClick={() => setIsOpen(false)}>
        <div className="logo-container flex items-center cursor-pointer text-white font-bold text-xl lg:text-2xl">
          <img src="/logo.png" alt="Logo" width={60} />
          <p className="transition-transform duration-300 hover:scale-105">
            Harvesting Friend
          </p>
        </div>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 ml-auto text-white font-semibold lg:text-lg">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? activeClasses : "hover:text-[#2F4F1F]"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Desktop Avatar */}
      {userData ? (
        <div className="relative ml-4 hidden md:flex items-center">
          <div
            className="cursor-pointer w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg"
            onClick={() => setAvatarMenuOpen((prev) => !prev)}
          >
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              getInitials()
            )}
          </div>

          {/* Avatar Dropdown */}
          <AnimatePresence>
            {avatarMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-14 mt-2 bg-lime-100 rounded-md shadow-lg py-3 z-50 text-lime-900"
              >
                <div className="px-4 py-2 border-b">
                  <p className="font-bold">{userData.displayName || "User"}</p>
                  <p className="text-sm text-lime-600">
                    {userData.email || "No Email"}
                  </p>
                </div>
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-lime-50 hover:text-black"
                  onClick={() => setAvatarMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/dashboad"
                  className="block px-4 py-2 hover:bg-lime-50 hover:text-black"
                  onClick={() => setAvatarMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    longOut();
                    setAvatarMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-lime-50 hover:text-black"
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <NavLink to="/login" onClick={() => setIsOpen(false)}>
          <button className="hidden md:block bg-[#556B2F] border-none text-white font-bold px-4 py-2 lg:px-6 lg:py-3 rounded transition duration-300 hover:bg-[#6B8E23] hover:scale-105 cursor-pointer ml-4">
            Sign In
          </button>
        </NavLink>
      )}

      {/* Mobile Hamburger Button */}
      <div className="ml-auto lg:hidden">
        <button
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Toggle menu"
          className="text-white p-2 rounded-md transition-transform duration-200 hover:scale-110"
        >
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-[80px] right-0 w-[220px] bg-[#8FA31E] flex flex-col items-start py-4 space-y-3 lg:hidden shadow-lg shadow-[#556B2F]/50 rounded-md z-50 px-4 text-left"
          >
            {/* User Info for Mobile */}
            {userData && (
              <div className="w-full border-b border-lime-300 pb-3 mb-2">
                <p className="font-bold text-white text-left">{userData.displayName || "User"}</p>
                <p className="text-sm text-white text-left">{userData.email || "No Email"}</p>
              </div>
            )}

            {/* Navigation Links */}
            {links.map((link) => (
              <motion.div key={link.path} variants={itemVariants} className="w-full">
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkClasses} w-full text-left px-3 py-2 rounded-md ${
                      isActive ? activeClasses : "text-white hover:text-[#2F4F1F]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            {/* Profile, Dashboard, Sign Out Links */}
            {userData && (
              <>
                <motion.div variants={itemVariants} className="w-full">
                  <NavLink
                    to="/profile"
                    className="block w-full text-left px-3 py-2 hover:bg-lime-50 hover:text-black rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </NavLink>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full">
                  <NavLink
                    to="/dashboad"
                    className="block w-full text-left px-3 py-2 hover:bg-lime-50 hover:text-black rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full">
                  <button
                    onClick={() => {
                      longOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-lime-50 hover:text-black rounded"
                  >
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}

            {/* Login Button */}
            {!userData && (
              <motion.div variants={itemVariants} className="w-full flex justify-start">
                <NavLink to="/login" className="w-full text-left">
                  <button className="bg-[#556B2F] text-white font-bold px-4 py-2 rounded transition duration-200 hover:bg-[#6B8E23] hover:scale-105 w-full text-left">
                    Log In
                  </button>
                </NavLink>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
