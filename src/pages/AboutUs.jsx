import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Image variants for animation
  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Text variants for animation
  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Curated images that match the lost-and-found theme
  const images = [
    {
      src: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Person holding lost keys",
      caption: "Every lost item has a story"
    },
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Community bulletin board",
      caption: "Connecting through community"
    },
    {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Happy person with found wallet",
      caption: "Joy of reunions"
    }
  ];

  return (
    <section 
      className="py-12 px-4 max-w-6xl mx-auto md:px-8 lg:px-16 bg-[#FFFAF0]"
      id="about"
      ref={ref}
    >
      <div className="">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-[#3E2F1C] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Mission to Reconnect
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Images Column - Stacked vertically */}
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover="hover"
                variants={imageVariants}
                className="relative group overflow-hidden rounded-xl shadow-lg border-2 border-[#F4A261]/20"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F1C]/70 to-transparent flex items-end p-4">
                  <p className="text-white font-medium text-lg">
                    {image.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Text Column */}
          <motion.div 
            className="w-full lg:w-1/2 bg-[#F0EAD6] p-6 md:p-8 rounded-xl shadow-sm border border-[#F4A261]/20"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#3E2F1C] border-b-2 border-[#2A9D8F] pb-2">
              Bringing Lost Items Home
            </h3>
            
            <div className="space-y-5 text-[#3E2F1C]">
              <p>
                In a world where we're constantly on the move, losing personal items 
                has become an all-too-common frustration. Our platform was created to 
                transform that moment of panic into hope.
              </p>
              
              <p>
                What began as a local community board in 2020 has grown into a trusted 
                network serving thousands of users nationwide. We combine technology 
                with human compassion to make reunions happen.
              </p>
              
              <div className="bg-[#F4A261]/10 p-4 rounded-lg border-l-4 border-[#2A9D8F]">
                <p className="font-medium italic">
                  "Last month alone, we helped return 427 lost items to their owners - 
                  from sentimental jewelry to essential work devices."
                </p>
              </div>
              
              <ul className="space-y-3 mt-4">
                <li className="flex items-start">
                  <span className="text-[#2A9D8F] mr-3 mt-1">●</span>
                  <span>Secure, verified user system to prevent scams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2A9D8F] mr-3 mt-1">●</span>
                  <span>AI-powered matching for faster reunions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2A9D8F] mr-3 mt-1">●</span>
                  <span>Neighborhood alerts for lost items in your area</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "#E76F51",
                  boxShadow: "0 4px 12px rgba(231, 111, 81, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#F4A261] text-white px-6 py-3 rounded-lg font-medium shadow-md text-center"
              >
                Report Lost Item
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "#2A9D8F",
                  boxShadow: "0 4px 12px rgba(42, 157, 143, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#3E2F1C] text-white px-6 py-3 rounded-lg font-medium shadow-md text-center"
              >
                Browse Found Items
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;