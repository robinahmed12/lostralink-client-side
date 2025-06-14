import { useState } from "react";
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
  FaChevronRight,
  FaPaperPlane,
} from "react-icons/fa";
import LostraLinkLogo from "../LostraLinkLogo";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socialLinks = [
    { icon: <FaFacebook className="text-lg" />, name: "Facebook", url: "#" },
    { icon: <FaInstagram className="text-lg" />, name: "Instagram", url: "#" },
    { icon: <FaTwitter className="text-lg" />, name: "Twitter", url: "#" },
    { icon: <FaLinkedin className="text-lg" />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube className="text-lg" />, name: "YouTube", url: "#" },
  ];

  const quickActions = [
    {
      icon: <FaSearch className="mr-2" />,
      name: "Search Items",
      url: "/search",
    },
    {
      icon: <FaPlus className="mr-2" />,
      name: "Post Lost Item",
      url: "/post-lost",
    },
    {
      icon: <FaPlus className="mr-2" />,
      name: "Post Found Item",
      url: "/post-found",
    },
    { icon: <FaBell className="mr-2" />, name: "Track My Item", url: "/track" },
    { icon: <FaUser className="mr-2" />, name: "My Account", url: "/account" },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic
    setEmail("");
  };

  return (
    <footer className="bg-[#3E2F1C] text-[#FFFAF0] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#F4A261] mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-[#2A9D8F] mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <LostraLinkLogo size={50} />
              <h1 className="ml-3 text-2xl font-bold text-[#F4A261]">
                LostraLink
              </h1>
            </div>
            <p className="text-[#9A8C7A] leading-relaxed">
              Reuniting people with their lost treasures through community power
              and modern technology.
            </p>

            {/* Social Links with Animated Hover */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-full bg-[#F0EAD6]/10 hover:bg-[#F4A261] transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-[#FFFAF0] group-hover:text-[#3E2F1C] transition-colors duration-300">
                    {social.icon}
                  </span>
                  <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-[#9A8C7A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions with Floating Effect */}
          <div>
            <h3 className="text-lg font-semibold text-[#F4A261] mb-6 pb-2 border-b border-[#9A8C7A]/30 relative inline-block">
              Quick Actions
              <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-[#2A9D8F]"></span>
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.url}
                  className="group flex items-center p-3 rounded-lg hover:bg-[#F0EAD6] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="text-[#F4A261] group-hover:text-[#3E2F1C] transition-colors duration-300">
                    {action.icon}
                  </span>
                  <span className="ml-3 text-[#FFFAF0] group-hover:text-[#3E2F1C] transition-colors duration-300">
                    {action.name}
                  </span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#3E2F1C] transition-opacity duration-300">
                    <FaChevronRight className="text-sm" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns with Animated Underline */}
          <div className="grid grid-cols-2 gap-8">
            {linkColumns.map((column, colIndex) => (
              <div key={colIndex}>
                <h3 className="text-lg font-semibold text-[#F4A261] mb-6 pb-2 border-b border-[#9A8C7A]/30 relative inline-block">
                  {column.title}
                  <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-[#2A9D8F]"></span>
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.url}
                        className="group flex items-center text-[#9A8C7A] hover:text-[#FFFAF0] transition-colors duration-300"
                      >
                        <span className="w-2 h-2 mr-2 rounded-full bg-[#F4A261] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                        <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#F4A261] transition-opacity duration-300 transform group-hover:translate-x-1">
                          <FaChevronRight className="text-xs" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter with Interactive Form */}
          <div>
            <h3 className="text-lg font-semibold text-[#F4A261] mb-6 pb-2 border-b border-[#9A8C7A]/30 relative inline-block">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-[#2A9D8F]"></span>
            </h3>
            <p className="text-[#9A8C7A] mb-6">
              Subscribe to get updates on recovered items and community tips.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#F0EAD6] text-[#3E2F1C] placeholder-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#3E2F1C] hover:text-[#E76F51] transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center"
              >
                Subscribe Now
                <FaPaperPlane className="ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#9A8C7A]/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#9A8C7A] text-sm mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} LostraLink. All rights reserved.
          </div>
          <div className="flex flex-col items-center md:items-end space-y-1">
            <p className="text-[#9A8C7A] text-sm">
              Made with <span className="text-[#E76F51]">♥</span> for reuniting
              people
            </p>
            <p className="text-[#9A8C7A] text-xs">
              Platform does not guarantee item recovery
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
            isMenuOpen ? "bg-[#E76F51] rotate-45" : "bg-[#F4A261]"
          }`}
          aria-label="Quick actions"
        >
          <FaPlus className="text-xl text-white" />
        </button>

        {isMenuOpen && (
          <div className="absolute bottom-full right-0 mb-4 space-y-2 animate-fade-in-up">
            {quickActions.slice(1, 4).map((action, index) => (
              <Link
                key={index}
                to={action.url}
                className="flex items-center bg-[#3E2F1C] text-[#FFFAF0] px-4 py-3 rounded-lg shadow-md hover:bg-[#2A9D8F] transition-colors duration-300 whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                {action.icon}
                <span className="ml-2">{action.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
