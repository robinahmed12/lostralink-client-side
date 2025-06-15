import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = [
    {
      title: "Lost Something?",
      subtitle: "Report your lost items and get help from our community",
      buttonText: "Report Lost Item",
      link: "/report-lost",
      bgColor: "bg-[#E76F51]/90",
      textColor: "text-white",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Found an Item?",
      subtitle: "Help reunite lost belongings with their owners",
      buttonText: "Report Found Item",
      link: "/report-found",
      bgColor: "bg-[#2A9D8F]/90",
      textColor: "text-white",
      image:
        "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Browse Found Items",
      subtitle: "Check our database of found items",
      buttonText: "View Found Items",
      link: "/found-items",
      bgColor: "bg-[#F4A261]/90",
      textColor: "text-[#3E2F1C]",
      image:
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[70vh] max-h-[600px] min-h-[400px] overflow-hidden bg-[#FFFAF0]">
      {/* Background images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={`bg-${index}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              zIndex: index === currentSlide ? 1 : 0,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentSlide ? 0.7 : 0,
              transition: { duration: 1.5 },
            }}
          />
        ))}
      </div>

      {/* Color overlay */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={`overlay-${currentSlide}`}
          className={`absolute inset-0 ${slides[currentSlide].bgColor}`}
          initial="enter"
          animate="center"
          exit="exit"
          variants={slideVariants}
          custom={direction}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="p-6 sm:p-8 md:p-10 rounded-xl bg-black/10 backdrop-blur-md shadow-xl max-w-3xl mx-auto">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${slides[currentSlide].textColor} mb-4 drop-shadow-md`}
          >
            {slides[currentSlide].title}
          </h1>
          <p
            className={`text-lg sm:text-xl md:text-2xl ${slides[currentSlide].textColor} font-medium drop-shadow-md`}
          >
            {slides[currentSlide].subtitle}
          </p>
          <div className="mt-6">
            <Link
              to={slides[currentSlide].link}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg ${
                currentSlide === 0
                  ? "bg-[#E76F51] hover:bg-[#d45f41] text-white"
                  : currentSlide === 1
                  ? "bg-[#2A9D8F] hover:bg-[#1a8d7f] text-white"
                  : "bg-[#F4A261] hover:bg-[#e49251] text-[#3E2F1C]"
              }`}
            >
              {slides[currentSlide].buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-4 sm:w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-1 sm:p-2 rounded-full transition-all z-10"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-[#3E2F1C]"
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
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-1 sm:p-2 rounded-full transition-all z-10"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-[#3E2F1C]"
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
      </button>
    </div>
  );
};

export default Banner;
