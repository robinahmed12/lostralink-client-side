import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const metrics = [
    {
      id: 1,
      icon: "🧳",
      value: 1200,
      suffix: "+",
      label: "items reunited",
      color: "bg-[#F4A261]",
      hoverColor: "hover:bg-[#e69555]",
    },
    {
      id: 2,
      icon: "🌍",
      value: 20,
      suffix: "+",
      label: "cities worldwide",
      color: "bg-[#2A9D8F]",
      hoverColor: "hover:bg-[#258d80]",
    },
    {
      id: 3,
      icon: "💬",
      value: 100,
      suffix: "+",
      label: "success stories",
      color: "bg-[#E76F51]",
      hoverColor: "hover:bg-[#d66448]",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-12 max-w-7xl mx-auto md:py-20 mt-20 bg-[#F0EAD6]"
      style={{ fontFamily: "'Your Warm Font', sans-serif" }}
    >
      <div className="container mx-auto  px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3E2F1C]">
          Our Community Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`transition-all duration-300 transform hover:scale-105 ${metric.color} ${metric.hoverColor} rounded-lg shadow-lg p-8 text-center cursor-default`}
            >
              <div className="text-5xl mb-4">{metric.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {inView ? (
                  <CountUp
                    end={metric.value}
                    duration={2.5}
                    suffix={metric.suffix}
                  />
                ) : (
                  <span>0{metric.suffix}</span>
                )}
              </div>
              <p className="text-xl text-white">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-[#9A8C7A] italic">
            Join thousands of happy users who reunited with their belongings
          </p>
          <button className="mt-6 px-8 py-3 bg-[#F4A261] hover:bg-[#e69555] text-white font-semibold rounded-lg transition-colors duration-300">
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default Counter;
