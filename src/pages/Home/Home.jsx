import React, { useContext, useEffect } from "react";
import Banner from "../../section/Banner";
import CategoriesSection from "../../section/CategoriesSection";
import HowItWorks from "../../section/HowItWorks";
import TestimonialsSection from "../../section/TestimonialsSection";
import PostItemSection from "../../section/PostItemSection";
import RecentItems from "../RecentItems";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import Counter from "../../section/Counter";
import FAQSection from "../../section/FAQSection";

const Home = () => {
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Home";
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#FFFAF0] min-h-screen">
      {/* Banner Section */}
      <div>
        <Banner />
      </div>

      {/* Recent Items Section */}
      <div>
        <RecentItems />
      </div>

      {/* Counter Section */}
      <div>
        <Counter />
      </div>

      {/* Categories Section */}
      <div>
        <CategoriesSection />
      </div>

      {/* How It Works Section */}
      <div>
        <HowItWorks />
      </div>

      {/* Post Item Section */}
      <div>
        <PostItemSection />
      </div>

      {/* Testimonials Section */}
      <div>
        <TestimonialsSection />
      </div>

      {/* FAQ Section */}
      <div>
        <FAQSection />
      </div>
    </div>
  );
};

export default Home;
