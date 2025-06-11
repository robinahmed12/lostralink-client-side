import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Banner from "../../section/Banner";
import CategoriesSection from "../../section/CategoriesSection";
import HowItWorks from "../../section/HowItWorks";
import TestimonialsSection from "../../section/TestimonialsSection";
import PostItemSection from "../../section/PostItemSection";
import ItemDetails from "../ItemDetails";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const scaleUp = {
  hover: { scale: 1.03, transition: { duration: 0.3 } },
  tap: { scale: 0.98 },
};

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#FFFAF0] min-h-screen"
    >
      {/* Banner with animation */}
      <AnimatedSection>
        <motion.div variants={itemVariants}>
          <Banner />
        </motion.div>
      </AnimatedSection>

      <AnimatedSection>
        <motion.div variants={itemVariants}>
          <ItemDetails />
        </motion.div>
      </AnimatedSection>

      {/* Categories Section */}
      <AnimatedSection>
        <motion.div
          variants={itemVariants}
          className="py-12 px-4 sm:px-6 lg:px-8"
        >
          <CategoriesSection />
        </motion.div>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <motion.div
          variants={itemVariants}
          className="py-12 px-4 sm:px-6 lg:px-8 "
        >
          <HowItWorks />
        </motion.div>
      </AnimatedSection>

      {/* Post Item Section */}
      <AnimatedSection>
        <motion.div
          variants={itemVariants}
          className="py-12 px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={scaleUp} whileHover="hover" whileTap="tap">
            <PostItemSection />
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <motion.div
          variants={itemVariants}
          className="py-12 px-4 sm:px-6 lg:px-8"
        >
          <TestimonialsSection />
        </motion.div>
      </AnimatedSection>
    </motion.div>
  );
};

export default Home;
