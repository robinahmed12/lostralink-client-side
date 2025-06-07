import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaSearch,
  FaPlus,
  FaBell,
  FaUser,
} from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const socialLinks = [
    { icon: <FaFacebook />, name: "Facebook", url: "#" },
    { icon: <FaInstagram />, name: "Instagram", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", url: "#" },
    { icon: <FaLinkedin />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", url: "#" },
  ];

  const quickActions = [
    { icon: <FaSearch />, name: "Search Items", url: "/search" },
    { icon: <FaPlus />, name: "Post Lost Item", url: "/post-lost" },
    { icon: <FaPlus />, name: "Post Found Item", url: "/post-found" },
    { icon: <FaBell />, name: "Track My Item", url: "/track" },
    { icon: <FaUser />, name: "My Account", url: "/account" },
  ];

  const linkColumns = [
    {
      title: "Navigation",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Contact", url: "/contact" },
        { name: "FAQs", url: "/faqs" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
        { name: "Report a Problem", url: "/report" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Safety Guidelines", url: "/safety" },
        { name: "Community Rules", url: "/community" },
        { name: "Sitemap", url: "/sitemap" },
      ],
    },
  ];

  return (
    <footer
      className={`bg-[#3E2F1C]  text-[#FFFAF0] transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto lg:pl-24 px-5  py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#F4A261]">Lost & Found</h2>
            <p className="text-[#9A8C7A]">
              Connecting lost items with their owners through community power.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFFAF0] hover:text-[#2A9D8F] transition-colors duration-300 text-xl"
                  aria-label={social.name}
                  onMouseEnter={() => setHoveredItem(`social-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="relative">
                    {social.icon}
                    {hoveredItem === `social-${index}` && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2A9D8F] animate-scale-x"></span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-[#F4A261] mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.url}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                    hoveredItem === `action-${index}`
                      ? "bg-[#F0EAD6] text-[#3E2F1C] shadow-md"
                      : "hover:bg-[#F0EAD6]/20"
                  }`}
                  onMouseEnter={() => setHoveredItem(`action-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span
                    className={`transition-transform duration-300 ${
                      hoveredItem === `action-${index}` ? "scale-110" : ""
                    }`}
                  >
                    {action.icon}
                  </span>
                  <span className="text-sm">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {linkColumns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="text-lg font-semibold text-[#F4A261] mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className={`relative inline-block py-1 text-[#9A8C7A] hover:text-[#FFFAF0] transition-colors duration-300 ${
                        hoveredItem === `link-${colIndex}-${linkIndex}`
                          ? "text-[#FFFAF0]"
                          : ""
                      }`}
                      onMouseEnter={() =>
                        setHoveredItem(`link-${colIndex}-${linkIndex}`)
                      }
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 bottom-0 w-0 h-0.5 bg-[#2A9D8F] transition-all duration-300 ${
                          hoveredItem === `link-${colIndex}-${linkIndex}`
                            ? "w-full"
                            : ""
                        }`}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-[#F4A261] mb-4">
              Stay Updated
            </h3>
            <p className="text-[#9A8C7A] mb-4">
              Subscribe to get updates on recovered items and tips.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-lg bg-[#F0EAD6] text-[#3E2F1C] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
              />
              <button
                type="submit"
                className="bg-[#2A9D8F] hover:bg-[#21867a] text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#9A8C7A]/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#9A8C7A] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Lost & Found. All rights reserved.
          </div>
          <div className="text-[#9A8C7A] text-sm text-center md:text-right">
            <p>This platform does not guarantee item recovery.</p>
            <p className="mt-1">
              Made with <span className="text-[#E76F51]">♥</span> for reuniting
              people with their belongings
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <div className="relative group">
          <button className="w-14 h-14 rounded-full bg-[#F4A261] text-white flex items-center justify-center shadow-lg hover:bg-[#e69148] transition-colors duration-300">
            <FaPlus className="text-xl" />
          </button>
          <div className="absolute bottom-full right-0 mb-4 hidden group-hover:flex flex-col space-y-2">
            {quickActions.slice(1, 3).map((action, index) => (
              <Link
                key={index}
                to={action.url}
                className="w-40 bg-[#3E2F1C] text-[#FFFAF0] px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-[#2A9D8F] transition-colors duration-300"
              >
                {action.icon}
                <span>{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
