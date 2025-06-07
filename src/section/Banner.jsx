import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide content data with image URLs
  const slides = [
    {
      title: "Lost Something?",
      subtitle: "Report your lost items and get help from our community",
      buttonText: "Report Lost Item",
      link: "/report-lost",
      bgColor: "bg-[#E76F51]/90", // Burnt Red with transparency
      image:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
    },
    {
      title: "Found an Item?",
      subtitle: "Help reunite lost belongings with their owners",
      buttonText: "Report Found Item",
      link: "/report-found",
      bgColor: "bg-[#2A9D8F]/90", // Forest Green with transparency
      image:
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Browse Found Items",
      subtitle: "Check our database of found items",
      buttonText: "View Found Items",
      link: "/found-items",
      bgColor: "bg-[#F4A261]/90", // Deep Mustard with transparency
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1625&q=80",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <div className="relative mt-10  w-full h-[70vh] max-h-[600px] min-h-[400px] overflow-hidden bg-[#FFFAF0]">
        {/* Background slides with images */}
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  opacity: index === currentSlide ? 1 : 0.7,
                }}
              />
              <div className={`absolute inset-0 ${slide.bgColor}`}></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>

        {/* Content slides */}
        <div className="relative h-full w-full">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center ${
                index === currentSlide ? "block" : "hidden"
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                transition: { duration: 0.8 },
              }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFAF0] mb-4 drop-shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: index === currentSlide ? 1 : 0,
                  transition: { delay: 0.2 },
                }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-[#FFFAF0] mb-8 max-w-2xl drop-shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: index === currentSlide ? 1 : 0,
                  transition: { delay: 0.4 },
                }}
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: index === currentSlide ? 1 : 0,
                  transition: { delay: 0.6 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={slide.link}
                  className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg ${
                    index === 0
                      ? "bg-[#E76F51] hover:bg-[#d45f41] text-white"
                      : index === 1
                      ? "bg-[#2A9D8F] hover:bg-[#1a8d7f] text-white"
                      : "bg-[#F4A261] hover:bg-[#e49251] text-[#3E2F1C]"
                  }`}
                >
                  {slide.buttonText}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-[#FFFAF0] w-6" : "bg-[#9A8C7A]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <motion.button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#3E2F1C]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
        <motion.button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#3E2F1C]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Banner;
