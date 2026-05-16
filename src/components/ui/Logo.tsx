import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => {
  return (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background Container */}
      <rect
        x="2"
        y="2"
        width="116"
        height="56"
        rx="16"
        fill="#0A0A0A"
        stroke="#6366f1"
        strokeWidth="2"
      />

      {/* Terminal Prompt '>' */}
      <path
        d="M 25 20 L 35 30 L 25 40"
        stroke="#6366f1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Initials 'S' */}
      <text x="45" y="42" fill="white" style={{ font: 'bold 32px Outfit, sans-serif' }}>
        S
      </text>

      {/* Underscore/Cursor '_' */}
      <rect x="75" y="40" width="16" height="4" fill="#6366f1" className="animate-pulse" />
    </svg>
  );
};

export default Logo;
