import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container/Container";

const TestimonialsSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      quote:
        "I never thought I'd see my laptop again, but thanks to this site, a kind stranger returned it the next day!",
      name: "Amina R.",
      location: "Dhaka",
      item: "Laptop",
      recoveryTime: "1 day",
      lostLocation: "Dhanmondi Cafe",
      foundLocation: "Mirpur",
      rating: 5,
      before: "Left my laptop at a busy cafe",
      after: "Recovered it undamaged the next day",
    },
    {
      id: 2,
      quote:
        "My grandmother's necklace was found and returned within 3 days. This platform restored my faith in humanity.",
      name: "T. Hossain",
      location: "Chittagong",
      item: "Necklace",
      recoveryTime: "3 days",
      lostLocation: "Agrabad",
      foundLocation: "Patenga Beach",
      rating: 5,
      before: "Lost precious family heirloom",
      after: "Kind stranger found it at the beach",
    },
    {
      id: 3,
      quote:
        "As a student, losing my bag with all my notes was devastating. This site helped me get everything back!",
      name: "S. Ahmed",
      location: "Sylhet",
      item: "School Bag",
      recoveryTime: "2 days",
      lostLocation: "Sylhet University",
      foundLocation: "Zindabazar",
      rating: 4,
      before: "Lost my school bag with semester notes",
      after: "Found by a shopkeeper who saw my post",
    },
  ];

  const handleShareStory = () => {
    navigate("/share-story");
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#FFFAF0]">
      <Container>
        <div>
          <div className="text-center  mb-12">
            <h2 className="text-3xl font-bold text-[#3E2F1C] mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-[#9A8C7A] max-w-3xl mx-auto">
              Real people, real reunions. See how our community comes together
              to return what's lost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`relative bg-[#F0EAD6] rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
                  hoveredCard === testimonial.id
                    ? "transform -translate-y-2 shadow-lg"
                    : ""
                }`}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#F4A261] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-[#3E2F1C]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[#9A8C7A]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-[#3E2F1C] italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className="text-[#2A9D8F] font-medium mr-2">
                        Recovered:
                      </span>
                      <span className="text-[#3E2F1C]">{testimonial.item}</span>
                    </div>
                    <div className="text-sm text-[#9A8C7A] mt-1">
                      {testimonial.recoveryTime} • Lost in{" "}
                      {testimonial.lostLocation}
                    </div>
                  </div>

                  <div className="border-t border-[#9A8C7A] border-opacity-20 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-[#FFFAF0] p-2 rounded">
                        <div className="text-xs text-[#9A8C7A]">Before</div>
                        <div className="text-[#3E2F1C]">
                          {testimonial.before}
                        </div>
                      </div>
                      <div className="bg-[#FFFAF0] p-2 rounded">
                        <div className="text-xs text-[#9A8C7A]">After</div>
                        <div className="text-[#3E2F1C]">
                          {testimonial.after}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-[#F4A261]"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs bg-[#2A9D8F] text-white px-2 py-1 rounded-full">
                      Success Story
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleShareStory}
              className="bg-[#F4A261] hover:bg-[#E76F51] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Share Your Success Story
            </button>
            <p className="mt-4 text-[#9A8C7A]">
              Your story could inspire others and help build our community of
              trust.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
