import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Container from "../components/Container/Container";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What happens after I post a lost item?",
      answer:
        "Your lost item will be added to our database and matched against found items. If a match is found, you'll receive a notification with details of the potential match.",
    },
    {
      question: "How are matches found?",
      answer:
        "Our system uses AI-powered image recognition and keyword matching to compare descriptions of lost and found items. Location and time data are also considered for accurate matches.",
    },
    {
      question: "Is my contact info public?",
      answer:
        "No, your contact information remains private until you choose to share it with a potential match. Initial communication happens through our secure messaging system.",
    },
    {
      question: "How long are found items kept in the system?",
      answer:
        "Found items remain active for 90 days. After this period, they're archived but can still be searched. We recommend checking back periodically if your item isn't found immediately.",
    },
    {
      question: "Can I post items I've found?",
      answer:
        "Absolutely! Posting found items helps reunite them with their owners. Use the 'Found Item' button to create a listing with details and photos of the item.",
    },
    {
      question: "Is there a fee for using this service?",
      answer:
        "No, our basic lost and found service is completely free. We may offer premium features in the future, but core functionality will remain free.",
    },
    {
      question: "How can I increase my chances of finding a lost item?",
      answer:
        "Provide detailed descriptions, multiple photos from different angles, and be specific about locations and times. The more information you provide, the better our matching system works.",
    },
  ];

  return (
    <section className="py-12 bg-[#FFFAF0]">
      <Container>
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2F1C]">
            Frequently Asked Questions
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-[#F4A261] to-[#2A9D8F] mx-auto mt-4 rounded-full"
            data-aos="fade-up"
            data-aos-delay="100"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F0EAD6] rounded-lg overflow-hidden transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none transition-colors duration-200 ${
                  activeIndex === index
                    ? "bg-[#F4A261] text-white"
                    : "hover:bg-[#F4A261]/20 text-[#3E2F1C]"
                }`}
              >
                <span className="font-medium text-lg md:text-xl">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <FiMinus className="w-5 h-5 transition-transform duration-300" />
                ) : (
                  <FiPlus className="w-5 h-5 transition-transform duration-300" />
                )}
              </button>

              <div
                className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 py-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#9A8C7A] pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12 text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p className="text-[#9A8C7A] mb-6">
            Still have questions? Contact our support team for assistance.
          </p>
          <button
            className="bg-[#2A9D8F] hover:bg-[#238278] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            Contact Support
          </button>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
