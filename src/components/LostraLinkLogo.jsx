const LostraLinkLogo = ({ size = 100 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer transition-transform hover:scale-105 duration-300"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#F4A261" />
      
      {/* Magnifying glass handle */}
      <path 
        d="M60 60L80 80" 
        stroke="#3E2F1C" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
      
      {/* Magnifying glass ring */}
      <circle 
        cx="40" 
        cy="40" 
        r="25" 
        stroke="#2A9D8F" 
        strokeWidth="4" 
        fill="none"
      />
      
      {/* Lost tag inside magnifier */}
      <rect 
        x="28" 
        y="33" 
        width="24" 
        height="14" 
        rx="2" 
        fill="#F0EAD6" 
        stroke="#3E2F1C" 
        strokeWidth="1.5"
      />
      <text 
        x="40" 
        y="42" 
        textAnchor="middle" 
        fill="#E76F51" 
        fontFamily="Arial" 
        fontSize="8"
        fontWeight="bold"
      >
        LOST
      </text>
      
      {/* Chain link symbol */}
      <path 
        d="M50 20C53 20 55 22 55 25C55 28 53 30 50 30C47 30 45 28 45 25C45 22 47 20 50 20Z" 
        fill="#2A9D8F"
      />
      <path 
        d="M50 30L50 40" 
        stroke="#3E2F1C" 
        strokeWidth="2"
      />
      
      {/* Link arrow */}
      <path 
        d="M70 30L80 40L70 50M80 40H60" 
        stroke="#3E2F1C" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Outer ring for depth */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="#3E2F1C" 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  );
};

export default LostraLinkLogo;