import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaMobileAlt,
  FaPaw,
  FaKey,
  FaWallet,
  FaLaptop,
  FaGlasses,
  FaBook,
  FaHeadphones,
  FaUmbrella,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import Container from "../components/Container/Container";

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Bags",
      icon: <FaBriefcase className="text-3xl" />,
      color: "bg-[#F4A261]",
    },
    {
      name: "Electronics",
      icon: <FaMobileAlt className="text-3xl" />,
      color: "bg-[#2A9D8F]",
    },
    {
      name: "Pets",
      icon: <FaPaw className="text-3xl" />,
      color: "bg-[#E76F51]",
    },
    {
      name: "Keys",
      icon: <FaKey className="text-3xl" />,
      color: "bg-[#F4A261]",
    },
    {
      name: "Wallets",
      icon: <FaWallet className="text-3xl" />,
      color: "bg-[#2A9D8F]",
    },
    {
      name: "Laptops",
      icon: <FaLaptop className="text-3xl" />,
      color: "bg-[#E76F51]",
    },
    {
      name: "Glasses",
      icon: <FaGlasses className="text-3xl" />,
      color: "bg-[#F4A261]",
    },
    {
      name: "Books",
      icon: <FaBook className="text-3xl" />,
      color: "bg-[#2A9D8F]",
    },
    {
      name: "Headphones",
      icon: <FaHeadphones className="text-3xl" />,
      color: "bg-[#E76F51]",
    },
    {
      name: "Umbrellas",
      icon: <FaUmbrella className="text-3xl" />,
      color: "bg-[#F4A261]",
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/items?category=${category.toLowerCase()}`);
  };

  return (
    <section className="py-12 bg-[#FFFAF0]">
      <Container paddingY="12">
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-[#3E2F1C]">
            Popular Categories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4A261] to-[#2A9D8F] mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`${category.color} bg-opacity-80 hover:bg-opacity-100 p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg flex flex-col items-center justify-center text-[#3E2F1C]`}
              data-aos="zoom-in"
              data-aos-delay={300 + index * 50}
            >
              <div className="mb-3">{category.icon}</div>
              <h3 className="font-medium text-center">{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Marquee Section */}
        <div data-aos="fade-up" data-aos-delay="400">
          <Marquee>
            <div className="bg-[#F0EAD6] rounded-lg p-4 overflow-hidden">
              <div className="flex items-center">
                <h3 className="text-[#3E2F1C] font-bold mr-4 whitespace-nowrap">
                  Recently Found Items:
                </h3>
                <div className="marquee-content flex whitespace-nowrap">
                  <span className="mx-4 text-[#9A8C7A]">
                    🎒 Leather backpack found near Central Park
                  </span>
                  <span className="mx-4 text-[#9A8C7A]">
                    📱 iPhone 13 found on subway line 2
                  </span>
                  <span className="mx-4 text-[#9A8C7A]">
                    🔑 Set of car keys found in downtown cafe
                  </span>
                  <span className="mx-4 text-[#9A8C7A]">
                    👓 Designer glasses found at the library
                  </span>
                  <span className="mx-4 text-[#9A8C7A]">
                    💍 Gold ring found at the beach
                  </span>
                </div>
              </div>
            </div>
          </Marquee>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
