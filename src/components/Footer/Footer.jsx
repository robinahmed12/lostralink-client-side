import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3E2F1C]  text-[#FFFAF0] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-[#F4A261] font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "About",
                "Contact",
                "FAQs",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-[#9A8C7A] hover:text-[#F4A261] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="text-center md:text-left">
            <h3 className="text-[#F4A261] font-bold text-lg mb-6">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-6">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#F0EAD6] hover:bg-[#F4A261] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook className="text-[#3E2F1C] group-hover:text-white text-xl" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-[#9A8C7A] group-hover:text-[#F4A261] transition-all duration-300">
                  Facebook
                </span>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#F0EAD6] hover:bg-[#F4A261] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTwitter className="text-[#3E2F1C] group-hover:text-white text-xl" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-[#9A8C7A] group-hover:text-[#F4A261] transition-all duration-300">
                  Twitter
                </span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#F0EAD6] hover:bg-[#F4A261] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram className="text-[#3E2F1C] group-hover:text-white text-xl" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-[#9A8C7A] group-hover:text-[#F4A261] transition-all duration-300">
                  Instagram
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#F0EAD6] hover:bg-[#F4A261] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-[#3E2F1C] group-hover:text-white text-xl" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-[#9A8C7A] group-hover:text-[#F4A261] transition-all duration-300">
                  LinkedIn
                </span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#F0EAD6] hover:bg-[#F4A261] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="YouTube"
              >
                <FaYoutube className="text-[#3E2F1C] group-hover:text-white text-xl" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-[#9A8C7A] group-hover:text-[#F4A261] transition-all duration-300">
                  YouTube
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#9A8C7A] text-center text-[#9A8C7A] text-sm">
          <p>© {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
