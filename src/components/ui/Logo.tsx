import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <svg 
      viewBox="0 0 120 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Container */}
      <rect 
        x="2" 
        y="2" 
        width="116" 
        height="56" 
        rx="12" 
        fill="#0F172A" 
        stroke="#F59E0B" 
        strokeWidth="2"
      />
      
      {/* Terminal Prompt '>' */}
      <path 
        d="M 25 20 L 35 30 L 25 40" 
        stroke="#F59E0B" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Initials 'SK' */}
      <text 
        x="45" 
        y="42" 
        fill="white" 
        style={{ font: 'bold 28px Space Grotesk, sans-serif' }}
      >
        SK
      </text>

      {/* Underscore/Cursor '_' */}
      <rect 
        x="90" 
        y="40" 
        width="12" 
        height="4" 
        fill="#F59E0B" 
        className="animate-pulse"
      />
    </svg>
  );
};

export default Logo;
