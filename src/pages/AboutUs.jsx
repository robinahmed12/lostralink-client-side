import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Container from "../components/Container/Container";

const AboutUs = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    document.title = "About Us | Lost & Found";
  }, []);

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    },
  };

  const stats = [
    { value: "10,000+", label: "Successful Reunions" },
    { value: "427", label: "Last Month Alone" },
    { value: "98%", label: "User Satisfaction" },
  ];

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Secure Verification",
      description:
        "Verified user system with identity checks to prevent scams and ensure trust.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Smart Matching",
      description:
        "AI-powered matching algorithm connects lost items with found reports.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Community Alerts",
      description:
        "Real-time notifications for lost items in your neighborhood.",
    },
  ];

  return (
    <section
      className="py-16 px-4 mt-20 bg-base-100"
      style={{ backgroundColor: "#FFFAF0" }}
      ref={ref}
    >
      <Container>
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Hero Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#3E2F1C" }}
            >
              Reconnecting What's Lost
            </h1>
            <div
              className="w-24 h-1.5 bg-primary mx-auto mb-8"
              style={{ backgroundColor: "#F4A261" }}
            ></div>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#9A8C7A" }}
            >
              Our mission is to bridge the gap between lost items and their
              owners through technology and community.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#F0EAD6" }}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="card-body text-center">
                  <h3
                    className="text-4xl font-bold mb-2"
                    style={{ color: "#F4A261" }}
                  >
                    {stat.value}
                  </h3>
                  <p style={{ color: "#3E2F1C" }}>{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            {/* Image */}
            <motion.div className="w-full lg:w-1/2" variants={imageVariants}>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Happy reunion"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white text-lg font-medium">
                    "The joy of reuniting people with their belongings drives us
                    every day."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "#3E2F1C" }}
              >
                Our Story
              </h2>
              <div className="space-y-4" style={{ color: "#3E2F1C" }}>
                <p>
                  Founded in 2020, Lost & Found began as a simple community
                  board to help neighbors return lost items. What started as a
                  local initiative has grown into a nationwide platform serving
                  thousands of users.
                </p>
                <p>
                  We recognized that traditional lost and found methods were
                  inefficient and outdated. Our platform combines cutting-edge
                  technology with human compassion to create meaningful
                  reunions.
                </p>
                <p>
                  Every day, we're inspired by stories of recovered items - from
                  sentimental keepsakes to essential work devices - and the
                  difference they make in people's lives.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div className="mb-16" variants={containerVariants}>
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ color: "#3E2F1C" }}
            >
              How We Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-all"
                  style={{ backgroundColor: "#F0EAD6" }}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-body">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: "#2A9D8F", color: "white" }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#3E2F1C" }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: "#9A8C7A" }}>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="text-center" variants={itemVariants}>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "#3E2F1C" }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: "#9A8C7A" }}
            >
              Join thousands of users who have successfully recovered their lost
              items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn btn-primary px-8 py-3 font-semibold"
                style={{ backgroundColor: "#F4A261", borderColor: "#F4A261" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Report Lost Item
              </motion.button>
              <motion.button
                className="btn btn-outline px-8 py-3 font-semibold"
                style={{ color: "#3E2F1C", borderColor: "#3E2F1C" }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#3E2F1C",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Found Items
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutUs;
