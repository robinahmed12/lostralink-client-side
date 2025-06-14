import React from "react";
import {
  FaSearch,
  FaBullhorn,
  FaFileUpload,
  FaCheckCircle,
  FaComments,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search or Report",
      icon: <FaSearch className="text-3xl" />,
      secondaryIcon: <FaBullhorn className="text-2xl ml-2" />,
      description:
        "Start by searching for your lost item or reporting a found one.",
      features: [
        "Search with keywords like 'black wallet' or location",
        "Quick reporting form for lost/found items",
        "200+ items found last month!",
      ],
      bgColor: "bg-[#F4A261]/10",
      borderColor: "border-[#F4A261]",
      hoverBg: "hover:bg-[#F4A261]/20",
    },
    {
      id: 2,
      title: "Submit Details",
      icon: <FaFileUpload className="text-3xl" />,
      description: "Provide details about the item to help with matching.",
      features: [
        "Upload photos of the item",
        "Add detailed description",
        "Specify location and contact info",
      ],
      bgColor: "bg-[#2A9D8F]/10",
      borderColor: "border-[#2A9D8F]",
      hoverBg: "hover:bg-[#2A9D8F]/20",
    },
    {
      id: 3,
      title: "Connect & Recover",
      icon: <FaComments className="text-3xl" />,
      secondaryIcon: <FaShieldAlt className="text-2xl ml-2" />,
      description: "Get matched and arrange for item return.",
      features: [
        "Secure messaging system",
        "Verification process for safety",
        "Meetup coordination",
      ],
      bgColor: "bg-[#E76F51]/10",
      borderColor: "border-[#E76F51]",
      hoverBg: "hover:bg-[#E76F51]/20",
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFFAF0]">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#3E2F1C] sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-[#9A8C7A] max-w-2xl mx-auto">
            Our simple 3-step process makes it easy to report and recover lost
            items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative p-6 rounded-lg border-2 ${step.borderColor} ${step.bgColor} ${step.hoverBg} transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1 ${step.bgColor}"></div>
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md">
                  {step.icon}
                  {step.secondaryIcon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-[#3E2F1C]">
                  {step.title}
                </h3>
              </div>
              <p className="text-[#3E2F1C] mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle
                      className={`mt-1 mr-2 flex-shrink-0 ${
                        step.id === 1
                          ? "text-[#F4A261]"
                          : step.id === 2
                          ? "text-[#2A9D8F]"
                          : "text-[#E76F51]"
                      }`}
                    />
                    <span className="text-[#3E2F1C]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#F0EAD6]">
                {step.id === 1 && (
                  <div className="animate-pulse flex items-center">
                    <div className="flex-1 h-10 bg-white rounded-lg border border-[#F4A261] flex items-center px-3 text-[#9A8C7A]">
                      Try "Black wallet near Central Park"
                    </div>
                  </div>
                )}
                {step.id === 2 && (
                  <div className="space-y-2">
                    <div className="h-24 bg-white rounded border border-dashed border-[#2A9D8F] flex items-center justify-center text-[#9A8C7A]">
                      Drag & drop item photo
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-3 bg-[#2A9D8F]/20 rounded"></div>
                      <div className="h-3 bg-[#2A9D8F]/20 rounded"></div>
                      <div className="h-3 bg-[#2A9D8F]/20 rounded col-span-2"></div>
                    </div>
                  </div>
                )}
                {step.id === 3 && (
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#E76F51]/20 flex items-center justify-center mr-2">
                        <FaMapMarkerAlt className="text-[#E76F51]" />
                      </div>
                      <div className="flex-1 bg-white p-2 rounded-lg border border-[#E76F51]/30">
                        <div className="text-sm text-[#3E2F1C]">
                          "Hi, I found your keys near the park entrance. When
                          can you meet?"
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="text-xs px-2 py-1 bg-[#E76F51]/10 text-[#E76F51] rounded-full flex items-center">
                        <FaShieldAlt className="mr-1" /> Verified User
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-[#F4A261] hover:bg-[#E76F51] text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
